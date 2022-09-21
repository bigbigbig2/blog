---
layout: Post
title:  PostgreSQL索引
date: 2022-09-10
useHeaderImage: true
headerImage: /img/in-post/2022-9-10/2.jpg
tags:
  - PostgreSQL
---

本文章主要部分为https://www.postgresqltutorial.com翻译简化的学习笔记

索引的作用：帮你快速的查询数据

索引的缺点：

1. 你如果把这个东西设置为索引，那么就意味着你的这个表的数据的增删改效率都会变低
2. 索引很占空间

所以说有些东西可以设置为索引，有些东西不推荐设置为索引。

## 1.创建索引

索引是一种分离的数据结构，例如 B-Tree，它以额外的写入和存储为代价来加速表上的数据检索以维护它

```sql
CREATE INDEX index_name ON table_name [USING method]
(
    column_name [ASC | DESC] [NULLS {FIRST | LAST }],
    ...
);
```

- 索引方法method：`btree`、`hash`、`gist`、`spgist`、`gin`、 `brin`（PostgreSQL默认使用`btree`）
- 列出要存储在索引中的一列或多列。和`ASC`指定`DESC`排序顺序。ASC 是默认值。`NULLS FIRST`或`NULLS LAST`指定空值在非空值之前或之后排序。指定`NULLS FIRST`时为默认值，未指定时为默认值。`DESC``NULLS LAST``DESC`
- 可在查询语句前面使用`EXPLAIN`语句，来查看此次查询是否属于索引

```sql
SELECT * FROM address
WHERE phone = '223664661973';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/06c944909e464164a4dc6f5861fd8d99.png)


检查是否使用索引：

```sql
EXPLAIN SELECT *
FROM address
WHERE phone = '223664661973';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/893bdb521d9448029ae878e9c953e091.png)


```sql
CREATE INDEX idx_address_phone 
ON address(phone);

EXPLAIN SELECT *
	FROM address
WHERE phone = '223664661973';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/8470be0433ee4900813619ff076d1329.png)


## 2.删除索引

有时候尽管你创建了索引，但是由于表格较小等原因，查询优化器会自动的不使用索引来查询数据，那么就可以将索引干掉了。

语法· 

```sql
DROP INDEX  [ CONCURRENTLY]
[ IF EXISTS ]  index_name (可以同时删除多个索引index1,index2....)
[ CASCADE | RESTRICT ];
```

- `CASCADE`如果索引具有依赖对象，可以使用`CASCADE`选项来在删除索引时自动删除这该索引所依赖的对象
- `RESTRICT`如果有任何对象依赖该索引，`RESTRICT`选项指示 PostgreSQL 拒绝删除该索引，此选项为默认选项
- `CASCADE`如果索引具有依赖对象，您可以使用该`CASCADE`选项自动删除这些对象以及依赖于这些对象的所有对象。

## 3.显示索引

在PostgreSQL 中没有提供像`SHOW INDEXES`列出表或数据库的索引信息这样的命令。而是包含了一个默认的`pg_indexes`来存储索引信息，该视图由5个字段组成：

- schemaname：存储包含表和索引的模式的名称。
- tablename：存储索引所属表的名称。
- indexname：存储索引的名称。
- tablespace：存储包含索引的表空间的名称。
- indexdef：以`CREATE INDEX`语句的形式存储索引定义命令。

例如：查看数据库中`public`模式的所有索引：

```sql
SELECT * FROM
    pg_indexes
WHERE
    schemaname = 'public'
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2d2191671c2d4403abb7285167dfd00b.png)


查询某个表的所有索引

```sql
SELECT
    indexname,
    indexdef
FROM
    pg_indexes
WHERE
    tablename = 'table_name';
```

使用psql 命令行查看索引：

```sql
\d table_name
```

该命令将返回表的所有信息，包括表的结构、索引、约束和触发器

## 4.索引类型

PostgreSQL 有几种索引类型：B-tree、Hash、GiST、SP-GiST、GIN 和 BRIN。每种索引类型使用不同的存储结构和算法来应对不同类型的查询。

