<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-数据获取与处理">1.数据获取与处理</RouterLink></li><li><RouterLink to="#_2-注入shader添加自定义效果">2.注入shader添加自定义效果</RouterLink></li></ul></nav>
<h2 id="_1-数据获取与处理" tabindex="-1"><a class="header-anchor" href="#_1-数据获取与处理" aria-hidden="true">#</a> 1.数据获取与处理</h2>
<p>可以从OSM下载相应的带高度的矢量建筑物轮廓数据，下载后进行数据处理，保留高度字段，其他字段根据需求选择（比如说想实现选中建筑物弹出相应建筑物的信息，就把这些信息字段保留下来），然后将shp（如果为shp数据）转为GeoJson（注意如果不是说3857投影的先转为3867投影），接着就是进行矢量切片为MVT格式的xyz数据（我看DecKGL好像并不支持mbtiles数据，不过可以使用一个服务端比如node解析mbties数据为xyz给前端调用，那样估计性能会好些），这里推荐使用<a href="https://github.com/mapbox/tippecanoe" target="_blank" rel="noopener noreferrer">tippecanoe</a>,性能好而且自定义切片程度高。下面为我这次切片的参数选择：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tippecanoe --no-tile-compression -s EPSG:3857 -ad -an -Z10 -z16 -e gl-3857 -ai gl_3857.geojson
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在缩放级别 10-15 时，相对较小的建筑物被稀疏化，矢量切片500K 大小限制以下</p>
<ul>
<li><code>pC</code>:--no-tile-compression不要压缩 PBF 矢量切片数据（这个DeckGL的issue上有人提我看了，默认压缩了会会出现问题）</li>
<li><code>ad</code>or<code>--drop-fraction-as-needed</code> :在每个缩放级别下动态删除部分要素，以将大图块保持在 500K 大小限制以下</li>
<li><code>an</code>or<code>--drop-smallest-as-needed</code>:从每个缩放级别动态删除最小的要素(如最小的多边形)，以将大图块保持在 500K 大小限制以下</li>
<li><code>e</code>:将 tiles 写入指定目录而不是 mbtiles 文件</li>
<li><code>ai</code>:如果要素 ID 是数字的字符串表示形式，请将其转换为纯数字以用作要素 ID</li>
<li><code>s</code>:指定投影，默认为3857</li>
</ul>
<p>这里使用的数据为桂林的建筑物矢量数据，并且将其切片文件放到nginx http服务器上进行调用，当然也有更好的方案，如弄个全国的建筑物数据的话，并且需求更新及时，就可有采用在Postgresql/postgis中动态矢量切片来弄。</p>
<h2 id="_2-注入shader添加自定义效果" tabindex="-1"><a class="header-anchor" href="#_2-注入shader添加自定义效果" aria-hidden="true">#</a> 2.注入shader添加自定义效果</h2>
<p>DeckGL比较有有意思也比较难的便是注入shader代码实现各种自定义效果了，这样一来就可以借鉴网络上（如<a href="https://www.shadertoy.com/" target="_blank" rel="noopener noreferrer">shadertoy</a>）各种有意思的shader demo来结合实现更多的地理信息可视化效果。</p>
<p>因为MVTLayer为TileLayer的派生类图层，而TileLayer又为CompositeLayer，所以这里就采用Layer Extensions来添加自定义效果，而不是采用Subclassed Layers（不过也可以采用这种方式，会更灵活，可以传递attribute、uniform数据到着色器中使用）</p>
<p>通过查看源码层层查找可以发现，其着色其代码继承的是soilpolygonLayer的，所以只需要去看看其着色器代码中有些上面变量可以使用（觉得难找的话还有一个小技巧可以快速定位到相应的着色器代码，就是先随便注入些东西，然后控制台会报错对于的着色器文件编译错误。。。）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Custom</span> <span class="token keyword">extends</span> <span class="token class-name">deck<span class="token punctuation">.</span>LayerExtension</span><span class="token punctuation">{</span>
    <span class="token function">getShaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">inject</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token string-property property">'vs:#decl'</span><span class="token operator">:</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
              varying vec2 vPosition;
          </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
          <span class="token string-property property">'vs:#main-end'</span><span class="token operator">:</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
              vPosition = vertexPositions;
          </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
          <span class="token string-property property">'fs:#decl'</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
              varying vec2 vPosition;
          </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
          <span class="token comment">//重写颜色绘制函数</span>
          <span class="token string-property property">'fs:DECKGL_FILTER_COLOR'</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
              color = vec4(color.rgb, color.a * pow(1.0-vPosition.y,2.0));
          </span><span class="token template-punctuation string">`</span></span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//使用</span>
<span class="token keyword">const</span> mvtLayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MapboxLayer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">"gl-building-mtv"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> MVTLayer<span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">your mvt url /{z}/{x}/{y}.pbf</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">minZoom</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">maxZoom</span><span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">,</span>
  <span class="token literal-property property">getFillColor</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">179</span><span class="token punctuation">,</span> <span class="token number">68</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">lineWidthMinPixels</span><span class="token operator">:</span> <span class="token number">0.5</span><span class="token punctuation">,</span>
  <span class="token literal-property property">pickable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">extruded</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">autoHighlight</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">highlightColor</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">245</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function-variable function">getElevation</span><span class="token operator">:</span> <span class="token parameter">d</span> <span class="token operator">=></span> d<span class="token punctuation">.</span>properties<span class="token punctuation">.</span>Elevation<span class="token punctuation">,</span>
  <span class="token literal-property property">wireframe</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">getLineColor</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">105</span><span class="token punctuation">,</span> <span class="token number">160</span><span class="token punctuation">,</span> <span class="token number">126</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// material: {</span>
  <span class="token comment">//   ambient: 0.1,</span>
  <span class="token comment">//   diffuse: 0.9,</span>
  <span class="token comment">//   shininess: 32,</span>
  <span class="token comment">//   specularColor: [30, 30, 30]</span>
  <span class="token comment">// },</span>
  <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">Custom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/09f9eee055604d328e3a65acb5345d49.png" alt="在这里插入图片描述"></p>
<p><img src="https://img-blog.csdnimg.cn/84a94afb85564c41ad3df2d402d170e1.png" alt="在这里插入图片描述"></p>
</template>
