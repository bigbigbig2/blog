<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-overlay">[1]overlay</RouterLink></li><li><RouterLink to="#_2-interleaving">[2]Interleaving</RouterLink><ul><li><RouterLink to="#constructor">Constructor</RouterLink></li></ul></li></ul></nav>
<p>deck.gl 的 MapView 旨在每个缩放级别和旋转角度与 Mapbox 的相机完美同步。对于<code>DeckGL</code>与<code>MapboxGL</code>的整合官方文档提供了两种方案，不过看网络上也有按需求根据源码定制整合的方案</p>
<p>主要通过deck.gl/mapbox模块中的<code>MapboxOverlay</code>和<code>MapboxLayer</code>类实现</p>
<h4 id="_1-overlay" tabindex="-1"><a class="header-anchor" href="#_1-overlay" aria-hidden="true">#</a> [1]overlay</h4>
<p>相应API：<code>MapboxOverlay</code><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42830fc799e248f3b80716d700c1c46d~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>该方式主要适用于底图为二维的情况，因为是将<code>DeckGL</code>的<code>layer</code>和<code>Mapbox</code>的<code>layer</code>分离构建并挂载在不同的DOM中，将DeckGL的画布作为Mapbox底图顶部上的叠加层。官网示例：https://github.com/visgl/deck.gl/tree/8.8-release/examples/get-started/pure-js/mapbox</p>
<p>Deck 的相机和mapbox的相机是同步的，所以这是一个比较灵活强大的选项，因为这两个库彼此独立地管理它们的渲染。如果底图是二维的（因为不会有相互遮挡效果，就是无论底图是不是三维的，DeckGL Layer都会叠加到Mapbox Layer 上，mapBox-gl的dom也就是挂载于deckGL之上，mapbox-gl 处理所有用户输入），通常就足够了。</p>
<p>如果您需要使用除 deck.gl 之外的其他 mapbox-gl 控件和插件，这是有利的</p>
<blockquote>
<p>注意也是可以将Mapbox 的Layer作为叠加层叠加到DeckGL上的，这里不太推荐，就不过多介绍了</p>
</blockquote>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>import {MapboxOverlay} from '@deck.gl/mapbox';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
  center: [0.45, 51.47],
  zoom: 4,
  bearing: 0,
  pitch: 30
});

const mapboxOverlay = new MapboxOverlay({
  layers: [
    new GeoJsonLayer({
      id: 'airports',
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: f =&gt; 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick: info =&gt;
        // eslint-disable-next-line
        info.object &amp;&amp; alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
    }),
    new ArcLayer({
      id: 'arcs',
      data: AIR_PORTS,
      dataTransform: d =&gt; d.features.filter(f =&gt; f.properties.scalerank &lt; 4),
      // Styles
      getSourcePosition: f =&gt; [-0.4531566, 51.4709959], // London
      getTargetPosition: f =&gt; f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1
    })
  ]
});

map.addControl(mapboxOverlay); //将deckGL的Layers作为mapbox的control添加到mapbox上
map.addControl(new mapboxgl.NavigationControl());
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><h4 id="_2-interleaving" tabindex="-1"><a class="header-anchor" href="#_2-interleaving" aria-hidden="true">#</a> [2]Interleaving</h4>
<p>相应API：<code>MapboxLayer</code></p>
<p><a href="https://img-blog.csdnimg.cn/92d9fbf76f9743438b6abb1a80c682fa.png" target="_blank" rel="noopener noreferrer"><img src="https://img-blog.csdnimg.cn/41d44e02cc374e93af9e44fa1eb0b4c9.png" alt="在这里插入图片描述"></a></p>
<p>该方案采用利用DeckGL自带的API <code>MapboxLayer</code>来将DeckGL的layer转化为mapbox的layer然后添加上去即可，也就是将DeckGL的layers渲染到了mapbox的webgl上下文了，这也叫意味着DeckGL层的内容与mapbox（为三维时）层之间有相互遮挡效果了</p>
<p><code>MapboxLayer</code> 是对 Mapbox GL JS 的 CustomLayerInterface API 的实现，通过MapboxLayer就可以将DeckGL中的Layer作为mapbox中的customLayer添加到mapbox的gl上下文中，而不是像上面的将DeckGL的Layer渲染到mapbox上独立的canvas中</p>
<p>虽然这种方式对于熟悉Mapbox GL  CustomLayer的人会比较有利，就会受到Mapbox一些API的限制，其Layers的灵活性没有overlay的好。</p>
<p>使用该种方式来给MapBox时只需安装<code>@deck.gl/mapbox</code>包以及相应的Layers包即可</p>
<h5 id="constructor" tabindex="-1"><a class="header-anchor" href="#constructor" aria-hidden="true">#</a> Constructor</h5>
<p>该类的Constructor，也就是要参数如下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>MapboxLayer<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@deck.gl/mapbox'</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token class-name">MapboxLayer</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>props(object)</p>
<ul>
<li><code>props.id</code> (String)</li>
<li><code>props.type</code> (<code>Layer</code>，可选) -由继承与Layer的类，如为提供DeckGL实例，则必须</li>
<li><code>props.deck</code> (<code>Deck</code>, 可选) -控制该层渲染的 Deck 实例。如果提供，该层将在渲染时通过 id 从其层堆栈中查找，并忽略所有其他道具。建议您使用自动管理 Deck 实例的 MapboxOverlay 类</li>
<li><code>Optional</code>：当前使用的DeckGL layer的props，具体必须参数和可选参数需要查看相应Layers的文档</li>
</ul>
<p><strong>example</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>MapboxLayer<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@deck.gl/mapbox'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>ScatterplotLayer<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@deck.gl/layers'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">mapboxgl<span class="token punctuation">.</span>Map</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> myScatterplotLayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MapboxLayer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'my-scatterplot'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> ScatterplotLayer<span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span><span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">74.5</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function-variable function">getPosition</span><span class="token operator">:</span> <span class="token parameter">d</span> <span class="token operator">=></span> d<span class="token punctuation">.</span>position<span class="token punctuation">,</span>
  <span class="token function-variable function">getRadius</span><span class="token operator">:</span> <span class="token parameter">d</span> <span class="token operator">=></span> d<span class="token punctuation">.</span>size<span class="token punctuation">,</span>
  <span class="token literal-property property">getColor</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//Methods： setProps</span>
<span class="token comment">// wait for map to be ready</span>
map<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'load'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// insert before the mapbox layer "waterway_label"</span>
  map<span class="token punctuation">.</span><span class="token function">addLayer</span><span class="token punctuation">(</span>myScatterplotLayer<span class="token punctuation">,</span> <span class="token string">'waterway_label'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// update the layer</span>
  myScatterplotLayer<span class="token punctuation">.</span><span class="token function">setProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">getColor</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div></template>
