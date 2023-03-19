---
layout: Post
title:  使用PostGIS构建和使用拓扑
date: 2022-11-18
subtitle: 使用postgis构建与使用拓扑、拓扑检查与修复、插入大型数据集、拓扑几何的简化等
useHeaderImage: true
headerImage: /img/in-post/2022-11-18/5.jpg
tags:
  - PostgreSQL
  - PostGIS
---

[[toc]]

此文为《postgis in action3 》的学习翻译记录并做了些删减与补充

## 1.什么是topology拓扑

定义一些几何图形之间相互关联的规则

在拓扑模型中，共享的边界和区域在数据库中只需存储一次，而链接到共享边界的几何图形称为拓扑几何体，使用拓扑模型的优点：

- 在对拓扑几何进行简化时，不会他们之间的关系（如不会出现重叠或间隙）
- 如果你有一组不应该重叠/相交的几何对象（例如建筑物、社区或地块），则可以更轻松地在拓扑模型中检测和修复

## 2.使用拓扑

拓扑模型在某种程度上回归到经典几何，您可以在其中描述两个自由几何如何相互作用，而无需考虑坐标系

因为 GIS 拓扑是图论的产物，所以它使用一组不同的术语。

将几何中的点视为拓扑中的节点，将线串视为边，将多边形视为面。总的来说，节点、边和面是拓扑基元，用来代替几何

### [1]添加拓展

```sql
CREATE EXTENSION postgis_topology;
```

> 添加后在数据库中就会有topology schema 了，就可以使用它下面的一些拓扑函数之类的东西了

### [2]创建拓扑

这里创建一个拓扑示例（SRID为4326的一个科罗拉多州矩形）：

```sql
SELECT CreateTopology('ch13a_topology',4326);
postgis_in_action=# \dn
       架构模式列表
      名称      |  拥有者
----------------+----------
 ch09           | postgres
 ch13a_topology | postgres
 public         | postgres
 topology       | postgres
(4 行记录)
```

> 在该模式下同时还要四个表（空表）node、edge_data、face 和 relation

PostGIS中使用单独的模式来容纳每个拓扑网络——如上面 ch13a_topology。指定的SRID适用于该模式中的所有表以及将使用 ch13a_topology 模式的的所有拓扑几何列。因为拓扑是关于几何图形之间的关系，所以拥有不同的 SRID 是没有意义的

其中edge_data是保存所有用于构建拓扑网络的拓扑信息表

下面对科罗拉多州使用 TopoGeo_AddLineString 函数添加构成该州四个边界的线串：（TopoGeo_AddLineString 函数使用边数据自动生成拓扑网络并填充节点和面）

```sql
SELECT TopoGeo_AddLineString(
    'ch13a_topology', 
	ST_GeomFromText(
		'LINESTRING(
			-109.05304 39.195013,
			-109.05304 41.000889,
			-104.897461 40.996484
		)',
		4326
    )
);

SELECT TopoGeo_AddLineString(
	'ch13a_topology',
	ST_GeomFromText(
		'LINESTRING(
		    -104.897461 40.996484,
		    -102.051744 40.996484, 
		    -102.051744 40.003029
		)',
		4326
    )
);

SELECT TopoGeo_AddLineString(
	'ch13a_topology',
	ST_GeomFromText(
		'LINESTRING(
		    -102.051744 40.003029,
		    -102.04874 36.992682,
		    -104.48204 36.992682
		)',
		4326
    )
);
     
SELECT TopoGeo_AddLineString(
	'ch13a_topology',
	ST_GeomFromText(
		'LINESTRING(
		    -104.48204 36.992682,
		    -109.045226 36.999077, 
		    -109.05304 39.195013
		)',
		4326
    )
 );
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/250a826aa3d44fb5b5da1f2ba1bee21c~tplv-k3u1fbpfcp-zoom-1.image)


> 上面为查询`edge_data`表的结果，也可以通过`SELECT ST_GetFaceGeometry('ch13a_topology',1);`查看该拓扑面

然后在添加数据：（一些横穿该州的路）

```sql
SELECT TopoGeo_AddLineString(
	'ch13a_topology',
	ST_GeomFromText(
		'LINESTRING(
			-109.05304 39.195013, 
			-108.555908 39.108751, 
			-105.021057 39.717751, 
			-102.051744 40.003029
		)',
		4326
    )
 );
 SELECT TopoGeo_AddLineString(
	'ch13a_topology',
	ST_GeomFromText(
		'LINESTRING(
			-104.897461 40.996484,
			-105.021057 39.717751,
			-104.798584 38.814031,
			-104.48204 36.992682
		)',
		4326
    )
);
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf8e697c506242b2b32b9db6a1a49d82~tplv-k3u1fbpfcp-zoom-1.image)


