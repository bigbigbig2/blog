<template><h2 id="_1-模块化" tabindex="-1"><a class="header-anchor" href="#_1-模块化" aria-hidden="true">#</a> 1，模块化</h2>
<p>模块化是指自上而下把一个复杂问题（功能）划分成若干模块的过程，在编程中就是指通过某种规则对程序（代码）进行分割、组织、打包，每个模块完成一个特定的子功能，再把所有的模块按照某种规则进行组装，合并成一个整体，最终完成整个系统的所有功能</p>
<p>从基于 <code>Node.js</code> 的服务端 <code>commonjs</code> 模块化，到前端基于浏览器的 <code>AMD</code>、<code>CMD</code> 模块化，再到 <code>ECMAScript2015</code> 开始原生内置的模块化， <code>JavaScript</code> 的模块化方案和系统日趋成熟。</p>
<p><code>TypeScript</code> 也是支持模块化的，而且它的出现要比 <code>ECMAScript</code>模块系统标准化要早，所以在 <code>TypeScript</code> 中即有对 <code>ECMAScript</code> 模块系统的支持，也包含有一些自己的特点。。</p>
<h2 id="_2-模块化历程" tabindex="-1"><a class="header-anchor" href="#_2-模块化历程" aria-hidden="true">#</a> 2，模块化历程</h2>
<ul>
<li>CommonJS</li>
<li>AMD</li>
<li>UMD</li>
<li>ESM</li>
</ul>
<p>无论是那种模块化规范，重点关注：保证模块独立性的同时又能很好的与其它模块进行交互</p>
<ul>
<li>如何定义一个模块与模块内部私有作用域</li>
<li>通过何种方式导出模块内部数据</li>
<li>通过何种方式导入其它外部模块数据</li>
</ul>
<h2 id="_3-基于服务端、桌面端的模块化" tabindex="-1"><a class="header-anchor" href="#_3-基于服务端、桌面端的模块化" aria-hidden="true">#</a> 3，基于服务端、桌面端的模块化</h2>
<h3 id="commonjs" tabindex="-1"><a class="header-anchor" href="#commonjs" aria-hidden="true">#</a> CommonJS</h3>
<p>在早期，对于运行在浏览器端的 <code>JavaScript</code> 代码，模块化的需求并不那么的强烈，反而是偏向 服务端、桌面端 的应用对模块化有迫切的需求（相对来说，服务端、桌面端程序的代码和需求要复杂一些）。<code>CommonJS</code> 规范就是一套偏向服务端的模块化规范，它为非浏览器端的模块化实现制定了一些的方案和标准，<code>NodeJS</code> 就采用了这个规范。</p>
<p><strong>独立模块作用域</strong></p>
<p>一个文件就是模块，拥有独立的作用域</p>
<p><strong>导出模块内部数据</strong></p>
<p>通过 <code>module.exports</code> 或 <code>exports</code> 对象导出模块内部数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">x</span><span class="token operator">:</span> a<span class="token punctuation">,</span>
  <span class="token literal-property property">y</span><span class="token operator">:</span> b
