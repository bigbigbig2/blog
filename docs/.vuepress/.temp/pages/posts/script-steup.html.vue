<template><h2 id="一-setup" tabindex="-1"><a class="header-anchor" href="#一-setup" aria-hidden="true">#</a> 一，setup</h2>
<h3 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1，简介</h3>
<ul>
<li>
<p>setup 函数是⼀个新的组件选项。作为在组件内使⽤ Composition API 的⼊⼝点。</p>
</li>
<li>
<p>setup里写的东西，方法什么可以在外调用，但是在外部写的东西不能再setup内部使用</p>
</li>
<li>
<p>在created实例之前执行</p>
</li>
<li>
<p>注意：在setup()中不能用this</p>
</li>
<li>
<p>在 <code>setup</code> 中你应该避免使用 <code>this</code>，因为它不会找到组件实例。<code>setup</code> 的调用发生在 <code>data</code> property、<code>computed</code> property 或 <code>methods</code> 被解析之前，所以它们无法在 <code>setup</code> 中被获取，这也是为了避免setup()和其他选项式API混淆。</p>
</li>
</ul>
<h3 id="_2-返回类型" tabindex="-1"><a class="header-anchor" href="#_2-返回类型" aria-hidden="true">#</a> 2，返回类型</h3>
<ul>
<li>
<p>对象</p>
<ul>
<li>
<p>对象的属性将被合并到组件的渲染函数上下⽂：</p>
</li>
<li>
<p>使用return暴露给模板</p>
</li>
</ul>
</li>
<li>
<p>函数（渲染函数）</p>
<ul>
<li>该函数会作为组件渲染函数（h函数），渲染函数会创建一个虚拟dom，同时意味着不用依赖挂载到某个dom</li>
</ul>
</li>
</ul>
<h3 id="_3-setup参数" tabindex="-1"><a class="header-anchor" href="#_3-setup参数" aria-hidden="true">#</a> 3，setup参数</h3>
<h4 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> props</h4>
<ul>
<li>
<p>props是响应式的，但是不能解构，否则将失去响应能⼒如果需要结构，可以在<code>setup</code>函数中使用<code>toRefs</code>来完成解构</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span>context</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token keyword">const</span> <span class="token punctuation">{</span>count<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">toRefs</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 这样props不会失去响应式</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<p>当传入新的 prop 时，它将被更新</p>
<p>可以通过props拿到setup外部的数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span>
    <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
                <span class="token function-variable function">default</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token string">'测试信息'</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">props</span><span class="token operator">:</span>any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>title<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></li>
</ul>
<h4 id="context上下文" tabindex="-1"><a class="header-anchor" href="#context上下文" aria-hidden="true">#</a> context上下文</h4>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/971e428c49d84a5aa2670f8f731b3004~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<ul>
<li>
<p>attrs</p>
<ul>
<li><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3549c9557a24df5890a1a618190820e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></li>
</ul>
</li>
<li>
<p>slots</p>
<ul>
<li><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fd629dea03847ea87e89ae2c94b4bcf~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></li>
</ul>
</li>
<li>
<p>emit</p>
</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24018e895c434454bf2e606fef9747fd~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd8eff5c028047bfb67e68083ef94824~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code>/* 参数说明
 * props 是响应式的，当传入新的 prop 时，它将被更新
 * context 是一个普通的上下文JavaScript对象，它暴露组件的三个 property（包括属性，插槽，方法）,
 * 如下示例1所示 
 */
// 示例1
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
      <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Attribute (非响应式对象)</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>attrs<span class="token punctuation">)</span>
        <span class="token comment">// 插槽 (非响应式对象)</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>slots<span class="token punctuation">)</span>
        <span class="token comment">// 触发事件 (方法)</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>emit<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="二-script-setup语法糖" tabindex="-1"><a class="header-anchor" href="#二-script-setup语法糖" aria-hidden="true">#</a> 二 ，script setup语法糖</h2>
