<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-创建光线投射器">[1]创建光线投射器</RouterLink></li><li><RouterLink to="#_2-相交检测方法">[2]相交检测方法</RouterLink></li><li><RouterLink to="#_3-对每一帧进行测试">[3]对每一帧进行测试</RouterLink></li><li><RouterLink to="#_4-通过鼠标使用光线投射器">[4]通过鼠标使用光线投射器</RouterLink><ul><li><RouterLink to="#鼠标悬停">鼠标悬停</RouterLink></li><li><RouterLink to="#鼠标进入和鼠标离开事件">鼠标进入和鼠标离开事件</RouterLink></li><li><RouterLink to="#鼠标点击">鼠标点击</RouterLink></li></ul></li></ul></nav>
<p>顾名思义，光线投射器(也算叫光线追踪吧）可以向特定方向投射（或发射）光线并测试哪些物体与其相交
光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。
你可以使用该技术来检测玩家前面是否有一堵墙，测试激光枪是否击中了某物，测试当前是否有某物位于鼠标下方以模拟鼠标事件，以及许多其他事情。</p>
<blockquote>
<p>此文章为threejs-journey课程学习笔记</p>
</blockquote>
<h2 id="_1-创建光线投射器" tabindex="-1"><a class="header-anchor" href="#_1-创建光线投射器" aria-hidden="true">#</a> [1]创建光线投射器</h2>
<p>创建光线投射 Raycaster
我们沿着 x 轴，创建 3 个球体，从最左边发射一个射线，沿着 x 轴指向右侧</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Objects
 */</span>
<span class="token keyword">const</span> object1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>SphereGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshBasicMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#B71C1C'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
object1<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">setX</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> object2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>SphereGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshBasicMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#B71C1C'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token keyword">const</span> object3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>SphereGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshBasicMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#B71C1C'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
object3<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">setX</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>

scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>object1<span class="token punctuation">,</span> object2<span class="token punctuation">,</span> object3<span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * Raycaster
 */</span>
<span class="token keyword">const</span> raycaster <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Raycaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> rayOrigin <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector3</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> rayDirections <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector3</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
rayDirections<span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
raycaster<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>rayOrigin<span class="token punctuation">,</span> rayDirections<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p><a href="https://threejs.org/docs/index.html?q=Raycaster#api/zh/core/Raycaster" target="_blank" rel="noopener noreferrer">Raycaster 类</a>：
<code>Raycaster( origin : Vector3, direction : Vector3, near : Float, far : Float )</code></p>
<ul>
<li><code>origin</code> —— 光线投射的原点向量。</li>
<li><code>direction</code> —— 向射线提供方向的方向向量，应当被标准化。</li>
<li><code>near</code> —— 返回的所有结果比near远。near不能为负值，其默认值为0。</li>
<li><code>far</code> —— 返回的所有结果都比far近。far不能小于near，其默认值为Infinity（正无穷。）</li>
</ul>
<p>set 方法：
<code>.set ( origin : Vector3, direction : Vector3 ) : undefined</code></p>
<ul>
<li><code>origin</code> —— 光线投射的原点向量。</li>
<li><code>direction</code> —— 为光线提供方向的标准化方向向量。</li>
</ul>
<p>为了便于观察这个射线，我们使用 arrowHelper 可视化这个射线：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// scene.add(axesHelper)</span>
<span class="token keyword">const</span> arrowHelper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>ArrowHelper</span><span class="token punctuation">(</span>
    raycaster<span class="token punctuation">.</span>ray<span class="token punctuation">.</span>direction<span class="token punctuation">,</span>
    raycaster<span class="token punctuation">.</span>ray<span class="token punctuation">.</span>origin<span class="token punctuation">,</span>
    <span class="token number">15</span><span class="token punctuation">,</span>
    <span class="token number">0xff0000</span><span class="token punctuation">,</span>
    <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token number">0.5</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>arrowHelper<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/e602144e65d2059e158c7935f58a53cc.png#averageHue=#020000&amp;clientId=u0ece2a17-5dff-4&amp;from=paste&amp;height=780&amp;id=ueb8b5317&amp;originHeight=975&amp;originWidth=1522&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=12544&amp;status=done&amp;style=none&amp;taskId=ud9eff688-751b-47a2-ad73-3e50abf3e3a&amp;title=&amp;width=1217.6" alt="image.png"></p>
<h2 id="_2-相交检测方法" tabindex="-1"><a class="header-anchor" href="#_2-相交检测方法" aria-hidden="true">#</a> [2]相交检测方法</h2>
<p>分为两个：
intersectObject(...)单数）和intersectObjects(...)（复数）
intersectObject(...)将测试一个对象并将intersectObjects(...)测试一组对象：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> intersect <span class="token operator">=</span> raycaster<span class="token punctuation">.</span><span class="token function">intersectObject</span><span class="token punctuation">(</span>object2<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>intersect<span class="token punctuation">)</span>

<span class="token keyword">const</span> intersects <span class="token operator">=</span> raycaster<span class="token punctuation">.</span><span class="token function">intersectObjects</span><span class="token punctuation">(</span><span class="token punctuation">[</span>object1<span class="token punctuation">,</span> object2<span class="token punctuation">,</span> object3<span class="token punctuation">]</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>intersects<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/2cab0e189e6d67fbab9c33fdac97273b.png#averageHue=#fefdfd&amp;clientId=u0ece2a17-5dff-4&amp;from=paste&amp;height=445&amp;id=ufff1505c&amp;originHeight=556&amp;originWidth=1002&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=60568&amp;status=done&amp;style=none&amp;taskId=u74d699d6-f36e-452b-abec-8710254f127&amp;title=&amp;width=801.6" alt="image.png">
返回数组的每一项都包含许多有用的信息：</p>
<ul>
<li>distance：射线原点与碰撞点之间的距离。</li>
<li>face：射线击中几何体的哪个面。</li>
<li>faceIndex：该面的索引。</li>
<li>object：碰撞涉及哪个对象。</li>
<li>point：碰撞在 3D 空间中的精确位置的<a href="https://threejs.org/docs/index.html#api/en/math/Vector3" target="_blank" rel="noopener noreferrer">Vector3 。</a></li>
<li>uv：该几何体中的 UV 坐标。</li>
</ul>
<p>如果你想测试玩家前面是否有一堵墙，你可以测试distance. 如果要更改对象的颜色，可以更新其object材质。如果您想在撞击点上显示爆炸，您可以在该point位置创建爆炸。</p>
<blockquote>
<p>注意：即使您只测试一个对象，交集的结果始终是一个数组。这是因为光线可以多次穿过同一个物体。想象一个甜甜圈。光线将穿过环的第一部分，然后穿过中间的孔，然后再次穿过环的第二部分。</p>
</blockquote>
<p><img src="https://img-blog.csdnimg.cn/img_convert/2a188ced950620b2a41c202c6f07e2c1.png#averageHue=#ded6ce&amp;clientId=u0ece2a17-5dff-4&amp;from=paste&amp;height=641&amp;id=ufef0b508&amp;originHeight=801&amp;originWidth=1651&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=610300&amp;status=done&amp;style=none&amp;taskId=u026c7805-5a4a-4d53-abc2-2ec29ae6680&amp;title=&amp;width=1320.8" alt="image.png"></p>
<h2 id="_3-对每一帧进行测试" tabindex="-1"><a class="header-anchor" href="#_3-对每一帧进行测试" aria-hidden="true">#</a> [3]对每一帧进行测试</h2>
<p>通常需要对每一帧都进行相交测试</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> raycaster <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Raycaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">//这里为了测试，将物体动起来</span>
<span class="token keyword">const</span> clock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Clock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">tick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
<span class="token keyword">const</span> elapsedTime <span class="token operator">=</span> clock<span class="token punctuation">.</span><span class="token function">getElapsedTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// Animate objects</span>
object1<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>elapsedTime <span class="token operator">*</span> <span class="token number">0.3</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.5</span>
object2<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>elapsedTime <span class="token operator">*</span> <span class="token number">0.8</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.5</span>
object3<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>elapsedTime <span class="token operator">*</span> <span class="token number">1.4</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.5</span>

<span class="token keyword">const</span> rayOrigin <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector3</span><span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> rayDirection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector3</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
rayDirection<span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

raycaster<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>rayOrigin<span class="token punctuation">,</span> rayDirection<span class="token punctuation">)</span>

<span class="token keyword">const</span> objectsToTest <span class="token operator">=</span> <span class="token punctuation">[</span>object1<span class="token punctuation">,</span> object2<span class="token punctuation">,</span> object3<span class="token punctuation">]</span>
<span class="token keyword">const</span> intersects <span class="token operator">=</span> raycaster<span class="token punctuation">.</span><span class="token function">intersectObjects</span><span class="token punctuation">(</span>objectsToTest<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>intersects<span class="token punctuation">)</span>
<span class="token comment">//相交测试，相交时改变颜色</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> object <span class="token keyword">of</span> objectsToTest<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
object<span class="token punctuation">.</span>material<span class="token punctuation">.</span>color<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'#ff0000'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> intersect <span class="token keyword">of</span> intersects<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
intersect<span class="token punctuation">.</span>object<span class="token punctuation">.</span>material<span class="token punctuation">.</span>color<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'#0000ff'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h2 id="_4-通过鼠标使用光线投射器" tabindex="-1"><a class="header-anchor" href="#_4-通过鼠标使用光线投射器" aria-hidden="true">#</a> [4]通过鼠标使用光线投射器</h2>
<p>我们也可以使用 raycaster 来检测一个物体是否在鼠标后面。其核心原理就是我们需要发射一个从相机位置到鼠标方向的射线。</p>
<h3 id="鼠标悬停" tabindex="-1"><a class="header-anchor" href="#鼠标悬停" aria-hidden="true">#</a> 鼠标悬停</h3>
<p>首先，我们需要鼠标的坐标。我们不能使用基本的原生 JavaScript 坐标，它以像素为单位。我们需要一个在水平轴和垂直轴上都从 到 的值-1，当鼠标向上移动时，垂直坐标为正。+1
这也就是裁剪空间的坐标值，例如：</p>
<ul>
<li>鼠标位于页面左上角：<code>-1 / 1</code></li>
<li>鼠标位于页面左下角：<code>-1 / - 1</code></li>
<li>鼠标垂直位于中间，水平位于右侧：<code>1 / 0</code></li>
<li>鼠标位于页面中央：<code>0 / 0</code></li>
</ul>
<p>可以直接通过mousemove事件来获取相应的坐标值：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
* Mouse
*/</span>
<span class="token keyword">const</span> mouse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mousemove'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
mouse<span class="token punctuation">.</span>x <span class="token operator">=</span> event<span class="token punctuation">.</span>clientX <span class="token operator">/</span> window<span class="token punctuation">.</span>innerWidth <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">-</span> <span class="token number">1</span>
mouse<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>clientY <span class="token operator">/</span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>mouse<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/4391e0dfaf476c4a9b20ebaa4910facc.png#averageHue=#fdfcfb&amp;clientId=u0ece2a17-5dff-4&amp;from=paste&amp;height=262&amp;id=u2169a75f&amp;originHeight=327&amp;originWidth=976&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=60226&amp;status=done&amp;style=none&amp;taskId=ub283b392-5e52-4180-a4bf-28a22654585&amp;title=&amp;width=780.8" alt="image.png"></p>
<p>我们可以在事件回调中投射光线mousemove，但不建议这样做，因为mousemove事件的触发可能超过某些浏览器的帧速率。而在tick函数中则相反，我们将像之前一样在函数中投射光线。
<code>.setFromCamera ( coords : Vector2, camera : Camera ) : undefined</code>一个坐标从相机方向发射射线</p>
<ul>
<li>coords —— 在标准化设备坐标中鼠标的二维坐标 —— X分量与Y分量应当在-1到1之间。</li>
<li>camera —— 射线所来源的摄像机。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">tick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
<span class="token comment">// ...</span>

raycaster<span class="token punctuation">.</span><span class="token function">setFromCamera</span><span class="token punctuation">(</span>mouse<span class="token punctuation">,</span> camera<span class="token punctuation">)</span>

<span class="token keyword">const</span> objectsToTest <span class="token operator">=</span> <span class="token punctuation">[</span>object1<span class="token punctuation">,</span> object2<span class="token punctuation">,</span> object3<span class="token punctuation">]</span>
<span class="token keyword">const</span> intersects <span class="token operator">=</span> raycaster<span class="token punctuation">.</span><span class="token function">intersectObjects</span><span class="token punctuation">(</span>objectsToTest<span class="token punctuation">)</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> intersect <span class="token keyword">of</span> intersects<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
intersect<span class="token punctuation">.</span>object<span class="token punctuation">.</span>material<span class="token punctuation">.</span>color<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'#0000ff'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> object <span class="token keyword">of</span> objectsToTest<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>intersects<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">intersect</span> <span class="token operator">=></span> intersect<span class="token punctuation">.</span>object <span class="token operator">===</span> object<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
object<span class="token punctuation">.</span>material<span class="token punctuation">.</span>color<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'#ff0000'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>这样就实现了如果光标位于球体上方，则球体应变为蓝色。</p>
<h3 id="鼠标进入和鼠标离开事件" tabindex="-1"><a class="header-anchor" href="#鼠标进入和鼠标离开事件" aria-hidden="true">#</a> 鼠标进入和鼠标离开事件</h3>
<p>鼠标事件比如 mouseenter 和 mouseleave, 目前默认还不能支持，canvas 或 WebGL 也没有直接支持，需要自己手动模拟实现这两个事件
为了模拟mouseenter和mouseleave事件，我们可以使用一个包含当前悬停对象的变量：</p>
<ul>
<li>如果有一个对象相交，但之前没有相交，则表示mouseenter该对象上发生了</li>
<li>如果没有任何对象相交，但之前有过一个，则表示mouseleave发生了</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> currentIntersect <span class="token operator">=</span> <span class="token keyword">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">tick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
    <span class="token keyword">const</span> elapsedTime <span class="token operator">=</span> clock<span class="token punctuation">.</span><span class="token function">getElapsedTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// Animate objects</span>
    object1<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>elapsedTime <span class="token operator">*</span> <span class="token number">0.3</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.5</span>
    object2<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>elapsedTime <span class="token operator">*</span> <span class="token number">0.8</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.5</span>
    object3<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>elapsedTime <span class="token operator">*</span> <span class="token number">1.4</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.5</span>

    <span class="token comment">// Cast a ray</span>
    <span class="token keyword">const</span> rayOrigin <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector3</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> rayDirection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector3</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    rayDirection<span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    raycaster<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>rayOrigin<span class="token punctuation">,</span> rayDirection<span class="token punctuation">)</span>

    raycaster<span class="token punctuation">.</span><span class="token function">setFromCamera</span><span class="token punctuation">(</span>mouse<span class="token punctuation">,</span> camera<span class="token punctuation">)</span>
    <span class="token keyword">const</span> objectsToTest <span class="token operator">=</span> <span class="token punctuation">[</span>object1<span class="token punctuation">,</span> object2<span class="token punctuation">,</span> object3<span class="token punctuation">]</span>
    <span class="token keyword">const</span> intersects <span class="token operator">=</span> raycaster<span class="token punctuation">.</span><span class="token function">intersectObjects</span><span class="token punctuation">(</span>objectsToTest<span class="token punctuation">)</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>intersects<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>currentIntersect<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'mouse enter'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        currentIntersect <span class="token operator">=</span> intersects<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>currentIntersect<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'mouse leave'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        currentIntersect <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Update controls</span>
    controls<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Render</span>
    renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span>

    <span class="token comment">// Call tick again on the next frame</span>
    window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>tick<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/ab0490797c41eafbc3feb5c1e55b02bc.png##averageHue=#6d504d&amp;clientId=u0ece2a17-5dff-4&amp;from=paste&amp;height=646&amp;id=HxOOA&amp;originHeight=808&amp;originWidth=2251&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=71790&amp;status=done&amp;style=none&amp;taskId=u4a757119-82fe-4ede-b340-430f2052a34&amp;title=&amp;width=1800.8" alt="image.png"></p>
<h3 id="鼠标点击" tabindex="-1"><a class="header-anchor" href="#鼠标点击" aria-hidden="true">#</a> 鼠标点击</h3>
<p>在有了一个包含当前悬停对象的变量后，我们可以轻松地实现一个click事件。
首先，我们需要监听事件，click无论它发生在哪里：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后，我们可以测试变量中是否有内容currentIntersect：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>currentIntersect<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>总代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'./style.css'</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> OrbitControls <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'three/examples/jsm/controls/OrbitControls.js'</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> dat <span class="token keyword">from</span> <span class="token string">'lil-gui'</span>

<span class="token doc-comment comment">/**
 * Base
 */</span>
<span class="token comment">// Debug</span>
<span class="token keyword">const</span> gui <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">dat<span class="token punctuation">.</span>GUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// Canvas</span>
<span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'canvas.webgl'</span><span class="token punctuation">)</span>

