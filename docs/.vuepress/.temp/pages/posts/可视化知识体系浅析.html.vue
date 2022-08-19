<template><h2 id="_1-可视化知识体系" tabindex="-1"><a class="header-anchor" href="#_1-可视化知识体系" aria-hidden="true">#</a> 1.可视化知识体系</h2>
<p>可视化是一个比较大的话题，所以下面就学习过程中的知识进行分类。</p>
<p><img src="https://img-blog.csdnimg.cn/3edb15021f4f466391491c1b4e0291a4.png" alt="在这里插入图片描述"></p>
<p>我们应该把重点放在<strong>理论基础</strong>上，因为随着技术的发展，工具会改变，而基础不会。</p>
<h2 id="_2-浏览器中实现可视化的四种方式" tabindex="-1"><a class="header-anchor" href="#_2-浏览器中实现可视化的四种方式" aria-hidden="true">#</a> 2.浏览器中实现可视化的四种方式</h2>
<p>具体用法这里就不展开了，MDN上有通俗易懂的教程👀</p>
<p><img src="https://img-blog.csdnimg.cn/9219f5c746734599a13076ba3de752e3.png" alt="在这里插入图片描述"></p>
<h3 id="_1-html-css" tabindex="-1"><a class="header-anchor" href="#_1-html-css" aria-hidden="true">#</a> [1]HTML+CSS</h3>
<h4 id="用-html-css-实现可视化的缺点" tabindex="-1"><a class="header-anchor" href="#用-html-css-实现可视化的缺点" aria-hidden="true">#</a> 用 HTML+CSS 实现可视化的缺点</h4>
<ol>
<li><code>HTML</code> 和 <code>CSS</code> 主要还是为网页布局而创造的，使用它们虽然能绘制可视化图表，但是绘制的方式并不简洁。</li>
<li><code>HTML</code> 和 <code>CSS</code> 作为浏览器渲染引擎的一部分，为了完成页面渲染的工作，除了绘制图形外，还要做很多额外的工作。</li>
</ol>
<h3 id="_2-svg" tabindex="-1"><a class="header-anchor" href="#_2-svg" aria-hidden="true">#</a> [2]SVG</h3>
<p>缺点</p>
<p>同HTML+CSS绘图的缺点</p>
<p>无论是使用 <code>HTML/CSS</code> 还是 <code>SVG</code>，它们都属于声明式绘图系统，也就是我们根据数据创建各种不同的图形元素（或者 <code>CSS</code> 规则），然后利用浏览器渲染引擎解析它们并渲染出来。</p>
<h3 id="_3-canvas2d" tabindex="-1"><a class="header-anchor" href="#_3-canvas2d" aria-hidden="true">#</a> [3]Canvas2D</h3>
<h4 id="绘图原理" tabindex="-1"><a class="header-anchor" href="#绘图原理" aria-hidden="true">#</a> 绘图原理</h4>
<p>Canvas 元素在浏览器上创造一个空白的画布，通过提供渲染上下文，赋予我们绘制内容的能力。然后，我们只需要调用渲染上下文，设置各种属性，调用绘图指令完成输出，然后将绘制的图形输出到画布上。</p>
<p><code>Canvas</code> 能够直接操作绘图上下文，不需要经过 <code>HTML</code>、<code>CSS</code> 解析、构建渲染树、布局等一系列操作。因此单纯绘图的话，<code>Canvas</code> 比 <code>HTML/CSS</code> 和 <code>SVG</code> 要快得多，但是对于画一些简单的图形，<code>Canvas</code>就要比<code>HTML/CSS</code> 和 <code>SVG</code> 麻烦了。</p>
<h3 id="_4-webgl" tabindex="-1"><a class="header-anchor" href="#_4-webgl" aria-hidden="true">#</a> [4]WebGL</h3>
<p>WebGL 绘制比前三种方式要复杂一些，因为 <code>WebGL</code> 是基于 <code>OpenGL</code> ES 规范的浏览器实现的，API 相对更底层，使用起来不如前三种那么简单直接。</p>
<p>一般情况下，<code>Canvas2D</code> 绘制图形的性能已经足够高了，但是在三种情况下我们有必要直接操作更强大的 GPU 来实现绘图。</p>
<ul>
<li>第一种情况，如果我们要绘制的图形数量非常多，比如有多达数万个几何图形需要绘制，而且它们的位置和方向都在不停地变化，那我们即使用 Canvas2D 绘制了，性能还是会达到瓶颈。这个时候，我们就需要使用 GPU 能力，直接用 <code>WebGL</code> 来绘制。</li>
<li>第二种情况，如果我们要对较大图像的细节做像素处理，比如，实现物体的光影、流体效果和一些复杂的像素滤镜。由于这些效果往往要精准地改变一个图像全局或局部区域的所有像素点，要计算的像素点数量非常的多（一般是数十万甚至上百万数量级的）。这时，即使采用 Canvas2D 操作，也会达到性能瓶颈，所以我们也要用 WebGL 来绘制。</li>
<li>第三种情况是绘制 3D 物体。因为 WebGL 内置了对 3D 物体的投影、深度检测等特性，所以用它来渲染 3D 物体就不需要我们自己对坐标做底层的处理了。那在这种情况下，WebGL 无论是在使用上还是性能上都有很大优势。</li>
</ul>
<h3 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结" aria-hidden="true">#</a> [5]总结</h3>
<h4 id="选择" tabindex="-1"><a class="header-anchor" href="#选择" aria-hidden="true">#</a> 选择</h4>
<p><img src="https://img-blog.csdnimg.cn/1f0dd367b2eb4ae1ae33d4555d71367a.png" alt="在这里插入图片描述"></p>
<h4 id="关于坐标系" tabindex="-1"><a class="header-anchor" href="#关于坐标系" aria-hidden="true">#</a> 关于坐标系</h4>
<ul>
<li><code>SVG</code> 坐标系和 <code>Canvas</code> 坐标系完全一样</li>
<li>可以通过给 <code>svg</code> 元素设置 <code>viewBox</code> 属性，来改变 <code>SVG</code> 的坐标系</li>
<li><code>Canvas</code> 元素上的 <code>width</code> 和 <code>height</code> 属性不等同于 <code>Canvas</code> 元素的 <code>CSS</code> 样式的属性。</li>
<li><code>Canvas</code> 的 <code>HTML</code> 属性宽高为画布宽高，<code>CSS</code> 样式宽高为样式宽高。</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/d6a9d84921aa4c1e814a8af4f9edfeb7.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>canvas和SVG的坐标系</p>
</blockquote>
<p><img src="https://img-blog.csdnimg.cn/02d725e84eb145c88b2277a43500e5d8.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>将canvas的样式宽高设为256px，画布宽高设为512px时的情况</p>
</blockquote>
<p><img src="https://img-blog.csdnimg.cn/img_convert/5b40d3392fd34795c05633203712eb4c.png" alt="image-20220323222202538"></p>
<blockquote>
<p>webgl坐标系（x 轴朝右，y 轴朝上，z 轴朝外）</p>
</blockquote>
<h2 id="_3-图形系统绘图原理" tabindex="-1"><a class="header-anchor" href="#_3-图形系统绘图原理" aria-hidden="true">#</a> 3.图形系统绘图原理</h2>
<h3 id="_1-计算机图形系统的主要组成部分" tabindex="-1"><a class="header-anchor" href="#_1-计算机图形系统的主要组成部分" aria-hidden="true">#</a> [1]计算机图形系统的主要组成部分</h3>
<ul>
<li>输入设备</li>
<li>中央处理单元</li>
<li>图形处理单元</li>
<li>存储器</li>
<li>帧缓存</li>
<li>输出设备</li>
</ul>
<h3 id="_2-绘图原理" tabindex="-1"><a class="header-anchor" href="#_2-绘图原理" aria-hidden="true">#</a> [2]绘图原理</h3>
<p><img src="https://img-blog.csdnimg.cn/d489fb4b57c947b7a5c4a44213d0ef33.png" alt="在这里插入图片描述"></p>
<p>首先，数据经过 <code>CPU</code> 处理，成为具有特定结构的几何信息。然后，这些信息会被送到 GPU 中进行处理。在 GPU 中要经过两个步骤生成光栅信息。这些光栅信息会输出到帧缓存中，最后渲染到屏幕上。</p>
<blockquote>
<p><strong>一些名词</strong>：</p>
<ul>
<li>光栅（Raster）：几乎所有的现代图形系统都是基于光栅来绘制图形的，光栅就是指<code>构成图像的像素阵列</code>。</li>
<li>像素（Pixel）：一个像素对应图像上的一个点，它通常保存图像上的某个具体位置的颜色等信息。</li>
<li>帧缓存（Frame Buffer）：在绘图过程中，像素信息被存放于帧缓存中，帧缓存是一块内存地址。</li>
<li>CPU（Central Processing  Unit）：中央处理单元，负责逻辑计算。</li>
<li>GPU（Graphics Processing Unit）：图形处理单元，负责图形计算。</li>
</ul>
</blockquote>
<p><img src="https://img-blog.csdnimg.cn/bb36740765b24534b68734167da57937.png" alt="在这里插入图片描述"></p>
<p>绘图过程主要分为两大部分:</p>
<ol>
<li>对给定的<strong>数据结合绘图的场景要素</strong>（例如相机、光源、遮挡物体等等）进行计算，最终将图形变为屏幕空间的 2D 坐标。</li>
<li>为屏幕空间的每个像素点进行着色，把最终完成的图形输出到显示设备上。这整个过程是一步一步进行的，前一步的输出就是后一步的输入，所以我们也把这个过程叫做渲染管线（RenderPipelines）</li>
</ol>
<h3 id="_3-gpu简介" tabindex="-1"><a class="header-anchor" href="#_3-gpu简介" aria-hidden="true">#</a> [3]GPU简介</h3>
<p>处理图像应用，实际上就是在处理计算图片上的每一个像素点的颜色和其他信息。每处理一个像素点就相当于完成了一个简单的任务，而一个图片应用又是由成千上万个像素点组成的，所以，我们需要在同一时间处理成千上万个小任务。</p>
<p>而GPU便是根据这一原理设计为，使用更小、更多的处理单元，是一种更好的处理方式。</p>
<p><img src="https://img-blog.csdnimg.cn/4372e84490404f489dc3d0680cc18b37.png" alt="在这里插入图片描述"></p>
<p>GPU  是由大量的小型处理单元构成的，它可能远远没有 CPU 那么强大，但胜在数量众多，可以保证每个单元处理一个简单的任务。即使我们要处理一张 800 * 600 大小的图片，GPU 也可以保证这 48 万个像素点分别对应一个小单元，这样我们就可以同时对每个像素点进行计算了。</p>
</template>
