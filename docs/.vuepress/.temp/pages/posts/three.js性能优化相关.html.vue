<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-性能监测">[1]性能监测</RouterLink><ul><li><RouterLink to="#检测fps">检测FPS</RouterLink></li><li><RouterLink to="#禁用-fps-限制">禁用 FPS 限制</RouterLink></li><li><RouterLink to="#监视绘制调用">监视绘制调用</RouterLink></li></ul></li><li><RouterLink to="#渲染信息">渲染信息</RouterLink></li><li><RouterLink to="#_2-销毁">[2]销毁</RouterLink></li><li><RouterLink to="#_3-灯光">[3]灯光</RouterLink></li><li><RouterLink to="#_4-阴影">[4]阴影</RouterLink></li><li><RouterLink to="#_5-合理的使用castshadow和shadow">[5]合理的使用castShadow和Shadow</RouterLink></li><li><RouterLink to="#_6-关闭阴影自动更新">[6]关闭阴影自动更新</RouterLink></li><li><RouterLink to="#_7-textures">[7]Textures</RouterLink><ul><li><RouterLink to="#调整纹理大小">调整纹理大小</RouterLink></li><li><RouterLink to="#保存2次方的分辨率">保存2次方的分辨率</RouterLink></li><li><RouterLink to="#使用正确的格式">使用正确的格式</RouterLink></li></ul></li><li><RouterLink to="#_8-geometries">[8]Geometries</RouterLink><ul><li><RouterLink to="#使用缓冲区几何图形">使用缓冲区几何图形</RouterLink></li><li><RouterLink to="#不更新顶点">不更新顶点</RouterLink></li><li><RouterLink to="#共用几何图形">共用几何图形</RouterLink></li><li><RouterLink to="#合并几何图形">合并几何图形</RouterLink></li></ul></li><li><RouterLink to="#_9-materials">[9]Materials</RouterLink><ul><li><RouterLink to="#共用材质">共用材质</RouterLink></li><li><RouterLink to="#使用简单的材质">使用简单的材质</RouterLink></li></ul></li><li><RouterLink to="#_10-mesh">[10]mesh</RouterLink><ul><li><RouterLink to="#使用实例化网格">使用实例化网格</RouterLink></li></ul></li><li><RouterLink to="#_11-模型">[11]模型</RouterLink><ul><li><RouterLink to="#draco压缩">Draco压缩</RouterLink></li><li><RouterLink to="#gzip">Gzip</RouterLink></li></ul></li><li><RouterLink to="#_12-相机">[12]相机</RouterLink><ul><li><RouterLink to="#视野">视野</RouterLink></li><li><RouterLink to="#near-and-far">Near and far</RouterLink></li></ul></li><li><RouterLink to="#_13-render">[13]render</RouterLink><ul><li><RouterLink to="#像素比">像素比</RouterLink></li><li><RouterLink to="#电源选项">电源选项</RouterLink></li><li><RouterLink to="#抗锯齿">抗锯齿</RouterLink></li></ul></li><li><RouterLink to="#_14-后处理">[14]后处理</RouterLink><ul><li><RouterLink to="#限制通道数">限制通道数</RouterLink></li></ul></li><li><RouterLink to="#_15-shader">[15]shader</RouterLink><ul><li><RouterLink to="#指定精度">指定精度</RouterLink></li><li><RouterLink to="#使用优雅的代码">使用优雅的代码</RouterLink></li><li><RouterLink to="#使用纹理">使用纹理</RouterLink></li><li><RouterLink to="#使用defines">使用defines</RouterLink></li><li><RouterLink to="#在顶点着色器重进行运算">在顶点着色器重进行运算</RouterLink></li></ul></li></ul></nav>
<h2 id="_1-性能监测" tabindex="-1"><a class="header-anchor" href="#_1-性能监测" aria-hidden="true">#</a> [1]性能监测</h2>
<h3 id="检测fps" tabindex="-1"><a class="header-anchor" href="#检测fps" aria-hidden="true">#</a> 检测FPS</h3>
<p>使用stats，这里就不过多说明了</p>
<h3 id="禁用-fps-限制" tabindex="-1"><a class="header-anchor" href="#禁用-fps-限制" aria-hidden="true">#</a> 禁用 FPS 限制</h3>
<h3 id="监视绘制调用" tabindex="-1"><a class="header-anchor" href="#监视绘制调用" aria-hidden="true">#</a> 监视绘制调用</h3>
<p>绘制调用是 GPU 绘制三角形的操作。当我们有一个包含许多对象、几何体、材质等的复杂场景时，会有很多绘制调用。
通常我们可以通过见减少绘制调用来提升性能
这里可以使用这个浏览器扩展来监视绘制调用<a href="https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk" target="_blank" rel="noopener noreferrer">https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk</a>
具体的使用方式见其说明文档即可</p>
<h2 id="渲染信息" tabindex="-1"><a class="header-anchor" href="#渲染信息" aria-hidden="true">#</a> 渲染信息</h2>
<p>可以通过<code>console.log(renderer.info)</code>打印一些关于渲染器的一些信息</p>
<h2 id="_2-销毁" tabindex="-1"><a class="header-anchor" href="#_2-销毁" aria-hidden="true">#</a> [2]销毁</h2>
<p>一旦你确定了某个几何体或者材料等资源不再需要使用，那么就请先将其销毁掉
关于如何销毁，three.js官方有相关的文档：
<a href="https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects" target="_blank" rel="noopener noreferrer">https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects</a>
例如销毁一个正方体：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>scene<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>cube<span class="token punctuation">)</span>
cube<span class="token punctuation">.</span>geometry<span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cube<span class="token punctuation">.</span>material<span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_3-灯光" tabindex="-1"><a class="header-anchor" href="#_3-灯光" aria-hidden="true">#</a> [3]灯光</h2>
<p>尽可能的减少复杂灯光效果的使用，因为消耗性能比较大
同时避免频繁的添加或者删除灯光，因为场景中添加或移除光源时，必须重新编译支持光源的所有材质。这就是Three.js的工作方式，如果你有一个复杂的场景，这可能会冻结屏幕片刻。</p>
<h2 id="_4-阴影" tabindex="-1"><a class="header-anchor" href="#_4-阴影" aria-hidden="true">#</a> [4]阴影</h2>
<p>阴影效果也是性能消化较大的部分，如果整体需要比较极致的优化性能这部分可以考虑使用纹理贴图代替阴影。
可以通过优化阴影贴图来达到类似阴影效果，下面是模拟思路：
首先可以使用<a href="https://threejs.org/docs/#api/en/helpers/CameraHelper" target="_blank" rel="noopener noreferrer">CameraHelper</a>查看将由阴影贴图摄像机渲染的区域，并将其缩小到尽可能小的区域：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>directionalLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>camera<span class="token punctuation">.</span>top <span class="token operator">=</span> <span class="token number">3</span>
directionalLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>camera<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token number">6</span>
directionalLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>camera<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token operator">-</span> <span class="token number">6</span>
directionalLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>camera<span class="token punctuation">.</span>bottom <span class="token operator">=</span> <span class="token operator">-</span> <span class="token number">3</span>
directionalLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>camera<span class="token punctuation">.</span>far <span class="token operator">=</span> <span class="token number">10</span>