当你使用`CREATE INDEX`语句而不指定索引类型时，PostgreSQL 默认使用 B-tree 索引类型，因为它最适合最常见的查询

### [1]B-tree 索引

B-tree 是一种自平衡树，它维护已排序的数据，并允许在对数logN时间复杂度内进行搜索、插入、删除和顺序访问

每当索引列涉及使用以下运算符之一的比较时，PostgreSQL 查询计划程序将考虑使用 B-tree 索引：

```sql
<
<=
=
>=
BETWEEN
IN
IS NULL
IS NOT NULL
```

此外，查询计划器可以将 B-tree 索引用于涉及模式匹配运算符的查询：如`LIKE`、`~`，例如：

```sql
column_name LIKE 'foo%' 
column_name LKE 'bar%' 
column_name  ~ '^foo'
```

如果您已经开始使用索引来优化您的 PostgreSQL 数据库，那么 B-tree 通常可能是你像要的。

### [2]Hash索引

哈希索引只能处理简单的相等比较 (=)。这意味着每当索引列涉及使用等于（=）运算符的比较时，查询计划器query planner 将考虑使用哈希索引。

要创建哈希索引，请在子句中使用`CREATE INDEX`具有`HASH`索引类型的`USING`语句，如下所示：

```sql
CREATE INDEX index_name 
ON table_name USING HASH (indexed_column);
```

### [3]GIN 索引

当您将多个值存储在单个列中时，GIN 索引最有用，例如hstore、array、 jsonb 和 range 类型。

### [4]BRIN索引

BRIN代表**dexes****中的****块**范围。与 B-tree 索引相比，BRIN 更小，维护成本更低。

BRIN 允许在非常大的表上使用索引，这在以前使用没有水平分区的 B-tree 是不切实际的。

BRIN 常用于具有线性排序顺序的列，例如销售订单表的创建日期列。

### [4]GiST 索引

GiST 代表广义搜索树。GiST 索引允许构建通用树结构。GiST 索引在索引几何数据类型和全文搜索时很有用。

### [5]SP-GiST 索引

SP-GiST 代表空间分区的 GiST。SP-GiST 支持分区搜索树，有助于开发各种不同的非平衡数据结构。

SP-GiST 索引对于具有自然聚类元素且不是同等平衡树的数据最有用，例如 GIS、多媒体、电话路由和 IP 路由。

## 5.唯一键索引

PostgreSQL`UNIQUE`（唯一键）索引强制一列或多列中值的唯一性。要创建`UNIQUE`索引，可以使用以下语法：

```sql
CREATE UNIQUE INDEX index_name
ON table_name(column_name, [...]);
```

- 请注意，只有 B 树索引可以声明为唯一索引。
- 为列定义`UNIQUE`索引时，**该列不能存储具有相同值的多行。**
- 如果`UNIQUE`为两列或多列定义索引，则这些列中的组合值不能在多行中重复。

- PostgreSQL 将`NULL` 其视为不同的值，因此，您可以在具有索引`NULL`的列中拥有多个值 

当您为表定义主键或唯一键约束时，PostgreSQL 会自动创建相应的`UNIQUE`索引

示例：

```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE
);
```

此语句在PostgreSQL创建了俩个唯一键索引，一个是employee_id列，一个唯一键列email

查看该表的索引信息：

```sql
SELECT 
    tablename, 
    indexname, 
    indexdef 
FROM 
    pg_indexes 
WHERE 
    tablename = 'employees';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a54581e04eb641a09d3e8b7ae273e20f.png)


两个唯一键索引

## 6.表达式索引

通常，创建索引引用表的一个或多个列。但是我们也可以基于表达式创建一个索引，其中包括表列，并且这些情况被称为表达式索引。

表达式的索引也称为基于函数的索引。

创建语法：

```sql
CREATE INDEX index_name 
ON table_name (expression);
```

-  `expression`：当我们指定索引表达式时，该表达式可以在SQL命令的Order BY或WHERE子句中指定

注意，维护表达式的索引非常困难，因为 PostgreSQL 必须在插入或更新每一行时评估表达式，并将结果用于索引。因此，当检索速度比插入和更新速度更关键时，您应该在表达式上使用索引。

使用示例：

```sql
CREATE INDEX idx_ic_last_name
ON customer(LOWER(last_name));
```

现在，以不区分大小写的方式根据姓氏查找客户的查询将使用 index on 表达式，如下所示：

```sql
EXPLAIN
SELECT 
    customer_id, 
    first_name, 
    last_name 