<span class="token punctuation">}</span>
<span class="token comment">// or</span>
exports<span class="token punctuation">.</span>x <span class="token operator">=</span> a<span class="token punctuation">;</span>
exports<span class="token punctuation">.</span>y <span class="token operator">=</span> b<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>导入外部模块数据</strong></p>
<p>通过 <code>require</code> 函数导入外部模块数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// b.js</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
a<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这些代码可以使用node去执行它</p>
<h2 id="_4-基于浏览器的模块化" tabindex="-1"><a class="header-anchor" href="#_4-基于浏览器的模块化" aria-hidden="true">#</a> 4，基于浏览器的模块化</h2>
<h3 id="amd" tabindex="-1"><a class="header-anchor" href="#amd" aria-hidden="true">#</a> AMD</h3>
<p>因为 CommonJS 规范一些特性（基于文件系统，同步加载），它并不适用于浏览器端，所以另外定义了适用于浏览器端的规范</p>
<p><code>AMD(Asynchronous Module Definition)</code>异步模块定义</p>
<p>注意:在AMD模块化中并不是一个文件表示一个模块，也就意味着在一个文件中可以定义多个模块（define），当时推荐一个文件中添加一个某块就够了。</p>
<p>https://github.com/amdjs/amdjs-api/wiki/AMD</p>
<p>浏览器并没有具体实现该规范的代码，我们可以通过一些第三方库来解决</p>
<h4 id="requirejs-库" tabindex="-1"><a class="header-anchor" href="#requirejs-库" aria-hidden="true">#</a> requireJS（库）</h4>
<p>https://requirejs.org/</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 1.html  </span>
<span class="token comment">//data-main 表明你要导入文件的入口文件，以为通常会出现模块引用着另外一个模块的情况，要把它们都导进来就需要确定入口文件</span>
<span class="token operator">&lt;</span>script data<span class="token operator">-</span>main<span class="token operator">=</span><span class="token string">"./js/a.s"</span> src<span class="token operator">=</span><span class="token string">"https://cdn.bootcss.com/require.js/2.3.6/require.min.js"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="独立模块作用域" tabindex="-1"><a class="header-anchor" href="#独立模块作用域" aria-hidden="true">#</a> <strong>独立模块作用域</strong></h4>
<p>通过一个 <code>define</code> 方法来定义一个模块，在该方法内部模拟模块独立作用域</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// b.js</span>
<span class="token comment">//与CommonJS规范不同得是，CommonJS规范对整个文件在运行过程中会参数独立得作用域</span>
<span class="token comment">//在前端如果直接使用let a = 2 ...来写代码，那么会在加载过程中将其变为全局作用域</span>
<span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 模块内部代码</span>
    <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token comment">//这样在这个文件define外部是不能调用let a 和 let b 的</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="导出模块内部数据-return" tabindex="-1"><a class="header-anchor" href="#导出模块内部数据-return" aria-hidden="true">#</a> <strong>导出模块内部数据</strong>(return)</h4>
<p>通过 <code>return</code> 导出模块内部数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// b.js</span>
<span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">x</span><span class="token operator">:</span> a<span class="token punctuation">,</span>
  	<span class="token literal-property property">y</span><span class="token operator">:</span> b
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="导入外部模块数据" tabindex="-1"><a class="header-anchor" href="#导入外部模块数据" aria-hidden="true">#</a> <strong>导入外部模块数据</strong></h4>
<p>通过前置依赖列表导入外部模块数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token comment">// 定义一个模块，并导入 ./b 模块</span>
<span class="token comment">//它会将导入的数据默认的传到function的参数里</span>
<span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'./b'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="requirejs的-commonjs-风格" tabindex="-1"><a class="header-anchor" href="#requirejs的-commonjs-风格" aria-hidden="true">#</a> requireJS的 CommonJS 风格</h4>
<p><code>require.js</code> 也支持 <code>CommonJS</code> 风格的语法</p>
<h5 id="导出模块内部数据" tabindex="-1"><a class="header-anchor" href="#导出模块内部数据" aria-hidden="true">#</a> <strong>导出模块内部数据</strong></h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// b.js</span>
<span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    
  <span class="token comment">//module.exports === exports true   </span>
  module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">x</span><span class="token operator">:</span> a<span class="token punctuation">,</span>
    <span class="token literal-property property">y</span><span class="token operator">:</span> b
  <span class="token punctuation">}</span>
   <span class="token keyword">export</span><span class="token punctuation">.</span>x<span class="token operator">=</span>a<span class="token punctuation">;</span>
   <span class="token keyword">export</span><span class="token punctuation">.</span>y<span class="token operator">=</span>b<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h5 id="导入外部模块数据-1" tabindex="-1"><a class="header-anchor" href="#导入外部模块数据-1" aria-hidden="true">#</a> <strong>导入外部模块数据</strong></h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./b'</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="umd" tabindex="-1"><a class="header-anchor" href="#umd" aria-hidden="true">#</a> UMD</h3>