<span class="token keyword">const</span> cameraHelper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>CameraHelper</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>camera<span class="token punctuation">)</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>cameraHelper<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>还要尝试使用尽可能小的分辨率，并给出下降 mapSize 结果：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>directionalLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>mapSize<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_5-合理的使用castshadow和shadow" tabindex="-1"><a class="header-anchor" href="#_5-合理的使用castshadow和shadow" aria-hidden="true">#</a> [5]合理的使用castShadow和Shadow</h2>
<p>有些对象可以投射阴影，有些对象可以接收阴影，有些对象可能会同时投射阴影。如果想要考虑性能，可以减少开启castShadow 、receiveShadow 对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>cube<span class="token punctuation">.</span>castShadow <span class="token operator">=</span> <span class="token boolean">true</span>
cube<span class="token punctuation">.</span>receiveShadow <span class="token operator">=</span> <span class="token boolean">false</span>

torusKnot<span class="token punctuation">.</span>castShadow <span class="token operator">=</span> <span class="token boolean">true</span>
torusKnot<span class="token punctuation">.</span>receiveShadow <span class="token operator">=</span> <span class="token boolean">false</span>

sphere<span class="token punctuation">.</span>castShadow <span class="token operator">=</span> <span class="token boolean">true</span>
sphere<span class="token punctuation">.</span>receiveShadow <span class="token operator">=</span> <span class="token boolean">false</span>

