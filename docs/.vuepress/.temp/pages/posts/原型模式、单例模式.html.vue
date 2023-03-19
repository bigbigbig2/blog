<template><h2 id="_1-prototype-原型模式" tabindex="-1"><a class="header-anchor" href="#_1-prototype-原型模式" aria-hidden="true">#</a> 1.Prototype 原型模式</h2>
<p>JavaScript 是一种基于原型的面向对象编程语言。即便 JavaScript 现在也引入了类的概念，但它也只是基于原型的语法糖而已</p>
<p>如果对象的创建成本比较大，而同一个类的不同对象之间差别不大（大部分字段都相同）， 在这种情况下，我们可以利用对已有对象（原型）进行复制（或者叫拷贝）的方式来创建新 对象，以达到节省创建时间的目的。这种基于原型来创建对象的方式就叫作原型设计模式 （Prototype Design Pattern），简称原型模式。</p>
<p>创建成本大的对象比如：如果对象中的数据需要经过复杂的计算才能得到（比如排序、计算哈希值），或者需要从 RPC、网络、数据库、文件系统等非常慢速的 IO 中读取，这种情况下，我们就可以利用原型模式，从其他已有对象中直接拷贝得到，而不用每次在创建新对象的时候，都重复执 行这些耗时的操作。</p>
<p>在原型设计模式接口中，需要包含一个<code>clone()</code>方法来让使用使用该接口的类实现相应的<code>clone</code>方法，clone()方法的实现可根据情况自定义，同时还需要确定选择浅拷贝还是深拷贝。</p>
<h3 id="基本原理" tabindex="-1"><a class="header-anchor" href="#基本原理" aria-hidden="true">#</a> 基本原理</h3>
<ul>
<li>
<p><strong>Prototype Interface</strong>：描述 clone() 方法的接口</p>
</li>
<li>
<p><strong>Prototype</strong> ：实现原型接口的对象</p>
</li>
<li>
<p><strong>Client</strong>：使用和创建Prototype的客户端</p>
</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14d7b162665e4c258ae3871cc2aee9d1~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IProtoType</span> <span class="token punctuation">{</span>
    <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token keyword">implements</span> <span class="token class-name">IProtoType</span> <span class="token punctuation">{</span>
    field<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>field<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>field <span class="token operator">=</span> field 
    <span class="token punctuation">}</span>

    <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">//浅拷贝</span>
        <span class="token comment">// return JSON.parse(JSON.stringify(this)); //深拷贝</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// The Client</span>
<span class="token keyword">const</span> <span class="token constant">OBJECT1</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">//创建一个包含数组的对象</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">OBJECT1: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token constant">OBJECT1</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token constant">OBJECT2</span> <span class="token operator">=</span> <span class="token constant">OBJECT1</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Clone</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">OBJECT2: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token constant">OBJECT2</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
<span class="token constant">OBJECT2</span><span class="token punctuation">.</span>field<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">101</span>