<p>严格来说，<code>UMD</code> 并不属于一套模块规范，它主要用来处理 <code>CommonJS</code>、<code>AMD</code>、<code>CMD</code> 的差异兼容，是模块代码能在前面不同的模块环境下都能正常运行。随着 <code>Node.js</code> 的流行，前端和后端都可以基于 <code>JavaScript</code> 来进行开发，这个时候或多或少的会出现前后端使用相同代码的可能，特别是一些不依赖宿主环境（浏览器、服务器）的偏低层的代码。我们能实现<strong>一套代码多端适用（同构）</strong>，其中在不同的模块化标准下使用也是需要解决的问题，<code>UMD</code> 就是一种解决方式</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> factory</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//通过判断modle下有没有“object"对象，如果有就是CommonJS环境</span>
  	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> module <span class="token operator">===</span> <span class="token string">"object"</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> module<span class="token punctuation">.</span>exports <span class="token operator">===</span> <span class="token string">"object"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Node, CommonJS-like</span>
        module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> define <span class="token operator">===</span> <span class="token string">"function"</span> <span class="token operator">&amp;&amp;</span> define<span class="token punctuation">.</span>amd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      	<span class="token comment">// AMD 模块环境下 浏览器环境</span>
        <span class="token function">define</span><span class="token punctuation">(</span>factory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      	<span class="token comment">// 不使用任何模块系统，直接挂载到全局</span>
      	root<span class="token punctuation">.</span>kkb <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token comment">//下面（）中的为向上面函数传递的参数</span>
<span class="token comment">//this环境，如果在windows中为windows</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
		<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

    <span class="token comment">// 模块导出数据</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">x</span><span class="token operator">:</span> a<span class="token punctuation">,</span>
        <span class="token literal-property property">y</span><span class="token operator">:</span> b
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>这样子node和前端环境使用同样段代码就不需要写两次，而是通过写一个逻辑判断来看看是处于node环境还是前端环境</p>
<h2 id="_5-esm" tabindex="-1"><a class="header-anchor" href="#_5-esm" aria-hidden="true">#</a> 5，ESM</h2>
<p>从 <code>ECMAScript2015/ECMAScript6</code> 开始，<code>JavaScript</code> 原生引入了模块概念，而且现在主流浏览器也都有了很好的支持，同时在 <code>Node.js</code> 也有了支持，所以未来基于 <code>JavaScript</code> 的程序无论是在前端浏览器还是在后端 <code>Node.js</code> 中，都会逐渐的被统一</p>
<h3 id="独立模块作用域-1" tabindex="-1"><a class="header-anchor" href="#独立模块作用域-1" aria-hidden="true">#</a> 独立模块作用域</h3>
<p>一个文件就是模块，拥有独立的作用域，且导出的模块都自动处于 <code>严格模式</code> 下，即：<code>'use strict'</code></p>
<p>ESM使用要求:<code>script</code> 标签需要声明 <code>type=&quot;module&quot;</code></p>
<div class="language-HTML ext-HTML line-numbers-mode"><pre v-pre class="language-HTML"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    
    &lt;script src=&quot;js/a.js&quot; type=&quot;module&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>注意：通过这样导入文件，不能通过文件的在浏览器方式打开(这样导入的js是无效的)，要通过服务器插件什么打开</p>
<h3 id="导出模块内部数据-1" tabindex="-1"><a class="header-anchor" href="#导出模块内部数据-1" aria-hidden="true">#</a> 导出模块内部数据</h3>
<p>使用 <code>export</code> 语句导出模块内部数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 导出单个特性</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> name1<span class="token punctuation">,</span> name2<span class="token punctuation">,</span> …<span class="token punctuation">,</span> nameN<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> name1 <span class="token operator">=</span> …<span class="token punctuation">,</span> name2 <span class="token operator">=</span> …<span class="token punctuation">,</span> …<span class="token punctuation">,</span> nameN<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">FunctionName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ClassName</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>

<span class="token comment">// 导出列表</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> name1<span class="token punctuation">,</span> name2<span class="token punctuation">,</span> …<span class="token punctuation">,</span> nameN <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 重命名导出</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> variable1 <span class="token keyword">as</span> name1<span class="token punctuation">,</span> variable2 <span class="token keyword">as</span> name2<span class="token punctuation">,</span> …<span class="token punctuation">,</span> nameN <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 默认导出</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> expression<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">…</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> … <span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">name1</span><span class="token punctuation">(</span><span class="token parameter">…</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> … <span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> name1 <span class="token keyword">as</span> <span class="token keyword">default</span><span class="token punctuation">,</span> … <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 模块重定向导出</span>
<span class="token keyword">export</span> <span class="token operator">*</span> from …<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> name1<span class="token punctuation">,</span> name2<span class="token punctuation">,</span> …<span class="token punctuation">,</span> nameN <span class="token punctuation">}</span> from …<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> import1 <span class="token keyword">as</span> name1<span class="token punctuation">,</span> import2 <span class="token keyword">as</span> name2<span class="token punctuation">,</span> …<span class="token punctuation">,</span> nameN <span class="token punctuation">}</span> from …<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token punctuation">}</span> from …<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> v <span class="token punctuation">{</span>x<span class="token punctuation">,</span>y<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./b.js"</span> <span class="token comment">//相当与结构，将b.js文件中导出的x，和y导出来</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">,</span>v<span class="token punctuation">)</span> <span class="token comment">//1,2,3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//b.js</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> x <span class="token operator">=</span>a<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> y <span class="token operator">=</span>b<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> a<span class="token operator">+</span>b<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="导入外部模块数据-2" tabindex="-1"><a class="header-anchor" href="#导入外部模块数据-2" aria-hidden="true">#</a> 导入外部模块数据</h3>
<p>导入分为两种模式(与vue-router中的路由懒加载同理)</p>
<ul>
<li>静态导入</li>
<li>动态导入</li>
</ul>
<h4 id="静态导入" tabindex="-1"><a class="header-anchor" href="#静态导入" aria-hidden="true">#</a> <strong>静态导入</strong></h4>
<p>使用 <code>import</code> 语句导入模块，这种方式称为：<code>静态导入</code></p>
<p>静态导入方式不支持延迟加载，<code>import</code> 必须在模块的最开始</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> defaultExport <span class="token keyword">from</span> <span class="token string">"module-name"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> name <span class="token keyword">from</span> <span class="token string">"module-name"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token keyword">export</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"module-name"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token keyword">export</span> <span class="token keyword">as</span> alias <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"module-name"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> export1 <span class="token punctuation">,</span> export2 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"module-name"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"module-name/path/to/specific/un-exported/file"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> export1 <span class="token punctuation">,</span> export2 <span class="token keyword">as</span> alias2 <span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"module-name"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> defaultExport<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token keyword">export</span> <span class="token punctuation">[</span> <span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"module-name"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> defaultExport<span class="token punctuation">,</span> <span class="token operator">*</span> <span class="token keyword">as</span> name <span class="token keyword">from</span> <span class="token string">"module-name"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">"module-name"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// import 必须放置在当前模块最开始加载</span>
    <span class="token comment">// import m from './m.js'</span>

    <span class="token comment">// console.log(m);</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="动态导入" tabindex="-1"><a class="header-anchor" href="#动态导入" aria-hidden="true">#</a> <strong>动态导入</strong></h4>
