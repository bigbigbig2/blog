<template><p>通常我们都希望渲染出更逼真的效果，有许多技术来改善模型在 Three.js 中渲染后的外观。但请注意，其中一些技术可能会影响性能，而某些技术则取决于您的模型。你必须根据情况进行调整。</p>
<blockquote>
<p>本文部分内容为Three.js Journey课程的学习笔记</p>
</blockquote>
<p>这里将采用使用了纹理、法线贴图等的逼真的模型。我们将使用 GLTF 示例模型存储库（<a href="https://github.com/KhronosGroup/glTF-Sample-Models" target="_blank" rel="noopener noreferrer">GLTF Sample Models repository</a>）中的飞行头盔（<a href="https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/FlightHelmet" target="_blank" rel="noopener noreferrer">Flight Helmet</a>）
初始代码框架：</p>
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
 * Test sphere
 */</span>
<span class="token keyword">const</span> testSphere <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>SphereGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshStandardMaterial</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//标准网格材质</span>
<span class="token punctuation">)</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>testSphere<span class="token punctuation">)</span>

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
<span class="token comment">// Base camera</span>
<span class="token keyword">const</span> camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>PerspectiveCamera</span><span class="token punctuation">(</span><span class="token number">75</span><span class="token punctuation">,</span> sizes<span class="token punctuation">.</span>width <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">,</span> <span class="token number">0.1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span> <span class="token number">4</span><span class="token punctuation">)</span>
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
<span class="token keyword">const</span> <span class="token function-variable function">tick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
  <span class="token punctuation">{</span>
    <span class="token comment">// Update controls</span>
    controls<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Render</span>
    renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span>

    <span class="token comment">// Call tick again on the next frame</span>
    window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>tick<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

<span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br></div></div><h2 id="_1-light" tabindex="-1"><a class="header-anchor" href="#_1-light" aria-hidden="true">#</a> [1]light</h2>
<p>这里将只使用一个方向光，尽管只采用要给方向光光源是无法实现逼真的渲染效果的，不过这里可以采用环境贴图来代替实现一些复杂的光照效果，但为了阴影的实现，还是最好创建一个方向光。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> directionalLight <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>DirectionalLight</span><span class="token punctuation">(</span><span class="token string">'#ffffff'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
directionalLight<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">0.25</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span> <span class="token number">2.25</span><span class="token punctuation">)</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/c1d936c5d1deb567cc2c85f05fdfb97f.png#averageHue=#060606&amp;clientId=u526bf3fc-28c7-4&amp;from=paste&amp;height=391&amp;id=uac61539b&amp;originHeight=649&amp;originWidth=1109&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=14720&amp;status=done&amp;style=none&amp;taskId=uee13743b-a410-4696-8357-362535bdcb1&amp;title=&amp;width=668.2000122070312" alt="image.png">
顺便添加一些gui选项：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Base
 */</span>
<span class="token comment">// Debug</span>
<span class="token keyword">const</span> gui <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">dat<span class="token punctuation">.</span>GUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">,</span> <span class="token string">'intensity'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">'lightIntensity'</span><span class="token punctuation">)</span>
gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">.</span>position<span class="token punctuation">,</span> <span class="token string">'x'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">'lightX'</span><span class="token punctuation">)</span>
gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">.</span>position<span class="token punctuation">,</span> <span class="token string">'y'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">'lightY'</span><span class="token punctuation">)</span>
gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">.</span>position<span class="token punctuation">,</span> <span class="token string">'z'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">'lightZ'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>默认的THREE.js 光强度intensity值并不真实，它们基于任意比例单位，不反映实际值
要将 Three.js 光源更改为更真实的值，请将 WebGLRenderer 实例的属性 physicallyCorrectLights改为 true ：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>renderer<span class="token punctuation">.</span>physicallyCorrectLights <span class="token operator">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>好多了：
<img src="https://img-blog.csdnimg.cn/img_convert/ec7e6e073e003f367c8cfd81c816af82.png#averageHue=#030303&amp;clientId=u526bf3fc-28c7-4&amp;from=paste&amp;height=473&amp;id=udd67a6fe&amp;originHeight=775&amp;originWidth=1130&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=19472&amp;status=done&amp;style=none&amp;taskId=u6e857d67-088b-432b-8fb3-87348aaad3e&amp;title=&amp;width=689" alt="image.png"></p>
<h2 id="_2-model" tabindex="-1"><a class="header-anchor" href="#_2-model" aria-hidden="true">#</a> [2]model</h2>
<p>这里加载一个three示例中模型进行实验</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> GLTFLoader <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'three/examples/jsm/loaders/GLTFLoader.js'</span>

<span class="token comment">// ...</span>

<span class="token doc-comment comment">/**
* Loaders
*/</span>
<span class="token keyword">const</span> gltfLoader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GLTFLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token doc-comment comment">/**
* Models
*/</span>
gltfLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>
  <span class="token string">'/models/FlightHelmet/glTF/FlightHelmet.gltf'</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">gltf</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gltf<span class="token punctuation">)</span>
  gltf<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>scale<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
  gltf<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
  gltf<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">0.5</span>
  scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>gltf<span class="token punctuation">.</span>scene<span class="token punctuation">)</span> <span class="token comment">//由于这是一个复杂的模型，因此我们只需将 gltf.scene 组添加到我们自己的场景中</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/8de8a1f081fd5719e80abe59de33f7cb.png#averageHue=#060403&amp;clientId=u526bf3fc-28c7-4&amp;from=paste&amp;height=529&amp;id=u4e9a4916&amp;originHeight=795&amp;originWidth=1135&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=175378&amp;status=done&amp;style=none&amp;taskId=u6fba59cf-0778-44f0-8062-66deab675d6&amp;title=&amp;width=755" alt="image.png"></p>
