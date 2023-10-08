<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-光照模型拆解">[1]光照模型拆解</RouterLink></li><li><RouterLink to="#_2-环境反射">[2]环境反射</RouterLink></li><li><RouterLink to="#_3-平行光">[3]平行光</RouterLink><ul><li><RouterLink to="#平行光的漫反射">平行光的漫反射</RouterLink></li><li><RouterLink to="#平行光的镜面反射">平行光的镜面反射</RouterLink></li></ul></li><li><RouterLink to="#_4-点光源">[4]点光源</RouterLink><ul><li><RouterLink to="#点光源的漫反射">点光源的漫反射</RouterLink></li><li><RouterLink to="#点光源的衰减">点光源的衰减</RouterLink></li><li><RouterLink to="#点光源的镜面反射">点光源的镜面反射</RouterLink></li></ul></li><li><RouterLink to="#_5-phong着色模型与blinn-phong着色模型">[5]phong着色模型与Blinn-Phong着色模型</RouterLink></li></ul></nav>
<p>Phong着色模型是早期的光照模型，由Bui Tuong Phong在1975年提出。它基于反射模型，将表面光照分为<strong>环境光、漫反射光和镜面反射光</strong>三个组成部分，并针对每个部分分别计算其对表面颜色的影响。Phong着色模型的计算相对简单，但是可能会产生明显的镜面高光过于突出的问题。</p>
<h2 id="_1-光照模型拆解" tabindex="-1"><a class="header-anchor" href="#_1-光照模型拆解" aria-hidden="true">#</a> [1]光照模型拆解</h2>
<p>物体的光照效果是由<strong>光源、介质（物体的材质）和反射类型</strong>决定的，而反射类型又由物体的材质特点决定。</p>
<blockquote>
<p>这里只记录基本的光照模式，不深入考虑很细的物理光照模型，如光线追踪之类的。</p>
</blockquote>
<p>在 3D 光照模型中，根据不同的光源特点，可以将光源分为 4 种，分别为：</p>
<ul>
<li>无向光：<strong>环境光（Ambient Light）、</strong></li>
<li>有向光：<strong>平行光（Directional Light）、点光源（Positional Light）和聚光灯（Spot Light）</strong></li>
</ul>
<p>而反射类型通常分为：</p>
<ul>
<li>漫反射</li>
<li>镜面反射</li>
</ul>
<p>其中环境光为无向光固然就没有镜面反射了，也就只有漫反射了，而其他的光源类型既有漫反射也有镜面反射</p>
<p>那么将这些光源类型的反射类型组合起来就可以实现标准的光照模型，也就是 Phong 反射模型了</p>
<h2 id="_2-环境反射" tabindex="-1"><a class="header-anchor" href="#_2-环境反射" aria-hidden="true">#</a> [2]环境反射</h2>
<p>环境反射是针对环境光而言的，环境光就是指物体所在的三维空间中天然的光，它充满整个空间，在每一处的光照强度都一样。环境光没有方向，所以，物体表面反射环境光的效果，只和环境光本身以及<strong>材质的反射率</strong>（纹理材质/表面基底色）有关。</p>
<p>因此着色器代码也就很简单了：</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">precision</span> <span class="token keyword">highp</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> ambientLight<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> materialReflection<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  gl_FragColor<span class="token punctuation">.</span>rgb <span class="token operator">=</span> ambientLight <span class="token operator">*</span> materialReflection<span class="token punctuation">;</span>
  gl_FragColor<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="_3-平行光" tabindex="-1"><a class="header-anchor" href="#_3-平行光" aria-hidden="true">#</a> [3]平行光</h2>
