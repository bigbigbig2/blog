<template><h2 id="_1-空间数据库概述" tabindex="-1"><a class="header-anchor" href="#_1-空间数据库概述" aria-hidden="true">#</a> 1.空间数据库概述</h2>
<p>空间数据分为矢量数据和栅格数据</p>
<h3 id="_1-空间实体" tabindex="-1"><a class="header-anchor" href="#_1-空间实体" aria-hidden="true">#</a> [1]空间实体</h3>
<p>不可再分的最小单元现象称为空间实体</p>
<ul>
<li>对存在于这个自然世界中地理实体的抽象</li>
<li>包括点、线、多边形等基本类型</li>
</ul>
<p><strong>空间实体举例</strong></p>
<p>一根电线杆--&gt;点
所处的位置信息，电线杆高度及其他相关信息
一条道路--&gt;线
道路长度、宽度、起点、终点及道路等级等相关信息
一个湖泊--&gt;多边形
湖泊的周长、面积和水质等信息</p>
<h3 id="_2-空间数据的特征" tabindex="-1"><a class="header-anchor" href="#_2-空间数据的特征" aria-hidden="true">#</a> [2]空间数据的特征</h3>
<h4 id="空间特征" tabindex="-1"><a class="header-anchor" href="#空间特征" aria-hidden="true">#</a> 空间特征</h4>
<ul>
<li>每个空间对象都具有空间坐标，即空间对象隐含了空间分布特征</li>
<li>空间数据组织需要考虑它的空间分布特征</li>
<li>除了属性索引外，还需要建立空间索引</li>
</ul>
<h4 id="非结构化特征" tabindex="-1"><a class="header-anchor" href="#非结构化特征" aria-hidden="true">#</a> 非结构化特征</h4>
<ul>
<li>关系数据库中数据记录是结构化的</li>
<li>结构化数据
<ul>
<li>满足关系模式的范式基本要求，可以用二维表结构来逻辑表达的数据</li>
</ul>
</li>
<li>非结构化的数据
<ul>
<li>不方便用数据库二维逻辑表来表现的数据，包括文本、图片、XML、HTML、音频、视频等</li>
</ul>
</li>
<li>空间数据是一种非结构化数据</li>
<li>空间实体是不定长的，例如一条弧段可能包含两对坐标点，也有可能10万对坐标点</li>
<li>通用的关系数据库管理系统难以直接管理空间数据</li>
</ul>
<h4 id="空间关系特征" tabindex="-1"><a class="header-anchor" href="#空间关系特征" aria-hidden="true">#</a> 空间关系特征</h4>
<ul>
<li>空间数据包括<code>空间坐标</code>和<code>拓扑关系</code>
<ul>
<li>方便空间数据的查询和空间分析(几何对象模型和空间网络模型)</li>
</ul>
</li>
</ul>
<h4 id="时态特征" tabindex="-1"><a class="header-anchor" href="#时态特征" aria-hidden="true">#</a> 时态特征</h4>
<ul>
<li>反映地理实体的状态和演变过程的重要组成部分</li>
</ul>
<h4 id="多尺度特征" tabindex="-1"><a class="header-anchor" href="#多尺度特征" aria-hidden="true">#</a> 多尺度特征</h4>
<p>PostGIS 是一个空间数据库。Oracle Spatial 和 SQL Server（2008 或更高版本）也是空间数据库</p>
<h3 id="_3-空间数据库的三大要素" tabindex="-1"><a class="header-anchor" href="#_3-空间数据库的三大要素" aria-hidden="true">#</a> [3]空间数据库的三大要素</h3>
<ul>
<li>空间数据（Spatial Data Type）</li>
<li>空间分析（Spatial Analysis）</li>
<li>空间索引（Spatial Indexing）</li>
</ul>
<h3 id="_4-空间数据库vs一般数据库" tabindex="-1"><a class="header-anchor" href="#_4-空间数据库vs一般数据库" aria-hidden="true">#</a> [4]空间数据库vs一般数据库</h3>
<ul>
<li>数据量大
<ul>
<li>一个城市达几十个G，影像达几百个G</li>
<li>在二维空间上划分为块或分幅，在垂直方向上划分为层来进行组织</li>
</ul>
</li>
<li>空间数据与属性数据结合</li>
<li>应用广泛</li>
</ul>
<h3 id="_5-常见的空间数据库管理系统" tabindex="-1"><a class="header-anchor" href="#_5-常见的空间数据库管理系统" aria-hidden="true">#</a> [5]常见的空间数据库管理系统</h3>
<p><code>Spatial Database Management System，SDBMS</code></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93d26299d0134840bc323bf65bc6a982~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220417221609580"></p>
<h3 id="_6-空间数据类型" tabindex="-1"><a class="header-anchor" href="#_6-空间数据类型" aria-hidden="true">#</a> [6]空间数据类型</h3>
<p>一个普通的数据库有字符串、数字和日期。而空间数据库添加了额外的数据类型来表示<strong>地理特征</strong>。这些数据类型抽象和封装了<code>边界</code>和<code>维度</code>等空间结构。在许多方面，空间数据类型可以简单地理解为形状geometry。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbdbe4f2b9e445fb85e7215ad91f8704~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220417221758072"></p>
<p>空间数据类型以分层类型组织。每个子类型都继承其父类型的结构（属性）和行为（方法或函数）。</p>
<h3 id="_7-空间函数" tabindex="-1"><a class="header-anchor" href="#_7-空间函数" aria-hidden="true">#</a> [7]空间函数</h3>
<p>空间数据库提供一组功能来分析几何组件、确定空间关系和操纵几何。这些空间功能作为构建任何空间项目的“工具”。</p>
<p>大多数空间函数可以分为以下五类之一：</p>
<ol>
<li><strong>转换</strong>：在<code>geometry</code>（<code>PostGIS</code>中存储空间信息的格式）和外部数据格式之间转换的函数。</li>
<li><strong>管理</strong>：管理有关空间表和 <code>PostGIS</code> 管理的信息的功能。</li>
<li><strong>检索</strong>：检索几何的属性和测量值的函数。</li>
<li><strong>比较</strong>：比较两个几何的空间关系的函数。</li>
<li><strong>生成</strong>：从其他函数生成新几何图形的函数。</li>
</ol>
<h3 id="_8-postgis简介" tabindex="-1"><a class="header-anchor" href="#_8-postgis简介" aria-hidden="true">#</a> [8]postgis简介</h3>
<p>PostGIS通过向PostgreSQL添加对<strong>空间数据类型</strong>、<strong>空间索引</strong>和<strong>空间函数</strong>的支持，将PostgreSQL数据库管理系统转换为<strong>空间数据库</strong>。</p>
<h3 id="_9-空间数据库标准规范" tabindex="-1"><a class="header-anchor" href="#_9-空间数据库标准规范" aria-hidden="true">#</a> [9]空间数据库标准规范</h3>
<p>现有空间数据库标准主要有：</p>
<ul>
<li><code>Simple Feature Access SQL, SFA SQL</code>（地理信息简单要素的SQL实现规范）</li>
<li><code>SQL Multimedia Part3: Spatial, SQL/MM</code></li>
</ul>
<h4 id="sfa-sql" tabindex="-1"><a class="header-anchor" href="#sfa-sql" aria-hidden="true">#</a> SFA SQL</h4>
<p>SFA SQL是OGC制定的标准</p>
<p><code>Simple Feature Access</code>规范的两部分分别为：</p>
<ul>
<li><code>Simple Feature Access - Part 1</code>: Common Architecture（<a href="https://link.zhihu.com/?target=https%3A//www.ogc.org/standards/sfa" target="_blank" rel="noopener noreferrer">https://www.ogc.org/standards/sfa</a>） —— 定义几何对象的通用架构，描述了通用的简单要素地理集合对象模型，及集合对象的不同表达方式和空间参考系统的表达方式，具有平台独立性。</li>
<li><code>Simple Feature Access - Part 2</code>: SQL Option（<a href="https://link.zhihu.com/?target=https%3A//www.ogc.org/standards/sfs" target="_blank" rel="noopener noreferrer">https://www.ogc.org/standards/sfs</a>） —— 定义了第一部分定义的简单要素模型在数据库中的实现，给出了内模式下几何类型(geometry type)的定义及相关实现。</li>
</ul>
<p>SFA由OGC于1999年提出，说明了简单地理要素（点，线，多边形等）的对象模型及其发布、存储、读取操作的接口标准。</p>
<p>2005年进一步细化了相关内容，添加了<strong>注记文字</strong> (Annotation Text)，将其修订为简单要素访问规范 (Simple Feature Access, SFA)1.1.0版。</p>
<p>2006年10月，推出了SFA 1.2.0版，目前该实现规范已被ISO TC211吸纳为ISO19125系列标准。</p>
<p>目前最新的SFA版本为1.2.1，于2011年推出。</p>
<h4 id="sql-mm" tabindex="-1"><a class="header-anchor" href="#sql-mm" aria-hidden="true">#</a> SQL/MM</h4>
<ul>
<li>PostGIS更符合SFA SQL标准（常用）</li>
<li>Oracle Spatial更兼容SQL/MM标准</li>
</ul>
<p>SQL/MM是ISO（International Standard Organization，国际标准化组织）提出的标准，SQL/MM第三部分空间定义了<strong>矢量数据</strong>存储与检索的相关标准，解释了基于这些数据类型如何使用存储、获取和处理空间数据。</p>
<h4 id="两个标准的对比分析-重点" tabindex="-1"><a class="header-anchor" href="#两个标准的对比分析-重点" aria-hidden="true">#</a> 两个标准的对比分析（重点）</h4>
<p>SFA SQL和SQL/MM的Geometry类型总体框架比较近似</p>
<p><strong>SFA SQL的Geometry类型结构图：</strong>（有空间参考系）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d504e9a27cd44dfb5e3b04b2b41e572~tplv-k3u1fbpfcp-zoom-1.image" alt="preview"></p>
<p><strong>SQL/MM的Geometry类型结构图：</strong></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57b5619891c34ae6b5595b69f2611d63~tplv-k3u1fbpfcp-zoom-1.image" alt="preview"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9baee1041489438d96067f8e602a23dd~tplv-k3u1fbpfcp-zoom-1.image" alt="preview"></p>
<h2 id="_2-几何对象模型" tabindex="-1"><a class="header-anchor" href="#_2-几何对象模型" aria-hidden="true">#</a> 2.几何对象模型</h2>
<h3 id="_1-空间数据模型" tabindex="-1"><a class="header-anchor" href="#_1-空间数据模型" aria-hidden="true">#</a> [1]空间数据模型</h3>
<h4 id="什么是数据模型" tabindex="-1"><a class="header-anchor" href="#什么是数据模型" aria-hidden="true">#</a> <strong>什么是数据模型？</strong></h4>
<p>空间数据模型表达的是空间信息的一种数据组织方式，通常有<code>对象模型</code>、<code>场模型</code>、<code>网络模型</code>等。现有空间数据库系统均是基于某种空间数据模型的。空间数据模型是数据库系统的核心和基础。</p>
<h4 id="空间数据模型的分类" tabindex="-1"><a class="header-anchor" href="#空间数据模型的分类" aria-hidden="true">#</a> 空间数据模型的分类</h4>
<p>现有的空间数据库都是基于某种空间数据模型</p>
<p><strong>GIS中常见的两大数据模型</strong>：矢量模型和栅格模型</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2a045c9f42f4a14a7698c60ad255dcd~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220417222654664"></p>
<h5 id="矢量模型" tabindex="-1"><a class="header-anchor" href="#矢量模型" aria-hidden="true">#</a> 矢量模型</h5>
<ul>
<li>利用点、线、多边形的形式来表达现实世界</li>
<li>具有定位明显，属性隐含的特点</li>
<li>不可再分的最小单元现象称为空间实体</li>
<li>空间地物精确形状的几何(<code>geometry</code>)模型
<ul>
<li>不含拓扑关系的对象(<code>object</code>)模型</li>
<li>包含拓扑关系的拓扑(<code>topo</code>)模型</li>
</ul>
</li>
<li>地物连通关系的网络(<code>network</code>)模型</li>
</ul>
<h5 id="栅格模型" tabindex="-1"><a class="header-anchor" href="#栅格模型" aria-hidden="true">#</a> 栅格模型</h5>
<ul>
<li>以二维矩阵的形式来表示空间地物或现象分布的数据组织方式</li>
<li>每个矩阵单位称为一个栅格单元，单元值表示地物或现象的属性数据</li>
</ul>
<h5 id="注记文字模型" tabindex="-1"><a class="header-anchor" href="#注记文字模型" aria-hidden="true">#</a> <strong>注记文字模型</strong></h5>
<ul>
<li>注记标签annotation label</li>
<li>注记文本annotation text</li>
<li>注记尺寸annotation size</li>
</ul>
<h3 id="_2-几何对象模型-1" tabindex="-1"><a class="header-anchor" href="#_2-几何对象模型-1" aria-hidden="true">#</a> [2]几何对象模型</h3>
<p>几何对象模型是空间数据库中最常见、最基础的一个模型</p>
<h4 id="概念模型" tabindex="-1"><a class="header-anchor" href="#概念模型" aria-hidden="true">#</a> 概念模型</h4>
<p>可以理解为空间数据类型（同关系型数据库中的实体，属性之类的概念）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f041663da43747748fe88e73b81834ac~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220417222955532"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c607b3118cfc42b9807f8408c6107ca0~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220417223008940"></p>
<ul>
<li>一个依赖于空间参考系(Spatial Reference System)</li>
<li>测量参考系(Measure Reference System)</li>
<li>几何(Geometry)类</li>
<li>点(Point)：零维几何对象类，代表空间中的一个点，如城市</li>
<li>线(Curve)：由点序列描述一维的几何对象类，如街道、管线。相邻两点间的插值方法：线性插值和非线性插值</li>
<li>面(Surface)</li>
<li>多点(MultiPoint)</li>
<li>多线(MultiCurve)</li>
<li>多面(MultiPolygon)</li>
<li>多曲线(MultiCurve)</li>
<li>多折线(MultiLineString)</li>
<li>多多边形(MultiPolygon)</li>
<li>折线(LineString)：曲线的子类，采用线性插值</li>
<li>线段(Line)：折线的特例，只有两个点的线串</li>
<li>环线(LineRing)：由折线派生而来，闭合的、不自相交或相切的折线</li>
<li>多边形(Polygon)</li>
<li>体表面(PolyhedraSurface)</li>
<li>三角形(Triangle)</li>
<li>不规则三角网(Triangulated irregular network, TIN)</li>
<li>几何集合(GeometryCollection)</li>
</ul>
<p><strong>坐标维数与几何维数的区别</strong>：<strong>坐标维数</strong>为常见（x,y,z)坐标，而<strong>几何维数</strong>为：几何维度是在一定前提下描述一个几何对象所需的参数个数。例如：“点是零维的、线是一维的、平面是二维的、体是三维的</p>
<h5 id="地理要素-feature" tabindex="-1"><a class="header-anchor" href="#地理要素-feature" aria-hidden="true">#</a> 地理要素(feature)</h5>
<ul>
<li>对现实世界空间现象的抽象</li>
<li>由几何(<code>geometry</code>)、属性(<code>attribute</code>)、行为(<code>behavior</code>)等三类信息构成</li>
<li>地理要素的属性和行为等信息的建模是由应用系统的设计者，根据实际应用需求进行建模</li>
<li>几何的建模是数据库管理系统关心的基础问题</li>
</ul>
<h5 id="理解该模型的几个要点" tabindex="-1"><a class="header-anchor" href="#理解该模型的几个要点" aria-hidden="true">#</a> 理解该模型的几个要点</h5>
<ol>
<li><code>OGC</code>仅能表达和处理简单(<code>Simple</code>)的几何对象：简单几何对象是指不自相交的几何对象</li>
</ol>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2f9d87aa3a24b7e9748950b59c16ccf~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220329155928476"></p>
<ol start="2">
<li>
<p>任何几何模型都有其边界(<code>boundary</code>)、内部(<code>interior</code>)和外部(<code>exterior</code>)</p>
<ul>
<li>边界：一个几何实体界限的集合，几何维数是其本身几何形状的维数减一
<ul>
<li>点：空</li>
<li>线：端点</li>
<li>曲线及其子类：起始点和终止点</li>
<li>多曲线及其子类：各曲线的起始点和终止点</li>
<li>面：构成它的线串</li>
</ul>
</li>
<li>内部：是几何对象除边界外的所有直接位置 (direct position) 的集合</li>
<li>外部：是空间全域与几何闭包之差
<ul>
<li>任意几何对象外部的维数总是2</li>
<li>所有的几何形状都有外部，即其几何形状的补集</li>
</ul>
</li>
</ul>
</li>
<li>
<p>几何对象模型的坐标维数为3，但目前仅能描述二维几何对象</p>
<ul>
<li>z值仅用于记录点在坐标空间中第3个坐标轴的测量值
<ul>
<li>点用来表示山峰的位置，z值表示该山峰的高度</li>
</ul>
</li>
<li>模型中的体表面(<code>PolyhedralSuface</code>)类和不规则三角网(TIN)类也仅用于表达三维坐标空间中的某个曲面，并不能表达一个真正的三维的体模型</li>
<li>随着空间应用的不断深入，三维几何对象、四维时空对象将是该模型今后需要不断发展和完善的地方</li>
</ul>
</li>
<li>
<p>M值</p>
<ul>
<li>点类除了<code>x, y, z</code>坐标外，还有一个<code>M</code>坐标</li>
<li><code>M</code>值是线性参考系统的一个重要的度量值</li>
<li>例如，高速公路上的里程碑点可用其M<code>值</code>表示从高速公路
起点到当前位置的距离</li>
</ul>
</li>
<li>
<p>由于体表面违反了“多边形元素只能相交在有限数量的点上”的规则，所以体表面不是多多边形</p>
</li>
<li>
<p>不规则三角网格主要用来表达高程或其他状况(如浓度)的表面</p>
<ul>
<li>
<p>用来高程、坡度、坡向的计算，等高线的提取，体积的计算，垂直剖面分析，通视分析等</p>
</li>
<li>
<p>在OGC的数据模型中，TIN被认为是矢量数据的一种表达方式，而ESRI的GeoDatabase则将其视为一种不同于矢</p>
</li>
<li>
<p>量表达的另一种空间数据表达方式</p>
</li>
</ul>
</li>
</ol>
<h5 id="几何对象的方法-函数" tabindex="-1"><a class="header-anchor" href="#几何对象的方法-函数" aria-hidden="true">#</a> 几何对象的方法（函数）</h5>
<p><strong>分类</strong></p>
<ul>
<li>常规方法</li>
</ul>
<p>12种方法，概念和方法不难理解</p>
<ul>
<li>常规GIS分析方法</li>
</ul>
<p>7种方法，基于GIS基础也不难理解</p>
<ul>
<li>空间查询方法</li>
</ul>
<p>前9种与空间拓扑关系查询有关
后2种是基于线性参考的空间查询方法</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de4880da69ee4987ba0835688cdb3034~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220417223455283"></p>
<h5 id="空间拓扑关系" tabindex="-1"><a class="header-anchor" href="#空间拓扑关系" aria-hidden="true">#</a> 空间拓扑关系</h5>
<p>8种空间关系</p>
<ul>
<li>
<p>相离(<code>disjoint</code>)</p>
<p>若𝑎 ∩ 𝑏 = ∅，则a和b相离</p>
</li>
<li>
<p>相交(<code>intersects</code>)</p>
<p>若𝑎 ∩ 𝑏 ≠ ∅，则a和b相交</p>
<p><code>a.Intersects(b) ↔ !a.Disjoint(b)</code></p>
</li>
<li>
<p>相等(<code>equals</code>)</p>
<p>若𝑎 𝑏，且𝑎 𝑏，则a和b相等</p>
</li>
<li>
<p>交叠(<code>overlaps</code>)</p>
<p>如<code>Dim(I(a)) = Dim(I(b)) = Dim(I(𝑎) ∩ 𝐼(𝑏))</code>，且<code>𝑎 ∩ 𝑏 ≠ 𝑎</code>，同时<code>𝑎 ∩ 𝑏 ≠ 𝑏</code>，则a和b交叠</p>
<p>点/点、线/线、面/面交叠关系，没有线/面等交叠关系</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b073305ce3104736998b5196d0185247~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220329182701564"></p>
</li>
<li>
<p>包含于(<code>within</code>)
若𝑎 ∩ 𝑏 = 𝑎，且I 𝑎 ∩ 𝐸 𝑏 = ∅，则a包含于b内</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0e5a54096c14ec4b0cb08d1b80cddf4~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220417223933200"></p>
</li>
<li>
<p>包含(<code>contains</code>)
若b包含于a，则a包含b
<code>a.Contains(b) ↔ b.Within(a)</code></p>
</li>
<li>
<p>相接(<code>touches</code>)
若<code>I 𝑎 ∩ 𝐼 𝑏 = ∅，且𝑎 ∩ 𝑏 ≠ ∅</code>，则a和b相接
面/面、线/线、线/面、点/面、点/线相接关系
但没有点/点相接关系(为什么?)</p>
<pre><code>  ![image-20220417223914721](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfe5ac7365ab46f9b91b5449ad309a69~tplv-k3u1fbpfcp-zoom-1.image)
</code></pre>
</li>
<li>
<p>穿越(<code>crosses</code>)
n 若[Dim(I 𝑎 ∩ 𝐼 𝑏 ) &lt; max(Dim(I(a)), Dim(I(b)))，且Dim(I(b)) !=0， 𝑎 ∩ 𝑏 ≠ 𝑎， 𝑎 ∩ 𝑏 ≠ 𝑏，则a穿越b
n OGC定义：I 𝑎 ∩ 𝐼 𝑏 ≠ ∅ ， 𝑎 ∩ 𝑏 ≠ 𝑎， 𝑎 ∩ 𝑏 ≠ 𝑏
n 点/线、点/面、线/线、线/面穿越关系</p>
<pre><code>  ![image-20220329182843549](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a1ca9a4474748ec95fb49597a1b8e78~tplv-k3u1fbpfcp-zoom-1.image)
</code></pre>
</li>
</ul>
<p>空间对象的拓扑关系不是非此即彼的，也有一定的分辨精度层次关系</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89e7303e97af46eb87b8a82a1e57db0e~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220417223830724"></p>
<h4 id="逻辑模型" tabindex="-1"><a class="header-anchor" href="#逻辑模型" aria-hidden="true">#</a> 逻辑模型</h4>
<p>基于概念模型，OGC提出了基于预定义数据类型和基于扩展几何类型的两种实现方法</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d10deb4f833a4a62a8917ff0a3589b9d~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220329183442285"></p>
<h5 id="基于预定义数据类型的实现" tabindex="-1"><a class="header-anchor" href="#基于预定义数据类型的实现" aria-hidden="true">#</a> 基于预定义数据类型的实现</h5>
<ul>
<li>利用关系数据库中已有的数字(<code>numeric</code>)类型、二进制大对象(<code>BLOB</code>)类型实现空间数据的存储和管理，这些数据类型的解释和维护由DBMS负责、</li>
<li>相关空间数据访问方法作为扩展函数嵌入到DBMS中</li>
<li>与空间数据引擎(如ArcSDE)的区别</li>
</ul>
<p>基于<code>numeric</code>和<code>BLOB</code>的实现，要素表(<code>Feature</code>)、几何列表(<code>GEOMETRY_COLUMNS</code>)和空间参考系(<code>SPATIAL_REF_SYS</code>)表的结构都一样，不同之处在于几何(<code>Geometry</code>)表的结构</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c33cb3821f414cc7866f782e88049750~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220417224138876"></p>
<blockquote>
<p><code>要素表</code>和<code>几何表</code>是用户表，用于存储空间数据，几何列表(<code>geometry_columns</code>)和空间参考系表是系统表，用于存储用户表的元数据<code>(meta-data)</code>信息</p>
</blockquote>
<p>下面为每个表的各字段解析</p>
<p><strong>Feature表:</strong></p>
<ul>
<li>记录一组具有相同属性和行为的地理要素的集合，要素表的列代表要素的属性，而不同的行代表不同的要素</li>
<li><code>Geometry_Column</code>列是几何对象的逻辑几何数据类型，其存储的是几何对象的唯一标识(<code>geometry ID, GID</code>)，而几何数据实际存储在<code>Geometry</code>表中，因此，可以将<code>GID</code>作为指针到<code>Geometry</code>表找到其空间数据</li>
</ul>
<p><strong>(基于Numeric类型的)Geometry表:</strong></p>
<ul>
<li>将几何类型的空间坐标作为数值对存储在表中，每行最多可存储<code>MAX_PPR</code>个空间坐标</li>
<li>若<code>Geometry</code>的空间坐标超过MAX_PPR则折行存储</li>
<li>其中的<code>GID</code>是<code>Geometry</code>对象的唯一标识</li>
<li>在由多个元素组成的<code>GeometryCollection</code>中<code>ESEQ</code>用于表示不同的元素</li>
<li><code>SEQ</code>则用于标识统一<code>Geometry</code>折行存储后的行序列号</li>
<li><code>ETYPE</code>用于标识<code>Geometry</code>表中指定的几何对象的类型(如，点、线、面、多点等)</li>
</ul>
<p><strong>(基于BLOB类型的)Geometry表</strong>:</p>
<ul>
<li>将空间数据以<code>WKB</code>(Well-Known Binary Representation)形式存储在名为<code>WKB_Geometry</code>的BLOB类型的字段中，</li>
<li>不会出现折行存储<code>Geometry</code>的情况</li>
<li>一行存储一个<code>Geometry</code>对象</li>
<li>每行GID是该<code>Geometry</code>对象的唯一标识</li>
<li><code>YMIN</code>, <code>YMAX</code>, <code>XMIN</code>, <code>XMAX</code>用于存储该对象的四至</li>
<li>该表的主码是<code>GID</code></li>
</ul>
<p><strong>GEOMETRY_COLUMNS表</strong>:</p>
<ul>
<li>记录数据库中所有要素表及其几何列的属性</li>
<li>该表的前三列可以唯一标识Feature表</li>
<li><code>F_TABLE_CATALOG</code>, <code>F_TABLE_SCHMEA</code>, <code>F_TABLE_NAME</code>分别表示某<code>Feature</code>表所在的目录名、模式名和表名</li>
<li><code>F_GEOMETRY_COLUM</code>用于记录前3列值确定的Feature表中</li>
<li><code>Geometry</code>列的名字</li>
<li>G_... 分别表示Geometry表所在的目录名、模式名和表名</li>
<li><code>STORAGE_TYPE</code>表示Geometry表的存储类型</li>
<li><code>GEOMETRY_TYPE</code>表示Geometry表中几何对象的类型</li>
<li><code>COORD_DIMENSION</code>表示几何对象的坐标维数</li>
<li><code>MAX_PPR</code>表示每行存储的空间坐标点个数</li>
<li><code>SRID</code>描述了<code>Feature</code>表的空间参考系</li>
</ul>
<p><strong>SPATIAL_REF_SYS表</strong></p>
<ul>
<li>记录了该空间数据库所支持的所有空间参考系</li>
<li><code>SRID</code>为主码</li>
<li><code>AUTH_NAME</code>是空间参考系的名字</li>
<li><code>RTEXT</code>是空间参考系的文字描述
<ul>
<li>4326 – WGS 84 Long Lat</li>
<li>4269 – NAD 83 Long Lat</li>
<li>3395 – WGS 84 World Mercator</li>
<li>2163 – US National Atlas Equal Area</li>
</ul>
</li>
</ul>
<p>示例</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e68b2af86a3430881c0390f10b42017~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220329185824973"></p>
<blockquote>
<p><strong>基于数字类型的Geometry表</strong>：其中，1 或多个坐标值(X 坐标值）将被表达为 Geometry 表中数值类型的对，每 个几何对象用键(GID) 标识，对象中不同元素元由 ESEQ 标识，每个元素的类型用 ETYPE 标识，每个元素分布在要素表的1或多行中，它们特有的顺序用 SEQ 值标识。对于无用的坐标对应将其全集(X Y) 置为 Nil 。</p>
</blockquote>
<blockquote>
<p><strong>基于 BOLB 类型的 Geometry 表</strong>：它仍用 GID 作为键、用 Geometry 著名二进制表示存储几何对象， Geometry 表包括几何对象的最小边界矩形。这样如有需要，允许构建无真实几何对象结构 访问的空间索引。</p>
</blockquote>
<h5 id="基于扩展几何类型的实现" tabindex="-1"><a class="header-anchor" href="#基于扩展几何类型的实现" aria-hidden="true">#</a> 基于扩展几何类型的实现</h5>
<p>所谓基于扩展 Geometry 类型的实现就是利用对象关系型数据库中对抽象数据类型的支 持，定义 <code>Geometry</code> 类型及其相关的方法与函数，并用该扩展的 Geometry 类型实现空间数 据的存储与管理。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2731f01105c449382b3eb9145c2bd5c~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220329190532307"></p>
<p>各表字段解释：</p>
<p><strong><code>GEOMETRY_COLUMNS</code>和<code>SPATIAL_REF_SYS</code>是系统表，用于存储元数据信息</strong></p>
<ul>
<li>属性解释与上面基于预定义数据类型相同</li>
</ul>
<p><strong>Feature表是用户表，用于存储空间数据</strong></p>
<ul>
<li>
<p>属性数据存在用户定义的<code>Attributes</code>列中</p>
</li>
<li>
<p>空间数据存放在扩展几何类型的<code>Geometry_Column</code>中</p>
</li>
</ul>
<p><strong>创建扩展几何体类型数据示例：</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Create</span> <span class="token keyword">Type</span> <span class="token keyword">Geometry</span> <span class="token keyword">As</span> Object <span class="token punctuation">(</span>
Private Dimension <span class="token keyword">SmallInt</span> <span class="token keyword">Default</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
Private CoordinateDimension <span class="token keyword">SmallInt</span> <span class="token keyword">Default</span> <span class="token number">2</span><span class="token punctuation">,</span>
Private Is3D <span class="token keyword">SmallInt</span> <span class="token keyword">Default</span> <span class="token number">3</span><span class="token punctuation">,</span>
Private IsMeasured <span class="token keyword">SmallInt</span> <span class="token keyword">Default</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token operator">Not</span> Instantiable
<span class="token operator">Not</span> Final
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>定义Dimension函数</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>Method Dimension<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">Return</span> <span class="token keyword">SmallInt</span>
<span class="token keyword">Language</span> <span class="token keyword">SQL</span>
<span class="token keyword">Deterministic</span>
<span class="token keyword">Contains</span> <span class="token keyword">SQL</span>
<span class="token keyword">Returns</span> <span class="token boolean">Null</span> <span class="token keyword">On</span> <span class="token boolean">Null</span> Input
……
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>定义SymDifference函数</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>Method SymDifference<span class="token punctuation">(</span>ageometry <span class="token keyword">Geometry</span><span class="token punctuation">)</span>
<span class="token keyword">Return</span> <span class="token keyword">Geometry</span>
<span class="token keyword">Language</span> <span class="token keyword">SQL</span>
<span class="token keyword">Deterministic</span>
<span class="token keyword">Contains</span> <span class="token keyword">SQL</span>
<span class="token keyword">Returns</span> <span class="token boolean">Null</span> <span class="token keyword">On</span> <span class="token boolean">Null</span> Input
……
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="物理模型" tabindex="-1"><a class="header-anchor" href="#物理模型" aria-hidden="true">#</a> 物理模型</h4>
<h5 id="wkb" tabindex="-1"><a class="header-anchor" href="#wkb" aria-hidden="true">#</a> WKB</h5>
<p>在基千 BLOB 的实现方案中，数据库仅将其解释为一个大的二进制串，故空间数据库管理系统的设计者需要考虑此二进制串的物理意义。</p>
<p>SFA SQL 给出了一种较为紧凑的几何数据的二进制方式的存储格式，即 WKB(well-known binary) 。它不仅可用于BLOB中空间对象的存储，还可以用于几何数据二进制流的交换。</p>
<p><strong>WKB表达</strong></p>
<p>示例：出一个由两个环构成的多边形的 WKB 表达</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4e7f3894d204fa2b7862ae2d48f13ae~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330213911253"></p>
<blockquote>
<ul>
<li>SFA SQL给出了一种较为紧凑的几何数据的二进制方式的存储格式</li>
<li>数字类型串行化为网络数据表示(network datarepresentation, NDR)或外部数据表示(external datarepresentation, XDR)存储在磁盘上</li>
<li>NDR(按小<code>Endian</code>方式编码)和<code>XDR</code>(按大<code>Endian</code>方式编码)是两种标准的数字类型二进制编码方式</li>
</ul>
</blockquote>
<h5 id="wkt" tabindex="-1"><a class="header-anchor" href="#wkt" aria-hidden="true">#</a> WKT</h5>
<ul>
<li>为在不同环境间交换几何数据， OGC 还提出了一种<code>基于文本格式</code>几何数据交汇标准表 达方法，即 WKT(well-known text) 。（易读）</li>
<li>OGC也为空间参考系提供了投影、地理和地心三种坐标系的不同WKT表达形式</li>
<li>SPATIAL_REF_SYS系统表中SRTEXT存储的是空间参考系的WKT表达</li>
</ul>
<p>以地理坐标系为例，在NAD83水准面(Datum)上的UTM10带被定义为：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>PROJCS <span class="token punctuation">[</span>“ NAD_198 <span class="token number">3</span>_UT M_Zon e_10M”<span class="token punctuation">,</span>
<span class="token operator">&lt;</span> geographic cs<span class="token operator">></span><span class="token punctuation">,</span>
PROJECTION <span class="token punctuation">[</span>“ Transverse_Mercator”<span class="token punctuation">]</span><span class="token punctuation">,</span>
PARAMETER <span class="token punctuation">[</span>“ False_Easting”<span class="token punctuation">,</span> <span class="token number">500000.0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
PARAMETER <span class="token punctuation">[</span>“ False_Nothing”<span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
PARAMETER <span class="token punctuation">[</span>“ Central_Meridian”<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">123.0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
PARAMETER<span class="token punctuation">[</span>“ Scale_Factor”<span class="token punctuation">,</span> <span class="token number">0.996</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
PARAMETER<span class="token punctuation">[</span>“ Latitude_Of_Origin”<span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
UNIT <span class="token punctuation">[</span>“ Meter”<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token comment">#对象依次为水准面、椭球体、本初子午线和测量的角度单位</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2512cd0e0fc4f0885fbfa3f82599865~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330214459321"></p>
<p>示例：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74e05e0e48fe4954b31ab8831707d1d7~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330214131318"></p>
<h5 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h5>
<p>WKT和WKB只支持二维几何对象的表达，并没有任何有关空间参考系的信息</p>
<ul>
<li>在将几何体的<code>WKT</code>或<code>WKB</code>表达在转换成另一种格式时，空间参考系信息常被丢失，若想保留这些信息，需要单独对其进行处理，同时用setSRID()方法把它们添到几何体中</li>
<li>为了避免这一缺点，PostGIS分别扩展形成<code>EWKB</code>和<code>EWKT</code>，不仅可以嵌入集合体的SRID信息，还增加了对3DZ、3DM和4D坐标的支持</li>
</ul>
<h2 id="_3-空间结构化查询语言" tabindex="-1"><a class="header-anchor" href="#_3-空间结构化查询语言" aria-hidden="true">#</a> 3.空间结构化查询语言</h2>
<ul>
<li>
<p>结构化查询语言(SQL)是关系数据库的标准语言（通用的、功能强大的关系数据库语言）</p>
</li>
<li>
<p>空间结构化查询语言(Spatial Structured QueryLanguage, <code>SSQL</code>)</p>
<ul>
<li>
<p>基于SQL99提供的对象扩展机制，扩充的一种用于实现空间数据的存储、管理、查询、更新与维护的结构化查询语言</p>
</li>
<li>
<p>由于与地理位置密切，也称为GSQL</p>
</li>
</ul>
</li>
<li>
<p>SSQL是基于某种空间数据模型，对标准的SQL进行扩展</p>
<ul>
<li>空间数据类型的基本操作</li>
<li>描述空间对象间拓扑关系的函数</li>
<li>空间分析与处理的一般操作</li>
</ul>
</li>
<li>
<p>以PostgreSQL/PostGIS为例</p>
</li>
</ul>
<p>PostGIS Manual Chapter 4, 6, 7http://postgis.net/docs/index.html</p>
<p>查找具体函数定义和说明Chapter 8-13</p>
<h2 id="_4-常用开源gis工具" tabindex="-1"><a class="header-anchor" href="#_4-常用开源gis工具" aria-hidden="true">#</a> 4,常用开源GIS工具</h2>
<h3 id="_1-postgis" tabindex="-1"><a class="header-anchor" href="#_1-postgis" aria-hidden="true">#</a> [1]postgis</h3>
<p>原生的postpresql：</p>
<ul>
<li>基本的集合实体类型，如点、线、线段、方形、多边形和圆等</li>
<li>函数和操作符实现几何类型的操作和运算</li>
<li>空间数据索引R-tree</li>
</ul>
<p>难以达到GIS要求</p>
<ul>
<li>缺乏复杂的空间类型</li>
<li>没有提供空间分析</li>
<li>没有提供投影变换功能</li>
</ul>
<p>此时便诞生了postgis</p>
<p>PostGIS是由Refractions Research公司研发的、对象关系型数据库系统<code>PostgreSQL</code>的一个空间扩展（在某个数据库下添加扩展postgis，该库便成为了空间数据库）下面为postgis的一些好处</p>
<ul>
<li>提供空间对象、空间索引、空间操作函数和空间操作符等空间信息服务功能</li>
<li>GNU的GPL，即任何人可以自由得到PostGIS的源码并对其做研究和改进</li>
</ul>
<p><strong>支持PostgreSQL/PostGIS开源GIS产品体系</strong></p>
<ul>
<li>桌面GIS软件QGIS http://www.qgis.org/</li>
<li>WebGIS服务GeoServer http://geoserver.org</li>
<li>支持各种空间格式转换的GDAL http://www.gdal.org/</li>
</ul>
<p><strong>PostGIS遵循OpenGIS的规范开发，支持OGC规范中的点、线、多边形、多点、多线、多多边形和集合对象集</strong></p>
<p><strong>PostGIS支持所有的对象表达方法，比如<code>WKT</code>和<code>WKB</code>，支持所有的数据存取和构造方法，提供空间分析函数，提供对元数据的支持及其相关的访问函</strong>
<strong>数，提供一系列用于检测空间对象之间的空间关系的二元谓词，提供空间操作符用于空间数据操作</strong></p>
<p><strong>除OGC规范要求的内容外，PostGIS提供：</strong></p>
<ul>
<li>数据库坐标变换
<ul>
<li>几何类型通过Transform从一种投影变换到另一种</li>
</ul>
</li>
<li>球体长度运算</li>
<li>三维几何类型3DZ,3DM and 4D coordinates</li>
<li>空间聚集函数
<ul>
<li>聚集函数Extent返回一系列要素的最小边界矩形</li>
</ul>
</li>
<li>栅格数据类型</li>
</ul>
<blockquote>
<ul>
<li>PostGIS并未严格地按照对象加方法的形式实现，而是采用对象类型加函数的形式实现</li>
<li>早起的PostGIS函数是根据OGC的SFA SQL标准开发，后来OGC为了与SQL/MM兼容，修订了SFASQL标准，形成了SFA SQL以及ISO19125</li>
<li>在后续的标准中，空间函数的参数稍有变动，且均已“ST_”(Spatial Type)开头。为此，OGC又根据SFA SQL封装了一套“ST_”开头的函数</li>
<li>PostGIS常会出现两个功能基本相同的函数，一个以“ST_”开头，另一个则无“ST_”（因为SFA SQL标准的Geometry函数是无ST开头的，而SQL/MM标准的Geometry函数则是有ST开头的）</li>
</ul>
</blockquote>
<h4 id="postgis中常用数据类型" tabindex="-1"><a class="header-anchor" href="#postgis中常用数据类型" aria-hidden="true">#</a> PostGIS中常用数据类型</h4>
<ul>
<li><code>boolean</code> 布尔类型，其值为T或F</li>
<li><code>box2d</code> 矩形框类型，由矩形左下角和右上角组成</li>
<li><code>box3d</code> 长方体类型，由左前下角和右后上角组成</li>
<li><code>bytea</code> 相当于BLOB类型，可变长的二进制值</li>
<li><code>integer</code> 字节为4的整数(int4)</li>
<li><code>double precision</code> 字节为8的浮点数(float8)</li>
<li><code>character varying</code>可变长字符类型，相当于BLOC</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/746b4c432c2c4d2382e39cf5b57dea93~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330165733164"></p>
<h4 id="shapefile数据导入" tabindex="-1"><a class="header-anchor" href="#shapefile数据导入" aria-hidden="true">#</a> Shapefile数据导入</h4>
<p>使用PostGIS 2.0 Shapefile and DBF Loader Exporter</p>
<p>使用QGIS连接导入</p>
<h3 id="_2-openstreetmap" tabindex="-1"><a class="header-anchor" href="#_2-openstreetmap" aria-hidden="true">#</a> [2]OpenStreetMap</h3>
<p>OSM网上地图协作计划，目标是创造一个内容自由且能让所有人编辑的世界地图</p>
<h4 id="osm数据结构" tabindex="-1"><a class="header-anchor" href="#osm数据结构" aria-hidden="true">#</a> OSM数据结构</h4>
<p>空间数据和属性数据</p>
<ul>
<li>空间数据
<ul>
<li><code>Node</code>定义了空间中点的位置
<ul>
<li>node通过经纬度定义了一个地理坐标点</li>
<li>可以height=标示物体所海拔；通过layer= * 和level= * ，可以标示物体所在的地图层面与所在建筑物内的层数；通过place=* 和name=* 来表示对象的名称。同时，way也是通过多个点（node）连接成线（面）来构成的</li>
</ul>
</li>
<li><code>Ways</code>定义了线或区域
<ul>
<li>通过2-2000个点(nodes)构成了way。way可表示如下3种图形事物：非闭合线(Open polyline)、闭合线(Closedpolyline)、区域(Area)。对于超过2000 nodes的way，可以通过分割来处理</li>
<li><code>Open polyline</code>
<ul>
<li>非闭合线：收尾不闭合的线段。通常可用于表示现实中的道路、河流、铁路等</li>
</ul>
</li>
<li><code>Closed polyline</code>
<ul>
<li>闭合线：收尾相连的线。例如可以表示现实中的环线地铁</li>
</ul>
</li>
<li><code>Area</code>
<ul>
<li>区域：闭合区域。通常使用<code>landuse=*</code> 来标示区域等</li>
</ul>
</li>
</ul>
</li>
<li><code>Relations</code>(可选的)定义了元素间的关系
<ul>
<li>一个Relation是用来描述两个或多个基元的相互关系(nodes, ways 或者其他的relations)，相互的关系通过role来定义，包括
<ul>
<li>route ：定义公路、自行车道、铁路等</li>
<li>多个多边形：定义area例如建筑、河堤等</li>
<li>边界：装门用来定义行政边界</li>
<li>限制：用于描述限制比如“非左转”</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>属性数据<code>Tags</code>用于描述上述矢量数据基元
<ul>
<li>标签不是地图基本元素，但是各元素都通过tag来记录数据信息</li>
<li>通过key和value来对数据进行记录</li>
<li>例如，可以通过highway=residential来定义居住区道路；同时，可以使用附加的命名空间来添加附加信息，例如，maxspeed:winter=*就表示冬天的最高限速</li>
</ul>
</li>
</ul>
<h4 id="osm数据及下载" tabindex="-1"><a class="header-anchor" href="#osm数据及下载" aria-hidden="true">#</a> OSM数据及下载</h4>
<p>osm数据格式：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>OSM XML – xml-format provided by the API

PBF – highly compressed, optimized binary format similar to the API

o5m – for high-speed processing, uses PBF coding, has same structure as XML format

OSMJSON – json variant of OSM XML
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>osm数据下载网站：</p>
<p><strong>GeoFabrik：</strong><a href="http://www.geofabrik.de/" target="_blank" rel="noopener noreferrer"><strong>http://www.geofabrik.de/</strong></a></p>
<p><strong>Metro Extracts：</strong>[<strong>http://metro.teczno.com/</strong></p>
<p>)<strong>HOT Exports：</strong><a href="http://hot.openstreetmap.org/" target="_blank" rel="noopener noreferrer"><strong>http://hot.openstreetmap.org/</strong></a></p>
<p><strong>BBBike：</strong><a href="http://extract.bbbike.org/" target="_blank" rel="noopener noreferrer"><strong>http://extract.bbbike.org/</strong></a></p>
<h4 id="基于osm数据搭建一个地图服务" tabindex="-1"><a class="header-anchor" href="#基于osm数据搭建一个地图服务" aria-hidden="true">#</a> 基于OSM数据搭建一个地图服务</h4>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/786f65d4111040aba1738fd2968a6771~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<h2 id="_5-矢量数据的定义与操纵" tabindex="-1"><a class="header-anchor" href="#_5-矢量数据的定义与操纵" aria-hidden="true">#</a> 5.矢量数据的定义与操纵</h2>
<h4 id="_1-数据定义与插入" tabindex="-1"><a class="header-anchor" href="#_1-数据定义与插入" aria-hidden="true">#</a> [1]数据定义与插入</h4>
<p>创建一个实践表</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> landuse <span class="token punctuation">(</span>
    landuse_id <span class="token keyword">integer</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    the_geom <span class="token keyword">geometry</span><span class="token punctuation">,</span> <span class="token comment">#也可以写成the_geom geometry(Polygon, 4326)</span>
    area <span class="token keyword">double</span> <span class="token keyword">precision</span><span class="token punctuation">,</span>   <span class="token comment">#面积</span>
    perimeter <span class="token keyword">double</span> <span class="token keyword">precision</span><span class="token punctuation">,</span>  <span class="token comment">#周长</span>
    <span class="token keyword">constraint</span> landuse_key <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>landuse_id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>插入数据</p>
<p><strong>例3</strong>：将一条新的土地利用数据记录<code>(ID:12; 名称:Timberforest;几何列WKB描述:01010000001DDB93F460BB4241A84E5AC86F455441; 面</code>
<code>积: 47806700; 周长: 34246.2)</code>插入到landuse表中</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> landuse
<span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">,</span> ‘Timber<span class="token operator">-</span>forest’<span class="token punctuation">,</span>
‘<span class="token number">01010000001</span>DDB93F460BB4241A84E5AC86F455441’<span class="token punctuation">,</span>
<span class="token number">47806700</span><span class="token punctuation">,</span> <span class="token number">34246.2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//等同于</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> landuse
<span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">,</span> ‘Timber<span class="token operator">-</span>forest’<span class="token punctuation">,</span>
ST_GeomFromText<span class="token punctuation">(</span>‘<span class="token keyword">Polygon</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">20</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">20</span> <span class="token number">10</span><span class="token punctuation">,</span>
<span class="token number">10</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>’<span class="token punctuation">,</span> <span class="token number">4326</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">47806700</span><span class="token punctuation">,</span> <span class="token number">34246.2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a57f3b4615174ff3ba106fc0f7effd4f~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330221816575"></p>
<p>插入子查询结果（首先建立新表 landuse_ new, 其属性列名与 landuse 相同）
<strong>例4</strong>：将<code>landuse</code>表中ID号小于15的记录存入表<code>landuse_new</code>中，假设<code>landuse_new</code>属性列只有<code>landuse_id</code>, <code>name</code>,<code>the_geom</code></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> landuse_new
<span class="token keyword">select</span> landuse_id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> the_geom
<span class="token keyword">from</span> landuse
<span class="token keyword">where</span> landuse_id <span class="token operator">&lt;</span> <span class="token number">15</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d58e7d9fb4564993935438445d032ff3~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330221830731"></p>
<h4 id="_2-管理函数" tabindex="-1"><a class="header-anchor" href="#_2-管理函数" aria-hidden="true">#</a> [2]管理函数</h4>
<p>管理和操纵几何类型的数据表及其元数据</p>
<ul>
<li><code>AddGeometryColumn(varchar,varchar,varchar,int4,varchar,int4)</code>
<ul>
<li>添加几何字段</li>
<li>参数依次为：表的模式名  ，表名  ，列名（字段名），数据几何类型  ，几何对象类型的维数 （下面的函数参数同理）</li>
</ul>
</li>
<li><code>DropGeometryColumn(varchar, varchar, varchar)</code>
<ul>
<li>删除几何字段</li>
</ul>
</li>
<li><code>DropGeometryTable(varchar, varchar)</code>
<ul>
<li>删除一个空间表</li>
</ul>
</li>
</ul>
<blockquote>
<p>几何属性可以在创建关系时直接创建，也可以再创建关系后，增加几何属性<code>position geometry(xxx, 4326)AddGeometryColumn</code></p>
</blockquote>
<ul>
<li><code>Probe_Geometry_Columns()</code>
<ul>
<li>检查数据库几何字段并在系统表<code>geometry_columns</code>表中归档</li>
</ul>
</li>
<li><code>ST_SetSRID(geometry, int4)</code>
<ul>
<li>设置几何对象的空间参考</li>
</ul>
</li>
<li><code>UpdateGeometrySRID(varchar, varchar, int4)</code>
<ul>
<li>更新空间表的空间参考</li>
</ul>
</li>
<li><code>Update_Geometry_Stats(varchar, varchar)</code>
<ul>
<li>更新空间表的统计信息</li>
</ul>
</li>
</ul>
<p>例5：在<code>landuse</code>表中添加一个新的几何字段</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span> AddGeometryColumn<span class="token punctuation">(</span><span class="token string">'public'</span><span class="token punctuation">,</span> <span class="token string">'landuse'</span><span class="token punctuation">,</span> <span class="token string">'geom'</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">'Polygon'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4501430acbda401987c399d4b0f06f61~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330222029648"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f58b452741640c0b3df9fb61cf4f799~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330222059339"></p>
<h4 id="_3-构造函数" tabindex="-1"><a class="header-anchor" href="#_3-构造函数" aria-hidden="true">#</a> [3]构造函数</h4>
<p>根据给定的几何描述，构造相应几何对象</p>
<ul>
<li>
<p>根据WKT/WKB表达，生成多几何对象</p>
<ul>
<li><code>ST_GeomCollFromText(text, [])</code></li>
<li><code>ST_GeomCollFromWKB(bytea, [])</code></li>
</ul>
</li>
<li>
<p>根据GML/WKT/WKB表达，生成几何对象</p>
<ul>
<li><code>ST_GeomFromGML</code></li>
<li><code>ST_GeomFromText</code>(构造几何对象建议使用<code>ST_GeomFromText(‘WKT’, 4326)</code></li>
<li><code>ST_GeomFromWKB</code></li>
</ul>
</li>
<li>
<p>根据输入的多点/WKT/WKB表达，生成线串</p>
<ul>
<li><code>ST_LineFromMultiPoint(geometry)</code></li>
<li><code>ST_LineFromText(text, [])</code></li>
<li><code>ST_LineFromWKB(bytea, [])</code></li>
</ul>
</li>
<li>
<p>创建一个A为左下角点、B为右上角点的box2d对象</p>
<ul>
<li><code>ST_MakeBox2D(geometry A, geometry B)</code></li>
</ul>
</li>
<li>
<p>根据给定的两个点对象，生成一条线段</p>
<ul>
<li><code>ST_MakeLine(geometry, geometry)</code></li>
</ul>
</li>
<li>
<p>创建一个2D、3D或4D坐标空间中的点对象</p>
<ul>
<li><code>ST_MakePoint(float8, float8, [], [])</code></li>
</ul>
</li>
<li>
<p>创建一个带有x, y和M值的点对象</p>
<ul>
<li><code>ST_MakePoint(float8, float8, float8)</code></li>
</ul>
</li>
<li>
<p>创建一个多边形（输入参数中的几何对象必须是封闭的）</p>
<ul>
<li><code>ST_MakePolygon(geometry, [])</code></li>
</ul>
</li>
<li>
<p>基于WKT/WKB表达，生成多点/多线/多多边形</p>
<ul>
<li><code>ST_MPoint(Line)(Poly)FromText(text, [])</code></li>
</ul>
</li>
<li>
<p>根据给定的左边对，生成点</p>
<ul>
<li><code>ST_Point(float, float)</code></li>
</ul>
</li>
<li>
<p>根据WKT/WKB表达，生成多边形</p>
<ul>
<li><code>ST_PolyFromText(text, [])</code></li>
<li><code>ST_PolyFromWKB(bytea, [])</code></li>
</ul>
</li>
<li>
<p>根据给定的线串、SRID（空间参考） ，生成多边形</p>
<ul>
<li><code>ST_Polygon(geometry, integer)</code></li>
</ul>
</li>
</ul>
<p>示例：构造名为aline的LineString(1 2, 3 4)几何对象</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span>
ST_LineFromWKB<span class="token punctuation">(</span>
ST_AsBinary<span class="token punctuation">(</span>
ST_GeomFromText<span class="token punctuation">(</span> <span class="token string">'LineString(1 2, 3 4)'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">as</span> aline
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote>
<ul>
<li>
<p>其中， ST _ AsBinary 的作用将 Geometry 类型转换为WKB类型的函数</p>
</li>
<li>
<p><code>ST _GeomFromText</code> 的第一个参数为文本类型，是某个几何对象的 WKT 描述；</p>
</li>
<li>
<p><code>ST_LineFrom WKB</code> 第一个参数为长二进制类型，是某个几何对象的 WKB 述。他们的第二个参数均为可选参数，一般为空间参考 (SRID) 所对应的整数值。在缺省的 情况下， SRID 取值为-1</p>
</li>
</ul>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce3a441114f742688bc1595d2f250a46~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330223147037"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9680a7352fe4119a7ae52d6dba3a730~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330223158354"></p>
<h4 id="_4-访问函数" tabindex="-1"><a class="header-anchor" href="#_4-访问函数" aria-hidden="true">#</a> [4]访问函数</h4>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6faba6ed6b442988f02413eb097da35~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330224710698"></p>
<blockquote>
<p>注意：</p>
<ul>
<li>
<p>哪些函数适应LineString / Polygon，哪些适用MultiLineString /MultiPolygon</p>
</li>
<li>
<p>新版本可能对函数进行更新，增加或减少功能，例如ST_StartPoint在2.0.0之后不支持single geometryMultiLineString。函数在具体使用时查看适用版本的帮助文档</p>
</li>
</ul>
</blockquote>
<p>示例：用<code>ST_IsSimple</code>函数判断下面几何对象是否是简单对象</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span>
ST_IsSimple<span class="token punctuation">(</span>ST_GeomFromText<span class="token punctuation">(</span> <span class="token string">'LINESTRING(1 1,2 2, 1 3, 1 2, 2 1)'</span> <span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">As</span> smpl_line<span class="token punctuation">,</span>
ST_IsSimple<span class="token punctuation">(</span>ST_GeomFromText <span class="token punctuation">(</span><span class="token string">'POLYGON((0 0,0 1, 1 1, 1 0, 0 0))'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">As</span> smpl_plygon
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/620a9b51a7c543babd5dc40db4422172~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330225041197"></p>
<h4 id="_5-输出函数" tabindex="-1"><a class="header-anchor" href="#_5-输出函数" aria-hidden="true">#</a> [5]输出函数</h4>
<p>按不同格式的要求输出几何对象</p>
<ul>
<li>PostGIS按<code>WKB</code>, <code>WKT</code>, <code>EWKB</code>, <code>EWKT</code>, <code>GeoJSON</code>, <code>GML</code>, <code>KML</code>,<code>SVG</code>, 用little-endian或bigendian编码的HEXEWKB等格式输出几何对象</li>
<li><code>ST_AsText</code>/<code>AsBinary</code>/<code>AsEWKB</code>/<code>AsEWKT</code>/<code>AsGeoJson</code>/<code>AsGML</code>/<code>AsHEXEWKB</code>/<code>AsKML</code>/<code>AsSVG</code></li>
</ul>
<p>示例：以<code>Polygon((0 0, 0 1, 1 1, 1 0, 0 0))</code>为例，分别按二进制、EWKT、SVG的格式输出</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> ST_AsBinary<span class="token punctuation">(</span>ST_GeomFromText <span class="token punctuation">(</span><span class="token string">'POLYGON ((0 0, 0 1, 1 1, 1 0, 0 0))'</span><span class="token punctuation">,</span> <span class="token number">4326</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e9fccef8f394e2cabf1e7395a81d81c~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330230137391"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> ST_AsEWKT<span class="token punctuation">(</span>ST_GeomFromText<span class="token punctuation">(</span><span class="token string">'POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))'</span><span class="token punctuation">,</span> <span class="token number">4326</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c70d710d5b774805b34477fdde046055~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330230256739"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> ST_AsSVG<span class="token punctuation">(</span>ST_GeomFromText <span class="token punctuation">(</span><span class="token string">'POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))'</span><span class="token punctuation">,</span> <span class="token number">4326</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/572a5426904b468d948be8bcad577e65~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330230351039"></p>
<h4 id="_4-编辑函数" tabindex="-1"><a class="header-anchor" href="#_4-编辑函数" aria-hidden="true">#</a> [4]编辑函数</h4>
<p>编辑函数用于增加、删除、修改几何对象的坐标信息</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51d83e308f9d4ce1a9e7c0bdf86ff385~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330231043665"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d010495ca2934611adb45bef59be5ec0~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330231102912"></p>
<p>示例1：使用<code>ST_Force_Collection</code>函数将原先的<code>Geometry</code>数据类型转换为<code>GeometryCollection</code></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> ST_AsEWKT<span class="token punctuation">(</span>ST_Force_Collection<span class="token punctuation">(</span><span class="token string">'POLYGON((0 0 2, 0 5 2, 5 0 2, 0 0 
2), (1 1 2, 3 1 2, 1 3 2, 1 1 2))'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>示例2：将例1中的多边形用ST_ForceRHR进行强制转换，使其坐标排列顺序符合RHR</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span> ST_AsEWKT<span class="token punctuation">(</span>
    ST_Force_RHR<span class="token punctuation">(</span>
    <span class="token string">'Polygon((0 0 2, 0 5 2, 5 0 2, 0 0 2),
    	(1 1 2, 3 1 2, 1 3 2, 1 1 2))'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>示例3：对三维坐标空间中的几何对象进行仿射变换的函数ST_Affine，共13个参数，图形学4X4的变换矩阵，将一条线沿Z轴方向旋转a弧度</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span> ST_AsEWKT<span class="token punctuation">(</span>ST_Affine<span class="token punctuation">(</span>the_geom<span class="token punctuation">,</span> cos<span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">-</span>
    sin<span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> sin<span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> cos<span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">As</span>
    using_Affine
<span class="token keyword">From</span> <span class="token punctuation">(</span><span class="token keyword">Select</span> ST_GeomFromEWKT<span class="token punctuation">(</span> <span class="token string">'LINESTRING(1
    2 3, 1 4 3)'</span><span class="token punctuation">)</span> <span class="token keyword">As</span> the_geom<span class="token punctuation">)</span> <span class="token keyword">As</span> HAHA
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="_4-几何处理函数" tabindex="-1"><a class="header-anchor" href="#_4-几何处理函数" aria-hidden="true">#</a> [4]几何处理函数</h4>
<p>获取一些衍生的几何对象，达到不同应用所要求的数据</p>
<ul>
<li>
<p><code>ST_Buffer</code> 获取几何对象的缓冲区</p>
</li>
<li>
<p><code>ST_Boundary</code> 获取几何对象的边界</p>
</li>
<li>
<p><code>ST_Centroid</code> 获取几何对象的质心</p>
</li>
<li>
<p><code>ST_ConvexHull</code> 获取几何对象的凸包</p>
</li>
<li>
<p><code>ST_Difference</code> 获取A去除B的几何形状</p>
</li>
<li>
<p><code>ST_Intersection</code> 获取两个几何对象相交部分</p>
</li>
<li>
<p><code>ST_MemUnion</code></p>
<ul>
<li>返回值与<code>ST_Union</code>相同，区别是该函数是内存友好的，即用较少的内存和较长的时间完成合并操作</li>
</ul>
</li>
<li>
<p><code>ST_PointOnSurface</code> 返回曲面上的点</p>
</li>
<li>
<p><code>ST_Shift_Longitude</code> 使经度在0-360之间</p>
</li>
<li>
<p><code>ST_SymDifference</code> 获取A和B互补相交部分</p>
</li>
<li>
<p><code>ST_Union</code> 返回A和B合并后的几何</p>
</li>
</ul>
<p>示例1：获取土地利用表landuse中ID号为12的几何对象的质心</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span> ST_Centroid<span class="token punctuation">(</span>the_geom<span class="token punctuation">)</span> <span class="token keyword">From</span> landuse <span class="token keyword">Where</span> landuse_id <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79606f66ed6e405286a50b6c61c259e2~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330231950612"></p>
<p>示例2:为土地利用数据表<code>landuse</code>中ID号为12的几何对象建立缓冲区距离为3的缓冲区(<code>ST_Buffer(geometry, float8, [int4]) 可选参数[int4]表示生成缓冲区的一个1/4的圆弧内的点，默认为8</code>)</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span> ST_Buffer<span class="token punctuation">(</span>the_geom<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token keyword">From</span> Landuse <span class="token keyword">Where</span> Landuse_id <span class="token operator">=</span> <span class="token number">12</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7fe4cb6ee004aefbaf015f3b2d13946~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330232151592"></p>
<h4 id="_4-操作符" tabindex="-1"><a class="header-anchor" href="#_4-操作符" aria-hidden="true">#</a> [4]操作符</h4>
<p>正如属性数据的&quot;&gt;&quot;、&quot;＝＂、＂&lt;”等操作符一样， PostGIS 也定义了一些空间操作符。</p>
<p>与几何操作不同的是：操作符 进行空间操作的对象必须有空间索引才行，也就是说空间操作符是与空间索引绑定的。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe0b50b9608d46b59ecb7a04b0984c1e~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330232412776"></p>
<p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span> tbla<span class="token punctuation">.</span>column1<span class="token punctuation">,</span> tblb<span class="token punctuation">.</span>column1<span class="token punctuation">,</span> tbla<span class="token punctuation">.</span>column2 <span class="token operator">&amp;&amp;</span>
tblb<span class="token punctuation">.</span>column2 <span class="token keyword">As</span> overlaps
<span class="token keyword">From</span> <span class="token punctuation">(</span><span class="token keyword">Values</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> ‘<span class="token keyword">Linestring</span><span class="token punctuation">(</span><span class="token number">0</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token number">2</span><span class="token punctuation">)</span>’::<span class="token keyword">geometry</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> ‘<span class="token keyword">Linestring</span><span class="token punctuation">(</span><span class="token number">0</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span> <span class="token number">3</span><span class="token punctuation">)</span>’::<span class="token keyword">geometry</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">As</span> tbla<span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token keyword">Values</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> ‘<span class="token keyword">Linestring</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token number">5</span><span class="token punctuation">)</span>’::<span class="token keyword">geometry</span><span class="token punctuation">)</span> <span class="token keyword">As</span> tblb
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="_4-空间关系函数" tabindex="-1"><a class="header-anchor" href="#_4-空间关系函数" aria-hidden="true">#</a> [4]空间关系函数</h4>
<p>用于判断两几何对象的拓扑关系</p>
<ul>
<li>
<p><code>ST_Contains</code> 判断A是否包含B</p>
</li>
<li>
<p><code>ST_Covers</code> 判断A是否覆盖B</p>
</li>
<li>
<p><code>ST_CoveredBY</code> 判断B是否覆盖A</p>
</li>
<li>
<p><code>ST_Crosses</code> 判断A和B是否相互穿过</p>
</li>
<li>
<p><code>ST_Disjoint</code> 判断A和B是否相离</p>
</li>
<li>
<p><code>ST_DWithin</code> 判断A和B距离是否在给定值内</p>
</li>
<li>
<p><code>ST_Equals</code> 判断A和B是否相等</p>
</li>
<li>
<p><code>ST_Intersects</code> 判断A和B是否相交</p>
</li>
<li>
<p><code>ST_Overlaps</code> 判断A和B是否重叠</p>
</li>
<li>
<p><code>ST_Relate</code>判断A和B是否符合给定的9交模型矩阵</p>
</li>
<li>
<p><code>ST_Relate</code> 获取A和B间的关系DE-9IM</p>
</li>
<li>
<p><code>ST_Touches</code> 判断A和B是否相接</p>
</li>
<li>
<p><code>ST_Within</code> 判断A是否被B包含</p>
</li>
</ul>
<p>示例：判断两个多边形对象Polygon((1 1, 2 1, 2 3, 11)), Polygon((3 0, 3 2, 4 0, 3 0))间是否相交</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span> ST_Intersects<span class="token punctuation">(</span>
ST_GeomFromText<span class="token punctuation">(</span><span class="token string">'Polygon((1 1, 2 1, 2 3, 1 1))'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
ST_GeomFromText<span class="token punctuation">(</span><span class="token string">'Polygon((3 0, 3 2, 4 0, 3 0))'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/976e166dd3ee48f2a6d8e0912b5ec780~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220330233021144"></p>
<h4 id="_4-量测函数" tabindex="-1"><a class="header-anchor" href="#_4-量测函数" aria-hidden="true">#</a> [4]量测函数</h4>
<p>获取几何对象的各类测量值</p>
<ul>
<li>
<p>ST_Area 计算几何对象的面积</p>
</li>
<li>
<p>ST_Azimuth 计算两点构成的方位角</p>
</li>
<li>
<p>ST_Distance 计算两个几何对象的距离</p>
</li>
<li>
<p>ST_Distance_Sphere计算两个几何对象的球迷距离（单位为米），地球半径取值为6370986米</p>
</li>
<li>
<p>ST_Distance_Spheroid计算地球曲面上两点间的最短距离，<code>ST_Distance_Sphere</code>速度更快，ST_Distance_Spheroid准确度更高</p>
</li>
<li>
<p>ST_Length2d 计算二维坐标距离</p>
</li>
<li>
<p>ST_Length3d 计算三维坐标距离</p>
</li>
<li>
<p>ST_Length_Spheroid根据给定的地球椭球参数，计算几何对象在地球曲面上的长度</p>
</li>
<li>
<p>ST_Max_Distance 计算两个对象间的最大距离</p>
</li>
<li>
<p>ST_Perimeter 计算二维坐标空间的周长</p>
</li>
<li>
<p>ST_Perimeter3d 计算三维坐标空间的周长</p>
</li>
</ul>
<blockquote>
<p>注意：测量函数，如距离，长度，面积等，单位与空间参考系相关</p>
</blockquote>
<p>示例1：求两点(0 0)和(1 1)间的方位角</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span> ST_Azimuth<span class="token punctuation">(</span>ST_GeomFromText<span class="token punctuation">(</span><span class="token string">'Point(0 0)'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>ST_GeomFromText<span class="token punctuation">(</span><span class="token string">'Point(1 1)'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2313e474499147818f1208a4395f367d~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220331090844786"></p>
<p>示例2：计算两点在GRS_1980地球椭球体下的曲面距离</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span> ST_Distance_Spheroid<span class="token punctuation">(</span>ST_Centroid<span class="token punctuation">(</span>the_geom<span class="token punctuation">)</span><span class="token punctuation">,</span>ST_GeomFromText<span class="token punctuation">(</span><span class="token string">'Point(-118, 38)'</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">'SPHERO ID["GRS_1980", 6378137, 298.257222101]'</span><span class="token punctuation">)</span> <span class="token keyword">from</span> landuse<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="_4-线性参考" tabindex="-1"><a class="header-anchor" href="#_4-线性参考" aria-hidden="true">#</a> [4]线性参考</h4>
<p>获取线性参考系下的部分几何对象，只对点和线数据有效</p>
<ul>
<li><code>ST_Line_Interpolate_Point</code> 插值点</li>
<li><code>ST_Line_Locate_Point</code> 计算位置参数</li>
<li><code>ST_Line_Substring</code> 计算线段</li>
<li><code>ST_Locate_Along_Measre</code>返回与给定量测值的几何对象</li>
<li><code>ST_Locate_Between_Measure</code>返回与给定量测值匹配的几何对象</li>
</ul>
<p>示例：点在线串30%的位置</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span> ST_AsEWKT<span class="token punctuation">(</span>ST_Line_Interpolate_Point
<span class="token punctuation">(</span>the_line<span class="token punctuation">,</span> <span class="token number">0.30</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">From</span> <span class="token punctuation">(</span><span class="token keyword">Select</span> ST_GeomFromEWKT<span class="token punctuation">(</span>
‘<span class="token keyword">Linestring</span> <span class="token punctuation">(</span><span class="token number">25</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">80</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">150</span> <span class="token number">210</span><span class="token punctuation">)</span>’<span class="token punctuation">)</span> <span class="token keyword">as</span> the_line<span class="token punctuation">)</span>
<span class="token keyword">As</span> HOHO
结果: <span class="token punctuation">(</span><span class="token number">65.666222484043</span><span class="token punctuation">,</span> <span class="token number">81.7570104342365</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="_4-其他函数" tabindex="-1"><a class="header-anchor" href="#_4-其他函数" aria-hidden="true">#</a> [4]其他函数</h4>
<ul>
<li>
<p>ST_Accum 构造一个几何对象数组</p>
</li>
<li>
<p>ST_Box2d 获取几何对象二维中的边界</p>
</li>
<li>
<p>ST_Box3d 获取几何对象三维中的边界</p>
</li>
<li>
<p>ST_Estimated_Extent估计一个空间数据表的边界范围</p>
</li>
<li>
<p>ST_Expand 扩大几何对象</p>
</li>
<li>
<p>ST_Mem_Size 获取几何对象使用的内存大小</p>
</li>
<li>
<p>ST_Point_Inside_Circle判断点是否在圆内</p>
</li>
<li>
<p>ST_Summary获取几何对象的文本概要信息</p>
</li>
<li>
<p>ST_XMin, ST_XMax</p>
</li>
<li>
<p>ST_YMin, ST_YMax</p>
</li>
<li>
<p>ST_ZMin, ST_Zmax</p>
<ul>
<li>获取X,Y,Z最小值和最大值</li>
</ul>
</li>
</ul>
<p>示例：估计土地利用数据表<code>landuse</code>的边界范围，以及<code>the_geom</code>字段占用的内存大小的空间查询语句</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">Select</span> ST_Estimate_Extent<span class="token punctuation">(</span><span class="token string">'public'</span><span class="token punctuation">,</span> <span class="token string">'landuse'</span><span class="token punctuation">,</span>
<span class="token string">'the_geom'</span><span class="token punctuation">)</span>
<span class="token keyword">Select</span> <span class="token function">SUM</span><span class="token punctuation">(</span>ST_Mem_Size<span class="token punctuation">(</span>the_geom<span class="token punctuation">)</span> <span class="token keyword">From</span> landuse
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h5>
<ul>
<li>查看PostGIS帮助文档-
<ul>
<li>http://postgis.net/docs/reference.html</li>
</ul>
</li>
<li>函数定义和描述说明，适用于单个几何对象，还是多个几何集合</li>
<li>注意不同版本之间的函数差异，如ST_StartPoint</li>
<li>创建空间属性
<ul>
<li>创建关系时直接创建，如pos geometry(Point, 4326)，增加几何类型和空间参考系</li>
<li>创建关系后增加几何属性，使用AddGeometryColum，注意没有ST_</li>
</ul>
</li>
<li>创建空间数据
<ul>
<li>建议使用ST_GeomFromText(‘几何对象WKT表示’, 4326)</li>
</ul>
</li>
<li>空间数据查询– 选择正确的函数解决问题，选择高效的函数提高效率
<ul>
<li>ST_Distance, ST_Length, ST_Area等单位与空间参考系相关</li>
<li>ST_Within和ST_DWithin的差异，ST_Distance和ST_DWithin的相互转换</li>
</ul>
</li>
</ul>
</template>