<span class="token comment">// Scene</span>
<span class="token keyword">const</span> scene <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * Objects
 */</span>
<span class="token keyword">const</span> object1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>SphereGeometry</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshBasicMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#ff0000'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
object1<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span> <span class="token number">2</span>

<span class="token keyword">const</span> object2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>SphereGeometry</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshBasicMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#ff0000'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> object3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>SphereGeometry</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshBasicMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#ff0000'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
object3<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">2</span>

scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>object1<span class="token punctuation">,</span> object2<span class="token punctuation">,</span> object3<span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * Raycaster
 */</span>
<span class="token keyword">const</span> raycaster <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Raycaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> currentIntersect <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">const</span> rayOrigin <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector3</span><span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> rayDirection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector3</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
rayDirection<span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// raycaster.set(rayOrigin, rayDirection)</span>

<span class="token doc-comment comment">/**
 * Sizes
 */</span>
<span class="token keyword">const</span> sizes <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">width</span><span class="token operator">:</span> window<span class="token punctuation">.</span>innerWidth<span class="token punctuation">,</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> window<span class="token punctuation">.</span>innerHeight
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'resize'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
    <span class="token comment">// Update sizes</span>
    sizes<span class="token punctuation">.</span>width <span class="token operator">=</span> window<span class="token punctuation">.</span>innerWidth
    sizes<span class="token punctuation">.</span>height <span class="token operator">=</span> window<span class="token punctuation">.</span>innerHeight

    <span class="token comment">// Update camera</span>
    camera<span class="token punctuation">.</span>aspect <span class="token operator">=</span> sizes<span class="token punctuation">.</span>width <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height
    camera<span class="token punctuation">.</span><span class="token function">updateProjectionMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Update renderer</span>
    renderer<span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span>sizes<span class="token punctuation">.</span>width<span class="token punctuation">,</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">)</span>
    renderer<span class="token punctuation">.</span><span class="token function">setPixelRatio</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>devicePixelRatio<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * Mouse
 */</span>
