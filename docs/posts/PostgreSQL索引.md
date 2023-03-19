---
layout: Post
title:  PostgreSQL索引
date: 2022-09-10
useHeaderImage: true
headerImage: /img/in-post/2022-9-10/2.jpg
tags:
  - PostgreSQL
---

[[toc]]

本文章主要部分为https://www.postgresqltutorial.com翻译简化的学习笔记

索引的作用：帮你快速的查询数据

索引的缺点：

1. 你如果把这个东西设置为索引，那么就意味着你的这个表的数据的增删改效率都会变低
2. 索引需要占空间
3. 对于索引数据的每个操作，无论是插入、删除还是更新表行，该表的索引也需要更新（更新尚未建立索引的表字段不会导致索引更新；这种技术称为 Heap-Only Tuples）

所以说有些东西可以设置为索引，有些东西不推荐设置为索引。

### 0.索引引擎与原理

索引引擎参与与查询执行，会根据优化阶段创建的计划器调用它

对于每个索引方法都有如下的扫描技术：

- 索引扫描
- 位图扫描
- 仅索引扫描

下面为顺序和b-tree索引扫描的简单过程：

- **顺序** —— 通过扫描每一页中的行指针，依序读取所有页面中的所有元组
- **b树索引**——B树索引是一个文件，该索引文件包含着索引元组，索引元组由一个键值对组成，键为被索引的列值，值为目标堆元组的TID。进行索引查询时，首先使用键进行查找，如果找到了对应的索引元组，PostgreSQL就会根据相应值中的TID来读取对应的堆元组，如下图：所获索引元组中TID的值为（区块号 = 7，偏移号 = 2）， 这意味着目标堆元组是表中第7页的第2个元组，因而PostgreSQL可以直接读取所需的堆元组，而避免对页面做不必要的扫描。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b54bd9e1105f43928111cf9ebcfb8346~tplv-k3u1fbpfcp-zoom-1.image)


### 1.创建索引

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
- 一般，在创建索引的过程中会把表中的数据全部读一遍，该过程所用时间由表的大小决定，对于较大的表，可能会花费很久的时间（可以使用并行创建索引的技术解决）

```sql
SELECT * FROM address
WHERE phone = '223664661973';
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f47a144d82b14bbda5269ec29ae22305~tplv-k3u1fbpfcp-zoom-1.image)


检查是否使用索引：

```sql
EXPLAIN SELECT *
FROM address
WHERE phone = '223664661973';
```


```sql
CREATE INDEX idx_address_phone 
ON address(phone);

EXPLAIN SELECT *
	FROM address
WHERE phone = '223664661973';
```


### 2.删除索引

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

### 3.显示索引

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

### 4.索引方法/访问方法

PostgreSQL 有几种索引类型/方法：B-tree、Hash、GiST、SP-GiST、GIN 和 BRIN。每种索引类型使用不同的存储结构和算法来应对不同类型的查询。

当你使用`CREATE INDEX`语句而不指定索引类型时，PostgreSQL 默认使用 B-tree 索引类型，因为它最适合最常见的查询

除了一下的索引，还可以通过添加扩展的方式添加更多的新索引。

```
explain_test_db=# select * from pg_am;
 oid  | amname |      amhandler       | amtype 
------+--------+----------------------+--------
    2 | heap   | heap_tableam_handler | t
  403 | btree  | bthandler            | i
  405 | hash   | hashhandler          | i
  783 | gist   | gisthandler          | i
 2742 | gin    | ginhandler           | i
 4000 | spgist | spghandler           | i
 3580 | brin   | brinhandler          | i
(7 rows)

