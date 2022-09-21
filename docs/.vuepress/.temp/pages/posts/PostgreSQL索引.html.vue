<template><p>本文章主要部分为https://www.postgresqltutorial.com翻译简化的学习笔记</p>
<p>索引的作用：帮你快速的查询数据</p>
<p>索引的缺点：</p>
<ol>
<li>你如果把这个东西设置为索引，那么就意味着你的这个表的数据的增删改效率都会变低</li>
<li>索引很占空间</li>
</ol>
<p>所以说有些东西可以设置为索引，有些东西不推荐设置为索引。</p>
<h2 id="_1-创建索引" tabindex="-1"><a class="header-anchor" href="#_1-创建索引" aria-hidden="true">#</a> 1.创建索引</h2>
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
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> address
<span class="token keyword">WHERE</span> phone <span class="token operator">=</span> <span class="token string">'223664661973'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/06c944909e464164a4dc6f5861fd8d99.png" alt="在这里插入图片描述"></p>
<p>检查是否使用索引：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span>
<span class="token keyword">FROM</span> address
<span class="token keyword">WHERE</span> phone <span class="token operator">=</span> <span class="token string">'223664661973'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/893bdb521d9448029ae878e9c953e091.png" alt="在这里插入图片描述"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_address_phone 
<span class="token keyword">ON</span> address<span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span>
	<span class="token keyword">FROM</span> address