具体视图可以通过QGIS便捷查看四个面 ID、八个边 ID 和五个节	点

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89f5ef3e887745a18f570c052253ff19~tplv-k3u1fbpfcp-zoom-1.image)


高速公路的加入将原来的单面科罗拉多分成了四个面。再次仔细查看表格：PostGIS 自动重新组织了您的拓扑（四个表中的结构）如edge_data表

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78e8e53a12864f1b81153b809bf96f05~tplv-k3u1fbpfcp-zoom-1.image)


可以使用以下查询查看face表，这只是face的边界框。face表不存储实际的多边形（存储了每个面的最小矩形包围盒，如果要查看该面可有使用`ST_GetFaceGeometry`函数），因为导出它们所需的所有数据都可以在 edge_data 表中找到。这种存储方法遵循将数据保存在一个地方的数据库原则。

```sql
SELECT face_id, mbr, -- 每个拓扑面的最小包围盒
ST_GetFaceGeometry('ch13a_topology',face_id) AS geom -- 拓扑面
FROM ch13a_topology.face 
WHERE face_id > 0; 
```

> 该模式中还有一个默认视图`edge`，可以说该视图为`edge_data`表的子集，该视图中存储了此拓扑的简要数据，对于一般用途，应该属于该视图而不是直接使用`edge_data`表，如edge视图：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7cb55da13684bde9b2e26d5ebc59db9~tplv-k3u1fbpfcp-zoom-1.image)


**拓扑并不关心描述几何图形，而是关心它们之间的关系**

### [3]拓扑类型

构建拓扑后，您可以将图元元分组以构成拓扑几何（也就是拓扑中的层）

假设现在要收集构成科罗拉多州拓扑模型中高速公路的四条边。您可以首先创建一个新表来存储将要构建的拓扑几何，然后使用`AddTopoGeometryColumn()` 函数向该表添加拓扑几何列:

创建一个表来存储高速公路并定义一个地形几何列:

```sql
CREATE TABLE ch13.highways_topo (highway varchar(20) PRIMARY KEY); 
SELECT AddTopoGeometryColumn( -- 构建拓扑几何列
    'ch13a_topology',-- 现存拓扑模型名称
    'ch13', -- 存储拓扑几何的schema_name	
    'highways_topo', -- 存储拓扑几何的table_name
    'topo', -- column_name
    'LINESTRING' -- feature_type
);
```

构建完成后，可以看到在 `topology.layer` 表中添加一个一条记录：（拓扑几何始终与`topology.layer`相关联）

```
 topology_id | layer_id | schema_name |  table_name   | feature_column | feature_type | level | child_id
-------------+----------+-------------+---------------+----------------+--------------+-------+----------
           1 |        1 | ch13        | highways_topo | topo           |            2 |     0 |
(1 行记录)
```

构建好拓扑几何存储位置后下面使用`CreateTopoGeom()`构建拓扑几何

```sql
INSERT INTO ch13.highways_topo (highway, topo) 
VALUES (
    'I70', 
    CreateTopoGeom(
        'ch13a_topology', -- 拓扑几何由ch13a_topology模式形成
        2, -- 要构建的拓扑几何的类型，2==lineal
        1, -- 此topogeom所属topology.layer的ID。也是定义拓扑几何列时返回的数字
        '{{5,2},{6,2}}'::topoelementarray -- 构成此拓扑几何的元素。数组中的每个元素都由元素 ID 和元素类型组成（ (1 = node,2 = edge, 3 = face). 这里都为edge
    )
);
```

