<template><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1，简介</h2>
<p>一个项目可能会有开发版本、上线版本、测试版本等等多个版本，不同的环境会有不同请求api接口，就需更改一些基本配置，基本路径，服务器代理这种都要更改一遍，这时候就显得很麻烦，所以这里就使用了环境变量。若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。</p>
<ul>
<li>开发环境（开发阶段，本地开发版本，一般会使用一些调试工具或额外的辅助功能）</li>
<li>测试环境（测试阶段，上线前版本，除了一些 bug 的修复，基本不会和上线版本有很大差别）</li>
<li>生产环境（上线阶段，正式对外发布的版本，一般会进行优化，关掉错误报告）</li>
</ul>
<h2 id="_2-使用" tabindex="-1"><a class="header-anchor" href="#_2-使用" aria-hidden="true">#</a> 2，使用</h2>
<h3 id="_1-创建-env文件" tabindex="-1"><a class="header-anchor" href="#_1-创建-env文件" aria-hidden="true">#</a> [1]创建.env文件</h3>
<ul>
<li>直接在根目录下创建<code>.env</code>后缀的文件</li>
<li>.<code>env</code> ——全局的，没有设置其他环境变量时，会加载这个文件里的内容，比如所有版本都使用的是同一个接口地址时,就可以写在这一个文件里面就行</li>
<li><code>.env.development</code> ——开发环境下的配置文件，会覆盖.env这个文件里定义的环境变量（比如执行npm run dev命令，会自动加载.<code>env.development</code>文件）</li>
<li><code>.env.production</code> ——生产环境下的配置文件，会覆盖 .env这个文件里定义的环境变量</li>
</ul>
<p>[注]  &quot;.env.[name]&quot;是可以自定义的，前提是得在package.json里面做对应的名称修改,只是没有修改的话会默认默认</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> #例如在配置文件中
 <span class="token string-property property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token string-property property">"dev"</span><span class="token operator">:</span> <span class="token string">"vite --mode dev"</span><span class="token punctuation">,</span> <span class="token comment">//-开发环境时选择.env.dev作为环境配置文件</span>
     <span class="token string-property property">"build"</span><span class="token operator">:</span> <span class="token string">"vite build"</span><span class="token punctuation">,</span>
     <span class="token string-property property">"serve"</span><span class="token operator">:</span> <span class="token string">"vite preview"</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_2-获取环境变量" tabindex="-1"><a class="header-anchor" href="#_2-获取环境变量" aria-hidden="true">#</a> [2]获取环境变量</h3>
<p>之前使用vuecli构建的项目可以通过<code>process.env</code>来获取环境变量，但是在vite中不允许了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"环境变量=>"</span><span class="token punctuation">,</span>process<span class="token punctuation">.</span>env<span class="token punctuation">)</span> <span class="token comment">//error</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>vite中需要使用import.meta.env来获取env对象了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token comment">//main.js</span>
 <span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
 <span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App.vue'</span>
 
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"环境变量=>"</span><span class="token punctuation">,</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63bdaab270c241ed93bb812ccbcd4e80~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211124221154916"></p>
<p>根据环境变量<a href="https://cn.vitejs.dev/guide/env-and-mode.html#env-variables" target="_blank" rel="noopener noreferrer">官方文档</a></p>
<p>Vite 在一个特殊的 <strong><code>import.meta.env</code></strong> 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量：</p>
<ul>
<li><strong><code>import.meta.env.MODE</code></strong>: {string} 应用运行的<a href="https://cn.vitejs.dev/guide/env-and-mode.html#modes" target="_blank" rel="noopener noreferrer">模式</a>。</li>
<li><strong><code>import.meta.env.BASE_URL</code></strong>: {string} 部署应用时的基本URL。他由<a href="https://cn.vitejs.dev/config/#base" target="_blank" rel="noopener noreferrer"><code>base</code> 配置项</a>决定。</li>
<li><strong><code>import.meta.env.PROD</code></strong>: {boolean} 应用是否运行在生产环境。</li>
<li><strong><code>import.meta.env.DEV</code></strong>: {boolean} 应用是否运行在开发环境 (永远与 <code>import.meta.env.PROD</code>相反)。</li>
</ul>
<p>[注]  在package.json中表示的环境变量的名称的优先级高于.env.[mode]文件中配置的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token comment">//例如在项目根目录下创建一个.env.dev文件</span>
 <span class="token constant">MODE_DEV</span><span class="token operator">=</span>development <span class="token comment">//定义env对象的MOOD的名称</span>
 VITE_Name<span class="token operator">=</span>jack
 <span class="token comment">//package.json</span>
 <span class="token string-property property">"dev"</span><span class="token operator">:</span> <span class="token string">"vite --mode dev"</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46b61c87eedd4fd386a278bf0c98ef77~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211124222100762"></p>