<span class="token keyword">const</span> mouse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mousemove'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
    mouse<span class="token punctuation">.</span>x <span class="token operator">=</span> event<span class="token punctuation">.</span>clientX <span class="token operator">/</span> sizes<span class="token punctuation">.</span>width <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">-</span> <span class="token number">1</span>
    mouse<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>clientY <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>currentIntersect<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">switch</span><span class="token punctuation">(</span>currentIntersect<span class="token punctuation">.</span>object<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token literal-property property">object1</span><span class="token operator">:</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'click on object 1'</span><span class="token punctuation">)</span>
                <span class="token keyword">break</span>

            <span class="token keyword">case</span> <span class="token literal-property property">object2</span><span class="token operator">:</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'click on object 2'</span><span class="token punctuation">)</span>
                <span class="token keyword">break</span>

            <span class="token keyword">case</span> <span class="token literal-property property">object3</span><span class="token operator">:</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'click on object 3'</span><span class="token punctuation">)</span>
                <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * Camera
 */</span>
<span class="token comment">// Base camera</span>
<span class="token keyword">const</span> camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>PerspectiveCamera</span><span class="token punctuation">(</span><span class="token number">75</span><span class="token punctuation">,</span> sizes<span class="token punctuation">.</span>width <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">,</span> <span class="token number">0.1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>z <span class="token operator">=</span> <span class="token number">3</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>camera<span class="token punctuation">)</span>

<span class="token comment">// Controls</span>
<span class="token keyword">const</span> controls <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrbitControls</span><span class="token punctuation">(</span>camera<span class="token punctuation">,</span> canvas<span class="token punctuation">)</span>
controls<span class="token punctuation">.</span>enableDamping <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token doc-comment comment">/**
 * Renderer
 */</span>
<span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>WebGLRenderer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">canvas</span><span class="token operator">:</span> canvas
<span class="token punctuation">}</span><span class="token punctuation">)</span>
renderer<span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span>sizes<span class="token punctuation">.</span>width<span class="token punctuation">,</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">)</span>
renderer<span class="token punctuation">.</span><span class="token function">setPixelRatio</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>devicePixelRatio<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * Animate
 */</span>
