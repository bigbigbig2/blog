<template><h2 id="一-坐标系" tabindex="-1"><a class="header-anchor" href="#一-坐标系" aria-hidden="true">#</a> 一，坐标系</h2>
<h3 id="_1-坐标系与坐标映射" tabindex="-1"><a class="header-anchor" href="#_1-坐标系与坐标映射" aria-hidden="true">#</a> 1.坐标系与坐标映射</h3>
<p>浏览器的四个图形系统通用的坐标系分别为：</p>
<ul>
<li>HTML 采用的是窗口坐标系，以参考对象（参考对象通常是最接近图形元素的 <code>position</code> 非 <code>static</code> 的元素）的元素盒子左上角为坐标原点，x 轴向右，y 轴向下，坐标值对应像素值。</li>
<li><code>SVG</code>  采用的是视区盒子（<code>viewBox</code>）坐标系。这个坐标系在默认情况下，是以 <code>svg</code> 根元素左上角为坐标原点，<code>x</code> 轴向右，<code>y</code> 轴向下，<code>svg</code>  根元素右下角坐标为它的像素宽高值。如果我们设置了 <code>viewBox</code> 属性，那么 <code>svg</code> 根元素左上角为 <code>viewBox</code> 的前两个值，右下角为  <code>viewBox</code> 的后两个值。</li>
<li><code>Canvas</code> 采用的坐标系我们比较熟悉了，它默认以画布左上角为坐标原点，右下角坐标值为 <code>Canvas</code> 的画布宽高值。</li>
<li><code>WebGL</code> 的坐标系比较特殊，是一个三维坐标系。它默认以画布正中间为坐标原点，<code>x</code> 轴朝右，<code>y</code> 轴朝上，<code>z</code> 轴朝外，<code>x</code> 轴、<code>y</code> 轴在画布中范围是 <code>-1</code> 到 <code>1</code>。</li>
</ul>
<blockquote>
<p><strong>共同点</strong>：但都是直角坐标系，它们都满足直角坐标系的特性：不管原点和轴的方向怎么变，用同样的方法绘制几何图形，它们的形状和相对位置都不变。</p>
</blockquote>
<blockquote>
<p><strong>坐标转换</strong>： 正因为这四个坐标系都是直角坐标系，所以它们可以很方便地相互转化。其中，<code>HTML</code>、<code>SVG</code> 和 <code>Canvas</code> 都提供了 <code>transform</code> 的 <code>API</code> 能够帮助我们很方便地转换坐标系。而 <code>WebGL</code> 本身不提供 <code>tranform</code> 的  <code>API</code>，但我们可以在 <code>shader</code> 里做矩阵运算来实现坐标转换</p>
</blockquote>
<h3 id="_2-canvas实现坐标系转换" tabindex="-1"><a class="header-anchor" href="#_2-canvas实现坐标系转换" aria-hidden="true">#</a> 2.Canvas实现坐标系转换</h3>
<p>将其左上角的原点通过自带的transform和scaleAPI实现转换到画布中间，x轴为向右为正，y轴为先上为正。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64c9ae25419141d5a40f498c46e508c2~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220325183104982"></p>
<blockquote>
<p>这样做的目的是可以更方便、直观地计算出几个图形元素的坐标了，而不用先进行大量的计算在进行绘制。</p>
</blockquote>
<h2 id="二-向量" tabindex="-1"><a class="header-anchor" href="#二-向量" aria-hidden="true">#</a> 二，向量</h2>
<p>可视化呈现依赖于计算机图形学，而向量运算是整个计算机图形学的数学基础。</p>
<p>在向量运算中，除了加法表示移动点和绘制线段外，向量的点乘、叉乘运算也有特殊的意义</p>
<h3 id="_1-向量在图形学习中的理解" tabindex="-1"><a class="header-anchor" href="#_1-向量在图形学习中的理解" aria-hidden="true">#</a> 1.向量在图形学习中的理解</h3>
<p>我们一般是用向量来表示一个点或者一个线段</p>
<p>二维向量其实就是一个包含了两个数值的数组，一个是 <code>x</code> 坐标值，一个是 <code>y</code> 坐标值。向量的维度等于“列表”的长度</p>
<p>一个向量包含有长度和方向信息。它的长度可以用向量的 <code>x、y</code> 的平方和的平方根来表示，如果用 <code>JavaScript</code> 来计算，就是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>v<span class="token punctuation">.</span><span class="token function-variable function">length</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span>  Math<span class="token punctuation">.</span><span class="token function">hypot</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token comment">//向量的长度，hypot() 返回欧几里德范数 sqrt(x*x + y*y)。</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>它的方向可以用与 <code>x</code> 轴的夹角来表示，即：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>v<span class="token punctuation">.</span><span class="token function-variable function">dir</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
    <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">atan2</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>y<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//向量的夹角</span>
