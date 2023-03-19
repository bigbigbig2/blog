<template><nav class="table-of-contents"><ul><li><RouterLink to="#_0-索引引擎与原理">0.索引引擎与原理</RouterLink></li><li><RouterLink to="#_1-创建索引">1.创建索引</RouterLink></li><li><RouterLink to="#_2-删除索引">2.删除索引</RouterLink></li><li><RouterLink to="#_3-显示索引">3.显示索引</RouterLink></li><li><RouterLink to="#_4-索引方法-访问方法">4.索引方法/访问方法</RouterLink><ul><li><RouterLink to="#_1-b-tree-索引">[1]B-tree 索引</RouterLink></li><li><RouterLink to="#_2-hash索引">[2]Hash索引</RouterLink></li><li><RouterLink to="#_3-gin-索引">[3]GIN 索引</RouterLink></li><li><RouterLink to="#_4-brin索引">[4]BRIN索引</RouterLink></li><li><RouterLink to="#_4-gist-索引">[4]GiST 索引</RouterLink></li><li><RouterLink to="#_5-sp-gist-索引">[5]SP-GiST 索引</RouterLink></li></ul></li><li><RouterLink to="#_5-唯一键索引">5.唯一键索引</RouterLink></li><li><RouterLink to="#_6-表达式索引">6.表达式索引</RouterLink></li><li><RouterLink to="#_7-部分索引">7.部分索引</RouterLink></li><li><RouterLink to="#_8-reindex重置索引">8.REINDEX重置索引</RouterLink></li><li><RouterLink to="#_9-多列索引">9.多列索引</RouterLink></li><li><RouterLink to="#_10-执行计划器的解释">10.执行计划器的解释</RouterLink><ul><li><RouterLink to="#_1-文本解释与pgadmin图形解释">[1]文本解释与pgAdmin图形解释</RouterLink><ul><li><RouterLink to="#图形解释器">图形解释器</RouterLink></li></ul></li><li><RouterLink to="#_2-explain输出结果解释">[2]EXPLAIN输出结果解释</RouterLink></li><li><RouterLink to="#_3-explain使用示例">[3]EXPLAIN使用示例</RouterLink><ul><li><RouterLink to="#format-option">format option</RouterLink></li><li><RouterLink to="#analyze-option">analyze option</RouterLink></li><li><RouterLink to="#buffer-option">buffer option</RouterLink></li></ul></li><li><RouterLink to="#_4-全表扫描">[4]全表扫描</RouterLink></li><li><RouterLink to="#_5-索引扫描">[5]索引扫描</RouterLink></li><li><RouterLink to="#_6-位图扫描">[6]位图扫描</RouterLink></li><li><RouterLink to="#_7-条件过滤">[7]条件过滤</RouterLink></li></ul></li><li><RouterLink to="#"></RouterLink></li></ul></nav>
<p>本文章主要部分为https://www.postgresqltutorial.com翻译简化的学习笔记</p>
<p>索引的作用：帮你快速的查询数据</p>
<p>索引的缺点：</p>
<ol>
<li>你如果把这个东西设置为索引，那么就意味着你的这个表的数据的增删改效率都会变低</li>
<li>索引需要占空间</li>
<li>对于索引数据的每个操作，无论是插入、删除还是更新表行，该表的索引也需要更新（更新尚未建立索引的表字段不会导致索引更新；这种技术称为 Heap-Only Tuples）</li>
</ol>
<p>所以说有些东西可以设置为索引，有些东西不推荐设置为索引。</p>
<h3 id="_0-索引引擎与原理" tabindex="-1"><a class="header-anchor" href="#_0-索引引擎与原理" aria-hidden="true">#</a> 0.索引引擎与原理</h3>
<p>索引引擎参与与查询执行，会根据优化阶段创建的计划器调用它</p>
<p>对于每个索引方法都有如下的扫描技术：</p>
<ul>
<li>索引扫描</li>
<li>位图扫描</li>
<li>仅索引扫描</li>
</ul>
<p>下面为顺序和b-tree索引扫描的简单过程：</p>
<ul>
<li><strong>顺序</strong> —— 通过扫描每一页中的行指针，依序读取所有页面中的所有元组</li>
<li><strong>b树索引</strong>——B树索引是一个文件，该索引文件包含着索引元组，索引元组由一个键值对组成，键为被索引的列值，值为目标堆元组的TID。进行索引查询时，首先使用键进行查找，如果找到了对应的索引元组，PostgreSQL就会根据相应值中的TID来读取对应的堆元组，如下图：所获索引元组中TID的值为（区块号 = 7，偏移号 = 2）， 这意味着目标堆元组是表中第7页的第2个元组，因而PostgreSQL可以直接读取所需的堆元组，而避免对页面做不必要的扫描。</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b54bd9e1105f43928111cf9ebcfb8346~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_1-创建索引" tabindex="-1"><a class="header-anchor" href="#_1-创建索引" aria-hidden="true">#</a> 1.创建索引</h3>
<p>索引是一种分离的数据结构，例如 B-Tree，它以额外的写入和存储为代价来加速表上的数据检索以维护它</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> index_name <span class="token keyword">ON</span> table_name <span class="token punctuation">[</span><span class="token keyword">USING</span> method<span class="token punctuation">]</span>
<span class="token punctuation">(</span>
    column_name <span class="token punctuation">[</span><span class="token keyword">ASC</span> <span class="token operator">|</span> <span class="token keyword">DESC</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>NULLS {<span class="token keyword">FIRST</span> <span class="token operator">|</span> <span class="token keyword">LAST</span> }<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>索引方法method：<code>btree</code>、<code>hash</code>、<code>gist</code>、<code>spgist</code>、<code>gin</code>、 <code>brin</code>（PostgreSQL默认使用<code>btree</code>）</li>
<li>列出要存储在索引中的一列或多列。和<code>ASC</code>指定<code>DESC</code>排序顺序。ASC 是默认值。<code>NULLS FIRST</code>或<code>NULLS LAST</code>指定空值在非空值之前或之后排序。指定<code>NULLS FIRST</code>时为默认值，未指定时为默认值。<code>DESC``NULLS LAST``DESC</code></li>
<li>可在查询语句前面使用<code>EXPLAIN</code>语句，来查看此次查询是否属于索引</li>
<li>一般，在创建索引的过程中会把表中的数据全部读一遍，该过程所用时间由表的大小决定，对于较大的表，可能会花费很久的时间（可以使用并行创建索引的技术解决）</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> address
<span class="token keyword">WHERE</span> phone <span class="token operator">=</span> <span class="token string">'223664661973'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f47a144d82b14bbda5269ec29ae22305~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>检查是否使用索引：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span>
<span class="token keyword">FROM</span> address
<span class="token keyword">WHERE</span> phone <span class="token operator">=</span> <span class="token string">'223664661973'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_address_phone 
<span class="token keyword">ON</span> address<span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span>
	<span class="token keyword">FROM</span> address
<span class="token keyword">WHERE</span> phone <span class="token operator">=</span> <span class="token string">'223664661973'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_2-删除索引" tabindex="-1"><a class="header-anchor" href="#_2-删除索引" aria-hidden="true">#</a> 2.删除索引</h3>
<p>有时候尽管你创建了索引，但是由于表格较小等原因，查询优化器会自动的不使用索引来查询数据，那么就可以将索引干掉了。</p>
<p>语法·</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">INDEX</span>  <span class="token punctuation">[</span> CONCURRENTLY<span class="token punctuation">]</span>
<span class="token punctuation">[</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> <span class="token punctuation">]</span>  index_name <span class="token punctuation">(</span>可以同时删除多个索引index1<span class="token punctuation">,</span>index2<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span> <span class="token keyword">CASCADE</span> <span class="token operator">|</span> <span class="token keyword">RESTRICT</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li><code>CASCADE</code>如果索引具有依赖对象，可以使用<code>CASCADE</code>选项来在删除索引时自动删除这该索引所依赖的对象</li>
<li><code>RESTRICT</code>如果有任何对象依赖该索引，<code>RESTRICT</code>选项指示 PostgreSQL 拒绝删除该索引，此选项为默认选项</li>
<li><code>CASCADE</code>如果索引具有依赖对象，您可以使用该<code>CASCADE</code>选项自动删除这些对象以及依赖于这些对象的所有对象。</li>
</ul>
<h3 id="_3-显示索引" tabindex="-1"><a class="header-anchor" href="#_3-显示索引" aria-hidden="true">#</a> 3.显示索引</h3>
<p>在PostgreSQL 中没有提供像<code>SHOW INDEXES</code>列出表或数据库的索引信息这样的命令。而是包含了一个默认的<code>pg_indexes</code>来存储索引信息，该视图由5个字段组成：</p>
<ul>
<li>schemaname：存储包含表和索引的模式的名称。</li>
<li>tablename：存储索引所属表的名称。</li>
<li>indexname：存储索引的名称。</li>
<li>tablespace：存储包含索引的表空间的名称。</li>
<li>indexdef：以<code>CREATE INDEX</code>语句的形式存储索引定义命令。</li>
</ul>
<p>例如：查看数据库中<code>public</code>模式的所有索引：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span>
    pg_indexes
<span class="token keyword">WHERE</span>
    schemaname <span class="token operator">=</span> <span class="token string">'public'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>查询某个表的所有索引</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
    indexname<span class="token punctuation">,</span>
    indexdef
<span class="token keyword">FROM</span>
    pg_indexes
<span class="token keyword">WHERE</span>
    tablename <span class="token operator">=</span> <span class="token string">'table_name'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>使用psql 命令行查看索引：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>\d table_name
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>该命令将返回表的所有信息，包括表的结构、索引、约束和触发器</p>
<h3 id="_4-索引方法-访问方法" tabindex="-1"><a class="header-anchor" href="#_4-索引方法-访问方法" aria-hidden="true">#</a> 4.索引方法/访问方法</h3>
<p>PostgreSQL 有几种索引类型/方法：B-tree、Hash、GiST、SP-GiST、GIN 和 BRIN。每种索引类型使用不同的存储结构和算法来应对不同类型的查询。</p>
<p>当你使用<code>CREATE INDEX</code>语句而不指定索引类型时，PostgreSQL 默认使用 B-tree 索引类型，因为它最适合最常见的查询</p>
<p>除了一下的索引，还可以通过添加扩展的方式添加更多的新索引。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>explain_test_db=# select * from pg_am;
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="_1-b-tree-索引" tabindex="-1"><a class="header-anchor" href="#_1-b-tree-索引" aria-hidden="true">#</a> [1]B-tree 索引</h4>
<p>B-tree 是一种自平衡树，它维护已排序的数据，并允许在对数logN时间复杂度内进行搜索、插入、删除和顺序访问</p>
<p>每当索引列涉及使用以下运算符之一的比较时，PostgreSQL 查询计划程序将考虑使用 B-tree 索引：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token operator">&lt;</span>
<span class="token operator">&lt;=</span>
<span class="token operator">=</span>
<span class="token operator">>=</span>
<span class="token operator">BETWEEN</span>
<span class="token operator">IN</span>
<span class="token operator">IS</span> <span class="token boolean">NULL</span>
<span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>此外，查询计划器可以将 B-tree 索引用于涉及模式匹配运算符的查询：如<code>LIKE</code>、<code>~</code>，例如：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>column_name <span class="token operator">LIKE</span> <span class="token string">'foo%'</span> 
column_name LKE <span class="token string">'bar%'</span> 
column_name  <span class="token operator">~</span> <span class="token string">'^foo'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果您已经开始使用索引来优化您的 PostgreSQL 数据库，那么 B-tree 通常是首选。</p>
<h4 id="_2-hash索引" tabindex="-1"><a class="header-anchor" href="#_2-hash索引" aria-hidden="true">#</a> [2]Hash索引</h4>
<p>哈希索引只能处理简单的相等比较 (=)。这意味着每当索引列涉及使用等于（=）运算符的比较时，查询计划器query planner 将考虑使用哈希索引。</p>
<p>要创建哈希索引，请在子句中使用<code>CREATE INDEX</code>具有<code>HASH</code>索引类型的<code>USING</code>语句，如下所示：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> index_name 
<span class="token keyword">ON</span> table_name <span class="token keyword">USING</span> <span class="token keyword">HASH</span> <span class="token punctuation">(</span>indexed_column<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="_3-gin-索引" tabindex="-1"><a class="header-anchor" href="#_3-gin-索引" aria-hidden="true">#</a> [3]GIN 索引</h4>
<p>反转索引，可以处理包含多个键的值，如数组等。GIN支持用户定义的索引策略，可通过定义GIN索引的特定操作符类型实现不同的功能。PostgreSQL的标准发布中包含了用于一维数组的GIN操作符类，比如，它支持包含操作符“<code>@&gt;</code>”、被包含操作符“<code>&lt;@</code>”、相等操作符“<code>=</code>”、重叠操作符“<code>&amp;&amp;</code>”，等等</p>
<p>当您将多个值存储在单个列中时，GIN 索引最有用，例如hstore、array、 jsonb 和 range 类型。</p>
<h4 id="_4-brin索引" tabindex="-1"><a class="header-anchor" href="#_4-brin索引" aria-hidden="true">#</a> [4]BRIN索引</h4>
<p>BRIN代表dexes中的块范围。与 B-tree 索引相比，BRIN 更小，维护成本更低。</p>
<p>BRIN 允许在非常大的表上使用索引，这在以前使用没有水平分区的 B-tree 是不切实际的。</p>
<p>BRIN 常用于具有线性排序顺序的列，例如销售订单表的创建日期列。</p>
<h4 id="_4-gist-索引" tabindex="-1"><a class="header-anchor" href="#_4-gist-索引" aria-hidden="true">#</a> [4]GiST 索引</h4>
<p>不是单独一种索引类型，而是一种架构，可以在这种架构上实现很多不同的索引策略。<code>GiST</code>索引定义的特定操作符可以用于特定索引策略。<code>PostgreSQL</code>的标准发布中包含了用于二维几何数据类型的<code>GiST</code>操作符类，比如，一个图形包含另一个图形的操作符“<code>@&gt;</code>”，一个图形在另一个图形的左边且没有重叠的操作符“<code>&lt;&lt;</code>”，等等。</p>
<p><code>GiST</code> 代表广义搜索树。<code>GiST</code> 索引允许构建通用树结构。<code>GiST</code> 索引在索引几何数据类型和全文搜索时很有用。</p>
<h4 id="_5-sp-gist-索引" tabindex="-1"><a class="header-anchor" href="#_5-sp-gist-索引" aria-hidden="true">#</a> [5]SP-GiST 索引</h4>
<p>P-GiST是“Space-Partitioned GiST”的缩写，即空间分区GiST索引。它是从PostgreSQL9.2版本开始提供的一种新索引类型，主要是通过一些新的索引算法来提高GiST索引在某种情况下的性能。</p>
<p>SP-GiST 索引对于具有自然聚类元素且不是同等平衡树的数据最有用，例如 GIS、多媒体、电话路由和 IP 路由。</p>
<h3 id="_5-唯一键索引" tabindex="-1"><a class="header-anchor" href="#_5-唯一键索引" aria-hidden="true">#</a> 5.唯一键索引</h3>
<p>PostgreSQL<code>UNIQUE</code>（唯一键）索引强制一列或多列中值的唯一性。要创建<code>UNIQUE</code>索引，可以使用以下语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">UNIQUE</span> <span class="token keyword">INDEX</span> index_name
<span class="token keyword">ON</span> table_name<span class="token punctuation">(</span>column_name<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li>
<p>请注意，只有 B 树索引可以声明为唯一索引。</p>
</li>
<li>
<p>为列定义<code>UNIQUE</code>索引时，<strong>该列不能存储具有相同值的多行。</strong></p>
</li>
<li>
<p>如果<code>UNIQUE</code>为两列或多列定义索引，则这些列中的组合值不能在多行中重复。</p>
</li>
<li>
<p>PostgreSQL 将<code>NULL</code> 其视为不同的值，因此，您可以在具有索引<code>NULL</code>的列中拥有多个值</p>
</li>
</ul>
<p>当您为表定义主键或唯一键约束时，PostgreSQL 会自动创建相应的<code>UNIQUE</code>索引</p>
<p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> employees <span class="token punctuation">(</span>
    employee_id <span class="token keyword">SERIAL</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    first_name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    last_name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    email <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>此语句在PostgreSQL创建了俩个唯一键索引，一个是<code>employee_id</code>列，一个唯一键列email</p>
<p>查看该表的索引信息：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 
    tablename<span class="token punctuation">,</span> 
    indexname<span class="token punctuation">,</span> 
    indexdef 
<span class="token keyword">FROM</span> 
    pg_indexes 
<span class="token keyword">WHERE</span> 
    tablename <span class="token operator">=</span> <span class="token string">'employees'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>在这里插入图片描述</p>
<p>两个唯一键索引</p>
<h3 id="_6-表达式索引" tabindex="-1"><a class="header-anchor" href="#_6-表达式索引" aria-hidden="true">#</a> 6.表达式索引</h3>
<p>通常，创建索引引用表的一个或多个列。但是我们也可以基于表达式创建一个索引，其中包括表列，并且这些情况被称为表达式索引。</p>
<p>表达式的索引也称为基于函数的索引。</p>
<p>创建语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> index_name 
<span class="token keyword">ON</span> table_name <span class="token punctuation">(</span>expression<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li><code>expression</code>：当我们指定索引表达式时，该表达式可以在SQL命令的Order BY或WHERE子句中指定</li>
</ul>
<p>注意，维护表达式的索引非常困难，因为 PostgreSQL 必须在插入或更新每一行时评估表达式，并将结果用于索引。因此，当检索速度比插入和更新速度更关键时，您应该在表达式上使用索引。</p>
<p>使用示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_ic_last_name
<span class="token keyword">ON</span> customer<span class="token punctuation">(</span>LOWER<span class="token punctuation">(</span>last_name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>现在，以不区分大小写的方式根据姓氏查找客户的查询将使用 index on 表达式，如下所示：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span>
<span class="token keyword">SELECT</span> 
    customer_id<span class="token punctuation">,</span> 
    first_name<span class="token punctuation">,</span> 
    last_name 
<span class="token keyword">FROM</span> 
    customer 
<span class="token keyword">WHERE</span> 
    LOWER<span class="token punctuation">(</span>last_name<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string">'purdy'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11bd42d26cf4444694fe912f63ef003f~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_7-部分索引" tabindex="-1"><a class="header-anchor" href="#_7-部分索引" aria-hidden="true">#</a> 7.部分索引</h3>
<ul>
<li>PostgreSQL 部分索引允许您指定应该被索引的表的行</li>
<li>部分索引有助于加快查询速度，同时减小索引的大小</li>
</ul>
<p>如果您有使用常量值的常用<code>WHERE</code>条件，则部分索引很有用</p>
<p>语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> index_name
	<span class="token keyword">ON</span> table_name<span class="token punctuation">(</span>column_list<span class="token punctuation">)</span>
<span class="token keyword">WHERE</span> condition<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
    customer_id<span class="token punctuation">,</span>
    first_name<span class="token punctuation">,</span>
    last_name<span class="token punctuation">,</span>
    email
<span class="token keyword">FROM</span>
    customer
<span class="token keyword">WHERE</span>
    active <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>要执行此查询，查询计划程序需要扫描<code>customer</code>表（可使用<code>EXPLAIN</code>语句查询）</p>
<p>可以通过为列创建索引来优化此查询，<code>active</code>如下所示：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_customer_active
<span class="token keyword">ON</span> customer<span class="token punctuation">(</span>active<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>该索引实现了它的目的，但是，它包含许多从未搜索过的行，即所有活跃客户。</p>
<p>要定义仅包含非活动客户的索引，请使用以下语句：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_customer_inactive
<span class="token keyword">ON</span> customer<span class="token punctuation">(</span>active<span class="token punctuation">)</span>
<span class="token keyword">WHERE</span> active <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><code>WHERE</code>从现在开始，只要子句出现在查询中，PostgreSQL 就会考虑部分索引：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span>
    customer_id<span class="token punctuation">,</span>
    first_name<span class="token punctuation">,</span>
    last_name<span class="token punctuation">,</span>
    email
<span class="token keyword">FROM</span>
    customer
<span class="token keyword">WHERE</span>
    active <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>输出：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ec7d8f76bf341a89c4856f9d889b0d7~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_8-reindex重置索引" tabindex="-1"><a class="header-anchor" href="#_8-reindex重置索引" aria-hidden="true">#</a> 8.REINDEX重置索引</h3>
<p>实际上，由于硬件故障或软件错误，<a href="https://www.postgresqltutorial.com/postgresql-indexes/" target="_blank" rel="noopener noreferrer">索引</a>可能会损坏并且不再包含有效数据。要恢复索引，可以使用以下<code>REINDEX</code>语句</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>REINDEX <span class="token punctuation">[</span> <span class="token punctuation">(</span> VERBOSE <span class="token punctuation">)</span> <span class="token punctuation">]</span> { <span class="token keyword">INDEX</span> <span class="token operator">|</span> <span class="token keyword">TABLE</span> <span class="token operator">|</span> <span class="token keyword">SCHEMA</span> <span class="token operator">|</span> <span class="token keyword">DATABASE</span> <span class="token operator">|</span> SYSTEM } name<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul>
<li><code>VERBOSE</code>关键字是可选的。包括在内时，该语句会在重新索引每个索引时显示进度报告</li>
</ul>
<p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>REINDEX <span class="token keyword">INDEX</span> index_name<span class="token punctuation">;</span> <span class="token comment">//重新创建单个索引</span>
REINDEX <span class="token keyword">TABLE</span> table_name<span class="token punctuation">;</span>   <span class="token comment">//重新创建表的多个索引</span>
REINDEX <span class="token keyword">SCHEMA</span> schema_name<span class="token punctuation">;</span> <span class="token comment">//重新创建模式中所有索引</span>
REINDEX <span class="token keyword">DATABASE</span> database_name<span class="token punctuation">;</span> <span class="token comment">//在特定数据库中重新创建所有索引</span>
REINDEX SYSTEM database_name<span class="token punctuation">;</span> <span class="token comment">//重新创建特定数据库中系统目录的所有索引</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>REINDEX</code>与<code>DROP INDEX</code>&amp;<code>CREATE INDEX</code>:</p>
<p>该<code>REINDEX</code>语句从头开始重建索引内容，其效果类似于删除和重新创建索引。但是，它们之间的锁定机制是不同的。</p>
<p><code>REINDEX</code>声明：</p>
<ul>
<li>锁定索引所属表的写入但不读取。</li>
<li>对正在处理的索引进行排他锁，这会阻止尝试使用该索引的读取。</li>
</ul>
<p><code>DROP INDEX</code>&amp;<code>CREATE INDEX</code>语句：</p>
<ul>
<li>首先，<code>DROP INDEX</code>通过获取该表的排他锁来锁定索引所属表的写入和读取。</li>
<li>然后，后续<code>CREATE INDEX</code>语句将锁定写入，但不会从索引的父表中读取。但是，在创建索引期间读取可能会很昂贵。</li>
</ul>
<h3 id="_9-多列索引" tabindex="-1"><a class="header-anchor" href="#_9-多列索引" aria-hidden="true">#</a> 9.多列索引</h3>
<p>你可以在表的多个列上创建索引，该索引称为多列索引、复合索引、组合索引或级联索引。</p>
<p>一个表中最多有32个个列索引，可以在<code>pg_config_manual.h</code>修改该默认配置</p>
<p>只有 B-tree、GIST、GIN 和 BRIN 索引类型支持多列索引</p>
<p>定义多列索引时，应将<code>WHERE</code>子句中经常使用的列放在列列表的开头，将不常用的列放在条件后面。</p>
<p>创建语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> index_name
<span class="token keyword">ON</span> table_name<span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">,</span>c<span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在上述语法中，PostgreSQL 优化器会在以下情况下考虑使用索引：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">WHERE</span> a <span class="token operator">=</span> v1 <span class="token operator">and</span> b <span class="token operator">=</span> v2 <span class="token operator">and</span> c <span class="token operator">=</span> v3<span class="token punctuation">;</span>
<span class="token keyword">WHERE</span> a <span class="token operator">=</span> v1 <span class="token operator">and</span> b <span class="token operator">=</span> v2<span class="token punctuation">;</span>
<span class="token keyword">WHERE</span> a <span class="token operator">=</span> v1<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>但是，它不会考虑在以下情况下使用索引：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">WHERE</span>  c <span class="token operator">=</span> v3<span class="token punctuation">;</span>
<span class="token keyword">WHERE</span> b <span class="token operator">=</span> v2 <span class="token operator">and</span> c <span class="token operator">=</span> v3<span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> people<span class="token punctuation">(</span>
    id <span class="token keyword">INT</span> GENERATED <span class="token keyword">BY</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">AS</span> <span class="token keyword">IDENTITY</span><span class="token punctuation">,</span>
    first_name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    last_name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_people_names 
<span class="token keyword">ON</span> people <span class="token punctuation">(</span>last_name<span class="token punctuation">,</span> first_name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span>
    <span class="token operator">*</span>
<span class="token keyword">FROM</span>
    people
<span class="token keyword">WHERE</span>
    last_name <span class="token operator">=</span> <span class="token string">'Adams'</span>
<span class="token operator">AND</span> first_name <span class="token operator">=</span> <span class="token string">'Lou'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>PostgreSQL 优化器为此语句使用了索引，因为<code>WHERE</code>子句中的两列都在索引中：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aba74894340544f681097d2d33d9b4e1~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span>
    <span class="token operator">*</span>
<span class="token keyword">FROM</span>
    people
<span class="token keyword">WHERE</span>
    first_name <span class="token operator">=</span> <span class="token string">'Lou'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>没有使用多列索引，因为last_name不在前面</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecfc13bc87a745cc8d149b3bfe25fd60~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_10-执行计划器的解释" tabindex="-1"><a class="header-anchor" href="#_10-执行计划器的解释" aria-hidden="true">#</a> 10.执行计划器的解释</h3>
<p>在对查询性能进行故障排除时，应该查找以下几个项:</p>
<ul>
<li>正在使用什么索引(如果有的话) ？</li>
<li>应用索引的顺序是什么？</li>
<li>功能评估的顺序是什么？</li>
<li>使用了什么策略: 嵌套循环、散列连接、合并连接、位图、顺序扫描？</li>
<li>计算成本和实际成本的区别是什么？</li>
<li>扫描了多少行？</li>
</ul>
<p>PostgreSQL 包含各种查询解释计划，包括纯文本和图形的。</p>
<p>PostgreSQL 与大多数关系数据库一样，允许查看实际执行计划和计划执行计划。</p>
<p>PostgreSQL 中有三个层次的解释计划：</p>
<ul>
<li><code>EXPLAIN</code> 不运行查询，而只是提供规划者可能采取的一般方法。当然，你几乎立刻就能得到最终的计划</li>
<li><code>EXPLAIN ANALYZE</code>运行查询，但不返回答案。它生成真实的计划和时间，而不返回结果</li>
<li><code>EXPLAIN  (ANALYZE,VERBOSE)</code> 进行深入的计划分析，生成更多的信息，例如正在输出的列</li>
</ul>
<p>具体语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> <span class="token punctuation">[</span> <span class="token punctuation">(</span> <span class="token keyword">option</span> <span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span> <span class="token punctuation">)</span> <span class="token punctuation">]</span> statement
<span class="token keyword">EXPLAIN</span> <span class="token punctuation">[</span> <span class="token keyword">ANALYZE</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> VERBOSE <span class="token punctuation">]</span> statement
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>option</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">ANALYZE</span> <span class="token punctuation">[</span> <span class="token keyword">boolean</span> <span class="token punctuation">]</span> <span class="token comment">-- ANALYZE选项通过实际执行SQL来获得SQL命令的实际执行计划。</span>
VERBOSE <span class="token punctuation">[</span> <span class="token keyword">boolean</span> <span class="token punctuation">]</span> <span class="token comment">-- VERBOSE选项显示计划的附加信息，如计划树中每个节点输出的各个列，如果触发器被触发，还会输出触发器的名称。该选项的值默认为“FALSE”</span>
COSTS <span class="token punctuation">[</span> <span class="token keyword">boolean</span> <span class="token punctuation">]</span> <span class="token comment">-- COSTS选项显示每个计划节点的启动成本和总成本，以及估计行数和每行宽度。该选项的值默认为“TRUE”</span>
BUFFERS <span class="token punctuation">[</span> <span class="token keyword">boolean</span> <span class="token punctuation">]</span> <span class="token comment">-- BUFFERS选项显示缓冲区使用的信息。该参数只能与ANALYZE参数一起使用。显示的缓冲区信息包括共享块读和写的块数、本地块读和写的块数，以及临时块读和写的块数,默认为“FALSE”</span>
FORMAT { <span class="token keyword">TEXT</span> <span class="token operator">|</span> XML <span class="token operator">|</span> JSON <span class="token operator">|</span> YAML } <span class="token comment">-- FORMAT选项指定输出格式，输出格式可以是TEXT、XML、JSON或者YAML,默认为TEXT</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="_1-文本解释与pgadmin图形解释" tabindex="-1"><a class="header-anchor" href="#_1-文本解释与pgadmin图形解释" aria-hidden="true">#</a> [1]文本解释与pgAdmin图形解释</h4>
<p>文本解释器<code>TEXTUAL EXPLAIN</code>：</p>
<ul>
<li>可在<code>psql</code>和<code>pgadmin</code>中查看</li>
<li>文本解释计划通常比图形解释计划提供更多的信息</li>
</ul>
<p>图形解释器<code>GRAPHICAL EXPLAIN</code>：</p>
<ul>
<li>图形解释是从底层文本解释生成的文本解释的图解视图</li>
<li>PgAdmin 图形化解释计划充满了令人眼花缭乱的内容，其中有独特的图标来表示聚合、散列连接、位图扫描、外部扫描、并行扫描和 CTE</li>
</ul>
<h5 id="图形解释器" tabindex="-1"><a class="header-anchor" href="#图形解释器" aria-hidden="true">#</a> 图形解释器</h5>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbd1a5059f6b4549b3f5aa3faa9c0078~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> t<span class="token punctuation">.</span>town<span class="token punctuation">,</span> r<span class="token punctuation">.</span>rt_number
<span class="token keyword">FROM</span> 
	ch15<span class="token punctuation">.</span>ma_towns <span class="token keyword">AS</span> t 
	<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> 
	ch15<span class="token punctuation">.</span>ma_roads <span class="token keyword">AS</span> r 
	<span class="token keyword">ON</span> ST_Intersects<span class="token punctuation">(</span>t<span class="token punctuation">.</span>geom<span class="token punctuation">,</span>r<span class="token punctuation">.</span>geom<span class="token punctuation">)</span>
<span class="token keyword">WHERE</span> r<span class="token punctuation">.</span>rt_number <span class="token operator">=</span> <span class="token string">'9'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd49533f258a422197911e0124b4281b~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>可以把鼠标停留在图标上，来获得相应节点的更多信息</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c24dc5803954b6e93adb71b644435cc~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51f1d828e6034dc2994fa4441038d020~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="_2-explain输出结果解释" tabindex="-1"><a class="header-anchor" href="#_2-explain输出结果解释" aria-hidden="true">#</a> [2]EXPLAIN输出结果解释</h4>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>explain_test_db<span class="token operator">=</span><span class="token comment"># select * from testtab01;</span>
 id <span class="token operator">|</span> name 
<span class="token comment">----+------</span>
  <span class="token number">1</span> <span class="token operator">|</span> hah
<span class="token punctuation">(</span><span class="token number">1</span> <span class="token keyword">row</span><span class="token punctuation">)</span>

explain_test_db<span class="token operator">=</span><span class="token comment"># explain select * from testtab01;</span>
                          QUERY <span class="token keyword">PLAN</span>                          
<span class="token comment">--------------------------------------------------------------</span>
 Seq Scan <span class="token keyword">on</span> testtab01  <span class="token punctuation">(</span>cost<span class="token operator">=</span><span class="token number">0.00</span><span class="token punctuation">.</span><span class="token number">.21</span><span class="token number">.60</span> <span class="token keyword">rows</span><span class="token operator">=</span><span class="token number">1160</span> width<span class="token operator">=</span><span class="token number">42</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token number">1</span> <span class="token keyword">row</span><span class="token punctuation">)</span>

explain_test_db<span class="token operator">=</span><span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><blockquote>
<ul>
<li><code>Seq Scan on testtab01</code>(顺序全表扫描)</li>
<li><code>cost=</code>后面有两个数字，中间由<code>..</code>分隔，第一个数字<code>0.00</code>表示启动的成本，也就是说，返回第一行需要多少cost值；第二个数字表示返回所有数据的成本，</li>
<li><code>rows=1160</code>：表示会返回1160行</li>
<li><code>width=42</code>：表示每行平均宽度为42字节</li>
<li>成本<code>cost</code>用于描述SQL命令的执行代价，默认情况下，不同操作的cost值如下（根据下面的操作类型，PostgreSQL可以智能地计算出一个SQL命令的执行代价）
<ul>
<li>顺序扫描一个数据块，cost值定为<code>1</code></li>
<li>随机扫描一个数据块，cost值定为<code>4</code></li>
<li>处理一个数据行的CPU代价，cost值定为<code>0.01</code></li>
<li>处理一个索引行的CPU代价，cost值定为<code>0.005</code></li>
<li>每个操作符的CPU代价为<code>0.0025</code></li>
</ul>
</li>
</ul>
</blockquote>
<h4 id="_3-explain使用示例" tabindex="-1"><a class="header-anchor" href="#_3-explain使用示例" aria-hidden="true">#</a> [3]EXPLAIN使用示例</h4>
<h5 id="format-option" tabindex="-1"><a class="header-anchor" href="#format-option" aria-hidden="true">#</a> format option</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>explain_test_db<span class="token operator">=</span><span class="token comment"># explain (format json) select * from testtab01;</span>
             QUERY <span class="token keyword">PLAN</span>              
<span class="token comment">-------------------------------------</span>
 <span class="token punctuation">[</span>                                  <span class="token operator">+</span>
   {                                <span class="token operator">+</span>
     <span class="token string">"Plan"</span>: {                      <span class="token operator">+</span>
       <span class="token string">"Node Type"</span>: <span class="token string">"Seq Scan"</span><span class="token punctuation">,</span>     <span class="token operator">+</span>
       <span class="token string">"Parallel Aware"</span>: <span class="token boolean">false</span><span class="token punctuation">,</span>     <span class="token operator">+</span>
       <span class="token string">"Async Capable"</span>: <span class="token boolean">false</span><span class="token punctuation">,</span>      <span class="token operator">+</span>
       <span class="token string">"Relation Name"</span>: <span class="token string">"testtab01"</span><span class="token punctuation">,</span><span class="token operator">+</span>
       <span class="token string">"Alias"</span>: <span class="token string">"testtab01"</span><span class="token punctuation">,</span>        <span class="token operator">+</span>
       <span class="token string">"Startup Cost"</span>: <span class="token number">0.00</span><span class="token punctuation">,</span>        <span class="token operator">+</span>
       <span class="token string">"Total Cost"</span>: <span class="token number">21.60</span><span class="token punctuation">,</span>         <span class="token operator">+</span>
       <span class="token string">"Plan Rows"</span>: <span class="token number">1160</span><span class="token punctuation">,</span>           <span class="token operator">+</span>
       <span class="token string">"Plan Width"</span>: <span class="token number">42</span>             <span class="token operator">+</span>
     }                              <span class="token operator">+</span>
   }                                <span class="token operator">+</span>
 <span class="token punctuation">]</span>
<span class="token punctuation">(</span><span class="token number">1</span> <span class="token keyword">row</span><span class="token punctuation">)</span>
explain_test_db<span class="token operator">=</span><span class="token comment"># explain (format xml) select * from testtab01;</span>
                        QUERY <span class="token keyword">PLAN</span>                        
<span class="token comment">----------------------------------------------------------</span>
 <span class="token operator">&lt;</span><span class="token keyword">explain</span> xmlns<span class="token operator">=</span><span class="token string">"http://www.postgresql.org/2009/explain"</span><span class="token operator">></span><span class="token operator">+</span>
   <span class="token operator">&lt;</span>Query<span class="token operator">></span>                                               <span class="token operator">+</span>
     <span class="token operator">&lt;</span><span class="token keyword">Plan</span><span class="token operator">></span>                                              <span class="token operator">+</span>
       <span class="token operator">&lt;</span>Node<span class="token operator">-</span><span class="token keyword">Type</span><span class="token operator">></span>Seq Scan<span class="token operator">&lt;</span><span class="token operator">/</span>Node<span class="token operator">-</span><span class="token keyword">Type</span><span class="token operator">></span>                   <span class="token operator">+</span>
       <span class="token operator">&lt;</span>Parallel<span class="token operator">-</span>Aware<span class="token operator">></span><span class="token boolean">false</span><span class="token operator">&lt;</span><span class="token operator">/</span>Parallel<span class="token operator">-</span>Aware<span class="token operator">></span>            <span class="token operator">+</span>
       <span class="token operator">&lt;</span>Async<span class="token operator">-</span>Capable<span class="token operator">></span><span class="token boolean">false</span><span class="token operator">&lt;</span><span class="token operator">/</span>Async<span class="token operator">-</span>Capable<span class="token operator">></span>              <span class="token operator">+</span>
       <span class="token operator">&lt;</span>Relation<span class="token operator">-</span>Name<span class="token operator">></span>testtab01<span class="token operator">&lt;</span><span class="token operator">/</span>Relation<span class="token operator">-</span>Name<span class="token operator">></span>          <span class="token operator">+</span>
       <span class="token operator">&lt;</span>Alias<span class="token operator">></span>testtab01<span class="token operator">&lt;</span><span class="token operator">/</span>Alias<span class="token operator">></span>                          <span class="token operator">+</span>
       <span class="token operator">&lt;</span>Startup<span class="token operator">-</span>Cost<span class="token operator">></span><span class="token number">0.00</span><span class="token operator">&lt;</span><span class="token operator">/</span>Startup<span class="token operator">-</span>Cost<span class="token operator">></span>                 <span class="token operator">+</span>
       <span class="token operator">&lt;</span>Total<span class="token operator">-</span>Cost<span class="token operator">></span><span class="token number">21.60</span><span class="token operator">&lt;</span><span class="token operator">/</span>Total<span class="token operator">-</span>Cost<span class="token operator">></span>                    <span class="token operator">+</span>
       <span class="token operator">&lt;</span><span class="token keyword">Plan</span><span class="token operator">-</span><span class="token keyword">Rows</span><span class="token operator">></span><span class="token number">1160</span><span class="token operator">&lt;</span><span class="token operator">/</span><span class="token keyword">Plan</span><span class="token operator">-</span><span class="token keyword">Rows</span><span class="token operator">></span>                       <span class="token operator">+</span>
       <span class="token operator">&lt;</span><span class="token keyword">Plan</span><span class="token operator">-</span>Width<span class="token operator">></span><span class="token number">42</span><span class="token operator">&lt;</span><span class="token operator">/</span><span class="token keyword">Plan</span><span class="token operator">-</span>Width<span class="token operator">></span>                       <span class="token operator">+</span>
     <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token keyword">Plan</span><span class="token operator">></span>                                             <span class="token operator">+</span>
   <span class="token operator">&lt;</span><span class="token operator">/</span>Query<span class="token operator">></span>                                              <span class="token operator">+</span>
 <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token keyword">explain</span><span class="token operator">></span>
<span class="token punctuation">(</span><span class="token number">1</span> <span class="token keyword">row</span><span class="token punctuation">)</span>
explain_test_db<span class="token operator">=</span><span class="token comment"># explain (format YAML) select * from testtab01;</span>
           QUERY <span class="token keyword">PLAN</span>           
<span class="token comment">--------------------------------</span>
 <span class="token operator">-</span> <span class="token keyword">Plan</span>:                       <span class="token operator">+</span>
     Node <span class="token keyword">Type</span>: <span class="token string">"Seq Scan"</span>     <span class="token operator">+</span>
     Parallel Aware: <span class="token boolean">false</span>     <span class="token operator">+</span>
     Async Capable: <span class="token boolean">false</span>      <span class="token operator">+</span>
     Relation Name: <span class="token string">"testtab01"</span><span class="token operator">+</span>
     Alias: <span class="token string">"testtab01"</span>        <span class="token operator">+</span>
     Startup Cost: <span class="token number">0.00</span>        <span class="token operator">+</span>
     Total Cost: <span class="token number">21.60</span>         <span class="token operator">+</span>
     <span class="token keyword">Plan</span> <span class="token keyword">Rows</span>: <span class="token number">1160</span>           <span class="token operator">+</span>
     <span class="token keyword">Plan</span> Width: <span class="token number">42</span>
<span class="token punctuation">(</span><span class="token number">1</span> <span class="token keyword">row</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><h5 id="analyze-option" tabindex="-1"><a class="header-anchor" href="#analyze-option" aria-hidden="true">#</a> analyze option</h5>
<p>添加“analyze”参数，通过实际执行来获得更精确的执行计划，命令如下</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>explain_test_db<span class="token operator">=</span><span class="token comment"># explain analyze select * from testtab01;</span>
                                               QUERY <span class="token keyword">PLAN</span>                                               
<span class="token comment">---------------------------------------------------------------------------------------</span>
 Seq Scan <span class="token keyword">on</span> testtab01  <span class="token punctuation">(</span>cost<span class="token operator">=</span><span class="token number">0.00</span><span class="token punctuation">.</span><span class="token number">.21</span><span class="token number">.60</span> <span class="token keyword">rows</span><span class="token operator">=</span><span class="token number">1160</span> width<span class="token operator">=</span><span class="token number">42</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>actual <span class="token keyword">time</span><span class="token operator">=</span><span class="token number">0.018</span><span class="token punctuation">.</span><span class="token number">.0</span><span class="token number">.031</span> <span class="token keyword">rows</span><span class="token operator">=</span><span class="token number">1</span> loops<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
 Planning <span class="token keyword">Time</span>: <span class="token number">0.046</span> ms
 Execution <span class="token keyword">Time</span>: <span class="token number">0.158</span> ms
<span class="token punctuation">(</span><span class="token number">3</span> <span class="token keyword">rows</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><blockquote>
<p><code>actual time=0.018..0.031 rows=1 loops=1</code>实际启动时间为0.493毫秒，返回所有行的时间为4.320毫秒，返回的行数是10000</p>
<p>同类写法：explain (analyze true )select * from testtab01;</p>
</blockquote>
<h5 id="buffer-option" tabindex="-1"><a class="header-anchor" href="#buffer-option" aria-hidden="true">#</a> buffer option</h5>
<p>联合使用analyze选项和buffers选项，通过实际执行来查看实际的代价和缓冲区命中的情况</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>explain_test_db<span class="token operator">=</span><span class="token comment"># explain (analyze true,buffers true ) select * from testtab01;</span>
                                               QUERY <span class="token keyword">PLAN</span>                                               
<span class="token comment">--------------------------------------------------------------------------------------------------------</span>
 Seq Scan <span class="token keyword">on</span> testtab01  <span class="token punctuation">(</span>cost<span class="token operator">=</span><span class="token number">0.00</span><span class="token punctuation">.</span><span class="token number">.21</span><span class="token number">.60</span> <span class="token keyword">rows</span><span class="token operator">=</span><span class="token number">1160</span> width<span class="token operator">=</span><span class="token number">42</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>actual <span class="token keyword">time</span><span class="token operator">=</span><span class="token number">0.014</span><span class="token punctuation">.</span><span class="token number">.0</span><span class="token number">.029</span> <span class="token keyword">rows</span><span class="token operator">=</span><span class="token number">1</span> loops<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
   Buffers: shared hit<span class="token operator">=</span><span class="token number">1</span>
 Planning <span class="token keyword">Time</span>: <span class="token number">0.038</span> ms
 Execution <span class="token keyword">Time</span>: <span class="token number">0.075</span> ms
<span class="token punctuation">(</span><span class="token number">4</span> <span class="token keyword">rows</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote>
<p>因为加了buffers选项，执行计划的结果中就会出现一行“Buffers:shared hit=1 read=xxx written=yyy”，其中“shared hit=1”表示在共享内存中直接读到1个块，从磁盘中读到xxx块，写磁盘yyy块。</p>
</blockquote>
<h4 id="_4-全表扫描" tabindex="-1"><a class="header-anchor" href="#_4-全表扫描" aria-hidden="true">#</a> [4]全表扫描</h4>
<p>全表扫描就是把表中的所有数据块从头到尾读一遍，然后从中找到符合条件的数据块。</p>
<h4 id="_5-索引扫描" tabindex="-1"><a class="header-anchor" href="#_5-索引扫描" aria-hidden="true">#</a> [5]索引扫描</h4>
<p>索引通常是为了加快查询数据的速度而增加的。索引扫描，就是在索引中找出需要的数据行的物理位置，然后再到表的数据块中把相应的数据读出来的过程。</p>
<p>索引扫描在<code>EXPLAIN</code>命令的输出结果中用“<code>Index Scan</code>”表示</p>
<h4 id="_6-位图扫描" tabindex="-1"><a class="header-anchor" href="#_6-位图扫描" aria-hidden="true">#</a> [6]位图扫描</h4>
<p>位图扫描也是走索引的一种方式。方法是扫描索引，把满足条件的行或块在内存中建一个位图，扫描完索引后，再根据位图到表的数据文件中把相应的数据读出来。如果走了两个索引，可以把两个索引形成的位图通过AND或OR计算合并成一个，再到表的数据文件中把数据读出来。</p>
<p>当执行计划的结果行数很多时会走这种扫描，如非等值查询、IN子句或有多个条件都可以走不同的索引时。</p>
<p>非等值示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>sdba<span class="token operator">=</span><span class="token comment"># explain select * from testtab02 where id2 >10000;</span>
QUERY <span class="token keyword">PLAN</span>
<span class="token comment">--------------------------------------------------------------------------------</span>
Bitmap Heap Scan <span class="token keyword">on</span> testtab02 <span class="token punctuation">(</span>cost<span class="token operator">=</span><span class="token number">18708.13</span><span class="token punctuation">.</span><span class="token number">.36596</span><span class="token number">.06</span> <span class="token keyword">rows</span><span class="token operator">=</span><span class="token number">998155</span> width<span class="token operator">=</span><span class="token number">16</span><span class="token punctuation">)</span>
	Recheck Cond: <span class="token punctuation">(</span>id2 <span class="token operator">></span> <span class="token number">10000</span><span class="token punctuation">)</span>
	<span class="token operator">-</span><span class="token operator">></span> Bitmap <span class="token keyword">Index</span> Scan <span class="token keyword">on</span> idx_testtab02_id2 <span class="token punctuation">(</span>cost<span class="token operator">=</span><span class="token number">0.00</span><span class="token punctuation">.</span><span class="token number">.18458</span><span class="token number">.59</span> <span class="token keyword">rows</span><span class="token operator">=</span><span class="token number">998155</span>
width<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token keyword">Index</span> Cond: <span class="token punctuation">(</span>id2 <span class="token operator">></span> <span class="token number">10000</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token number">4</span> <span class="token keyword">rows</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><blockquote>
<ul>
<li><code>Bitmap Index Scan</code>先在索引中找到符合条件的行，然后在内存中创建位图，再到表中扫描，也就是我们看到的<code>Bitmap Heap Scan</code></li>
<li><code>Recheck Cond:(id2&gt;10000)</code>，这是因为多版本的原因，从索引中找出的行从表中读出后还需要再检查一下条件。</li>
</ul>
</blockquote>
<p>IN子句走位图索引的示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>osdba<span class="token operator">=</span><span class="token comment"># explain select * from testtab02 where id1 in (2,4,6,8);</span>
QUERY <span class="token keyword">PLAN</span>
<span class="token comment">---------------------------------------------------------------------------------</span>
Bitmap Heap Scan <span class="token keyword">on</span> testtab02 <span class="token punctuation">(</span>cost<span class="token operator">=</span><span class="token number">17.73</span><span class="token punctuation">.</span><span class="token number">.33</span><span class="token number">.47</span> <span class="token keyword">rows</span><span class="token operator">=</span><span class="token number">4</span> width<span class="token operator">=</span><span class="token number">16</span><span class="token punctuation">)</span>
Recheck Cond: <span class="token punctuation">(</span>id1 <span class="token operator">=</span> <span class="token keyword">ANY</span> <span class="token punctuation">(</span><span class="token string">'{2,4,6,8}'</span>::<span class="token keyword">integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token operator">-</span><span class="token operator">></span> Bitmap <span class="token keyword">Index</span> Scan <span class="token keyword">on</span> idx_testtab02_id1 <span class="token punctuation">(</span>cost<span class="token operator">=</span><span class="token number">0.00</span><span class="token punctuation">.</span><span class="token number">.17</span><span class="token number">.73</span> <span class="token keyword">rows</span><span class="token operator">=</span><span class="token number">4</span> width<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">Index</span> Cond: <span class="token punctuation">(</span>id1 <span class="token operator">=</span> <span class="token keyword">ANY</span> <span class="token punctuation">(</span><span class="token string">'{2,4,6,8}'</span>::<span class="token keyword">integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token number">4</span> <span class="token keyword">rows</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>走两个索引后将位图进行BitmapOr运算的示例：BitmapOr操作，即使用OR运算合并两个位图。</p>
<h4 id="_7-条件过滤" tabindex="-1"><a class="header-anchor" href="#_7-条件过滤" aria-hidden="true">#</a> [7]条件过滤</h4>
<p>条件过滤，一般就是在WHERE子句上加过滤条件，当扫描数据行时会找出满足过滤条件的行。条件过滤在执行计划中显示为“Filter”</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>nyc<span class="token operator">=</span><span class="token comment"># explain select * from nyc_streets where id&lt;50;</span>
                           QUERY <span class="token keyword">PLAN</span>
<span class="token comment">----------------------------------------------------------------</span>
 Seq Scan <span class="token keyword">on</span> nyc_streets  <span class="token punctuation">(</span>cost<span class="token operator">=</span><span class="token number">0.00</span><span class="token punctuation">.</span><span class="token number">.753</span><span class="token number">.64</span> <span class="token keyword">rows</span><span class="token operator">=</span><span class="token number">49</span> width<span class="token operator">=</span><span class="token number">184</span><span class="token punctuation">)</span>
   Filter: <span class="token punctuation">(</span>id <span class="token operator">&lt;</span> <span class="token string">'50'</span>::<span class="token keyword">double</span> <span class="token keyword">precision</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token number">2</span> 行记录<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>如果条件的列上有索引，可能会走索引而不走过滤</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>nyc<span class="token operator">=</span><span class="token comment"># explain select * from nyc_streets where gid&lt;50;</span>
                                       QUERY <span class="token keyword">PLAN</span>

<span class="token comment">---------------------------------------------------------------------------</span>
<span class="token comment">-------------</span>
 <span class="token keyword">Index</span> Scan <span class="token keyword">using</span> nyc_streets_pkey <span class="token keyword">on</span> nyc_streets  <span class="token punctuation">(</span>cost<span class="token operator">=</span><span class="token number">0.29</span><span class="token punctuation">.</span><span class="token number">.10</span><span class="token number">.14</span> <span class="token keyword">rows</span><span class="token operator">=</span><span class="token number">4</span>
<span class="token number">9</span> width<span class="token operator">=</span><span class="token number">184</span><span class="token punctuation">)</span>
   <span class="token keyword">Index</span> Cond: <span class="token punctuation">(</span>gid <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token number">2</span> 行记录<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<p>参考：
https://www.postgresqltutorial.com
《postgis in action 3th》</p>
</template>