这样一个由四个拓扑元素构成的拓扑几何就构建完成了，下面查看构建结果

```sql
SELECT highway, topo, (topo).*
FROM ch13.highways_topo WHERE highway = 'I70';
```

```
 highway |   topo    | topology_id | layer_id | id | type
---------+-----------+-------------+----------+----+------
 I70     | (1,1,1,2) |           1 |        1 |  1 |    2
(1 行记录)
```

> topology_id：拓扑几何所属的拓扑
>
> layer_id：拓扑几何所属的layer
>
> ...

如果你有几何图形，也可以直接使用toTopoGeom 函数将几何图形转换为拓扑几何图形，并将新形成的拓扑几何图形添加到一个新的表中。

例：使用 toTopoGeom 定义拓扑几何

```sql
NSERT INTO ch13.highways_topo (highway, topo) 
SELECT 
    'I25', 
	toTopoGeom( -- 使用 toTopoGeom 定义 I-25
		ST_GeomFromText(
			'LINESTRING(
                -104.897461 40.996484,
                -105.021057 39.717751,
                -104.798584 38.814031,
                -104.48204 36.992682
            )',
			4326
		),  -- 如果不存在，将创建形成几何所需的任何边或节点	
	'ch13a_topology', -- the topology
	1 -- The layer
  );
```

可以使用 GetTopoGeomElements 函数确认新拓扑几何的组成：

```sql
SELECT highway, (topo).*, GetTopoGeomElements(topo) As el
FROM ch13.highways_topo
ORDER BY highway;
```

```
ighway | topology_id | layer_id | id | type |  el
---------+-------------+----------+----+------+-------
 I25     |           1 |        1 |  2 |    2 | {7,2} 
 I25     |           1 |        1 |  2 |    2 | {8,2}
 I70     |           1 |        1 |  1 |    2 | {5,2}
 I70     |           1 |        1 |  1 |    2 | {6,2}
(4 行记录)
```

> el{拓扑元素ID,拓扑类型}
>
> 虽然在 highways_topo 表中只有两行，但是当使用 GetTopoGeomElements 函数时会得到四行，因为 GetTopoGeomElements 为每条高速公路的每条边返回一行

### [4]小结

PostGIS 拓扑模型提供了以下用于处理拓扑的功能:

- 启用/添加拓扑扩展会立即创建 topology schema和function函数
- topology.topology 表记录了你数据库中的所有拓扑结构
- topology.layer 表记录了数据库中的所有拓扑几何列（layers）
- 每个拓扑网络都有自己的schema
- 基元（边、节点、面）在网络模式中有各自的表
- 特定拓扑网络schema中的关系表（在本例中为ch13a_topology.relation）记录了哪些拓扑图元和layer元素属于哪些拓扑几何

一旦构建了拓扑，就可以在数据库中的任何地方自由使用它们。

还可以通过从拓扑中构建拓扑几何来在数据库的其他地方使用它们，其构建过程如下：

- 将拓扑几何列（层）添加到您自己的表中
- 从基元或其他图层创建拓扑几何，并将它们添加到拓扑几何列中。
- 使用 toTopoGeom 函数一步从几何添加拓扑几何并更改底层网络。不过请记住，一旦执行此操作，边、面和节点将自动添加，现有的将被拆分。以这种方式更改拓扑后，仅删除引入的拓扑几何不足以恢复对拓扑的更改

接下来将学习如何处理从各种来源获得的数据，以及如何修复因引入不完美的数据而导致的错误拓扑。

## 3.Victoria, BC的拓扑结构

Victoria, BC——>不列颠哥伦比亚省维多利亚....这翻译

在本节中，将使用一个真实世界的拓扑示例来深入理解拓扑的使用，这里使用不列颠哥伦比亚省维多利亚的数据

### [1]创建Victoria的拓扑模型

```sql
SELECT CreateTopology('ch13_topology', 32610, 0.05); -- 0.05 米的容差
```

