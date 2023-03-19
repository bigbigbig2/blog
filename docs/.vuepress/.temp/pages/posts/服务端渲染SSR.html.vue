<template><h3 id="一-补充-浏览器渲染html页面过程" tabindex="-1"><a class="header-anchor" href="#一-补充-浏览器渲染html页面过程" aria-hidden="true">#</a> 一，补充:浏览器渲染HTML页面过程</h3>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aad68ef2a5174e67ae4af99ffe4bc06f~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="二-客户端渲染csr" tabindex="-1"><a class="header-anchor" href="#二-客户端渲染csr" aria-hidden="true">#</a> 二，客户端渲染CSR</h3>
<ul>
<li>也叫动态渲染。</li>
</ul>
<p>如今我们大部分WEB应用都是使用 JavaScript 框架（Vue、React、Angular）进行页面渲染的，也就是说，在执行 JavaScript 脚本的时候，HTML页面已经开始解析并且构建DOM树了（浏览器工作原理内容），JavaScript 脚本只是动态的改变 DOM 树的结构，使得页面成为希望成为的样子，这种渲染方式叫动态渲染，也可以叫客户端渲染（client side rende）。</p>
<h3 id="三-服务端渲染ssr" tabindex="-1"><a class="header-anchor" href="#三-服务端渲染ssr" aria-hidden="true">#</a> 三，服务端渲染SSR</h3>
<h4 id="理解" tabindex="-1"><a class="header-anchor" href="#理解" aria-hidden="true">#</a> 理解</h4>
<ul>
<li>服务端渲染就是在浏览器请求页面URL的时候，服务端将我们需要的HTML文本组装好，并返回给浏览器，这个HTML文本被浏览器解析之后，不需要经过 JavaScript 脚本的执行，即可直接构建出希望的 DOM 树并展示到页面中。这个服务端组装HTML的过程，叫做服务端渲染。</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7afd6f471fe4460886a009d26663111~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="服务的渲染的历程" tabindex="-1"><a class="header-anchor" href="#服务的渲染的历程" aria-hidden="true">#</a> 服务的渲染的历程</h4>
<h5 id="最初只有服务端渲染" tabindex="-1"><a class="header-anchor" href="#最初只有服务端渲染" aria-hidden="true">#</a> 最初只有服务端渲染</h5>
<p>在没有AJAX的时候，也就是web1.0时代，几乎所有应用都是服务端渲染（此时服务器渲染非现在的服务器渲染），那个时候的页面渲染大概是这样的</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c79c4ea6b9a4dd3862bcd032fc55991~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211013183232887"></p>
<h5 id="出现客户端渲染-出现前后端分离" tabindex="-1"><a class="header-anchor" href="#出现客户端渲染-出现前后端分离" aria-hidden="true">#</a> 出现客户端渲染（出现前后端分离）</h5>
<p>前后端分离之后，网页开始被当成了独立的应用程序（SPA，Single Page Application），前端团队接管了所有页面渲染的事，后端团队只负责提供所有数据查询与处理的API</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a636daa0088848b7bb61424bf409adf5~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h5 id="又出现服务端渲染" tabindex="-1"><a class="header-anchor" href="#又出现服务端渲染" aria-hidden="true">#</a> 又出现服务端渲染</h5>
<p>随着单页应用（SPA）的发展，程序员们渐渐发现 SEO（Search Engine Optimazition，即搜索引擎优化）出了问题，JavaScript 脚本也不断的臃肿起来，出现首屏渲染慢的问题，使用 nodejs 在服务器进行页面的渲染</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf17ad78872943b881a050c802a393a6~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>相比于客户端渲染，这里多了在前端服务中向后端服务器请求数据然后组装html返回给浏览器，使其在第一次加载页面时的HTML不是空壳的</p>
<h3 id="四-服务端渲染的利弊" tabindex="-1"><a class="header-anchor" href="#四-服务端渲染的利弊" aria-hidden="true">#</a> 四，服务端渲染的利弊</h3>
<h4 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h4>
<h5 id="利于seo" tabindex="-1"><a class="header-anchor" href="#利于seo" aria-hidden="true">#</a> 利于SEO</h5>
<p>有利于SEO，别人使用搜索引擎搜索相关的内容时，你的网页排行能靠得更前。</p>
<h5 id="有利于爬虫来爬你的页面" tabindex="-1"><a class="header-anchor" href="#有利于爬虫来爬你的页面" aria-hidden="true">#</a> 有利于爬虫来爬你的页面</h5>
<p>爬虫分为低级合高级</p>
<ul>
<li>低级爬虫：只请求URL，URL返回的HTML是什么内容就爬什么内容。（如果是客户端渲染就没什么鸟用了，因为放回的HTML只是一个空壳）</li>
<li>高级爬虫：请求URL，加载并执行JavaScript脚本渲染页面，爬JavaScript渲染后的内容</li>
</ul>
<h5 id="首屏加载事件短" tabindex="-1"><a class="header-anchor" href="#首屏加载事件短" aria-hidden="true">#</a> 首屏加载事件短</h5>
<p>相对于客户端渲染，服务端渲染在浏览器请求URL之后已经得到了一个带有数据的HTML文本，浏览器只需要解析HTML，直接构建DOM树就可以。而客户端渲染，需要先得到一个空的HTML页面，这个时候页面已经进入白屏，之后还需要经过加载并执行 JavaScript、请求后端服务器获取数据、JavaScript 渲染页面几个过程才可以看到最后的页面。特别是在复杂应用中，由于需要加载 JavaScript 脚本，越是复杂的应用，需要加载的 JavaScript 脚本就越多、越大，这会导致应用的首屏加载时间非常长，进而降低了体验感。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e2b8abf42094713b678af298179087d~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h4>
<p>并不是所有的WEB应用都必须使用SSR，这需要开发者自己来权衡，因为服务端渲染会带来以下问题：</p>
<ul>
<li>代码复杂度增加。为了实现服务端渲染，应用代码中需要兼容服务端和客户端两种运行情况，而一部分依赖的外部扩展库却只能在客户端运行，需要对其进行特殊处理，才能在服务器渲染应用程序中运行。</li>
<li>需要更多的服务器负载均衡。由于服务器增加了组装渲染HTML的需求，使得原本只需要输出静态资源文件的nodejs服务（前端服务器），新增了数据获取的IO和渲染HTML的CPU占用，如果流量突然暴增，有可能导致服务器down机，因此需要使用响应的缓存策略和准备相应的服务器负载。</li>
<li>涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序 (SPA) 不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。</li>
</ul>
<p>所以在使用服务端渲染SSR之前，需要开发者考虑投入产出比，比如大部分应用系统都不需要SEO，而且首屏时间并没有非常的慢，如果使用SSR反而小题大做了。</p>
<h3 id="五-同构" tabindex="-1"><a class="header-anchor" href="#五-同构" aria-hidden="true">#</a> 五，同构</h3>
<p>假如我们需要在项目中使用服务端渲染，我们需要做什么呢？那就是同构我们的项目。</p>
<h4 id="同构的定义" tabindex="-1"><a class="header-anchor" href="#同构的定义" aria-hidden="true">#</a> 同构的定义</h4>
<p>在服务端渲染中，有两种页面渲染的方式：</p>
<ul>
<li>前端服务器通过请求后端服务器获取数据并组装HTML返回给浏览器，浏览器直接解析HTML后渲染页面（首次渲染）</li>
<li>浏览器在交互过程中，请求新的数据并动态更新渲染页面（之后渲染）</li>
</ul>
<p>这两种渲染方式有一个不同点就是，一个是在服务端中组装html的，一个是在客户端中组装html的，运行环境是不一样的。所谓同构，就是让一份代码，既可以在服务端中执行，也可以在客户端中执行，并且执行的效果都是一样的，都是完成这个html的组装，正确的显示页面。也就是说，一份代码，既可以客户端渲染，也可以服务端渲染。</p>
<h4 id="同构的实现" tabindex="-1"><a class="header-anchor" href="#同构的实现" aria-hidden="true">#</a> 同构的实现</h4>
<p>对于同构应用来说，我们必须实现客户端与服务端的路由、模型组件、数据模型的共享。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5837a2907e043468f46e6f3eafcad74~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>我们思考一个应用中一个页面的组成，假如我们使用的是<code>Vue.js</code>，当我们打开一个页面时，首先是打开这个页面的URL，这个URL，可以通过应用的<code>路由</code>匹配，找到具体的页面，不同的页面有不同的视图，那么，视图是什么？从应用的角度来看，视图 = <code>模板</code> + <code>数据</code>，那么在 Vue.js 中， 模板可以理解成<code>组件</code>，数据可以理解为<code>数据模型</code>，即响应式数据</p>
<h3 id="六-实践" tabindex="-1"><a class="header-anchor" href="#六-实践" aria-hidden="true">#</a> 六，实践</h3>
<h4 id="实现基础的nodejs服务端渲染" tabindex="-1"><a class="header-anchor" href="#实现基础的nodejs服务端渲染" aria-hidden="true">#</a> 实现基础的NODEJS服务端渲染</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        &lt;html>
            &lt;head>
                &lt;title>SSR&lt;/title>
            &lt;/head>
            &lt;body>
                &lt;p>hello world&lt;/p>
            &lt;/body>
        &lt;/html>
    </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3001</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'listen:3001'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//当浏览器拿到服务器返回的这一段HTML源代码的时候，不需要加载任何JavaScript脚本，就可以直接将hello world显示出来。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a72cb455fdb4a5f84483514259d104b~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>因为请求的东西都在前端服务器，使用只返回前端服务器的东西</p>