<span class="token punctuation">}</span>
<span class="token comment">//在上面的代码里，Math.atan2 的取值范围是 -π到π，负数表示在 x 轴下方，正数表示在 x 轴上方。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>最后，根据长度和方向的定义，我们还能推导出一组关系式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>v<span class="token punctuation">.</span>x <span class="token operator">=</span> v<span class="token punctuation">.</span>length <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>dir<span class="token punctuation">)</span><span class="token punctuation">;</span>  x等于向量的长度<span class="token operator">*</span><span class="token function">cos</span><span class="token punctuation">(</span>向量的夹角<span class="token punctuation">)</span>
v<span class="token punctuation">.</span>y <span class="token operator">=</span> v<span class="token punctuation">.</span>length <span class="token operator">*</span>  Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>dir<span class="token punctuation">)</span><span class="token punctuation">;</span> y等于向量的长度<span class="token operator">*</span><span class="token function">sin</span><span class="token punctuation">(</span>向量的夹角<span class="token punctuation">)</span>
<span class="token comment">//知道方向和长度就能求出向量的值（x,y）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这个推论意味着一个重要的事实：我们可以很简单地构造出一个绘图向量。也就是说，如果我们希望以点 <code>(x0, y0)</code>  为起点，沿着某个方向画一段长度为 <code>length</code> 的线段，我们只需要构造出如下的一个向量就可以了。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fa5a8c35ef946f1bc55b01453033b94~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220325184702129"></p>
<p>这里的<code>α</code>是与 <code>x</code> 轴的夹角，<code>v</code> 是一个单位向量（基向量），它的长度为 <code>1</code>。然后我们把向量 (x0, y0) 与这个向量 v1相加，得到的就是这条线段的终点。</p>
<h3 id="_2-向量加法" tabindex="-1"><a class="header-anchor" href="#_2-向量加法" aria-hidden="true">#</a> 2.向量加法</h3>
<p>可以看成是在空间中的平移平行</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afbe7490cef54a9fbff3d9b475beede9~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429220537199"></p>
<p>也可以看出数轴上加法的一种扩展（运算上）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/083f230e6ac54483b5dfffebb57566d9~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220513161809457"></p>
<h3 id="_3-向量数乘" tabindex="-1"><a class="header-anchor" href="#_3-向量数乘" aria-hidden="true">#</a> 3.向量数乘</h3>
<ul>
<li>
<p>可以看成，向量长度的数乘（倍数），这种拉伸和压缩，有时还会改变向量方式（正负）的现象，也叫向量的缩放scaling</p>
</li>
<li>
<p>倍数，也称为标量scalars</p>
</li>
<li>
<p>数字在向量中的主要作用就是缩放变量</p>
</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb8ae24d799d47eba130940afbbad949~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429221350283"></p>
<h3 id="_4-向量点乘" tabindex="-1"><a class="header-anchor" href="#_4-向量点乘" aria-hidden="true">#</a> 4.向量点乘</h3>
<h4 id="_1-数学计算上的理解" tabindex="-1"><a class="header-anchor" href="#_1-数学计算上的理解" aria-hidden="true">#</a> [1]数学计算上的理解</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//两个 N 维向量 a 和 b，a = [a1, a2, ...an]，b = [b1, b2, ...bn]</span>
a•b <span class="token operator">=</span> a1<span class="token operator">*</span>b1 <span class="token operator">+</span> a2<span class="token operator">*</span>b2 <span class="token operator">+</span> <span class="token operator">...</span> <span class="token operator">+</span> an<span class="token operator">*</span>bn
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e605cbe2d51c4cef9c53d43174dfda1b~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220325193858100"></p>
<p>两种特殊情况：</p>
<ul>
<li>
<p>第一种是，当 a、b 两个向量平行时，它们的夹角就是 0°，那么 <code>a·b=|a|*|b|</code>，用 JavaScript 代码表示就是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>a<span class="token punctuation">.</span>x <span class="token operator">*</span> b<span class="token punctuation">.</span>x <span class="token operator">+</span> a<span class="token punctuation">.</span>y <span class="token operator">*</span> b<span class="token punctuation">.</span>y <span class="token operator">===</span> a<span class="token punctuation">.</span>length <span class="token operator">*</span> b<span class="token punctuation">.</span>length；
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>第二种是，当 a、b 两个向量垂直时，它们的夹角就是 90°，那么 <code>a·b=0</code>，用 JavaScript 代码表示就是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>a<span class="token punctuation">.</span>x <span class="token operator">*</span> b<span class="token punctuation">.</span>x <span class="token operator">+</span> a<span class="token punctuation">.</span>y <span class="token operator">*</span> b<span class="token punctuation">.</span>y <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h4 id="_2-几何理解" tabindex="-1"><a class="header-anchor" href="#_2-几何理解" aria-hidden="true">#</a> [2]几何理解</h4>
<p>投影为垂直投影</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf7065eeb68c4d74ac1b0b8c19371e5c~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220513164856675"></p>
<blockquote>
<ul>
<li>当向量<code>w</code>和向量<code>v</code>的方向相反时，它们的点积的值为负的</li>
<li>当向量w和向量v的方向大致相同时，它们的点积为正的</li>
<li>当向量w和向量v相互垂直时，意味着一个向量在另一个向量的投影为零向量，它们的点积为零</li>
</ul>
</blockquote>
<p>点积与顺序无关，也就是，谁投影到谁上都是相同的</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/815b3a2fb3ac485aa760ec304bbad3eb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<blockquote>
<p>首先假设 向量<code>v</code> 和 向量<code>w</code> 长度相同，利用对称轴，两个向量互相的投影相等；</p>
<p>接下来如果你<strong>缩放其中一个到原来的两倍</strong>，对称性被破坏，但是<strong>缩放比例没变</strong>，最终<strong>乘法的结果</strong>也没变，一动图胜千言</p>
</blockquote>
<p>我们有一个从二维空间到数轴的线性变换，它并不是由向量数值或点运算定义得到的。而是将通过空间投影到给定数轴上来定义得到的，但是因为这个变换是线性的，所以它必然 可以使用某个1x2的矩阵来描述，又因为1x2矩阵与二维向量相乘的计算过程和转置矩阵并求点积的计算过程相同，所以这个投影变换必然会与某个二维向量相关。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a094b00a7b74a6b9721c0090d6671a6~tplv-k3u1fbpfcp-zoom-1.image" alt="a"></p>
<ul>
<li><strong>点积是理解投影的有力几何工具</strong></li>
<li>方便<strong>检验两个向量的指向是否相同</strong></li>
<li>更进一步，两个<strong>向量点乘</strong>，就是将<strong>其中一个向量转化为线性变换</strong></li>
<li>向量仿佛是一个<strong>特定变换的概念性记号</strong>。对一般人类来说，想象空间中的向量比想象这个空间移动到数轴上更加容易</li>
</ul>
<h3 id="_5-向量的叉乘" tabindex="-1"><a class="header-anchor" href="#_5-向量的叉乘" aria-hidden="true">#</a> 5.向量的叉乘</h3>
<p>叉乘和点乘有两点不同：<strong>首先，向量叉乘运算的结果不是标量，而是一个向量，这个向量的长度为，叉乘向量的平行四边形的面积，这个平行四边形是向量 a 和向量 b  构成面积；</strong></p>
<p><strong>其次，两个向量的叉积与两个向量组成的坐标平面垂直</strong></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5af0dc34e4364ab19fb888ee8d594ba0~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20200922122052167"></p>
<p><strong>二维向量叉积的几何意义就是向量 a、b 组成的平行四边形的面积。</strong></p>
<p>叉乘在数学上的计算：</p>
<p>假设，现在有两个三维向量 <code>a(x1, y1, z1)</code> 和 <code>b(x2, y2, z2)</code>，那么，<code>a</code> 与 <code>b</code> 的叉积可以表示为一个如下图的行列式：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1115215cf96546cfa966e8d14a8b9e50~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220325194757338"></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//其中 i、j、k 分别是 x、y、z 轴的单位向量。我们把这个行列式展开，就能得到如下公式</span>
a <span class="token constant">X</span> b <span class="token operator">=</span> <span class="token punctuation">[</span>y1 <span class="token operator">*</span> z2 <span class="token operator">-</span> y2 <span class="token operator">*</span> z1<span class="token punctuation">,</span> <span class="token operator">-</span> <span class="token punctuation">(</span>x1 <span class="token operator">*</span> z2 <span class="token operator">-</span> x2 <span class="token operator">*</span> z1<span class="token punctuation">)</span><span class="token punctuation">,</span> x1 <span class="token operator">*</span> y2 <span class="token operator">-</span> x2 <span class="token operator">*</span> y1<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>我们计算这个公式，得到的值还是一个三维向量，它的方向垂直于 a、b 所在平面。因此，我们刚才说的二维空间中，向量 a、b 的叉积方向就是垂直纸面朝向我们的。</p>
<p>确定叉积的方向：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3ea107e06464f699e534c1e8ac094e0~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220513170113777"></p>
<p>右手系中向量叉乘的方向就是右手拇指的方向，那左手系中向量叉乘的方向自然就是左手拇指的方向了。</p>
<p>在了解了向量叉积的几何意义之后，我们通过向量叉积得到平行四边形面积，再除以底边长，就能得到点到向量所在直线的距离了</p>
<h3 id="_6-使用向量绘制曲线" tabindex="-1"><a class="header-anchor" href="#_6-使用向量绘制曲线" aria-hidden="true">#</a> 6.使用向量绘制曲线</h3>
<p>先确定起始点和起始向量，然后通过旋转和向量加法来控制形状，就可以将曲线一段一段地绘制出来。但是它的缺点也很明显，就是数学上不太直观，需要复杂的换算才能精确确定图形的位置和大小。</p>
<p>Canvas2D 和 SVG 中都提供了画圆、椭圆、贝塞尔曲线的API，但是像WEBGL这种偏底层的则没有这些api了，需要自己封装。</p>
<p>原理：曲线是可以用折线来模拟的，当折线足够多时，折线图形便成为了曲线图形。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//绘制正边变型</span>
<span class="token keyword">function</span> <span class="token function">regularShape</span><span class="token punctuation">(</span><span class="token parameter">edges <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> step</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> delta <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> <span class="token punctuation">(</span>edges <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">/</span> edges<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vector2D</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> dir <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vector2D</span><span class="token punctuation">(</span>step<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> edges<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    p <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>dir<span class="token punctuation">.</span><span class="token function">rotate</span><span class="token punctuation">(</span>delta<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">draw</span><span class="token punctuation">(</span><span class="token function">regularShape</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 绘制三角形</span>
<span class="token function">draw</span><span class="token punctuation">(</span><span class="token function">regularShape</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 绘制六边形</span>
<span class="token function">draw</span><span class="token punctuation">(</span><span class="token function">regularShape</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">64</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 绘制十一边形</span>
<span class="token function">draw</span><span class="token punctuation">(</span><span class="token function">regularShape</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 绘制六十边形</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="三-参数方程" tabindex="-1"><a class="header-anchor" href="#三-参数方程" aria-hidden="true">#</a> 三，参数方程</h2>
<p><strong>使用参数方程绘制曲线</strong>：通过封装函数来实现，使用参数方程能够避免向量绘制的缺点，因此是更常用的绘制方式。使用参数方程绘制曲线时，我们既可以使用有规律的曲线参数方程来绘制这些规则曲线，还可以使用二阶、三阶贝塞尔曲线来在起点和终点之间构造平滑曲线。</p>
<h3 id="_1-圆" tabindex="-1"><a class="header-anchor" href="#_1-圆" aria-hidden="true">#</a> 1.圆</h3>
<p>圆的参数方程</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f22f6cb0e4e4adf97bd58f5082414eb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<p>图形绘制代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">TAU_SEGMENTS</span> <span class="token operator">=</span> <span class="token number">60</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">TAU</span> <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">arc</span><span class="token punctuation">(</span><span class="token parameter">x0<span class="token punctuation">,</span> y0<span class="token punctuation">,</span> radius<span class="token punctuation">,</span> startAng <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> endAng <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ang <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token constant">TAU</span><span class="token punctuation">,</span> endAng <span class="token operator">-</span> startAng<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> ang <span class="token operator">===</span> <span class="token constant">TAU</span> <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>x0<span class="token punctuation">,</span> y0<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> segments <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token constant">TAU_SEGMENTS</span> <span class="token operator">*</span> ang <span class="token operator">/</span> <span class="token constant">TAU</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> segments<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> x <span class="token operator">=</span> x0 <span class="token operator">+</span> radius <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>startAng <span class="token operator">+</span> ang <span class="token operator">*</span> i <span class="token operator">/</span> segments<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//方程</span>
    <span class="token keyword">const</span> y <span class="token operator">=</span> y0 <span class="token operator">+</span> radius <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>startAng <span class="token operator">+</span> ang <span class="token operator">*</span> i <span class="token operator">/</span> segments<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//方程</span>
    ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">draw</span><span class="token punctuation">(</span><span class="token function">arc</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="_2-椭圆" tabindex="-1"><a class="header-anchor" href="#_2-椭圆" aria-hidden="true">#</a> 2.椭圆</h3>
<p>椭圆方程：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a1c86df6fe74b2b9ab7dc1dde7f5bf8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">TAU_SEGMENTS</span> <span class="token operator">=</span> <span class="token number">60</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">TAU</span> <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">ellipse</span><span class="token punctuation">(</span><span class="token parameter">x0<span class="token punctuation">,</span> y0<span class="token punctuation">,</span> radiusX<span class="token punctuation">,</span> radiusY<span class="token punctuation">,</span> startAng <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> endAng <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ang <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token constant">TAU</span><span class="token punctuation">,</span> endAng <span class="token operator">-</span> startAng<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> ang <span class="token operator">===</span> <span class="token constant">TAU</span> <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>x0<span class="token punctuation">,</span> y0<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> segments <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token constant">TAU_SEGMENTS</span> <span class="token operator">*</span> ang <span class="token operator">/</span> <span class="token constant">TAU</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> segments<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> x <span class="token operator">=</span> x0 <span class="token operator">+</span> radiusX <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>startAng <span class="token operator">+</span> ang <span class="token operator">*</span> i <span class="token operator">/</span> segments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> y <span class="token operator">=</span> y0 <span class="token operator">+</span> radiusY <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>startAng <span class="token operator">+</span> ang <span class="token operator">*</span> i <span class="token operator">/</span> segments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">draw</span><span class="token punctuation">(</span><span class="token function">ellipse</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="_3-抛物线" tabindex="-1"><a class="header-anchor" href="#_3-抛物线" aria-hidden="true">#</a> 3.抛物线</h3>
<p>抛物线方程：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b48fbc71a2644c98a51ff8ee95727e9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">LINE_SEGMENTS</span> <span class="token operator">=</span> <span class="token number">60</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">parabola</span><span class="token punctuation">(</span><span class="token parameter">x0<span class="token punctuation">,</span> y0<span class="token punctuation">,</span> p<span class="token punctuation">,</span> min<span class="token punctuation">,</span> max</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token constant">LINE_SEGMENTS</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> s <span class="token operator">=</span> i <span class="token operator">/</span> <span class="token number">60</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> t <span class="token operator">=</span> min <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> s<span class="token punctuation">)</span> <span class="token operator">+</span> max <span class="token operator">*</span> s<span class="token punctuation">;</span>
    <span class="token keyword">const</span> x <span class="token operator">=</span> x0 <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">*</span> p <span class="token operator">*</span> t <span class="token operator">**</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> y <span class="token operator">=</span> y0 <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">*</span> p <span class="token operator">*</span> t<span class="token punctuation">;</span>
    ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">draw</span><span class="token punctuation">(</span><span class="token function">parabola</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">5.5</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="_4-常见曲线" tabindex="-1"><a class="header-anchor" href="#_4-常见曲线" aria-hidden="true">#</a> 4.常见曲线</h3>
<p>如果我们为每一种曲线都分别对应实现一个函数，就会非常笨拙和繁琐。那为了方便，我们可以用函数式的编程思想，封装一个更简单的 JavaScript 参数方程绘图模块，以此来绘制出不同的曲线。这个绘图模块的使用过程主要分为三步。</p>
<p>第一步，我们实现一个叫做 <code>parametric</code> 的高阶函数，它的参数分别是 x、y 坐标和参数方程。</p>
<p>第二步，<code>parametric</code> 会返回一个函数，这个函数会接受几个参数，比如，start、end 这样表示参数方程中关键参数范围的参数，以及 seg 这样表示采样点个数的参数等等。在下面的代码中，当 seg 默认 100 时，就表示在 start、end 范围内采样 101（seg+1）个点，后续其他参数是作为常数传给参数方程的数据。</p>
<p>第三步，我们调用 <code>parametric</code> 返回的函数之后，它会返回一个对象。这个对象有两个属性：一个是 points，也就是它生成的顶点数据；另一个是 draw 方法，我们可以利用这个 draw 方法完成绘图。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 根据点来绘制图形</span>
<span class="token keyword">function</span> <span class="token function">draw</span><span class="token punctuation">(</span>points<span class="token punctuation">,</span> context<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  strokeStyle <span class="token operator">=</span> <span class="token string">'black'</span><span class="token punctuation">,</span>
  fillStyle <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  close <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  context<span class="token punctuation">.</span>strokeStyle <span class="token operator">=</span> strokeStyle<span class="token punctuation">;</span>
  context<span class="token punctuation">.</span><span class="token function">beginPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  context<span class="token punctuation">.</span><span class="token function">moveTo</span><span class="token punctuation">(</span><span class="token operator">...</span>points<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> points<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    context<span class="token punctuation">.</span><span class="token function">lineTo</span><span class="token punctuation">(</span><span class="token operator">...</span>points<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>close<span class="token punctuation">)</span> context<span class="token punctuation">.</span><span class="token function">closePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>fillStyle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    context<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> fillStyle<span class="token punctuation">;</span>
    context<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  context<span class="token punctuation">.</span><span class="token function">stroke</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">parametric</span><span class="token punctuation">(</span><span class="token parameter">xFunc<span class="token punctuation">,</span> yFunc</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">start<span class="token punctuation">,</span> end<span class="token punctuation">,</span> seg <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> points <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> seg<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> p <span class="token operator">=</span> i <span class="token operator">/</span> seg<span class="token punctuation">;</span>
      <span class="token keyword">const</span> t <span class="token operator">=</span> start <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> p<span class="token punctuation">)</span> <span class="token operator">+</span> end <span class="token operator">*</span> p<span class="token punctuation">;</span>
      <span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token function">xFunc</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 计算参数方程组的x</span>
      <span class="token keyword">const</span> y <span class="token operator">=</span> <span class="token function">yFunc</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 计算参数方程组的y</span>
      points<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">draw</span><span class="token operator">:</span> <span class="token function">draw</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> points<span class="token punctuation">)</span><span class="token punctuation">,</span>
      points<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>利用绘图模块，我们就可以绘制出各种有趣的曲线了。比如，我们可以很方便地绘制出抛物线，代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 抛物线参数方程</span>
<span class="token keyword">const</span> para <span class="token operator">=</span> <span class="token function">parametric</span><span class="token punctuation">(</span>
  <span class="token parameter">t</span> <span class="token operator">=></span> <span class="token number">25</span> <span class="token operator">*</span> t<span class="token punctuation">,</span>
  <span class="token parameter">t</span> <span class="token operator">=></span> <span class="token number">25</span> <span class="token operator">*</span> t <span class="token operator">**</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 绘制抛物线</span>
<span class="token function">para</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">5.5</span><span class="token punctuation">,</span> <span class="token number">5.5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>再比如，我们可以绘制出阿基米德螺旋线，代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> helical <span class="token operator">=</span> <span class="token function">parametric</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token parameter">t<span class="token punctuation">,</span> l</span><span class="token punctuation">)</span> <span class="token operator">=></span> l <span class="token operator">*</span> t <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">t<span class="token punctuation">,</span> l</span><span class="token punctuation">)</span> <span class="token operator">=></span> l <span class="token operator">*</span> t <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">helical</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">strokeStyle</span><span class="token operator">:</span> <span class="token string">'blue'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>绘制星形线</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> star <span class="token operator">=</span> <span class="token function">parametric</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token parameter">t<span class="token punctuation">,</span> l</span><span class="token punctuation">)</span> <span class="token operator">=></span> l <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">**</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">t<span class="token punctuation">,</span> l</span><span class="token punctuation">)</span> <span class="token operator">=></span> l <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">**</span> <span class="token number">3</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">star</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">strokeStyle</span><span class="token operator">:</span> <span class="token string">'red'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="_1-画贝塞尔曲线" tabindex="-1"><a class="header-anchor" href="#_1-画贝塞尔曲线" aria-hidden="true">#</a> [1]画贝塞尔曲线</h4>
<p>前面我们说的这些曲线都比较常见，它们都是符合某种固定数学规律的曲线。但生活中还有很多不规则的图形，无法用上面这些规律的曲线去描述。那我们该如何去描述这些不规则图形呢？贝塞尔曲线（Bezier Curves）就是最常见的一种解决方式。</p>
<p>我们可以用 parametric 构建并绘制二阶贝塞尔曲线，代码如下所示：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> quadricBezier <span class="token operator">=</span> <span class="token function">parametric</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token parameter">t<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> x0<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> x1<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> x2<span class="token punctuation">}</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> t<span class="token punctuation">)</span> <span class="token operator">**</span> <span class="token number">2</span> <span class="token operator">*</span> x0 <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">*</span> t <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> t<span class="token punctuation">)</span> <span class="token operator">*</span> x1 <span class="token operator">+</span> t <span class="token operator">**</span> <span class="token number">2</span> <span class="token operator">*</span> x2<span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">t<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">y</span><span class="token operator">:</span> y0<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">y</span><span class="token operator">:</span> y1<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">y</span><span class="token operator">:</span> y2<span class="token punctuation">}</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> t<span class="token punctuation">)</span> <span class="token operator">**</span> <span class="token number">2</span> <span class="token operator">*</span> y0 <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">*</span> t <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> t<span class="token punctuation">)</span> <span class="token operator">*</span> y1 <span class="token operator">+</span> t <span class="token operator">**</span> <span class="token number">2</span> <span class="token operator">*</span> y2<span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p0 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vector2D</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vector2D</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p1<span class="token punctuation">.</span><span class="token function">rotate</span><span class="token punctuation">(</span><span class="token number">0.75</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vector2D</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 绘制30条从圆心出发，旋转不同角度的二阶贝塞尔曲线</span>
  p1<span class="token punctuation">.</span><span class="token function">rotate</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">/</span> count <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  p2<span class="token punctuation">.</span><span class="token function">rotate</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">/</span> count <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">quadricBezier</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    p0<span class="token punctuation">,</span>
    p1<span class="token punctuation">,</span>
    p2<span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>在上面的代码中，我们绘制了 30 个二阶贝塞尔曲线，它们的起点都是 (0,0)，终点均匀分布在半径 200 的圆上，控制点均匀地分布在半径 100 的圆上。最终，实现的效果如下图所示</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/524b689abc5f4deebd13d50808a312ab~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<h4 id="_2-贝塞尔曲线绘制catmull–rom" tabindex="-1"><a class="header-anchor" href="#_2-贝塞尔曲线绘制catmull–rom" aria-hidden="true">#</a> [2]贝塞尔曲线绘制Catmull–Rom</h4>
<p>总的来说，贝塞尔曲线对于可视化，甚至整个计算机图形学都有着极其重要的意义。因为它能够针对一组确定的点，在其中构造平滑的曲线，这也让图形的实现有了更多的可能性。而且，贝塞尔曲线还可以用来构建 Catmull–Rom 曲线。Catmull–Rom 曲线也是一种常用的曲线，它可以平滑折线，我们在数据统计图表中经常会用到它。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5b2210205414f03b053884e098963bb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<h2 id="四-多边形" tabindex="-1"><a class="header-anchor" href="#四-多边形" aria-hidden="true">#</a> 四，多边形</h2>
<p>在图形系统中，我们最终看到的丰富多彩的图像，都是由多边形构成的。换句话说，不论是 2D 图形还是 3D 图形，经过投影变换后，在屏幕上输出的都是多边形。</p>
<h3 id="_1-图形学中多边形的定义" tabindex="-1"><a class="header-anchor" href="#_1-图形学中多边形的定义" aria-hidden="true">#</a> 1.图形学中多边形的定义</h3>
<p>多边形可以定义为由三条或三条以上的线段首尾连接构成的平面图形，其中，每条线段的端点就是多边形的顶点，线段就是多边形的边。</p>
<p>多边形又可以分为<strong>简单多边</strong>形和<strong>复杂多边形</strong></p>
<p>如果一个多边形的每条边除了相邻的边以外，不和其他边相交，那它就是简单多边形，否则就是复杂多边形。</p>
<p>而简单多边形又分为凸多边形和凹多边形，我们主要是看简单多边形的内角来区分的。如果一个多边形中的每个内角都不超过 180°，那它就是凸多边形，否则就是凹多边形。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91d30c5b7033428c89bcb4f923eed75e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<h3 id="_2-多边形的填充和边界判定" tabindex="-1"><a class="header-anchor" href="#_2-多边形的填充和边界判定" aria-hidden="true">#</a> 2.多边形的填充和边界判定</h3>
<p>在图形系统中绘制多边形的时候，最常用的功能是填充多边形，也就是用一种颜色将多边形的内部填满。</p>
<p>除此之外，在可视化中用户经常要用鼠标与多边形进行交互，这就要涉及多边形的边界判定。</p>
<h3 id="_3-不同的图形系统如何填充多边形" tabindex="-1"><a class="header-anchor" href="#_3-不同的图形系统如何填充多边形" aria-hidden="true">#</a> 3.不同的图形系统如何填充多边形</h3>
<p>不同的图形系统会用不同的方法来填充多边形。比如说，在 SVG 和 Canvas2D 中，就都内置了填充多边形的 API。在 SVG 中，我们可以直接给元素设置 fill 属性来填充，那在 Canvas2D 中，我们可以在绘图指令结束时调用 fill() 方法进行填充。</p>
<p>而在 <code>WebGL</code> 中，我们是用三角形图元来快速填充的。</p>
<h4 id="_1-canvas2d-填充多边形" tabindex="-1"><a class="header-anchor" href="#_1-canvas2d-填充多边形" aria-hidden="true">#</a> [1]Canvas2D 填充多边形</h4>
<p>Canvas2D 填充多边形可以总结为五步</p>
<p>第一步，构建多边形的顶点。这里我们直接构造 5 个顶点</p>
<h4 id="_2-webgl-填充多边形" tabindex="-1"><a class="header-anchor" href="#_2-webgl-填充多边形" aria-hidden="true">#</a> [2]WebGL 填充多边形</h4>
<p>在 WebGL 中，虽然没有提供自动填充多边形的方法，但是我们可以用三角形这种基本图元来快速地填充多边形。因此，在 WebGL 中填充多边形的第一步，就是将多边形分割成多个三角形。</p>
<p>这种将多边形分割成若干个三角形的操作，在图形学中叫做<strong>三角剖分（Triangulation）</strong></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d476be17499847b89e8e3451b1c9d5cd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<p>对简单多边形尤其是凸多边形的三角剖分比较简单，而复杂多边形由于有边的相交和面积重叠区域，所以相对困难许多，因为那些算法会比较复杂涉及很多图形学的底层数学知识</p>
<p>这里，我们就直接利用 <code>GitHub</code> 上的一些成熟的库（常用的如<code>Earcut</code>、<code>Tess2.js</code>以及<code>cdt2d</code>），来对多边形进行三角剖分就可以了。</p>
<p>例如利用<code>Earcut</code>库来进行三角剖分</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b72ae135192c426ebcf58cb45899d70a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//上图的顶点数据</span>
<span class="token keyword">const</span> vertices <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">0.7</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">0.4</span><span class="token punctuation">,</span> <span class="token number">0.3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">0.25</span><span class="token punctuation">,</span> <span class="token number">0.71</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">0.1</span><span class="token punctuation">,</span> <span class="token number">0.56</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">0.1</span><span class="token punctuation">,</span> <span class="token number">0.13</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token number">0.4</span><span class="token punctuation">,</span> <span class="token number">0.21</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.6</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">0.3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">0.6</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">0.45</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>首先，我们要对它进行三角剖分。使用 <code>Earcut</code> 库的操作很简单，我们直接调用它的 <code>API</code> 就可以完成对多边形的三角剖分，具体代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>earcut<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../common/lib/earcut.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> points <span class="token operator">=</span> vertices<span class="token punctuation">.</span><span class="token function">flat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> triangles <span class="token operator">=</span> <span class="token function">earcut</span><span class="token punctuation">(</span>points<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>因为 Earcut 库只接受扁平化的定点数据，所以我们先用了数组的 flat 方法将顶点扁平化，然后将它传给 Earcut 进行三角剖分。这样返回的结果是一个数组，这个数组的值是顶点数据的 index，结果如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这里的值，比如 1 表示 vertices 中下标为 1 的顶点，即点 (-0.4, 0.3)，每三个值可以构成一个三角形，所以 1、0、9 表示由 (-0.4, 0.3)、(-0.7, 0.5) 和 (-0.45, 0.0) 构成的三角形。</p>
<p>然后，我们将顶点和 <code>index</code> 下标数据都输入到缓冲区，通过 <code>gl.drawElements</code> 方法就可以把图形显示出来。具体的代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> position <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span>points<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> cells <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint16Array</span><span class="token punctuation">(</span>triangles<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//将数据存到缓存区</span>
<span class="token keyword">const</span> pointBuffer <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">createBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gl<span class="token punctuation">.</span><span class="token function">bindBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ARRAY_BUFFER</span><span class="token punctuation">,</span> pointBuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
gl<span class="token punctuation">.</span><span class="token function">bufferData</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ARRAY_BUFFER</span><span class="token punctuation">,</span> position<span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">STATIC_DRAW</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//从缓存区中读取数据</span>
<span class="token keyword">const</span> vPosition <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">getAttribLocation</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> <span class="token string">'position'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gl<span class="token punctuation">.</span><span class="token function">vertexAttribPointer</span><span class="token punctuation">(</span>vPosition<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gl<span class="token punctuation">.</span><span class="token function">enableVertexAttribArray</span><span class="token punctuation">(</span>vPosition<span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token keyword">const</span> cellsBuffer <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">createBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gl<span class="token punctuation">.</span><span class="token function">bindBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ELEMENT_ARRAY_BUFFER</span><span class="token punctuation">,</span> cellsBuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
gl<span class="token punctuation">.</span><span class="token function">bufferData</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ELEMENT_ARRAY_BUFFER</span><span class="token punctuation">,</span> cells<span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">STATIC_DRAW</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


gl<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">COLOR_BUFFER_BIT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gl<span class="token punctuation">.</span><span class="token function">drawElements</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">TRIANGLES</span><span class="token punctuation">,</span> cells<span class="token punctuation">.</span>length<span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">UNSIGNED_SHORT</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>被剖分为了8个三角形</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65850d751a844f58b6fde9f1bb109cc1~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220504103852714"></p>
<p>实际上，WebGL 是对这个多边形三角剖分后的每个三角形分别进行填充的</p>
<p>上面为2D 图形的三角剖分。那针对 3D 模型，WebGL 在绘制的时候，也需要使用三角剖分，而 3D 的三角剖分又被称为网格化（Meshing）。</p>
<p>不过，因为 3D 模型比 2D 模型更加复杂，顶点的数量更多，所以针对复杂的 3D 模型，我们一般不在运行的时候进行三角剖分，而是通过设计工具把图形的三角剖分结果直接导出进行使用。也就是说，在 3D 渲染的时候，我们一般使用的模型数据都是已经经过三角剖分以后的顶点数据。</p>
<blockquote>
<p>总的来说，无论是绘制 2D 还是 3D 图形，WebGL 都需要先把它们进行三角剖分，然后才能绘制。因此，三角剖分是 WebGL 绘图的基础。</p>
</blockquote>
<h3 id="_4-不同图形系统判断点在多边形内部" tabindex="-1"><a class="header-anchor" href="#_4-不同图形系统判断点在多边形内部" aria-hidden="true">#</a> 4.不同图形系统判断点在多边形内部</h3>
<p>Canvas和SVG图形系统都是自带有判断的api的</p>
<h4 id="_1-canvas2d判断点在多边形内部" tabindex="-1"><a class="header-anchor" href="#_1-canvas2d判断点在多边形内部" aria-hidden="true">#</a> [1]Canvas2D判断点在多边形内部</h4>
<p>首先，先用 Canvas2D 来绘制并填充这个多边形</p>
<p>然后，我们在 canvas 上添加 mousemove 事件，在事件中计算鼠标相对于 canvas 的位置，再将这个位置传给 isPointInPath 方法，isPointInPath 方法就会自动判断这个位置是否位于图形内部。代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>left<span class="token punctuation">,</span> top<span class="token punctuation">}</span> <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

canvas<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mousemove'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">evt</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>x<span class="token punctuation">,</span> y<span class="token punctuation">}</span> <span class="token operator">=</span> evt<span class="token punctuation">;</span>
  <span class="token comment">// 坐标转换</span>
  <span class="token keyword">const</span> offsetX <span class="token operator">=</span> x <span class="token operator">-</span> left<span class="token punctuation">;</span>
  <span class="token keyword">const</span> offsetY <span class="token operator">=</span> y <span class="token operator">-</span> top<span class="token punctuation">;</span>

  ctx<span class="token punctuation">.</span><span class="token function">clearRect</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">256</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">256</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">isPointInPath</span><span class="token punctuation">(</span>offsetX<span class="token punctuation">,</span> offsetY<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">draw</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> poitions<span class="token punctuation">,</span> <span class="token string">'transparent'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">draw</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> poitions<span class="token punctuation">,</span> <span class="token string">'transparent'</span><span class="token punctuation">,</span> <span class="token string">'red'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d68a266ef534a71817d5490bc8d45a7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<h2 id="五-矩阵" tabindex="-1"><a class="header-anchor" href="#五-矩阵" aria-hidden="true">#</a> 五，矩阵</h2>
<p>在实际绘制的时候，我们经常需要在画布上绘制许多轮廓相同的图形，难道这也需要我们重复地去计算每个图形的顶点吗？当然不需要。我们只需要创建一个基本的几何轮廓，然后通过线性/非线性变换来改变几何图形的位置、形状、大小和角度。</p>
<h3 id="_1-线性变换" tabindex="-1"><a class="header-anchor" href="#_1-线性变换" aria-hidden="true">#</a> 1.线性变换</h3>
<h4 id="_1-几何直观理解" tabindex="-1"><a class="header-anchor" href="#_1-几何直观理解" aria-hidden="true">#</a> [1]几何直观理解</h4>
<p>变换本质是“函数”的一种花哨的说法，它介绍内容，并输出对应的结果。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd66fa3016ee4e138daa1af173520f85~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430102957056"></p>
<blockquote>
<p>变换和函数又有所不同，因为使用变换是在以特定的方式来可视化这一输入——输出的关系</p>
<p>一种理解“向量函数”的方法是使用运动</p>
</blockquote>
<p>例如一个变换接收一个向量并输出一个向量，我们可以想象这个输入向量移动到输出向量的位置</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5773ab551509440eb142a97897fd443b~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430103406207"></p>
<p>线性代数限制在一种特殊类型的变换上，称为“线性变换”，这种变换更容易理解</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b70190960a1b46449b4c9c81ccecff37~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430103648763"></p>
<p>直观的说，如果变换具有以下两条性质，我们便可以称他说线性的</p>
<blockquote>
<ol>
<li>直线在变换后仍然为直线，不能有所弯曲</li>
<li>原点必须保持固定</li>
</ol>
</blockquote>
<p>示例：</p>
<p>保持网格平行且等距分布的变换</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9792818896e04d33b3f42726282dff29~tplv-k3u1fbpfcp-zoom-1.image" alt="a"></p>
<p>根据原点旋转</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f947b866edc7468da81ca6b8a60c7026~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>更多详见线性代数的本质文章</p>
</blockquote>
<h4 id="_2-常见的线性变换" tabindex="-1"><a class="header-anchor" href="#_2-常见的线性变换" aria-hidden="true">#</a> [2]常见的线性变换</h4>
<h5 id="旋转变换" tabindex="-1"><a class="header-anchor" href="#旋转变换" aria-hidden="true">#</a> 旋转变换</h5>
<p><strong>几何理解：</strong></p>
<p>例如将整个空间逆时针旋转90度，那么<code>i帽</code>便落在坐标<code>（0，1）</code>上，<code>j帽</code>落在坐标<code>（-1，0）</code>上，</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14f6934f1d344a19b7e76a3cb50b8015~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430112007200"></p>
<p>如果想计算出任意向量在逆时针旋转90度后的位置，只需要把他和上面矩阵相乘即可</p>
<p>之前画树的旋转代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vector2D</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>  
  <span class="token function">rotate</span><span class="token punctuation">(</span><span class="token parameter">rad</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> c <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>rad<span class="token punctuation">)</span><span class="token punctuation">,</span>
      s <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>rad<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x <span class="token operator">*</span> c <span class="token operator">+</span> y <span class="token operator">*</span> <span class="token operator">-</span>s<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> x <span class="token operator">*</span> s <span class="token operator">+</span> y <span class="token operator">*</span> c<span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a03d914c7ea4be7bfcc16e6412009ed~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<p>假设向量 <code>P</code> 的长度为 <code>r</code>，角度是<code>⍺</code>，现在我们要将它逆时针旋转<code>⍬</code>角，此时新的向量<code>P’</code>的参数方程为：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db89f9179c72430e8fdbe0a565cc2ece~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<p>然后，因为 <code>rcos⍺</code>、<code>rsin⍺</code>是向量 <code>P</code> 原始的坐标 <code>x0</code>、<code>y0</code>，所以，我们可以把坐标代入到上面的公式中，就会得到如下的公式：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11a044f6f3d94357a0ec2217e2da6fd4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<p>最后，我们再将它写成矩阵形式，就会得到一个旋转矩阵。（同时可以利用几何意义来理解：脑补）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc5291c37bd24bec834f844b2358d5ae~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220504111937100"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed6b68a590884254865bfe5342762dc7~tplv-k3u1fbpfcp-zoom-1.image" alt="a-16512881750802"></p>
<h5 id="缩放变换" tabindex="-1"><a class="header-anchor" href="#缩放变换" aria-hidden="true">#</a> 缩放变换</h5>
<p>在几何意义中便是数乘（脑补）</p>
<p>缩放变换。缩放变换也很简单，我们可以直接让向量与标量（<code>标量</code>只有大小、没有方向）相乘。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a55cca2636c49bcb2abe39208d4352e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<p>几何理解</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dab56a7013bd4156ab143ca182387714~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220504112429227"></p>
<p>对于得到的这个公式，我们也可以把它写成矩阵形式。结果如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6357c21ddeb4441b986ab192930b07f7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<blockquote>
<p>旋转和缩放都可以写成矩阵与向量相乘的形式。这种能写成矩阵与向量相乘形式的变换，就叫做线性变换。</p>
</blockquote>
<p>线性变换除了可以满足仿射变换的 2 个性质之外，还有 2 个额外的性质：</p>
<blockquote>
<ul>
<li>
<p>线性变换不改变坐标原点（因为如果 x0、y0等于零，那么 x、y 肯定等于 0）</p>
</li>
<li>
<p>线性变换可以叠加，多个线性变换的叠加结果就是将线性变换的矩阵依次相乘，再与原始向量相乘</p>
</li>
</ul>
</blockquote>
<p>那根据线性变换的第 2 条性质，我们就能总结出一个通用的线性变换公式，即一个原始向量 P0经过 M1、M2、…Mn 次的线性变换之后得到最终的坐标 P。线性变化的叠加是一个非常重要的性质，它是我们对图形进行变换的基础，所以你一定要牢记线性变化的叠加性质。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c47fb802fa2541488d3979af39a7af29~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<h3 id="_2-非线性变换" tabindex="-1"><a class="header-anchor" href="#_2-非线性变换" aria-hidden="true">#</a> 2.非线性变换</h3>
<h4 id="_1-几何直观理解-1" tabindex="-1"><a class="header-anchor" href="#_1-几何直观理解-1" aria-hidden="true">#</a> [1]几何直观理解</h4>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7884c42e2c543049ae19cbe54ea819e~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>直线弯曲了，不是线性变换</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6040ae187d25492caa62ce6bc6a9eca7~tplv-k3u1fbpfcp-zoom-1.image" alt="a"></p>
<blockquote>
<p>这也不是线性变换，因为它的原点发送变化了，这也叫<strong>仿射变换</strong></p>
</blockquote>
<h4 id="_2-仿射变换" tabindex="-1"><a class="header-anchor" href="#_2-仿射变换" aria-hidden="true">#</a> [2]仿射变换</h4>
<p>仿射变换是拓扑学和图形学中一个非常重要的基础概念。利用它，我们才能在可视化应用中快速绘制出形态、位置、大小各异的众多几何图形，所以需要重点学习。</p>
<p>仿射变换简单来说就是“线性变换 + 平移”</p>
<h5 id="仿射变换的性质" tabindex="-1"><a class="header-anchor" href="#仿射变换的性质" aria-hidden="true">#</a> 仿射变换的性质</h5>
<ul>
<li>仿射变换前是直线段的，仿射变换后依然是直线段</li>
<li>对两条直线段 a 和 b 应用同样的仿射变换，变换前后线段长度比例保持不变</li>
</ul>
<p>常见的仿射变换形式包括平移、旋转、缩放以及它们的组合。</p>
<h5 id="向量的平移" tabindex="-1"><a class="header-anchor" href="#向量的平移" aria-hidden="true">#</a> 向量的平移</h5>
<p>其中，平移变换是最简单的仿射变换。如果我们想让向量 <code>P(x0, y0)</code> 沿着向量 <code>Q(x1, y1)</code> 平移，只要将 <code>P</code> 和 <code>Q</code> 相加就可以了。（也就是向量加法）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f5d363fd9be4a36821f35e8cc31698f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<blockquote>
<p>平移后向量<code>p</code>的坐标</p>
</blockquote>
<h5 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h5>
<blockquote>
<p>总的来说，向量的基本仿射变换分为平移、旋转与缩放，其中旋转与缩放属于线性变换，而平移不属于线性变换</p>
<p>基于此，我们可以得到仿射变换的一般表达式，如下图所示：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b6c97a4948d43c687419a94b6a1c2a7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
</blockquote>
<h4 id="_3-仿射变换的公式优化" tabindex="-1"><a class="header-anchor" href="#_3-仿射变换的公式优化" aria-hidden="true">#</a> [3]仿射变换的公式优化</h4>
<p>上面这个公式我们还可以改写成矩阵的形式，在改写的公式里，我们实际上是给线性空间增加了一个维度。换句话说，我们用高维度的线性变换表示了低维度的仿射变换！</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e61630284a2a478e8510945748639582~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<blockquote>
<p>这样，我们就将原本 n 维的坐标转换为了 n+1 维的坐标。这种 n+1 维坐标被称为齐次坐标，对应的矩阵就被称为齐次矩阵。</p>
</blockquote>
<p><strong>齐次坐标和齐次矩阵是可视化中非常常用的数学工具，它能让我们用线性变换来表示仿射变换。</strong></p>
<p>这样一来，我们就能利用线性变换的叠加性质，来非常方便地进行各种复杂的仿射变换了。落实到共识上，就是把这些变换的矩阵相乘得到一个新的矩阵，再把它乘以原向量。我们在绘制几何图形的时候会经常用到它，所以你要记住这个公式。</p>
<h4 id="_4-仿射变换应用举例-实现粒子动画" tabindex="-1"><a class="header-anchor" href="#_4-仿射变换应用举例-实现粒子动画" aria-hidden="true">#</a> [4]仿射变换应用举例：实现粒子动画</h4>
<p>在粒子动画的实现过程中，我们通常需要在界面上快速改变一大批图形的大小、形状和位置，所以用图形的仿射变换来实现是一个很好的方法。</p>
<h5 id="创建三角形" tabindex="-1"><a class="header-anchor" href="#创建三角形" aria-hidden="true">#</a> 创建三角形</h5>
<p>创建三角形一共可以分为两步，第一步，我们定义三角形的顶点并将数据送到缓冲区</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> position <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//将点数据推到缓存区</span>
<span class="token keyword">const</span> bufferId <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">createBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gl<span class="token punctuation">.</span><span class="token function">bindBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ARRAY_BUFFER</span><span class="token punctuation">,</span> bufferId<span class="token punctuation">)</span><span class="token punctuation">;</span>
gl<span class="token punctuation">.</span><span class="token function">bufferData</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ARRAY_BUFFER</span><span class="token punctuation">,</span> position<span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">STATIC_DRAW</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//缓存区数据读取到GPU</span>
<span class="token keyword">const</span> vPosition <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">getAttribLocation</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> <span class="token string">'position'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gl<span class="token punctuation">.</span><span class="token function">vertexAttribPointer</span><span class="token punctuation">(</span>vPosition<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gl<span class="token punctuation">.</span><span class="token function">enableVertexAttribArray</span><span class="token punctuation">(</span>vPosition<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>第二步，我们实现一个创建随机三角形属性的函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">randomTriangles</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> u_color <span class="token operator">=</span> <span class="token punctuation">[</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 随机颜色</span>
  <span class="token keyword">const</span> u_rotation <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">;</span> <span class="token comment">// 初始旋转角度</span>
  <span class="token keyword">const</span> u_scale <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.05</span> <span class="token operator">+</span> <span class="token number">0.03</span><span class="token punctuation">;</span> <span class="token comment">// 初始大小</span>
  <span class="token keyword">const</span> u_time <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> u_duration <span class="token operator">=</span> <span class="token number">3.0</span><span class="token punctuation">;</span> <span class="token comment">// 持续3秒钟</span>

  <span class="token keyword">const</span> rad <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> u_dir <span class="token operator">=</span> <span class="token punctuation">[</span>Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>rad<span class="token punctuation">)</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>rad<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 运动方向</span>
  <span class="token keyword">const</span> startTime <span class="token operator">=</span> performance<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>u_color<span class="token punctuation">,</span> u_rotation<span class="token punctuation">,</span> u_scale<span class="token punctuation">,</span> u_time<span class="token punctuation">,</span> u_duration<span class="token punctuation">,</span> u_dir<span class="token punctuation">,</span> startTime<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><blockquote>
<p>其中的参数包括颜色 <code>u_color</code>、初始旋转角度 <code>u_rotation</code>、初始大小 <code>u_scale</code>、初始时间 <code>u_time</code>、动画持续时间 <code>u_diration</code>、运动方向 <code>u_dir</code> 和创建时间 <code>startTime</code>。除了 <code>startTime</code> 之外的数据，我们都需要传给 <code>shader</code> 去处理。</p>
</blockquote>
<h5 id="设置-uniform-变量" tabindex="-1"><a class="header-anchor" href="#设置-uniform-变量" aria-hidden="true">#</a> 设置 uniform 变量</h5>
<p><code>attribute</code> 变量是对应于顶点的。也就是说，几何图形有几个顶点就要提供几份 attribute 数据。并且，attribute 变量只能在顶点着色器中使用，如果要在片元着色器中使用，需要我们通过 varying 变量将它传给片元着色器才行</p>
<p>而 uniform 声明的变量不同，uniform 声明的变量和其他语言中的常量一样，我们赋给 uniform 变量的值在 shader 执行的过程中不可改变。而且一个变量的值是唯一的，不随顶点变化。uniform 变量既可以在顶点着色器中使用，也可以在片元着色器中使用。</p>
<p>在 WebGL 中，我们可以通过 gl.uniformXXX(loc, u_color); 的方法将数据传给 shader 的 uniform 变量。其中，XXX 是我们随着数据类型不同取得不同的名字。</p>
<p>gl.uniform1f 传入一个浮点数，对应的 uniform 变量的类型为 float</p>
<p>gl.uniform4f 传入四个浮点数，对应的 uniform 变量类型为 float[4]</p>
<p>gl.uniform3fv 传入一个三维向量，对应的 uniform 变量类型为 vec3</p>
<p>gl.uniformMatrix4fv 传入一个 4x4 的矩阵，对应的 uniform 变量类型为 mat4</p>
<p>接下来将随机三角形信息传给shader里的uniform变量</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">setUniforms</span><span class="token punctuation">(</span><span class="token parameter">gl<span class="token punctuation">,</span> <span class="token punctuation">{</span>u_color<span class="token punctuation">,</span> u_rotation<span class="token punctuation">,</span> u_scale<span class="token punctuation">,</span> u_time<span class="token punctuation">,</span> u_duration<span class="token punctuation">,</span> u_dir<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// gl.getUniformLocation 拿到uniform变量的指针</span>
  <span class="token keyword">let</span> loc <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">getUniformLocation</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> <span class="token string">'u_color'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 将数据传给 unfirom 变量的地址</span>
  gl<span class="token punctuation">.</span><span class="token function">uniform4fv</span><span class="token punctuation">(</span>loc<span class="token punctuation">,</span> u_color<span class="token punctuation">)</span><span class="token punctuation">;</span>

  loc <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">getUniformLocation</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> <span class="token string">'u_rotation'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">uniform1f</span><span class="token punctuation">(</span>loc<span class="token punctuation">,</span> u_rotation<span class="token punctuation">)</span><span class="token punctuation">;</span>

  loc <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">getUniformLocation</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> <span class="token string">'u_scale'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">uniform1f</span><span class="token punctuation">(</span>loc<span class="token punctuation">,</span> u_scale<span class="token punctuation">)</span><span class="token punctuation">;</span>

  loc <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">getUniformLocation</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> <span class="token string">'u_time'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">uniform1f</span><span class="token punctuation">(</span>loc<span class="token punctuation">,</span> u_time<span class="token punctuation">)</span><span class="token punctuation">;</span>

  loc <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">getUniformLocation</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> <span class="token string">'u_duration'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">uniform1f</span><span class="token punctuation">(</span>loc<span class="token punctuation">,</span> u_duration<span class="token punctuation">)</span><span class="token punctuation">;</span>

  loc <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">getUniformLocation</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> <span class="token string">'u_dir'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">uniform2fv</span><span class="token punctuation">(</span>loc<span class="token punctuation">,</span> u_dir<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h5 id="用requestanimationframe实现动画" tabindex="-1"><a class="header-anchor" href="#用requestanimationframe实现动画" aria-hidden="true">#</a> 用requestAnimationFrame实现动画</h5>
<p>然后，我们使用 <code>requestAnimationFrame</code> 实现动画。具体的方法就是，我们在 <code>update</code> 方法中每次新建数个随机三角形，然后依次修改所有三角形的 <code>u_time</code> 属性，通过 <code>setUniforms</code> 方法将修改的属性更新到 shader 变量中。这样，我们就可以在 shader 中读取变量的值进行处理了。代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> triangles <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    triangles<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">randomTriangles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  gl<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">COLOR_BUFFER_BIT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 对每个三角形重新设置u_time</span>
  triangles<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">triangle</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    triangle<span class="token punctuation">.</span>u_time <span class="token operator">=</span> <span class="token punctuation">(</span>performance<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> triangle<span class="token punctuation">.</span>startTime<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">;</span>
    <span class="token function">setUniforms</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> triangle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    gl<span class="token punctuation">.</span><span class="token function">drawArrays</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">TRIANGLES</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> position<span class="token punctuation">.</span>length <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 移除已经结束动画的三角形</span>
  triangles <span class="token operator">=</span> triangles<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">triangle</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> triangle<span class="token punctuation">.</span>u_time <span class="token operator">&lt;=</span> triangle<span class="token punctuation">.</span>u_duration<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>update<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>update<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>我们再回过头来看最终要实现的效果。你会发现，所有的三角形，都是由小变大朝着特定的方向旋转。那想要实现这个效果，我们就需要用到前面讲过的仿射变换，在顶点着色器中进行矩阵运算。</p>
<p>在这一步中，顶点着色器中的 glsl 代码最关键</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>attribute vec2 position<span class="token punctuation">;</span>

uniform float u_rotation<span class="token punctuation">;</span>
uniform float u_time<span class="token punctuation">;</span>
uniform float u_duration<span class="token punctuation">;</span>
uniform float u_scale<span class="token punctuation">;</span>
uniform vec2 u_dir<span class="token punctuation">;</span>

varying float vP<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  float p <span class="token operator">=</span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> u_time <span class="token operator">/</span> u_duration<span class="token punctuation">)</span><span class="token punctuation">;</span>
  float rad <span class="token operator">=</span> u_rotation <span class="token operator">+</span> <span class="token number">3.14</span> <span class="token operator">*</span> <span class="token number">10.0</span> <span class="token operator">*</span> p<span class="token punctuation">;</span>
  float scale <span class="token operator">=</span> u_scale <span class="token operator">*</span> p <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">2.0</span> <span class="token operator">-</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span>
  vec2 offset <span class="token operator">=</span> <span class="token number">2.0</span> <span class="token operator">*</span> u_dir <span class="token operator">*</span> p <span class="token operator">*</span> p<span class="token punctuation">;</span>
  mat3 translateMatrix <span class="token operator">=</span> <span class="token function">mat3</span><span class="token punctuation">(</span>
    <span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span>
    <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span>
    offset<span class="token punctuation">.</span>x<span class="token punctuation">,</span> offset<span class="token punctuation">.</span>y<span class="token punctuation">,</span> <span class="token number">1.0</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  mat3 rotateMatrix <span class="token operator">=</span> <span class="token function">mat3</span><span class="token punctuation">(</span>
    <span class="token function">cos</span><span class="token punctuation">(</span>rad<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">sin</span><span class="token punctuation">(</span>rad<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span>
    <span class="token operator">-</span><span class="token function">sin</span><span class="token punctuation">(</span>rad<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cos</span><span class="token punctuation">(</span>rad<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span>
    <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">1.0</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  mat3 scaleMatrix <span class="token operator">=</span> <span class="token function">mat3</span><span class="token punctuation">(</span>
    scale<span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span>
    <span class="token number">0.0</span><span class="token punctuation">,</span> scale<span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span>
    <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">1.0</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl_PointSize <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span>
  vec3 pos <span class="token operator">=</span> translateMatrix <span class="token operator">*</span> rotateMatrix <span class="token operator">*</span> scaleMatrix <span class="token operator">*</span> <span class="token function">vec3</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl_Position <span class="token operator">=</span> <span class="token function">vec4</span><span class="token punctuation">(</span>pos<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  vP <span class="token operator">=</span> p<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><blockquote>
<p>我们定义的 p 是当前动画进度，它的值是 u_time / u_duration，取值区间从 0 到 1。rad 是旋转角度，它的值是初始角度 u_rotation 加上 10π，表示在动画过程中它会绕自身旋转 5 周</p>
<p>其次，scale 是缩放比例，它的值是初始缩放比例乘以一个系数，这个系数是 p * (2.0 - p)，在我们后面讨论动画的时候你会知道，p * (2.0 - p) 是一个缓动函数，在这里我们只需要知道，它的作用是让 scale 的变化量随着时间推移逐渐减小就可以了。</p>
<p>最后，offset 是一个二维向量，它是初始值 u_dir 与 2.0 * p * p 的乘积，因为 u_dir 是个单位向量，这里的 2.0 表示它的最大移动距离为 2，p * p 也是一个缓动函数，作用是让位移的变化量随着时间增加而增大</p>
<p>定义完这些参数以后，我们得到三个齐次矩阵：translateMatrix 是偏移矩阵，rotateMatrix 是旋转矩阵，scaleMatrix 是缩放矩阵。我们将 pos 的值设置为这三个矩阵与 position 的乘积，这样就完成对顶点的线性变换，呈现出来的效果也就是三角形会向着特定的方向旋转、移动和缩放。</p>
</blockquote>
<h5 id="在片元着色器中着色" tabindex="-1"><a class="header-anchor" href="#在片元着色器中着色" aria-hidden="true">#</a> 在片元着色器中着色</h5>
<p>最后，我们在片元着色器中对这些三角形着色。我们将p也就是动画进度，从顶点着色器通过变量varying vP传给片元着色器，然后在片元着色器中让alpha值随着vP值变化，这样就能同时实现粒子的淡出效果了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> precision mediump float<span class="token punctuation">;</span>
  uniform vec4 u_color<span class="token punctuation">;</span>
  varying float vP<span class="token punctuation">;</span>

  <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    gl_FragColor<span class="token punctuation">.</span>xyz <span class="token operator">=</span> u_color<span class="token punctuation">.</span>xyz<span class="token punctuation">;</span>
    gl_FragColor<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1.0</span> <span class="token operator">-</span> vP<span class="token punctuation">)</span> <span class="token operator">*</span> u_color<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_5-css-的仿射变换" tabindex="-1"><a class="header-anchor" href="#_5-css-的仿射变换" aria-hidden="true">#</a> [5]CSS 的仿射变换</h4>
<p>CSS 中的 transform 是一个很强大的属性，它的作用其实也是对元素进行仿射变换。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考：</h2>
<p>https://time.geekbang.org/column/intro/100053801?tab=catalog</p>
<p>https://www.3blue1brown.com/</p>
<p>https://www.bilibili.com/video/av6731067/?p=4</p>
<p>https://www.bilibili.com/video/BV1ib411t7YR?spm_id_from=333.337.search-card.all.click</p>
</template>