<p>平行光除了颜色这个属性之外，还有方向，它属于有向光。有向光在与物体发生作用的时候，根据物体的材质特性，会产生两种反射，一种叫做<strong>漫反射（Diffuse reflection）</strong>，另一种叫做<strong>镜面反射（Specular reflection）</strong></p>
<p>而一个物体最终的光照效果，是漫反射、镜面反射以及我们前面说的环境光叠加在一起的效果</p>
<h3 id="平行光的漫反射" tabindex="-1"><a class="header-anchor" href="#平行光的漫反射" aria-hidden="true">#</a> 平行光的漫反射</h3>
<p>这里先计算平行光的漫反射：</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">d</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.02778em;">rD</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.10764em;">ff</span><span class="mord mathnormal">u</span><span class="mord mathnormal">se</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7224em;vertical-align:-0.0391em;"></span><span class="mord cjk_fallback">＜入射光颜色</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">∗</span><span class="mord cjk_fallback">＜表面基底色</span><span class="mord">/</span><span class="mord cjk_fallback">反射率</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord">∗</span><span class="mord mathnormal">cos</span><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">cos</span><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7224em;vertical-align:-0.0391em;"></span><span class="mord cjk_fallback">＜光线方向</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mord">∗</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7224em;vertical-align:-0.0391em;"></span><span class="mord cjk_fallback">法线方向</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span></span></span></span></span></p>
<p>这里主要需要计算处理的是光线的方向，因为光线的方向需要计运算的次数少，在顶点着色器，会比在片元着色器中计算的性能要好很多。</p>
<p>下面为着色器计算代码：</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code> <span class="token keyword">precision</span> <span class="token keyword">highp</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

  <span class="token keyword">attribute</span> <span class="token keyword">vec3</span> position<span class="token punctuation">;</span>
  <span class="token keyword">attribute</span> <span class="token keyword">vec3</span> normal<span class="token punctuation">;</span>
  <span class="token keyword">uniform</span> <span class="token keyword">mat4</span> modelViewMatrix<span class="token punctuation">;</span>
  <span class="token keyword">uniform</span> <span class="token keyword">mat4</span> projectionMatrix<span class="token punctuation">;</span>
  <span class="token keyword">uniform</span> <span class="token keyword">mat4</span> viewMatrix<span class="token punctuation">;</span>
  <span class="token keyword">uniform</span> <span class="token keyword">mat3</span> normalMatrix<span class="token punctuation">;</span>
  <span class="token keyword">uniform</span> <span class="token keyword">vec3</span> directionalLight<span class="token punctuation">;</span>
  
  <span class="token keyword">varying</span> <span class="token keyword">vec3</span> vNormal<span class="token punctuation">;</span>
  <span class="token keyword">varying</span> <span class="token keyword">vec3</span> vDir<span class="token punctuation">;</span>

  <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 计算光线方向（将光线方向向量从世界空间转换到相机空间）</span>
    <span class="token keyword">vec4</span> invDirectional <span class="token operator">=</span> viewMatrix <span class="token operator">*</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    vDir <span class="token operator">=</span> <span class="token operator">-</span>invDirectional<span class="token punctuation">.</span>xyz<span class="token punctuation">;</span>
    
    <span class="token comment">// 计算法向量</span>
    vNormal <span class="token operator">=</span> <span class="token function">normalize</span><span class="token punctuation">(</span>normalMatrix <span class="token operator">*</span> normal<span class="token punctuation">)</span><span class="token punctuation">;</span>
    gl_Position <span class="token operator">=</span> projectionMatrix <span class="token operator">*</span> modelViewMatrix <span class="token operator">*</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">precision</span> <span class="token keyword">highp</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> materialReflection<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> directionalLightColor<span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vNormal<span class="token punctuation">;</span>
<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vDir<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 求光线与法线夹角的余弦</span>
  <span class="token keyword">float</span> cos <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token function">dot</span><span class="token punctuation">(</span><span class="token function">normalize</span><span class="token punctuation">(</span>vDir<span class="token punctuation">)</span><span class="token punctuation">,</span> vNormal<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// 计算平行光漫反射</span>
  <span class="token keyword">vec3</span> diffuse <span class="token operator">=</span> cos <span class="token operator">*</span> directionalLightColor<span class="token punctuation">;</span>
 
  <span class="token comment">// 合成颜色</span>
  gl_FragColor<span class="token punctuation">.</span>rgb <span class="token operator">=</span> diffuse <span class="token operator">*</span> materialReflection<span class="token punctuation">;</span>
  gl_FragColor<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><blockquote>