<h2 id="_3-environment-map" tabindex="-1"><a class="header-anchor" href="#_3-environment-map" aria-hidden="true">#</a> [3]Environment map</h2>
<p>加载一个环境贴图（天空盒），因为这些纹理由 6 张图像（一个立方体）组成，所以我们必须使用<a href="https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader" target="_blank" rel="noopener noreferrer">CubeTextureLoader</a>
注意加载顺序为：
<code>positive x</code>, <code>negative x</code>, <code>positive y,</code> <code>negative y</code>, <code>positive z</code>,  <code>negative z</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> cubeTextureLoader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>CubeTextureLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token doc-comment comment">/**
* Environment map
*/</span>
<span class="token keyword">const</span> environmentMap <span class="token operator">=</span> cubeTextureLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token string">'/textures/environmentMaps/0/px.jpg'</span><span class="token punctuation">,</span>
    <span class="token string">'/textures/environmentMaps/0/nx.jpg'</span><span class="token punctuation">,</span>
    <span class="token string">'/textures/environmentMaps/0/py.jpg'</span><span class="token punctuation">,</span>
    <span class="token string">'/textures/environmentMaps/0/ny.jpg'</span><span class="token punctuation">,</span>
    <span class="token string">'/textures/environmentMaps/0/pz.jpg'</span><span class="token punctuation">,</span>
    <span class="token string">'/textures/environmentMaps/0/nz.jpg'</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">//应用</span>
scene<span class="token punctuation">.</span>background <span class="token operator">=</span> environmentMap
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>加载后并就开始将环境映射应用于模型：
环境贴图描述了物体周围的环境光照情况，可以用来增强物体的真实感和立体感
可以通过envMap 属性将环境映射应用于网格标准材料，但是我们的模型是许多的网格组成的，需要分别为每个网格的材质设定envMap属性。我们可使用每个 Object3D 上可用的 traverse(...) 方法来添加</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
* Update all materials
*/</span>
<span class="token keyword">const</span> <span class="token function-variable function">updateAllMaterials</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    scene<span class="token punctuation">.</span><span class="token function">traverse</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">child</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>child <span class="token keyword">instanceof</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span> <span class="token operator">&amp;&amp;</span> child<span class="token punctuation">.</span>material <span class="token keyword">instanceof</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshStandardMaterial</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
            child<span class="token punctuation">.</span>material<span class="token punctuation">.</span>envMap <span class="token operator">=</span> environmentMap
            child<span class="token punctuation">.</span>material<span class="token punctuation">.</span>envMapIntensity <span class="token operator">=</span> <span class="token number">2.5</span>  <span class="token comment">//增加强度</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/2530d580c69fbe72ab24de7f815dd967.png#averageHue=#fdfaf8&amp;clientId=u526bf3fc-28c7-4&amp;from=paste&amp;height=268&amp;id=uaa915a01&amp;originHeight=409&amp;originWidth=1048&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=69119&amp;status=done&amp;style=none&amp;taskId=ud28a3b17-66be-4238-a435-891601d7864&amp;title=&amp;width=686.4000244140625" alt="image.png">