<h4 id="实现基础的vue客户端渲染" tabindex="-1"><a class="header-anchor" href="#实现基础的vue客户端渲染" aria-hidden="true">#</a> 实现基础的VUE客户端渲染</h4>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
    		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>hello world<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sayHello<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>say hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	          <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'hello ssr'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
使用vue脚手架新建一个vue项目，修改一个App.vue组件：
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>然后运行<code>npm run serve</code>启动项目，打开浏览器可以看到页面已经被渲了显示 hello world，但是打开检查看源代码</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e8afa76acee443a81beb3bfebc6129a~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211013193931212"></p>
<p>除了简单的兼容性处理 noscript 标签以外，只有一个简单的id为app的div标签，没有关于hello world的任何字眼，可以说这是一个空的页面（白屏），而当加载了下面的 script 标签的 JavaScript 脚本之后，页面开始这行这些脚本，执行结束，hello world 正常显示。也就是说真正渲染 hello world 的是 JavaScript 脚本。</p>
<h5 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h5>
<h4 id="同构vue项目" tabindex="-1"><a class="header-anchor" href="#同构vue项目" aria-hidden="true">#</a> 同构VUE项目</h4>
<h5 id="构建配置" tabindex="-1"><a class="header-anchor" href="#构建配置" aria-hidden="true">#</a> 构建配置</h5>
<ol>
<li>
<h5 id="第一步-构建服务端代码" tabindex="-1"><a class="header-anchor" href="#第一步-构建服务端代码" aria-hidden="true">#</a> 第一步：构建服务端代码</h5>
<p>在服务端代码构建结束后，需要将构建结果运行在nodejs服务器上，但是，对于服务端代码的构建，有一下内容需要注意：</p>
<ul>
<li>不需要编译CSS，样式表只有在浏览器（客户端）运行时需要。</li>
<li>构建的目标的运行环境是commonjs，nodejs的模块化模式为commonjs</li>
<li>不需要代码切割，nodejs将所有代码一次性加载到内存中更有利于运行效率</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//服务端的 webpack 构建配置文件 vue.server.config.js</span>
<span class="token keyword">const</span> nodeExternals <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"webpack-node-externals"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> VueSSRServerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue-server-renderer/server-plugin'</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">css</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">extract</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 不提取 CSS</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">configureWebpack</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">./src/server-entry.js</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token comment">// 服务器入口文件</span>
        <span class="token literal-property property">devtool</span><span class="token operator">:</span> <span class="token string">'source-map'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'node'</span><span class="token punctuation">,</span> <span class="token comment">// 构建目标为nodejs环境</span>
        <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">libraryTarget</span><span class="token operator">:</span> <span class="token string">'commonjs2'</span> <span class="token comment">// 构建目标加载模式 commonjs</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// 跳过 node_mdoules，运行时会自动加载，不需要编译</span>
        <span class="token literal-property property">externals</span><span class="token operator">:</span> <span class="token function">nodeExternals</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">allowlist</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span> <span class="token comment">// 允许css文件，方便css module</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">splitChunks</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 关闭代码切割</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      	<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token keyword">new</span> <span class="token class-name">VueSSRServerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">//使用 vue-server-renderer提供的server-plugin，这个插件主要配合下面讲到的client-plugin使用，作用主要是用来实现nodejs在开发过程中的热加载、source-map、生成html文件。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div></li>