<p>这里需要注意的是还需要对光线方向向量和法向量进行坐标空间进行转换，转换到视图空间</p>
<p>对光线方向向量进行坐标空间转换：</p>
<ul>
<li>在渲染场景时，相机的位置和方向通常是已知的，而光源的位置和方向则可能是相对于世界空间的。因此，在计算光的效果时，需要将光源的位置和方向转换到相机/视图空间中。</li>
<li>如果不乘以视图矩阵，那么得到的就是一个在世界空间中表示该方向向量的向量。在渲染过程中使用这个向量，可能会导致光源的位置和方向不正确，从而影响到渲染结果的准确性。因此，需要将方向向量转换到相机空间中，才能正确计算光的效果。</li>
</ul>
<p>对法向量的坐标空间转换：</p>
<ul>
<li>通常情况下，法向量是在模型空间（局部空间）中计算的，即在模型被放置在世界空间之前。但是，在使用视图矩阵将顶点从世界空间转换到相机空间后，需要使用一个特殊的矩阵<code>normalMatrix</code>来计算变换后的法向量</li>
<li>这个特殊的矩阵通常被称为“<strong>法线矩阵</strong>”或“<strong>法向量矩阵</strong>”，它是从视图矩阵中提取出来的。这个矩阵可以将在模型空间中计算的法向量转换为在相机空间中的法向量</li>
</ul>
</blockquote>
<h3 id="平行光的镜面反射" tabindex="-1"><a class="header-anchor" href="#平行光的镜面反射" aria-hidden="true">#</a> 平行光的镜面反射</h3>
<p>如果若干平行光照射在表面光滑的物体上，反射出来的光依然平行，这种反射就是镜面反射。镜面反射的性质是，入射光与法线的夹角等于反射光与法线的夹角。</p>
<p>越光滑的材质，它的镜面反射效果也就越强。最直接的表现就是物体表面会有闪耀的光斑，也叫镜面高光</p>
<p>因为镜面反射需要同时考虑光的入射方向以及相机也就是观察者所在的方向</p>
<p>所以实现平行光的镜面反射可以分为如下几个步骤：</p>
<ul>
<li>
<p><strong>求出反射光线的方向向量</strong></p>
<ul>
<li>要求出反射光的方向，我们可以直接使用 GLSL 的内置函数 reflect，这个函数能够返回一个向量相对于某个法向量的反射向量，正好就是我们要的镜面反射结果，因为是平行光可以直接将下面的计算过程放到顶点着色器中进行</li>
</ul>
</li>
<li>
<p><strong>根据相机位置计算视线与反射光线夹角的余弦</strong></p>
</li>
<li>
<p><strong>使用系数和指数函数来设置镜面反射强度。</strong></p>
<ul>
<li>指数越大，镜面越聚焦，高光的光斑范围就越小，系数能改变反射亮度，系数越大，反射的亮度就越高。（如下面的A、B）</li>
</ul>
</li>
</ul>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">ec</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8913em;"></span><span class="mord mathnormal">cos</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8913em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05017em;">B</span></span></span></span></span></span></span></span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">cos</span><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord cjk_fallback">反射光线</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord cjk_fallback">视线</span></span></span></span></span></p>
<h2 id="_4-点光源" tabindex="-1"><a class="header-anchor" href="#_4-点光源" aria-hidden="true">#</a> [4]点光源</h2>
<p>除了平行光之外，点光源也都是有向光</p>
<p>点光源顾名思义，就是指空间中某一点发出的光，与方向光不同的是，点光源不仅有方向属性，还有<strong>位置属性</strong></p>
<p>要计算点光源的漫反射和镜面反射就需要先根据光源位置和物体表面相对位置来计算光线位置，后面就和平行光的计算方法一样了，计算光的方向和物体表面法向的夹角</p>
<h3 id="点光源的漫反射" tabindex="-1"><a class="header-anchor" href="#点光源的漫反射" aria-hidden="true">#</a> 点光源的漫反射</h3>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">precision</span> <span class="token keyword">highp</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