在模型加载回调中调用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>gltfLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>
    <span class="token string">'/models/FlightHelmet/glTF/FlightHelmet.gltf'</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token parameter">gltf</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    gltf<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>scale<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
    gltf<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    gltf<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">0.5</span>
    scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>gltf<span class="token punctuation">.</span>scene<span class="token punctuation">)</span>
    <span class="token function">updateAllMaterials</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>gltf<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>rotation<span class="token punctuation">,</span> <span class="token string">'y'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token operator">-</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">'rotation'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>还可以将这个envMapIntensity添加到dat.gui上：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> debugObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">updateAllMaterials</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
<span class="token comment">// ...</span>
child<span class="token punctuation">.</span>material<span class="token punctuation">.</span>envMapIntensity <span class="token operator">=</span> debugObject<span class="token punctuation">.</span>envMapIntensity
<span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">// ...</span>

debugObject<span class="token punctuation">.</span>envMapIntensity <span class="token operator">=</span> <span class="token number">2.5</span>
gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>debugObject<span class="token punctuation">,</span> <span class="token string">'envMapIntensity'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">onChange</span><span class="token punctuation">(</span>updateAllMaterials<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/9e21061eb676d7181176a2620664dbd9.png#averageHue=#564532&amp;clientId=u526bf3fc-28c7-4&amp;from=paste&amp;height=518&amp;id=u9401e4e8&amp;originHeight=1089&amp;originWidth=1476&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=1812362&amp;status=done&amp;style=none&amp;taskId=u965c3a78-dda3-420e-8aa8-1c083dd05a3&amp;title=&amp;width=701.7999877929688" alt="image.png"></p>
<h2 id="_4-将环境映射应用为默认值" tabindex="-1"><a class="header-anchor" href="#_4-将环境映射应用为默认值" aria-hidden="true">#</a> [4]将环境映射应用为默认值</h2>
<p>可以通过直接给scene的environment赋值环境环境贴图，这一就不需要通过traverse遍历每一个对象的material去添加envMap属性，</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code>scene<span class="token punctuation">.</span>environment <span class="token operator">=</span> environmentMap
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>设置场景中所有物理材质的环境贴图。但是，无法覆盖分配给 <code>MeshStandardMaterial.envMap</code> 的现有纹理。默认为 <code>null</code>
但是这样设置并不能修改像上面一样修改环境贴图强度</p>
<h2 id="_5-render" tabindex="-1"><a class="header-anchor" href="#_5-render" aria-hidden="true">#</a> [5]render</h2>
<h3 id="output-encoding" tabindex="-1"><a class="header-anchor" href="#output-encoding" aria-hidden="true">#</a> Output encoding</h3>
<p>在不涉及太多细节的情况下，该 <code>outputEncoding</code> 属性控制输出呈现编码。默认情况下其属性为<code>THREE.LinearEncoding</code>，设定为该值并不够逼真
建议 <code>outputEncoding</code> 的值为 <code>THREE.sRGBEncoding</code> ：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>renderer<span class="token punctuation">.</span>outputEncoding <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>sRGBEncoding
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/b47cabf2b3102a93f49ee186447826b3.png#averageHue=#837363&amp;clientId=u526bf3fc-28c7-4&amp;from=paste&amp;height=594&amp;id=u2a1d2b45&amp;originHeight=1272&amp;originWidth=1490&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=2604625&amp;status=done&amp;style=none&amp;taskId=ud8591f13-5b44-47a3-b64c-91d559dff55&amp;title=&amp;width=696" alt="image.png">
还有一种输出编码为THREE.GammaEncoding，这种编码的优点是让你玩一个叫做 gammaFactor 的值，这个值的作用有点像亮度
Gamma编码是一种存储颜色的方法，同时根据人眼灵敏度优化明亮值和暗值的存储方式。当我们使用 sRGBEncoding 时，就像使用 默认 GammaEncoding 伽马因子 2.2 ，这是通用值。</p>
<h3 id="textures-encoding" tabindex="-1"><a class="header-anchor" href="#textures-encoding" aria-hidden="true">#</a> Textures encoding</h3>
<p>其实环境纹理贴图还有地方继续优化，使其效果更令人满意
当我们设定输出编码为<code>THREE.sRGBEncoding</code>时，换纹理贴图的编码还是默认值<code>THREE.LinearEncoding</code>
规则很简单。我们可以直接看到的所有纹理——比如map——应该使用 <code>THREE.sRGBEncoding</code> 作为编码，而所有其他纹理——比如 normalMap——应该使用 THREE.LinearEncoding。
我们可以直接看到 <code>environmentMap</code> 纹理，所以我们必须改变它的编码为 <code>THREE.sRGBEncoding</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>environmentMap<span class="token punctuation">.</span>encoding <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>sRGBEncoding
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p>模型的纹理中GLTFLoader， 已经实现了这个规则，从中加载的所有纹理都会自动拥有正确的编码。</p>
</blockquote>
<p>添加前后的对比：
<img src="https://img-blog.csdnimg.cn/img_convert/6b6335029ad35b7d61fed33b63492ae4.png#averageHue=#70604f&amp;clientId=u526bf3fc-28c7-4&amp;from=paste&amp;height=590&amp;id=u43da95dd&amp;originHeight=738&amp;originWidth=1760&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=1906433&amp;status=done&amp;style=none&amp;taskId=u0fbd90e4-40ea-4416-88c9-bc396bbb7db&amp;title=&amp;width=1408" alt="image.png"></p>
<h3 id="色调映射" tabindex="-1"><a class="header-anchor" href="#色调映射" aria-hidden="true">#</a> 色调映射</h3>
<p>色调映射的目的是将高动态范围（HDR）值转换为低动态范围（LDR）值。 HDR 的含义远超下面的解释，但你可以把它看成是色彩值可以超过1的图像。如果我们想存储光线信息，这是很有用的，因为光线没有强度限制。
虽然我们的资源不是HDR，但色调映射效果可能会像摄像机调节得不太好一样，产生逼真的结果。
其实就有点类似于滤镜效果
要改变色调映射，更新 <code>WebGLRenderer</code> 上的 <code>toneMapping</code> 属性：</p>
<ul>
<li><code>THREE.NoToneMapping </code></li>
<li><code>THREE.LinearToneMapping</code></li>
<li><code>THREE.ReinhardToneMapping</code></li>
<li><code>THREE.CineonToneMapping</code></li>
<li><code>THREE.ACESFilmicToneMapping</code></li>
</ul>
<p>可以挨个测试这些色调映射的效果来选择满意的一个</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>renderer<span class="token punctuation">.</span>toneMapping <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>ACESFilmicToneMapping
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>也可以通过dat.gui来添加与option</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>renderer<span class="token punctuation">,</span> <span class="token string">'toneMapping'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">No</span><span class="token operator">:</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>NoToneMapping<span class="token punctuation">,</span>
  <span class="token literal-property property">Linear</span><span class="token operator">:</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>LinearToneMapping<span class="token punctuation">,</span>
  <span class="token literal-property property">Reinhard</span><span class="token operator">:</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>ReinhardToneMapping<span class="token punctuation">,</span>
  <span class="token literal-property property">Cineon</span><span class="token operator">:</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>CineonToneMapping<span class="token punctuation">,</span>
  <span class="token literal-property property">ACESFilmic</span><span class="token operator">:</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>ACESFilmicToneMapping
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">onFinishChange</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
renderer<span class="token punctuation">.</span>toneMapping <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span>renderer<span class="token punctuation">.</span>toneMapping<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>在更改色调映射时如果你仔细观察，你会发现背景中环境贴图的色调映射发生了变化，但模型本身却没有改变。如果要使模型的材质也发生变化需要上面发生改变的回调中添加上<code>updateAllMaterials()</code>材质更新函数
还可以改变色调的曝光度：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>renderer<span class="token punctuation">.</span>toneMappingExposure <span class="token operator">=</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>添加到dat.gui中：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>renderer<span class="token punctuation">,</span> <span class="token string">'toneMappingExposure'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_6-抗锯齿" tabindex="-1"><a class="header-anchor" href="#_6-抗锯齿" aria-hidden="true">#</a> [6]抗锯齿</h2>
<p>锯齿是一个众所周知的问题。当像素的渲染发生时，它会测试正在该像素上渲染的是哪个几何体。它计算颜色，最后，这个颜色就出现在屏幕上。
但几何边缘通常不会完美地与你的屏幕的垂直线和水平线对齐，这就是你会得到这种叫做赫萨效应的阶梯状人为产物的原因。
有许多解决这个问题的方法，开发者已经为此苦苦挣扎了许多年。
<img src="https://img-blog.csdnimg.cn/img_convert/48b3b57061f62573b31ff26963252a0b.jpeg#averageHue=#746258&amp;clientId=u526bf3fc-28c7-4&amp;from=paste&amp;height=245&amp;id=u6f01f4c1&amp;originHeight=1032&amp;originWidth=3592&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=86663&amp;status=done&amp;style=none&amp;taskId=u354e1d36-8c7e-4190-ab53-595b9e404fa&amp;title=&amp;width=854.4000244140625" alt="antialias-2.jpg">
一个简单的解决方案是提高我们的渲染分辨率，比如说加倍。当调整到正常大小时，每个像素颜色将自动从渲染的4个像素平均得出。
这种解决方案称为超采样（SSAA）或全屏采样（FSAA），它是最简单也是最有效的解决方案。不幸的是，这意味着需要渲染4倍更多的像素，这可能会导致性能问题。
另一个解决方案叫做多重采样（MSAA）。再次，该想法是每个像素渲染多个值（通常为4），就像超采样那样，但只在几何体的边缘。然后平均像素的值以得到最终的像素值。
最新的GPU可以执行这种多重采样抗赫萨效应，Three.js 会自动处理设置。我们只需要在实例化过程中——而不是之后——将抗赫萨属性改为 true：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>WebGLRenderer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token literal-property property">canvas</span><span class="token operator">:</span> canvas<span class="token punctuation">,</span>
<span class="token literal-property property">antialias</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>使用抗赫萨会消耗一些资源。如我们前面所说，像素比率高于1的屏幕实际上不需要抗赫萨。一个正确的做法是只为像素比率低于2的屏幕启用它。</p>
<h2 id="_7-shadows" tabindex="-1"><a class="header-anchor" href="#_7-shadows" aria-hidden="true">#</a> [7]Shadows</h2>
<p>为了得到逼真的渲染，最后一步是添加阴影。首先，打开 WebGLRenderer 的阴影。然后将阴影类型改为 THREE.PCFSoftShadowMap：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>renderer<span class="token punctuation">.</span>shadowMap<span class="token punctuation">.</span>enabled <span class="token operator">=</span> <span class="token boolean">true</span>
renderer<span class="token punctuation">.</span>shadowMap<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>PCFSoftShadowMap
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>还有方向光的阴影投射属性：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>directionalLight<span class="token punctuation">.</span>castShadow <span class="token operator">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>由于我们想要逼真而精确的阴影，并且因为我们只有一个光源，我们可以增加阴影贴图的大小， 1024x1024 而不必担心帧速率下降。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>directionalLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>mapSize<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>最后，我们可以激活模型所有网格体上的阴影。由于我们已经遍历 <code>updateAllMaterials</code> 了函数中的场景，让我们简单地激活 <code>castShadow、receiveShadow</code> 所有子项</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">updateAllMaterials</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
scene<span class="token punctuation">.</span><span class="token function">traverse</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">child</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>child <span class="token keyword">instanceof</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span> <span class="token operator">&amp;&amp;</span> child<span class="token punctuation">.</span>material <span class="token keyword">instanceof</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshStandardMaterial</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token comment">// ...</span>

child<span class="token punctuation">.</span>castShadow <span class="token operator">=</span> <span class="token boolean">true</span>
child<span class="token punctuation">.</span>receiveShadow <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></template>
