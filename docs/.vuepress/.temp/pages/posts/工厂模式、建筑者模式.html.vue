<template><nav class="table-of-contents"><ul><li><RouterLink to="#factory-工厂模式">Factory 工厂模式</RouterLink><ul><li><RouterLink to="#_1-简单工厂模式">1.简单工厂模式</RouterLink><ul><li><RouterLink to="#基本原理">基本原理</RouterLink></li></ul></li><li><RouterLink to="#_2-工厂方法模式">2.工厂方法模式</RouterLink></li><li><RouterLink to="#_3-抽象工厂模式">3.抽象工厂模式</RouterLink><ul><li><RouterLink to="#应用举例">应用举例</RouterLink></li></ul></li></ul></li><li><RouterLink to="#builder-建造者模式">Builder 建造者模式</RouterLink><ul><li><RouterLink to="#_1-基本原理">1.基本原理</RouterLink></li><li><RouterLink to="#_2-应用举例">2.应用举例</RouterLink></li><li><RouterLink to="#_3-与工厂模式的区别">3.与工厂模式的区别</RouterLink></li></ul></li></ul></nav>
<h2 id="factory-工厂模式" tabindex="-1"><a class="header-anchor" href="#factory-工厂模式" aria-hidden="true">#</a> Factory 工厂模式</h2>
<p>当使用new构建对象时的逻辑不够用时，需要添加一些额外的抽象时，工厂模式或许是实现该抽象最简单的模式</p>
<p>一般情况下，工厂模式分为三种更加细分的类型：</p>
<ul>
<li>简单工厂</li>
<li>工厂方法</li>
<li>抽象工厂</li>
</ul>
<p>简单工厂、工厂方法原理比较简单，在实际的项目中也比较常用。而抽象工厂的原理稍微复杂点，在实际的项目中相对也不常用</p>
<p>也有些地方将工厂模式之际分为两类：工厂方法和抽象工厂</p>
<h3 id="_1-简单工厂模式" tabindex="-1"><a class="header-anchor" href="#_1-简单工厂模式" aria-hidden="true">#</a> 1.简单工厂模式</h3>
<h4 id="基本原理" tabindex="-1"><a class="header-anchor" href="#基本原理" aria-hidden="true">#</a> 基本原理</h4>
<p>使用工厂模式写代码时常见的术语</p>
<ul>
<li>Concrete Creator：调用Creator（工厂方法）的客户端应用程序、类或方法</li>
<li>Product Interface：描述工厂创建最终对象所需的                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        属性和方法的接口</li>
<li>Creator：工厂类，声明工厂方法返回要创建的对象</li>
<li>Concrete Product：从工厂类中返回的对象，该对象实现了相应的Product <strong>Interface</strong></li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a5004ad50b74eadb452d3c4eb455c3a~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IProduct</span> <span class="token punctuation">{</span> <span class="token comment">//Product Interface</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProduct</span> <span class="token keyword">implements</span> <span class="token class-name">IProduct</span> <span class="token punctuation">{</span> 
    name <span class="token operator">=</span> <span class="token string">''</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProductA</span> <span class="token keyword">extends</span> <span class="token class-name">ConcreteProduct</span> <span class="token punctuation">{</span> <span class="token comment">//从工厂类创建、返回的对象</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'ConcreteProductA'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProductB</span> <span class="token keyword">extends</span> <span class="token class-name">ConcreteProduct</span> <span class="token punctuation">{</span><span class="token comment">//从工厂类创建、返回的对象</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'ConcreteProductB'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProductC</span> <span class="token keyword">extends</span> <span class="token class-name">ConcreteProduct</span> <span class="token punctuation">{</span><span class="token comment">//从工厂类创建、返回的对象</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'ConcreteProductC'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Creator</span> <span class="token punctuation">{</span> <span class="token comment">//工厂类</span>
    <span class="token keyword">static</span> <span class="token function">createObject</span><span class="token punctuation">(</span>someProperty<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> IProduct <span class="token punctuation">{</span> <span class="token comment">//工厂方法</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>someProperty <span class="token operator">===</span> <span class="token string">'a'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteProductA</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>someProperty <span class="token operator">===</span> <span class="token string">'b'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteProductB</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteProductC</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// The Client</span>
<span class="token keyword">const</span> <span class="token constant">PRODUCT</span> <span class="token operator">=</span> Creator<span class="token punctuation">.</span><span class="token function">createObject</span><span class="token punctuation">(</span><span class="token string">'b'</span><span class="token punctuation">)</span> <span class="token comment">//Concrete Creator调用工厂方法</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">PRODUCT</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><blockquote>
<ul>
<li>工厂类中创建对象的方法一般是以create开头</li>
</ul>
</blockquote>
<p>上面的方式在一些资料为称为简单工厂，简单工厂模式的代码实现中，有多处 if 分支判断逻辑，违背开闭原则，但权衡扩展性和可读性，这样的代码实现在大多数情况下（比如，不需要频繁地添加 parser，也没有太多的 parser）是没有问题的</p>
<p><strong>使用情况举例：</strong></p>
<p>这里先举一个使用工厂模式的例子，例如一个汽车（保时捷）配件选购应用，需要根据客户对各种配置（的选择最终根据该参数使用工厂模式例化出相应的对象。在应用程序实际运行并且用户开始使用之前，不知道用户会选择什么。</p>
<p>使用工厂模式的化便可以，根据选定的参数来确认具体使用那个子类来进行实例化以返回相应的对象</p>
<h3 id="_2-工厂方法模式" tabindex="-1"><a class="header-anchor" href="#_2-工厂方法模式" aria-hidden="true">#</a> 2.工厂方法模式</h3>
<p>工厂方法模式使用多态等方式解决了简单简单工厂模式中if-else逻辑以让代码基本上符合开闭原则</p>
<p>当对象的创建逻辑比较复杂，不只是简单的 new 一下就可以，而是要组合其他类对象，做各种初始化操作的时候，就推荐使用工厂方法模式，将复杂的创建逻辑拆分到多个工厂类中，让每个工厂类都不至于过于复杂。而使用简单工厂模式，将所有的创建逻辑都放到一个工厂类中，会导致这个工厂类变得很复杂</p>
<p>除此之外，在某些场景下，如果对象不可复用，那工厂类每次都要返回不同的对象。如果我们使用简单工厂模式来实现，就只能选择第一种包含 if-elsl分支逻辑的实现方式。</p>
<h3 id="_3-抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#_3-抽象工厂模式" aria-hidden="true">#</a> 3.抽象工厂模式</h3>
<p>抽象工厂模式的应用场景比较特殊，没有前两种常用</p>
<p>抽象工厂模式在其他其创建型设计模式中添加一个抽象层，可简单的看作可以返回工厂的工厂（尽管会返回创建型设计模式中的其他实现）</p>
<p>基本原理</p>
<ul>
<li><strong>Client</strong>：调用抽象工厂模式的应用程序</li>
<li><strong>Abstract Factory</strong>:所有子工厂通用的接口</li>
<li><strong>Concrete Factory</strong>: 抽象工厂的子工厂，包含创建一些具体对象（Concrete Product）的方法</li>
<li><strong>Abstract Product</strong>:子工厂返回的对象的抽象</li>
<li><strong>Concrete Product</strong>:最终返回的对象</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50a7f59cfc70462c841a6eb2b865aeb9~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IProduct</span> <span class="token keyword">extends</span> <span class="token class-name">IProductA</span><span class="token punctuation">,</span> IProductB <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">//抽象工厂类</span>
<span class="token keyword">class</span> <span class="token class-name">AbstractFactory</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">createObject</span><span class="token punctuation">(</span>factory<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> IProduct <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"aa"</span><span class="token punctuation">,</span> <span class="token string">"ab"</span><span class="token punctuation">,</span> <span class="token string">"ac"</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>factory<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> FactoryA<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span>factory<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"ba"</span><span class="token punctuation">,</span> <span class="token string">"bb"</span><span class="token punctuation">,</span> <span class="token string">"bc"</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>factory<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> FactoryB<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span>factory<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"No Factory Found"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// The Client</span>
<span class="token keyword">let</span> <span class="token constant">PRODUCT</span> <span class="token operator">=</span> AbstractFactory<span class="token punctuation">.</span><span class="token function">createObject</span><span class="token punctuation">(</span><span class="token string">"ab"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">PRODUCT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token constant">PRODUCT</span> <span class="token operator">=</span> AbstractFactory<span class="token punctuation">.</span><span class="token function">createObject</span><span class="token punctuation">(</span><span class="token string">"bc"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">PRODUCT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//factoryA</span>
<span class="token keyword">interface</span> <span class="token class-name">IProductA</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProduct</span> <span class="token keyword">implements</span> <span class="token class-name">IProductA</span> <span class="token punctuation">{</span>
    name <span class="token operator">=</span> <span class="token string">''</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProductA</span> <span class="token keyword">extends</span> <span class="token class-name">ConcreteProduct</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'FactoryA:ConcreteProductA'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProductB</span> <span class="token keyword">extends</span> <span class="token class-name">ConcreteProduct</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'FactoryA:ConcreteProductB'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProductC</span> <span class="token keyword">extends</span> <span class="token class-name">ConcreteProduct</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'FactoryA:ConcreteProductC'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">FactoryA</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token function">getObject</span><span class="token punctuation">(</span>some_property<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> IProductA <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>some_property <span class="token operator">===</span> <span class="token string">'a'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteProductA</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>some_property <span class="token operator">===</span> <span class="token string">'b'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteProductB</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>some_property <span class="token operator">===</span> <span class="token string">'c'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteProductC</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'Class Not Found'</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//factoryB</span>
<span class="token keyword">interface</span> <span class="token class-name">IProductB</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProduct</span> <span class="token keyword">implements</span> <span class="token class-name">IProductB</span> <span class="token punctuation">{</span>
    name <span class="token operator">=</span> <span class="token string">''</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProductA</span> <span class="token keyword">extends</span> <span class="token class-name">ConcreteProduct</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'FactoryB:ConcreteProductA'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProductB</span> <span class="token keyword">extends</span> <span class="token class-name">ConcreteProduct</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'FactoryB:ConcreteProductB'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteProductC</span> <span class="token keyword">extends</span> <span class="token class-name">ConcreteProduct</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'FactoryB:ConcreteProductC'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">FactoryB</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token function">getObject</span><span class="token punctuation">(</span>some_property<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> IProductB <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>some_property <span class="token operator">===</span> <span class="token string">'a'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteProductA</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>some_property <span class="token operator">===</span> <span class="token string">'b'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteProductB</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>some_property <span class="token operator">===</span> <span class="token string">'c'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteProductC</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'Class Not Found'</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br></div></div><blockquote>
<p>在实际使用过程中通常将其分模块到不同文件中</p>
</blockquote>
<h4 id="应用举例" tabindex="-1"><a class="header-anchor" href="#应用举例" aria-hidden="true">#</a> 应用举例</h4>
<p>假如你有一家具店，出售许多类型的家具，如椅子、桌子，它们都购买自不同的加工厂</p>
<p>您可以创建一个名为 FurnitureFactory 的抽象类来处理椅子和桌子工厂，从而在客户端中移除实现细节
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26b66c88f8d3467a90f3cd7b6ceacb35~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>文件模块划分模块：</p>
<ul>
<li><code>furniture-factory.ts</code>:抽象工厂类
<ul>
<li><code>chair-factory.ts</code>子工厂chair
<ul>
<li><code>chair.ts</code>chair基类及chair类接口</li>
<li><code>samall-chair.ts</code>继承chair基类并实现其接口的子类</li>
<li><code>medium-chair.ts</code></li>
<li><code>big-chair.ts</code></li>
</ul>
</li>
<li><code>table-factory.ts</code>子工厂table
<ul>
<li><code>table.ts</code></li>
<li><code>samall-table.ts</code>继承table基类并实现其接口的子类</li>
<li><code>medium-table.ts</code></li>
<li><code>big-table.ts</code></li>
</ul>
</li>
</ul>
</li>
<li>client.ts:调用抽象工厂类的应用程序</li>
</ul>
<h2 id="builder-建造者模式" tabindex="-1"><a class="header-anchor" href="#builder-建造者模式" aria-hidden="true">#</a> Builder 建造者模式</h2>
<p>在直接使用给构造函数传递一些必须或可选参数和使用set方法设置可选参数、使用构造函数接受必选参数，在或者在new一个新对象后就不可以使用set修改其属性值时就可以考虑建造者模式了</p>
<p>建造者模式试图解决的问题</p>
<ul>
<li>类如何创建复杂对象的不同表示</li>
<li>如何简化创建复杂对象的类</li>
</ul>
<p>建造者模式与工厂模式都是在运行时实例化对象</p>
<h3 id="_1-基本原理" tabindex="-1"><a class="header-anchor" href="#_1-基本原理" aria-hidden="true">#</a> 1.基本原理</h3>
<ul>
<li><strong>Product</strong>: 最后构造的对象/产品</li>
<li><strong>Builder Interface</strong>: 构造者需要具体实现的接口</li>
<li><strong>Builder</strong>: 构造者类，提供相应参数给构造者类和校验参数的具体方法，同时实现相应的构造者接口</li>
<li><strong>Director</strong>: 有一个 <code>construct()</code>静态方法 ，当被程序调用时创建要使用Builder类的方法创建一个定制的产品/对象</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4b5ccfd05ac4547804e5cb247acb653~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    parts<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">IBuilder</span> <span class="token punctuation">{</span> <span class="token comment">//构造者类接口</span>
    <span class="token function">buildPartA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span>
    <span class="token function">buildPartB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span>
    <span class="token function">buildPartC</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span>
    <span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Product
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token keyword">implements</span> <span class="token class-name">IBuilder</span> <span class="token punctuation">{</span>
    <span class="token comment">// The Concrete Builder</span>
    product<span class="token operator">:</span> Product

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">buildPartA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>product<span class="token punctuation">.</span>parts<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>

    <span class="token function">buildPartB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>product<span class="token punctuation">.</span>parts<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'b'</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>

    <span class="token function">buildPartC</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>product<span class="token punctuation">.</span>parts<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'c'</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>

    <span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>product
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//可以创建多个Director来自定义创建多种不同的对象</span>
<span class="token keyword">class</span> <span class="token class-name">Director</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token function">construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token string">'Constructs and returns the final product'</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">buildPartA</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">buildPartB</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">buildPartC</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// The Client</span>
<span class="token keyword">const</span> <span class="token constant">PRODUCT1</span> <span class="token operator">=</span> Director<span class="token punctuation">.</span><span class="token function">construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">PRODUCT1</span><span class="token punctuation">.</span>parts<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[ 'a', 'b', 'c' ]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-应用举例" tabindex="-1"><a class="header-anchor" href="#_2-应用举例" aria-hidden="true">#</a> 2.应用举例</h3>
<p>假设现在要实现一个程序：资源池配置类 <code>ResourcePoolConfig</code>，其成员变量和方法如下，而且不能在实例化出具体对象后使用set方法修改设定其成员属性值。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9904a1268f4435585b131e470354daf~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><code>client.ts</code></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> ResourcePoolConfigDirectors <span class="token keyword">from</span> <span class="token string">"./ResourcePoolConfig-director"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> test <span class="token operator">=</span> ResourcePoolConfigDirectors<span class="token punctuation">.</span><span class="token function">structure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>ResourcePoolConfig-director</code></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> ResourcePoolConfigBuilder <span class="token keyword">from</span> <span class="token string">"./ResourcePoolConfig-builder"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ResourcePoolConfig <span class="token keyword">from</span> <span class="token string">"./ResourcePoolConfig"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">ResourcePoolConfigDirectors</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">structure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ResourcePoolConfig <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResourcePoolConfigBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"hahah"</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setMaxIdle</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setMaxTotal</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setMinIdle</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><code>ResourcePoolConfig-builder.ts</code></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> ResourcePoolConfig <span class="token keyword">from</span> <span class="token string">"./ResourcePoolConfig"</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">IResourcePoolConfigBuilder</span> <span class="token punctuation">{</span>
  resourcePoolConfig<span class="token operator">:</span> ResourcePoolConfig<span class="token punctuation">;</span>
  <span class="token function">setName</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token function">setMaxTotal</span><span class="token punctuation">(</span>maxToal<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token function">setMaxIdle</span><span class="token punctuation">(</span>maxIdle<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token function">setMinIdle</span><span class="token punctuation">(</span>maxIdle<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ResourcePoolConfig<span class="token punctuation">;</span> <span class="token comment">//校验方法</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">ResourcePoolConfigBuilder</span>
  <span class="token keyword">implements</span> <span class="token class-name">IResourcePoolConfigBuilder</span>
<span class="token punctuation">{</span>
  resourcePoolConfig<span class="token operator">:</span> ResourcePoolConfig<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ResourcePoolConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">setName</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//错误处理或者提示</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">setMaxTotal</span><span class="token punctuation">(</span>maxToal<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>maxToal <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//错误处理</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">.</span>maxToal <span class="token operator">=</span> maxToal<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">setMaxIdle</span><span class="token punctuation">(</span>maxIdle<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>maxIdle <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//错误处理</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">.</span>maxIdle <span class="token operator">=</span> maxIdle<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">setMinIdle</span><span class="token punctuation">(</span>minIdle<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>minIdle <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//错误处理</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">.</span>minIdle <span class="token operator">=</span> minIdle<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ResourcePoolConfig <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 错误处理</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">.</span>maxIdle <span class="token operator">></span> <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">.</span>maxToal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//错误处理</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">.</span>minIdle <span class="token operator">></span> <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">.</span>maxToal <span class="token operator">||</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">.</span>minIdle <span class="token operator">></span> <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">.</span>maxIdle
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//错误处理</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePoolConfig<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br></div></div><p><code>ResourcePoolConfig.ts</code></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">ResourcePoolConfig</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
  maxToal<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
  maxIdle<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
  minIdle<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token function">construction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">资源名称为 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,最大资源数量为 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>maxToal<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,最大空闲资源数量为</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>maxIdle<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,
      最小资源数量为</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>minIdle<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="_3-与工厂模式的区别" tabindex="-1"><a class="header-anchor" href="#_3-与工厂模式的区别" aria-hidden="true">#</a> 3.与工厂模式的区别</h3>
<p>示例理解就行不用死记概念：顾客走进一家餐馆点餐，我们利用工厂模式，根据用户不同的选择，来制作不同的食物，比 如披萨、汉堡、沙拉。对于披萨来说，用户又有各种配料可以定制，比如奶酪、西红柿、起司，我们通过建造者模式根据用户选择的不同配料来制作披萨</p>
</template>