<p>此外，还有一个类似函数的动态 <code>import()</code>，它不需要依赖 <code>type=&quot;module&quot;</code> 的 script 标签。</p>
<p>关键字 <code>import</code> 可以像调用函数一样来动态的导入模块。以这种方式调用，将返回一个 <code>promise</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./m.js'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">m</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 也支持 await</span>
<span class="token keyword">let</span> m <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./m.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote>
<p>通过 <code>import()</code> 方法导入返回的数据会被包装在一个对象中，即使是 <code>default</code> 也是如此</p>
</blockquote>
<h2 id="_6-ts中的模块化" tabindex="-1"><a class="header-anchor" href="#_6-ts中的模块化" aria-hidden="true">#</a> 6，Ts中的模块化</h2>
<p><code>TypeScript</code> 也支持模块化，而且它的出现比 <code>ESM</code> 还要早，<code>TypeScript</code> 的模块化实现也有一些地方与上述其它一些模块化系统有所差异，但是随着 <code>TypeScript</code> 的更新，同时 <code>ESM</code> 标准本身也越来越成熟，所以当下和未来 <code>TypeScript</code> 的模块化也会与 <code>ESM</code> 越来越接近</p>
<h3 id="ts-模块系统" tabindex="-1"><a class="header-anchor" href="#ts-模块系统" aria-hidden="true">#</a> TS 模块系统</h3>
<p>虽然早期的时候，<code>TypeScript</code> 有一套自己的模块系统实现，但是随着更新，以及 <code>JavaScript</code> 模块化的日趋成熟，<code>TypeScript</code> 对 <code>ESM</code> 模块系统的支持也是越来越完善</p>
<h3 id="模块" tabindex="-1"><a class="header-anchor" href="#模块" aria-hidden="true">#</a> 模块</h3>
<p>无论是 <code>JavaScript</code> 还是 <code>TypeScript</code> 都是以一个文件作为模块最小单元</p>
<ul>
<li>任何一个包含了顶级 <code>import</code> 或者 <code>export</code> 的文件都被当成一个模块</li>
<li>相反的一个文件不带有顶级的 <code>import</code> 或者 <code>export</code> ，那么它的内容就是全局可见的</li>
</ul>
<h3 id="全局模块" tabindex="-1"><a class="header-anchor" href="#全局模块" aria-hidden="true">#</a> 全局模块</h3>
<p>如果一个文件中没有顶级 <code>import</code> 或者 <code>export</code> ，那么它的内容就是全局的，整个项目可见的</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">//a.ts和b.ts为与src目录下</span>
<span class="token comment">// a.ts</span>
<span class="token keyword">let</span> a1 <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> a2 <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// b.ts</span>
<span class="token comment">// ok, 100因为a1为全局的</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// error a2是已经定义的全局变量</span>
 <span class="token keyword">let</span> a1 <span class="token operator">=</span> <span class="token number">300</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><blockquote>
