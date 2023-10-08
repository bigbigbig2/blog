<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-css设置">[1]css设置</RouterLink></li><li><RouterLink to="#_2-固定弹性卷轴">[2]固定弹性卷轴</RouterLink></li><li><RouterLink to="#_3-在three画布中添加多个对象">[3]在Three画布中添加多个对象</RouterLink></li><li><RouterLink to="#_4-视差parallax">[4]视差Parallax</RouterLink><ul><li><RouterLink to="#光标">光标</RouterLink></li></ul></li><li><RouterLink to="#_5-额外效果">[5]额外效果</RouterLink></li></ul></nav>
<blockquote>
<p>本文部分内容为Three.js Journey课程的学习笔记</p>
</blockquote>
<p>todo：</p>
<ul>
<li>学习如何将 Three.js 作为 HTML 页面的背景</li>
<li>让相机跟随滚动而移动</li>
<li>发现一些技巧让3D效果更具沉浸感</li>
<li>基于光标位置添加视差效果，当到达特点区域时触发动画效果</li>
</ul>
<h2 id="_1-css设置" tabindex="-1"><a class="header-anchor" href="#_1-css设置" aria-hidden="true">#</a> [1]css设置</h2>
<p>要将Three.js 作为HTML 页面的背景，首先需要对页面css布局进行一定的设置</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>canvas</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>webgl<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>canvas</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>section<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>My Portfolio<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>section<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>My projects<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>section<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>Contact me<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token operator">*</span>
<span class="token punctuation">{</span>
margin<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
padding<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

html<span class="token punctuation">,</span>
body
<span class="token punctuation">{</span>
<span class="token comment">/* overflow: hidden; */</span>
background<span class="token operator">-</span>color<span class="token punctuation">:</span> #<span class="token number">363636</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">.</span>webgl
<span class="token punctuation">{</span>
position<span class="token punctuation">:</span> <span class="token keyword">fixed</span><span class="token punctuation">;</span>
top<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
left<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
outline<span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token punctuation">.</span>section
<span class="token punctuation">{</span>
display<span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
align<span class="token operator">-</span>items<span class="token punctuation">:</span> center<span class="token punctuation">;</span>
height<span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
position<span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
font<span class="token operator">-</span>family<span class="token punctuation">:</span> 'Cabin'<span class="token punctuation">,</span> sans<span class="token operator">-</span>serif<span class="token punctuation">;</span>
color<span class="token punctuation">:</span> #ffeded<span class="token punctuation">;</span>
text<span class="token operator">-</span>transform<span class="token punctuation">:</span> uppercase<span class="token punctuation">;</span>
font<span class="token operator">-</span>size<span class="token punctuation">:</span> 7vmin<span class="token punctuation">;</span>

padding<span class="token operator">-</span>left<span class="token punctuation">:</span> <span class="token number">10</span><span class="token operator">%</span><span class="token punctuation">;</span>
padding<span class="token operator">-</span>right<span class="token punctuation">:</span> <span class="token number">10</span><span class="token operator">%</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

section<span class="token punctuation">:</span>nth<span class="token operator">-</span><span class="token function">child</span><span class="token punctuation">(</span>odd<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    justify<span class="token operator">-</span>content<span class="token punctuation">:</span> flex<span class="token operator">-</span>end<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h2 id="_2-固定弹性卷轴" tabindex="-1"><a class="header-anchor" href="#_2-固定弹性卷轴" aria-hidden="true">#</a> [2]固定弹性卷轴</h2>
<p>在某些浏览器环境中（这里chorome是不会的），您可能会注意到，如果滚动距离太远，当页面超出限制时，您会看到一种弹性动画。
虽然这是一个很酷的功能，但默认情况下，页面背面是白色的，与我们的体验不符。
为了解决这个问题，我们可以将页面的颜色设置background-color为与 的颜色clearColor相同renderer。相反，我们将使其透明并仅在页面上clearColor设置。background-color</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>WebGLRenderer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token literal-property property">canvas</span><span class="token operator">:</span> canvas<span class="token punctuation">,</span>
<span class="token literal-property property">alpha</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="_3-在three画布中添加多个对象" tabindex="-1"><a class="header-anchor" href="#_3-在three画布中添加多个对象" aria-hidden="true">#</a> [3]在Three画布中添加多个对象</h2>
<p>为了实现鼠标滚动动画效果，通常需要添加多个三维对象</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">/**
* Objects
*/</span>
<span class="token comment">// Texture---这里添加了一些渐变纹理</span>
<span class="token keyword">const</span> textureLoader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">THREE<span class="token punctuation">.</span>TextureLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> gradientTexture <span class="token operator">=</span> textureLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>'textures<span class="token operator">/</span>gradients<span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">.</span>jpg'<span class="token punctuation">)</span>
gradientTexture<span class="token punctuation">.</span>magFilter <span class="token operator">=</span> THREE<span class="token punctuation">.</span>NearestFilter
<span class="token comment">// Material</span>
<span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">THREE<span class="token punctuation">.</span>MeshToonMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    color<span class="token punctuation">:</span> parameters<span class="token punctuation">.</span>materialColor<span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">gradientMap</span><span class="token punctuation">:</span> gradientTexture
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// Meshes</span>
<span class="token keyword">const</span> mesh1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">THREE<span class="token punctuation">.</span>TorusGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0.4</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    material
<span class="token punctuation">)</span>
<span class="token keyword">const</span> mesh2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">THREE<span class="token punctuation">.</span>ConeGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    material
<span class="token punctuation">)</span>
<span class="token keyword">const</span> mesh3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">THREE<span class="token punctuation">.</span>TorusKnotGeometry</span><span class="token punctuation">(</span><span class="token number">0.8</span><span class="token punctuation">,</span> <span class="token number">0.35</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    material
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>这里需要根据自己的喜好添加不同的对象和材质，同时也别忘了添加一些光照效果：</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">/**
* Lights
*/</span>
<span class="token keyword">const</span> directionalLight <span class="token operator">=</span> <span class="token keyword">new</span> THREE<span class="token punctuation">.</span>DirectionalLight<span class="token return-type class-name"><span class="token punctuation">(</span>'#ffffff'<span class="token punctuation">,</span> 1<span class="token punctuation">)</span></span>
directionalLight<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token return-type class-name"><span class="token punctuation">(</span>1<span class="token punctuation">,</span> 1<span class="token punctuation">,</span> 0<span class="token punctuation">)</span></span>
scene<span class="token punctuation">.</span><span class="token keyword">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>然后就是修改这些三维对象的位置了，为了达到滚动滚动条展示不同的三维物体，需要将他们的y坐标值取一定的距离：</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">const</span> objectsDistance <span class="token operator">=</span> <span class="token number">2</span>  <span class="token comment">//物体之间的距离</span>
mesh1<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span> objectsDistance <span class="token operator">*</span> <span class="token number">0</span>
mesh2<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span> objectsDistance <span class="token operator">*</span> <span class="token number">1</span>
mesh3<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span> objectsDistance <span class="token operator">*</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后就是相机设定相机随滚动条滚动而滚动了</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">/**
* Scroll
*/</span>
<span class="token keyword">let</span> scrollY <span class="token operator">=</span> window<span class="token punctuation">.</span>scrollY <span class="token comment">//检索滚动值</span>
<span class="token comment">//监听滚动条的滚动值</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>'scroll'<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
scrollY <span class="token operator">=</span> <span class="token return-type class-name">window<span class="token punctuation">.</span>scrollY</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>scrollY<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>然后在tick函数中，用于scrollY使相机移动（在进行渲染之前）：</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">const</span> tick <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
<span class="token comment">// ...</span>

<span class="token comment">// Animate camera</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span> scrollY <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height <span class="token operator">*</span> objectsDistance

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>后面也可以根据需要对对象的水平位置进行修改：</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>mesh1<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">2</span>
mesh2<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span> <span class="token number">2</span>
mesh3<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_4-视差parallax" tabindex="-1"><a class="header-anchor" href="#_4-视差parallax" aria-hidden="true">#</a> [4]视差Parallax</h2>
<p>为了让我们的体验更加身临其境，我们将通过使相机根据鼠标移动水平和垂直移动来应用这种视差效果。它将创建自然的交互，并帮助用户感受到深度。</p>
<h3 id="光标" tabindex="-1"><a class="header-anchor" href="#光标" aria-hidden="true">#</a> 光标</h3>
<p>首先，我们需要检索光标位置。
为此，请创建一个具有和属性的<code>cursor</code>对象：<code>xy</code></p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">/**
* Cursor
*/</span>
<span class="token keyword">const</span> cursor <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
cursor<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">0</span>
cursor<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>然后，监听<code>mousemove</code>事件<code>window</code>并更新这些值：</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>'mousemove'<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">event</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
cursor<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token keyword">event</span><span class="token punctuation">.</span>clientX <span class="token operator">/</span> sizes<span class="token punctuation">.</span>width <span class="token operator">-</span> <span class="token number">0.5</span>
cursor<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token keyword">event</span><span class="token punctuation">.</span>clientY <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height <span class="token operator">-</span> <span class="token number">0.5</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>cursor<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>然后就可以在函数tick中使用了</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">const</span> tick <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
<span class="token comment">// ...</span>

<span class="token comment">// Animate camera</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span> scrollY <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height <span class="token operator">*</span> objectsDistance

<span class="token keyword">const</span> parallaxX <span class="token operator">=</span> cursor<span class="token punctuation">.</span>x
<span class="token keyword">const</span> parallaxY <span class="token operator">=</span> <span class="token operator">-</span> cursor<span class="token punctuation">.</span>y
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> parallaxX
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> parallaxY

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>但是这时就又有一个问题了，就是这里设定了后，相机的滚动就不起作用了，因为问我们更新了camera.position.y两次，第二次将取代第一次
为了解决这个问题，我们将把相机放在一个组<a href="https://threejs.org/docs/index.html?q=group#api/en/objects/Group" target="_blank" rel="noopener noreferrer">three.js docs</a>中，并对组而不是相机本身应用视差。</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">/**
* Camera
*/</span>
<span class="token comment">// Group</span>
<span class="token keyword">const</span> cameraGroup <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">THREE<span class="token punctuation">.</span>Group</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
scene<span class="token punctuation">.</span><span class="token keyword">add</span><span class="token punctuation">(</span>cameraGroup<span class="token punctuation">)</span>

<span class="token comment">// Base camera</span>
<span class="token keyword">const</span> camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">THREE<span class="token punctuation">.</span>PerspectiveCamera</span><span class="token punctuation">(</span><span class="token number">35</span><span class="token punctuation">,</span> sizes<span class="token punctuation">.</span>width <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">,</span> <span class="token number">0.1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>z <span class="token operator">=</span> <span class="token number">6</span>
cameraGroup<span class="token punctuation">.</span><span class="token keyword">add</span><span class="token punctuation">(</span>camera<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>在该tick函数中，不是在相机上应用视差，而是将其应用在cameraGroup：</p>
<h2 id="_5-额外效果" tabindex="-1"><a class="header-anchor" href="#_5-额外效果" aria-hidden="true">#</a> [5]额外效果</h2>
<p>上面的基本是已经有一定的效果了，而如果追求更炫酷的效果，则需要之际补充添加，原理可参考上面的，比如粒子、触发旋转、网格动画、对材质等其他属性进行动画处理、对 HTML 文本进行动画处理</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'./style.css'</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> dat <span class="token keyword">from</span> <span class="token string">'lil-gui'</span>
<span class="token keyword">import</span> gsap <span class="token keyword">from</span> <span class="token string">'gsap'</span>

<span class="token doc-comment comment">/**
 * Debug
 */</span>
<span class="token keyword">const</span> gui <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">dat<span class="token punctuation">.</span>GUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> parameters <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">materialColor</span><span class="token operator">:</span> <span class="token string">'#ffeded'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">materialColor</span><span class="token operator">:</span><span class="token string">"#ffeded"</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * gui
 */</span>
gui
  <span class="token punctuation">.</span><span class="token function">addColor</span><span class="token punctuation">(</span>parameters<span class="token punctuation">,</span> <span class="token string">'materialColor'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">onChange</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
    <span class="token punctuation">{</span>
      material<span class="token punctuation">.</span>color<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>parameters<span class="token punctuation">.</span>materialColor<span class="token punctuation">)</span>
      particlesMaterial<span class="token punctuation">.</span>color<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>parameters<span class="token punctuation">.</span>materialColor<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * Base
 */</span>
<span class="token comment">// Canvas</span>
<span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'canvas.webgl'</span><span class="token punctuation">)</span>

<span class="token comment">// Scene</span>
<span class="token keyword">const</span> scene <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * Test cube
 */</span>
<span class="token doc-comment comment">/**
* Objects
*/</span>

<span class="token comment">// Texture</span>
<span class="token keyword">const</span> textureLoader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>TextureLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> gradientTexture <span class="token operator">=</span> textureLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">'textures/gradients/3.jpg'</span><span class="token punctuation">)</span>
gradientTexture<span class="token punctuation">.</span>magFilter <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>NearestFilter
<span class="token comment">// Material</span>
<span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshToonMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">color</span><span class="token operator">:</span> parameters<span class="token punctuation">.</span>materialColor<span class="token punctuation">,</span>
  <span class="token literal-property property">gradientMap</span><span class="token operator">:</span> gradientTexture
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// Meshes</span>
<span class="token keyword">const</span> mesh1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>TorusGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0.4</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  material
<span class="token punctuation">)</span>
<span class="token keyword">const</span> mesh2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>ConeGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  material
<span class="token punctuation">)</span>
<span class="token keyword">const</span> mesh3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>TorusKnotGeometry</span><span class="token punctuation">(</span><span class="token number">0.8</span><span class="token punctuation">,</span> <span class="token number">0.35</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  material
<span class="token punctuation">)</span>

<span class="token keyword">const</span> objectsDistance <span class="token operator">=</span> <span class="token number">4</span>
mesh1<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span> objectsDistance <span class="token operator">*</span> <span class="token number">0</span>
mesh2<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span> objectsDistance <span class="token operator">*</span> <span class="token number">1</span>
mesh3<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span> objectsDistance <span class="token operator">*</span> <span class="token number">2</span>
<span class="token keyword">const</span> sectionMeshes <span class="token operator">=</span> <span class="token punctuation">[</span> mesh1<span class="token punctuation">,</span> mesh2<span class="token punctuation">,</span> mesh3 <span class="token punctuation">]</span>

mesh1<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">2</span>
mesh2<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span> <span class="token number">2</span>
mesh3<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">2</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>mesh1<span class="token punctuation">,</span> mesh2<span class="token punctuation">,</span> mesh3<span class="token punctuation">)</span>


<span class="token doc-comment comment">/**
* Particles
*/</span>
<span class="token comment">// Geometry</span>
<span class="token keyword">const</span> particlesCount <span class="token operator">=</span> <span class="token number">200</span>
<span class="token keyword">const</span> positions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span>particlesCount <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">//构建随机position</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> particlesCount<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  positions<span class="token punctuation">[</span>i <span class="token operator">*</span> <span class="token number">3</span> <span class="token operator">+</span> <span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span>
  positions<span class="token punctuation">[</span>i <span class="token operator">*</span> <span class="token number">3</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> objectsDistance <span class="token operator">*</span> <span class="token number">0.5</span> <span class="token operator">-</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> objectsDistance <span class="token operator">*</span> sectionMeshes<span class="token punctuation">.</span>length
  positions<span class="token punctuation">[</span>i <span class="token operator">*</span> <span class="token number">3</span> <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> particlesGeometry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BufferGeometry</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
particlesGeometry<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'position'</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BufferAttribute</span><span class="token punctuation">(</span>positions<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">// Material</span>
<span class="token keyword">const</span> particlesMaterial <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>PointsMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">color</span><span class="token operator">:</span> parameters<span class="token punctuation">.</span>materialColor<span class="token punctuation">,</span>
  <span class="token literal-property property">sizeAttenuation</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token number">0.03</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// Points</span>
<span class="token keyword">const</span> particles <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Points</span><span class="token punctuation">(</span>particlesGeometry<span class="token punctuation">,</span> particlesMaterial<span class="token punctuation">)</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>particles<span class="token punctuation">)</span>


<span class="token doc-comment comment">/**
* Scroll
*/</span>
<span class="token keyword">let</span> scrollY <span class="token operator">=</span> window<span class="token punctuation">.</span>scrollY
<span class="token keyword">let</span> currentSection <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">//用于记录触发旋转</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'scroll'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
  <span class="token punctuation">{</span>
    scrollY <span class="token operator">=</span> window<span class="token punctuation">.</span>scrollY
    <span class="token keyword">const</span> newSection <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>scrollY <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">)</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>newSection <span class="token operator">!=</span> currentSection<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      currentSection <span class="token operator">=</span> newSection
      gsap<span class="token punctuation">.</span><span class="token function">to</span><span class="token punctuation">(</span>
        sectionMeshes<span class="token punctuation">[</span>currentSection<span class="token punctuation">]</span><span class="token punctuation">.</span>rotation<span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">1.5</span><span class="token punctuation">,</span>
          <span class="token literal-property property">ease</span><span class="token operator">:</span> <span class="token string">'power2.inOut'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">'+=6'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">'+=3'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">z</span><span class="token operator">:</span> <span class="token string">'+=1.5'</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">)</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'changed'</span><span class="token punctuation">,</span> currentSection<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

  <span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token doc-comment comment">/**
* Cursor
*/</span>
<span class="token keyword">const</span> cursor <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
cursor<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">0</span>
cursor<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">0</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mousemove'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span>
  <span class="token punctuation">{</span>
    cursor<span class="token punctuation">.</span>x <span class="token operator">=</span> event<span class="token punctuation">.</span>clientX <span class="token operator">/</span> sizes<span class="token punctuation">.</span>width <span class="token operator">-</span> <span class="token number">0.5</span>
    cursor<span class="token punctuation">.</span>y <span class="token operator">=</span> event<span class="token punctuation">.</span>clientY <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height <span class="token operator">-</span> <span class="token number">0.5</span>

      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token doc-comment comment">/**
      * Lights
      */</span>
      <span class="token keyword">const</span> directionalLight <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>DirectionalLight</span><span class="token punctuation">(</span><span class="token string">'#ffffff'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
      directionalLight<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
      scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">)</span>

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
      * Camera
      */</span>

      <span class="token comment">// Group</span>
      <span class="token keyword">const</span> cameraGroup <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Group</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>cameraGroup<span class="token punctuation">)</span>
      <span class="token comment">// Base camera</span>
      <span class="token keyword">const</span> camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>PerspectiveCamera</span><span class="token punctuation">(</span><span class="token number">35</span><span class="token punctuation">,</span> sizes<span class="token punctuation">.</span>width <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">,</span> <span class="token number">0.1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
      camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>z <span class="token operator">=</span> <span class="token number">6</span>
      cameraGroup<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>camera<span class="token punctuation">)</span>

      <span class="token doc-comment comment">/**
      * Renderer
      */</span>
      <span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>WebGLRenderer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">canvas</span><span class="token operator">:</span> canvas<span class="token punctuation">,</span>
      <span class="token literal-property property">alpha</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      renderer<span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span>sizes<span class="token punctuation">.</span>width<span class="token punctuation">,</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">)</span>
      renderer<span class="token punctuation">.</span><span class="token function">setPixelRatio</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>devicePixelRatio<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

      <span class="token doc-comment comment">/**
      * Animate
      */</span>
      <span class="token keyword">const</span> clock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Clock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">let</span> previousTime <span class="token operator">=</span> <span class="token number">0</span>

      <span class="token keyword">const</span> <span class="token function-variable function">tick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
    <span class="token punctuation">{</span>
      <span class="token keyword">const</span> elapsedTime <span class="token operator">=</span> clock<span class="token punctuation">.</span><span class="token function">getElapsedTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> deltaTime <span class="token operator">=</span> elapsedTime <span class="token operator">-</span> previousTime
      previousTime <span class="token operator">=</span> elapsedTime
      <span class="token comment">// Animate meshes</span>
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> mesh <span class="token keyword">of</span> sectionMeshes<span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
      mesh<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>x <span class="token operator">+=</span> deltaTime <span class="token operator">*</span> <span class="token number">0.1</span>
      mesh<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>y <span class="token operator">+=</span> deltaTime <span class="token operator">*</span> <span class="token number">0.12</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// Animate camera</span>
      camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span> scrollY <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height <span class="token operator">*</span> objectsDistance

      <span class="token keyword">const</span> parallaxX <span class="token operator">=</span> cursor<span class="token punctuation">.</span>x <span class="token operator">*</span> <span class="token number">0.8</span>
      <span class="token keyword">const</span> parallaxY <span class="token operator">=</span> <span class="token operator">-</span> cursor<span class="token punctuation">.</span>y <span class="token operator">*</span> <span class="token number">0.8</span>

      cameraGroup<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+=</span> <span class="token punctuation">(</span>parallaxX <span class="token operator">-</span> cameraGroup<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">5</span> <span class="token operator">*</span> deltaTime
      cameraGroup<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+=</span> <span class="token punctuation">(</span>parallaxY <span class="token operator">-</span> cameraGroup<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">5</span> <span class="token operator">*</span> deltaTime

      <span class="token comment">// Render</span>
      renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span>

      <span class="token comment">// Call tick again on the next frame</span>
      window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>tick<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br></div></div></template>