<li>
<p>第二步：构建客户端代码</p>
<p>在构建客户端代码时，使用的是客户端的执行入口文件，构建结束后，将构建结果在浏览器运行即可，但是在服务端渲染中，HTML是由服务端渲染的，也就是说，我们要加载那些JavaScript脚本，是服务端决定的，因为HTML中的script标签是由服务端拼接的，所以在客户端代码构建的时候，我们需要使用插件，生成一个构建结果清单，这个清单是用来告诉服务端，当前页面需要加载哪些JS脚本和CSS样式表。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//客户端的构建配置，vue.client.config.js</span>
<span class="token keyword">const</span> VueSSRClientPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue-server-renderer/client-plugin'</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">configureWebpack</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">./src/client-entry.js</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">devtool</span><span class="token operator">:</span> <span class="token string">'source-map'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'web'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token keyword">new</span> <span class="token class-name">VueSSRClientPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token parameter">config</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      	<span class="token comment">// 去除所有关于客户端生成的html配置，因为已经交给后端生成</span>
        config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'html'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'preload'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'prefetch'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">//使用vue-server-renderer提供的client-server，主要作用是生成构建加过清单vue-ssr-client-manifest.json，服务端在渲染页面时，根据这个清单来渲染HTML中的script标签（JavaScript）和link标签（CSS）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>接下来，我们需要将<code>vue.client.config.js</code>和<code>vue.server.config.js</code>都交给vue-cli内置的构建配置文件<code>vue.config.js，</code>根据环境变量使用不同的配置</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// vue.config.js</span>