explain_test_db=# 
```

#### [1]B-tree 索引

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

如果您已经开始使用索引来优化您的 PostgreSQL 数据库，那么 B-tree 通常是首选。

#### [2]Hash索引

哈希索引只能处理简单的相等比较 (=)。这意味着每当索引列涉及使用等于（=）运算符的比较时，查询计划器query planner 将考虑使用哈希索引。

要创建哈希索引，请在子句中使用`CREATE INDEX`具有`HASH`索引类型的`USING`语句，如下所示：

```sql
CREATE INDEX index_name 
ON table_name USING HASH (indexed_column);
```



#### [3]GIN 索引

反转索引，可以处理包含多个键的值，如数组等。GIN支持用户定义的索引策略，可通过定义GIN索引的特定操作符类型实现不同的功能。PostgreSQL的标准发布中包含了用于一维数组的GIN操作符类，比如，它支持包含操作符“`@>`”、被包含操作符“`<@`”、相等操作符“`=`”、重叠操作符“`&&`”，等等

当您将多个值存储在单个列中时，GIN 索引最有用，例如hstore、array、 jsonb 和 range 类型。

#### [4]BRIN索引

BRIN代表dexes中的块范围。与 B-tree 索引相比，BRIN 更小，维护成本更低。

BRIN 允许在非常大的表上使用索引，这在以前使用没有水平分区的 B-tree 是不切实际的。

BRIN 常用于具有线性排序顺序的列，例如销售订单表的创建日期列。

#### [4]GiST 索引

不是单独一种索引类型，而是一种架构，可以在这种架构上实现很多不同的索引策略。`GiST`索引定义的特定操作符可以用于特定索引策略。`PostgreSQL`的标准发布中包含了用于二维几何数据类型的`GiST`操作符类，比如，一个图形包含另一个图形的操作符“`@>`”，一个图形在另一个图形的左边且没有重叠的操作符“`<<`”，等等。

`GiST` 代表广义搜索树。`GiST` 索引允许构建通用树结构。`GiST` 索引在索引几何数据类型和全文搜索时很有用。

#### [5]SP-GiST 索引

P-GiST是“Space-Partitioned GiST”的缩写，即空间分区GiST索引。它是从PostgreSQL9.2版本开始提供的一种新索引类型，主要是通过一些新的索引算法来提高GiST索引在某种情况下的性能。

SP-GiST 索引对于具有自然聚类元素且不是同等平衡树的数据最有用，例如 GIS、多媒体、电话路由和 IP 路由。

### 5.唯一键索引

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

此语句在PostgreSQL创建了俩个唯一键索引，一个是`employee_id`列，一个唯一键列email

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

在这里插入图片描述




两个唯一键索引

### 6.表达式索引

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

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11bd42d26cf4444694fe912f63ef003f~tplv-k3u1fbpfcp-zoom-1.image)




### 7.部分索引

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

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ec7d8f76bf341a89c4856f9d889b0d7~tplv-k3u1fbpfcp-zoom-1.image)

### 8.REINDEX重置索引

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

### 9.多列索引

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

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aba74894340544f681097d2d33d9b4e1~tplv-k3u1fbpfcp-zoom-1.image)


```sql
EXPLAIN SELECT
    *
FROM
    people
WHERE
    first_name = 'Lou';
```

没有使用多列索引，因为last_name不在前面

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecfc13bc87a745cc8d149b3bfe25fd60~tplv-k3u1fbpfcp-zoom-1.image)


### 10.执行计划器的解释

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

具体语法：

```sql
EXPLAIN [ ( option [, ...] ) ] statement
EXPLAIN [ ANALYZE ] [ VERBOSE ] statement
```

option

```sql
ANALYZE [ boolean ] -- ANALYZE选项通过实际执行SQL来获得SQL命令的实际执行计划。
VERBOSE [ boolean ] -- VERBOSE选项显示计划的附加信息，如计划树中每个节点输出的各个列，如果触发器被触发，还会输出触发器的名称。该选项的值默认为“FALSE”
COSTS [ boolean ] -- COSTS选项显示每个计划节点的启动成本和总成本，以及估计行数和每行宽度。该选项的值默认为“TRUE”
BUFFERS [ boolean ] -- BUFFERS选项显示缓冲区使用的信息。该参数只能与ANALYZE参数一起使用。显示的缓冲区信息包括共享块读和写的块数、本地块读和写的块数，以及临时块读和写的块数,默认为“FALSE”
FORMAT { TEXT | XML | JSON | YAML } -- FORMAT选项指定输出格式，输出格式可以是TEXT、XML、JSON或者YAML,默认为TEXT
```

#### [1]文本解释与pgAdmin图形解释

文本解释器`TEXTUAL EXPLAIN`：

- 可在`psql`和`pgadmin`中查看
- 文本解释计划通常比图形解释计划提供更多的信息

图形解释器`GRAPHICAL EXPLAIN`：

- 图形解释是从底层文本解释生成的文本解释的图解视图
- PgAdmin 图形化解释计划充满了令人眼花缭乱的内容，其中有独特的图标来表示聚合、散列连接、位图扫描、外部扫描、并行扫描和 CTE

##### 图形解释器
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbd1a5059f6b4549b3f5aa3faa9c0078~tplv-k3u1fbpfcp-zoom-1.image)





```sql
SELECT t.town, r.rt_number
FROM 
	ch15.ma_towns AS t 
	INNER JOIN 
	ch15.ma_roads AS r 
	ON ST_Intersects(t.geom,r.geom)
