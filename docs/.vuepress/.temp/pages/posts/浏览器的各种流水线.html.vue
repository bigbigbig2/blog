<template><nav class="table-of-contents"><ul><li><RouterLink to="#一、http请求流程">一、HTTP请求流程</RouterLink><ul><li><RouterLink to="#_1-构建请求">[1]构建请求</RouterLink></li><li><RouterLink to="#_2-查找缓存">[2]查找缓存</RouterLink></li><li><RouterLink to="#_3-准备ip地址和端口">[3]准备IP地址和端口</RouterLink></li><li><RouterLink to="#_4-等待-tcp-队列">[4]等待 TCP 队列</RouterLink></li><li><RouterLink to="#_5-建立-tcp-连接">[5]建立 TCP 连接</RouterLink></li><li><RouterLink to="#_6-发送-http-请求">[6]发送 HTTP 请求</RouterLink></li><li><RouterLink to="#_7-返回请求">[7]返回请求</RouterLink></li><li><RouterLink to="#_8-断开连接">[8]断开连接</RouterLink></li><li><RouterLink to="#_9-重定向">[9]重定向</RouterLink></li></ul></li><li><RouterLink to="#二、从输入url到页面展示流程">二、从输入URL到页面展示流程</RouterLink><ul><li><RouterLink to="#_1-用户输入">[1]用户输入</RouterLink></li><li><RouterLink to="#_2-url-请求过程">[2]URL 请求过程</RouterLink><ul><li><RouterLink to="#响应数据类型处理">响应数据类型处理</RouterLink></li></ul></li><li><RouterLink to="#_3-准备渲染进程">[3]准备渲染进程</RouterLink></li><li><RouterLink to="#_4-提交文档">[4]提交文档</RouterLink></li><li><RouterLink to="#_5-渲染阶段">[5]渲染阶段</RouterLink></li><li><RouterLink to="#_6-总结">[6]总结</RouterLink></li></ul></li><li><RouterLink to="#三、页面渲染流程">三、页面渲染流程</RouterLink><ul><li><RouterLink to="#_1-构建-dom-树">[1]构建 DOM 树</RouterLink></li><li><RouterLink to="#_2-样式计算-recalculate-style">[2]样式计算（Recalculate Style）</RouterLink><ul><li><RouterLink to="#把-css-转换为浏览器能够理解的结构">把 CSS 转换为浏览器能够理解的结构</RouterLink></li><li><RouterLink to="#转换样式表中的属性值-使其标准化">转换样式表中的属性值，使其标准化</RouterLink></li><li><RouterLink to="#计算出-dom-树中每个节点的具体样式">计算出 DOM 树中每个节点的具体样式</RouterLink></li></ul></li><li><RouterLink to="#_3-布局阶段">[3]布局阶段</RouterLink><ul><li><RouterLink to="#创建布局树">创建布局树</RouterLink></li><li><RouterLink to="#布局计算">布局计算</RouterLink></li></ul></li><li><RouterLink to="#_4-分层">[4]分层</RouterLink></li><li><RouterLink to="#_5-图层绘制">[5]图层绘制</RouterLink></li><li><RouterLink to="#_5-栅格化-raster-操作">[5]栅格化（raster）操作</RouterLink></li><li><RouterLink to="#_6-合成和显示">[6]合成和显示</RouterLink></li><li><RouterLink to="#_7-页面渲染流程小结">[7]页面渲染流程小结</RouterLink></li><li><RouterLink to="#_8-相关概念补充">[8]相关概念补充</RouterLink><ul><li><RouterLink to="#渲染进程与gpu进程">渲染进程与GPU进程</RouterLink></li><li><RouterLink to="#更新了元素的几何属性-重排">更新了元素的几何属性（重排）</RouterLink></li><li><RouterLink to="#更新元素的绘制属性-重绘">更新元素的绘制属性（重绘）</RouterLink></li><li><RouterLink to="#直接合成阶段">直接合成阶段</RouterLink></li></ul></li></ul></li></ul></nav>
<h2 id="一、http请求流程" tabindex="-1"><a class="header-anchor" href="#一、http请求流程" aria-hidden="true">#</a> 一、HTTP请求流程</h2>
<p>在url栏中输入一个网址</p>
<h3 id="_1-构建请求" tabindex="-1"><a class="header-anchor" href="#_1-构建请求" aria-hidden="true">#</a> [1]构建请求</h3>
<div class="language-http ext-http line-numbers-mode"><pre v-pre class="language-http"><code>#首先，浏览器构建请求行信息
GET /index.html HTTP1.1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2-查找缓存" tabindex="-1"><a class="header-anchor" href="#_2-查找缓存" aria-hidden="true">#</a> [2]查找缓存</h3>
<p>在真正发起网络请求之前，浏览器会先在浏览器缓存中查询是否有要请求的文件。其中，<code>浏览器缓存是一种在本地保存资源副本，以供下次请求时直接使用的技术</code></p>
<p>当浏览器发现请求的资源已经在浏览器缓存中存有副本，它会拦截请求，返回该资源的副本，并直接结束请求，而不会再去源服务器重新下载。这样做的好处有：</p>
<ul>
<li>缓解服务器端压力，提升性能（获取资源的耗时更短了）；</li>
<li>对于网站来说，缓存是实现快速资源加载的重要组成部分。</li>
</ul>
<p>当然，如果缓存查找失败，就会进入网络请求过程了。</p>
<h3 id="_3-准备ip地址和端口" tabindex="-1"><a class="header-anchor" href="#_3-准备ip地址和端口" aria-hidden="true">#</a> [3]准备IP地址和端口</h3>
<p>在 <code>HTTP</code> 工作开始之前，浏览器需要通过 <code>TCP</code> 与服务器建立连接。也就是说 <code>HTTP</code> 的内容是通过 <code>TCP</code> 的传输数据阶段来实现的</p>
<p><img src="https://img-blog.csdnimg.cn/img_convert/7ca9363ec756254a6fa79f78146b115d.png" alt="image-20220324104101520"></p>
<p>所以HTTP 网络请求的第一步是和服务器建立 TCP 连接，而建立TCP连接需要准备IP地址和端口号</p>
<p>把域名和 IP 地址做一一映射关系。这套域名映射为 IP 的系统就叫做“域名系统”，简称 <code>DNS</code>（Domain Name System）。</p>
<ul>
<li>第一步浏览器会请求 <code>DNS</code> 返回域名对应的 IP，浏览器还提供了 <code>DNS</code> 数据缓存服务，如果某个域名已经解析过了，那么浏览器会缓存解析的结果，以供下次查询时直接使用，这样也会减少一次网络请求。</li>
<li>拿到 <code>IP</code> 之后，接下来就需要获取端口号了。通常情况下，如果 <code>URL</code> 没有特别指明端口号，那么 <code>HTTP</code> 协议默认是 <code>80</code> 端口。（HTTPS 默认端口 <code>443</code>）</li>
</ul>
<h3 id="_4-等待-tcp-队列" tabindex="-1"><a class="header-anchor" href="#_4-等待-tcp-队列" aria-hidden="true">#</a> [4]等待 TCP 队列</h3>
<p>现在还不能直接建立TCP连接，<code>Chrome</code> 有个机制，同一个域名同时最多只能建立 <code>6</code> 个 <code>TCP</code> 连接，如果在同一个域名下同时有 10 个请求发生，那么其中 4 个请求会进入排队等待状态，直至进行中的请求完成。</p>
<p>当然，如果当前请求数量少于 6，会直接进入下一步，建立 TCP 连接。</p>
<h3 id="_5-建立-tcp-连接" tabindex="-1"><a class="header-anchor" href="#_5-建立-tcp-连接" aria-hidden="true">#</a> [5]建立 TCP 连接</h3>
<p>tcp三次握手：</p>
<ol>
<li>客户端向服务端发送<code>SNY</code></li>
<li>服务端向客户端发送<code>ack</code>和<code>sny</code></li>
<li>客户端向服务端发送<code>ack</code></li>
</ol>
<h3 id="_6-发送-http-请求" tabindex="-1"><a class="header-anchor" href="#_6-发送-http-请求" aria-hidden="true">#</a> [6]发送 HTTP 请求</h3>
<p>一旦建立了 TCP 连接，浏览器就可以和服务器进行通信了。而 HTTP 中的数据正是在这个通信过程中传输的。</p>
<p><img src="https://img-blog.csdnimg.cn/d0c2a5b373d24b54b5cc986e5ed5af62.png" alt="在这里插入图片描述"></p>
<p>请求头形式发送一些信息，把浏览器的一些基础信息告诉服务器。比如包含了浏览器所使用的操作系统、浏览器内核等信息，以及当前请求的域名信息、浏览器端的 <code>Cookie</code> 信息，等等。</p>
<h3 id="_7-返回请求" tabindex="-1"><a class="header-anchor" href="#_7-返回请求" aria-hidden="true">#</a> [7]返回请求</h3>
<p>一旦服务器处理结束，便可以返回数据给浏览器了。你可以通过工具软件 curl 来查看返回请求数据，具体使用方法是在命令行中输入以下命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -i  https://time.geekbang.org/
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/img_convert/d992bb9808efa28d05087bef2fc43898.png" alt="image-20220324105040888"></p>
<p>响应头包含了服务器自身的一些信息，比如服务器生成返回数据的时间、返回的数据类型（JSON、HTML、流媒体等类型），以及服务器要在客户端保存的 Cookie 等信息。</p>
<p>发送完响应头后，服务器就可以继续发送响应体的数据，通常，响应体就包含了 HTML 的实际内容。</p>
<h3 id="_8-断开连接" tabindex="-1"><a class="header-anchor" href="#_8-断开连接" aria-hidden="true">#</a> [8]断开连接</h3>
<p>通常情况下，一旦服务器向客户端返回了请求数据，它就要关闭 TCP 连接。不过如果浏览器或者服务器在其头信息中加入了</p>
<div class="language-http ext-http line-numbers-mode"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Connection</span><span class="token punctuation">:</span><span class="token header-value">Keep-Alive </span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>那么 TCP 连接在发送后将仍然保持打开状态，这样浏览器就可以继续通过同一个 TCP 连接发送请求。保持 TCP 连接可以省去下次请求时需要建立连接的时间，提升资源加载速度。</p>
<p>比如，一个 Web 页面中内嵌的图片就都来自同一个 Web 站点，如果初始化了一个持久连接，你就可以复用该连接，以请求其他资源，而不需要重新再建立新的 TCP 连接。</p>
<h3 id="_9-重定向" tabindex="-1"><a class="header-anchor" href="#_9-重定向" aria-hidden="true">#</a> [9]重定向</h3>
<p>比如当你在浏览器中打开 geekbang.org 后，你会发现最终打开的页面地址是 https://www.geekbang.org。</p>
<p>这两个 URL 之所以不一样，是因为涉及到了一个重定向操作。</p>
<p>打开<code>geekbang.org</code>后</p>
<p><img src="https://img-blog.csdnimg.cn/img_convert/b86c6f4190464e879fc60b21c36fb4c0.png" alt="image-20220419200624584"></p>
<p>响应行返回的状态码是 301，状态 301  就是告诉浏览器，我需要重定向到另外一个网址，而需要重定向的网址正是包含在响应头的 Location 字段中，接下来，浏览器获取 Location 字段中的地址，并使用该地址重新导航，这就是一个完整重定向的执行流程。这也就解释了为什么输入的是 geekbang.org，最终打开的却是  https://www.geekbang.org 了。</p>
<h2 id="二、从输入url到页面展示流程" tabindex="-1"><a class="header-anchor" href="#二、从输入url到页面展示流程" aria-hidden="true">#</a> 二、从输入URL到页面展示流程</h2>
<p><img src="https://img-blog.csdnimg.cn/img_convert/a139c1bc11f7ba3434d57ab681d337a0.png" alt="image-20220324110435465"></p>
<ul>
<li>浏览器进程主要负责用户交互、子进程管理和文件储存等功能。</li>
<li>网络进程是面向渲染进程和浏览器进程等提供网络下载功能。</li>
<li>渲染进程的主要职责是把从网络下载的  <code>HTML</code>、<code>JavaScript</code>、<code>CSS</code>、图片等资源解析为可以显示和交互的页面。</li>
<li>因为渲染进程所有的内容都是通过网络获取的，会存在一些恶意代码利用浏览器漏洞对系统进行攻击，所以运行在渲染进程里面的代码是不被信任的。这也是为什么 Chrome 会让渲染进程运行在安全沙箱里，就是为了保证系统的安全。</li>
</ul>
<p>首先，浏览器进程接收到用户输入的 URL  请求，浏览器进程便将该 URL 转发给网络进程。</p>
<p>然后，在网络进程中发起真正的 URL  请求。</p>
<p>接着网络进程接收到了响应头数据，便解析响应头数据，并将数据转发给浏览器进程。</p>
<p>浏览器进程接收到网络进程的响应头数据之后，发送“提交导航  (CommitNavigation)”消息到渲染进程；</p>
<p>渲染进程接收到“提交导航”的消息之后，便开始准备接收 HTML  数据，接收数据的方式是直接和网络进程建立数据管道；</p>
<p>最后渲染进程会向浏览器进程“确认提交”，这是告诉浏览器进程：“已经准备好接受和解析页面数据了”。</p>
<p>浏览器进程接收到渲染进程“提交文档”的消息之后，便开始移除之前旧的文档，然后更新浏览器进程中的页面状态。</p>
<p><strong>这其中，用户发出 URL 请求到页面开始解析的这个过程，就叫做导航。</strong></p>
<h3 id="_1-用户输入" tabindex="-1"><a class="header-anchor" href="#_1-用户输入" aria-hidden="true">#</a> [1]用户输入</h3>
<p>判断用户输入的是url还是关键字，当用户输入关键字并键入回车之后，浏览器还给了当前页面一次执行 <code>beforeunload</code> 事件的机会，<code>beforeunload</code>事件可以在跳转前执行一些逻辑，或者取消跳转。</p>
<h3 id="_2-url-请求过程" tabindex="-1"><a class="header-anchor" href="#_2-url-请求过程" aria-hidden="true">#</a> [2]URL 请求过程</h3>
<p>浏览器进程会通过进程间通信<code>（IPC）</code>把 <code>URL</code> 请求发送至网络进程</p>
<p>首先，网络进程会查找本地缓存是否缓存了该资源。如果有缓存资源，那么直接返回资源给浏览器进程；如果在缓存中没有查找到资源，那么直接进入网络请求流程。这请求前的第一步是要进行 <code>DNS</code> 解析，以获取请求域名的服务器 <code>IP</code> 地址。如果请求协议是 <code>HTTPS</code>，那么还需要建立 <code>TLS</code> 连接。</p>
<p>收到服务器的响应后，等网络进程接收了响应行和响应头之后，就开始解析响应头的内容了。</p>
<p>重定向</p>
<p>在接收到服务器返回的响应头后，网络进程开始解析响应头，如果发现返回的状态码是 <code>301</code> 或者 <code>302</code>，那么说明服务器需要浏览器重定向到其他 URL。这时网络进程会从响应头的 <code>Location</code>  字段里面读取重定向的地址，然后再发起新的 HTTP 或者 HTTPS 请求，一切又重头开始了。</p>
<p><img src="https://img-blog.csdnimg.cn/1fa5d6d863c44c6984935e5329c476e5.png" alt="在这里插入图片描述"></p>
<p>重定向后发出的请求:</p>
<p><img src="https://img-blog.csdnimg.cn/10381d679796458f83fbadbddc3dcf1c.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>在导航过程中，如果服务器响应行的状态码包含了 301、302 一类的跳转信息，浏览器会跳转到新的地址继续导航；如果响应行是 200，那么表示浏览器可以继续处理该请求。</p>
</blockquote>
<h4 id="响应数据类型处理" tabindex="-1"><a class="header-anchor" href="#响应数据类型处理" aria-hidden="true">#</a> 响应数据类型处理</h4>
<p><code>Content-Type</code> 是 HTTP 头中一个非常重要的字段， 它告诉浏览器服务器返回的响应体数据是什么类型,，然后浏览器会根据 <code>Content-Type</code> 的值来决定如何显示响应体的内容。</p>
<p><img src="https://img-blog.csdnimg.cn/c06af9b54d0245d295ac0cbd53299d9d.png" alt="在这里插入图片描述"></p>
<p>如果 Content-Type 字段的值被浏览器判断为下载类型(例如：<code>application/octet-stream</code>)，那么该请求会被提交给浏览器的下载管理器，同时该 URL 请求的导航流程就此结束。但如果是 HTML，那么浏览器则会继续进行导航流程。</p>
<h3 id="_3-准备渲染进程" tabindex="-1"><a class="header-anchor" href="#_3-准备渲染进程" aria-hidden="true">#</a> [3]准备渲染进程</h3>
<p>认情况下，<code>Chrome</code> 会为每个页面分配一个渲染进程，也就是说，每打开一个新页面就会配套创建一个新的渲染进程。(除了是同一个网站的子网站可能是在同一个渲染进程里)</p>
<p><strong>那什么情况下多个页面会同时运行在一个渲染进程中呢？</strong></p>
<ul>
<li>
<p>同一站点（<code>same-site</code>）：根域名（例如，<code>geekbang.org</code>）加上协议（例如，<code>https:// 或者 http://</code>）</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>协议相同，为http或者http，根域名相同，比如：xiaomai5.com
https://time.geekbang.org
https://www.geekbang.org
https://www.geekbang.org:8080
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
<li>
<p><code>Chrome</code> 的默认策略是，每个标签对应一个渲染进程。但如果从一个页面打开了另一个新页面，而新页面和当前页面属于同一站点的话，那么新页面会复用父页面的渲染进程。官方把这个默认策略叫 <code>process-per-site-instance</code>。</p>
</li>
</ul>
<p><strong>总结来说，打开一个新页面采用的渲染进程策略就是：</strong></p>
<ul>
<li>通常情况下，打开新的页面都会使用单独的渲染进程；</li>
<li>如果从 A 页面打开 B 页面，且 A 和 B 都属于同一站点的话，那么 B 页面复用 A 页面的渲染进程；如果是其他情况，浏览器进程则会为 B 创建一个新的渲染进程。</li>
</ul>
<p>渲染进程准备好之后，还不能立即进入文档解析状态，因为此时的文档数据还在网络进程中，并没有提交给渲染进程，所以下一步就进入了提交文档阶段。</p>
<h3 id="_4-提交文档" tabindex="-1"><a class="header-anchor" href="#_4-提交文档" aria-hidden="true">#</a> [4]提交文档</h3>
<p>所谓提交文档，就是指浏览器进程将网络进程接收到的 HTML 数据提交给渲染进程</p>
<ul>
<li>首先当浏览器进程接收到网络进程的响应头数据之后，便向渲染进程发起“提交文档”的消息；</li>
<li>渲染进程接收到“提交文档”的消息后，会和网络进程建立传输数据的“管道”；</li>
<li>等文档数据传输完成之后，渲染进程会返回“确认提交”的消息给浏览器进程；</li>
<li>浏览器进程在收到“确认提交”的消息后，会<code>更新浏览器界面状态</code>，包括了安全状态、地址栏的 URL、前进后退的历史状态，并更新 Web 页面。</li>
</ul>
<p>当渲染进程确认提交后：</p>
<p><img src="https://img-blog.csdnimg.cn/img_convert/8e36b2b834df0ee19fd199f58c494a15.png" alt="image-20220325100657654"></p>
<h3 id="_5-渲染阶段" tabindex="-1"><a class="header-anchor" href="#_5-渲染阶段" aria-hidden="true">#</a> [5]渲染阶段</h3>
<p>旦文档被提交，渲染进程便开始页面解析和子资源加载了，一旦页面生成完成，渲染进程会发送一个消息给浏览器进程，浏览器接收到消息后，会停止标签图标上的加载动画。</p>
<h3 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结" aria-hidden="true">#</a> [6]总结</h3>
<p>面试题：从输入 URL 到页面展示，这中间发生了什么？</p>
<ol>
<li>
<p>用户输入url并回车</p>
</li>
<li>
<p>浏览器进程检查url，组装协议，构成完整的url</p>
</li>
<li>
<p>浏览器进程通过进程间通信（IPC）把url请求发送给网络进程</p>
</li>
<li>
<p>网络进程接收到<code>url</code>请求后检查本地缓存是否缓存了该请求资源，如果有则将该资源返回给浏览器进程</p>
</li>
<li>
<p>如果没有，网络进程向web服务器发起http请求（网络请求），请求流程如下</p>
<ol>
<li>进行DNS解析，获取服务器ip地址</li>
<li>利用ip地址和服务器建立tcp连接</li>
<li>构建请求头信息</li>
<li>发送请求头信息</li>
<li>服务器响应后，网络进程接收响应头和响应信息，并解析响应内容</li>
</ol>
</li>
<li>
<p>网络进程解析响应流程</p>
<ul>
<li>检查状态码，如果是301/302，则需要重定向，从<code>Location</code>自动中读取地址，重新进行网络请求步骤 ，如果是200，则继续处理请求</li>
<li>200响应处理：检查响应类型<code>Content-Type</code>，如果是字节流类型，则将该请求提交给下载管理器，该导航流程结束，不再进行后续的渲染，如果是<code>html</code>则通知浏览器进程准备渲染进程准备进行渲染。</li>
</ul>
</li>
<li>
<p>准备渲染进程</p>
<ol>
<li>浏览器进程检查当前url是否和之前打开的渲染进程根域名是否相同，如果相同，则复用原来的进程，如果不同，则开启新的渲染进程</li>
</ol>
</li>
<li>
<p>传输数据、更新状态
. 渲染进程准备好后，浏览器向渲染进程发起“提交文档”的消息，渲染进程接收到消息和网络进程建立传输数据的“管道”
2. 渲染进程接收完数据后，向浏览器发送“确认提交”
3. 浏览器进程接收到确认消息后更新浏览器界面状态：安全、地址栏url、前进后退的历史状态、更新web页面</p>
</li>
</ol>
<h2 id="三、页面渲染流程" tabindex="-1"><a class="header-anchor" href="#三、页面渲染流程" aria-hidden="true">#</a> 三、页面渲染流程</h2>
<p>渲染进程拿到浏览器主进程提交的文档（HTML、CSS和JavaScript）是如何转变成我们常见的页面的。</p>
<p>渲染阶段至关重要，关乎优化页面卡顿问题</p>
<p><img src="https://img-blog.csdnimg.cn/2d1780f24e2448fdae6abff8f7076293.png" alt="在这里插入图片描述"></p>
<p>由于渲染机制过于复杂，所以渲染模块在执行过程中会被划分为很多子阶段，输入的 HTML 经过这些子阶段，最后输出像素。我们把这样的一个处理流程叫做渲染流水线，其大致流程如下图所示：</p>
<p><img src="https://img-blog.csdnimg.cn/ec552e6aa45e433ab6baad113703d294.png" alt="在这里插入图片描述"></p>
<p>各子阶段大致可以分为：构建 DOM 树、样式计算、布局阶段、分层、绘制、分块、光栅化和合成**。</p>
<p>每个阶段的共性</p>
<ul>
<li>开始每个子阶段都有其输入的内容；</li>
<li>然后每个子阶段有其处理过程；</li>
<li>最终每个子阶段会生成输出内容。</li>
</ul>
<h3 id="_1-构建-dom-树" tabindex="-1"><a class="header-anchor" href="#_1-构建-dom-树" aria-hidden="true">#</a> [1]构建 DOM 树</h3>
<p>浏览器无法直接理解和使用 <code>HTML</code>，所以需要将 <code>HTML</code> 转换为浏览器能够理解的结构——<code>DOM</code> 树。</p>
<p><img src="https://img-blog.csdnimg.cn/3c7906d0b3af45eca148b091704f68a3.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>DOM 和 HTML 内容几乎是一样的，但是和 HTML 不同的是，DOM 是保存在内存中树状结构，可以通过 JavaScript 来查询或修改其内容。</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>document.getElementsByTagName("p")[0].innerText = "black"
//这行代码的作用是把第一个标签的内容修改为 black,操作的是DOM树
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/401fe308bdfb4fd6935fab24d2f422e6.png" alt="在这里插入图片描述"></p>
<h3 id="_2-样式计算-recalculate-style" tabindex="-1"><a class="header-anchor" href="#_2-样式计算-recalculate-style" aria-hidden="true">#</a> [2]样式计算（Recalculate Style）</h3>
<p>样式计算的目的是为了计算出 <code>DOM</code> 节点中每个元素的具体样式，这个阶段大体可分为三步来完成。</p>
<h4 id="把-css-转换为浏览器能够理解的结构" tabindex="-1"><a class="header-anchor" href="#把-css-转换为浏览器能够理解的结构" aria-hidden="true">#</a> 把 CSS 转换为浏览器能够理解的结构</h4>
<p><img src="https://img-blog.csdnimg.cn/468b79f6aac5489898d0d9866c0b2301.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>样式源：</p>
</blockquote>
<p>和 HTML 文件一样，浏览器也是无法直接理解这些纯文本的 <code>CSS</code> 样式，所以当<code>渲染引擎接收到 CSS 文本时，会执行一个转换操作，将 CSS 文本转换为浏览器可以理解的结构——styleSheets。</code></p>
<p><img src="https://img-blog.csdnimg.cn/bb0042309f08437d8bc7f647e97de4fb.png" alt="在这里插入图片描述"></p>
<h4 id="转换样式表中的属性值-使其标准化" tabindex="-1"><a class="header-anchor" href="#转换样式表中的属性值-使其标准化" aria-hidden="true">#</a> 转换样式表中的属性值，使其标准化</h4>
<p>现在我们已经把现有的 CSS 文本转化为浏览器可以理解的结构了，那么接下来就要对其进行属性值的标准化操作。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">body</span> <span class="token punctuation">{</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 2em <span class="token punctuation">}</span>
<span class="token selector">p</span> <span class="token punctuation">{</span><span class="token property">color</span><span class="token punctuation">:</span>blue<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token selector">span</span>  <span class="token punctuation">{</span><span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">}</span>
<span class="token selector">div</span> <span class="token punctuation">{</span><span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">}</span>
<span class="token selector">div  p</span> <span class="token punctuation">{</span><span class="token property">color</span><span class="token punctuation">:</span>green<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token selector">div</span> <span class="token punctuation">{</span><span class="token property">color</span><span class="token punctuation">:</span>red<span class="token punctuation">;</span> <span class="token punctuation">}</span>
//需要将所有属性值转换为渲染引擎容易理解的、标准化的计算值，这个过程就是属性值标准化。
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>标准化过程</p>
<p><img src="https://img-blog.csdnimg.cn/img_convert/d495c14763a6700c293155253b7720b5.png" alt="image-20220419203357376"></p>
<h4 id="计算出-dom-树中每个节点的具体样式" tabindex="-1"><a class="header-anchor" href="#计算出-dom-树中每个节点的具体样式" aria-hidden="true">#</a> 计算出 DOM 树中每个节点的具体样式</h4>
<p>现在样式的属性已被标准化了，接下来就需要计算 DOM 树中每个节点的样式属性了</p>
<p>如何计算：涉及到 CSS 的继<strong>承规则</strong>和<strong>层叠规则</strong>了</p>
<p>通过浏览器开发者工具查看继承：</p>
<p><img src="https://img-blog.csdnimg.cn/img_convert/da97836524003d49c003d4e59f47246d.png" alt="image-20220325104843212"></p>
<ul>
<li>首先，可以选择要查看的元素的样式（位于图中的区域 2 中），在图中的第 1 个区域中点击对应的元素，就可以在下面的区域查看该元素的样式了。比如这里我们选择的元素是</li>
<li>标签，位于 <code>html.body.div</code>. 这个路径下面。其次，可以从样式来源（位于图中的区域 3  中）中查看样式的具体来源信息，看看是来源于样式文件，还是来源于 UserAgent 样式表。这里需要特别提下 UserAgent  样式，它是浏览器提供的一组默认样式，如果你不提供任何样式，默认使用的就是 UserAgent 样式。最后，可以通过区域 2 和区域 3  来查看样式继承的具体过程。</li>
</ul>
<blockquote>
<p>总之，样式计算阶段的目的是为了计算出 DOM 节点中每个元素的具体样式，在计算过程中需要遵守 CSS 的继承和层叠两个规则。这个阶段最终输出的内容是每个 DOM 节点的样式，并被保存在 <code>ComputedStyle</code> 的结构内。</p>
</blockquote>
<p>通过开发者工具查看某个<code>DOM</code>元素的最终样式：</p>
<p><img src="https://img-blog.csdnimg.cn/90028f2e118a4d09a9e509596be04e1b.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>上图红色方框中显示了 html.body.div.p 标签的 ComputedStyle 的值。你想要查看哪个元素，点击左边对应的标签就可以了</p>
</blockquote>
<h3 id="_3-布局阶段" tabindex="-1"><a class="header-anchor" href="#_3-布局阶段" aria-hidden="true">#</a> [3]布局阶段</h3>
<p>知道了<code>DOM</code> 树和 <code>DOM</code> 树中元素的样式，还不足以显示页面，因为还不知道 <code>DOM</code> 元素的几何位置信息。那么接下来就需要计算出 <code>DOM</code> 树中可见元素的几何位置，我们把这个<strong>计算过程叫做布局</strong>。</p>
<p><strong>Chrome 在布局阶段需要完成两个任务：创建布局树和布局计算。</strong></p>
<h4 id="创建布局树" tabindex="-1"><a class="header-anchor" href="#创建布局树" aria-hidden="true">#</a> 创建布局树</h4>
<p><img src="https://img-blog.csdnimg.cn/e8a89268e15640339cec9e70ed4506b5.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>DOM树种的一些不可见节点是不会出现在布局树种的</p>
</blockquote>
<ul>
<li>遍历 DOM 树中的所有可见节点，并把这些节点加到布局树中；</li>
<li>而不可见的节点会被布局树忽略掉，如 head 标签下面的全部内容，再比如 <code>body.p.span</code> 这个元素，因为它的属性包含 <code>dispaly:none</code>，所以这个元素也没有被包进布局树。</li>
</ul>
<h4 id="布局计算" tabindex="-1"><a class="header-anchor" href="#布局计算" aria-hidden="true">#</a> 布局计算</h4>
<p>布局的计算过程非常复杂</p>
<p>在执行布局操作的时候，会把布局运算的结果重新写回布局树中，所以布局树既是输入内容也是输出内容，这是布局阶段一个不合理的地方，因为在布局阶段并没有清晰地将输入内容和输出内容区分开来。针对这个问题，Chrome 团队正在重构布局代码，下一代布局系统叫 LayoutNG，试图更清晰地分离输入和输出，从而让新设计的布局算法更加简单。</p>
<h3 id="_4-分层" tabindex="-1"><a class="header-anchor" href="#_4-分层" aria-hidden="true">#</a> [4]分层</h3>
<p>虽然有了布局树，而且每个元素的具体位置信息都计算出来了，但是还没到绘制页面阶段</p>
<p>因为页面中有很多复杂的效果，如一些复杂的 3D 变换、页面滚动，或者使用 <code>z-indexing</code> 做 <code>z</code> 轴排序等，为了更加方便地实现这些效果，渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树（<code>LayerTree</code>）</p>
<p>要想直观地理解什么是图层，你可以打开 <code>Chrome</code> 的“开发者工具”，选择“<code>Layers</code>”标签，就可以可视化页面的分层情况</p>
<p><img src="https://img-blog.csdnimg.cn/img_convert/fa893076311a541a9f5a713eea249610.png" alt="image-20220325221406426"></p>
<blockquote>
<p>图层和布局树节点之间的关系</p>
</blockquote>
<p>通常情况下，并不是布局树的每个节点都包含一个图层，如果一个节点没有对应的层，那么这个节点就从属于父节点的图层。如上图中的 <code>span</code> 标签没有专属图层，那么它们就从属于它们的父节点图层。</p>
<p><strong>那么需要满足什么条件，渲染引擎才会为特定的节点创建新的图层呢？</strong></p>
<ol>
<li><strong>拥有层叠上下文属性的元素会被提升为单独的一层。</strong>（层叠上下文示意图）</li>
</ol>
<p><img src="https://img-blog.csdnimg.cn/0382e685cf4b42868d81c3d12b0a633b.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>从图中可以看出，明确定位属性的元素、定义透明属性的元素、使用 CSS 滤镜的元素等，都拥有层叠上下文属性。</p>
</blockquote>
<ol start="2">
<li><strong>需要剪裁（clip）的地方也会被创建为图层。</strong></li>
</ol>
<h3 id="_5-图层绘制" tabindex="-1"><a class="header-anchor" href="#_5-图层绘制" aria-hidden="true">#</a> [5]图层绘制</h3>
<p>渲染引擎实现图层的绘制会把一个图层的绘制拆分成很多小的绘制指令，然后再把这些指令按照顺序组成一个待绘制列表(有点类似于使用Canvas来绘图)</p>
<p><img src="https://img-blog.csdnimg.cn/img_convert/1291273f624062cc5578a8ddb25fd06f.png" alt="image-20220326100149857"></p>
<p>查看绘制过程</p>
<p><img src="https://img-blog.csdnimg.cn/4fad796842874accb9f41f90a7d204be.png" alt="在这里插入图片描述"></p>
<p>在该图中，区域 1 就是 document 的绘制列表，拖动区域 2 中的进度条可以重现列表的绘制过程。</p>
<h3 id="_5-栅格化-raster-操作" tabindex="-1"><a class="header-anchor" href="#_5-栅格化-raster-操作" aria-hidden="true">#</a> [5]栅格化（raster）操作</h3>
<p>绘制列表只是用来记录绘制顺序和绘制指令的列表，而实际上绘制操作是由渲染引擎中的合成线程来完成的。你可以结合下图来看下渲染主线程和合成线程之间的关系：</p>
<p><img src="https://img-blog.csdnimg.cn/9c6e0e48e13c4be49b1d43a78206a8a2.png" alt="在这里插入图片描述"></p>
<p>当图层的绘制列表准备好之后，主线程会把该绘制列表提交（<code>commit</code>）给合成线程</p>
<blockquote>
<p>通常一个页面可能很大，但是用户只能看到其中的一部分，我们把用户可以看到的这个部分叫做视口（<code>viewport</code>）</p>
<p>通过视口可以减少性能上的开销</p>
</blockquote>
<p>基于这个原因，合成线程会将图层划分为图块（<code>tile</code>），这些图块的大小通常是 <code>256x256</code> 或者 <code>512x512</code>，如下图所示：</p>
<p><img src="https://img-blog.csdnimg.cn/b03df6b3c0c149beb717c2daa325f267.png" alt="在这里插入图片描述"></p>
<p>然后合成线程会按照视口附近的图块来优先生成位图，实际生成位图的操作是由栅格化来执行的。所谓栅格化，是指将图块转换为位图。而图块是栅格化执行的最小单位。渲染进程维护了一个栅格化的线程池，所有的图块栅格化都是在线程池内执行的，运行方式如下图所示：</p>
<blockquote>
<p>栅格化：就是将矢量图转换为位图。矢量图：可以无限放大而不丢失细节。位图：二维数组。</p>
</blockquote>
<p><img src="https://img-blog.csdnimg.cn/d3b57dbeebb94ba6af7e1bca7a7b2282.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>合成线程提交图块给栅格化线程池</p>
</blockquote>
<p>通常，栅格化过程都会使用 <code>GPU</code> 来加速生成，使用 <code>GPU</code> 生成位图的过程叫快速栅格化，或者 <code>GPU</code> 栅格化，生成的位图被保存在 GPU 内存中。</p>
<p>GPU 操作是运行在 GPU 进程中，如果栅格化操作使用了 <code>GPU</code>，那么最终生成位图的操作是在 <code>GPU</code> 中完成的，这就涉及到了跨进程操作。</p>
<p><img src="https://img-blog.csdnimg.cn/b0eb4d0c06c04ae7b99ef0fa68d8ab16.png" alt="在这里插入图片描述"></p>
<p>从图中可以看出，渲染进程把生成图块的指令发送给 GPU，然后在 GPU 中执行生成图块的位图，并保存在 GPU 的内存中</p>
<h3 id="_6-合成和显示" tabindex="-1"><a class="header-anchor" href="#_6-合成和显示" aria-hidden="true">#</a> [6]合成和显示</h3>
<p>一旦所有图块都被光栅化，合成线程就会生成一个绘制图块的命令——“<code>DrawQuad</code>”，然后将该命令提交给浏览器进程。</p>
<p>浏览器进程里面有一个叫 <code>viz</code> 的组件，用来接收合成线程发过来的 <code>DrawQuad</code> 命令，然后根据 <code>DrawQuad</code>  命令，将其页面内容绘制到内存中，最后再将内存显示在屏幕上。</p>
<h3 id="_7-页面渲染流程小结" tabindex="-1"><a class="header-anchor" href="#_7-页面渲染流程小结" aria-hidden="true">#</a> [7]页面渲染流程小结</h3>
<p><img src="https://img-blog.csdnimg.cn/be20455e4f3041aeb19ded686283ca50.png" alt="在这里插入图片描述"></p>
<ol>
<li>渲染进程将 HTML 内容转换为能够读懂的  DOM 树结构。</li>
<li>渲染引擎将 CSS 样式表转化为浏览器可以理解的 styleSheets，计算出 DOM  节点的样式。</li>
<li>创建布局树，并计算元素的布局信息。</li>
<li>对布局树进行分层，并生成分层树。</li>
<li>为每个图层生成绘制列表，并将其提交到合成线程。</li>
<li>合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图。</li>
<li>合成线程发送绘制图块命令 DrawQuad 给浏览器进程。</li>
<li>浏览器进程根据 DrawQuad 消息生成页面，并显示到显示器上。</li>
</ol>
<h3 id="_8-相关概念补充" tabindex="-1"><a class="header-anchor" href="#_8-相关概念补充" aria-hidden="true">#</a> [8]相关概念补充</h3>
<h4 id="渲染进程与gpu进程" tabindex="-1"><a class="header-anchor" href="#渲染进程与gpu进程" aria-hidden="true">#</a> 渲染进程与GPU进程</h4>
<ul>
<li>浏览器内核就是浏览器渲染进程，从接收下载文件后再到呈现整个页面的过程，由浏览器渲染进程负责</li>
<li>负责3D绘制和硬件加速</li>
</ul>
<h4 id="更新了元素的几何属性-重排" tabindex="-1"><a class="header-anchor" href="#更新了元素的几何属性-重排" aria-hidden="true">#</a> 更新了元素的几何属性（重排）</h4>
<p><img src="https://img-blog.csdnimg.cn/7cb2473f6c12478193b028cfbc298ee5.png" alt="在这里插入图片描述"></p>
<p>如果你通过 JavaScript 或者 CSS 修改元素的几何位置属性，例如改变元素的宽度、高度等，那么浏览器会触发重新布局，解析之后的一系列子阶段，这个过程就叫重排。无疑，重排需要更新完整的渲染流水线，所以开销也是最大的。</p>
<h4 id="更新元素的绘制属性-重绘" tabindex="-1"><a class="header-anchor" href="#更新元素的绘制属性-重绘" aria-hidden="true">#</a> 更新元素的绘制属性（重绘）</h4>
<p>从图中可以看出，如果修改了元素的背景颜色，那么布局阶段将不会被执行，因为并没有引起几何位置的变换，所以就直接进入了绘制阶段，然后执行之后的一系列子阶段，这个过程就叫重绘。相较于重排操作，重绘省去了布局和分层阶段，所以执行效率会比重排操作要高一些</p>
<p><img src="https://img-blog.csdnimg.cn/c10bd3bad3da4b8584b8404fe7abc13f.png" alt="在这里插入图片描述"></p>
<h4 id="直接合成阶段" tabindex="-1"><a class="header-anchor" href="#直接合成阶段" aria-hidden="true">#</a> 直接合成阶段</h4>
<p>如果你更改一个既不要布局也不要绘制的属性，会发生什么变化呢？渲染引擎将跳过布局和绘制，只执行后续的合成操作，我们把这个过程叫做合成。具体流程参考下图：</p>
<p><img src="https://img-blog.csdnimg.cn/167e4f3323c24d05b5878ebae60955d8.png" alt="在这里插入图片描述"></p>
<p>在上图中，我们使用了 CSS 的  transform  来实现动画效果，这可以避开重排和重绘阶段，直接在非主线程上执行合成动画操作。这样的效率是最高的，因为是在非主线程上合成，并没有占用主线程的资源，另外也避开了布局和绘制两个子阶段，所以相对于重绘和重排，合成能大大提升绘制效率。</p>
<blockquote>
<p>减少重排重绘, 方法很多：</p>
<ol>
<li>使用 class 操作样式，而不是频繁操作 style</li>
<li>避免使用 table 布局</li>
<li>批量dom 操作，例如 createDocumentFragment，或者使用框架，例如 React</li>
<li>Debounce window resize 事件</li>
<li>对 dom 属性的读写要分离</li>
<li>will-change: transform 做优化</li>
</ol>
</blockquote>
</template>
