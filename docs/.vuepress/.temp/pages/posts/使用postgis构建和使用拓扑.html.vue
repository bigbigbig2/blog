<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-什么是topology拓扑">1.什么是topology拓扑</RouterLink></li><li><RouterLink to="#_2-使用拓扑">2.使用拓扑</RouterLink><ul><li><RouterLink to="#_1-添加拓展">[1]添加拓展</RouterLink></li><li><RouterLink to="#_2-创建拓扑">[2]创建拓扑</RouterLink></li><li><RouterLink to="#_3-拓扑类型">[3]拓扑类型</RouterLink></li><li><RouterLink to="#_4-小结">[4]小结</RouterLink></li></ul></li><li><RouterLink to="#_3-victoria-bc的拓扑结构">3.Victoria, BC的拓扑结构</RouterLink><ul><li><RouterLink to="#_1-创建victoria的拓扑模型">[1]创建Victoria的拓扑模型</RouterLink></li><li><RouterLink to="#_2-将图元添加到拓扑模型中">[2]将图元添加到拓扑模型中</RouterLink></li><li><RouterLink to="#_3-构建拓扑几何">[3]构建拓扑几何</RouterLink></li></ul></li><li><RouterLink to="#_4-通过编辑拓扑图元修复拓扑几何问题">4.通过编辑拓扑图元修复拓扑几何问题</RouterLink><ul><li><RouterLink to="#_1-通过移除边来移除面">[1]通过移除边来移除面</RouterLink></li><li><RouterLink to="#_2-检查重叠面">[2]检查重叠面</RouterLink></li><li><RouterLink to="#_3-编辑拓扑几何">[3]编辑拓扑几何</RouterLink></li></ul></li><li><RouterLink to="#_5-插入与编辑大型数据集">5.插入与编辑大型数据集</RouterLink></li><li><RouterLink to="#_6-简化拓扑几何">6.简化拓扑几何</RouterLink></li><li><RouterLink to="#_7-拓扑验证与管理">7.拓扑验证与管理</RouterLink></li></ul></nav>
<p>此文为《postgis in action3 》的学习翻译记录并做了些删减与补充</p>
<h2 id="_1-什么是topology拓扑" tabindex="-1"><a class="header-anchor" href="#_1-什么是topology拓扑" aria-hidden="true">#</a> 1.什么是topology拓扑</h2>
<p>定义一些几何图形之间相互关联的规则</p>
<p>在拓扑模型中，共享的边界和区域在数据库中只需存储一次，而链接到共享边界的几何图形称为拓扑几何体，使用拓扑模型的优点：</p>
<ul>
<li>在对拓扑几何进行简化时，不会他们之间的关系（如不会出现重叠或间隙）</li>
<li>如果你有一组不应该重叠/相交的几何对象（例如建筑物、社区或地块），则可以更轻松地在拓扑模型中检测和修复</li>
</ul>
<h2 id="_2-使用拓扑" tabindex="-1"><a class="header-anchor" href="#_2-使用拓扑" aria-hidden="true">#</a> 2.使用拓扑</h2>
<p>拓扑模型在某种程度上回归到经典几何，您可以在其中描述两个自由几何如何相互作用，而无需考虑坐标系</p>
<p>因为 GIS 拓扑是图论的产物，所以它使用一组不同的术语。</p>
<p>将几何中的点视为拓扑中的节点，将线串视为边，将多边形视为面。总的来说，节点、边和面是拓扑基元，用来代替几何</p>
<h3 id="_1-添加拓展" tabindex="-1"><a class="header-anchor" href="#_1-添加拓展" aria-hidden="true">#</a> [1]添加拓展</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> EXTENSION postgis_topology<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p>添加后在数据库中就会有topology schema 了，就可以使用它下面的一些拓扑函数之类的东西了</p>
</blockquote>
<h3 id="_2-创建拓扑" tabindex="-1"><a class="header-anchor" href="#_2-创建拓扑" aria-hidden="true">#</a> [2]创建拓扑</h3>
<p>这里创建一个拓扑示例（SRID为4326的一个科罗拉多州矩形）：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> CreateTopology<span class="token punctuation">(</span><span class="token string">'ch13a_topology'</span><span class="token punctuation">,</span><span class="token number">4326</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
postgis_in_action<span class="token operator">=</span><span class="token comment"># \dn</span>
       架构模式列表
      名称      <span class="token operator">|</span>  拥有者
<span class="token comment">----------------+----------</span>
 ch09           <span class="token operator">|</span> postgres
 ch13a_topology <span class="token operator">|</span> postgres
 <span class="token keyword">public</span>         <span class="token operator">|</span> postgres
 topology       <span class="token operator">|</span> postgres
<span class="token punctuation">(</span><span class="token number">4</span> 行记录<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><blockquote>
<p>在该模式下同时还要四个表（空表）node、edge_data、face 和 relation</p>
</blockquote>
<p>PostGIS中使用单独的模式来容纳每个拓扑网络——如上面 ch13a_topology。指定的SRID适用于该模式中的所有表以及将使用 ch13a_topology 模式的的所有拓扑几何列。因为拓扑是关于几何图形之间的关系，所以拥有不同的 SRID 是没有意义的</p>
<p>其中edge_data是保存所有用于构建拓扑网络的拓扑信息表</p>
<p>下面对科罗拉多州使用 TopoGeo_AddLineString 函数添加构成该州四个边界的线串：（TopoGeo_AddLineString 函数使用边数据自动生成拓扑网络并填充节点和面）</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> TopoGeo_AddLineString<span class="token punctuation">(</span>
    <span class="token string">'ch13a_topology'</span><span class="token punctuation">,</span> 
	ST_GeomFromText<span class="token punctuation">(</span>
		<span class="token string">'LINESTRING(
			-109.05304 39.195013,
			-109.05304 41.000889,
			-104.897461 40.996484
		)'</span><span class="token punctuation">,</span>
		<span class="token number">4326</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">SELECT</span> TopoGeo_AddLineString<span class="token punctuation">(</span>
	<span class="token string">'ch13a_topology'</span><span class="token punctuation">,</span>
	ST_GeomFromText<span class="token punctuation">(</span>
		<span class="token string">'LINESTRING(
		    -104.897461 40.996484,
		    -102.051744 40.996484, 
		    -102.051744 40.003029
		)'</span><span class="token punctuation">,</span>
		<span class="token number">4326</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">SELECT</span> TopoGeo_AddLineString<span class="token punctuation">(</span>
	<span class="token string">'ch13a_topology'</span><span class="token punctuation">,</span>
	ST_GeomFromText<span class="token punctuation">(</span>
		<span class="token string">'LINESTRING(
		    -102.051744 40.003029,
		    -102.04874 36.992682,
		    -104.48204 36.992682
		)'</span><span class="token punctuation">,</span>
		<span class="token number">4326</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
     
<span class="token keyword">SELECT</span> TopoGeo_AddLineString<span class="token punctuation">(</span>
	<span class="token string">'ch13a_topology'</span><span class="token punctuation">,</span>
	ST_GeomFromText<span class="token punctuation">(</span>
		<span class="token string">'LINESTRING(
		    -104.48204 36.992682,
		    -109.045226 36.999077, 
		    -109.05304 39.195013
		)'</span><span class="token punctuation">,</span>
		<span class="token number">4326</span>
    <span class="token punctuation">)</span>
 <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/250a826aa3d44fb5b5da1f2ba1bee21c~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>上面为查询<code>edge_data</code>表的结果，也可以通过<code>SELECT ST_GetFaceGeometry('ch13a_topology',1);</code>查看该拓扑面</p>
</blockquote>
<p>然后在添加数据：（一些横穿该州的路）</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> TopoGeo_AddLineString<span class="token punctuation">(</span>
	<span class="token string">'ch13a_topology'</span><span class="token punctuation">,</span>
	ST_GeomFromText<span class="token punctuation">(</span>
		<span class="token string">'LINESTRING(
			-109.05304 39.195013, 
			-108.555908 39.108751, 
			-105.021057 39.717751, 
			-102.051744 40.003029
		)'</span><span class="token punctuation">,</span>
		<span class="token number">4326</span>
    <span class="token punctuation">)</span>
 <span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">SELECT</span> TopoGeo_AddLineString<span class="token punctuation">(</span>
	<span class="token string">'ch13a_topology'</span><span class="token punctuation">,</span>
	ST_GeomFromText<span class="token punctuation">(</span>
		<span class="token string">'LINESTRING(
			-104.897461 40.996484,
			-105.021057 39.717751,
			-104.798584 38.814031,
			-104.48204 36.992682
		)'</span><span class="token punctuation">,</span>
		<span class="token number">4326</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf8e697c506242b2b32b9db6a1a49d82~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>具体视图可以通过QGIS便捷查看四个面 ID、八个边 ID 和五个节	点</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89f5ef3e887745a18f570c052253ff19~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>高速公路的加入将原来的单面科罗拉多分成了四个面。再次仔细查看表格：PostGIS 自动重新组织了您的拓扑（四个表中的结构）如edge_data表</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78e8e53a12864f1b81153b809bf96f05~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>可以使用以下查询查看face表，这只是face的边界框。face表不存储实际的多边形（存储了每个面的最小矩形包围盒，如果要查看该面可有使用<code>ST_GetFaceGeometry</code>函数），因为导出它们所需的所有数据都可以在 edge_data 表中找到。这种存储方法遵循将数据保存在一个地方的数据库原则。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> face_id<span class="token punctuation">,</span> mbr<span class="token punctuation">,</span> <span class="token comment">-- 每个拓扑面的最小包围盒</span>
ST_GetFaceGeometry<span class="token punctuation">(</span><span class="token string">'ch13a_topology'</span><span class="token punctuation">,</span>face_id<span class="token punctuation">)</span> <span class="token keyword">AS</span> geom <span class="token comment">-- 拓扑面</span>
<span class="token keyword">FROM</span> ch13a_topology<span class="token punctuation">.</span>face 
<span class="token keyword">WHERE</span> face_id <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote>
<p>该模式中还有一个默认视图<code>edge</code>，可以说该视图为<code>edge_data</code>表的子集，该视图中存储了此拓扑的简要数据，对于一般用途，应该属于该视图而不是直接使用<code>edge_data</code>表，如edge视图：</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7cb55da13684bde9b2e26d5ebc59db9~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><strong>拓扑并不关心描述几何图形，而是关心它们之间的关系</strong></p>
<h3 id="_3-拓扑类型" tabindex="-1"><a class="header-anchor" href="#_3-拓扑类型" aria-hidden="true">#</a> [3]拓扑类型</h3>
<p>构建拓扑后，您可以将图元元分组以构成拓扑几何（也就是拓扑中的层）</p>
<p>假设现在要收集构成科罗拉多州拓扑模型中高速公路的四条边。您可以首先创建一个新表来存储将要构建的拓扑几何，然后使用<code>AddTopoGeometryColumn()</code> 函数向该表添加拓扑几何列:</p>
<p>创建一个表来存储高速公路并定义一个地形几何列:</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> ch13<span class="token punctuation">.</span>highways_topo <span class="token punctuation">(</span>highway <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">SELECT</span> AddTopoGeometryColumn<span class="token punctuation">(</span> <span class="token comment">-- 构建拓扑几何列</span>
    <span class="token string">'ch13a_topology'</span><span class="token punctuation">,</span><span class="token comment">-- 现存拓扑模型名称</span>
    <span class="token string">'ch13'</span><span class="token punctuation">,</span> <span class="token comment">-- 存储拓扑几何的schema_name	</span>
    <span class="token string">'highways_topo'</span><span class="token punctuation">,</span> <span class="token comment">-- 存储拓扑几何的table_name</span>
    <span class="token string">'topo'</span><span class="token punctuation">,</span> <span class="token comment">-- column_name</span>
    <span class="token string">'LINESTRING'</span> <span class="token comment">-- feature_type</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>构建完成后，可以看到在 <code>topology.layer</code> 表中添加一个一条记录：（拓扑几何始终与<code>topology.layer</code>相关联）</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> topology_id | layer_id | schema_name |  table_name   | feature_column | feature_type | level | child_id
-------------+----------+-------------+---------------+----------------+--------------+-------+----------
           1 |        1 | ch13        | highways_topo | topo           |            2 |     0 |
(1 行记录)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>构建好拓扑几何存储位置后下面使用<code>CreateTopoGeom()</code>构建拓扑几何</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> ch13<span class="token punctuation">.</span>highways_topo <span class="token punctuation">(</span>highway<span class="token punctuation">,</span> topo<span class="token punctuation">)</span> 
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span>
    <span class="token string">'I70'</span><span class="token punctuation">,</span> 
    CreateTopoGeom<span class="token punctuation">(</span>
        <span class="token string">'ch13a_topology'</span><span class="token punctuation">,</span> <span class="token comment">-- 拓扑几何由ch13a_topology模式形成</span>
        <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">-- 要构建的拓扑几何的类型，2==lineal</span>
        <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">-- 此topogeom所属topology.layer的ID。也是定义拓扑几何列时返回的数字</span>
        <span class="token string">'{{5,2},{6,2}}'</span>::topoelementarray <span class="token comment">-- 构成此拓扑几何的元素。数组中的每个元素都由元素 ID 和元素类型组成（ (1 = node,2 = edge, 3 = face). 这里都为edge</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>这样一个由四个拓扑元素构成的拓扑几何就构建完成了，下面查看构建结果</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> highway<span class="token punctuation">,</span> topo<span class="token punctuation">,</span> <span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token operator">*</span>
<span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>highways_topo <span class="token keyword">WHERE</span> highway <span class="token operator">=</span> <span class="token string">'I70'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> highway |   topo    | topology_id | layer_id | id | type
---------+-----------+-------------+----------+----+------
 I70     | (1,1,1,2) |           1 |        1 |  1 |    2
(1 行记录)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote>
<p>topology_id：拓扑几何所属的拓扑</p>
<p>layer_id：拓扑几何所属的layer</p>
<p>...</p>
</blockquote>
<p>如果你有几何图形，也可以直接使用toTopoGeom 函数将几何图形转换为拓扑几何图形，并将新形成的拓扑几何图形添加到一个新的表中。</p>
<p>例：使用 toTopoGeom 定义拓扑几何</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>NSERT <span class="token keyword">INTO</span> ch13<span class="token punctuation">.</span>highways_topo <span class="token punctuation">(</span>highway<span class="token punctuation">,</span> topo<span class="token punctuation">)</span> 
<span class="token keyword">SELECT</span> 
    <span class="token string">'I25'</span><span class="token punctuation">,</span> 
	toTopoGeom<span class="token punctuation">(</span> <span class="token comment">-- 使用 toTopoGeom 定义 I-25</span>
		ST_GeomFromText<span class="token punctuation">(</span>
			<span class="token string">'LINESTRING(
                -104.897461 40.996484,
                -105.021057 39.717751,
                -104.798584 38.814031,
                -104.48204 36.992682
            )'</span><span class="token punctuation">,</span>
			<span class="token number">4326</span>
		<span class="token punctuation">)</span><span class="token punctuation">,</span>  <span class="token comment">-- 如果不存在，将创建形成几何所需的任何边或节点	</span>
	<span class="token string">'ch13a_topology'</span><span class="token punctuation">,</span> <span class="token comment">-- the topology</span>
	<span class="token number">1</span> <span class="token comment">-- The layer</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>可以使用 GetTopoGeomElements 函数确认新拓扑几何的组成：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> highway<span class="token punctuation">,</span> <span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token operator">*</span><span class="token punctuation">,</span> GetTopoGeomElements<span class="token punctuation">(</span>topo<span class="token punctuation">)</span> <span class="token keyword">As</span> el
<span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>highways_topo
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> highway<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ighway | topology_id | layer_id | id | type |  el
---------+-------------+----------+----+------+-------
 I25     |           1 |        1 |  2 |    2 | {7,2} 
 I25     |           1 |        1 |  2 |    2 | {8,2}
 I70     |           1 |        1 |  1 |    2 | {5,2}
 I70     |           1 |        1 |  1 |    2 | {6,2}
(4 行记录)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><blockquote>
<p>el{拓扑元素ID,拓扑类型}</p>
<p>虽然在 highways_topo 表中只有两行，但是当使用 GetTopoGeomElements 函数时会得到四行，因为 GetTopoGeomElements 为每条高速公路的每条边返回一行</p>
</blockquote>
<h3 id="_4-小结" tabindex="-1"><a class="header-anchor" href="#_4-小结" aria-hidden="true">#</a> [4]小结</h3>
<p>PostGIS 拓扑模型提供了以下用于处理拓扑的功能:</p>
<ul>
<li>启用/添加拓扑扩展会立即创建 topology schema和function函数</li>
<li>topology.topology 表记录了你数据库中的所有拓扑结构</li>
<li>topology.layer 表记录了数据库中的所有拓扑几何列（layers）</li>
<li>每个拓扑网络都有自己的schema</li>
<li>基元（边、节点、面）在网络模式中有各自的表</li>
<li>特定拓扑网络schema中的关系表（在本例中为ch13a_topology.relation）记录了哪些拓扑图元和layer元素属于哪些拓扑几何</li>
</ul>
<p>一旦构建了拓扑，就可以在数据库中的任何地方自由使用它们。</p>
<p>还可以通过从拓扑中构建拓扑几何来在数据库的其他地方使用它们，其构建过程如下：</p>
<ul>
<li>将拓扑几何列（层）添加到您自己的表中</li>
<li>从基元或其他图层创建拓扑几何，并将它们添加到拓扑几何列中。</li>
<li>使用 toTopoGeom 函数一步从几何添加拓扑几何并更改底层网络。不过请记住，一旦执行此操作，边、面和节点将自动添加，现有的将被拆分。以这种方式更改拓扑后，仅删除引入的拓扑几何不足以恢复对拓扑的更改</li>
</ul>
<p>接下来将学习如何处理从各种来源获得的数据，以及如何修复因引入不完美的数据而导致的错误拓扑。</p>
<h2 id="_3-victoria-bc的拓扑结构" tabindex="-1"><a class="header-anchor" href="#_3-victoria-bc的拓扑结构" aria-hidden="true">#</a> 3.Victoria, BC的拓扑结构</h2>
<p>Victoria, BC——&gt;不列颠哥伦比亚省维多利亚....这翻译</p>
<p>在本节中，将使用一个真实世界的拓扑示例来深入理解拓扑的使用，这里使用不列颠哥伦比亚省维多利亚的数据</p>
<h3 id="_1-创建victoria的拓扑模型" tabindex="-1"><a class="header-anchor" href="#_1-创建victoria的拓扑模型" aria-hidden="true">#</a> [1]创建Victoria的拓扑模型</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> CreateTopology<span class="token punctuation">(</span><span class="token string">'ch13_topology'</span><span class="token punctuation">,</span> <span class="token number">32610</span><span class="token punctuation">,</span> <span class="token number">0.05</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 0.05 米的容差</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p>如果没有指定容差，将采用0.01m的默认容差（如果您的一个节点与另一个节点之间的距离仅为 0.01 米，PostGIS 会将两者合在一起成为一个节点），和arcgis中拓扑的容差是一个东西。</p>
</blockquote>
<h3 id="_2-将图元添加到拓扑模型中" tabindex="-1"><a class="header-anchor" href="#_2-将图元添加到拓扑模型中" aria-hidden="true">#</a> [2]将图元添加到拓扑模型中</h3>
<p>PostGIS topology 提供了三个函数来将拓扑图元添加到你创建的拓扑中，利用几何作为数据源：</p>
<ul>
<li><code>TopoGeo_AddPoint</code></li>
<li><code>TopoGeo_AddLineString</code></li>
<li><code>TopoGeo_AddPolygon</code></li>
</ul>
<blockquote>
<p>在使用上面函数来创建图元同时也有可能会自动创建其他图元，例如使用TopoGeo_AddLineString 添加线串可能会创建两条边和一个面，但结果中只会返回创建的边</p>
<p>如果不希望自动添加图元的不确定性和便利性，您可以利用以下三个函数：AddNode、AddEdge 和 AddFace。它们分别添加一个节点、一条边和一个面</p>
</blockquote>
<p>下面为使用<code>TopoGeo_AddLineString </code>示例：<code>TopoGeo_AddLineString</code> 函数从单个线串输入向拓扑添加节点、边和面。我们将从加载维多利亚城市边界线串开始：</p>
<p>导入下测试数据<a href="http://www.postgis.us/chapter_13_edition_3" target="_blank" rel="noopener noreferrer">(ed. #3) Chapter 13 - Building and Using Topologies (postgis.us)</a>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>psql -U postgres -d postgis_in_action -f ch13_staging.sql
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p>该模式中有三个表cityboundary、neighbourhoods</p>
</blockquote>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 
    gid<span class="token punctuation">,</span> 
    TopoGeo_AddLineString<span class="token punctuation">(</span> <span class="token comment">-- 参数（topo schemaName,PrimteGeom)</span>
        <span class="token string">'ch13_topology'</span><span class="token punctuation">,</span> ST_Transform<span class="token punctuation">(</span>geom<span class="token punctuation">,</span> <span class="token number">32610</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token keyword">As</span> edge_id <span class="token comment">-- 根据城市的边界线创建拓扑线</span>
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> gid<span class="token punctuation">,</span> <span class="token punctuation">(</span>ST_Dump<span class="token punctuation">(</span>geom<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>geom <span class="token keyword">FROM</span> ch13_staging<span class="token punctuation">.</span>cityboundary <span class="token comment">-- 该市的边界</span>
<span class="token punctuation">)</span> <span class="token keyword">As</span> f<span class="token punctuation">;</span> <span class="token comment">-- 使用ST_Dump将multilinestrings扩展为linestring</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> gid | edge_id
-----+---------
   1 |       1
(1 行记录)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote>
<p><code>TopoGeo_AddLineString</code> 是一个返回集合的函数，这意味着它具有扩展行数的潜力，因为每次调用都可能返回多个值</p>
</blockquote>
<p>现在该拓扑用两个面、一条边和一个节点组成：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d630930685314e6f96f5e729944703da~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>edge_data表：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e10ae72c8eb74bcb8f174a6da2b2625f~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token string">'faces'</span> <span class="token keyword">As</span> <span class="token keyword">type</span><span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">As</span> num <span class="token keyword">FROM</span> ch13_topology<span class="token punctuation">.</span>face
<span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
<span class="token keyword">SELECT</span> <span class="token string">'edges'</span> <span class="token keyword">As</span> <span class="token keyword">type</span><span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">As</span> num <span class="token keyword">FROM</span> ch13_topology<span class="token punctuation">.</span>edge
<span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
<span class="token keyword">SELECT</span> <span class="token string">'nodes'</span> <span class="token keyword">As</span> <span class="token keyword">type</span><span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">As</span> num <span class="token keyword">FROM</span> ch13_topology<span class="token punctuation">.</span>node
<span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
<span class="token keyword">SELECT</span> <span class="token string">'relations'</span> <span class="token keyword">As</span> <span class="token keyword">type</span><span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">As</span> num <span class="token keyword">FROM</span> ch13_topology<span class="token punctuation">.</span>relation<span class="token punctuation">;</span>
<span class="token keyword">type</span>    <span class="token operator">|</span> num
<span class="token comment">-----------+-----</span>
 faces     <span class="token operator">|</span>   <span class="token number">2</span>
 edges     <span class="token operator">|</span>   <span class="token number">1</span>
 nodes     <span class="token operator">|</span>   <span class="token number">1</span>
 relations <span class="token operator">|</span>   <span class="token number">0</span>
<span class="token punctuation">(</span><span class="token number">4</span> 行记录<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><blockquote>
<p>可以发现，尽管你只是将线串添加到拓扑模型中，它会自动创建一个面来包围边和一个节点来划分边的起点和终点。还创建了一个外部面</p>
</blockquote>
<p>下面继续将Victoria, BC的街区几何添加到拓扑模型中来创建相应的图元</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 
    gid<span class="token punctuation">,</span> 
    TopoGeo_AddPolygon<span class="token punctuation">(</span>
        <span class="token string">'ch13_topology'</span><span class="token punctuation">,</span> ST_Transform<span class="token punctuation">(</span>geom<span class="token punctuation">,</span> <span class="token number">32610</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.05</span> <span class="token comment">-- 指定容差为0.05米</span>
    <span class="token punctuation">)</span> <span class="token keyword">As</span> face_id
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> 
        gid<span class="token punctuation">,</span> 
        <span class="token punctuation">(</span>ST_Dump<span class="token punctuation">(</span>geom<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>geom <span class="token comment">-- 将multipolygons转为polygons</span>
    <span class="token keyword">FROM</span> ch13_staging<span class="token punctuation">.</span>neighbourhoods
<span class="token punctuation">)</span> <span class="token keyword">As</span> f<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> gid | face_id
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><blockquote>
<p>创建了27个面，而加上外部面，现在该拓扑模型中一共有28面，这些面是根据<code>neighbourhoods</code>表中的14个面构成的，那为什么会多出这么多面呢，这是因为构建拓扑面时会多出一些重叠的面、或者是空隙面</p>
</blockquote>
<h3 id="_3-构建拓扑几何" tabindex="-1"><a class="header-anchor" href="#_3-构建拓扑几何" aria-hidden="true">#</a> [3]构建拓扑几何</h3>
<p>与几何不同，拓扑几何由拓扑中的元素组成，这些元素可以与其他拓扑几何或拓扑中的元素共享。如果拓扑几何邻居的边界发生变化，则拓扑几何的边界也会发生变化。同时这也是地籍测量、土地边界研究中的一个非常重要的特征</p>
<p>同样采用上面的三个过程来创建拓扑几何：</p>
<ul>
<li>通过在表中定义拓扑几何列来创建图层</li>
<li>通过收集原始元素、收集其他层元素或从几何构建它们来创建拓扑几何。</li>
<li>将构建好拓扑几何插入到拓扑几何列中</li>
</ul>
<p>这里使用现有几何图形（Victoria, BC数据）以及现有元素构建拓扑几何（也是比较常见的做法）</p>
<p>使用 <code>AddTopoGeometryColumn</code>构建几个图层：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> ch13<span class="token punctuation">.</span>neighbourhoods <span class="token punctuation">(</span>feat_name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> AddTopoGeometryColumn<span class="token punctuation">(</span>
    <span class="token string">'ch13_topology'</span><span class="token punctuation">,</span>
    <span class="token string">'ch13'</span><span class="token punctuation">,</span>    
    <span class="token string">'neighbourhoods'</span><span class="token punctuation">,</span> <span class="token comment">-- 存储neighborhoodsb拓扑几何</span>
    <span class="token string">'topo'</span><span class="token punctuation">,</span>
    <span class="token string">'MULTIPOLYGON'</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 构建拓扑几何列</span>
 addtopogeometrycolumn
<span class="token comment">-----------------------</span>
                     <span class="token number">1</span>
<span class="token punctuation">(</span><span class="token number">1</span> 行记录<span class="token punctuation">)</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> ch13<span class="token punctuation">.</span>cities <span class="token punctuation">(</span>feat_name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">)</span> <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> AddTopoGeometryColumn<span class="token punctuation">(</span>
    <span class="token string">'ch13_topology'</span><span class="token punctuation">,</span> 
    <span class="token string">'ch13'</span><span class="token punctuation">,</span>   
    <span class="token string">'cities'</span><span class="token punctuation">,</span> <span class="token comment">-- 存储cities拓扑几何</span>
    <span class="token string">'topo'</span><span class="token punctuation">,</span>
    <span class="token string">'MULTIPOLYGON'</span><span class="token punctuation">,</span>
    <span class="token number">1</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>  
 addtopogeometrycolumn
<span class="token comment">-----------------------</span>
                     <span class="token number">2</span>
<span class="token punctuation">(</span><span class="token number">1</span> 行记录<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>下面查看下这连个表的结构信息（\d)</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Table</span> <span class="token string">"ch13.neighbourhoods"</span>
<span class="token keyword">Column</span>     <span class="token operator">|</span> <span class="token keyword">Type</span>                <span class="token operator">|</span>  Modifiers
<span class="token comment">-----------+-----------------------+-----------</span>
feat_name <span class="token operator">|</span> <span class="token keyword">character</span> <span class="token keyword">varying</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span>
topo      <span class="token operator">|</span> topogeometry          <span class="token operator">|</span>

Indexes:
	<span class="token string">"neighbourhoods_pkey"</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span> <span class="token keyword">btree</span> <span class="token punctuation">(</span>feat_name<span class="token punctuation">)</span>
<span class="token keyword">Check</span> constraints:
	<span class="token string">"check_topogeom_topo"</span>
	<span class="token keyword">CHECK</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span>topology_id <span class="token operator">=</span> <span class="token number">2</span>
	<span class="token operator">AND</span> <span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span>layer_id <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">AND</span> <span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">Table</span> <span class="token string">"ch13.cities"</span>
<span class="token keyword">Column</span> <span class="token operator">|</span> <span class="token keyword">Type</span> <span class="token operator">|</span> Modifiers
<span class="token comment">-----------+------------------------+-----------</span>
feat_name <span class="token operator">|</span> <span class="token keyword">character</span> <span class="token keyword">varying</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token operator">not</span> <span class="token boolean">null</span>
topo <span class="token operator">|</span> topogeometry <span class="token operator">|</span>
Indexes:
	<span class="token string">"cities_pkey"</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span> <span class="token keyword">btree</span> <span class="token punctuation">(</span>feat_name<span class="token punctuation">)</span>
<span class="token keyword">Check</span> constraints:
	<span class="token string">"check_topogeom_topo"</span>
	<span class="token keyword">CHECK</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span>topology_id <span class="token operator">=</span> <span class="token number">2</span>
	<span class="token operator">AND</span> <span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span>layer_id <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">AND</span> <span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>虽然从表描述中看不出城市被建模为由社区neighbourhoods组成，但可以检查 topology.layer 表，其中列出了所有拓扑几何列。在其中，您会看到城市层的 child_id 字段填充为 1，表明每个城市都由子社区组成</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f93d4afa3d2a4daebe9dc75e638ceab3~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>构建好存储拓扑几何的列后，就到添加拓扑几何了，这里直接使用现有的<code>Victoria, BC</code>数据中的几何来构建拓扑几何（toTopoGeom将几何转换为其等效的拓扑几何,但是切记，在使用它之前，你必须已经有一个层，而且该层的ID是toTopoGeom的一个必需参数，这里因为city由neighbourhoods构成，所以就直接将拓扑结合添加到neighbourhoods即可。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> ch13<span class="token punctuation">.</span>neighbourhoods <span class="token punctuation">(</span>feat_name<span class="token punctuation">,</span> topo<span class="token punctuation">)</span>
<span class="token keyword">SELECT</span>  
    neighbourh<span class="token punctuation">,</span>  
    toTopoGeom<span class="token punctuation">(</span>
        ST_Transform<span class="token punctuation">(</span>geom<span class="token punctuation">,</span> <span class="token number">32610</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'ch13_topology'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0.05</span> <span class="token comment">-- 注意容差的设定</span>
    <span class="token punctuation">)</span>
<span class="token keyword">FROM</span> ch13_staging<span class="token punctuation">.</span>neighbourhoods<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>下面演示构建拓扑几何的另一种方式：从现有拓扑元素创建拓扑几何（ CreateTopoGeom TopoElementArray_Agg），构建city拓扑几何，而不是直接使用cityboundary表中的几何构建</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> ch13<span class="token punctuation">.</span>cities <span class="token punctuation">(</span>feat_name<span class="token punctuation">,</span> topo<span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> 
    <span class="token string">'Victoria'</span><span class="token punctuation">,</span>    
    CreateTopoGeom<span class="token punctuation">(</span> <span class="token comment">-- 将拓扑几何组合在一起构成一个拓扑几何</span>
        <span class="token string">'ch13_topology'</span><span class="token punctuation">,</span>
        <span class="token number">3</span><span class="token punctuation">,</span> <span class="token comment">-- 拓扑几何类型3==面</span>
        <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">-- 指定新的拓扑几何将属于cities拓扑几何列</span>
        <span class="token punctuation">(</span>
            <span class="token keyword">SELECT</span> TopoElementArray_Agg<span class="token punctuation">(</span>
				ARRAY<span class="token punctuation">[</span><span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span>id<span class="token punctuation">,</span><span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span>layer_id<span class="token punctuation">]</span>
			<span class="token punctuation">)</span> <span class="token comment">-- 获取所有的拓扑元素</span>
            <span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>neighbourhoods
        <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>大多数桌面查看工具都没有拓扑几何的概念。要获得拓扑图片，您必须将拓扑几何转换为几何，如下例所示
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af8989265094490dac6daf0093a86ed9~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>要显示neighbourhoods，则需要将每个面转换为多边形几何图形，如下例所示</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> face_id<span class="token punctuation">,</span> ST_GetFaceGeometry<span class="token punctuation">(</span><span class="token string">'ch13_topology'</span><span class="token punctuation">,</span> face_id<span class="token punctuation">)</span>
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> <span class="token punctuation">(</span>GetTopoGeomElements<span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">As</span> face_id 
    <span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>cities 
    <span class="token keyword">WHERE</span> feat_name <span class="token operator">=</span> <span class="token string">'Victoria'</span>
<span class="token punctuation">)</span> <span class="token keyword">As</span> x<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d140a7f990c44a8bb3d89f7c3d81722~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h2 id="_4-通过编辑拓扑图元修复拓扑几何问题" tabindex="-1"><a class="header-anchor" href="#_4-通过编辑拓扑图元修复拓扑几何问题" aria-hidden="true">#</a> 4.通过编辑拓扑图元修复拓扑几何问题</h2>
<p>回想前面添加的14个neighbourhoods多边形，但却生成了38个面，这就因为这不少相邻多边形之间有重叠或者是空虚，从而构成了额外的面，只是因为它们太小，所以在上面的图形输出中并没有很容易看出来（而造成这一现象的原因便是数据的不规范或者把多边形简化后造成的)</p>
<p>目前 ch13_topology 示例有 37 个面，包括通用面。 neighborhoods 图层有 14 个拓扑几何图形</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6a30079d5624bb4b8ce5c55e78af209~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>仔细看看Burnside。它还包含了一些微小的面（数字 21、22、25、28、29 表示）几乎不占据其边界的任何区域。运行以下代码以查看社区中微笑的面：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> feat_name<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>face_id<span class="token punctuation">)</span> <span class="token keyword">As</span> num_faces<span class="token punctuation">,</span> 
    <span class="token function">MIN</span><span class="token punctuation">(</span>
        ST_Area<span class="token punctuation">(</span>ST_GetFaceGeometry<span class="token punctuation">(</span><span class="token string">'ch13_topology'</span><span class="token punctuation">,</span>face_id<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>::<span class="token keyword">numeric</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">As</span> min_area<span class="token punctuation">,</span>
    <span class="token function">MAX</span><span class="token punctuation">(</span>
        ST_Area<span class="token punctuation">(</span>ST_GetFaceGeometry<span class="token punctuation">(</span><span class="token string">'ch13_topology'</span><span class="token punctuation">,</span>face_id<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>::<span class="token keyword">numeric</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">As</span> max_area
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> feat_name<span class="token punctuation">,</span> <span class="token punctuation">(</span>GetTopoGeomElements<span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">As</span> face_id 
	<span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>neighbourhoods
<span class="token punctuation">)</span> <span class="token keyword">As</span> x
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> feat_name 
<span class="token keyword">HAVING</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>face_id<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>face_id<span class="token punctuation">)</span> <span class="token keyword">DESC</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>feat_name | num_faces | min_area | max_area
-----------------+-----------+----------+------------
Burnside | 6 | 1.48 | 2383705.36
Gonzales | 4 | 0.03 | 1366871.65
Victoria West | 4 | 2.22 | 1579455.03
North Park | 3 | 41.29 | 554622.59
Oaklands | 2 | 11997.94 | 1733012.41
North Jubilee | 2 | 39.05 | 629632.96
Hillside/Quadra | 2 | 62.23 | 1658087.55
(7 rows)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>上面列出了所有具有多于一个面的neighbourhoods，并统计了总共 25 个面。未列出的是另外 6 个只有一个面的neighbourhoods</p>
<h3 id="_1-通过移除边来移除面" tabindex="-1"><a class="header-anchor" href="#_1-通过移除边来移除面" aria-hidden="true">#</a> [1]通过移除边来移除面</h3>
<p><code>ST_RemEdgeNewFace</code> 函数用于删除一条边。如果一个边将两个面分开，则原始面被破坏并创建一个新面，即原始两个面的并集</p>
<p>下面使用这个函数来实现移除一些多余的面：创建一个过程来检查与删除</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DO</span> 
<span class="token keyword">LANGUAGE</span> plpgsql 
$$
<span class="token keyword">DECLARE</span> r record<span class="token punctuation">;</span> var_face <span class="token keyword">integer</span><span class="token punctuation">;</span>
<span class="token keyword">BEGIN</span>
    <span class="token keyword">FOR</span> r <span class="token operator">IN</span> <span class="token punctuation">(</span> 
    <span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> abs<span class="token punctuation">(</span>
        <span class="token punctuation">(</span>ST_GetFaceEdges<span class="token punctuation">(</span>
            <span class="token string">'ch13_topology'</span><span class="token punctuation">,</span>face_id<span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span>edge
    <span class="token punctuation">)</span> <span class="token keyword">As</span> edge 
    <span class="token keyword">FROM</span> <span class="token punctuation">(</span>
        <span class="token keyword">SELECT</span> feat_name<span class="token punctuation">,</span> <span class="token punctuation">(</span>GetTopoGeomElements<span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">As</span> face_id 
        <span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>neighbourhoods
    <span class="token punctuation">)</span> <span class="token keyword">As</span> x
    <span class="token keyword">WHERE</span> ST_Area<span class="token punctuation">(</span>ST_GetFaceGeometry<span class="token punctuation">(</span><span class="token string">'ch13_topology'</span><span class="token punctuation">,</span>face_id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">55000</span>
     <span class="token punctuation">)</span> 
    <span class="token keyword">LOOP</span>
        <span class="token keyword">BEGIN</span>
            var_face :<span class="token operator">=</span> ST_RemEdgeNewFace<span class="token punctuation">(</span><span class="token string">'ch13_topology'</span><span class="token punctuation">,</span>r<span class="token punctuation">.</span>edge<span class="token punctuation">)</span><span class="token punctuation">;</span>
            EXCEPTION
                <span class="token keyword">WHEN</span> OTHERS <span class="token keyword">THEN</span>
            RAISE WARNING <span class="token string">'Failed remove edge: %, %'</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span>edge<span class="token punctuation">,</span> SQLERRM<span class="token punctuation">;</span>
        <span class="token keyword">END</span><span class="token punctuation">;</span>
    <span class="token keyword">END</span> <span class="token keyword">LOOP</span><span class="token punctuation">;</span>
<span class="token keyword">END</span>
$$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><blockquote>
<p>上面代码中，如果删除步骤失败，只是发出一个警告，所以代码会继续运行剩余的边</p>
<p>运行上面代码后还运行之前的查看小面的代码在看看</p>
</blockquote>
<h3 id="_2-检查重叠面" tabindex="-1"><a class="header-anchor" href="#_2-检查重叠面" aria-hidden="true">#</a> [2]检查重叠面</h3>
<p>通常很难通过肉眼来判断重叠，而使用查询或许更方便，下面代码首先转储两个相邻社区的拓扑元素 ID，并且只会返回那些重叠的：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token punctuation">(</span>GetTopoGeomElements<span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">As</span> face_id 
<span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>neighbourhoods
<span class="token keyword">WHERE</span> feat_name <span class="token operator">=</span> <span class="token string">'North Park'</span> 
<span class="token keyword">INTERSECT</span>
<span class="token keyword">SELECT</span> <span class="token punctuation">(</span>GetTopoGeomElements<span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">As</span> face_id  
<span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>neighbourhoods
<span class="token keyword">WHERE</span> feat_name <span class="token operator">=</span> <span class="token string">'Burnside'</span><span class="token punctuation">;</span>
face_id
<span class="token comment">--------</span>
	<span class="token number">21</span>
	<span class="token number">28</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>可以发现面21和28是重叠的，而这就需要改变底层的拓扑几何结构，让neighborhoods  不相互重叠</p>
<h3 id="_3-编辑拓扑几何" tabindex="-1"><a class="header-anchor" href="#_3-编辑拓扑几何" aria-hidden="true">#</a> [3]编辑拓扑几何</h3>
<p>修复重叠的最简单方法是从每个拓扑几何中删除重叠的面。不过，PostGIS 拓扑并提供任何这样做的功能；而是需要直接使用拓扑表来实现。</p>
<p>回想一下，ch13_topology.relation 表包含拓扑几何和拓扑之间的所有关系。您可以编辑此表并将面与拓扑几何分离。</p>
<p>以下删除了关系表中与 Burnside 和 North Park 对应的重叠的项：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> ch13_topology<span class="token punctuation">.</span>relation <span class="token keyword">AS</span> r 
<span class="token keyword">WHERE</span> <span class="token keyword">EXISTS</span> <span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span> topo <span class="token comment">-- &lt;2></span>
	<span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>neighbourhoods <span class="token keyword">As</span> n 
	<span class="token keyword">WHERE</span> 
		feat_name <span class="token operator">=</span> <span class="token string">'North Park'</span> <span class="token operator">AND</span> 
		<span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span>id <span class="token operator">=</span> r<span class="token punctuation">.</span>topogeo_id <span class="token operator">AND</span> 
		r<span class="token punctuation">.</span>element_id <span class="token operator">=</span> <span class="token number">21</span> <span class="token operator">AND</span> 
		r<span class="token punctuation">.</span>element_type <span class="token operator">=</span> <span class="token number">3</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> ch13_topology<span class="token punctuation">.</span>relation <span class="token keyword">AS</span> r 
<span class="token keyword">WHERE</span> <span class="token keyword">EXISTS</span> <span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span> topo 
	<span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>neighbourhoods <span class="token keyword">As</span> n 
	<span class="token keyword">WHERE</span> 
		feat_name <span class="token operator">=</span> <span class="token string">'Burnside'</span> <span class="token operator">AND</span> 
		<span class="token punctuation">(</span>topo<span class="token punctuation">)</span><span class="token punctuation">.</span>id <span class="token operator">=</span> r<span class="token punctuation">.</span>topogeo_id <span class="token operator">AND</span> 
		r<span class="token punctuation">.</span>element_id <span class="token operator">=</span> <span class="token number">28</span> <span class="token operator">AND</span> 
		r<span class="token punctuation">.</span>element_type <span class="token operator">=</span> <span class="token number">3</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="_5-插入与编辑大型数据集" tabindex="-1"><a class="header-anchor" href="#_5-插入与编辑大型数据集" aria-hidden="true">#</a> 5.插入与编辑大型数据集</h2>
<p>前面的示例的数据量很小，而通常需要使用大型的数据集，如一个省的路网数据等。而加载大型数据集时主要的问题是导入过程的因为拓扑错误而被迫阻碍导入。</p>
<p>与大多数关系数据库一样，PostgreSQL 是基于事务的。每个插入或更新语句作为单个事务运行，这意味着所有记录都必须成功或失败；没有部分更新或插入。</p>
<p>如果 PostGIS 在长达一小时的插入将结束时发现一条错误记录，那么前面一个小时不就白白浪费掉了。所以建议绕过事务的全有或全无的性质，以小批量执行插入或更新。而要实现这一点，可以在 DO 命令或函数中该流程：</p>
<ul>
<li>DO 命令将运行单个事务，但它会提示每个错误。如果您选择忽略该错误，将继续执行。</li>
<li>在函数方法中，您将插入或更新嵌入到一个函数中，然后使用小批量数据迭代调用该函数。如果您遇到错误，只会影响当前批次</li>
</ul>
<p>下面演示了使用函数方法的技巧：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> ch13<span class="token punctuation">.</span>streets <span class="token punctuation">(</span>
	gid <span class="token keyword">integer</span> <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">,</span> 
	feat_name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 
	access <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 
	rd_class <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 
	max_speed <span class="token keyword">numeric</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 创建一个streets表来存储拓扑列	</span>
  
<span class="token keyword">SELECT</span> AddTopoGeometryColumn<span class="token punctuation">(</span>
	<span class="token string">'ch13_topology'</span><span class="token punctuation">,</span>
	<span class="token string">'ch13'</span><span class="token punctuation">,</span>
	<span class="token string">'streets'</span><span class="token punctuation">,</span>
	<span class="token string">'topo'</span><span class="token punctuation">,</span>
	<span class="token string">'MULTILINESTRING'</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 添加一个拓扑几何列到streets表中</span>
  
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> ch13<span class="token punctuation">.</span>log_street_failures <span class="token punctuation">(</span>
	gid <span class="token keyword">integer</span> <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">,</span>
	error <span class="token keyword">text</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 创建一个错误表来记录拓扑错误</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>接下来是执行插入的逻辑（批量加载街道的函数）</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token operator">OR</span> <span class="token keyword">REPLACE</span> <span class="token keyword">PROCEDURE</span> ch13<span class="token punctuation">.</span>load_streets<span class="token punctuation">(</span>param_num <span class="token keyword">integer</span><span class="token punctuation">)</span> <span class="token keyword">AS</span>
$$
<span class="token keyword">DECLARE</span> r record<span class="token punctuation">;</span>
<span class="token keyword">BEGIN</span>
    <span class="token keyword">FOR</span> r <span class="token operator">IN</span> 
		<span class="token keyword">SELECT</span> <span class="token operator">*</span> 
		<span class="token keyword">FROM</span> ch13_staging<span class="token punctuation">.</span>streetcentrelines <span class="token comment">-- 从暂存表中选择一组不超过param_num行的街道</span>
        <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> gid 
		<span class="token keyword">LIMIT</span> param_num <span class="token keyword">OFFSET</span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token function">MAX</span><span class="token punctuation">(</span>gid<span class="token punctuation">)</span> <span class="token keyword">from</span> ch13<span class="token punctuation">.</span>streets<span class="token punctuation">)</span>
	<span class="token keyword">LOOP</span>  
		<span class="token keyword">BEGIN</span>
			<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> ch13<span class="token punctuation">.</span>streets <span class="token punctuation">(</span>
				gid<span class="token punctuation">,</span>feat_name<span class="token punctuation">,</span>access<span class="token punctuation">,</span>rd_class<span class="token punctuation">,</span>max_speed<span class="token punctuation">,</span>topo<span class="token punctuation">)</span> <span class="token comment">-- 将每个插入到街道表中</span>
			<span class="token keyword">SELECT</span> 
				r<span class="token punctuation">.</span>gid<span class="token punctuation">,</span>r<span class="token punctuation">.</span>streetname<span class="token punctuation">,</span>r<span class="token punctuation">.</span>access<span class="token punctuation">,</span>r<span class="token punctuation">.</span>rd_class<span class="token punctuation">,</span>
				r<span class="token punctuation">.</span>max_speed::<span class="token keyword">numeric</span><span class="token punctuation">,</span>
				toTopoGeom<span class="token punctuation">(</span>ST_Transform<span class="token punctuation">(</span>ST_Force2D<span class="token punctuation">(</span>r<span class="token punctuation">.</span>geom<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">32610</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">-- 强制 2D 变换以匹配我们的拓扑，然后转换为拓扑几何</span>
      <span class="token string">'ch13_topology'</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">0.05</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 设定容差为0.05米</span>
			EXCEPTION <span class="token keyword">WHEN</span> OTHERS <span class="token keyword">THEN</span>
				<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> ch13<span class="token punctuation">.</span>log_street_failures <span class="token punctuation">(</span>gid<span class="token punctuation">,</span>error<span class="token punctuation">)</span> <span class="token comment">-- 记录任何拓扑异常并继续</span>
				<span class="token keyword">VALUES</span> <span class="token punctuation">(</span>r<span class="token punctuation">.</span>gid<span class="token punctuation">,</span>SQLERRM<span class="token punctuation">)</span><span class="token punctuation">;</span>
				RAISE WARNING 
					<span class="token string">'Loading of record % failed: %'</span><span class="token punctuation">,</span>
					r<span class="token punctuation">.</span>gid<span class="token punctuation">,</span>
					SQLERRM<span class="token punctuation">;</span>
		<span class="token keyword">END</span><span class="token punctuation">;</span>
        <span class="token keyword">COMMIT</span><span class="token punctuation">;</span> <span class="token comment">-- &lt;6></span>
    <span class="token keyword">END</span> <span class="token keyword">LOOP</span><span class="token punctuation">;</span>
<span class="token keyword">END</span>
$$
<span class="token keyword">LANGUAGE</span> plpgsql<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><blockquote>
<p>这样在每次调用都可以加载指定的数量的街道</p>
</blockquote>
<p>假如插入2500条街道</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CALL</span> ch13<span class="token punctuation">.</span>load_streets<span class="token punctuation">(</span><span class="token number">2500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_6-简化拓扑几何" tabindex="-1"><a class="header-anchor" href="#_6-简化拓扑几何" aria-hidden="true">#</a> 6.简化拓扑几何</h2>
<p>如何在简化拓扑的同时，还能确保的它们之间的关系不发生改变？</p>
<p>可以使用 ST_Simplify，它被重载以接受拓扑几何。将拓扑几何作为输入的 ST_Simplify 函数返回一个几何。该函数的几何和拓扑几何版本之间的区别在于，拓扑几何版本对构成拓扑几何的边应用简化，但防止会导致边之间出现间隙或破坏面的简化。因为拓扑几何只是对边的引用，所以具有共享边的重构几何现在具有简化的共享边</p>
<p>对拓扑几何进行的任何简化都不会简化底层拓扑。简化过程创建由拓扑几何组成的边缘的简化版本，并从简化的边缘重建几何。函数运行后，新创建的简化版边将被丢弃</p>
<p>这里来试试两个演示：</p>
<ul>
<li>将neighborhood 拓扑几何转换为几何并应用 ST_Simplify函数处理（出现缝隙和重叠面）</li>
<li>将ST_Simplify直接应用于拓扑几何（拓扑关系没有发生改变）</li>
</ul>
<p>demo1：基于几何的简化（拓扑关系乱了）</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> feat_name<span class="token punctuation">,</span> ST_Simplify<span class="token punctuation">(</span>topo::<span class="token keyword">geometry</span><span class="token punctuation">,</span><span class="token number">150</span><span class="token punctuation">)</span> <span class="token keyword">As</span> geom_simp 
<span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>neighbourhoods
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>demo2：基于拓扑的简化</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> feat_name<span class="token punctuation">,</span> ST_Simplify<span class="token punctuation">(</span>topo<span class="token punctuation">,</span><span class="token number">150</span><span class="token punctuation">)</span> <span class="token keyword">As</span> topo_simp 
<span class="token keyword">FROM</span> ch13<span class="token punctuation">.</span>neighbourhoods
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/408e0c17c86841cc9f995399f3ae1894~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>即使几何发生了改变，它们之间的拓扑关系却仍然没有变</p>
</blockquote>
<h2 id="_7-拓扑验证与管理" tabindex="-1"><a class="header-anchor" href="#_7-拓扑验证与管理" aria-hidden="true">#</a> 7.拓扑验证与管理</h2>
<p>有时拓扑可能会因错误的编辑而变得无效，现在可以使用ValidateTopology()函数来检查拓扑的有效性</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> 
<span class="token keyword">FROM</span> ValidateTopology<span class="token punctuation">(</span><span class="token string">'ch13_topology'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote>
<p>该有效性函数定义的标准是比较松的，只要拓扑元素之间没有相交即可通过检验，你也可以通过过程语言自定义更严格的标准</p>
</blockquote>
<p>TopologySummary 是另一个有用的管理函数，它提供拓扑和层的基本摘要，而无需查看表格:</p>
<div class="language-SQL ext-SQL line-numbers-mode"><pre v-pre class="language-SQL"><code>postgis_in_action=# SELECT TopologySummary('ch13_topology');
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></template>