WHERE r.rt_number = '9';
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd49533f258a422197911e0124b4281b~tplv-k3u1fbpfcp-zoom-1.image)


可以把鼠标停留在图标上，来获得相应节点的更多信息

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c24dc5803954b6e93adb71b644435cc~tplv-k3u1fbpfcp-zoom-1.image)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51f1d828e6034dc2994fa4441038d020~tplv-k3u1fbpfcp-zoom-1.image)


#### [2]EXPLAIN输出结果解释

```sql
explain_test_db=# select * from testtab01;
 id | name 
----+------
  1 | hah
(1 row)

explain_test_db=# explain select * from testtab01;
                          QUERY PLAN                          
--------------------------------------------------------------
 Seq Scan on testtab01  (cost=0.00..21.60 rows=1160 width=42)
(1 row)

explain_test_db=# 
```

> -  `Seq Scan on testtab01`(顺序全表扫描)
> -  `cost=`后面有两个数字，中间由`..`分隔，第一个数字`0.00`表示启动的成本，也就是说，返回第一行需要多少cost值；第二个数字表示返回所有数据的成本，
> -  `rows=1160`：表示会返回1160行
> -  `width=42`：表示每行平均宽度为42字节
> -  成本`cost`用于描述SQL命令的执行代价，默认情况下，不同操作的cost值如下（根据下面的操作类型，PostgreSQL可以智能地计算出一个SQL命令的执行代价）
>    - 顺序扫描一个数据块，cost值定为`1`
>    - 随机扫描一个数据块，cost值定为`4`
>    - 处理一个数据行的CPU代价，cost值定为`0.01`
>    - 处理一个索引行的CPU代价，cost值定为`0.005`
>    - 每个操作符的CPU代价为`0.0025`

#### [3]EXPLAIN使用示例

##### format option

```sql
explain_test_db=# explain (format json) select * from testtab01;
             QUERY PLAN              
-------------------------------------
 [                                  +
   {                                +
     "Plan": {                      +
       "Node Type": "Seq Scan",     +
       "Parallel Aware": false,     +
       "Async Capable": false,      +
       "Relation Name": "testtab01",+
       "Alias": "testtab01",        +
       "Startup Cost": 0.00,        +
       "Total Cost": 21.60,         +
       "Plan Rows": 1160,           +
       "Plan Width": 42             +
     }                              +
   }                                +
 ]
(1 row)
explain_test_db=# explain (format xml) select * from testtab01;
                        QUERY PLAN                        
----------------------------------------------------------
 <explain xmlns="http://www.postgresql.org/2009/explain">+
   <Query>                                               +
     <Plan>                                              +
       <Node-Type>Seq Scan</Node-Type>                   +
       <Parallel-Aware>false</Parallel-Aware>            +
       <Async-Capable>false</Async-Capable>              +
       <Relation-Name>testtab01</Relation-Name>          +
       <Alias>testtab01</Alias>                          +
       <Startup-Cost>0.00</Startup-Cost>                 +
       <Total-Cost>21.60</Total-Cost>                    +
       <Plan-Rows>1160</Plan-Rows>                       +
       <Plan-Width>42</Plan-Width>                       +
     </Plan>                                             +
   </Query>                                              +
 </explain>
(1 row)
explain_test_db=# explain (format YAML) select * from testtab01;
           QUERY PLAN           
--------------------------------
 - Plan:                       +
     Node Type: "Seq Scan"     +
     Parallel Aware: false     +
     Async Capable: false      +
     Relation Name: "testtab01"+
     Alias: "testtab01"        +
     Startup Cost: 0.00        +
     Total Cost: 21.60         +
     Plan Rows: 1160           +
     Plan Width: 42
(1 row)
```

##### analyze option

添加“analyze”参数，通过实际执行来获得更精确的执行计划，命令如下

```sql
explain_test_db=# explain analyze select * from testtab01;
                                               QUERY PLAN                                               
---------------------------------------------------------------------------------------
 Seq Scan on testtab01  (cost=0.00..21.60 rows=1160 width=42) (actual time=0.018..0.031 rows=1 loops=1)
 Planning Time: 0.046 ms
 Execution Time: 0.158 ms
(3 rows)
```