FROM 
    customer 
WHERE 
    LOWER(last_name) = 'purdy';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/39f8cdeda7c04ab1a341df47c980ea2c.png)




## 7.部分索引

- PostgreSQL 部分索引允许您指定应该被索引的表的行
- 部分索引有助于加快查询速度，同时减小索引的大小

如果您有使用常量值的常用`WHERE`条件，则部分索引很有用

语法：

```sql
CREATE INDEX index_name
	ON table_name(column_list)
WHERE condition;
```

示例：

```sql
SELECT
    customer_id,
    first_name,
    last_name,
    email
FROM
    customer
WHERE
    active = 0;
```

要执行此查询，查询计划程序需要扫描`customer`表（可使用`EXPLAIN`语句查询）

可以通过为列创建索引来优化此查询，`active`如下所示：

```sql
CREATE INDEX idx_customer_active
ON customer(active);
```

该索引实现了它的目的，但是，它包含许多从未搜索过的行，即所有活跃客户。

要定义仅包含非活动客户的索引，请使用以下语句：

```sql
CREATE INDEX idx_customer_inactive
ON customer(active)
WHERE active = 0;
```

`WHERE`从现在开始，只要子句出现在查询中，PostgreSQL 就会考虑部分索引：

```sql
EXPLAIN SELECT
    customer_id,
    first_name,
    last_name,
    email
FROM
    customer
WHERE
    active = 0;
```