<span class="token keyword">const</span> <span class="token constant">TARGET_NODE</span> <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">WEBPACK_TARGET</span> <span class="token operator">===</span> <span class="token string">'node'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> serverConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./vue.server.config'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> clientConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./vue.client.config'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">TARGET_NODE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    module<span class="token punctuation">.</span>exports <span class="token operator">=</span> serverConfig<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    module<span class="token punctuation">.</span>exports <span class="token operator">=</span> clientConfig<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>使用<code>cross-env</code>区分环境</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"server"</span><span class="token operator">:</span> <span class="token string">"babel-node src/server.js"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"serve"</span><span class="token operator">:</span> <span class="token string">"vue-cli-service serve"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"build"</span><span class="token operator">:</span> <span class="token string">"vue-cli-service build"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"build:server"</span><span class="token operator">:</span> <span class="token string">"cross-env WEBPACK_TARGET=node vue-cli-service build --mode server"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></li>
</ol>
<h5 id="实现模板组件的共享" tabindex="-1"><a class="header-anchor" href="#实现模板组件的共享" aria-hidden="true">#</a> 实现模板组件的共享</h5>
<p>实现模板组件的共享：使vue的组件代码也可以在服务端中运行，首先我们需要解决代码编译问题。</p>
<p>假如vue项目使用webpack构建，那么服务端代码的构建，也可以使用webpack</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58681341ff11422795ec0e8ce054b12d~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211013195908827"></p>
<ol>
<li>第一步：创建VUE实例</li>
</ol>
<p>为了实现模板组件共享，我们需要将获取 Vue 渲染实例写成通用代码，如下 createApp：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">createApp</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token parameter">h</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  	<span class="token keyword">return</span> <span class="token punctuation">{</span>
      	app
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h5 id="实现路由的共享" tabindex="-1"><a class="header-anchor" href="#实现路由的共享" aria-hidden="true">#</a> 实现路由的共享</h5>
<h5 id="数据模型的共享与状态同步" tabindex="-1"><a class="header-anchor" href="#数据模型的共享与状态同步" aria-hidden="true">#</a> 数据模型的共享与状态同步</h5>
<h3 id="七-ssr的两种模式" tabindex="-1"><a class="header-anchor" href="#七-ssr的两种模式" aria-hidden="true">#</a> 七，ssr的两种模式</h3>
<p>第一种是后端首次渲染的单页面应用，第二种是完全使用后端路由的后端模版渲染模式。他们区别在于使用后端路由的程度。</p>
<p>....</p>
</template>