<span class="token keyword">attribute</span> <span class="token keyword">vec3</span> position<span class="token punctuation">;</span>
<span class="token keyword">attribute</span> <span class="token keyword">vec3</span> normal<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> modelViewMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> projectionMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat3</span> normalMatrix<span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vNormal<span class="token punctuation">;</span>
<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vPos<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  vPos <span class="token operator">=</span> modelViewMatrix <span class="token operator">*</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//点的位置</span>
  vNormal <span class="token operator">=</span> <span class="token function">normalize</span><span class="token punctuation">(</span>normalMatrix <span class="token operator">*</span> normal<span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl_Position <span class="token operator">=</span> projectionMatrix <span class="token operator">*</span> vPos<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">precision</span> <span class="token keyword">highp</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> ambientLight<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> materialReflection<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> pointLightColor<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> pointLightPosition<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> viewMatrix<span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vNormal<span class="token punctuation">;</span>
<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vPos<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 光线到点坐标的方向</span>
  <span class="token keyword">vec3</span> dir <span class="token operator">=</span> <span class="token punctuation">(</span>viewMatrix <span class="token operator">*</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>pointLightPosition<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>xyz <span class="token operator">-</span> vPos<span class="token punctuation">;</span>
  <span class="token comment">// 与法线夹角余弦</span>
  <span class="token keyword">float</span> cos <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token function">dot</span><span class="token punctuation">(</span><span class="token function">normalize</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">,</span> vNormal<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 计算漫反射</span>
  <span class="token keyword">vec3</span> diffuse <span class="token operator">=</span> cos <span class="token operator">*</span> pointLightColor<span class="token punctuation">;</span>
  <span class="token comment">// 合成颜色</span>
  gl_FragColor<span class="token punctuation">.</span>rgb <span class="token operator">=</span> <span class="token punctuation">(</span>ambientLight <span class="token operator">+</span> diffuse<span class="token punctuation">)</span> <span class="token operator">*</span> materialReflection<span class="token punctuation">;</span>
  gl_FragColor<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><blockquote>
<p>计算方法与平行光的类似</p>
</blockquote>
<h3 id="点光源的衰减" tabindex="-1"><a class="header-anchor" href="#点光源的衰减" aria-hidden="true">#</a> 点光源的衰减</h3>
<p>为了模拟更真实的点光源光照，还需要设置点光源的衰减。</p>
<p>光线的衰减程度，我们一般用衰减系数表示。衰减系数等于一个常量 d0（通常为 1），除以衰减函数 p。</p>
<p>一般来说，衰减函数可以用一个二次多项式 P 来描述，它的计算公式为：</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:3em;vertical-align:-1.25em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size4">{</span></span><span class="mord"><span class="mtable"><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.69em;"><span style="top:-3.69em;"><span class="pstrut" style="height:3.008em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal">A</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.07153em;">C</span></span></span><span style="top:-2.25em;"><span class="pstrut" style="height:3.008em;"></span><span class="mord"><span class="mord mathnormal">d</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8962em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.13889em;">P</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.4101em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight">d</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3173em;"><span style="top:-2.357em;margin-left:0em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.19em;"><span></span></span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>其中 A、B、C 为常量(自定义），它们的取值会根据实际的需要随时变化，z 是当前位置到点光源的距离。</p>
<p>那么只需要在片元着色器中增加衰减系数即可，也就是需要计算多一个量：点光源到点坐标的距离，直接使用glsl内置函数length计算即可</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">precision</span> <span class="token keyword">highp</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> ambientLight<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> materialReflection<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> pointLightColor<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> pointLightPosition<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> viewMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> pointLightDecayFactor<span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vNormal<span class="token punctuation">;</span>
<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vPos<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 光线到点坐标的方向</span>
  <span class="token keyword">vec3</span> dir <span class="token operator">=</span> <span class="token punctuation">(</span>viewMatrix <span class="token operator">*</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>pointLightPosition<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>xyz <span class="token operator">-</span> vPos<span class="token punctuation">;</span>
  <span class="token comment">// 光线到点坐标的距离，用来计算衰减</span>
  <span class="token keyword">float</span> dis <span class="token operator">=</span> <span class="token function">length</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 与法线夹角余弦</span>
  <span class="token keyword">float</span> cos <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token function">dot</span><span class="token punctuation">(</span><span class="token function">normalize</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">,</span> vNormal<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 计算衰减</span>
  <span class="token keyword">float</span> decay <span class="token operator">=</span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">1.0</span> <span class="token operator">/</span>
    <span class="token punctuation">(</span>pointLightDecayFactor<span class="token punctuation">.</span>x <span class="token operator">*</span> <span class="token function">pow</span><span class="token punctuation">(</span>dis<span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span> <span class="token operator">+</span> pointLightDecayFactor<span class="token punctuation">.</span>y <span class="token operator">*</span> dis <span class="token operator">+</span> pointLightDecayFactor<span class="token punctuation">.</span>z<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 计算漫反射</span>
  <span class="token keyword">vec3</span> diffuse <span class="token operator">=</span> decay <span class="token operator">*</span> cos <span class="token operator">*</span> pointLightColor<span class="token punctuation">;</span>
  <span class="token comment">// 合成颜色</span>
  gl_FragColor<span class="token punctuation">.</span>rgb <span class="token operator">=</span> <span class="token punctuation">(</span>ambientLight <span class="token operator">+</span> diffuse<span class="token punctuation">)</span> <span class="token operator">*</span> materialReflection<span class="token punctuation">;</span>
  gl_FragColor<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="点光源的镜面反射" tabindex="-1"><a class="header-anchor" href="#点光源的镜面反射" aria-hidden="true">#</a> 点光源的镜面反射</h3>
<p>点光源的镜面反射与平行光的镜面反射类似，只是在镜面反射的反射光上复杂些</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">precision</span> <span class="token keyword">highp</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

<span class="token keyword">attribute</span> <span class="token keyword">vec3</span> position<span class="token punctuation">;</span>
<span class="token keyword">attribute</span> <span class="token keyword">vec3</span> normal<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> modelViewMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> viewMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> projectionMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat3</span> normalMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> cameraPosition<span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vNormal<span class="token punctuation">;</span>
<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vPos<span class="token punctuation">;</span>
<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vCameraPos<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">vec4</span> pos <span class="token operator">=</span> modelViewMatrix <span class="token operator">*</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    vPos <span class="token operator">=</span> pos<span class="token punctuation">.</span>xyz<span class="token punctuation">;</span>
    vCameraPos <span class="token operator">=</span> <span class="token punctuation">(</span>viewMatrix <span class="token operator">*</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>cameraPosition<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>xyz<span class="token punctuation">;</span> 
    vNormal <span class="token operator">=</span> <span class="token function">normalize</span><span class="token punctuation">(</span>normalMatrix <span class="token operator">*</span> normal<span class="token punctuation">)</span><span class="token punctuation">;</span>
    gl_Position <span class="token operator">=</span> projectionMatrix <span class="token operator">*</span> pos<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">precision</span> <span class="token keyword">highp</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> ambientLight<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> materialReflection<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> pointLightColor<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> pointLightPosition<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> viewMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> pointLightDecayFactor<span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vNormal<span class="token punctuation">;</span>
<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vPos<span class="token punctuation">;</span>
<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vCameraPos<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 光线到点坐标的方向</span>
    <span class="token keyword">vec3</span> dir <span class="token operator">=</span> <span class="token punctuation">(</span>viewMatrix <span class="token operator">*</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>pointLightPosition<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>xyz <span class="token operator">-</span> vPos<span class="token punctuation">;</span>
    <span class="token comment">// 光线到点坐标的距离，用来计算衰减</span>
    <span class="token keyword">float</span> dis <span class="token operator">=</span> <span class="token function">length</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dir <span class="token operator">=</span> <span class="token function">normalize</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 与法线夹角余弦</span>
    <span class="token keyword">float</span> cos <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token function">dot</span><span class="token punctuation">(</span>dir<span class="token punctuation">,</span> vNormal<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 反射光线</span>
    <span class="token keyword">vec3</span> reflectionLight <span class="token operator">=</span> <span class="token function">reflect</span><span class="token punctuation">(</span><span class="token operator">-</span>dir<span class="token punctuation">,</span> vNormal<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">vec3</span> eyeDirection <span class="token operator">=</span> vCameraPos <span class="token operator">-</span> vPos<span class="token punctuation">;</span>
    eyeDirection <span class="token operator">=</span> <span class="token function">normalize</span><span class="token punctuation">(</span>eyeDirection<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 与视线夹角余弦</span>
    <span class="token keyword">float</span> eyeCos <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token function">dot</span><span class="token punctuation">(</span>eyeDirection<span class="token punctuation">,</span> reflectionLight<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 镜面反射</span>
    <span class="token keyword">float</span> specular <span class="token operator">=</span> <span class="token number">2.0</span> <span class="token operator">*</span>  <span class="token function">pow</span><span class="token punctuation">(</span>eyeCos<span class="token punctuation">,</span> <span class="token number">50.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 计算衰减</span>
    <span class="token keyword">float</span> decay <span class="token operator">=</span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">1.0</span> <span class="token operator">/</span>
                      <span class="token punctuation">(</span>pointLightDecayFactor<span class="token punctuation">.</span>x <span class="token operator">*</span> <span class="token function">pow</span><span class="token punctuation">(</span>dis<span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span> <span class="token operator">+</span> pointLightDecayFactor<span class="token punctuation">.</span>y <span class="token operator">*</span> dis <span class="token operator">+</span> pointLightDecayFactor<span class="token punctuation">.</span>z<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 计算漫反射</span>
    <span class="token keyword">vec3</span> diffuse <span class="token operator">=</span> decay <span class="token operator">*</span> cos <span class="token operator">*</span> pointLightColor<span class="token punctuation">;</span>
    <span class="token comment">// 合成颜色</span>
    gl_FragColor<span class="token punctuation">.</span>rgb <span class="token operator">=</span> specular <span class="token operator">+</span> <span class="token punctuation">(</span>ambientLight <span class="token operator">+</span> diffuse<span class="token punctuation">)</span> <span class="token operator">*</span> materialReflection<span class="token punctuation">;</span>
    gl_FragColor<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h2 id="_5-phong着色模型与blinn-phong着色模型" tabindex="-1"><a class="header-anchor" href="#_5-phong着色模型与blinn-phong着色模型" aria-hidden="true">#</a> [5]phong着色模型与Blinn-Phong着色模型</h2>
<p>Blinn-Phong着色模型和Phong着色模型都是用于计算光照在物体表面着色的模型但它们有一些不同之处</p>
<ul>
<li>Phong着色模型是早期的光照模型，由Bui Tuong Phong在1975年提出。它基于反射模型，将表面光照分为<strong>环境光、漫反射光和镜面反射光</strong>三个组成部分，并针对每个部分分别计算其对表面颜色的影响。Phong着色模型的计算相对简单，但是可能会产生明显的镜面高光过于突出的问题。</li>
<li>Blinn-Phong着色模型是由Jim Blinn在1977年提出的改进版本。它在Phong着色模型的基础上（表面光的照的组成没有变），引入了一个半程向量的概念，用来代替Phong着色模型中的反射向量。这个半程向量可以更好地模拟物体表面的微观凹凸，使得镜面高光的效果更加自然。Blinn-Phong着色模型计算相对复杂一些，但是可以产生更真实的光照效果。具体可查看之前的<a href="https://www.luxd.space/posts/shading.html#_2-blinn-phong-reflectance-model-%E7%9D%80%E8%89%B2%E6%A8%A1%E5%9E%8B" target="_blank" rel="noopener noreferrer">笔记</a>。</li>
</ul>
<p>那么将上面的三种光源类型与两种反射类型组合起来就构成了phong反射模型。</p>
</template>
