<template><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1.简介</h2>
<p>由于在项目里每次使用请求需要导入axios，并写请求axios请求，项目变大后就会变变得很复杂。可以将axios进行二次封装以便在之后更简便的使用axios。</p>
<h2 id="_2-代码是实例详解" tabindex="-1"><a class="header-anchor" href="#_2-代码是实例详解" aria-hidden="true">#</a> 2.代码是实例详解</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//axios二次封装（utils/request.js</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">"axios"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> config <span class="token keyword">from</span> <span class="token string">"./../config"</span><span class="token punctuation">;</span> 
<span class="token keyword">import</span> <span class="token punctuation">{</span>ElMessage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"element-plus"</span> <span class="token comment">//导入一个报错提示组件</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">'./../router'</span>
<span class="token keyword">const</span> <span class="token constant">TOKEN_INVALID</span> <span class="token operator">=</span> <span class="token string">'Token认证失败，请重新登录'</span>
<span class="token keyword">const</span> <span class="token constant">NETWORK_ERROR</span> <span class="token operator">=</span> <span class="token string">'网络请求异常，请稍后重试'</span>

<span class="token comment">//创建axios实例对象，添加全局配置</span>
<span class="token keyword">const</span> service <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">baseURL</span><span class="token operator">:</span>config<span class="token punctuation">.</span>baseApi<span class="token punctuation">,</span>
    <span class="token literal-property property">timeout</span><span class="token operator">:</span><span class="token number">8000</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//请求拦截封装(拦截下来给它添加token)</span>
service<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">req</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> headers <span class="token operator">=</span> req<span class="token punctuation">.</span>headers<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>headers<span class="token punctuation">.</span>Authorization<span class="token punctuation">)</span> headers<span class="token punctuation">.</span>Authorization <span class="token operator">=</span> <span class="token string">'Bear jack'</span>
    <span class="token keyword">return</span> req<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//响应拦截</span>
service<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>code<span class="token punctuation">,</span> data<span class="token punctuation">,</span> msg<span class="token punctuation">}</span> <span class="token operator">=</span> res<span class="token punctuation">.</span>data<span class="token punctuation">;</span> 
    <span class="token keyword">if</span> <span class="token punctuation">(</span>code <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>code <span class="token operator">===</span> <span class="token number">40001</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        ElMessage<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token constant">TOKEN_INVALID</span><span class="token punctuation">)</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
            router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'/login'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">15000</span><span class="token punctuation">)</span>
        
        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token constant">TOKEN_INVALID</span><span class="token punctuation">)</span> <span class="token comment">//这将显示在控制台里</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        ElMessage<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>msg <span class="token operator">||</span> <span class="token constant">NETWORK_ERROR</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//封装函数本身（重点）</span>
<span class="token comment">//请</span>
<span class="token keyword">function</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token keyword">return</span> <span class="token function">service</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> request<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>#post请求的参数默认叫data，<span class="token keyword">get</span>请求的参数默认叫params。为了统一，我们将它们都叫做data
<span class="token comment">// 发起一个post请求</span>
<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'/user/12345'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">firstName</span><span class="token operator">:</span> <span class="token string">'Fred'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">lastName</span><span class="token operator">:</span> <span class="token string">'Flintstone'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 在 node.js 用GET请求获取远程图片</span>
<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'http://bit.ly/2mTM3nY'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">responseType</span><span class="token operator">:</span> <span class="token string">'stream'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    response<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span><span class="token string">'ada_lovelace.jpg'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>request函数的封装</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//封装函数本身（重点）</span>
<span class="token comment">//请求核心函数</span>
<span class="token keyword">function</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    options<span class="token punctuation">.</span>method <span class="token operator">=</span> option<span class="token punctuation">.</span>method <span class="token operator">||</span> <span class="token string">'get'</span>
    <span class="token comment">//将get的请求参数params改为和post请求参数相同的data，这样在项目中就不用过度的去区分get请求还是post请求</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>method<span class="token punctuation">.</span>toLowerCase <span class="token operator">==</span> <span class="token string">'get'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        options<span class="token punctuation">.</span>params <span class="token operator">=</span> options<span class="token punctuation">.</span>data
    <span class="token punctuation">}</span>
    <span class="token comment">//mock数据相关</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>env <span class="token operator">==</span> <span class="token string">'prod'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        service<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>baseURL <span class="token operator">=</span> config<span class="token punctuation">.</span>baseApi <span class="token comment">//确保万无一失</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        service<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>baseURL <span class="token operator">=</span> config<span class="token punctuation">.</span>mock <span class="token operator">?</span> config<span class="token punctuation">.</span>mockApi<span class="token operator">:</span>config<span class="token punctuation">.</span>baseApi
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">service</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><strong>实例</strong>：在中调用request封装函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>#可以先在man<span class="token punctuation">.</span>js中全局挂载注册封装好的请求函数，之后便可以在组件中直接使用了
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App.vue'</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">'./router'</span>
<span class="token keyword">import</span> ElementPlus <span class="token keyword">from</span> <span class="token string">'element-plus'</span>
<span class="token keyword">import</span> <span class="token string">'element-plus/dist/index.css'</span>
<span class="token keyword">import</span> request <span class="token keyword">from</span> <span class="token string">'./utils/request'</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"环境变量=>"</span><span class="token punctuation">,</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app<span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
<span class="token comment">// axios.get(config.mockApi + '/login').then((res)=>{</span>
<span class="token comment">//     console.log(res)</span>
<span class="token comment">// })</span>