floor<span class="token punctuation">.</span>castShadow <span class="token operator">=</span> <span class="token boolean">false</span>
floor<span class="token punctuation">.</span>receiveShadow <span class="token operator">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="_6-关闭阴影自动更新" tabindex="-1"><a class="header-anchor" href="#_6-关闭阴影自动更新" aria-hidden="true">#</a> [6]关闭阴影自动更新</h2>
<p>阴影贴图会在每次渲染之前更新。可以通过关闭此自动更新并开启 Three.js影子贴图仅在必要时需要更新：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>renderer<span class="token punctuation">.</span>shadowMap<span class="token punctuation">.</span>autoUpdate <span class="token operator">=</span> <span class="token boolean">false</span>
renderer<span class="token punctuation">.</span>shadowMap<span class="token punctuation">.</span>needsUpdate <span class="token operator">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="_7-textures" tabindex="-1"><a class="header-anchor" href="#_7-textures" aria-hidden="true">#</a> [7]Textures</h2>
<h3 id="调整纹理大小" tabindex="-1"><a class="header-anchor" href="#调整纹理大小" aria-hidden="true">#</a> 调整纹理大小</h3>
<p>纹理会占用GPU内存中的大量空间，特别是mipmap的话
可以尝试着将分辨率调低的同时保持较好的效果</p>
<h3 id="保存2次方的分辨率" tabindex="-1"><a class="header-anchor" href="#保存2次方的分辨率" aria-hidden="true">#</a> 保存2次方的分辨率</h3>
<p>进行resizing时，保持2次方的分辨率。这对mipmaps很重要。
如果不这样做，并且渲染需要mipmap，Three.js会尝试通过将图像大小调整到最接近的2次方分辨率来修复它，但这个过程会占用资源，并可能导致质量不好的纹理。</p>
<h3 id="使用正确的格式" tabindex="-1"><a class="header-anchor" href="#使用正确的格式" aria-hidden="true">#</a> 使用正确的格式</h3>
<p>使用什么格式并不会影响GPU的内存的使用情况，但使用合适的格式可以适当的降低加载时间。
可以根据图像和压缩使用.jpg或.png，也可以使用alpha通道。可以使用一些压缩工具对图片进行压缩后再使用。</p>
<h2 id="_8-geometries" tabindex="-1"><a class="header-anchor" href="#_8-geometries" aria-hidden="true">#</a> [8]Geometries</h2>
<h3 id="使用缓冲区几何图形" tabindex="-1"><a class="header-anchor" href="#使用缓冲区几何图形" aria-hidden="true">#</a> 使用缓冲区几何图形</h3>
<p>对于three.js125之前的版本并不支持BufferGeometries，这对于性能并不好，所以应该尽量使用高于125的版本
如果使用的是最新版本的 Three.js，则无需担心，所有几何图形都是缓冲区几何图形。</p>
<h3 id="不更新顶点" tabindex="-1"><a class="header-anchor" href="#不更新顶点" aria-hidden="true">#</a> 不更新顶点</h3>
<p>更新几何体的顶点对于性能的影响是巨大的，再创建几何图形时执行一次影响到不大，但应该避免再tick函数中执行该操作
如果要对顶点进行动画处理，推荐使用顶点着色器中实现，不要直接再tick函数中更新（这个再使用粒子系统时遇到过，性能差别很大）</p>
<h3 id="共用几何图形" tabindex="-1"><a class="header-anchor" href="#共用几何图形" aria-hidden="true">#</a> 共用几何图形</h3>
<p>这个很容易理解，也很常见，如果有多个网格使用相同的几何形状，就只创建一个来使用就行。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> geometry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BoxGeometry</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">)</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshNormalMaterial</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> mesh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>geometry<span class="token punctuation">,</span> material<span class="token punctuation">)</span>
  mesh<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span>
  mesh<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span>
  mesh<span class="token punctuation">.</span>position<span class="token punctuation">.</span>z <span class="token operator">=</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span>
  mesh<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span>
  mesh<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>z <span class="token operator">=</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span>
  
  scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>mesh<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="合并几何图形" tabindex="-1"><a class="header-anchor" href="#合并几何图形" aria-hidden="true">#</a> 合并几何图形</h3>