> 如果没有指定容差，将采用0.01m的默认容差（如果您的一个节点与另一个节点之间的距离仅为 0.01 米，PostGIS 会将两者合在一起成为一个节点），和arcgis中拓扑的容差是一个东西。

### [2]将图元添加到拓扑模型中

PostGIS topology 提供了三个函数来将拓扑图元添加到你创建的拓扑中，利用几何作为数据源：

- `TopoGeo_AddPoint`
- `TopoGeo_AddLineString`
- `TopoGeo_AddPolygon`

> 在使用上面函数来创建图元同时也有可能会自动创建其他图元，例如使用TopoGeo_AddLineString 添加线串可能会创建两条边和一个面，但结果中只会返回创建的边
>
> 如果不希望自动添加图元的不确定性和便利性，您可以利用以下三个函数：AddNode、AddEdge 和 AddFace。它们分别添加一个节点、一条边和一个面

下面为使用`TopoGeo_AddLineString `示例：`TopoGeo_AddLineString` 函数从单个线串输入向拓扑添加节点、边和面。我们将从加载维多利亚城市边界线串开始：

导入下测试数据[(ed. #3) Chapter 13 - Building and Using Topologies (postgis.us)](http://www.postgis.us/chapter_13_edition_3)：

```
psql -U postgres -d postgis_in_action -f ch13_staging.sql
```

> 该模式中有三个表cityboundary、neighbourhoods

```sql
SELECT 
    gid, 
    TopoGeo_AddLineString( -- 参数（topo schemaName,PrimteGeom)
        'ch13_topology', ST_Transform(geom, 32610)
    ) As edge_id -- 根据城市的边界线创建拓扑线
FROM (
    SELECT gid, (ST_Dump(geom)).geom FROM ch13_staging.cityboundary -- 该市的边界
) As f; -- 使用ST_Dump将multilinestrings扩展为linestring
```

```
 gid | edge_id
-----+---------
   1 |       1
(1 行记录)
```

> `TopoGeo_AddLineString` 是一个返回集合的函数，这意味着它具有扩展行数的潜力，因为每次调用都可能返回多个值

现在该拓扑用两个面、一条边和一个节点组成：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d630930685314e6f96f5e729944703da~tplv-k3u1fbpfcp-zoom-1.image)


edge_data表：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e10ae72c8eb74bcb8f174a6da2b2625f~tplv-k3u1fbpfcp-zoom-1.image)


```sql
SELECT 'faces' As type, COUNT(*) As num FROM ch13_topology.face
UNION ALL
SELECT 'edges' As type, COUNT(*) As num FROM ch13_topology.edge
UNION ALL
SELECT 'nodes' As type, COUNT(*) As num FROM ch13_topology.node
UNION ALL
SELECT 'relations' As type, COUNT(*) As num FROM ch13_topology.relation;
type    | num
-----------+-----
 faces     |   2
 edges     |   1
 nodes     |   1
 relations |   0
(4 行记录)
```

> 可以发现，尽管你只是将线串添加到拓扑模型中，它会自动创建一个面来包围边和一个节点来划分边的起点和终点。还创建了一个外部面

下面继续将Victoria, BC的街区几何添加到拓扑模型中来创建相应的图元

```sql
SELECT 
    gid, 
    TopoGeo_AddPolygon(
        'ch13_topology', ST_Transform(geom, 32610), 0.05 -- 指定容差为0.05米
    ) As face_id
FROM (
    SELECT 
        gid, 
        (ST_Dump(geom)).geom -- 将multipolygons转为polygons
    FROM ch13_staging.neighbourhoods
) As f;
```

```
 gid | face_id
-----+---------
   1 |       1
   2 |       2
   3 |       3
   4 |       6
   4 |       4
   5 |       5
   6 |       9
   6 |       8
   6 |      11
   6 |      12
   7 |      10
   8 |      14
   8 |      13
   9 |      16
  10 |      19
  10 |      18
  11 |      22
  11 |      25
  11 |      21
  12 |      21
  12 |      26
  12 |      28
  13 |      27
  14 |      31
  14 |      33
  14 |      34
  14 |      30
(27 行记录)
```

