<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-获取材质的着色器">[1]获取材质的着色器</RouterLink></li><li><RouterLink to="#_2-向顶点着色器中添加内容">[2]向顶点着色器中添加内容</RouterLink></li><li><RouterLink to="#_3-旋转坐标">[3]旋转坐标</RouterLink></li><li><RouterLink to="#_4-动画">[4]动画</RouterLink></li><li><RouterLink to="#_5-阴影修复">[5]阴影修复</RouterLink></li><li><RouterLink to="#_6-法向修复">[6]法向修复</RouterLink></li></ul></nav>
<p>通常我们是通过修改扩展three.js内置的材质来实现一些复杂的效果的，而不是使用shaderMaterial材质从零开始实现。比如说很满意<code>MeshStandardMaterial</code>（一种常规材质）的效果，但是我们希望在这个材质上添加一些顶点动画。如果我们打算从头开始写一个全新的<code>MeshStandardMaterial</code>，处理灯光、环境图、物理渲染、各种纹理等等就会耗费我们大量的时间。
有两种常见的方式可以修改着色器：</p>
<ol>
<li>通过使用一个Three.js提供的“钩子”函数，在着色器编译之前改动着色器并插入我们的代码。</li>
<li>新建一个全新的材质，先复现原来的材质的功能效果，然后再添加一个我们自己需要的效果</li>
</ol>
<p>很明显第二种方式一般情况下并不太适合，因为需要花费的时间比较多</p>
<h2 id="_1-获取材质的着色器" tabindex="-1"><a class="header-anchor" href="#_1-获取材质的着色器" aria-hidden="true">#</a> [1]获取材质的着色器</h2>
<p>要修改内置材质的着色器带啊吗，首先需要访问获取到相应的着色器，要获取着色器等信息我们可以调用材质的onBeforeCompile方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Material</span>
<span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshStandardMaterial</span><span class="token punctuation">(</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">map</span><span class="token operator">:</span> mapTexture<span class="token punctuation">,</span>
    <span class="token literal-property property">normalMap</span><span class="token operator">:</span> normalTexture
<span class="token punctuation">}</span><span class="token punctuation">)</span>
material<span class="token punctuation">.</span><span class="token function-variable function">onBeforeCompile</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">shader</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>shader<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/d72ca8967a8442cbb7bf30c1d4a2c3ac.png" alt="在这里插入图片描述"></p>
<p><img src="https://img-blog.csdnimg.cn/ae316a3f53354ac8a2f7ee6beffaa794.png" alt="在这里插入图片描述"></p>
<h2 id="_2-向顶点着色器中添加内容" tabindex="-1"><a class="header-anchor" href="#_2-向顶点着色器中添加内容" aria-hidden="true">#</a> [2]向顶点着色器中添加内容</h2>
<p>先打印看看原始材质的顶点着色器的内容：</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STANDARD</span></span>
<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vViewPosition<span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">USE_TRANSMISSION</span></span>
	<span class="token keyword">varying</span> <span class="token keyword">vec3</span> vWorldPosition<span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;common></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;uv_pars_vertex></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;uv2_pars_vertex></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;displacementmap_pars_vertex></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;color_pars_vertex></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fog_pars_vertex></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;normal_pars_vertex></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;morphtarget_pars_vertex></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;skinning_pars_vertex></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;shadowmap_pars_vertex></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;logdepthbuf_pars_vertex></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;clipping_planes_pars_vertex></span></span>
<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;uv_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;uv2_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;color_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;beginnormal_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;morphnormal_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;skinbase_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;skinnormal_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;defaultnormal_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;normal_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;begin_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;morphtarget_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;skinning_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;displacementmap_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;project_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;logdepthbuf_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;clipping_planes_vertex></span></span>
	vViewPosition <span class="token operator">=</span> <span class="token operator">-</span> mvPosition<span class="token punctuation">.</span>xyz<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;worldpos_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;shadowmap_vertex></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fog_vertex></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">USE_TRANSMISSION</span></span>
	vWorldPosition <span class="token operator">=</span> worldPosition<span class="token punctuation">.</span>xyz<span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p>并没有太多的代码，这是因为three.js对大部分着色器可复用的代码进行了封装，以防止在不同材质之间重复相同的代码。每个都将 #include ... 注入位于 Three.js依赖项的特定文件夹中的代码。