<p>不推荐使用全局模块，因为它会容易造成代码命名冲突（全局变量污染）</p>
</blockquote>
<h3 id="文件模块" tabindex="-1"><a class="header-anchor" href="#文件模块" aria-hidden="true">#</a> 文件模块</h3>
<p>任何一个包含了顶级 <code>import</code> 或者 <code>export</code> 的文件都会当做一个模块，在 <code>TypeScript</code> 中也称为外部模块。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// a.ts</span>
<span class="token keyword">let</span> a1 <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>  <span class="token comment">//局部的</span>
<span class="token keyword">let</span> a2 <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">//有了这个a.ts则为模块文件</span>
<span class="token comment">// b.ts</span>
 <span class="token keyword">let</span> a1 <span class="token operator">=</span> <span class="token number">300</span> <span class="token comment">// ok</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="模块语法" tabindex="-1"><a class="header-anchor" href="#模块语法" aria-hidden="true">#</a> 模块语法</h3>
<p><code>TypeScript</code> 与 <code>ESM</code> 语法类似</p>
<h3 id="导出模块内部数据-2" tabindex="-1"><a class="header-anchor" href="#导出模块内部数据-2" aria-hidden="true">#</a> 导出模块内部数据</h3>
<p>使用 <code>export</code> 导出模块内部数据（变量、函数、类、类型别名、接口……）</p>
<h3 id="导入外部模块数据-3" tabindex="-1"><a class="header-anchor" href="#导入外部模块数据-3" aria-hidden="true">#</a> 导入外部模块数据</h3>
<p>使用 <code>import</code> 导入外部模块数据</p>
<h3 id="模块编译" tabindex="-1"><a class="header-anchor" href="#模块编译" aria-hidden="true">#</a> 模块编译</h3>
<p><code>TypeScript</code> 编译器也能够根据相应的编译参数，把代码编译成指定的模块系统使用的代码</p>
<h4 id="module-选项" tabindex="-1"><a class="header-anchor" href="#module-选项" aria-hidden="true">#</a> module 选项</h4>
<p>在tsconfig.json文件中配置</p>
<p>在 <code>TypeScript</code> 编译选项中，<code>module</code> 选项是用来指定生成哪个模块系统的代码，可设置的值有：<code>&quot;none&quot;</code>、<code>&quot;commonjs&quot;</code>、<code>&quot;amd&quot;</code>、<code>&quot;udm&quot;</code>、<code>&quot;es6&quot;</code>/<code>&quot;es2015/esnext&quot;</code>、<code>&quot;System&quot;</code></p>
<ul>
<li><code>target==&quot;es3&quot; or &quot;es5&quot;</code>：默认使用 <code>commonjs</code></li>
<li>其它情况，默认 <code>es6</code></li>
</ul>
<h4 id="模块导出默认值的问题" tabindex="-1"><a class="header-anchor" href="#模块导出默认值的问题" aria-hidden="true">#</a> 模块导出默认值的问题</h4>
<p>如果一个模块没有默认导出</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// m1.ts</span>
<span class="token comment">//没有export default默认导出</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>则在引入该模块的时候，需要使用下列一些方式来导入</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// main.ts</span>
<span class="token comment">// error: 提示 m1 模块没有默认导出</span>
<span class="token comment">//默认导入</span>
<span class="token keyword">import</span> v <span class="token keyword">from</span> <span class="token string">'./m1'</span>

