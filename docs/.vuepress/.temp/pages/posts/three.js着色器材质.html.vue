<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-rawshadermaterial">[1]RawShaderMaterial</RouterLink></li><li><RouterLink to="#_2-properties">[2]Properties</RouterLink></li><li><RouterLink to="#_3-补充说明">[3]补充说明</RouterLink></li><li><RouterLink to="#_4-内置函数">[4]内置函数</RouterLink></li><li><RouterLink to="#_5-传递attributes">[5]传递Attributes</RouterLink></li><li><RouterLink to="#_6-传递uniforms">[6]传递Uniforms</RouterLink></li><li><RouterLink to="#_7-纹理贴图">[7]纹理贴图</RouterLink></li><li><RouterLink to="#_8-shadermaterial">[8]ShaderMaterial</RouterLink></li></ul></nav>
<p>当Three.js内置的材质不能满足需求时，就需要通过编写着色器来实现了
也可能是出于性能原因。像MeshStandardMaterial这样的材料非常复杂，涉及大量的代码和计算。如果我们编写自己的着色器，我们可以将功能和计算保持在最低限度。我们可以更好地控制性能。
编写指定要着色器也是向渲染结果添加后处理效果的绝佳方式</p>
<h2 id="_1-rawshadermaterial" tabindex="-1"><a class="header-anchor" href="#_1-rawshadermaterial" aria-hidden="true">#</a> [1]RawShaderMaterial</h2>
<p>要创建一个着色器，我们需要创建一个特定的材质。这个特定的材质可以时着色器材质<a href="https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial" target="_blank" rel="noopener noreferrer">ShaderMaterial</a>或者原始材质<a href="https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial" target="_blank" rel="noopener noreferrer">RawShaderMaterial</a>, 它们的区别是<code>ShaderMaterial</code>会自动将一些代码添加到着色器代码中，而<code>RawShaderMaterial</code>则不会。
这里从比较原始的<code>RawShaderMaterial</code>实验：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// Geometry</span>
<span class="token keyword">const</span> geometry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">PlaneGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span>