输出：
![在这里插入图片描述](https://img-blog.csdnimg.cn/61cf9fb275fc484da6ab177fe7ad5025.png)


## 8.REINDEX重置索引

实际上，由于硬件故障或软件错误，[索引](https://www.postgresqltutorial.com/postgresql-indexes/)可能会损坏并且不再包含有效数据。要恢复索引，可以使用以下`REINDEX`语句

```sql
REINDEX [ ( VERBOSE ) ] { INDEX | TABLE | SCHEMA | DATABASE | SYSTEM } name;
```

- `VERBOSE`关键字是可选的。包括在内时，该语句会在重新索引每个索引时显示进度报告

示例：

```sql
REINDEX INDEX index_name; //重新创建单个索引
REINDEX TABLE table_name;   //重新创建表的多个索引
REINDEX SCHEMA schema_name; //重新创建模式中所有索引
REINDEX DATABASE database_name; //在特定数据库中重新创建所有索引
REINDEX SYSTEM database_name; //重新创建特定数据库中系统目录的所有索引
```



`REINDEX`与`DROP INDEX`&`CREATE INDEX`:

该`REINDEX`语句从头开始重建索引内容，其效果类似于删除和重新创建索引。但是，它们之间的锁定机制是不同的。

`REINDEX`声明：

- 锁定索引所属表的写入但不读取。
- 对正在处理的索引进行排他锁，这会阻止尝试使用该索引的读取。

`DROP INDEX`&`CREATE INDEX`语句：

- 首先，`DROP INDEX`通过获取该表的排他锁来锁定索引所属表的写入和读取。
- 然后，后续`CREATE INDEX`语句将锁定写入，但不会从索引的父表中读取。但是，在创建索引期间读取可能会很昂贵。

## 9.多列索引

你可以在表的多个列上创建索引，该索引称为多列索引、复合索引、组合索引或级联索引。

一个表中最多有32个个列索引，可以在`pg_config_manual.h`修改该默认配置

只有 B-tree、GIST、GIN 和 BRIN 索引类型支持多列索引

定义多列索引时，应将`WHERE`子句中经常使用的列放在列列表的开头，将不常用的列放在条件后面。

创建语法：

```sql
CREATE INDEX index_name
ON table_name(a,b,c,...);
```

在上述语法中，PostgreSQL 优化器会在以下情况下考虑使用索引：

```sql
WHERE a = v1 and b = v2 and c = v3;
WHERE a = v1 and b = v2;
WHERE a = v1;
```

但是，它不会考虑在以下情况下使用索引：

```sql
WHERE  c = v3;
WHERE b = v2 and c = v3; 
```

示例：

```sql
CREATE TABLE people(
    id INT GENERATED BY DEFAULT AS IDENTITY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);
```

```sql
CREATE INDEX idx_people_names 
ON people (last_name, first_name);
```

```sql
EXPLAIN SELECT
    *
FROM
    people
WHERE
    last_name = 'Adams'
AND first_name = 'Lou';
```

PostgreSQL 优化器为此语句使用了索引，因为`WHERE`子句中的两列都在索引中：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2b535b4fea634618a9ef0c678588726b.png)


```sql
EXPLAIN SELECT
    *
FROM
    people
WHERE
    first_name = 'Lou';
```

没有使用多列索引，因为last_name不在前面

![在这里插入图片描述](https://img-blog.csdnimg.cn/8e9460e8eaf9469ebb80cd2b1f202a99.png)

## 10.索引解释器

在对查询性能进行故障排除时，应该查找以下几个项:

- 正在使用什么索引(如果有的话) ？
- 应用索引的顺序是什么？
- 功能评估的顺序是什么？
- 使用了什么策略: 嵌套循环、散列连接、合并连接、位图、顺序扫描？
- 计算成本和实际成本的区别是什么？
- 扫描了多少行？

PostgreSQL 包含各种查询解释计划，包括纯文本和图形的。

PostgreSQL 与大多数关系数据库一样，允许查看实际执行计划和计划执行计划。

PostgreSQL 中有三个层次的解释计划：

- `EXPLAIN` 不运行查询，而只是提供规划者可能采取的一般方法。当然，你几乎立刻就能得到最终的计划
- `EXPLAIN ANALYZE`运行查询，但不返回答案。它生成真实的计划和时间，而不返回结果
- `EXPLAIN  (ANALYZE,VERBOSE)` 进行深入的计划分析，生成更多的信息，例如正在输出的列

### [1]文本解释与 pgAdmin 图形解释

文本解释器`TEXTUAL EXPLAIN`：

- 可在psql和pgadmin中查看
- 文本解释计划通常比图形解释计划提供更多的信息

图形解释器`GRAPHICAL EXPLAIN`：

- 图形解释是从底层文本解释生成的文本解释的图解视图
- PgAdmin 图形化解释计划充满了令人眼花缭乱的内容，其中有独特的图标来表示聚合、散列连接、位图扫描、外部扫描、并行扫描和 CTE

#### 文本解释器

```sql
EXPLAIN 
SELECT t.town, r.rt_number
FROM 
	ch15.ma_towns AS t 
	INNER JOIN 
	ch15.ma_roads AS r 
	ON ST_Intersects(t.geom,r.geom)
WHERE r.rt_number = '9';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/0a6bf67e505642798865c52564e35d43.png)


上面的文本解释器信息提供：规划器的策略planner’s  strategy和每个步骤的成本

```sql
EXPLAIN ANALYZE
SELECT t.town, r.rt_number
FROM 
	ch15.ma_towns AS t 
	INNER JOIN 
	ch15.ma_roads AS r 
	ON ST_Intersects(t.geom,r.geom)
WHERE r.rt_number = '9';
```

![](https://img-blog.csdnimg.cn/06ac41bfca164ac5bee4668716bfde44.png)


`EXPLAIN ANALYZE`比`EXPLAIN`提供了更多信息：除了计划之外，它还报告每个步骤的实际时间、总时间、计划者必须扫描的行数以及通过过滤器删除的行数

```sql
EXPLAIN (ANALYZE, VERBOSE)
SELECT t.town, r.rt_number
FROM 
	ch15.ma_towns AS t 
	INNER JOIN 
	ch15.ma_roads AS r 
	ON ST_Intersects(t.geom,r.geom)
WHERE r.rt_number = '9';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/e60cd1fd97fa463d8cc9849575d70940.png)



#### 图形解释器

![在这里插入图片描述](https://img-blog.csdnimg.cn/599fe891e91a446790848277dbf37a55.png)


```sql
SELECT t.town, r.rt_number
FROM 
	ch15.ma_towns AS t 
	INNER JOIN 
	ch15.ma_roads AS r 
	ON ST_Intersects(t.geom,r.geom)
WHERE r.rt_number = '9';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/6198cbd9756d409fa959182162e5f195.png)


可以把鼠标停留在图标上，来获得相应节点的更多信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/f73964f183bd42e5acecaf4e253e15a9.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/b3315ee6cedd4879b8e916dbcc22ccf9.png)


### [2].计划器和索引

PostgreSQL 中的索引主要有 B 树、广义搜索树(GiST)、空间分区广义搜索树(SP-GiST)、广义逆树(GIN)和块范围索引(BRIN)。除了 GIN 之外，PostGIS 支持上述所有内容。

- `B-tree`尽管 PostGIS 支持 B 树，但由于它有最大大小限制，所以很少使用它。因此，它只能安全地用于点几何。然而，由于 B 树不支持 & & 重叠运算符，它甚至很少用于点。

- `BRIN`，正如它的“块范围索引”名称所暗示的那样，对数据行的块而不是单个记录进行索引。BRIN 在性能上几乎总是比 GiST/SP-GiST 和 B-tree 差，但它的权重要轻得多。因此，它主要用于有大量几何数据的情况，比如有大量的点数据或点云(大型多点数据)  ，其中主要关注的是可以快速构建较轻的索引。
- `SP-GiST` 是一种新的基于 GiST 的索引类型，并得到 PostGIS 2.5及以上版本的支持。可以为内置的 PostgreSQL  几何类型(而不是 Post-GIS 类型)、 text、 pg _ trgm 和 PostGIS 2.5 + 几何和地理类型定义  SP-GiST。

```sql
CREATE INDEX ix_sometable_geom_spgist ON sometable USING spgist (geom);
```

对于空间数据库，我们应该主要关注`GiST`。这应该是 PostGIS 空间类型(几何、地理、栅格)的选择索引。`SP-GiST` 是 PostGIS  几何学和地理学数据的第二选择。如果您不确定哪个索引最适合您的数据，SP-GiST 还是 GiST，可以使用 SP-GiST 创建索引，并使用  GiST 对性能差异进行基准测试.

### [3]带有空间索引的查询计划器

```SQL
CREATE INDEX ix_ch15_ma_towns_geom
ON ch15.ma_towns USING gist (geom) WITH (FILLFACTOR=90); 
```

```SQL
EXPLAIN (ANALYZE, VERBOSE)
SELECT t.town, r.rt_number -- <2>
FROM 
	ch15.ma_towns AS t 
	INNER JOIN 
	ch15.ma_roads AS r 
	ON ST_Intersects(t.geom,r.geom)
WHERE r.rt_number = '9';
```

同一语句这次使用了空间索引，对比其文本解释器：

![在这里插入图片描述](https://img-blog.csdnimg.cn/fc578a0a700148779c8c53e7f4cc3774.png)


- 索引扫描代替了顺序扫描
- 查询规划器规划者将 `ST_Intersect` 分解为两部分: 
  - 使用空间索引扫描的 && 部分排在第一位; 
  - 成本较高的 ST_Intersect 排在第二位
- 规划器列出了由空间连接筛选器 `ST_Intersect` 删除的行数。您会注意到，这个计数比没有索引时要低得多。这意味着在 && 操作期间执行的空间索引扫描使用索引比不使用索引更有效。换句话说，因为 && 捕获了更多的行，所以 `ST_Intersect` 需要检查更少的行。

参考：

- https://www.postgresqltutorial.com

- 《postgis in action 3th》