<p>注意：defineProps不需要引入，vue单文件内部自动暴露的API</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script setup lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span><span class="token operator">&lt;</span>script<span class="token operator">></span>是在单文件组件（<span class="token constant">SFC</span>）中使用组合式<span class="token constant">API</span>的编译时的语法糖。相比普通setup的语法，它具有更多优势：
<span class="token operator">-</span> 更少的样板内容，更简洁的代码，比如：省略了组件的注册声明，对象暴露<span class="token keyword">return</span>，methods<span class="token punctuation">,</span>。
<span class="token operator">-</span> 能够使用纯 Typescript 声明 props 和发出事件。
<span class="token operator">-</span> <span class="token function">更好的运行时性能</span> <span class="token punctuation">(</span>其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理<span class="token punctuation">)</span>。
<span class="token operator">-</span> 更好的 <span class="token constant">IDE</span> <span class="token function">类型推断性能</span> <span class="token punctuation">(</span>减少语言服务器从代码中抽离类型的工作<span class="token punctuation">)</span>。
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>注意点：</strong></p>
<p>1、在setup语法糖中导入组件不需要注册声明，直接在视图中使用即可；直接import导入，然后直接子啊template里使用即可</p>
<p>2、vue文件结构发生改变，js默认放到页面顶部，而视图template放到js下面，style放到页面底部；</p>
<p>3、导入vue文件必须写上文件后缀名.vue, 否则ts无法识别vue文件。</p>
<p>代码示例:</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// This starter template is using Vue 3 &lt;script setup> SFCs</span>
<span class="token comment">// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">'./components/HelloWorld.vue'</span>
<span class="token comment">//这里引入后不用注册便可以直接使用</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Vue logo<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./assets/logo.png<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>HelloWorld</span> <span class="token attr-name">msg</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Hello Vue 3 + TypeScript + Vite<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">#app</span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> Avenir<span class="token punctuation">,</span> Helvetica<span class="token punctuation">,</span> Arial<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
  <span class="token property">-webkit-font-smoothing</span><span class="token punctuation">:</span> antialiased<span class="token punctuation">;</span>
  <span class="token property">-moz-osx-font-smoothing</span><span class="token punctuation">:</span> grayscale<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #2c3e50<span class="token punctuation">;</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 60px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>示例对比：</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code>// 基础setup用法
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
                <span class="token function-variable function">default</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token string">'测试信息'</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">props</span><span class="token operator">:</span>any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>title<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
   <span class="token comment">//将在控制台打印'测试信息'，这里发出警告是因为App.vue文件里缺少了视图template</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
// script setup 语法糖
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
            <span class="token function-variable function">default</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token string">'测试信息'</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="_1、defineprops-和-defineemits" tabindex="-1"><a class="header-anchor" href="#_1、defineprops-和-defineemits" aria-hidden="true">#</a> 1、defineProps 和 defineEmits</h3>
<p><strong><code>注意：defineProps</code> 和 <code>defineEmits</code> 都是只在 <code>&lt;script setup&gt;</code> 中才能使用的编译器宏</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>为了声明 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">props</span><span class="token template-punctuation string">`</span></span> 和 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">emits</span><span class="token template-punctuation string">`</span></span> 选项且具备完整的类型推断，可以使用 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">defineProps</span><span class="token template-punctuation string">`</span></span> 和 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">defineEmits</span><span class="token template-punctuation string">`</span></span> <span class="token constant">API</span>，它们在 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;script setup></span><span class="token template-punctuation string">`</span></span> 中都是自动可用的：