<span class="token keyword">WHERE</span> phone <span class="token operator">=</span> <span class="token string">'223664661973'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/8470be0433ee4900813619ff076d1329.png" alt="在这里插入图片描述"></p>
<h2 id="_2-删除索引" tabindex="-1"><a class="header-anchor" href="#_2-删除索引" aria-hidden="true">#</a> 2.删除索引</h2>
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
<h2 id="_3-显示索引" tabindex="-1"><a class="header-anchor" href="#_3-显示索引" aria-hidden="true">#</a> 3.显示索引</h2>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/2d2191671c2d4403abb7285167dfd00b.png" alt="在这里插入图片描述"></p>
<p>查询某个表的所有索引</p>
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
<h2 id="_4-索引类型" tabindex="-1"><a class="header-anchor" href="#_4-索引类型" aria-hidden="true">#</a> 4.索引类型</h2>
<p>PostgreSQL 有几种索引类型：B-tree、Hash、GiST、SP-GiST、GIN 和 BRIN。每种索引类型使用不同的存储结构和算法来应对不同类型的查询。</p>
<p>当你使用<code>CREATE INDEX</code>语句而不指定索引类型时，PostgreSQL 默认使用 B-tree 索引类型，因为它最适合最常见的查询</p>
<h3 id="_1-b-tree-索引" tabindex="-1"><a class="header-anchor" href="#_1-b-tree-索引" aria-hidden="true">#</a> [1]B-tree 索引</h3>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果您已经开始使用索引来优化您的 PostgreSQL 数据库，那么 B-tree 通常可能是你像要的。</p>
<h3 id="_2-hash索引" tabindex="-1"><a class="header-anchor" href="#_2-hash索引" aria-hidden="true">#</a> [2]Hash索引</h3>
<p>哈希索引只能处理简单的相等比较 (=)。这意味着每当索引列涉及使用等于（=）运算符的比较时，查询计划器query planner 将考虑使用哈希索引。</p>
<p>要创建哈希索引，请在子句中使用<code>CREATE INDEX</code>具有<code>HASH</code>索引类型的<code>USING</code>语句，如下所示：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> index_name 
<span class="token keyword">ON</span> table_name <span class="token keyword">USING</span> <span class="token keyword">HASH</span> <span class="token punctuation">(</span>indexed_column<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_3-gin-索引" tabindex="-1"><a class="header-anchor" href="#_3-gin-索引" aria-hidden="true">#</a> [3]GIN 索引</h3>
<p>当您将多个值存储在单个列中时，GIN 索引最有用，例如hstore、array、 jsonb 和 range 类型。</p>
<h3 id="_4-brin索引" tabindex="-1"><a class="header-anchor" href="#_4-brin索引" aria-hidden="true">#</a> [4]BRIN索引</h3>
<p>BRIN代表<strong>dexes<strong><strong>中的</strong></strong>块</strong>范围。与 B-tree 索引相比，BRIN 更小，维护成本更低。</p>
<p>BRIN 允许在非常大的表上使用索引，这在以前使用没有水平分区的 B-tree 是不切实际的。</p>
<p>BRIN 常用于具有线性排序顺序的列，例如销售订单表的创建日期列。</p>
<h3 id="_4-gist-索引" tabindex="-1"><a class="header-anchor" href="#_4-gist-索引" aria-hidden="true">#</a> [4]GiST 索引</h3>
<p>GiST 代表广义搜索树。GiST 索引允许构建通用树结构。GiST 索引在索引几何数据类型和全文搜索时很有用。</p>
<h3 id="_5-sp-gist-索引" tabindex="-1"><a class="header-anchor" href="#_5-sp-gist-索引" aria-hidden="true">#</a> [5]SP-GiST 索引</h3>
<p>SP-GiST 代表空间分区的 GiST。SP-GiST 支持分区搜索树，有助于开发各种不同的非平衡数据结构。</p>
<p>SP-GiST 索引对于具有自然聚类元素且不是同等平衡树的数据最有用，例如 GIS、多媒体、电话路由和 IP 路由。</p>
<h2 id="_5-唯一键索引" tabindex="-1"><a class="header-anchor" href="#_5-唯一键索引" aria-hidden="true">#</a> 5.唯一键索引</h2>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>此语句在PostgreSQL创建了俩个唯一键索引，一个是employee_id列，一个唯一键列email</p>
<p>查看该表的索引信息：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 
    tablename<span class="token punctuation">,</span> 
    indexname<span class="token punctuation">,</span> 
    indexdef 
<span class="token keyword">FROM</span> 
    pg_indexes 
<span class="token keyword">WHERE</span> 
    tablename <span class="token operator">=</span> <span class="token string">'employees'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/a54581e04eb641a09d3e8b7ae273e20f.png" alt="在这里插入图片描述"></p>
<p>两个唯一键索引</p>
<h2 id="_6-表达式索引" tabindex="-1"><a class="header-anchor" href="#_6-表达式索引" aria-hidden="true">#</a> 6.表达式索引</h2>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/39f8cdeda7c04ab1a341df47c980ea2c.png" alt="在这里插入图片描述"></p>
<h2 id="_7-部分索引" tabindex="-1"><a class="header-anchor" href="#_7-部分索引" aria-hidden="true">#</a> 7.部分索引</h2>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>输出：
<img src="https://img-blog.csdnimg.cn/61cf9fb275fc484da6ab177fe7ad5025.png" alt="在这里插入图片描述"></p>
<h2 id="_8-reindex重置索引" tabindex="-1"><a class="header-anchor" href="#_8-reindex重置索引" aria-hidden="true">#</a> 8.REINDEX重置索引</h2>
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
<h2 id="_9-多列索引" tabindex="-1"><a class="header-anchor" href="#_9-多列索引" aria-hidden="true">#</a> 9.多列索引</h2>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>PostgreSQL 优化器为此语句使用了索引，因为<code>WHERE</code>子句中的两列都在索引中：
<img src="https://img-blog.csdnimg.cn/2b535b4fea634618a9ef0c678588726b.png" alt="在这里插入图片描述"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span>
    <span class="token operator">*</span>
<span class="token keyword">FROM</span>
    people
<span class="token keyword">WHERE</span>
    first_name <span class="token operator">=</span> <span class="token string">'Lou'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>没有使用多列索引，因为last_name不在前面</p>
<p><img src="https://img-blog.csdnimg.cn/8e9460e8eaf9469ebb80cd2b1f202a99.png" alt="在这里插入图片描述"></p>
<h2 id="_10-索引解释器" tabindex="-1"><a class="header-anchor" href="#_10-索引解释器" aria-hidden="true">#</a> 10.索引解释器</h2>
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
<h3 id="_1-文本解释与-pgadmin-图形解释" tabindex="-1"><a class="header-anchor" href="#_1-文本解释与-pgadmin-图形解释" aria-hidden="true">#</a> [1]文本解释与 pgAdmin 图形解释</h3>
<p>文本解释器<code>TEXTUAL EXPLAIN</code>：</p>
<ul>
<li>可在psql和pgadmin中查看</li>
<li>文本解释计划通常比图形解释计划提供更多的信息</li>
</ul>
<p>图形解释器<code>GRAPHICAL EXPLAIN</code>：</p>
<ul>
<li>图形解释是从底层文本解释生成的文本解释的图解视图</li>
<li>PgAdmin 图形化解释计划充满了令人眼花缭乱的内容，其中有独特的图标来表示聚合、散列连接、位图扫描、外部扫描、并行扫描和 CTE</li>
</ul>
<h4 id="文本解释器" tabindex="-1"><a class="header-anchor" href="#文本解释器" aria-hidden="true">#</a> 文本解释器</h4>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> 
<span class="token keyword">SELECT</span> t<span class="token punctuation">.</span>town<span class="token punctuation">,</span> r<span class="token punctuation">.</span>rt_number
<span class="token keyword">FROM</span> 
	ch15<span class="token punctuation">.</span>ma_towns <span class="token keyword">AS</span> t 
	<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> 
	ch15<span class="token punctuation">.</span>ma_roads <span class="token keyword">AS</span> r 
	<span class="token keyword">ON</span> ST_Intersects<span class="token punctuation">(</span>t<span class="token punctuation">.</span>geom<span class="token punctuation">,</span>r<span class="token punctuation">.</span>geom<span class="token punctuation">)</span>
<span class="token keyword">WHERE</span> r<span class="token punctuation">.</span>rt_number <span class="token operator">=</span> <span class="token string">'9'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/0a6bf67e505642798865c52564e35d43.png" alt="在这里插入图片描述"></p>
<p>上面的文本解释器信息提供：规划器的策略planner’s  strategy和每个步骤的成本</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> <span class="token keyword">ANALYZE</span>
<span class="token keyword">SELECT</span> t<span class="token punctuation">.</span>town<span class="token punctuation">,</span> r<span class="token punctuation">.</span>rt_number
<span class="token keyword">FROM</span> 
	ch15<span class="token punctuation">.</span>ma_towns <span class="token keyword">AS</span> t 
	<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> 
	ch15<span class="token punctuation">.</span>ma_roads <span class="token keyword">AS</span> r 
	<span class="token keyword">ON</span> ST_Intersects<span class="token punctuation">(</span>t<span class="token punctuation">.</span>geom<span class="token punctuation">,</span>r<span class="token punctuation">.</span>geom<span class="token punctuation">)</span>
<span class="token keyword">WHERE</span> r<span class="token punctuation">.</span>rt_number <span class="token operator">=</span> <span class="token string">'9'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/06ac41bfca164ac5bee4668716bfde44.png" alt=""></p>
<p><code>EXPLAIN ANALYZE</code>比<code>EXPLAIN</code>提供了更多信息：除了计划之外，它还报告每个步骤的实际时间、总时间、计划者必须扫描的行数以及通过过滤器删除的行数</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> <span class="token punctuation">(</span><span class="token keyword">ANALYZE</span><span class="token punctuation">,</span> VERBOSE<span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> t<span class="token punctuation">.</span>town<span class="token punctuation">,</span> r<span class="token punctuation">.</span>rt_number
<span class="token keyword">FROM</span> 
	ch15<span class="token punctuation">.</span>ma_towns <span class="token keyword">AS</span> t 
	<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> 
	ch15<span class="token punctuation">.</span>ma_roads <span class="token keyword">AS</span> r 
	<span class="token keyword">ON</span> ST_Intersects<span class="token punctuation">(</span>t<span class="token punctuation">.</span>geom<span class="token punctuation">,</span>r<span class="token punctuation">.</span>geom<span class="token punctuation">)</span>
<span class="token keyword">WHERE</span> r<span class="token punctuation">.</span>rt_number <span class="token operator">=</span> <span class="token string">'9'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/e60cd1fd97fa463d8cc9849575d70940.png" alt="在这里插入图片描述"></p>
<h4 id="图形解释器" tabindex="-1"><a class="header-anchor" href="#图形解释器" aria-hidden="true">#</a> 图形解释器</h4>
<p><img src="https://img-blog.csdnimg.cn/599fe891e91a446790848277dbf37a55.png" alt="在这里插入图片描述"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> t<span class="token punctuation">.</span>town<span class="token punctuation">,</span> r<span class="token punctuation">.</span>rt_number
<span class="token keyword">FROM</span> 
	ch15<span class="token punctuation">.</span>ma_towns <span class="token keyword">AS</span> t 
	<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> 
	ch15<span class="token punctuation">.</span>ma_roads <span class="token keyword">AS</span> r 
	<span class="token keyword">ON</span> ST_Intersects<span class="token punctuation">(</span>t<span class="token punctuation">.</span>geom<span class="token punctuation">,</span>r<span class="token punctuation">.</span>geom<span class="token punctuation">)</span>
<span class="token keyword">WHERE</span> r<span class="token punctuation">.</span>rt_number <span class="token operator">=</span> <span class="token string">'9'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/6198cbd9756d409fa959182162e5f195.png" alt="在这里插入图片描述"></p>
<p>可以把鼠标停留在图标上，来获得相应节点的更多信息</p>
<p><img src="https://img-blog.csdnimg.cn/f73964f183bd42e5acecaf4e253e15a9.png" alt="在这里插入图片描述">
<img src="https://img-blog.csdnimg.cn/b3315ee6cedd4879b8e916dbcc22ccf9.png" alt="在这里插入图片描述"></p>
<h3 id="_2-计划器和索引" tabindex="-1"><a class="header-anchor" href="#_2-计划器和索引" aria-hidden="true">#</a> [2].计划器和索引</h3>
<p>PostgreSQL 中的索引主要有 B 树、广义搜索树(GiST)、空间分区广义搜索树(SP-GiST)、广义逆树(GIN)和块范围索引(BRIN)。除了 GIN 之外，PostGIS 支持上述所有内容。</p>
<ul>
<li>
<p><code>B-tree</code>尽管 PostGIS 支持 B 树，但由于它有最大大小限制，所以很少使用它。因此，它只能安全地用于点几何。然而，由于 B 树不支持 &amp; &amp; 重叠运算符，它甚至很少用于点。</p>
</li>
<li>
<p><code>BRIN</code>，正如它的“块范围索引”名称所暗示的那样，对数据行的块而不是单个记录进行索引。BRIN 在性能上几乎总是比 GiST/SP-GiST 和 B-tree 差，但它的权重要轻得多。因此，它主要用于有大量几何数据的情况，比如有大量的点数据或点云(大型多点数据)  ，其中主要关注的是可以快速构建较轻的索引。</p>
</li>
<li>
<p><code>SP-GiST</code> 是一种新的基于 GiST 的索引类型，并得到 PostGIS 2.5及以上版本的支持。可以为内置的 PostgreSQL  几何类型(而不是 Post-GIS 类型)、 text、 pg _ trgm 和 PostGIS 2.5 + 几何和地理类型定义  SP-GiST。</p>
</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> ix_sometable_geom_spgist <span class="token keyword">ON</span> sometable <span class="token keyword">USING</span> spgist <span class="token punctuation">(</span>geom<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>对于空间数据库，我们应该主要关注<code>GiST</code>。这应该是 PostGIS 空间类型(几何、地理、栅格)的选择索引。<code>SP-GiST</code> 是 PostGIS  几何学和地理学数据的第二选择。如果您不确定哪个索引最适合您的数据，SP-GiST 还是 GiST，可以使用 SP-GiST 创建索引，并使用  GiST 对性能差异进行基准测试.</p>
<h3 id="_3-带有空间索引的查询计划器" tabindex="-1"><a class="header-anchor" href="#_3-带有空间索引的查询计划器" aria-hidden="true">#</a> [3]带有空间索引的查询计划器</h3>
<div class="language-SQL ext-SQL line-numbers-mode"><pre v-pre class="language-SQL"><code>CREATE INDEX ix_ch15_ma_towns_geom
ON ch15.ma_towns USING gist (geom) WITH (FILLFACTOR=90); 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-SQL ext-SQL line-numbers-mode"><pre v-pre class="language-SQL"><code>EXPLAIN (ANALYZE, VERBOSE)
SELECT t.town, r.rt_number -- &lt;2&gt;
FROM 
	ch15.ma_towns AS t 
	INNER JOIN 
	ch15.ma_roads AS r 
	ON ST_Intersects(t.geom,r.geom)
WHERE r.rt_number = '9';
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>同一语句这次使用了空间索引，对比其文本解释器：</p>
<p><img src="https://img-blog.csdnimg.cn/fc578a0a700148779c8c53e7f4cc3774.png" alt="在这里插入图片描述"></p>
<ul>
<li>索引扫描代替了顺序扫描</li>
<li>查询规划器规划者将 <code>ST_Intersect</code> 分解为两部分:
<ul>
<li>使用空间索引扫描的 &amp;&amp; 部分排在第一位;</li>
<li>成本较高的 ST_Intersect 排在第二位</li>
</ul>
</li>
<li>规划器列出了由空间连接筛选器 <code>ST_Intersect</code> 删除的行数。您会注意到，这个计数比没有索引时要低得多。这意味着在 &amp;&amp; 操作期间执行的空间索引扫描使用索引比不使用索引更有效。换句话说，因为 &amp;&amp; 捕获了更多的行，所以 <code>ST_Intersect</code> 需要检查更少的行。</li>
</ul>
<p>参考：</p>
<ul>
<li>
<p>https://www.postgresqltutorial.com</p>
</li>
<li>
<p>《postgis in action 3th》</p>
</li>
</ul>
</template>