> 创建了27个面，而加上外部面，现在该拓扑模型中一共有28面，这些面是根据`neighbourhoods`表中的14个面构成的，那为什么会多出这么多面呢，这是因为构建拓扑面时会多出一些重叠的面、或者是空隙面

### [3]构建拓扑几何

与几何不同，拓扑几何由拓扑中的元素组成，这些元素可以与其他拓扑几何或拓扑中的元素共享。如果拓扑几何邻居的边界发生变化，则拓扑几何的边界也会发生变化。同时这也是地籍测量、土地边界研究中的一个非常重要的特征

同样采用上面的三个过程来创建拓扑几何：

- 通过在表中定义拓扑几何列来创建图层
- 通过收集原始元素、收集其他层元素或从几何构建它们来创建拓扑几何。
- 将构建好拓扑几何插入到拓扑几何列中

这里使用现有几何图形（Victoria, BC数据）以及现有元素构建拓扑几何（也是比较常见的做法）

使用 `AddTopoGeometryColumn`构建几个图层：

```sql
CREATE TABLE ch13.neighbourhoods (feat_name varchar(50) primary key);
SELECT AddTopoGeometryColumn(
    'ch13_topology',
    'ch13',    
    'neighbourhoods', -- 存储neighborhoodsb拓扑几何
    'topo',
    'MULTIPOLYGON'
); -- 构建拓扑几何列
 addtopogeometrycolumn
-----------------------
                     1
(1 行记录)

CREATE TABLE ch13.cities (feat_name varchar(150) primary key);
SELECT AddTopoGeometryColumn(
    'ch13_topology', 
    'ch13',   
    'cities', -- 存储cities拓扑几何
    'topo',
    'MULTIPOLYGON',
    1
);  
 addtopogeometrycolumn
-----------------------
                     2
(1 行记录)
```

下面查看下这连个表的结构信息（\d)

```sql
Table "ch13.neighbourhoods"
Column     | Type                |  Modifiers
-----------+-----------------------+-----------
feat_name | character varying(50) | not null
topo      | topogeometry          |

Indexes:
	"neighbourhoods_pkey" PRIMARY KEY, btree (feat_name)
Check constraints:
	"check_topogeom_topo"
	CHECK ((topo).topology_id = 2
	AND (topo).layer_id = 1 AND (topo).type = 3)
Table "ch13.cities"
Column | Type | Modifiers
-----------+------------------------+-----------
feat_name | character varying(150) | not null
topo | topogeometry |
Indexes:
	"cities_pkey" PRIMARY KEY, btree (feat_name)
Check constraints:
	"check_topogeom_topo"
	CHECK ((topo).topology_id = 2
	AND (topo).layer_id = 2 AND (topo).type = 3)

```

虽然从表描述中看不出城市被建模为由社区neighbourhoods组成，但可以检查 topology.layer 表，其中列出了所有拓扑几何列。在其中，您会看到城市层的 child_id 字段填充为 1，表明每个城市都由子社区组成

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f93d4afa3d2a4daebe9dc75e638ceab3~tplv-k3u1fbpfcp-zoom-1.image)


构建好存储拓扑几何的列后，就到添加拓扑几何了，这里直接使用现有的`Victoria, BC`数据中的几何来构建拓扑几何（toTopoGeom将几何转换为其等效的拓扑几何,但是切记，在使用它之前，你必须已经有一个层，而且该层的ID是toTopoGeom的一个必需参数，这里因为city由neighbourhoods构成，所以就直接将拓扑结合添加到neighbourhoods即可。

```sql
INSERT INTO ch13.neighbourhoods (feat_name, topo)
SELECT  
    neighbourh,  
    toTopoGeom(
        ST_Transform(geom, 32610), 'ch13_topology', 1, 0.05 -- 注意容差的设定
    )
FROM ch13_staging.neighbourhoods;
```

下面演示构建拓扑几何的另一种方式：从现有拓扑元素创建拓扑几何（ CreateTopoGeom TopoElementArray_Agg），构建city拓扑几何，而不是直接使用cityboundary表中的几何构建