<span class="token operator">-</span> <span class="token operator">**</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">defineProps</span><span class="token template-punctuation string">`</span></span> 和 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">defineEmits</span><span class="token template-punctuation string">`</span></span> 都是只在 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;script setup></span><span class="token template-punctuation string">`</span></span> 中才能使用的<span class="token operator">**</span><span class="token operator">**</span>编译器宏<span class="token operator">**</span>。他们不需要导入，且会在处理 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;script setup></span><span class="token template-punctuation string">`</span></span> 的时候被编译处理掉。
<span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">defineProps</span><span class="token template-punctuation string">`</span></span> 接收与 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">props</span><span class="token template-punctuation string">`</span></span> 选项相同的值，<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">defineEmits</span><span class="token template-punctuation string">`</span></span> 也接收 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">emits</span><span class="token template-punctuation string">`</span></span> 选项相同的值。
<span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">defineProps</span><span class="token template-punctuation string">`</span></span> 和 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">defineEmits</span><span class="token template-punctuation string">`</span></span> 在选项传入后，会提供恰当的类型推断。
<span class="token operator">-</span> 传入到 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">defineProps</span><span class="token template-punctuation string">`</span></span> 和 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">defineEmits</span><span class="token template-punctuation string">`</span></span> 的选项会从 setup 中提升到模块的范围。因此，传入的选项不能引用在 setup 范围中声明的局部变量。这样做会引起编译错误。但是，它<span class="token operator">*</span>可以<span class="token operator">*</span>引用导入的绑定，因为它们也在模块范围内。
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>子组件vue</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{{props.msg}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleClick<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点击我调用父组件方法<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
         <span class="token literal-property property">msg</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
            <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">'默认值'</span>
         <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span>  emit <span class="token operator">=</span> <span class="token function">defineEmits</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'on-change'</span><span class="token punctuation">,</span> <span class="token string">'update'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token comment">//第一个参数为父方法，第二个参数是调用的</span>
        <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'on-change'</span><span class="token punctuation">,</span> <span class="token string">'父组件方法被调用了'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>3、父组件vue</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> TestPropsPmit <span class="token keyword">from</span> <span class="token string">'./components/test-props-emit/index.vue'</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>

    <span class="token comment">// 定义字符串变量</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">'欢迎使用vite！'</span><span class="token punctuation">)</span>
	<span class="token comment">// 调用事件</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handleChange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">params</span><span class="token operator">:</span>string</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TestPropsPmit</span> <span class="token attr-name">:msg</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>msg<span class="token punctuation">"</span></span> <span class="token attr-name">@on-change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleChange<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>TestPropsPmit</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>温馨提示：这里介绍一哈volar插件小图标在vue文件里的作用：</strong></p>
<p>点击这个三角形图标，会将文件归类显示，方便编写代码；</p>
<ul>
<li>子组件调用父组件的东西
<ul>
<li>使用api:<code>defineEmit</code></li>
</ul>
</li>
</ul>
<h3 id="_2-defineexpose" tabindex="-1"><a class="header-anchor" href="#_2-defineexpose" aria-hidden="true">#</a> 2，defineExpose</h3>
<p>使用 <code>&lt;script setup&gt;</code> 的组件是<strong>默认关闭</strong>的，也就通过模板 ref 或者 <code>$parent</code> 链获取到的组件的公开实例，不会暴露任何在 <code>&lt;script setup&gt;</code> 中声明的绑定。</p>
<p>为了在 <code>&lt;script setup&gt;</code> 组件中明确要暴露出去的属性，使用 <code>defineExpose</code> 编译器宏：</p>
<h4 id="子组件暴露属性和方法-给父组件引用" tabindex="-1"><a class="header-anchor" href="#子组件暴露属性和方法-给父组件引用" aria-hidden="true">#</a> 子组件暴露属性和方法，给父组件引用</h4>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">function</span> <span class="token function">testChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token keyword">void</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'子组件方法testChild被调用了'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token comment">// 统一暴露属性</span>
<span class="token function">defineExpose</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">obj</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'张三'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">2300</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    b<span class="token punctuation">,</span>
    testChild
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="父组件调用子组件方法和属性" tabindex="-1"><a class="header-anchor" href="#父组件调用子组件方法和属性" aria-hidden="true">#</a> 父组件调用子组件方法和属性</h4>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!-- 将子组件暴露的东西传给父组件 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TestPropsEmit</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>propsEmitRef<span class="token punctuation">"</span></span> <span class="token attr-name">:msg</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>msg<span class="token punctuation">'</span></span> <span class="token attr-name">@on-change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleChange<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>         	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>TestPropsEmit</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> TestPropsEmit <span class="token keyword">from</span> <span class="token string">'./components/test-props-emit/index.vue'</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">{</span>ref<span class="token punctuation">,</span> onMounted<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">'欢迎学习vite'</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> <span class="token function-variable function">handleChange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">params</span><span class="token operator">:</span>string</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> propsEmitRef <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token comment">//打印子组件通过defineExpose暴露的东西</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>propsEmitRef<span class="token punctuation">.</span>value<span class="token punctuation">.</span>child<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="在setup如何定义变量-字符串-对象-数组" tabindex="-1"><a class="header-anchor" href="#在setup如何定义变量-字符串-对象-数组" aria-hidden="true">#</a> 在setup如何定义变量(字符串,对象,数组)</h4>
<p>没有什么不同的，以前的是子啊setup(){里写}，也子啊里面解构</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>{{count}} {{user.name}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in arr<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>setName<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点击我增加<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
    <span class="token comment">// 字符串变量</span>
    <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token comment">// 对象</span>
    <span class="token keyword">let</span> user <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'张三'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 数组</span>
    <span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'1'</span><span class="token punctuation">,</span> <span class="token string">'2'</span><span class="token punctuation">,</span> <span class="token string">'3'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    
    <span class="token comment">// 综合定义方案，就是响应式的数据将它们定义在一起，代替上面的写法，但是在使用的时候</span>
    <span class="token comment">//注意修改为originData.count,orifinData.user.name,originData.arr</span>
    <span class="token keyword">const</span> originData <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token literal-property property">user</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'张三'</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'1'</span><span class="token punctuation">,</span> <span class="token string">'2'</span><span class="token punctuation">,</span> <span class="token string">'3'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    
    <span class="token comment">// 方法</span>
    <span class="token keyword">const</span> <span class="token function-variable function">setName</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        count<span class="token punctuation">.</span>value<span class="token operator">++</span>
        user<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'李四'</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h3 id="_3、watch和watcheffect" tabindex="-1"><a class="header-anchor" href="#_3、watch和watcheffect" aria-hidden="true">#</a> 3、Watch和WatchEffect</h3>
<h4 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用：</h4>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{{originData.count}}  {{originData.user.name}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in originData.arr<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>incriment<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点击我count增加<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> reactive<span class="token punctuation">,</span> watchEffect<span class="token punctuation">,</span> watch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'张三'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token comment">// 综合定义方案</span>
    <span class="token keyword">const</span> originData <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token literal-property property">user</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'张三'</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">arr</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> <span class="token function-variable function">incriment</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        originData<span class="token punctuation">.</span>count<span class="token operator">++</span>
        count<span class="token punctuation">.</span>value<span class="token operator">++</span>
        originData<span class="token punctuation">.</span>user<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'李四'</span>
    <span class="token punctuation">}</span>
	<span class="token comment">// 默认页面更新之前立即执行监听，懒执行开始</span>
    <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>count<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// 默认监听数据变化后的值，页面更新后不会立即执行</span>
    <span class="token function">watch</span><span class="token punctuation">(</span>count<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">n<span class="token punctuation">,</span> o</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'watch'</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> o<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    
    <span class="token comment">// 监听多个值</span>
    <span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">[</span>count<span class="token punctuation">,</span> originData<span class="token punctuation">.</span>user<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">newValues<span class="token punctuation">,</span> prevValues</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newValues<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> newValues<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 立即监听</span>
    <span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">[</span>count<span class="token punctuation">,</span> originData<span class="token punctuation">.</span>user<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">newValues<span class="token punctuation">,</span> prevValues</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newValues<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> newValues<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">deep</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">immediate</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><h4 id="watch与-watcheffect-比较-推荐watch监听" tabindex="-1"><a class="header-anchor" href="#watch与-watcheffect-比较-推荐watch监听" aria-hidden="true">#</a> watch与 watchEffect 比较，推荐watch监听</h4>
<p>watch: 页面更新后不会立即执行，而watchEffect 它会执行；</p>
<p>如果要实现：watch在页面更新之后就执行，需要增加立即执行的属性；</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code>watch([count,originData.user], (n, o)=> {console.log(n[0],n[1].name)}, {deep: true, immediate: true})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>1、watch和watchEffect都懒执行副作用，不过watchEffect比较频繁，在vue组件更新之前执行；
2、watch更具体地说明什么状态应该触发侦听器重新运行，watchEffect就没有这么友好；
3、watch访问侦听状态变化前后的值。
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_4、在setup中的生命周期钩子" tabindex="-1"><a class="header-anchor" href="#_4、在setup中的生命周期钩子" aria-hidden="true">#</a> 4、在setup中的生命周期钩子</h3>
<p>因为 <code>setup</code> 是围绕 <code>beforeCreate</code> 和 <code>created</code> 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 <code>setup</code> 函数中编写。</p>
<p>下表包含如何在 <a href="https://v3.cn.vuejs.org/guide/composition-api-setup.html" target="_blank" rel="noopener noreferrer">setup ()</a> 内部调用生命周期钩子：</p>
<table>
<thead>
<tr>
<th>选项式 API</th>
<th style="text-align:left">Hook inside <code>setup</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>beforeCreate</code></td>
<td style="text-align:left">Not needed*    不需要</td>
</tr>
<tr>
<td><code>created</code></td>
<td style="text-align:left">Not needed*    不需要</td>
</tr>
<tr>
<td><code>beforeMount</code></td>
<td style="text-align:left"><code>onBeforeMount</code> 挂载之前</td>
</tr>
<tr>
<td><code>mounted</code></td>
<td style="text-align:left"><code>onMounted</code>    页面加载完成时执行</td>
</tr>
<tr>
<td><code>beforeUpdate</code></td>
<td style="text-align:left"><code>onBeforeUpdate</code></td>
</tr>
<tr>
<td><code>updated</code></td>
<td style="text-align:left"><code>onUpdated</code></td>
</tr>
<tr>
<td><code>beforeUnmount</code></td>
<td style="text-align:left"><code>onBeforeUnmount</code></td>
</tr>
<tr>
<td><code>unmounted</code></td>
<td style="text-align:left"><code>onUnmounted</code>  页面销毁时执行</td>
</tr>
<tr>
<td><code>errorCaptured</code></td>
<td style="text-align:left"><code>onErrorCaptured</code></td>
</tr>
<tr>
<td><code>renderTracked</code></td>
<td style="text-align:left"><code>onRenderTracked</code></td>
</tr>
<tr>
<td><code>renderTriggered</code></td>
<td style="text-align:left"><code>onRenderTriggered</code></td>
</tr>
<tr>
<td><code>activated</code></td>
<td style="text-align:left"><code>onActivated</code></td>
</tr>
<tr>
<td><code>deactivated</code></td>
<td style="text-align:left"><code>onDeactivated</code></td>
</tr>
</tbody>
</table>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token operator">&lt;</span>script setup lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> onActivated<span class="token punctuation">,</span> onUnmounted<span class="token punctuation">,</span> onUpdated<span class="token punctuation">,</span> onDeactivated <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token comment">// 读取环境变量</span>
<span class="token keyword">const</span> mode <span class="token operator">=</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">;</span>
<span class="token comment">//   import HeadMenu from '@/components/head-menu/index.vue';</span>
 <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
 <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"组件挂载"</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>

 <span class="token function">onUnmounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
 <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"组件卸载"</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>

 <span class="token function">onUpdated</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
 <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"组件更新"</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
 <span class="token function">onActivated</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
 <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"keepAlive 组件 激活"</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>

 <span class="token function">onDeactivated</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
 <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"keepAlive 组件 非激活"</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> propsEmitRef <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token comment">//打印子组件通过defineExpose暴露的东西</span>
        <span class="token comment">//console.log(propsEmitRef.value.child);</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'onMounted'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">//子啊页面加载完成之前调用的方式，等同于created钩子</span>
    <span class="token comment">//因为所有setup是在created钩子上的</span>
    <span class="token keyword">function</span> <span class="token function">createds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'created'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">createds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f43e548f644406897470b36c663d732~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_5、用ts限制define-emits-props-参数类型" tabindex="-1"><a class="header-anchor" href="#_5、用ts限制define-emits-props-参数类型" aria-hidden="true">#</a> 5、用Ts限制define(Emits|Props)参数类型</h3>
<p><strong>注意：</strong></p>
<p><strong>1、在setup语法糖中引入组件不需要注册声明就可以直接用了</strong></p>
<p><strong>2、ts 限制组件传参类型，默认是必须传值的，否则控制台出现警告， 引入组件的地方会出现红色提醒，不想必传在绑定参数后加?即可</strong></p>
<p><strong>3、ts传参支持多种类型校验，一个参数可以传字符串，数组，Boolean等</strong></p>
<p><strong>4、用ts方式限制defineEmits和defineProps参数类型</strong></p>
<p>类似于原生的props中的传值效验</p>
<p>1，子组件</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>{{msg}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>{{title}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
	<span class="token comment">&lt;!-- @blur：失去焦点时触发 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inputValue<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">@blur</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleUpdate($event)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>
    <span class="token comment">//拿父组件传递过来的参数</span>
    <span class="token comment">// defineProps({</span>
    <span class="token comment">//     msg:String//使用的是vue的传参效验</span>
    <span class="token comment">// })</span>
    <span class="token comment">//下面使用ts来搞传参效验。 ？可选</span>
    defineProps<span class="token operator">&lt;</span><span class="token punctuation">{</span>
            msg<span class="token operator">?</span><span class="token operator">:</span><span class="token punctuation">(</span>string <span class="token operator">|</span> number<span class="token punctuation">)</span><span class="token punctuation">,</span>
            title<span class="token operator">?</span><span class="token operator">:</span> string
        <span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    	<span class="token comment">//在父组件的值还没有传递过来时候属于默认值</span>
         <span class="token comment">// 提供默认值方式 1 定义接口的方式</span>
        <span class="token keyword">interface</span> <span class="token class-name">Props</span><span class="token punctuation">{</span>
            msg<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>string <span class="token operator">|</span> number <span class="token operator">|</span> boolean<span class="token punctuation">)</span><span class="token punctuation">,</span> 
            title<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>

        <span class="token function">withDefaults</span><span class="token punctuation">(</span>defineProps<span class="token operator">&lt;</span>Props<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">'hello'</span><span class="token punctuation">,</span>
            <span class="token function-variable function">title</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">[</span><span class="token string">'one'</span><span class="token punctuation">,</span> <span class="token string">'two'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token comment">// 提供默认方式 2</span>
        <span class="token function">withDefaults</span><span class="token punctuation">(</span>defineProps<span class="token operator">&lt;</span><span class="token punctuation">{</span>
            msg<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>string <span class="token operator">|</span> number <span class="token operator">|</span> boolean<span class="token punctuation">)</span>
            title<span class="token operator">?</span><span class="token operator">:</span> string
        <span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'默认标题'</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// const  emit = defineEmits(['updateValue'])</span>
    <span class="token keyword">const</span> emit <span class="token operator">=</span> defineEmits<span class="token operator">&lt;</span><span class="token punctuation">{</span>
                        <span class="token punctuation">(</span>event<span class="token operator">:</span> <span class="token string">'change'</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
                        <span class="token punctuation">(</span>event<span class="token operator">:</span> <span class="token string">'update'</span><span class="token punctuation">,</span> <span class="token literal-property property">data</span><span class="token operator">:</span> string<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>
                <span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> inputValue <span class="token operator">=</span> ref<span class="token operator">&lt;</span>any<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> <span class="token function-variable function">handleUpdate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">event</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> target <span class="token punctuation">}</span> <span class="token operator">=</span> event
        <span class="token comment">// console.log(target.value, 1111);</span>
        <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'update'</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><p>补充：$event多事件处理器</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee820b0ada654892972dea4baee9f460~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>@blur：失去焦点时触发</p>
<p>@event对象：拿到当前对象</p>
<p>2、父组件</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> CellSample <span class="token keyword">from</span> <span class="token string">"./components/cell-samples/index.vue"</span><span class="token punctuation">;</span>
    
    <span class="token keyword">const</span> <span class="token function-variable function">update</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">data</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CellSample</span> <span class="token attr-name">@update</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>update<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>CellSample</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>


</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>未完待续。。。</p>
<div class="language-mermaidjs ext-mermaidjs line-numbers-mode"><pre v-pre class="language-mermaidjs"><code>sequenceDiagram
  Alice-&gt;John: Hello John, how are you?
  loop Every minute
    John--&gt;Alice: Great!
  end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></template>