<p>当不需要移动几何图形的位置时，还可以使用BufferGeometryUtils来将多个几何图形合并为一个也就减少了绘制调用来提升性能。
使用示例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> geometries <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> geometry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BoxGeometry</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">)</span>
  
  geometry<span class="token punctuation">.</span><span class="token function">rotateX</span><span class="token punctuation">(</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
  geometry<span class="token punctuation">.</span><span class="token function">rotateY</span><span class="token punctuation">(</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
  
  geometry<span class="token punctuation">.</span><span class="token function">translate</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span>
  <span class="token punctuation">)</span>
  
  geometries<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>geometry<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> mergedGeometry <span class="token operator">=</span> BufferGeometryUtils<span class="token punctuation">.</span><span class="token function">mergeBufferGeometries</span><span class="token punctuation">(</span>geometries<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>mergedGeometry<span class="token punctuation">)</span>

<span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshNormalMaterial</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> mesh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>mergedGeometry<span class="token punctuation">,</span> material<span class="token punctuation">)</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>mesh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="_9-materials" tabindex="-1"><a class="header-anchor" href="#_9-materials" aria-hidden="true">#</a> [9]Materials</h2>
<h3 id="共用材质" tabindex="-1"><a class="header-anchor" href="#共用材质" aria-hidden="true">#</a> 共用材质</h3>
<p>很好理解，也就是多个几何使用同一个材料，构建多个不同mesh</p>
<h3 id="使用简单的材质" tabindex="-1"><a class="header-anchor" href="#使用简单的材质" aria-hidden="true">#</a> 使用简单的材质</h3>
<ul>
<li>占用渲染资源 <code>MeshBasicMaterial</code> &lt; <code>MeshLambertMaterial</code> &lt; <code>MeshPhongMaterial</code> &lt; <code>MeshStandardMaterial</code> &lt; <code>MeshPhysicalMaterial</code></li>
<li>渲染表现能力 <code>MeshBasicMaterial</code> &lt; <code>MeshLambertMaterial</code> &lt; <code>MeshPhongMaterial</code> &lt; <code>MeshStandardMaterial </code>&lt; <code>MeshPhysicalMaterial</code></li>
</ul>
<h2 id="_10-mesh" tabindex="-1"><a class="header-anchor" href="#_10-mesh" aria-hidden="true">#</a> [10]mesh</h2>
<h3 id="使用实例化网格" tabindex="-1"><a class="header-anchor" href="#使用实例化网格" aria-hidden="true">#</a> 使用实例化网格</h3>
<p>通过构建一个实例化网格，然后使用矩阵来进行变化得出其他网格
示例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> geometry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BoxGeometry</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshNormalMaterial</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> mesh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>InstancedMesh</span><span class="token punctuation">(</span>geometry<span class="token punctuation">,</span> material<span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>mesh<span class="token punctuation">)</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> position <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector3</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span>
	<span class="token punctuation">)</span>

  <span class="token keyword">const</span> quaternion <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Quaternion</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  quaternion<span class="token punctuation">.</span><span class="token function">setFromEuler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Euler</span><span class="token punctuation">(</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> matrix <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Matrix4</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  matrix<span class="token punctuation">.</span><span class="token function">makeRotationFromQuaternion</span><span class="token punctuation">(</span>quaternion<span class="token punctuation">)</span>
  matrix<span class="token punctuation">.</span><span class="token function">setPosition</span><span class="token punctuation">(</span>position<span class="token punctuation">)</span>
  
  mesh<span class="token punctuation">.</span><span class="token function">setMatrixAt</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> matrix<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="_11-模型" tabindex="-1"><a class="header-anchor" href="#_11-模型" aria-hidden="true">#</a> [11]模型</h2>
<p>对于模型首先是尽量使用低多边形</p>
<h3 id="draco压缩" tabindex="-1"><a class="header-anchor" href="#draco压缩" aria-hidden="true">#</a> Draco压缩</h3>
<p>如果模型有很多细节和非常复杂的几何形状，请使用 Draco 压缩。它可以大大减轻重量。缺点是解压缩几何体时可能会冻结，还必须加载 Draco 库。</p>
<h3 id="gzip" tabindex="-1"><a class="header-anchor" href="#gzip" aria-hidden="true">#</a> Gzip</h3>
<p><code>Gzip</code>是在服务器端的压缩。大多数服务器不压缩文件，如 .glb 、 .gltf 、 .obj 等</p>
<h2 id="_12-相机" tabindex="-1"><a class="header-anchor" href="#_12-相机" aria-hidden="true">#</a> [12]相机</h2>
<h3 id="视野" tabindex="-1"><a class="header-anchor" href="#视野" aria-hidden="true">#</a> 视野</h3>
<p>当空间对象不在视野中时，它们不会被渲染。这称为视锥剔除。
这似乎不是一个很好的解决方案，但你还是可以通过缩小相机的视野，这样屏幕上的对象越少，要渲染的三角形就越少。</p>
<h3 id="near-and-far" tabindex="-1"><a class="header-anchor" href="#near-and-far" aria-hidden="true">#</a> Near and far</h3>
<p>就像视野一样，可以减少相机的 <code>near</code> 和 <code>far</code> 属性。比如你有一个广阔的世界，有山脉、树木、结构等，用户可能看不到那些远在山后面看不见的小房子。这时就可以降低 <code>far</code> 到一个体面的价值，这些房屋就不会被渲染了。</p>
<h2 id="_13-render" tabindex="-1"><a class="header-anchor" href="#_13-render" aria-hidden="true">#</a> [13]render</h2>
<h3 id="像素比" tabindex="-1"><a class="header-anchor" href="#像素比" aria-hidden="true">#</a> 像素比</h3>
<p>推荐将渲染器的像素比控制位2</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>renderer<span class="token punctuation">.</span><span class="token function">setPixelRatio</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>devicePixelRatio<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="电源选项" tabindex="-1"><a class="header-anchor" href="#电源选项" aria-hidden="true">#</a> 电源选项</h3>
<p>可以通过指定一个 powerPreference 属性来提示实例化 WebGLRenderer 时需要什么功率，如果对于不考虑电源消耗，可以考虑开启high-performance（默认为default）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>WebGLRenderer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">canvas</span><span class="token operator">:</span> canvas<span class="token punctuation">,</span>
  <span class="token literal-property property">powerPreference</span><span class="token operator">:</span> <span class="token string">'high-performance'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="抗锯齿" tabindex="-1"><a class="header-anchor" href="#抗锯齿" aria-hidden="true">#</a> 抗锯齿</h3>
<p>默认的抗锯齿也是消耗性能的选项，可以再需要时再开启它</p>
<h2 id="_14-后处理" tabindex="-1"><a class="header-anchor" href="#_14-后处理" aria-hidden="true">#</a> [14]后处理</h2>
<h3 id="限制通道数" tabindex="-1"><a class="header-anchor" href="#限制通道数" aria-hidden="true">#</a> 限制通道数</h3>
<p>因为每个后处理过程将使用与渲染分辨率（包括像素比率）一样多的像素进行渲染。如果分辨率为1920x1080，后处理通道数为4，像素比为2，则需要渲染1920<em>2</em>1080<em>2</em>4=33 177 600像素。
对于这方面下性能优化可以做的是通过自定义通道来将原有的多个通道合并为一个</p>
<h2 id="_15-shader" tabindex="-1"><a class="header-anchor" href="#_15-shader" aria-hidden="true">#</a> [15]shader</h2>
<h3 id="指定精度" tabindex="-1"><a class="header-anchor" href="#指定精度" aria-hidden="true">#</a> 指定精度</h3>
<p>对于ShaderMaterial：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> shaderMaterial <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>ShaderMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">precision</span><span class="token operator">:</span> <span class="token string">'lowp'</span><span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>对于RawShaderMaterial则需要像原始的webgl着色器一样通过precision设定</p>
<h3 id="使用优雅的代码" tabindex="-1"><a class="header-anchor" href="#使用优雅的代码" aria-hidden="true">#</a> 使用优雅的代码</h3>
<p>尽量保持着色器代码尽可能简单。避免 if 语句。充分利用旋转和内置功能。
例如下面的语句不要使用if语句替换</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code>modelPosition<span class="token punctuation">.</span>y <span class="token operator">+=</span> <span class="token function">clamp</span><span class="token punctuation">(</span>elevation<span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span> <span class="token operator">*</span> uDisplacementStrength<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="使用纹理" tabindex="-1"><a class="header-anchor" href="#使用纹理" aria-hidden="true">#</a> 使用纹理</h3>
<p>虽然可以使用shader实现各种复杂逼真的效果，比如柏林噪声，但这对于性能的影响是很大的。可以使用纹理来代替以提升性能</p>
<h3 id="使用defines" tabindex="-1"><a class="header-anchor" href="#使用defines" aria-hidden="true">#</a> 使用defines</h3>
<p>使用unifroms可以实时再JavaScript调整值并传递，但也是对性能有所影响的。如果值不需要修改则推荐直接再着色器中通过defines定义，下面有两种方式定义：</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">uDisplacementStrength</span> <span class="token expression"><span class="token number">1.5</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">const</span> shaderMaterial <span class="token operator">=</span> new THREE<span class="token punctuation">.</span><span class="token function">ShaderMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>

<span class="token comment">// ...</span>

defines<span class="token operator">:</span>
<span class="token punctuation">{</span>
uDisplacementStrength<span class="token operator">:</span> <span class="token number">1.5</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="在顶点着色器重进行运算" tabindex="-1"><a class="header-anchor" href="#在顶点着色器重进行运算" aria-hidden="true">#</a> 在顶点着色器重进行运算</h3>
<p>如果可推荐在顶点着色器中进行运算，然后将结果发送到片段着色器。</p>
</template>