```sql
INSERT INTO ch13.cities (feat_name, topo)
SELECT 
    'Victoria',    
    CreateTopoGeom( -- 将拓扑几何组合在一起构成一个拓扑几何
        'ch13_topology',
        3, -- 拓扑几何类型3==面
        2, -- 指定新的拓扑几何将属于cities拓扑几何列
        (
            SELECT TopoElementArray_Agg(
				ARRAY[(topo).id,(topo).layer_id]
			) -- 获取所有的拓扑元素
            FROM ch13.neighbourhoods
        )
);
```

大多数桌面查看工具都没有拓扑几何的概念。要获得拓扑图片，您必须将拓扑几何转换为几何，如下例所示
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af8989265094490dac6daf0093a86ed9~tplv-k3u1fbpfcp-zoom-1.image)


要显示neighbourhoods，则需要将每个面转换为多边形几何图形，如下例所示

```sql
SELECT face_id, ST_GetFaceGeometry('ch13_topology', face_id)
FROM (
    SELECT (GetTopoGeomElements(topo))[1] As face_id 
    FROM ch13.cities 
    WHERE feat_name = 'Victoria'
) As x;
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d140a7f990c44a8bb3d89f7c3d81722~tplv-k3u1fbpfcp-zoom-1.image)



## 4.通过编辑拓扑图元修复拓扑几何问题

回想前面添加的14个neighbourhoods多边形，但却生成了38个面，这就因为这不少相邻多边形之间有重叠或者是空虚，从而构成了额外的面，只是因为它们太小，所以在上面的图形输出中并没有很容易看出来（而造成这一现象的原因便是数据的不规范或者把多边形简化后造成的)

目前 ch13_topology 示例有 37 个面，包括通用面。 neighborhoods 图层有 14 个拓扑几何图形

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6a30079d5624bb4b8ce5c55e78af209~tplv-k3u1fbpfcp-zoom-1.image)


仔细看看Burnside。它还包含了一些微小的面（数字 21、22、25、28、29 表示）几乎不占据其边界的任何区域。运行以下代码以查看社区中微笑的面：

```sql
SELECT feat_name, COUNT(face_id) As num_faces, 
    MIN(
        ST_Area(ST_GetFaceGeometry('ch13_topology',face_id))
    )::numeric(10,2) As min_area,
    MAX(
        ST_Area(ST_GetFaceGeometry('ch13_topology',face_id))
    )::numeric(10,2) As max_area
FROM (
    SELECT feat_name, (GetTopoGeomElements(topo))[1] As face_id 
	FROM ch13.neighbourhoods
) As x
GROUP BY feat_name 
HAVING COUNT(face_id) > 1
ORDER BY COUNT(face_id) DESC;
```

```
feat_name | num_faces | min_area | max_area
-----------------+-----------+----------+------------
Burnside | 6 | 1.48 | 2383705.36
Gonzales | 4 | 0.03 | 1366871.65
Victoria West | 4 | 2.22 | 1579455.03
North Park | 3 | 41.29 | 554622.59
Oaklands | 2 | 11997.94 | 1733012.41
North Jubilee | 2 | 39.05 | 629632.96
Hillside/Quadra | 2 | 62.23 | 1658087.55
(7 rows)
```

上面列出了所有具有多于一个面的neighbourhoods，并统计了总共 25 个面。未列出的是另外 6 个只有一个面的neighbourhoods

### [1]通过移除边来移除面

`ST_RemEdgeNewFace` 函数用于删除一条边。如果一个边将两个面分开，则原始面被破坏并创建一个新面，即原始两个面的并集

下面使用这个函数来实现移除一些多余的面：创建一个过程来检查与删除

```sql
DO 
LANGUAGE plpgsql 
$$
DECLARE r record; var_face integer;
BEGIN
    FOR r IN ( 
    SELECT DISTINCT abs(
        (ST_GetFaceEdges(
            'ch13_topology',face_id)
        ).edge
    ) As edge 
    FROM (
        SELECT feat_name, (GetTopoGeomElements(topo))[1] As face_id 
        FROM ch13.neighbourhoods
    ) As x
    WHERE ST_Area(ST_GetFaceGeometry('ch13_topology',face_id)) < 55000
     ) 
    LOOP
        BEGIN
            var_face := ST_RemEdgeNewFace('ch13_topology',r.edge);
            EXCEPTION
                WHEN OTHERS THEN
            RAISE WARNING 'Failed remove edge: %, %', r.edge, SQLERRM;
        END;
    END LOOP;