<p>[注]  只有以 <code>VITE_</code> 为前缀的变量才会暴露给经过vite处理的代码。例如：才能通过<code>import.meta.env.VITE_Name</code>相应变量的值。（vite环境下为VITE，vuecli环境下为VUE)</p>
<h3 id="_2-配置文件说明" tabindex="-1"><a class="header-anchor" href="#_2-配置文件说明" aria-hidden="true">#</a> [2]配置文件说明</h3>
<h4 id="环境变量的权重" tabindex="-1"><a class="header-anchor" href="#环境变量的权重" aria-hidden="true">#</a> 环境变量的权重</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token punctuation">[</span>mode<span class="token punctuation">]</span><span class="token punctuation">.</span>local <span class="token operator">></span> <span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token punctuation">[</span>mode<span class="token punctuation">]</span> <span class="token operator">></span> <span class="token punctuation">.</span>env<span class="token punctuation">.</span>local <span class="token operator">></span> <span class="token punctuation">.</span>env 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_3-配置文件中的变量名问题" tabindex="-1"><a class="header-anchor" href="#_3-配置文件中的变量名问题" aria-hidden="true">#</a> [3]配置文件中的变量名问题</h3>
<p>我们在 Vue 的前端代码中打印出的 <code>process.env</code> 与 <code>vue.config.js</code>配置文件中输出的可能是不一样的。</p>
<h4 id="vuecli" tabindex="-1"><a class="header-anchor" href="#vuecli" aria-hidden="true">#</a> vuecli</h4>
<ul>
<li>推荐环境配置文件中以 <code>VUE_APP_</code> 开头（<code>NODE_ENV</code> 和 <code>BASE_URL</code> 这两个特殊变量除外）</li>
<li>这样才能在项目(客户端）代码中通过<code>process.env</code>获取到该变量（在配置vue.config.js（服务端）文件中取到）</li>
<li>其原理为webpack DefinePlugin 内置插件的相关内容，将process.env注入到客户端代码中。</li>
<li>但是经过CLI封装后仅支持注入环境配置文件中以<code>VUE_APP_</code> 开头的变量，而 <code>NODE_ENV</code> 和 <code>BASE_URL</code> 这两个特殊变量除外。</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f9f1417838c444882f65ec81c1c3843~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211126233212993"></p>
<h4 id="vite" tabindex="-1"><a class="header-anchor" href="#vite" aria-hidden="true">#</a> vite</h4>
<ul>
<li>为了防止意外地将一些环境变量泄漏到客户端，在vite中同理：要以 <code>VITE_</code> 为前缀的变量才会暴露前端代码（客户端）</li>
<li>不同于vuecli可以在vue.config.js中直接通过<code>process.env</code>直接获取环境变量，在vite中是不可以直接使用<code>import.meta.env</code>来获取的</li>
<li>这里有一个模式的概念，需要根据项目的一些需求来进行配置获取，详见官方文档吧</li>
</ul>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06b0911df424416592e1967a46ed01a2~tplv-k3u1fbpfcp-watermark.image?" alt="IMG_8003.GIF"></p>
</template>