<span class="token keyword">const</span> clock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Clock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">tick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
    <span class="token keyword">const</span> elapsedTime <span class="token operator">=</span> clock<span class="token punctuation">.</span><span class="token function">getElapsedTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Animate objects</span>
    object1<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>elapsedTime <span class="token operator">*</span> <span class="token number">0.3</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.5</span>
    object2<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>elapsedTime <span class="token operator">*</span> <span class="token number">0.8</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.5</span>
    object3<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>elapsedTime <span class="token operator">*</span> <span class="token number">1.4</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.5</span>

    <span class="token comment">// Cast a fixed ray</span>
    <span class="token comment">// const rayOrigin = new THREE.Vector3(- 3, 0, 0)</span>
    <span class="token comment">// const rayDirection = new THREE.Vector3(1, 0, 0)</span>
    <span class="token comment">// rayDirection.normalize()</span>
    
    <span class="token comment">// raycaster.set(rayOrigin, rayDirection)</span>
    
    <span class="token comment">// const objectsToTest = [object1, object2, object3]</span>
    <span class="token comment">// const intersects = raycaster.intersectObjects(objectsToTest)</span>

    <span class="token comment">// for(const object of objectsToTest)</span>
    <span class="token comment">// {</span>
    <span class="token comment">//     object.material.color.set('#ff0000')</span>
    <span class="token comment">// }</span>

    <span class="token comment">// for(const intersect of intersects)</span>
    <span class="token comment">// {</span>
    <span class="token comment">//     intersect.object.material.color.set('#0000ff')</span>
    <span class="token comment">// }</span>

    <span class="token comment">// Cast a ray from the mouse</span>
    <span class="token comment">// raycaster.setFromCamera(mouse, camera)</span>
    
    <span class="token comment">// const objectsToTest = [object1, object2, object3]</span>
    <span class="token comment">// const intersects = raycaster.intersectObjects(objectsToTest)</span>
    
    <span class="token comment">// for(const intersect of intersects)</span>
    <span class="token comment">// {</span>
    <span class="token comment">//     intersect.object.material.color.set('#0000ff')</span>
    <span class="token comment">// }</span>

    <span class="token comment">// for(const object of objectsToTest)</span>
    <span class="token comment">// {</span>
    <span class="token comment">//     if(!intersects.find(intersect => intersect.object === object))</span>
    <span class="token comment">//     {</span>
    <span class="token comment">//         object.material.color.set('#ff0000')</span>
    <span class="token comment">//     }</span>
    <span class="token comment">// }</span>

    <span class="token comment">// Cast a ray from the mouse and handle events</span>
    raycaster<span class="token punctuation">.</span><span class="token function">setFromCamera</span><span class="token punctuation">(</span>mouse<span class="token punctuation">,</span> camera<span class="token punctuation">)</span>

    <span class="token keyword">const</span> objectsToTest <span class="token operator">=</span> <span class="token punctuation">[</span>object1<span class="token punctuation">,</span> object2<span class="token punctuation">,</span> object3<span class="token punctuation">]</span>
    <span class="token keyword">const</span> intersects <span class="token operator">=</span> raycaster<span class="token punctuation">.</span><span class="token function">intersectObjects</span><span class="token punctuation">(</span>objectsToTest<span class="token punctuation">)</span>
    
    <span class="token keyword">if</span><span class="token punctuation">(</span>intersects<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>currentIntersect<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'mouse enter'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        currentIntersect <span class="token operator">=</span> intersects<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>currentIntersect<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'mouse leave'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        
        currentIntersect <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Update controls</span>
    controls<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Render</span>
    renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span>

    <span class="token comment">// Call tick again on the next frame</span>
    window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>tick<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br></div></div></template>