也就是说我们好些就可以直接使用JavaScript的replace方法直接替换掉其中的代码了
但是我们不知道哪个部分在做什么以及要替换哪个部分。为了理解代码，我们需要深入研究 <code>three</code> 依赖关系。
为此，我们可以看看<code>/node_modules/three/src/renderers/shaders/</code> 文件夹，这里可以找到大多数three.js着色器代码
<img src="https://img-blog.csdnimg.cn/d9b82cfc1ed443d9bef38743d359067d.png" alt="在这里插入图片描述"></p>
<p>再上面的顶点着色器中包含内容都称为块(chunk），都可以在<code>ShaderChunk/</code> 文件夹中找到它们，然后更加可以按照上面打印的材质的着色器代码大概读一些相应的chunk，或者按照你的想法，去读和修改就行。
比如我想对通过修改顶点着色器修改模型的y坐标，经过阅读原有的chunk后发现#include &lt;begin_vertex&gt;这个块里面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token comment">/* glsl */</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
vec3 transformed = vec3( position );
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>那我直接替换大法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshStandardMaterial</span><span class="token punctuation">(</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">map</span><span class="token operator">:</span> mapTexture<span class="token punctuation">,</span>
    <span class="token literal-property property">normalMap</span><span class="token operator">:</span> normalTexture
<span class="token punctuation">}</span><span class="token punctuation">)</span>

material<span class="token punctuation">.</span><span class="token function-variable function">onBeforeCompile</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">shader</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    shader<span class="token punctuation">.</span>vertexShader <span class="token operator">=</span> shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token string">'#include &lt;begin_vertex>'</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        #include &lt;begin_vertex>
        
        transformed.y += 3.0;
        </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>然后看这个打印的代码：