> `actual time=0.018..0.031 rows=1 loops=1`实际启动时间为0.493毫秒，返回所有行的时间为4.320毫秒，返回的行数是10000
>
> 同类写法：explain (analyze true )select * from testtab01;

##### buffer option

联合使用analyze选项和buffers选项，通过实际执行来查看实际的代价和缓冲区命中的情况

```sql
explain_test_db=# explain (analyze true,buffers true ) select * from testtab01;
                                               QUERY PLAN                                               
--------------------------------------------------------------------------------------------------------
 Seq Scan on testtab01  (cost=0.00..21.60 rows=1160 width=42) (actual time=0.014..0.029 rows=1 loops=1)
   Buffers: shared hit=1
 Planning Time: 0.038 ms
 Execution Time: 0.075 ms
(4 rows)
```

> 因为加了buffers选项，执行计划的结果中就会出现一行“Buffers:shared hit=1 read=xxx written=yyy”，其中“shared hit=1”表示在共享内存中直接读到1个块，从磁盘中读到xxx块，写磁盘yyy块。

#### [4]全表扫描

全表扫描就是把表中的所有数据块从头到尾读一遍，然后从中找到符合条件的数据块。

#### [5]索引扫描

索引通常是为了加快查询数据的速度而增加的。索引扫描，就是在索引中找出需要的数据行的物理位置，然后再到表的数据块中把相应的数据读出来的过程。

索引扫描在`EXPLAIN`命令的输出结果中用“`Index Scan`”表示

#### [6]位图扫描

位图扫描也是走索引的一种方式。方法是扫描索引，把满足条件的行或块在内存中建一个位图，扫描完索引后，再根据位图到表的数据文件中把相应的数据读出来。如果走了两个索引，可以把两个索引形成的位图通过AND或OR计算合并成一个，再到表的数据文件中把数据读出来。

当执行计划的结果行数很多时会走这种扫描，如非等值查询、IN子句或有多个条件都可以走不同的索引时。

非等值示例：

```sql
sdba=# explain select * from testtab02 where id2 >10000;
QUERY PLAN
--------------------------------------------------------------------------------
Bitmap Heap Scan on testtab02 (cost=18708.13..36596.06 rows=998155 width=16)
	Recheck Cond: (id2 > 10000)
	-> Bitmap Index Scan on idx_testtab02_id2 (cost=0.00..18458.59 rows=998155
width=0)
	Index Cond: (id2 > 10000)
(4 rows)
```

> - `Bitmap Index Scan`先在索引中找到符合条件的行，然后在内存中创建位图，再到表中扫描，也就是我们看到的`Bitmap Heap Scan`
> - `Recheck Cond:(id2>10000)`，这是因为多版本的原因，从索引中找出的行从表中读出后还需要再检查一下条件。

IN子句走位图索引的示例：

```sql
osdba=# explain select * from testtab02 where id1 in (2,4,6,8);
QUERY PLAN
---------------------------------------------------------------------------------
Bitmap Heap Scan on testtab02 (cost=17.73..33.47 rows=4 width=16)
Recheck Cond: (id1 = ANY ('{2,4,6,8}'::integer[]))
-> Bitmap Index Scan on idx_testtab02_id1 (cost=0.00..17.73 rows=4 width=0)
Index Cond: (id1 = ANY ('{2,4,6,8}'::integer[]))
(4 rows)
```

走两个索引后将位图进行BitmapOr运算的示例：BitmapOr操作，即使用OR运算合并两个位图。

#### [7]条件过滤

条件过滤，一般就是在WHERE子句上加过滤条件，当扫描数据行时会找出满足过滤条件的行。条件过滤在执行计划中显示为“Filter”

```sql
nyc=# explain select * from nyc_streets where id<50;
                           QUERY PLAN
----------------------------------------------------------------
 Seq Scan on nyc_streets  (cost=0.00..753.64 rows=49 width=184)
   Filter: (id < '50'::double precision)
(2 行记录)

```

如果条件的列上有索引，可能会走索引而不走过滤

```sql
nyc=# explain select * from nyc_streets where gid<50;
                                       QUERY PLAN

---------------------------------------------------------------------------
-------------
 Index Scan using nyc_streets_pkey on nyc_streets  (cost=0.29..10.14 rows=4
9 width=184)
   Index Cond: (gid < 50)
(2 行记录)
```

## 

参考：
https://www.postgresqltutorial.com
《postgis in action 3th》