<span class="token comment">// Material</span>
<span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">RawShaderMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    vertexShader<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
      uniform mat4 projectionMatrix;
      uniform mat4 viewMatrix;
      uniform mat4 modelMatrix;
      
      attribute vec3 position;
      
      void main(){
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
      }
    </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
    fragmentShader<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
      precision mediump float;
      
      void main(){
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
  </span><span class="token template-punctuation string">`</span></span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// Mesh</span>
<span class="token keyword">const</span> mesh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">Mesh</span><span class="token punctuation">(</span>geometry<span class="token punctuation">,</span> material<span class="token punctuation">)</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>mesh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/89ab66698a3e445804a6e833367edccc.png#averageHue=#320000&amp;clientId=uf5804c0a-04dc-4&amp;from=paste&amp;height=330&amp;id=ub9ae56f2&amp;originHeight=1211&amp;originWidth=2556&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=22255&amp;status=done&amp;style=none&amp;taskId=uaf4e8e67-c5d2-4af5-823d-9a7603b3230&amp;title=&amp;width=696" alt="image.png">
更好的写法是将着色器拆分写到不同文件中
这里可以分别创建<code>vertex.glsl</code>、<code>fragment.glsl</code>文件，将组织到某个文件夹下，因为一个项目通常有很多个着色器代码。</p>
<p>在vite中import shader文件（.glsl）问题
在vite中import shader文件（.glsl）问题，不需要安装插件，只需在导入文件的结尾添加一个?raw符号，vite会将改文件的内容解析为字符串导入
<code>import vertexShader from &quot;./../shader/particels_vs.glsl?raw&quot;</code>
<code>import fragmentShader from &quot;./../shader/particels_fs.glsl?raw&quot;</code>
使用其他打包构建工具估计也需要进行配置才能使用.glsl文件
例如在webpack中则需要添加：一个rules</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(glsl|vs|fs|vert|frag)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'asset/source'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">generator</span><span class="token operator">:</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'assets/images/[hash][ext]'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="_2-properties" tabindex="-1"><a class="header-anchor" href="#_2-properties" aria-hidden="true">#</a> [2]Properties</h2>
<p>在其他常见材质中使用的属性（例如线框、侧面、透明或平面着色）仍然可用于 RawShaderMaterial</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">RawShaderMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  vertexShader<span class="token operator">:</span> testVertexShader<span class="token punctuation">,</span>
  fragmentShader<span class="token operator">:</span> testFragmentShader<span class="token punctuation">,</span>
  wireframe<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">//网格线条</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>但是<code>map</code>贴图、<code>alphaMap</code>、<code>opacity</code>、<code>color</code>等属性将不再起作用，因为我们需要自己在着色器中编写这些功能。</p>
<h2 id="_3-补充说明" tabindex="-1"><a class="header-anchor" href="#_3-补充说明" aria-hidden="true">#</a> [3]补充说明</h2>
<p>首先看看MVP矩阵，这里的MVP矩阵于WEBGL中有些不同</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">uniform</span> <span class="token keyword">mat4</span> projectionMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> viewMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> modelMatrix<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li><code>modelMatrix </code>将应用与Mesh相关的所有变换。如果我们缩放、旋转或移动网格，这些转换将包含在 中 modelMatrix 并应用于 position</li>
<li><code>viewMatrix</code> 将应用相对于相机的变换。如果我们将相机向左旋转，顶点应该在右侧。如果我们沿网格体的方向移动相机，顶点应该会变大，依此类推。</li>
<li>最终 <code>projectionMatrix</code> 会将我们的坐标转换为最终的剪辑空间坐标。</li>
</ul>
<blockquote>
<p>参考：<a href="https://learnopengl.com/Getting-started/Coordinate-Systems" target="_blank" rel="noopener noreferrer">LearnOpenGL - Coordinate Systems</a></p>
</blockquote>
<p>关于片段着色器的精度：
当我们使用<code>ShaderMaterial</code>而不是<code>RawShaderMaterial</code>时，这部分会自动处理。</p>
<h2 id="_4-内置函数" tabindex="-1"><a class="header-anchor" href="#_4-内置函数" aria-hidden="true">#</a> [4]内置函数</h2>
<p>开始上点费脑的内置函数</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">uniform</span> <span class="token keyword">mat4</span> projectionMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> viewMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> modelMatrix<span class="token punctuation">;</span>

<span class="token keyword">attribute</span> <span class="token keyword">vec3</span> position<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">vec4</span> modelPosition <span class="token operator">=</span> modelMatrix <span class="token operator">*</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    modelPosition<span class="token punctuation">.</span>z <span class="token operator">+=</span> <span class="token function">sin</span><span class="token punctuation">(</span>modelPosition<span class="token punctuation">.</span>x <span class="token operator">*</span> <span class="token number">10.0</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.1</span><span class="token punctuation">;</span>
    <span class="token keyword">vec4</span> viewPosition <span class="token operator">=</span> viewMatrix <span class="token operator">*</span> modelPosition<span class="token punctuation">;</span>
    <span class="token keyword">vec4</span> projectedPosition <span class="token operator">=</span> projectionMatrix <span class="token operator">*</span> viewPosition<span class="token punctuation">;</span>

    gl_Position <span class="token operator">=</span> projectedPosition<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/a8faf82e7a8c6fe6f2b878c8de6113f1.png#averageHue=#530000&amp;clientId=uf5804c0a-04dc-4&amp;from=paste&amp;height=315&amp;id=u3a06baac&amp;originHeight=394&amp;originWidth=798&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=5553&amp;status=done&amp;style=none&amp;taskId=u7129f895-adbb-4ff5-8123-400c28559cd&amp;title=&amp;width=638.4" alt="image.png"></p>
<h2 id="_5-传递attributes" tabindex="-1"><a class="header-anchor" href="#_5-传递attributes" aria-hidden="true">#</a> [5]传递Attributes</h2>
<p>可以直接将要添加的Attributes属性直接添加到 BufferGeometry 中，例如下面传递一些随机值到顶点着色器重</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> count <span class="token operator">=</span> geometry<span class="token punctuation">.</span>attributes<span class="token punctuation">.</span>position<span class="token punctuation">.</span>count <span class="token comment">//获取几何体的顶点数</span>
<span class="token keyword">const</span> randoms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  randoms<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

geometry<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aRandom'</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BufferAttribute</span><span class="token punctuation">(</span>randoms<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//传递</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>然后就可以直接在顶点着色器中使用了：</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">uniform</span> <span class="token keyword">mat4</span> projectionMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> viewMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> modelMatrix<span class="token punctuation">;</span>

<span class="token keyword">attribute</span> <span class="token keyword">float</span> aRandom<span class="token punctuation">;</span>
<span class="token keyword">attribute</span> <span class="token keyword">vec3</span> position<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">vec4</span> modelPosition <span class="token operator">=</span> modelMatrix <span class="token operator">*</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;</span>
  modelPosition<span class="token punctuation">.</span>z <span class="token operator">+=</span> aRandom <span class="token operator">*</span> <span class="token number">0.1</span><span class="token punctuation">;</span>
  <span class="token keyword">vec4</span> viewPosition <span class="token operator">=</span> viewMatrix <span class="token operator">*</span> modelPosition<span class="token punctuation">;</span>
  <span class="token keyword">vec4</span> projectedPosition <span class="token operator">=</span> projectionMatrix <span class="token operator">*</span> viewPosition<span class="token punctuation">;</span>

  gl_Position <span class="token operator">=</span> projectedPosition<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/699b21527c59044b83dadf4b3f8a259c.png#averageHue=#380000&amp;clientId=uc3a4f176-e383-4&amp;from=paste&amp;height=418&amp;id=uf13dfefc&amp;originHeight=802&amp;originWidth=1707&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=12189&amp;status=done&amp;style=none&amp;taskId=u42c32f90-b9f9-4d37-b587-4801d3bc18f&amp;title=&amp;width=890.4000244140625" alt="image.png">
还可以使用varying传递给片元着色器玩玩：</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">varying</span> <span class="token keyword">float</span> vRandom<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  
  vRandom <span class="token operator">=</span> aRandom<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">precision</span> <span class="token keyword">mediump</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">float</span> vRandom<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    gl_FragColor <span class="token operator">=</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> vRandom<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/fbca4cd2a29d5daf4121e1999db9084d.png#averageHue=#cdb085&amp;clientId=uc3a4f176-e383-4&amp;from=paste&amp;height=457&amp;id=u3aeb3540&amp;originHeight=1247&amp;originWidth=2074&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=245547&amp;status=done&amp;style=none&amp;taskId=uaf96a269-b283-4115-b546-46f374ffc95&amp;title=&amp;width=760.4000244140625" alt="image.png"></p>
<h2 id="_6-传递uniforms" tabindex="-1"><a class="header-anchor" href="#_6-传递uniforms" aria-hidden="true">#</a> [6]传递Uniforms</h2>
<p>与传递attribute不同的是传递Uniforms直接通过RawShaderMaterial的属性传递即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>RawShaderMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">vertexShader</span><span class="token operator">:</span> testVertexShader<span class="token punctuation">,</span>
    <span class="token literal-property property">fragmentShader</span><span class="token operator">:</span> testFragmentShader<span class="token punctuation">,</span>
    <span class="token literal-property property">uniforms</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">uFrequency</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector2</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token comment">//传递一个波动频率</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>使用</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">uniform</span> <span class="token keyword">mat4</span> projectionMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> viewMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> modelMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">float</span> uFrequency<span class="token punctuation">;</span>

<span class="token keyword">attribute</span> <span class="token keyword">float</span> aRandom<span class="token punctuation">;</span>
<span class="token keyword">attribute</span> <span class="token keyword">vec3</span> position<span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">float</span> vRandom<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">vec4</span> modelPosition <span class="token operator">=</span> modelMatrix <span class="token operator">*</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    modelPosition<span class="token punctuation">.</span>z <span class="token operator">+=</span> <span class="token function">sin</span><span class="token punctuation">(</span>modelPosition<span class="token punctuation">.</span>x <span class="token operator">*</span> uFrequency<span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.1</span><span class="token punctuation">;</span>
		modelPosition<span class="token punctuation">.</span>z <span class="token operator">+=</span> <span class="token function">sin</span><span class="token punctuation">(</span>modelPosition<span class="token punctuation">.</span>y <span class="token operator">*</span> uFrequency<span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.1</span><span class="token punctuation">;</span>
    <span class="token keyword">vec4</span> viewPosition <span class="token operator">=</span> viewMatrix <span class="token operator">*</span> modelPosition<span class="token punctuation">;</span>
    <span class="token keyword">vec4</span> projectedPosition <span class="token operator">=</span> projectionMatrix <span class="token operator">*</span> viewPosition<span class="token punctuation">;</span>

    gl_Position <span class="token operator">=</span> projectedPosition<span class="token punctuation">;</span>

    vRandom <span class="token operator">=</span> aRandom<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/201cd3c0af6c1d7eab61cdb47ff9b83e.png#averageHue=#1d1d3b&amp;clientId=uc3a4f176-e383-4&amp;from=paste&amp;height=354&amp;id=u2ee07429&amp;originHeight=442&amp;originWidth=1003&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=7605&amp;status=done&amp;style=none&amp;taskId=u473b2064-3e2f-4c94-8b01-9fc400dc4db&amp;title=&amp;width=802.4" alt="image.png">
因为这些值是直接在在传递到着色器的，那么就可以动态控制传递过去，比如通过dat.gui控制</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>material<span class="token punctuation">.</span>uniforms<span class="token punctuation">.</span>uFrequency<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token string">'x'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.01</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">'frequencyX'</span><span class="token punctuation">)</span>
gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>material<span class="token punctuation">.</span>uniforms<span class="token punctuation">.</span>uFrequency<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token string">'y'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.01</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">'frequencyY'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>还可以通过模型构建类似于shadtory里的一个自带的uTime变量，让图形动起来</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>RawShaderMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">vertexShader</span><span class="token operator">:</span> testVertexShader<span class="token punctuation">,</span>
  <span class="token literal-property property">fragmentShader</span><span class="token operator">:</span> testFragmentShader<span class="token punctuation">,</span>
  <span class="token literal-property property">uniforms</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">uFrequency</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector2</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">uTime</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>在绘制函数中填值即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">tick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> elapsedTime <span class="token operator">=</span> clock<span class="token punctuation">.</span><span class="token function">getElapsedTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  <span class="token comment">// Update material</span>
  material<span class="token punctuation">.</span>uniforms<span class="token punctuation">.</span>uTime<span class="token punctuation">.</span>value <span class="token operator">=</span> elapsedTime
  
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token comment">// ...</span>
<span class="token keyword">uniform</span> <span class="token keyword">float</span> uTime<span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  modelPosition<span class="token punctuation">.</span>z <span class="token operator">+=</span> <span class="token function">sin</span><span class="token punctuation">(</span>modelPosition<span class="token punctuation">.</span>x <span class="token operator">*</span> uFrequency<span class="token punctuation">.</span>x <span class="token operator">+</span> uTime<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.1</span><span class="token punctuation">;</span>
  modelPosition<span class="token punctuation">.</span>z <span class="token operator">+=</span> <span class="token function">sin</span><span class="token punctuation">(</span>modelPosition<span class="token punctuation">.</span>y <span class="token operator">*</span> uFrequency<span class="token punctuation">.</span>y <span class="token operator">+</span> uTime<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.1</span><span class="token punctuation">;</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>这样就动起来了
后面还可以传递更多的uniform，比如color等这里就不演示了</p>
<h2 id="_7-纹理贴图" tabindex="-1"><a class="header-anchor" href="#_7-纹理贴图" aria-hidden="true">#</a> [7]纹理贴图</h2>
<p>这里讨论的是给RawShaderMaterial材质添加纹理图片，这里加载映射纹理同原始的webgl一样，需要uv坐标<code>texture2D(uTexture, vUv);</code>这里可以直接将加载好的纹理通过uniform传递到片段着色器：</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">const</span> flagTexture <span class="token operator">=</span> textureLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token char">'/textures/flag-french.jpg'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> material <span class="token operator">=</span> new THREE<span class="token punctuation">.</span><span class="token function">RawShaderMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  uniforms<span class="token operator">:</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  uTexture<span class="token operator">:</span> <span class="token punctuation">{</span> value<span class="token operator">:</span> flagTexture <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>这里因为geometry会自动构建uv坐标到attribute上，所以这里就可以直接在顶点着色器中获取到</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token comment">// ...</span>
<span class="token keyword">attribute</span> <span class="token keyword">vec2</span> uv<span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">vec2</span> vUv<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token comment">// ...</span>
vUv <span class="token operator">=</span> uv<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">precision</span> <span class="token keyword">mediump</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

<span class="token keyword">uniform</span> <span class="token keyword">vec3</span> uColor<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">sampler2D</span> uTexture<span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">vec2</span> vUv<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">vec4</span> textureColor <span class="token operator">=</span> <span class="token function">texture2D</span><span class="token punctuation">(</span>uTexture<span class="token punctuation">,</span> vUv<span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl_FragColor <span class="token operator">=</span> textureColor<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="_8-shadermaterial" tabindex="-1"><a class="header-anchor" href="#_8-shadermaterial" aria-hidden="true">#</a> [8]ShaderMaterial</h2>
<p>ShaderMaterial相比于ShaderMaterial要方便一些，内置了一些变量
如下变量就不需要在着色器中定义就可以直接在glsl中使用了</p>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">uniform</span> <span class="token keyword">mat4</span> projectionMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> viewMatrix<span class="token punctuation">;</span>
<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> modelMatrix<span class="token punctuation">;</span>
<span class="token keyword">attribute</span> <span class="token keyword">vec3</span> position<span class="token punctuation">;</span>
<span class="token keyword">attribute</span> <span class="token keyword">vec2</span> uv<span class="token punctuation">;</span>
<span class="token keyword">precision</span> <span class="token keyword">mediump</span> <span class="token keyword">float</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>本文部分内容为Three.js Journey课程的学习笔记</p>
</template>