<span class="token comment">// 可以简单的使用如下方式</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>obj<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./m1'</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>x<span class="token punctuation">)</span>
<span class="token comment">// ok</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> m1 <span class="token keyword">from</span> <span class="token string">'./m1'</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m1<span class="token punctuation">.</span>obj<span class="token punctuation">.</span>x<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="加载非ts文件" tabindex="-1"><a class="header-anchor" href="#加载非ts文件" aria-hidden="true">#</a> 加载非TS文件</h3>
<p>有的时候，我们需要引入一些 <code>js</code> 的模块，比如导入一些第三方的使用 <code>js</code> 而非 <code>ts</code> 编写的模块，默认情况下 <code>tsc</code> 是不对非 <code>ts</code> 模块文件进行处理的</p>
<p>我们可以通过 <code>allowJs</code> 选项开启该特性：在config.json文件中：添加&quot;allowJs&quot;:true</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// m1.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token comment">// main.ts</span>
<span class="token keyword">import</span> m1 <span class="token keyword">from</span> <span class="token string">'./m1.js'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m1<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="非-esm-模块中的默认值问题" tabindex="-1"><a class="header-anchor" href="#非-esm-模块中的默认值问题" aria-hidden="true">#</a> 非 ESM 模块中的默认值问题</h3>
<p>在 <code>ESM</code> 中模块可以设置默认导出值</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token string">'哈哈哈'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>但是在 <code>CommonJS</code> 、<code>AMD</code> 中是没有默认值设置的，它们导出的是一个对象（<code>exports</code>）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//m1.js</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>在 <code>TypeScript</code> 中导入这种模块的时候会出现 <code>模块没有默认导出的错误提示</code>。</p>
<p>简单一些的做法：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> m <span class="token keyword">from</span> <span class="token string">'./m1.js'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>通过配置选项解决：</p>
<p><strong>allowSyntheticDefaultImports</strong></p>
<p>设置为：<code>true</code>，允许从没有设置默认导出的模块中默认导入。</p>
<p>虽然通过上面的方式可以解决编译过程中的检测问题，但是编译后的具体要运行代码还是有问题的</p>
<p><strong>esModuleInterop</strong></p>
<p>设置为：<code>true</code>，则在编译的同时生成一个 <code>__importDefault</code> 函数，用来处理具体的 <code>default</code> 默认导出</p>
<blockquote>
<p>注意：以上设置只能当 <code>module</code> 不为 <code>es6+</code> 的情况下有效</p>
</blockquote>
<h3 id="以模块的方式加载-json-格式的文件" tabindex="-1"><a class="header-anchor" href="#以模块的方式加载-json-格式的文件" aria-hidden="true">#</a> 以模块的方式加载 JSON 格式的文件</h3>
<p><code>TypeScript 2.9+</code> 版本添加了一个新的编译选项：<code>resolveJsonModule</code>，它允许我们把一个 <code>JSON</code> 文件作为模块进行加载</p>
<p><strong>resolveJsonModule</strong></p>
<p>设置为：<code>true</code> ，可以把 <code>json</code> 文件作为一个模块进行解析</p>
<p><strong>data.json</strong></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"zMouse"</span><span class="token punctuation">,</span>
    <span class="token property">"age"</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
    <span class="token property">"gender"</span><span class="token operator">:</span> <span class="token string">"男"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>ts文件</strong></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> userData <span class="token keyword">from</span> <span class="token string">'./data.json'</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>userData<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="_7-模块解析策略" tabindex="-1"><a class="header-anchor" href="#_7-模块解析策略" aria-hidden="true">#</a> 7，模块解析策略</h2>