END
$$;
```

> 上面代码中，如果删除步骤失败，只是发出一个警告，所以代码会继续运行剩余的边
>
> 运行上面代码后还运行之前的查看小面的代码在看看

### [2]检查重叠面

通常很难通过肉眼来判断重叠，而使用查询或许更方便，下面代码首先转储两个相邻社区的拓扑元素 ID，并且只会返回那些重叠的：

```sql
SELECT (GetTopoGeomElements(topo))[1] As face_id 
FROM ch13.neighbourhoods
WHERE feat_name = 'North Park' 
INTERSECT
SELECT (GetTopoGeomElements(topo))[1] As face_id  
FROM ch13.neighbourhoods
WHERE feat_name = 'Burnside';
face_id
--------
	21
	28
```

可以发现面21和28是重叠的，而这就需要改变底层的拓扑几何结构，让neighborhoods  不相互重叠

### [3]编辑拓扑几何

修复重叠的最简单方法是从每个拓扑几何中删除重叠的面。不过，PostGIS 拓扑并提供任何这样做的功能；而是需要直接使用拓扑表来实现。

回想一下，ch13_topology.relation 表包含拓扑几何和拓扑之间的所有关系。您可以编辑此表并将面与拓扑几何分离。

以下删除了关系表中与 Burnside 和 North Park 对应的重叠的项：

```sql
DELETE FROM ch13_topology.relation AS r 
WHERE EXISTS (
	SELECT topo -- <2>
	FROM ch13.neighbourhoods As n 
	WHERE 
		feat_name = 'North Park' AND 
		(topo).id = r.topogeo_id AND 
		r.element_id = 21 AND 
		r.element_type = 3
);

DELETE FROM ch13_topology.relation AS r 
WHERE EXISTS (
	SELECT topo 
	FROM ch13.neighbourhoods As n 
	WHERE 
		feat_name = 'Burnside' AND 
		(topo).id = r.topogeo_id AND 
		r.element_id = 28 AND 
		r.element_type = 3
);
```



## 5.插入与编辑大型数据集

前面的示例的数据量很小，而通常需要使用大型的数据集，如一个省的路网数据等。而加载大型数据集时主要的问题是导入过程的因为拓扑错误而被迫阻碍导入。

与大多数关系数据库一样，PostgreSQL 是基于事务的。每个插入或更新语句作为单个事务运行，这意味着所有记录都必须成功或失败；没有部分更新或插入。

如果 PostGIS 在长达一小时的插入将结束时发现一条错误记录，那么前面一个小时不就白白浪费掉了。所以建议绕过事务的全有或全无的性质，以小批量执行插入或更新。而要实现这一点，可以在 DO 命令或函数中该流程：

- DO 命令将运行单个事务，但它会提示每个错误。如果您选择忽略该错误，将继续执行。
- 在函数方法中，您将插入或更新嵌入到一个函数中，然后使用小批量数据迭代调用该函数。如果您遇到错误，只会影响当前批次

下面演示了使用函数方法的技巧：

```sql
CREATE TABLE ch13.streets (
	gid integer primary key, 
	feat_name varchar(50), 
	access varchar(20), 
	rd_class varchar(20), 
	max_speed numeric(10,2)
); -- 创建一个streets表来存储拓扑列	
  
SELECT AddTopoGeometryColumn(
	'ch13_topology',
	'ch13',
	'streets',
	'topo',
	'MULTILINESTRING'
); -- 添加一个拓扑几何列到streets表中
  