<span class="token comment">//全局注册某个变量</span>
app<span class="token punctuation">.</span>config<span class="token punctuation">.</span>globalProperties<span class="token punctuation">.</span>$request <span class="token operator">=</span> request<span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementPlus<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>之后便可以在项目中直接这样使用axios调用接口了</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> welcome <span class="token keyword">from</span> <span class="token string">'./Welcome.vue'</span>
<span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'login'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span><span class="token punctuation">{</span>
    welcome
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    $<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'/login'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'jack'</span>
  <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token function">goHome</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'/welcome'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>欢迎来到登录页<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>goHome<span class="token punctuation">'</span></span><span class="token punctuation">></span></span>回首页<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18e52169a745495a91750715622da6a2~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>另外一种封装方式</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// this.$request ({</span>
    <span class="token comment">//   //这里边的和axios API 类似</span>
    <span class="token comment">//   method: 'get',</span>
    <span class="token comment">//   //根据封装好的reques它便会自动的去判断当前环境以及去选择mockAPI</span>
    <span class="token comment">//   url: '/login',</span>
    <span class="token comment">//   data: {</span>
    <span class="token comment">//     name:'jack'</span>
    <span class="token comment">//   }</span>
    <span class="token comment">// }).then((res)=>{</span>
    <span class="token comment">//   console.log(res)</span>
    <span class="token comment">// })</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>$request<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/login'</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'jack'</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">mock</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token literal-property property">loading</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//封装函数本身（重点）</span>
<span class="token comment">//请求核心函数</span>
<span class="token keyword">function</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    options<span class="token punctuation">.</span>method <span class="token operator">=</span> options<span class="token punctuation">.</span>method <span class="token operator">||</span> <span class="token string">'get'</span>
    <span class="token comment">//将get的请求参数params改为和post请求参数相同的data，这样在项目中就不用过度的去区分get请求还是post请求</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>method<span class="token punctuation">.</span>toLowerCase <span class="token operator">==</span> <span class="token string">'get'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        options<span class="token punctuation">.</span>params <span class="token operator">=</span> options<span class="token punctuation">.</span>data
    <span class="token punctuation">}</span>
    <span class="token comment">//mock数据相关</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>env <span class="token operator">==</span> <span class="token string">'prod'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        service<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>baseURL <span class="token operator">=</span> config<span class="token punctuation">.</span>baseApi <span class="token comment">//确保万无一失</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        service<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>baseURL <span class="token operator">=</span> config<span class="token punctuation">.</span>mock <span class="token operator">?</span> config<span class="token punctuation">.</span>mockApi<span class="token operator">:</span>config<span class="token punctuation">.</span>baseApi
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">service</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//将一些静态属性添加到request函数上</span>
<span class="token punctuation">[</span><span class="token string">'get'</span><span class="token punctuation">,</span><span class="token string">'post'</span><span class="token punctuation">,</span><span class="token string">'put'</span><span class="token punctuation">,</span><span class="token string">'delete'</span><span class="token punctuation">,</span><span class="token string">'patch'</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    request<span class="token punctuation">[</span>item<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span>data<span class="token punctuation">,</span>options</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            url<span class="token punctuation">,</span>
            data<span class="token punctuation">,</span>
            <span class="token literal-property property">method</span><span class="token operator">:</span>item<span class="token punctuation">,</span>
            <span class="token operator">...</span>options
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div></template>