<span class="token comment">//因为对象第一层数据为array(引用类型),所以浅拷贝的话改变该数据时会同时修改，采用深拷贝则不用</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">OBJECT2: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token constant">OBJECT2</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">OBJECT1: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token constant">OBJECT1</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="应用举例" tabindex="-1"><a class="header-anchor" href="#应用举例" aria-hidden="true">#</a> 应用举例</h3>
<p>下面分别使用浅拷贝和深拷贝克隆Document对象实例的属性和方法</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IProtoType</span> <span class="token punctuation">{</span>
    <span class="token function">clone</span><span class="token punctuation">(</span>mode<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> Document
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Document</span> <span class="token keyword">implements</span> <span class="token class-name">ProtoType</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
    array<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> array<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
        <span class="token keyword">this</span><span class="token punctuation">.</span>array <span class="token operator">=</span> array
    <span class="token punctuation">}</span>

    <span class="token function">clone</span><span class="token punctuation">(</span>mode<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> Document <span class="token punctuation">{</span>
        <span class="token comment">//可选深拷贝和浅拷贝两种</span>
        <span class="token keyword">let</span> array
        <span class="token keyword">if</span> <span class="token punctuation">(</span>mode <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            array <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>array<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//深拷贝</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            array <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>array<span class="token punctuation">)</span> <span class="token comment">//默认为浅拷贝</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> array<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 创建一个Document对象包含两个数组</span>
<span class="token keyword">const</span> <span class="token constant">ORIGINAL_DOCUMENT</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token string">'Original'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">ORIGINAL_DOCUMENT</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token constant">DOCUMENT_COPY_1</span> <span class="token operator">=</span> <span class="token constant">ORIGINAL_DOCUMENT</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">//浅拷贝</span>
<span class="token constant">DOCUMENT_COPY_1</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Copy 1'</span> <span class="token comment">//浅拷贝+原始类型，不会同时修改原对象</span>
<span class="token constant">DOCUMENT_COPY_1</span><span class="token punctuation">.</span>array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">200</span> <span class="token comment">//浅拷贝+array引用类型，会同时修改原数据</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">DOCUMENT_COPY_1</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">ORIGINAL_DOCUMENT</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token constant">DOCUMENT_COPY_2</span> <span class="token operator">=</span> <span class="token constant">ORIGINAL_DOCUMENT</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">//浅拷贝</span>
<span class="token constant">DOCUMENT_COPY_2</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Copy 2'</span>
<span class="token constant">DOCUMENT_COPY_2</span><span class="token punctuation">.</span>array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">]</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">DOCUMENT_COPY_2</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">ORIGINAL_DOCUMENT</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token constant">DOCUMENT_COPY_3</span> <span class="token operator">=</span> <span class="token constant">ORIGINAL_DOCUMENT</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// deep copy</span>
<span class="token constant">DOCUMENT_COPY_3</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Copy 3'</span>
<span class="token constant">DOCUMENT_COPY_3</span><span class="token punctuation">.</span>array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1234</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">DOCUMENT_COPY_3</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">ORIGINAL_DOCUMENT</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Document {
  name: 'Original',
  array: [ [ 1, 2, 3, 4 ], [ 5, 6, 7, 8 ] ]
}

Document {
  name: 'Copy 1',
  array: [ [ 1, 2, 3, 4 ], [ 5, 6, 200, 8 ] ]
}
Document {
  name: 'Original',
  array: [ [ 1, 2, 3, 4 ], [ 5, 6, 200, 8 ] ]
}

Document {
  name: 'Copy 2',
  array: [ [ 1, 2, 3, 4 ], [ 9, 10, 11, 12 ] ]
}
Document {
  name: 'Original',
  array: [ [ 1, 2, 3, 4 ], [ 5, 6, 200, 8 ] ]
}

Document {
  name: 'Copy 3',
  array: [ [ 1, 2, 3, 4 ], [ 1234, 6, 200, 8 ] ]
}
Document {
  name: 'Original',
  array: [ [ 1, 2, 3, 4 ], [ 5, 6, 200, 8 ] ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>关于网上的一张关于赋值、浅拷贝、深拷贝的区分图：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb172689adaa49668e7a7c96aec2bd11~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>浅拷贝只会复制对象中基本数据类型数据和引 用对象的内存地址，不会递归地复制引用对象，以及引用对象的引用对象……而深拷贝得到 的是一份完完全全独立的对象。所以，深拷贝比起浅拷贝来说，更加耗时，更加耗内存空间</p>
<p>如果要拷贝的对象是不可变对象，浅拷贝共享不可变对象是没问题的，但对于可变对象来说，浅拷贝得到的对象和原始对象会共享部分数据，就有可能出现数据被修改的风险，也就 <strong>变得复杂多了</strong></p>
</blockquote>
<h2 id="_2-singleton-单例模式" tabindex="-1"><a class="header-anchor" href="#_2-singleton-单例模式" aria-hidden="true">#</a> 2.Singleton 单例模式</h2>
<p>单例设计模式（Singleton Design Pattern）：一个类只允许创建一个对象（或者实例），那这个类就是一个单例类，这种设计模式就叫作单例设计模式，简称单例模式。</p>
<h3 id="基本原理-1" tabindex="-1"><a class="header-anchor" href="#基本原理-1" aria-hidden="true">#</a> 基本原理</h3>
<p>在调用Singleton类时构造函数就会检查静态instance是否以及被赋值了，如果被赋值有了</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb7930df2dbb46279b8307645f4aff67~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">static</span> instance<span class="token operator">:</span> Singleton
    id<span class="token operator">:</span> <span class="token builtin">number</span>

    <span class="token comment">/* */</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Singleton<span class="token punctuation">.</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> Singleton<span class="token punctuation">.</span>instance
        <span class="token punctuation">}</span>
        Singleton<span class="token punctuation">.</span>instance <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//所以单例模式创建的所有对象都指向一个原始对象</span>
<span class="token keyword">const</span> <span class="token constant">OBJECT1</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> 
<span class="token keyword">const</span> <span class="token constant">OBJECT2</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> 
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">OBJECT1</span> <span class="token operator">===</span> <span class="token constant">OBJECT2</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">OBJECT1</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token comment">// returns 1</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">OBJECT2</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token comment">// returns 1 因为对象实例以及被船舰过了，直接返回的是第一创建按的对象实例</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="应用举例-1" tabindex="-1"><a class="header-anchor" href="#应用举例-1" aria-hidden="true">#</a> 应用举例</h3>
<p>实现一个关于游戏排行榜的应用，游戏对象是由相应的游戏类创建，而排行榜又分出来作为一个单例类，这样创建多个游戏对象时就可以直接引用同一个单例类Singleton了</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bb4fa315a2d445db2fd076a02f63617~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Leaderboard</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> instance<span class="token operator">:</span> Leaderboard
    #table<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Leaderboard<span class="token punctuation">.</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">//单例</span>
            <span class="token keyword">return</span> Leaderboard<span class="token punctuation">.</span>instance
        <span class="token punctuation">}</span>
        Leaderboard<span class="token punctuation">.</span>instance <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">addWinner</span><span class="token punctuation">(</span>position<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>#table<span class="token punctuation">[</span>position<span class="token punctuation">]</span> <span class="token operator">=</span> name
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'-----------Leaderboard-----------'</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>#table<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">|\t</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\t|\t</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>#table<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\t|</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">IGame</span> <span class="token punctuation">{</span>
    <span class="token function">addWinner</span><span class="token punctuation">(</span>position<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Game1</span> <span class="token keyword">implements</span> <span class="token class-name">IGame</span> <span class="token punctuation">{</span>
    leaderboard<span class="token operator">:</span> Leaderboard

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>leaderboard <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Leaderboard</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">addWinner</span><span class="token punctuation">(</span>position<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>leaderboard<span class="token punctuation">.</span><span class="token function">addWinner</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Game2</span> <span class="token keyword">implements</span> <span class="token class-name">IGame</span> <span class="token punctuation">{</span>
    leaderboard<span class="token operator">:</span> Leaderboard

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>leaderboard <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Leaderboard</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">addWinner</span><span class="token punctuation">(</span>position<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>leaderboard<span class="token punctuation">.</span><span class="token function">addWinner</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Game3</span> <span class="token keyword">implements</span> <span class="token class-name">IGame</span> <span class="token punctuation">{</span>
    leaderboard<span class="token operator">:</span> Leaderboard

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>leaderboard <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Leaderboard</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">addWinner</span><span class="token punctuation">(</span>position<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>leaderboard<span class="token punctuation">.</span><span class="token function">addWinner</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



<span class="token keyword">const</span> <span class="token constant">GAME1</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Game1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token constant">GAME1</span><span class="token punctuation">.</span><span class="token function">addWinner</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'Cosmo'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token constant">GAME2</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Game2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token constant">GAME2</span><span class="token punctuation">.</span><span class="token function">addWinner</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'Sean'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token constant">GAME3</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Game3</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token constant">GAME3</span><span class="token punctuation">.</span><span class="token function">addWinner</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'Emmy'</span><span class="token punctuation">)</span>

<span class="token constant">GAME1</span><span class="token punctuation">.</span>leaderboard<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
<span class="token constant">GAME2</span><span class="token punctuation">.</span>leaderboard<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token constant">GAME3</span><span class="token punctuation">.</span>leaderboard<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br></div></div><p>这样一来GAME类就用创建多个leaderboard而是共同引用一个leaderboard实例</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>-----------Leaderboard-----------
|       1       |       Emmy    |
|       2       |       Cosmo   |
|       3       |       Sean    |

-----------Leaderboard-----------
|       1       |       Emmy    |
|       2       |       Cosmo   |
|       3       |       Sean    |

-----------Leaderboard-----------
|       1       |       Emmy    |
|       2       |       Cosmo   |
|       3       |       Sean    |
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div></template>