<h3 id="什么是模块解析" tabindex="-1"><a class="header-anchor" href="#什么是模块解析" aria-hidden="true">#</a> 什么是模块解析</h3>
<p>模块解析是指编译器在查找导入模块内容时所遵循的流程。</p>
<h3 id="相对与非相对模块导入" tabindex="-1"><a class="header-anchor" href="#相对与非相对模块导入" aria-hidden="true">#</a> 相对与非相对模块导入</h3>
<p>根据模块引用是相对的还是非相对的，模块导入会以不同的方式解析。</p>
<h4 id="相对导入" tabindex="-1"><a class="header-anchor" href="#相对导入" aria-hidden="true">#</a> 相对导入</h4>
<p>相对导入是以 <code>/</code>、<code>./</code> 或 <code>../</code> 开头的引用</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// 导入根目录下的 m1 模块文件</span>
<span class="token keyword">import</span> m1 <span class="token keyword">from</span> <span class="token string">'/m1'</span>
<span class="token comment">// 导入当前目录下的 mods 目录下的 m2 模块文件</span>
<span class="token keyword">import</span> m2 <span class="token keyword">from</span> <span class="token string">'./mods/m2'</span>
<span class="token comment">// 导入上级目录下的 m3 模块文件</span>
<span class="token keyword">import</span> m3 <span class="token keyword">from</span> <span class="token string">'../m3'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="非相对导入" tabindex="-1"><a class="header-anchor" href="#非相对导入" aria-hidden="true">#</a> 非相对导入</h4>
<p>所有其它形式的导入被当作非相对的</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> m1 <span class="token keyword">from</span> <span class="token string">'m1'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="模块解析策略" tabindex="-1"><a class="header-anchor" href="#模块解析策略" aria-hidden="true">#</a> 模块解析策略</h3>
<p>为了兼容不同的模块系统（<code>CommonJS</code>、<code>ESM</code>），<code>TypeScript</code> 支持两种不同的模块解析策略：<code>Node</code>、<code>Classic</code>，当 <code>--module</code> 选项为：<code>AMD</code>、<code>System</code>、<code>ES2015</code> 的时候，默认为 <code>Classic</code> ，其它情况为 <code>Node</code></p>
<h4 id="moduleresolution-选项" tabindex="-1"><a class="header-anchor" href="#moduleresolution-选项" aria-hidden="true">#</a> --moduleResolution 选项</h4>
<p>除了根据 <code>--module</code> 选项自动选择默认模块系统类型，我们还可以通过 <code>--moduleResolution</code> 选项来手动指定解析策略</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// tsconfig.json</span>
<span class="token punctuation">{</span>
  ...<span class="token punctuation">,</span>
  <span class="token property">"moduleResolution"</span><span class="token operator">:</span> <span class="token string">"node"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="classic-模块解析策略" tabindex="-1"><a class="header-anchor" href="#classic-模块解析策略" aria-hidden="true">#</a> Classic 模块解析策略</h4>
<p>该策略是 <code>TypeScript</code> 以前的默认解析策略，它已经被新的 <code>Node</code> 策略所取代，现在使用该策略主要是为了向后兼容</p>
<h5 id="相对导入-1" tabindex="-1"><a class="header-anchor" href="#相对导入-1" aria-hidden="true">#</a> 相对导入</h5>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// /src/m1/a.ts</span>
<span class="token keyword">import</span> b <span class="token keyword">from</span> <span class="token string">'./b.ts'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>解析查找流程：</p>
<ol>
<li>src/m1/b.ts</li>
</ol>
<p><strong>默认后缀补全</strong></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// /src/m1/a.ts</span>
<span class="token keyword">import</span> b <span class="token keyword">from</span> <span class="token string">'./b'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>解析查找流程：</p>
<ol>
<li>
<p>/src/m1/b.ts</p>
</li>
<li>
<p>/src/m1/b.d.ts</p>
</li>
</ol>
<h5 id="非相对导入-1" tabindex="-1"><a class="header-anchor" href="#非相对导入-1" aria-hidden="true">#</a> 非相对导入</h5>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// /src/m1/a.ts</span>
<span class="token keyword">import</span> b <span class="token keyword">from</span> <span class="token string">'b'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>对于非相对模块的导入，则会从包含导入文件的目录开始依次向上级目录遍历查找，直到根目录为止</p>
<ol>
<li>
<p>/src/m1/b.ts</p>
</li>
<li>
<p>/src/m1/b.d.ts</p>
</li>
<li>
<p>/src/b.ts</p>
</li>
<li>
<p>/src/b.d.ts</p>
</li>
<li>
<p>/b.ts</p>
</li>
<li>
<p>/b.d.ts</p>
</li>
</ol>
<h4 id="node-模块解析策略" tabindex="-1"><a class="header-anchor" href="#node-模块解析策略" aria-hidden="true">#</a> Node 模块解析策略</h4>
<p>该解析策略是参照了 <code>Node.js</code> 的模块解析机制</p>
<h5 id="相对导入-2" tabindex="-1"><a class="header-anchor" href="#相对导入-2" aria-hidden="true">#</a> 相对导入</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// node.js</span>
<span class="token comment">// /src/m1/a.js</span>
<span class="token keyword">import</span> b <span class="token keyword">from</span> <span class="token string">'./b'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在 <code>Classic</code> 中，模块只会按照单个的文件进行查找，但是在 <code>Node.js</code> 中，会首先按照单个文件进行查找，如果不存在，则会按照目录进行查找（比如如果找，没有找到，那么就会去找叫b的文件夹）</p>
<ol>
<li>/src/m1/b.js</li>
<li>/src/m1/b/package.json中'main'中指定的文件</li>
<li>/src/m1/b/index.js</li>
</ol>
<p>文件夹查找机制：先找文件，文件找不到就去找目录名同的文件，如果里面有index.js那么它将会引用它，如果不叫index.js/ts文件，那么可以在词文件夹下创建一个package.json文件来配置其默认导出的文件名，添加&quot;main&quot;: xxx</p>
<h5 id="非相对导入-2" tabindex="-1"><a class="header-anchor" href="#非相对导入-2" aria-hidden="true">#</a> 非相对导入</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// node.js</span>
<span class="token comment">// /src/m1/a.js</span>
<span class="token keyword">import</span> b <span class="token keyword">from</span> <span class="token string">'b'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>对于非相对导入模块，解析是很特殊的，<code>Node.js</code> 会这一个特殊文件夹 <code>node_modules</code> 里查找，并且在查找过程中从当前目录的 <code>node_modules</code> 目录下逐级向上级文件夹进行查找</p>
<ol>
<li>/src/m1/node_modules/b.js</li>
<li>/src/m1/node_modules/b/package.json中'main'中指定的文件</li>
<li>/src/m1/node_modules/b/index.js</li>
<li>/src/node_modules/b.js</li>
<li>/src/node_modules/b/package.json中'main'中指定的文件</li>
<li>/src/node_modules/b/index.js</li>
<li>/node_modules/b.js</li>
<li>/node_modules/b/package.json中'main'中指定的文件</li>
<li>/node_modules/b/index.js</li>
</ol>
</template>