CREATE TABLE ch13.log_street_failures (
	gid integer primary key,
	error text
); -- 创建一个错误表来记录拓扑错误
```

接下来是执行插入的逻辑（批量加载街道的函数）

```sql
CREATE OR REPLACE PROCEDURE ch13.load_streets(param_num integer) AS
$$
DECLARE r record;
BEGIN
    FOR r IN 
		SELECT * 
		FROM ch13_staging.streetcentrelines -- 从暂存表中选择一组不超过param_num行的街道
        ORDER BY gid 
		LIMIT param_num OFFSET (SELECT MAX(gid) from ch13.streets)
	LOOP  
		BEGIN
			INSERT INTO ch13.streets (
				gid,feat_name,access,rd_class,max_speed,topo) -- 将每个插入到街道表中
			SELECT 
				r.gid,r.streetname,r.access,r.rd_class,
				r.max_speed::numeric,
				toTopoGeom(ST_Transform(ST_Force2D(r.geom),32610),-- 强制 2D 变换以匹配我们的拓扑，然后转换为拓扑几何
      'ch13_topology',3,0.05); -- 设定容差为0.05米
			EXCEPTION WHEN OTHERS THEN
				INSERT INTO ch13.log_street_failures (gid,error) -- 记录任何拓扑异常并继续
				VALUES (r.gid,SQLERRM);
				RAISE WARNING 
					'Loading of record % failed: %',
					r.gid,
					SQLERRM;
		END;
        COMMIT; -- <6>
    END LOOP;
END
$$
LANGUAGE plpgsql;
```

> 这样在每次调用都可以加载指定的数量的街道

假如插入2500条街道

```sql
CALL ch13.load_streets(2500);
```

## 6.简化拓扑几何

如何在简化拓扑的同时，还能确保的它们之间的关系不发生改变？

可以使用 ST_Simplify，它被重载以接受拓扑几何。将拓扑几何作为输入的 ST_Simplify 函数返回一个几何。该函数的几何和拓扑几何版本之间的区别在于，拓扑几何版本对构成拓扑几何的边应用简化，但防止会导致边之间出现间隙或破坏面的简化。因为拓扑几何只是对边的引用，所以具有共享边的重构几何现在具有简化的共享边

对拓扑几何进行的任何简化都不会简化底层拓扑。简化过程创建由拓扑几何组成的边缘的简化版本，并从简化的边缘重建几何。函数运行后，新创建的简化版边将被丢弃

这里来试试两个演示：

- 将neighborhood 拓扑几何转换为几何并应用 ST_Simplify函数处理（出现缝隙和重叠面）
-  将ST_Simplify直接应用于拓扑几何（拓扑关系没有发生改变）

demo1：基于几何的简化（拓扑关系乱了）

```sql
SELECT feat_name, ST_Simplify(topo::geometry,150) As geom_simp 
FROM ch13.neighbourhoods
```



demo2：基于拓扑的简化

```sql
SELECT feat_name, ST_Simplify(topo,150) As topo_simp 
FROM ch13.neighbourhoods
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/408e0c17c86841cc9f995399f3ae1894~tplv-k3u1fbpfcp-zoom-1.image)


> 即使几何发生了改变，它们之间的拓扑关系却仍然没有变

## 7.拓扑验证与管理

有时拓扑可能会因错误的编辑而变得无效，现在可以使用ValidateTopology()函数来检查拓扑的有效性

```sql
SELECT * 
FROM ValidateTopology('ch13_topology');
```

> 该有效性函数定义的标准是比较松的，只要拓扑元素之间没有相交即可通过检验，你也可以通过过程语言自定义更严格的标准

TopologySummary 是另一个有用的管理函数，它提供拓扑和层的基本摘要，而无需查看表格:

```SQL
postgis_in_action=# SELECT TopologySummary('ch13_topology');
                      topologysummary
-----------------------------------------------------------
 Topology ch13_topology (id 2, SRID 32610, precision 0.05)+
 53 nodes, 87 edges, 35 faces, 0 topogeoms in 0 layers    +
 Layer 1, type Polygonal (3), 0 topogeoms                 +
  Deploy: ch13.neighbourhoods.topo                        +
 Layer 2, type Polygonal (3), 0 topogeoms                 +
  Hierarchy level 1, child layer 1                        +
  Deploy: ch13.cities.topo                                +
(1 行记录)
```