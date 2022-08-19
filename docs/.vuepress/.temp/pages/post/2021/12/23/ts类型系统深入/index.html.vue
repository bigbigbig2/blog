<template><h2 id="_1-类型保护" tabindex="-1"><a class="header-anchor" href="#_1-类型保护" aria-hidden="true">#</a> 1，类型保护</h2>
<p>我们通常在 JavaScript 中通过判断来处理⼀些逻辑，在 TypeScript 中这种条件语句块还有另外⼀ 个特性：根据判断逻辑的结果，缩⼩类型范围（有点类似断⾔），这种特性称为类型保护 ，触发条件：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>逻辑条件语句块：<span class="token keyword">if</span>、<span class="token keyword">else</span>、elseif
特定的一些关键字：<span class="token keyword">typeof</span>、<span class="token keyword">instanceof</span>、<span class="token keyword">in</span><span class="token operator">...</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token operator">|</span><span class="token builtin">number</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//这时编译器将会报错，因为a变量可能是字符串，但也有可能是数字，ts告</span>
    <span class="token comment">//诉我们，你不能直接作为字符串去使用，有风险</span>
    <span class="token comment">//a.substring(1,2)//使用了字符串的方法</span>
    <span class="token comment">//解决的方式1：类型断言</span>
    <span class="token punctuation">(</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span> a<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//解决方法2：类型保护</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> a <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        a<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        a<span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token comment">//number类型的方法</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="typeof" tabindex="-1"><a class="header-anchor" href="#typeof" aria-hidden="true">#</a> typeof</h3>
<p>我们知道 typeof 可以返回某个数据的类型，在 TypeScript 在 if 、 else 代码块中能够把 typeof 识别为类型保护，推断出适合的类型</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">a</span><span class="token operator">:</span> string<span class="token operator">|</span>number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// error，不能保证 a 就是字符串</span>
 	a<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> a <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 	<span class="token comment">// ok</span>
 		a<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
 	<span class="token comment">// ok</span>
 		a<span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="instanceof" tabindex="-1"><a class="header-anchor" href="#instanceof" aria-hidden="true">#</a> instanceof</h3>
<p>与 typeof 类似的(写法不同罢了)， instanceof 也可以被 TypeScript 识别为类型保护</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>a<span class="token operator">:</span> Date<span class="token operator">|</span><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        a<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        a<span class="token punctuation">.</span><span class="token function">getFullYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="in" tabindex="-1"><a class="header-anchor" href="#in" aria-hidden="true">#</a> in</h3>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">IA</span></span> <span class="token punctuation">{</span>
    x<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    y<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">IB</span></span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    b<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>arg<span class="token operator">:</span> <span class="token constant">IA</span> <span class="token operator">|</span> <span class="token constant">IB</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">'x'</span> <span class="token keyword">in</span> arg<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//ok</span>
        arg<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
        <span class="token comment">//error</span>
        arg<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">//ok</span>
        arg<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
        <span class="token comment">//error</span>
        arg<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="字面量类型保护" tabindex="-1"><a class="header-anchor" href="#字面量类型保护" aria-hidden="true">#</a> 字面量类型保护</h3>
<p>如果类型为字面量类型，那么还可以通过该字面量类型的字面值进行推断</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">IA</span></span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'IA'</span><span class="token punctuation">;</span> <span class="token comment">//字面量类型）</span>
    x<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">;</span>
    y<span class="token punctuation">;</span><span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">IB</span></span> <span class="token punctuation">{</span>
    typ<span class="token operator">:</span> <span class="token string">'IB'</span><span class="token punctuation">;</span>
    a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    b<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>arg<span class="token operator">:</span> <span class="token constant">IA</span> <span class="token operator">|</span> <span class="token constant">IB</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//属于IA类型</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>arg<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'IA'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//OK</span>
        arg<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
        <span class="token comment">//error</span>
        arg<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
     <span class="token comment">//属于IB类型</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">//ok</span>
        arg<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
        <span class="token comment">//error</span>
        arg<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="自定义类型保护" tabindex="-1"><a class="header-anchor" href="#自定义类型保护" aria-hidden="true">#</a> 自定义类型保护</h3>
<p>有的时候，以上的一些方式并不能满足一些特殊情况，则可以自定义类型保护规则</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">//实例</span>
<span class="token comment">//Element[] 数组元素，NodeList类数组，Element单个元素</span>
<span class="token comment">//通过一个辅助函数来实现</span>
<span class="token keyword">function</span> <span class="token function">canEach</span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span>data <span class="token keyword">is</span> Element<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> NodeList<span class="token punctuation">{</span>
    <span class="token keyword">return</span> data<span class="token punctuation">.</span>forEach ！<span class="token operator">==</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">//可以使用canEach的话就为true</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fn2</span><span class="token punctuation">(</span>elements<span class="token operator">:</span>Element<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> NodeList <span class="token operator">|</span> Element <span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//数组类型时</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">canEach</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        elements<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>el<span class="token operator">:</span>Element<span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
            el<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'box'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        elements<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'box'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><code>data is Element[]|NodeList</code> 是一种类型谓词，格式为：xx is XX ，返回这种类型的函数就可以被 TypeScript 识别为类型保护</p>
<h2 id="_2-类型操作" tabindex="-1"><a class="header-anchor" href="#_2-类型操作" aria-hidden="true">#</a> 2，类型操作</h2>
<p>TypeScript 提供了⼀些⽅式来操作类型这种数据，但是需要注意的是，类型数据只能作为类型来使 ⽤，⽽不能作为程序中的数据，这是两种不同的数据，⼀个⽤在编译检测阶段，⼀个⽤于程序执⾏阶段</p>
<h3 id="typeof-1" tabindex="-1"><a class="header-anchor" href="#typeof-1" aria-hidden="true">#</a> typeof</h3>
<p>在 TypeScript 中， typeof 有两种作⽤</p>
<ul>
<li>获取数据的类型</li>
<li>捕获数据的类型</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> str1 <span class="token operator">=</span> <span class="token string">'kaikeba'</span><span class="token punctuation">;</span>
<span class="token comment">//let声明的是变量，里面存储的数据是程序运行中使用的</span>
<span class="token keyword">let</span> t <span class="token operator">=</span> <span class="token keyword">typeof</span> str1<span class="token punctuation">;</span>
<span class="token comment">//type 声明的是类型名称，这个值只是在ts编译监测阶段使用</span>
<span class="token keyword">type</span> <span class="token class-name">myType</span> <span class="token operator">=</span> <span class="token string">"string"</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">myType</span> <span class="token operator">=</span> <span class="token keyword">typeof</span> str1<span class="token punctuation">;</span>

<span class="token keyword">let</span> a <span class="token operator">=</span> t<span class="token punctuation">;</span>
<span class="token keyword">let</span> b<span class="token operator">:</span>myType <span class="token operator">=</span> <span class="token string">'....'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="keyof" tabindex="-1"><a class="header-anchor" href="#keyof" aria-hidden="true">#</a> keyof</h3>
<p>获取类型的所有值的 key 的集合</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">//实例</span>
<span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 等同：type personKeys = "name" | "age"</span>
<span class="token keyword">type</span> <span class="token class-name">personkey</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> Person<span class="token punctuation">;</span><span class="token comment">//这时personkey存储的为类型Person的key："name","age"</span>

<span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span><span class="token string">'zMouse'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span><span class="token number">35</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">getPersonVal</span><span class="token punctuation">(</span>k<span class="token operator">:</span> personKeys<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> p1<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
等同：
function getPersonVal(k: 'name'|'age') {
	return p1[k];
}
*/</span>
<span class="token function">getPersonVal</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//正确</span>
<span class="token function">getPersonVal</span><span class="token punctuation">(</span><span class="token string">'gender'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//错误</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="in-1" tabindex="-1"><a class="header-anchor" href="#in-1" aria-hidden="true">#</a> in</h3>
<p>针对类型进行操作的话，内部使用的 <code>for...in</code> 对类型进行遍历</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//取出Person里的key</span>
<span class="token keyword">type</span> <span class="token class-name">personKeys</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> Person<span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">newPerson</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">//定义一个新的类型，取到Person的键为相同的键，将它们都定义为number类型</span>
    <span class="token punctuation">[</span>k <span class="token keyword">in</span> personKeys<span class="token punctuation">]</span><span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">;</span>
    <span class="token comment">/*等同于
    [key in 'name' | 'age']: number;
    也可以写成
    [key in keyof Person]: number;
    */</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
type newPerson = {
	name:number;
	age:number;
}
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>注意：in 后面的类型值必须是 string 或者 number 或者 symbol</p>
<h2 id="_3-类型兼容" tabindex="-1"><a class="header-anchor" href="#_3-类型兼容" aria-hidden="true">#</a> 3，类型兼容</h2>
<p>TypeScript 的类型系统是基于结构⼦类型的，它与名义类型（如：java）不同（名义类型的数据类型 兼容性或等价性是通过明确的声明或类型的名称来决定的）。这种基于结构⼦类型的类型系统是基于组 成结构的，只要具有相同类型的成员，则两种类型即为兼容的。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Cat</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>p1<span class="token operator">:</span> Person<span class="token punctuation">)</span><span class="token punctuation">{</span>
    p<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> xiaohua <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ok，因为 Cat 类型的结构与 Person 类型的结构相似，所以它们是兼容的</span>
<span class="token function">fn</span><span class="token punctuation">(</span>xiaohua<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div></template>
