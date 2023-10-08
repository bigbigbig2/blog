<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-自定义图层">1.自定义图层</RouterLink><ul><li><RouterLink to="#_1-图层的生命周期">[1]图层的生命周期</RouterLink></li><li><RouterLink to="#_2-复合层">[2]复合层</RouterLink><ul><li><RouterLink to="#adaptor-layers">Adaptor Layers</RouterLink></li><li><RouterLink to="#collection-layers">Collection Layers</RouterLink></li><li><RouterLink to="#小结">小结</RouterLink></li></ul></li><li><RouterLink to="#_3-subclassed-layers">[3]Subclassed Layers</RouterLink><ul><li><RouterLink to="#overriding-attribute-calculation">Overriding Attribute Calculation</RouterLink></li><li><RouterLink to="#overriding-shaders">Overriding Shaders</RouterLink></li><li><RouterLink to="#defining-additional-uniforms">Defining Additional Uniforms</RouterLink></li><li><RouterLink to="#defining-additional-attributes">Defining Additional Attributes</RouterLink></li><li><RouterLink to="#layer-extensions">Layer Extensions</RouterLink></li></ul></li><li><RouterLink to="#_4-primitive-layers">[4]Primitive Layers</RouterLink></li><li><RouterLink to="#_5-shader注入">[5]shader注入</RouterLink></li></ul></li><li><RouterLink to="#_2-api使用">2.API使用</RouterLink><ul><li><RouterLink to="#_1-using-layers">[1]Using Layers</RouterLink></li><li><RouterLink to="#_2-add-interactivity">[2]add Interactivity</RouterLink></li><li><RouterLink to="#_3-坐标系统cs">[3]坐标系统CS</RouterLink><ul><li><RouterLink to="#基本概念">基本概念</RouterLink></li></ul></li></ul></li><li><RouterLink to="#_3-源码学习">3.源码学习</RouterLink><ul><li><RouterLink to="#_1-view">[1]view</RouterLink></li><li><RouterLink to="#_2-view-state">[2]View State</RouterLink></li><li><RouterLink to="#_3-viewport">[3]Viewport</RouterLink></li><li><RouterLink to="#坐标变换">坐标变换</RouterLink></li><li><RouterLink to="#layer">Layer</RouterLink></li><li><RouterLink to="#mapboxlayer">MapboxLayer</RouterLink></li><li><RouterLink to="#安装说明">安装说明</RouterLink></li></ul></li></ul></nav>
<h2 id="_1-自定义图层" tabindex="-1"><a class="header-anchor" href="#_1-自定义图层" aria-hidden="true">#</a> 1.自定义图层</h2>
<p><img src="https://img-blog.csdnimg.cn/cda3d068f2084f92a4f172ee36e13bfd.png" alt="在这里插入图片描述"></p>
<p>当使用DeckGL提供的图层还无法满足需求时<code>（https://deck.gl/docs/api-reference/layers）</code>，可能就需要自定义图层了。在DeckGL中有常见的三种自定义图层的方式</p>
<ul>
<li>创建复合层（composite layers.）——复合层是一种可以创建其他层的特殊层</li>
<li>子类层（Subclass a layer）——子类层是通过子类化其他层创建的新层。这允许开发人员重用现有层的所有接口和实现</li>
<li>从0开始构建图层层——也就是使用WebGL自定义绘制图层绘制，这就意味着你可以完全控制图层生命周期，可以管理自己的模型并直接操作 WebGL 上下文，当然难度也是最大的..（感觉上面两个应用场景也不少了随着DeckGL的版本的升级提供了挺多常用的layer）</li>
</ul>
<h3 id="_1-图层的生命周期" tabindex="-1"><a class="header-anchor" href="#_1-图层的生命周期" aria-hidden="true">#</a> [1]图层的生命周期</h3>
<p>为了理解每个 deck.gl Layer的子类都可以定义在其生命周期中的特定点调用的特定方法</p>
<ul>
<li><strong>initializeState</strong> - 对于刚刚添加的layer进行初始化时（初始化进发生一次），该<code>[layer.updateState()](https://deck.gl/docs/api-reference/core/layer#updatestate)</code>生命周期函数将会被调用</li>
<li><strong>Updating</strong>-layer发生变化（如修改属性、数据等）时调用 <code>layer.shouldUpdateState()</code> 以确定图层是否需要更新。
<ul>
<li>如果确实需要更新则在Layer渲染前调用 <code>layer.updateState()</code> ，通常在这一阶段通过调用<code>[state.attributeManager.invalidate](https://deck.gl/docs/api-reference/core/attribute-manager#invalidate)</code> 来重新计算<code>attribute</code> 和调用<code>model.setUniforms</code>来更新<code>uniforms</code> 变量/默认情况下，当 props.data 更改时，所有attribute都会失效并重新计算</li>
</ul>
</li>
<li><strong>Rendering</strong> - 渲染发生在每个渲染周期，将图层绘制到 WebGL 上下文。
<ul>
<li>对于primitive layers, <code>[layer.draw()](https://deck.gl/docs/api-reference/core/layer#draw)</code>函数在此阶段将被调用</li>
</ul>
</li>
<li><strong>Picking</strong> - 当指针移过或单击 deck.gl 画布时发生
<ul>
<li>拾取图层时，将调用 <code>layer.getPickingInfo()</code> 以生成有关已拾取内容的信息对象。然后将此对象传递给图层的 onHover 或 onClick 回调。</li>
</ul>
</li>
<li><strong>Finalization</strong> - 发生在每个被移除的层上，即来自上一个渲染周期的层，其 id 与当前周期中的任何层都不匹配。 layer.finalizeState() 在对该层的状态的引用被释放之前被调用</li>
</ul>
<h3 id="_2-复合层" tabindex="-1"><a class="header-anchor" href="#_2-复合层" aria-hidden="true">#</a> [2]复合层</h3>
<p>复合层是一种特殊的图层，可以通过组合现有层来构建新的层（<strong>顾名思义：通过组合多个层来构成一个层</strong>）如<code>GeoJsonLayer</code>就是复合层</p>
<p>复合层中分为适配层<code>Adaptor Layers</code>和集合层<code>Collection Layers</code></p>
<p><strong>定义一个继承于CompositeLayer的layer</strong></p>
<h4 id="adaptor-layers" tabindex="-1"><a class="header-anchor" href="#adaptor-layers" aria-hidden="true">#</a> Adaptor Layers</h4>
<p>使用复合“适配”层更改现有层的接口和行为通常很方便，而不是修改层本身（例如 S2Layer 是 PolygonLayer 之上的简单适配层）</p>
<p>简单的说也就是，根据现有层添加一些适配（如数据）</p>
<p>对于复合层主要的意义我估计就是使用相同的数据，来给原来的多个层使用渲染，然后组合为一个层</p>
<p>应用举例：</p>
<ul>
<li>LASPointCloudLayer为Adaptor Layers的适配层</li>
<li>TopoJSONLayer为GeoJsonLayer的适配层</li>
<li><a href="https://deck.gl/docs/api-reference/layers/text-layer" target="_blank" rel="noopener noreferrer">TextLayer</a>, <a href="https://deck.gl/docs/api-reference/aggregation-layers/hexagon-layer" target="_blank" rel="noopener noreferrer">HexagonLayer</a>, <a href="https://deck.gl/docs/api-reference/aggregation-layers/cpu-grid-layer" target="_blank" rel="noopener noreferrer">CPUGridLayer</a> 等都为composite &quot;adapter&quot; layers.</li>
</ul>
<h4 id="collection-layers" tabindex="-1"><a class="header-anchor" href="#collection-layers" aria-hidden="true">#</a> Collection Layers</h4>
<p>通常，一些复杂的可视化层是由使用一组具有通用属性的多个层合成的。例如：</p>
<ul>
<li>例如NodeLayer图层由ScatterplotLayer、TextLayer组合而成</li>
<li><a href="https://deck.gl/docs/api-reference/layers/geojson-layer" target="_blank" rel="noopener noreferrer">GeoJsonLayer</a> 、<a href="https://deck.gl/docs/api-reference/layers/polygon-layer" target="_blank" rel="noopener noreferrer">PolygonLayer</a> 为集合层</li>
</ul>
<p>创建一个集合层的优势：</p>
<ul>
<li>可以将处理特定数据格式或可视化配置的复杂代码收集到一个类中</li>
<li>通过跨层共享相同的对象/缓冲区来提高内存使用率。复合层将管理数据源并将其向下传递给多个层，而不是每个子层加载和存储自己的原始数据副本。</li>
</ul>
<p>例如：实现一个有icon和text的layer（通过组合IconLayer和TextLayer）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>CompositeLayer<span class="token punctuation">,</span> IconLayer<span class="token punctuation">,</span> TextLayer<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'deck.gl'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">LabeledIconLayer</span> <span class="token keyword">extends</span> <span class="token class-name">CompositeLayer</span> <span class="token punctuation">{</span>
   <span class="token comment">//一个组合图层需要实现renderLayers()方法并返回一个子图层数组</span>
    <span class="token function">renderLayers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span>
          <span class="token keyword">new</span> <span class="token class-name">IconLayer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token comment">//由于复合层不直接绘制到画布上，它通过设置其子层的props来控制渲染结果，而且子图层并不知道复合图层的，所以需要将复合图层的props映射到子图层相应的props</span>
              <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-icon</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
              <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>data<span class="token punctuation">,</span>

              <span class="token literal-property property">iconAtlas</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>iconAtlas<span class="token punctuation">,</span>
              <span class="token literal-property property">iconMapping</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>iconMapping<span class="token punctuation">,</span>

              <span class="token literal-property property">getPosition</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>getPosition<span class="token punctuation">,</span>
              <span class="token literal-property property">getIcon</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>getIcon<span class="token punctuation">,</span>
              <span class="token literal-property property">getSize</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>getIconSize<span class="token punctuation">,</span>
              <span class="token literal-property property">getColor</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>getIconColor
              <span class="token comment">//为了在需要重新计算访问器时使 updateTriggers 起作用</span>
              <span class="token literal-property property">updateTriggers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                  <span class="token literal-property property">getPosition</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>updateTriggers<span class="token punctuation">.</span>getPosition<span class="token punctuation">,</span>
                  <span class="token literal-property property">getIcon</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>updateTriggers<span class="token punctuation">.</span>getIcon<span class="token punctuation">,</span>
                  <span class="token literal-property property">getSize</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>updateTriggers<span class="token punctuation">.</span>getIconSize<span class="token punctuation">,</span>
                  <span class="token literal-property property">getColor</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>updateTriggers<span class="token punctuation">.</span>getIconColor
          	 <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token comment">//由于复合层不直接绘制到画布上，它通过设置其子层的 props 来控制渲染结果</span>
          <span class="token keyword">new</span> <span class="token class-name">TextLayer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-label</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>data<span class="token punctuation">,</span>

            <span class="token literal-property property">fontFamily</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>fontFamily<span class="token punctuation">,</span>
            <span class="token literal-property property">fontWeight</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>fontWeight<span class="token punctuation">,</span>

            <span class="token literal-property property">getPosition</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>getPosition<span class="token punctuation">,</span>
            <span class="token literal-property property">getText</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>getText<span class="token punctuation">,</span>
            <span class="token literal-property property">getSize</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>getTextSize
            <span class="token literal-property property">getColor</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>getTextColor
            <span class="token comment">//为了在需要重新计算访问器时使 updateTriggers 起作用</span>
            <span class="token literal-property property">updateTriggers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">getPosition</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>updateTriggers<span class="token punctuation">.</span>getPosition<span class="token punctuation">,</span>
              <span class="token literal-property property">getText</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>updateTriggers<span class="token punctuation">.</span>getText<span class="token punctuation">,</span>
              <span class="token literal-property property">getSize</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>updateTriggers<span class="token punctuation">.</span>getTextSize<span class="token punctuation">,</span>
              <span class="token literal-property property">getColor</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>updateTriggers<span class="token punctuation">.</span>getTextColor
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">]</span><span class="token punctuation">;</span>
  	<span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
LabeledIconLayer<span class="token punctuation">.</span>layerName <span class="token operator">=</span> <span class="token string">'LabeledIconLayer'</span><span class="token punctuation">;</span>
<span class="token comment">//定义组合图层属性</span>
LabeledIconLayer<span class="token punctuation">.</span>defaultProps <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// Shared accessors</span>
  <span class="token literal-property property">getPosition</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'accessor'</span><span class="token punctuation">,</span> <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span>position<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// Icon properties</span>
  <span class="token literal-property property">iconAtlas</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">iconMapping</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'object'</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">async</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// Icon accessors</span>
  <span class="token literal-property property">getIcon</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'accessor'</span><span class="token punctuation">,</span> <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span>icon<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">getIconSize</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'accessor'</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">getIconColor</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'accessor'</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// Text properties</span>
  <span class="token literal-property property">fontFamily</span><span class="token operator">:</span> <span class="token constant">DEFAULT_FONT_FAMILY</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fontWeight</span><span class="token operator">:</span> <span class="token constant">DEFAULT_FONT_WEIGHT</span><span class="token punctuation">,</span>
  <span class="token comment">// Text accessors</span>
  <span class="token literal-property property">getText</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'accessor'</span><span class="token punctuation">,</span> <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span>text<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">getTextSize</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'accessor'</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">}</span>
  <span class="token literal-property property">getTextColor</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'accessor'</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br></div></div><blockquote>
<p>子层 id 必须根据其父层的 id 动态生成，否则当有多个 LabeledIconLayers 实例时，它们的子层 id 将发生冲突。</p>
</blockquote>
<p>例如还可以实现<code>labeldGeoJsonLayer</code></p>
<h4 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h4>
<p>构建复合层的通用步骤为（和SubClass差不多）</p>
<ul>
<li>定义面向用户的<code>api</code>（继承你要使用的图层的<code>defaultProps</code>，然后自定义添加一些而外的<code>props</code>）
定义<code>renderLayers()</code>渲染逻辑，因为<code>CompositeLayer</code>并不是开箱即用的层，而是需要使用<code>renderLayers()</code>来组合其他层的渲染逻辑</li>
<li>数据装换（通常想要渲染的数据和<code>Layer</code>要求的数据格式是不一样的），那么就可以需要使用<code>CompositeLayer</code>的数据解析逻辑“适配”你的数据格式，使用<code>CompositeLayer</code>的另外的好处是它允许多个子层共享同一个数据集，这就大程度的提升了数据传输性能。
<ul>
<li>使用钩子函数<code>updateState()</code>来处理当数据发送变化时，在该函数下对数据进行处理，并会自动将处理结果存储在复合层的状态中。这样它也可以被子层访问。</li>
</ul>
</li>
</ul>
<p>例如根据<code>geoJsonLayer</code>定义一个<code>CompositeLayer</code>（给几何添加一些文本标注）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>CompositeLayer<span class="token punctuation">,</span> GeoJsonLayer<span class="token punctuation">,</span> TextLayer<span class="token punctuation">}</span> <span class="token operator">=</span> deck<span class="token punctuation">;</span>
<span class="token comment">//定义面向用户的prop API</span>
<span class="token keyword">const</span> defaultProps <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">//继承GeoJsonLayer props API</span>
    <span class="token operator">...</span>GeoJsonLayer<span class="token punctuation">.</span>defaultProps<span class="token punctuation">,</span>
    <span class="token comment">//获取每个feature的label</span>
    <span class="token literal-property property">getLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'accessor'</span><span class="token punctuation">,</span> <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span>text<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 每个feature的label的大小</span>
    <span class="token literal-property property">getLabelSize</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'accessor'</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">32</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 每个feature的label的颜色</span>
    <span class="token literal-property property">getLabelColor</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'accessor'</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// label始终面向相机</span>
    <span class="token literal-property property">billboard</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// label大小单位</span>
    <span class="token literal-property property">labelSizeUnits</span><span class="token operator">:</span> <span class="token string">'pixels'</span><span class="token punctuation">,</span>
    <span class="token comment">// Label background color</span>
    <span class="token literal-property property">labelBackground</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'color'</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token literal-property property">optional</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// Label font</span>
    <span class="token literal-property property">fontFamily</span><span class="token operator">:</span> <span class="token string">'Monaco, monospace'</span>
<span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">LabeledGeoJsonLayer</span> <span class="token keyword">extends</span> <span class="token class-name">CompositeLayer</span> <span class="token punctuation">{</span>
    <span class="token comment">//图层的生命周期函数，图层在初始化时被调用，对geojson数据做处理，提取取label文本数据</span>
    <span class="token function">updateState</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>changeFlags<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span>data<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>changeFlags<span class="token punctuation">.</span>dataChanged <span class="token operator">&amp;&amp;</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> labelData <span class="token operator">=</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>features <span class="token operator">||</span> data<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">feature<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token keyword">const</span> labelAnchors <span class="token operator">=</span> <span class="token function">getLabelAnchors</span><span class="token punctuation">(</span>feature<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> labelAnchors<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">p</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getSubLayerRow</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">position</span><span class="token operator">:</span> p<span class="token punctuation">}</span><span class="token punctuation">,</span> feature<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>labelData<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token comment">//渲染逻辑（使用同一个数据将GeoJsonLayer和TextLayer的渲染逻辑组合到一起）</span>
    <span class="token function">renderLayers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span>
            getLabel<span class="token punctuation">,</span>
            getLabelSize<span class="token punctuation">,</span>
            getLabelColor<span class="token punctuation">,</span>
            labelSizeUnits<span class="token punctuation">,</span>
            labelBackground<span class="token punctuation">,</span>
            billboard<span class="token punctuation">,</span>
            fontFamily
        <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span>
            <span class="token keyword">new</span> <span class="token class-name">GeoJsonLayer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getSubLayerProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'geojson'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>data
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token keyword">new</span> <span class="token class-name">TextLayer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getSubLayerProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'text'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>labelData<span class="token punctuation">,</span>
                billboard<span class="token punctuation">,</span>
                <span class="token literal-property property">sizeUnits</span><span class="token operator">:</span> labelSizeUnits<span class="token punctuation">,</span>
                <span class="token literal-property property">backgroundColor</span><span class="token operator">:</span> labelBackground<span class="token punctuation">,</span>
                <span class="token function-variable function">getPosition</span><span class="token operator">:</span> <span class="token parameter">d</span> <span class="token operator">=></span> d<span class="token punctuation">.</span>position<span class="token punctuation">,</span>
                <span class="token literal-property property">getText</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getSubLayerAccessor</span><span class="token punctuation">(</span>getLabel<span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token literal-property property">getSize</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getSubLayerAccessor</span><span class="token punctuation">(</span>getLabelSize<span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token literal-property property">getColor</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getSubLayerAccessor</span><span class="token punctuation">(</span>getLabelColor<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
LabeledGeoJsonLayer<span class="token punctuation">.</span>layerName <span class="token operator">=</span> <span class="token string">'LabeledGeoJsonLayer'</span><span class="token punctuation">;</span>
LabeledGeoJsonLayer<span class="token punctuation">.</span>defaultProps <span class="token operator">=</span> defaultProps<span class="token punctuation">;</span>

<span class="token keyword">const</span> layer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LabeledGeoJsonLayer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">countries-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
    data<span class="token punctuation">,</span>
    <span class="token literal-property property">filled</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">billboard</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">getLineColor</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">180</span><span class="token punctuation">,</span> <span class="token number">180</span><span class="token punctuation">,</span> <span class="token number">180</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getLabel</span><span class="token operator">:</span> <span class="token parameter">f</span> <span class="token operator">=></span> f<span class="token punctuation">.</span>properties<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
    <span class="token function-variable function">getLabelSize</span><span class="token operator">:</span> <span class="token parameter">f</span> <span class="token operator">=></span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">log10</span><span class="token punctuation">(</span>turf<span class="token punctuation">.</span><span class="token function">area</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token literal-property property">getLabelColor</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">labelSizeUnits</span><span class="token operator">:</span> <span class="token string">'meters'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">lineWidthMinPixels</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  deckgl<span class="token punctuation">.</span><span class="token function">setProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">layers</span><span class="token operator">:</span> <span class="token punctuation">[</span>layer<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br></div></div><h3 id="_3-subclassed-layers" tabindex="-1"><a class="header-anchor" href="#_3-subclassed-layers" aria-hidden="true">#</a> [3]Subclassed Layers</h3>
<p>deck.gl  Layer被设计为易于扩展以添加功能。子类化允许重新定义层生命周期方法以及顶点和/或片段着色器。</p>
<p>扩展子类的示例：<a href="https://observablehq.com/d/ca5bcbd3d740693b" target="_blank" rel="noopener noreferrer">https://observablehq.com/d/ca5bcbd3d740693b</a></p>
<p>如果层中缺少一个小功能，子类化通常是添加它的好方法，常见的有：</p>
<p>通常写一个Subclassed Layers分为如下步骤：</p>
<ul>
<li>设计面向用户的API
<ul>
<li>To create a new layer class, just extend the <code>Layer</code> class from <code>@deck.gl/core</code>. By default, the layer does not do anything.</li>
<li>用户通过传递prop给自定义的图层类的构造函数，用来告诉图层如何渲染给定的数据集，通常在defaultProps中扩展添加新的props给用户</li>
<li>其实也就是是继承类后给静态成员等添加一些属性，用来在调用该类是根据数据添加一些option</li>
</ul>
</li>
<li>设定自定义attribute和uniform（定义数据怎么传的给的着色器变量的名字）
<a href="https://observablehq.com/@pessimistress/deck-gl-tutorial-subclassing-a-layer" target="_blank" rel="noopener noreferrer">https://observablehq.com/@pessimistress/deck-gl-tutorial-subclassing-a-layer</a>
<ul>
<li>可以通过定义attribute（每个对象特有）和uniform（所有对象共享）来使shader能够拿到拿到用户提供的数据</li>
<li>默认情况下每个Layer都有一个<code>AttributeManager</code>来将要传递给<code>attribute</code>的数据上传到<code>webgl</code>缓冲区中（<code>this.getAttributeManager()</code>)</li>
<li>要自定义<code>attribute</code>的话，可以调用<code>this.attributeManager.add()</code>或<code>this.attributeManager.addInstanced()</code>，然后将其添加到Layer的生命周期<code>initializeState()</code>中</li>
<li>设置自定义<code>uniform</code>则可以通过<code>this.state.model.setUniforms()</code>来设定</li>
</ul>
</li>
<li>shader注入
<ul>
<li>deck.gl 的图层实现了标准的着色器hook，这样一来就可以在着色器中一些常见的地方添加shader代码了</li>
</ul>
</li>
</ul>
<h4 id="overriding-attribute-calculation" tabindex="-1"><a class="header-anchor" href="#overriding-attribute-calculation" aria-hidden="true">#</a> Overriding Attribute Calculation</h4>
<p>可以创建attribute变量，以供后面添加着色其代码时传输给着色其，在生命周期函数initializeState()中添加</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MultiColorPathLayer</span> <span class="token keyword">extends</span> <span class="token class-name">PathLayer</span> <span class="token punctuation">{</span>
	<span class="token function">initializeState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">initializeState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttributeManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addInstanced</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
              <span class="token literal-property property">instanceFrequency</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
              <span class="token literal-property property">accessor</span><span class="token operator">:</span> <span class="token string">'getFrequency'</span><span class="token punctuation">,</span>
              <span class="token literal-property property">defaultValue</span><span class="token operator">:</span> <span class="token number">1</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
  	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="overriding-shaders" tabindex="-1"><a class="header-anchor" href="#overriding-shaders" aria-hidden="true">#</a> Overriding Shaders</h4>
<p>着色器注入语句：</p>
<ul>
<li>**vs:#decl：**向顶点着色器顶部（声明）注入代码</li>
<li>**vs:#main-start：**向顶点着色器主函数开始的地方注入代码</li>
<li>**vs:#main-end：**向顶点着色器主函数结束的地方注入代码</li>
<li>**vs:DeckGL_FILTER_SIZE：**顶点着色器中的一个函数，用于操纵几何体的大小，在投影计算前注入
<ul>
<li><code>DECKGL_FILTER_SIZE(inout vec3 size, VertexGeometry geometry)</code></li>
</ul>
</li>
<li>**vs:DeckGL_FILTER_GL_POSITION：**向顶点着色器最终坐标计算上注入重写代码：顶点着色器中的一个函数，用于操作当前顶点的投影位置。投影后调用
<ul>
<li><code>DECKGL_FILTER_GL_POSITION(inout vec4 position, VertexGeometry geometry)</code></li>
</ul>
</li>
<li>**vs:DeckGL_FILTER_COLOR：**向顶点着色器注入顶点颜色重写代码。</li>
<li>**fs:#decl：**向片元着色器注入声明代码。</li>
<li>**fs:#main-start：**向片元着色器主函数开始的地方注入代码。</li>
<li>**fs:#main-end：**向片元着色器主函数结束的地方注入代码。</li>
<li>**fs:DeckGL_FILTER_COLOR：**向片元着色器注入最终的颜色重写代码。</li>
</ul>
<h4 id="defining-additional-uniforms" tabindex="-1"><a class="header-anchor" href="#defining-additional-uniforms" aria-hidden="true">#</a> Defining Additional Uniforms</h4>
<p>额外的Uniforms传递给自定义着色器的最佳方法是重写 draw() 方法：</p>
<h4 id="defining-additional-attributes" tabindex="-1"><a class="header-anchor" href="#defining-additional-attributes" aria-hidden="true">#</a> Defining Additional Attributes</h4>
<h4 id="layer-extensions" tabindex="-1"><a class="header-anchor" href="#layer-extensions" aria-hidden="true">#</a> Layer Extensions</h4>
<p>对于CompositeLayer通常采用添加图层扩展而不直接继承为子类图层去添加一个功能或效果，因为CompositeLayer通常是由几个图层组合而成的，所以在CompositeLayer继承进行添加自定义效果时，要确保在每个图层都生效就要通过对每个子图层进行子类扩展并添加相同的内容，这样就会比较麻且代码重复了，而图层扩展直接给CompositeLayer图层添加一个扩展变可以对其CompositeLayer的所有组成Layer都生效了。</p>
<p>有时我们需要对多个层进行子类化以添加类似的功能。层扩展是一种概括、重用和共享子类层代码的方法</p>
<h3 id="_4-primitive-layers" tabindex="-1"><a class="header-anchor" href="#_4-primitive-layers" aria-hidden="true">#</a> [4]Primitive Layers</h3>
<p>直接扩展Layer基类来自定义一个layer</p>
<h3 id="_5-shader注入" tabindex="-1"><a class="header-anchor" href="#_5-shader注入" aria-hidden="true">#</a> [5]shader注入</h3>
<p>着色器注入语句：</p>
<ul>
<li><code>**vs:#decl**</code>**：**向顶点着色器顶部（声明）注入代码</li>
<li><code>**vs:#main-start**</code>**：**向顶点着色器主函数开始的地方注入代码</li>
<li><code>**vs:#main-end**</code>**：**向顶点着色器主函数结束的地方注入代码</li>
<li><code>**vs:DeckGL_FILTER_SIZE**</code>**：**顶点着色器中的一个函数，用于操纵几何体的大小，在投影计算前注入
<ul>
<li><code>DECKGL_FILTER_SIZE(inout vec3 size, VertexGeometry geometry)</code></li>
</ul>
</li>
<li><code>**vs:DeckGL_FILTER_GL_POSITION**</code>**：**向顶点着色器最终坐标计算上注入重写代码：顶点着色器中的一个函数，用于操作当前顶点的投影位置。投影后调用
<ul>
<li><code>DECKGL_FILTER_GL_POSITION(inout vec4 position, VertexGeometry geometry)</code></li>
</ul>
</li>
<li><code>**vs:DeckGL_FILTER_COLOR**</code>**：**向顶点着色器注入顶点颜色重写代码。</li>
<li><code>**fs:#decl**</code>**：**向片元着色器注入声明代码。</li>
<li><code>**fs:#main-start**</code>**：**向片元着色器主函数开始的地方注入代码。</li>
<li><code>**fs:#main-end**</code>**：**向片元着色器主函数结束的地方注入代码。</li>
<li><code>**fs:DeckGL_FILTER_COLOR**</code>**：**向片元着色器注入最终的颜色重写代码。</li>
</ul>
<h2 id="_2-api使用" tabindex="-1"><a class="header-anchor" href="#_2-api使用" aria-hidden="true">#</a> 2.API使用</h2>
<p>此部分为对官方文档的翻译</p>
<h3 id="_1-using-layers" tabindex="-1"><a class="header-anchor" href="#_1-using-layers" aria-hidden="true">#</a> [1]Using Layers</h3>
<ul>
<li>图层是deckGL中一个核心的概念， deck.gl 图层是一种打包的可视化类型，它采用一组数据，将每个数据与位置、颜色、拉伸等相关联，并将它们呈现在地图上。DeckGL定义了封装了很多图层，同时也允许通过编写着色其自定义图层</li>
<li>DeckGL将按顺序渲染渲染图层</li>
</ul>
<h3 id="_2-add-interactivity" tabindex="-1"><a class="header-anchor" href="#_2-add-interactivity" aria-hidden="true">#</a> [2]add Interactivity</h3>
<ul>
<li>可以在实例化Deck实例时通过initialViewState配置相机位置</li>
</ul>
<h3 id="_3-坐标系统cs" tabindex="-1"><a class="header-anchor" href="#_3-坐标系统cs" aria-hidden="true">#</a> [3]坐标系统CS</h3>
<p>把地理坐标中各种投影坐标系看做渲染引擎中的世界空间即可</p>
<h4 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> <strong>基本概念</strong></h4>
<ul>
<li><strong>世界空间（World space）</strong></li>
</ul>
<p>数据集的世界坐标系。它通常由数据源决定，例如生成数据的设备，以及存储在磁盘或云数据仓库中的格式</p>
<ul>
<li><strong>公共空间（Common space）</strong></li>
</ul>
<p>为了将来自不同世界空间的数据正确地组合在一起，deck.gl 将它们转换为公共空间（Common space），一个统一的中间层 3D 空间，它是一个右手笛卡尔坐标系。一旦位置位于公共空间中，就可以安全地使用标准线性代数将它们添加、减去、旋转、缩放和拉伸为 3D 向量。这是 deck.gl 图层中所有几何处理的基础。</p>
<p>世界空间和公共空间之间的转换在 deck.gl 文档中称为“project”（世界空间到公共空间）和“unproject”（公共空间到世界空间），由世界空间规范（例如 WGS84）和投影方式（例如 Web Mercator）控制的过程。投影是作为 deck.gl 核心的一部分实现的</p>
<ul>
<li><strong>屏幕空间</strong></li>
</ul>
<p>也就是像素坐标，对于给定的数据集，公共空间中的位置通常不会随着用户交互而改变，而它们在屏幕空间中的外观会随着用户平移、缩放和旋转相机而频繁变化</p>
<h2 id="_3-源码学习" tabindex="-1"><a class="header-anchor" href="#_3-源码学习" aria-hidden="true">#</a> 3.源码学习</h2>
<p>其源码结构类似于常见的常见的地图引擎，很多继承类的关系。</p>
<p>MapboxLayer其实是对mapbox中的customLayer的进一步封装，实例化其实就是customLayer图层</p>
<h3 id="_1-view" tabindex="-1"><a class="header-anchor" href="#_1-view" aria-hidden="true">#</a> [1]view</h3>
<ul>
<li>View 实例包装了相机的“硬配置”。一旦定义，就不需要经常更改</li>
<li>DeckGL允许调用多同时使用多个视图</li>
</ul>
<h3 id="_2-view-state" tabindex="-1"><a class="header-anchor" href="#_2-view-state" aria-hidden="true">#</a> [2]View State</h3>
<ul>
<li>View 实例必须与 viewState <strong>对象结合使用</strong></li>
<li>View State对象描述了 View 实例的状态。视图状态对象在运行时定义视图的临时属性，如相机位置、方向、缩放等。如果视图是交互式的，每次用户平移/旋转/缩放时，视图状态都会更新以反映改变</li>
</ul>
<h3 id="_3-viewport" tabindex="-1"><a class="header-anchor" href="#_3-viewport" aria-hidden="true">#</a> [3]Viewport</h3>
<ul>
<li>视口实例是相机本身，是从 View 实例及其 viewState 中“解析”出来的。它处理数学运算，例如坐标投影/反投影、投影矩阵的计算以及着色器所需的其他 GLSL uniforms</li>
<li>每当 viewState 更新时，view都会在后台创建一个新的viewport，通常，deck.gl 用户不需要直接使用视口Viewport。在某些用例中，Viewport 实例提供的 JavaScript 函数可以方便地投影和取消投影坐标。</li>
</ul>
<h3 id="坐标变换" tabindex="-1"><a class="header-anchor" href="#坐标变换" aria-hidden="true">#</a> 坐标变换</h3>
<p>在DeckGL绘制地理数据时因为地理数据的坐标系是很多种类的，所以在实际绘制时需要先对地理坐标进行转换，需要将经纬度为单位的地理进行投影为米为单位的，然后在进行类似于常见渲染引擎中的变换，如观测变换、投影变换等。</p>
<p>而因为地理数据的地理坐标的坐标系的种类是非常多的，所以为了方便计算和提升性能，大多数WebGIS引擎（如DeckGL、openlayers、mapbox）都默认只支持一种地理坐标系和一种投影坐标系，也就是WGS84 WKID=4326和web墨卡托 WKID=3857。</p>
<p>所以如果要使用其他坐标系的地理数据（如地方坐标系）时，就比较麻烦了，可以先查看有没有相应的API提供，如没有则自己写或者调用网络上其他开源的工具（如proj）来对坐标进行装换计算了。</p>
<h3 id="layer" tabindex="-1"><a class="header-anchor" href="#layer" aria-hidden="true">#</a> Layer</h3>
<p>Layer 类是所有 deck.gl  Layers的基类，它对许多Layers提供了一些基础属性</p>
<h3 id="mapboxlayer" tabindex="-1"><a class="header-anchor" href="#mapboxlayer" aria-hidden="true">#</a> MapboxLayer</h3>
<p>在DeckGL中MapboxLayer类位于源码目录中的<code>modules/mapbox/src/mapbox-layers.ts</code>中</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">//实现了MapBox的CustomLayerInterface接口</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MapboxLayer<span class="token operator">&lt;</span>LayerT <span class="token keyword">extends</span> Layer<span class="token operator">></span></span> <span class="token keyword">implements</span> <span class="token class-name">CustomLayerInterface</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  type<span class="token operator">:</span> <span class="token string">'custom'</span><span class="token punctuation">;</span>
  renderingMode<span class="token operator">:</span> <span class="token string">'2d'</span> <span class="token operator">|</span> <span class="token string">'3d'</span><span class="token punctuation">;</span>
  map<span class="token operator">:</span> Map <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  deck<span class="token operator">:</span> Deck <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  props<span class="token operator">:</span> MapboxLayerProps<span class="token operator">&lt;</span>LayerT<span class="token operator">></span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token operator">:</span> MapboxLayerProps<span class="token operator">&lt;</span>LayerT<span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>props<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'Layer must have an unique id'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> props<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">'custom'</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>renderingMode <span class="token operator">=</span> props<span class="token punctuation">.</span>renderingMode <span class="token operator">||</span> <span class="token string">'3d'</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>map <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>deck <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>props <span class="token operator">=</span> props<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* deck对onAdd方法的实现主要是创建deck实例，并添加设置一些props给deck实例，然后将 */</span>
  <span class="token function">onAdd</span><span class="token punctuation">(</span>map<span class="token operator">:</span> Map<span class="token punctuation">,</span> gl<span class="token operator">:</span> WebGLRenderingContext<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token comment">////获取mapbox的map实例，主要</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>map <span class="token operator">=</span> map<span class="token punctuation">;</span>
    <span class="token comment">//这里通过Layer构建</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>deck <span class="token operator">=</span> <span class="token function">getDeckInstance</span><span class="token punctuation">(</span><span class="token punctuation">{</span>map<span class="token punctuation">,</span> gl<span class="token punctuation">,</span> deck<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>deck<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">addLayer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deck<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">onRemove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deck<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">removeLayer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deck<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">setProps</span><span class="token punctuation">(</span>props<span class="token operator">:</span> MapboxLayerProps<span class="token operator">&lt;</span>LayerT<span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// id cannot be changed</span>
    Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">,</span> props<span class="token punctuation">,</span> <span class="token punctuation">{</span>id<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// safe guard in case setProps is called before onAdd</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deck<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">updateLayer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deck<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">drawLayer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deck<span class="token operator">!</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>map<span class="token operator">!</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><p>因为上面代码是基于Mapbox 代码为</p>
<p>下面以MVTLayer为里继续深入阅读源码，以了解其渲染机制：</p>
<h3 id="安装说明" tabindex="-1"><a class="header-anchor" href="#安装说明" aria-hidden="true">#</a> 安装说明</h3>
<p>安装整个deckGL库</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install deck.gl --save
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>选择性安装模块，直接安装DeckGL库的话其包含如下库</p>
<ul>
<li><code>@deck.gl/core</code></li>
<li>Core module that handles the WebGL rendering pipeline, data management, and user interaction
<ul>
<li><code>@deck.gl/layers</code></li>
</ul>
</li>
<li>Primitive layers that are the building blocks of all visualizations
- <code>@deck.gl/aggregation-layers</code> - Advanced layers that aggregate data into alternative representations, e.g. heatmap, contour, hex bins, etc.
- <code>@deck.gl/geo-layers</code> - Additional layers that handle geospatial use cases and GIS formats.
- <code>@deck.gl/mesh-layers</code> - Additional layers that render 3D meshes and <a href="https://en.wikipedia.org/wiki/Scene_graph" target="_blank" rel="noopener noreferrer">scene graphs</a>.
<ul>
<li><code>@deck.gl/json</code> - Declarative interface that supports specifying deck.gl layers and views using a JSON format.</li>
<li><code>@deck.gl/mapbox</code> - An integration with the <a href="https://deck.gl/docs/api-reference/mapbox/overview" target="_blank" rel="noopener noreferrer">Mapbox custom layer</a> API.</li>
<li><code>@deck.gl/react</code> - React wrapper of deck.gl.</li>
<li><code>@deck.gl/test-utils</code> - Testing utilities.</li>
</ul>
</li>
</ul>
<p>为了减小包的大小可以按需选择上面的包进行安装</p>
</template>