<img src="https://img-blog.csdnimg.cn/d2acd8e65d85405b8e538d8a8eb0a0d8.png" alt="在这里插入图片描述"></p>
<h2 id="_3-旋转坐标" tabindex="-1"><a class="header-anchor" href="#_3-旋转坐标" aria-hidden="true">#</a> [3]旋转坐标</h2>
<p>这里实验一下添加一个2D旋转矩阵（相关内容可参考<a href="https://thebookofshaders.com/08/" target="_blank" rel="noopener noreferrer">The Book of Shaders</a>），根据输入的角度返回一个循环矩阵，然后将这个矩阵应用到模型坐标中；
按照前面的思想，我们先创建一个旋转矩阵函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>mat2 <span class="token function">get2dRotateMatrix</span><span class="token punctuation">(</span><span class="token parameter">float _angle</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">mat2</span><span class="token punctuation">(</span><span class="token function">cos</span><span class="token punctuation">(</span>_angle<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">-</span> <span class="token function">sin</span><span class="token punctuation">(</span>_angle<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">sin</span><span class="token punctuation">(</span>_angle<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cos</span><span class="token punctuation">(</span>_angle<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>那么该将这个函数添加到那个chunk中呢？如果是我们之际编写的着色器，我们会把它放到main函数前面即可 ，那么看看有没有chunk，这里有个<code>'#include &lt;common&gt;'</code>chunk可以替换放置。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>material<span class="token punctuation">.</span><span class="token function-variable function">onBeforeCompile</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">shader</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    shader<span class="token punctuation">.</span>vertexShader <span class="token operator">=</span> shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token string">'#include &lt;common>'</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        #include &lt;common>

        mat2 get2dRotateMatrix(float _angle){
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
        </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>放置好后就可以在其他chunk中调用了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>material<span class="token punctuation">.</span><span class="token function-variable function">onBeforeCompile</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">shader</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    shader<span class="token punctuation">.</span>vertexShader <span class="token operator">=</span> shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token string">'#include &lt;common>'</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        #include &lt;common>

        mat2 get2dRotateMatrix(float _angle){
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
        </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>

    shader<span class="token punctuation">.</span>vertexShader <span class="token operator">=</span> shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token string">'#include &lt;begin_vertex>'</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        #include &lt;begin_vertex>
        float angle = position.y * 0.9;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        transformed.xz = rotateMatrix * transformed.xz;
        </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="_4-动画" tabindex="-1"><a class="header-anchor" href="#_4-动画" aria-hidden="true">#</a> [4]动画</h2>
<p>也可以通过onBeforeCompile钩子函数传递要给uniform时间变量过去片段着色器，以实现动画效果</p>
<blockquote>
<p>需要注意的是，这里不同shaderMaterial，不能将实时的时间通过如下方式传递<code>material.uniforms.uTime.value = elapsedTime</code>，而是向下面那样</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> customUniforms <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">uTime</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

material<span class="token punctuation">.</span><span class="token function-variable function">onBeforeCompile</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">shader</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    shader<span class="token punctuation">.</span>uniforms<span class="token punctuation">.</span>uTime <span class="token operator">=</span> customUniforms<span class="token punctuation">.</span>uTime
    shader<span class="token punctuation">.</span>vertexShader <span class="token operator">=</span> shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token string">'#include &lt;common>'</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        #include &lt;common>
        uniform float uTime;

        mat2 get2dRotateMatrix(float _angle){
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
        </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>

    shader<span class="token punctuation">.</span>vertexShader <span class="token operator">=</span> shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token string">'#include &lt;begin_vertex>'</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        #include &lt;begin_vertex>
        float angle = (position.y + uTime) * 0.9;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        transformed.xz = rotateMatrix * transformed.xz;
        </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token comment">//。。。</span>
<span class="token doc-comment comment">/**
 * Animate
 */</span>
<span class="token keyword">const</span> clock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Clock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">tick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
    <span class="token keyword">const</span> elapsedTime <span class="token operator">=</span> clock<span class="token punctuation">.</span><span class="token function">getElapsedTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// Update material</span>
    customUniforms<span class="token punctuation">.</span>uTime<span class="token punctuation">.</span>value <span class="token operator">=</span> elapsedTime

    <span class="token comment">// Update controls</span>
    controls<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Render</span>
    renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span>

    <span class="token comment">// Call tick again on the next frame</span>
    window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>tick<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div><h2 id="_5-阴影修复" tabindex="-1"><a class="header-anchor" href="#_5-阴影修复" aria-hidden="true">#</a> [5]阴影修复</h2>
<p>当我们使用上面的方式对模型的顶点坐标进行变换后，如果你设置了阴影你会发现阴影的形状等并没有发生改变，这是因为
当我们使用阴影时，Three.js会从光源的视角对场景进行渲染。这些渲染结果会生成关于哪些部分在阴影中，哪些部分在光线下的图片。当这些渲染发生时，所有的材质都会被替换成另一套专门用于这种特定渲染的材质。问题在于，这种材质不会随我们变化后的材质变化而变化，因为它与我们修改过的MeshStandardMaterial没有任何关系
<img src="https://img-blog.csdnimg.cn/d6efb92abe4f446aab0808105475aca8.png" alt="在这里插入图片描述"></p>
<p>要解决这个问题，我们需要找到一种方式来同时改变这个特定的material
用于阴影的材质是 <a href="https://threejs.org/docs/#api/en/materials/MeshDepthMaterial" target="_blank" rel="noopener noreferrer">MeshDepthMaterial</a>，要访问该材质并不容易，但是我们可以使用mesh的<code>customDepthMaterial</code>属性来覆盖它，以便告诉 Three.js 使用自定义材质
具体代码的做简单，只需要在加载后面后对每个mesh应用<code>customDepthMaterial</code>属性即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//创建一个此自定义材质，这里使用MeshDepthMaterial，因为这正是Three.js在这些渲染过程中使用的</span>
<span class="token keyword">const</span> depthMaterial <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshDepthMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">depthPacking</span><span class="token operator">:</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>RGBADepthPacking
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token doc-comment comment">/**
 * Models
 */</span>
gltfLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>
    <span class="token string">'/models/LeePerrySmith/LeePerrySmith.glb'</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token parameter">gltf</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token comment">// Model</span>
        <span class="token keyword">const</span> mesh <span class="token operator">=</span> gltf<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        mesh<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">0.5</span>
        mesh<span class="token punctuation">.</span>material <span class="token operator">=</span> material
        mesh<span class="token punctuation">.</span>customDepthMaterial <span class="token operator">=</span> depthMaterial <span class="token comment">// Update the depth material</span>
        scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>mesh<span class="token punctuation">)</span>

        <span class="token function">updateAllMaterials</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token comment">//同时也需要对改材质进行同样的操作</span>
depthMaterial<span class="token punctuation">.</span><span class="token function-variable function">onBeforeCompile</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">shader</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    shader<span class="token punctuation">.</span>uniforms<span class="token punctuation">.</span>uTime <span class="token operator">=</span> customUniforms<span class="token punctuation">.</span>uTime
    shader<span class="token punctuation">.</span>vertexShader <span class="token operator">=</span> shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token string">'#include &lt;common>'</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        #include &lt;common>

        uniform float uTime;

        mat2 get2dRotateMatrix(float _angle)
        {
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
        </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>
    shader<span class="token punctuation">.</span>vertexShader <span class="token operator">=</span> shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token string">'#include &lt;begin_vertex>'</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        #include &lt;begin_vertex>

        float angle = (position.y + uTime) * 0.9;
        mat2 rotateMatrix = get2dRotateMatrix(angle);

        transformed.xz = rotateMatrix * transformed.xz;
        </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/83af9de916f14d90b04aea8d7913d1c3.png" alt="在这里插入图片描述"></p>
<h2 id="_6-法向修复" tabindex="-1"><a class="header-anchor" href="#_6-法向修复" aria-hidden="true">#</a> [6]法向修复</h2>
<p>上面的进行阴影修复后其实还有个问题，那个阴影会随着顶点的旋转而旋转。这是一个与法线有关的问题。
因为法线是与每个顶点相关联的坐标，用于获取面朝向的方向。通过用于光照、反射和阴影等相关的内容
而当我们旋转顶点时，我们只是旋转位置，但我们没有旋转法线。我们需要修改处理法线的chunk
通过查找法线处理法线的chunk为<code>beginnormal_vertex</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token comment">/* glsl */</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

    vec3 objectTangent = vec3( tangent.xyz );

#endif
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>然后对顶点法线和顶点做同样的变换即可：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>depthMaterial<span class="token punctuation">.</span><span class="token function-variable function">onBeforeCompile</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">shader</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    shader<span class="token punctuation">.</span>uniforms<span class="token punctuation">.</span>uTime <span class="token operator">=</span> customUniforms<span class="token punctuation">.</span>uTime
    shader<span class="token punctuation">.</span>vertexShader <span class="token operator">=</span> shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token string">'#include &lt;common>'</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        #include &lt;common>

        uniform float uTime;

        mat2 get2dRotateMatrix(float _angle){
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
        </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>
    shader<span class="token punctuation">.</span>vertexShader <span class="token operator">=</span> shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token string">'#include &lt;beginnormal_vertex>'</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        #include &lt;beginnormal_vertex>
        
        float angle = (position.y + uTime) * 0.9;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        
        objectNormal.xz = rotateMatrix * objectNormal.xz;
        </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>
    shader<span class="token punctuation">.</span>vertexShader <span class="token operator">=</span> shader<span class="token punctuation">.</span>vertexShader<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token string">'#include &lt;begin_vertex>'</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        #include &lt;begin_vertex>
        float angle = (position.y + uTime) * 0.9;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        transformed.xz = rotateMatrix * transformed.xz;
        </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><blockquote>
<p>注意这块，有些版本是不支持上面的写法的，需要对一些语句去重，因为最后是将上的着色器代码合并到一块的，如果有重复语句会报错，但是在新的版本中则不会。</p>
</blockquote>
</template>
