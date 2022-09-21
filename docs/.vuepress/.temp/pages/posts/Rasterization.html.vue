<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-屏幕">1.屏幕</RouterLink></li><li><RouterLink to="#_2-视口变换">2.视口变换</RouterLink></li><li><RouterLink to="#_3-三角形-基本形状图元">3.三角形 - 基本形状图元</RouterLink></li><li><RouterLink to="#_4-采样">4.采样</RouterLink></li><li><RouterLink to="#_5-锯齿-走样alising">5.锯齿/走样Alising</RouterLink></li><li><RouterLink to="#_6-frequency-domain-频域">6.Frequency Domain(频域)</RouterLink><ul><li><RouterLink to="#傅里叶级数展开">傅里叶级数展开</RouterLink></li><li><RouterLink to="#傅里叶变换">傅里叶变换</RouterLink></li></ul></li><li><RouterLink to="#_7-走样">7.走样</RouterLink></li><li><RouterLink to="#_8-filtering滤波">8.Filtering滤波</RouterLink><ul><li><RouterLink to="#高通滤波">高通滤波</RouterLink></li><li><RouterLink to="#低频滤波">低频滤波</RouterLink></li><li><RouterLink to="#中通滤波">中通滤波</RouterLink></li></ul></li><li><RouterLink to="#_9-卷积">9.卷积</RouterLink><ul><li><RouterLink to="#_1-简介">[1]简介</RouterLink><ul><li><RouterLink to="#离散卷积">离散卷积</RouterLink></li><li><RouterLink to="#连续情况的卷积">连续情况的卷积</RouterLink></li><li><RouterLink to="#结合滤波器进行理解">结合滤波器进行理解</RouterLink></li></ul></li><li><RouterLink to="#_2-卷积定理">[2]卷积定理</RouterLink></li><li><RouterLink to="#_1-超采样-msaa">[1]超采样(MSAA)</RouterLink></li><li><RouterLink to="#_2-sampling-repeating-frequency-contents">[2]Sampling=Repeating Frequency Contents</RouterLink></li></ul></li><li><RouterLink to="#_10-可见性-遮挡">10.可见性/遮挡</RouterLink><ul><li><RouterLink to="#_1-画家算法">[1]画家算法</RouterLink></li><li><RouterLink to="#_2-z-buffer">[2]Z-buffer</RouterLink><ul><li><RouterLink to="#z-buffer-实现原理">Z-Buffer 实现原理</RouterLink></li></ul></li></ul></li></ul></nav>
<h2 id="_1-屏幕" tabindex="-1"><a class="header-anchor" href="#_1-屏幕" aria-hidden="true">#</a> 1.屏幕</h2>
<p>当进行完 MVP 变换之后，所有需要绘制的点都变换到 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mopen">[</span><span class="mord">−</span><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">1</span><span class="mclose"><span class="mclose">]</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span></span></span></span></span></span></span></span> 的立方体空间中了，接下来，我们需要将图像画在<strong>屏幕</strong>上</p>
<p>下一步工作就是要把结果绘制到屏幕上，在这之前先了解一下什么是屏幕。</p>
<p>屏幕由一系列的像素(Pixel，是 Picture element 的缩写)排布形成，像素的数量由分辨率决定，如分辨率是 1920 x 1080 的屏幕，就包含了 1920 x 1080 个像素。</p>
<p>每个像素表示的颜色由红（red）、绿（green）、蓝（blue）三种颜色混合而成。</p>
<h2 id="_2-视口变换" tabindex="-1"><a class="header-anchor" href="#_2-视口变换" aria-hidden="true">#</a> 2.视口变换</h2>
<p><strong>屏幕空间</strong>：在屏幕上建立坐标系。左下角是原点(0,0)，向右是x轴正方向，向上是y轴正方向
<img src="https://img-blog.csdnimg.cn/e6f17298c2e543bf83600ecd5feb7bc3.png" alt="在这里插入图片描述"></p>
<ul>
<li>屏幕跨度为：$(0,0) $到 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">i</span><span class="mord mathnormal">d</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">h</span><span class="mord mathnormal">e</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">h</span><span class="mord mathnormal">t</span><span class="mclose">)</span></span></span></span></li>
<li>像素的索引形式：<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mclose">)</span></span></span></span>，<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">x</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span></span></span></span> 都是整数</li>
<li>像素的索引跨度：<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">0</span><span class="mclose">)</span></span></span></span> 到 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">i</span><span class="mord mathnormal">d</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">h</span><span class="mord mathnormal">e</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">h</span><span class="mord mathnormal">t</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span></span></span></span></li>
<li>由于像素的宽高都是 1，所以像素中心：<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8389em;vertical-align:-0.1944em;"></span><span class="mord">0.5</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">0.5</span><span class="mclose">)</span></span></span></span></li>
</ul>
<p>如上图的蓝色的像素的位置就是 (2,1)，</p>
<p>视口变换（将裁剪空间变换到屏幕空间）：把$ [−1,1]^2$ 变换成 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">[</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">i</span><span class="mord mathnormal">d</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mclose">]</span><span class="mord mathnormal">x</span><span class="mopen">[</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">h</span><span class="mord mathnormal">e</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">h</span><span class="mord mathnormal">t</span><span class="mclose">]</span></span></span></span> 的空间。只需要经过如下的步骤即可实现：</p>
<ol>
<li>对 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mopen">[</span><span class="mord">−</span><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">1</span><span class="mclose"><span class="mclose">]</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span> 进行一次缩放，铺满屏幕</li>
<li>平移空间，使空间的左下角位于原点坐标（缩放后的空间的左下角在$ (−width/2,−height/2)$）</li>
</ol>
<p>因此，这个变换就是：</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:4.9323em;vertical-align:-2.2162em;"></span><span class="minner"><span class="mopen"><span class="delimsizing mult"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:2.65em;"><span style="top:-1.711em;"><span class="pstrut" style="height:3.216em;"></span><span class="delimsizinginner delim-size4"><span>⎣</span></span></span><span style="top:-2.858em;"><span class="pstrut" style="height:3.216em;"></span><span style="height:1.216em;width:0.6667em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.6667em' height='1.216em' style='width:0.6667em' viewBox='0 0 666.67 1216' preserveAspectRatio='xMinYMin'><path d='M319 0 H403 V1216 H319z M319 0 H403 V1216 H319z'/></svg></span></span><span style="top:-4.7111em;"><span class="pstrut" style="height:3.216em;"></span><span class="delimsizinginner delim-size4"><span>⎡</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:2.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mtable"><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:2.7162em;"><span style="top:-4.8361em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8801em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02691em;">w</span><span class="mord mathnormal mtight">i</span><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight">t</span><span class="mord mathnormal mtight">h</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span><span style="top:-3.5438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mspace"> </span><span class="mord">0</span></span></span><span style="top:-2.3438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mspace"> </span><span class="mord">0</span></span></span><span style="top:-1.1438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mspace"> </span><span class="mord">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:2.2162em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:0.5em;"></span><span class="arraycolsep" style="width:0.5em;"></span><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:2.7162em;"><span style="top:-4.8361em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">0</span></span></span><span style="top:-3.5438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9322em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.4461em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">h</span><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight">i</span><span class="mord mathnormal mtight" style="margin-right:0.03588em;">g</span><span class="mord mathnormal mtight">h</span><span class="mord mathnormal mtight">t</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span><span style="top:-2.3438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">0</span></span></span><span style="top:-1.1438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:2.2162em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:0.5em;"></span><span class="arraycolsep" style="width:0.5em;"></span><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:2.7162em;"><span style="top:-4.8361em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">0</span></span></span><span style="top:-3.5438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">0</span></span></span><span style="top:-2.3438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span><span style="top:-1.1438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:2.2162em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:0.5em;"></span><span class="arraycolsep" style="width:0.5em;"></span><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:2.7162em;"><span style="top:-4.8361em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8801em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02691em;">w</span><span class="mord mathnormal mtight">i</span><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight">t</span><span class="mord mathnormal mtight">h</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span><span style="top:-3.5438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9322em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.4461em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">h</span><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight">i</span><span class="mord mathnormal mtight" style="margin-right:0.03588em;">g</span><span class="mord mathnormal mtight">h</span><span class="mord mathnormal mtight">t</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span><span style="top:-2.3438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">0</span></span></span><span style="top:-1.1438em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:2.2162em;"><span></span></span></span></span></span></span></span><span class="mclose"><span class="delimsizing mult"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:2.65em;"><span style="top:-1.711em;"><span class="pstrut" style="height:3.216em;"></span><span class="delimsizinginner delim-size4"><span>⎦</span></span></span><span style="top:-2.858em;"><span class="pstrut" style="height:3.216em;"></span><span style="height:1.216em;width:0.6667em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.6667em' height='1.216em' style='width:0.6667em' viewBox='0 0 666.67 1216' preserveAspectRatio='xMinYMin'><path d='M263 0 H347 V1216 H263z M263 0 H347 V1216 H263z'/></svg></span></span><span style="top:-4.7111em;"><span class="pstrut" style="height:3.216em;"></span><span class="delimsizinginner delim-size4"><span>⎤</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:2.15em;"><span></span></span></span></span></span></span></span></span></span></span></span></p>
<h2 id="_3-三角形-基本形状图元" tabindex="-1"><a class="header-anchor" href="#_3-三角形-基本形状图元" aria-hidden="true">#</a> 3.三角形 - 基本形状图元</h2>
<p>三角形在图形学中应用非常广泛，相比其他图形，它拥有如下性质：</p>
<ul>
<li>复杂图形都能通过三角形组合来表示</li>
<li>在空间中的任意三角形的三个顶点都在同一个平面内</li>
<li>能很清晰的定义出三角形的内部和外部</li>
<li>很容易计算出一个点是位于三角形内部还是外部（通过叉乘）</li>
<li>只要定义出三角形的三个顶点的属性，那三角形内部的任意一点都能通过插值的方式计算出对应的属性（通过重心坐标进行插值）</li>
</ul>
<p>光栅化过程</p>
<p><img src="https://img-blog.csdnimg.cn/b3d8ab5364f042ccb11ce7e37bfe6bda.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>当我们知道了三角形三个顶点的坐标之后，下一步就是决定哪些像素应该被填充了</p>
<p>三角形内部大部分像素都是被覆盖了的，但边缘位置的像素只是覆盖了一部分，那么应该怎么填充呢</p>
<p>这就是在光栅化中最重要的概念：<strong>判断一个像素和三角形的位置关系，更确切来说，是判断一个像素中心点与三角形的位置关系。</strong></p>
</blockquote>
<h2 id="_4-采样" tabindex="-1"><a class="header-anchor" href="#_4-采样" aria-hidden="true">#</a> 4.采样</h2>
<p>光栅化的过程就是在屏幕空间使用一系列离散的点（像素的中心）判断其是否在三角形内的判断函数的采样。</p>
<p>我们可以通过采样的方式来判断是否应该填充像素。首先要介绍下什么是采样：</p>
<p>简单来说就是：给定一个连续函数 f(x)，然后通过一系列的参数如 1、2、3不断代入 f(x)，求出 f(1),f(2),f(3)，这样我们就得到了三个离散的点。这个过程就是在采样了，转换成代码就是：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> x <span class="token operator">&lt;</span> xmax<span class="token punctuation">;</span> <span class="token operator">++</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    output<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>类似的，我们可以通过像素中心对屏幕空间进行采样，判断该像素中心是否被三角形覆盖，以此来判断该像素应不应该被填充。</p>
<p><img src="https://img-blog.csdnimg.cn/cb2dcb6be98e4372871590c3a905848b.png" alt="在这里插入图片描述"></p>
<p>如上图所示的三角形，我们给出一个采样函数：</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">in</span><span class="mord mathnormal">s</span><span class="mord mathnormal">i</span><span class="mord mathnormal">d</span><span class="mord mathnormal">e</span><span class="mopen">(</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mord mathnormal">ian</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">e</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">x</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span></span><span class="base"><span class="strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="mtable"><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.45em;"><span style="top:-3.45em;"><span class="pstrut" style="height:3.45em;"></span><span class="mord"><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">{</span></span><span class="mord"><span class="mtable"><span class="arraycolsep" style="width:0.5em;"></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.45em;"><span style="top:-3.61em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord cjk_fallback">当像素中心位于三角形内部时</span></span></span><span style="top:-2.41em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord cjk_fallback">否则</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.95em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:0.5em;"></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.95em;"><span></span></span></span></span></span></span><span class="tag"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.45em;"><span style="top:-3.45em;"><span class="pstrut" style="height:3.45em;"></span><span class="eqn-num"></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.95em;"><span></span></span></span></span></span></span></span></span></span></p>
<p>如何判断像素中心是否位于三角形内部呢？之前提到过可以利用叉乘的结果来判断，我们来回忆一下</p>
<p><img src="https://img-blog.csdnimg.cn/1cfacb32651d405e919e34e057417d32.png" alt="在这里插入图片描述"></p>
<p>假设三角形的三个顶点分别是 ，，P0，P1，P2，并且三角形是以逆时针的顺序进行绘制的。那么我们可以求出：</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1163em;vertical-align:-0.15em;"></span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1608em;vertical-align:-0.1944em;"></span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord mathnormal">Q</span></span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:1.1163em;vertical-align:-0.15em;"></span><span class="mspace"> </span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1608em;vertical-align:-0.1944em;"></span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord mathnormal">Q</span></span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:1.1163em;vertical-align:-0.15em;"></span><span class="mspace"> </span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1608em;vertical-align:-0.1944em;"></span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord mathnormal">Q</span></span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:0em;"></span><span class="mspace"> </span></span></span></span></span></p>
<p>根据右手螺旋定则，当得到的三个向量同时为朝外或者同时朝内时，该点会位于三角形内部。</p>
<p>有了采样函数后，我们再对每个像素进行一次采样：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> x <span class="token operator">&lt;</span> width<span class="token punctuation">;</span> <span class="token operator">++</span>x<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> y <span class="token operator">&lt;</span> height<span class="token punctuation">;</span> <span class="token operator">++</span>y<span class="token punctuation">)</span>
        image<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">[</span>y<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">inside</span><span class="token punctuation">(</span>triangle<span class="token punctuation">,</span> x <span class="token operator">+</span> <span class="token number">0.5</span><span class="token punctuation">,</span> y <span class="token operator">+</span> <span class="token number">0.5</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>然而，如果对每个三角形都进行全屏幕采样的话，性能就非常浪费了。</p>
<p>实际上，我们只需要对三角形所在的轴向包围盒子（Axis Align Bounding Box，简称 AABB）覆盖的范围进行采样即可</p>
<p><img src="https://img-blog.csdnimg.cn/6b4e980cef22409197d0d95f8c959c6a.png" alt="在这里插入图片描述"></p>
<p>但在极端情况下，例如三角形进行过旋转，或者三角形非常扁，AABB 就会偏大，采样时也会造成浪费。</p>
<p>采样完成后，然后我们就能得到如下的结果：</p>
<p><img src="https://img-blog.csdnimg.cn/282135aea33a486d89b71e00cb15a08f.png" alt="在这里插入图片描述"></p>
<p>最后，我们对像素进行填充：</p>
<p><img src="https://img-blog.csdnimg.cn/6c5f1cb11c09436a894eec669adc48b2.png" alt="在这里插入图片描述"></p>
<h2 id="_5-锯齿-走样alising" tabindex="-1"><a class="header-anchor" href="#_5-锯齿-走样alising" aria-hidden="true">#</a> 5.锯齿/走样Alising</h2>
<p>采样在计算机图形学中无处不在，同时采样又会产生一系列的问题（Artifacts）</p>
<p>采样过程中产生的一系列问题Artifacts也称为“Aliasing（走样）”</p>
<ul>
<li>Jaggies（锯齿） – sampling in space</li>
<li>Moire（摩尔纹） – undersampling images</li>
<li>Wagon wheel effect（车轮的效应） – sampling in time</li>
<li>[Many more] …</li>
</ul>
<blockquote>
<p>采样产生Artifacts原因：</p>
<ul>
<li>信号变化太快（高频），但采样太慢（采样的速度跟不上信号变化的速度）</li>
</ul>
</blockquote>
<p>**抗锯齿理念：**先对信号做模糊（预过滤）之后采样（近视眼处理）</p>
<p><img src="https://img-blog.csdnimg.cn/fd33e0fccdf94268b066c2aa13ee74f9.png" alt="在这里插入图片描述">
<img src="https://img-blog.csdnimg.cn/f12c3e83ecb84b66ac0be10e57d4552e.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>注意光栅化三角形中的抗锯齿边缘其中像素值取中间值</p>
</blockquote>
<p><img src="https://img-blog.csdnimg.cn/9cd6b690571e406499296bece0048a1b.png" alt="在这里插入图片描述"></p>
<h2 id="_6-frequency-domain-频域" tabindex="-1"><a class="header-anchor" href="#_6-frequency-domain-频域" aria-hidden="true">#</a> 6.Frequency Domain(频域)</h2>
<p>那为什么先进行模糊再采样就能达到抗锯齿的效果呢？下面将逐步解析</p>
<p>对于一个连续的函数（信号），我们是通过采样来「还原」原来的函数（信号）的。</p>
<h3 id="傅里叶级数展开" tabindex="-1"><a class="header-anchor" href="#傅里叶级数展开" aria-hidden="true">#</a> 傅里叶级数展开</h3>
<p><strong>傅里叶级数展开</strong>：任何一个周期函数都可以把它写成一系列正弦和余弦函数的线性组合以及一个常数项</p>
<p><img src="https://img-blog.csdnimg.cn/374ae876bcb74f218dc0bced01c95e4a.png" alt="在这里插入图片描述"></p>
<h3 id="傅里叶变换" tabindex="-1"><a class="header-anchor" href="#傅里叶变换" aria-hidden="true">#</a> 傅里叶变换</h3>
<p><strong>傅里叶变换</strong>：（<em>时域—&gt;频域</em>）将函数表示为正弦加权和和余弦</p>
<p><img src="https://img-blog.csdnimg.cn/ca5849a2eb424f2992df7a7668c5a0c2.png" alt="在这里插入图片描述"></p>
<p>示例：</p>
<p><img src="https://img-blog.csdnimg.cn/74b3de982b2c4003af34f3b0ad6e615d.png" alt="在这里插入图片描述"></p>
<blockquote>
<ul>
<li>上面五个f(x)函数频率从低到高，然后使用完全相同的采样方法来对其采样，然后将采样点连起来用于恢复采样点</li>
<li>采样与函数的频率相关性是很大的，通过对上面示例的观察可以发现
<ul>
<li>频率越低的函数，采样后的连线与原函数差异越小</li>
<li>频率越高的函数，采样后的连线与原函数差异越大</li>
</ul>
</li>
<li>人眼采样的频率是有限的，当人眼观察的东西高速运动，人眼的采样率跟不上物体的变化速度，看车轮时出现倒转就是根据这个原理</li>
</ul>
</blockquote>
<h2 id="_7-走样" tabindex="-1"><a class="header-anchor" href="#_7-走样" aria-hidden="true">#</a> 7.<strong>走样</strong></h2>
<ul>
<li>
<p>高频信号采样不足：样本错误地看起来来自低频信号（例如下图对高频信号采样采样出来的结果像来自于低频信号）</p>
</li>
<li>
<p>在给定采样率下无法区分的两个频率称为“走样”（例如使用相同的采样率去采样两种完全不同的频率，却得到完全相同的结果）</p>
</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/705384809a704be69fcdecdf3d985613.png" alt="在这里插入图片描述"></p>
<h2 id="_8-filtering滤波" tabindex="-1"><a class="header-anchor" href="#_8-filtering滤波" aria-hidden="true">#</a> 8.Filtering滤波</h2>
<p>Filtering滤波=去掉一系列的频率</p>
<p><img src="https://img-blog.csdnimg.cn/25cf4d1e5cb7440698ba15c1d97f461e.png" alt="在这里插入图片描述"></p>
<blockquote>
<ul>
<li>
<p>这里的时域有时也成为空间域</p>
</li>
<li>
<p>右边频域图中的中心为最低频的区域，周围为高频，从中心到周围逐渐增高</p>
</li>
<li>
<p>图像的频率是表征图像中灰度变化剧烈程度的指标</p>
</li>
<li>
<p>图片就是每个点都在发光的点的阵列，那么每个点的管就是一束波，不同点的光不一样，频率当然也不一样，滤波就是滤去有些频率的光</p>
</li>
</ul>
</blockquote>
<h3 id="高通滤波" tabindex="-1"><a class="header-anchor" href="#高通滤波" aria-hidden="true">#</a> 高通滤波</h3>
<p><img src="https://img-blog.csdnimg.cn/766e48a3261a4d31af4a6594efc33acc.png" alt="在这里插入图片描述"></p>
<blockquote>
<ul>
<li>在频域空间中将低频的信号抹掉，只剩下高频的东西，然后使用逆傅里叶变换将其变回去就变成了上面的样（只表示了图像的边界：边缘检测）</li>
<li>因为边界的灰度值变化很大，所以就是高频，所以就能通过！</li>
<li>将低频的信息抹掉之后变称为<strong>高通滤波</strong>（只有高频信号可以通过）</li>
</ul>
</blockquote>
<h3 id="低频滤波" tabindex="-1"><a class="header-anchor" href="#低频滤波" aria-hidden="true">#</a> 低频滤波</h3>
<p>模糊省掉了边界，剩余低频信息</p>
<p><img src="https://img-blog.csdnimg.cn/b07171319de9497784e0726f2478c90c.png" alt="在这里插入图片描述"></p>
<blockquote>
<ul>
<li>在频域空间中将高频的信号抹掉，只剩下低频的东西</li>
</ul>
</blockquote>
<h3 id="中通滤波" tabindex="-1"><a class="header-anchor" href="#中通滤波" aria-hidden="true">#</a> 中通滤波</h3>
<p><img src="https://img-blog.csdnimg.cn/d67e1677ee414808ac1d732693a0533f.png" alt="在这里插入图片描述"></p>
<blockquote>
<ul>
<li>等高线原理</li>
<li>提取到了不是那么明显的边界特征</li>
</ul>
</blockquote>
<h2 id="_9-卷积" tabindex="-1"><a class="header-anchor" href="#_9-卷积" aria-hidden="true">#</a> 9.卷积</h2>
<h3 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> [1]简介</h3>
<p><strong>卷积</strong>（又称<strong>叠积</strong>（convolution）、<strong>褶积</strong>或<strong>旋积</strong>），是透过两个函数 <em>f</em> 和 <em>g</em> 生成第三个函数的一种数学算子，表征函数 <em>f</em> 与经过翻转和平移的 <em>g</em> 的乘积函数所围成的曲边梯形的面积。</p>
<blockquote>
<p>卷：对<em>g</em>函数进行从左到右的数轴翻转</p>
<p>积：把g函数平移到n，并在这个位置对两个函数进行点乘</p>
</blockquote>
<p>概率论中卷积的定义</p>
<p><img src="https://img-blog.csdnimg.cn/40b669b10ace4eac8db8484da0b9a1ed.png" alt="在这里插入图片描述"></p>
<h4 id="离散卷积" tabindex="-1"><a class="header-anchor" href="#离散卷积" aria-hidden="true">#</a> 离散卷积</h4>
<p><img src="https://img-blog.csdnimg.cn/c8ae52fc88dc4aaa9c6da4a9c2e4456b.png" alt="在这里插入图片描述"></p>
<p><img src="https://img-blog.csdnimg.cn/af453ea27c1d42e099a0061986c17d90.png" alt="在这里插入图片描述"></p>
<p>z=30~z=40的卷积的过程</p>
<p><img src="https://img-blog.csdnimg.cn/4cd5b2d9d33e44aeb38d542055c781f1.gif" alt="在这里插入图片描述"></p>
<p>将p1旋转</p>
<p><img src="https://img-blog.csdnimg.cn/0d8f3d91a5354a2fb31d208436a2ef0f.gif" alt="在这里插入图片描述"></p>
<p>旋转后的卷积过程</p>
<p><img src="https://img-blog.csdnimg.cn/1d4a3aaa7cbf47978b81ae756e9c8bf7.gif" alt="在这里插入图片描述"></p>
<blockquote>
<p>上述的过程总结位：卷——&gt;平移——&gt;求和</p>
</blockquote>
<p>另一种表现形式</p>
<p><img src="https://img-blog.csdnimg.cn/40d070840f41449f81bb719b11cd75b2.png" alt="在这里插入图片描述"></p>
<h4 id="连续情况的卷积" tabindex="-1"><a class="header-anchor" href="#连续情况的卷积" aria-hidden="true">#</a> 连续情况的卷积</h4>
<p><img src="https://img-blog.csdnimg.cn/03f7b68cd26b4a6ca715f6e5b5bdab9e.png" alt="在这里插入图片描述">
<img src="https://img-blog.csdnimg.cn/3eee007f1a854855b0c85b4a7fa31e49.png" alt="在这里插入图片描述"></p>
<p>t=9~t=100卷积的过程</p>
<p><img src="https://img-blog.csdnimg.cn/57137541311c4b5bac69857599111f35.gif" alt="在这里插入图片描述"></p>
<blockquote>
<p>同样可以对其进行像离散情况进行旋转后卷积</p>
</blockquote>
<h4 id="结合滤波器进行理解" tabindex="-1"><a class="header-anchor" href="#结合滤波器进行理解" aria-hidden="true">#</a> 结合滤波器进行理解</h4>
<ul>
<li>卷积计算在频域上的平均操作</li>
<li>Filtering = Convolution卷积  (= Averaging平均)</li>
<li>卷积操作是把滤波器（或窗口）沿着信号移动</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/2885166f17fc42439bfd2a76ac6f70aa.png" alt="在这里插入图片描述"></p>
<p><img src="https://img-blog.csdnimg.cn/14c7c18ee77c4628904ca90e63d494f5.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>其原理就是求平均，在它周围的任何三个数中求平均</p>
</blockquote>
<h3 id="_2-卷积定理" tabindex="-1"><a class="header-anchor" href="#_2-卷积定理" aria-hidden="true">#</a> [2]<strong>卷积定理</strong></h3>
<p>空间域/时域的卷积等于频域的乘积，反之亦然</p>
<p>对图片的进行处理的方法：</p>
<p>Option 1:</p>
<ul>
<li>在空间域中直接通过卷积过滤</li>
</ul>
<p>Option 2:</p>
<ul>
<li>变换到频域（傅里叶变换）</li>
<li>乘以卷积核的傅里叶变换</li>
<li>变换回空间域（逆傅里叶）</li>
</ul>
<p>应用举例：</p>
<p>均值模糊/滤波(每个像素取其周围3x3，然后使用滤波器/卷积核，整体操作叫卷积)</p>
<p><img src="https://img-blog.csdnimg.cn/1784a89b401a4a3781d39c82b7aa93f0.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>时域的卷积=频域的乘积</p>
</blockquote>
<p>11.Antialising(反走样)</p>
<p>如何抗锯齿？</p>
<p>Option 1: 提高采样率 （例如：提高屏幕分辨率）</p>
<ul>
<li>本质上增加了傅里叶域中副本之间的距离</li>
<li>更高分辨率的显示器、传感器、帧缓冲器……</li>
<li>代价高</li>
</ul>
<p>Option 2: Antialiasing（反走样）</p>
<p>• Making Fourier contents “narrower” before repeating  （先做模糊/低通滤波）</p>
<p>• i.e. Filtering out high frequencies before sampling（后采样）</p>
<p><img src="https://img-blog.csdnimg.cn/8718e1fc883446da9381b117752032a5.png" alt="在这里插入图片描述"></p>
<p>对于同一个像素，我们知道它原来有多少地方被覆盖了，这时候如果可以先算出覆盖比例，那么我们就可以根据这个比例对像素进行填充了。</p>
<p><img src="https://img-blog.csdnimg.cn/c59b2be0b3a14230ac55684230c118fc.png" alt="在这里插入图片描述"></p>
<p>如上图所示：我们可以用肉眼看出四个像素分别被覆盖了 12.5%、50%、87.5%、100%，但屏幕在填充像素是不能只填充一部分的，只能填充一整个像素。因此这时候可以对该像素进行一次平均，最后得到像素的颜色。</p>
<blockquote>
<p>进过低通滤波处理过的像素可以理解为灰度值（覆盖度）</p>
</blockquote>
<h3 id="_1-超采样-msaa" tabindex="-1"><a class="header-anchor" href="#_1-超采样-msaa" aria-hidden="true">#</a> [1]超采样(MSAA)</h3>
<p>事实上，上面的计算像素覆盖面积的做法是很难实现的。但我们可以通过超采样的方式来模拟。</p>
<p>所谓的超采样，是指在一个像素里面放多个采样点来检测三角形是否有被覆盖。</p>
<p><img src="https://img-blog.csdnimg.cn/7a168614a6c84404b637abf70729bf0d.png" alt="在这里插入图片描述"></p>
<p>上图表示一个像素里面包含了 16 个采样点，每个采样点采样后再把结果平均起来，最后就能得到三角形对该像素覆盖程度的<strong>近似值</strong>。</p>
<p>如果想要更准确的近似值的话，可以用更多的采样点，但这样计算量就会更大了。</p>
<p>接下来看看实际例子：
<img src="https://img-blog.csdnimg.cn/a240c7d1267144dfa083d4866e9459d5.png" alt="在这里插入图片描述"></p>
<p>上图中一个像素里面只有一个采样点。</p>
<p>超采样的第一步是要为每个像素增加采样点（2x2）：
<img src="https://img-blog.csdnimg.cn/3c740be5a0104eaa9a956ec8e4b644c3.png" alt="在这里插入图片描述"></p>
<p>接下来是对每个像素中的所有采样点的结果进行平均：</p>
<p><img src="https://img-blog.csdnimg.cn/8e760998db3445fb8a51339cba062a64.png" alt="在这里插入图片描述"></p>
<p>最后就能得到平均后的结果：</p>
<p><img src="https://img-blog.csdnimg.cn/da5f45f9b8a64e28be58941c747854a9.png" alt="在这里插入图片描述"></p>
<p>对于 MSAA，我们需要知道如下几点：</p>
<ul>
<li>MSAA 是抗锯齿操作的第一步，也就是模糊操作（求平均）。</li>
<li>MSAA 增加采样点，并不是为了提高采样率（分辨率没有提高），而是为了得到一个更合理的三角形覆盖率。</li>
<li>MSAA 的代价是计算量大增，如果一个像素里面有4个采样点，那么计算量就大了 4 倍；如果一个像素里面有 16 个采样点，那么计算量就大了 16 倍。（事实上，工业界会会复用、优化这些采样点，因此计算量并没有增加太多）。</li>
</ul>
<h3 id="_2-sampling-repeating-frequency-contents" tabindex="-1"><a class="header-anchor" href="#_2-sampling-repeating-frequency-contents" aria-hidden="true">#</a> [2]Sampling=Repeating Frequency Contents</h3>
<p><img src="https://img-blog.csdnimg.cn/fc9a066921f74f9db0afbee300beffb3.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>左一列的中间是一个周期冲激序列，它在<code>t=nT</code>上纵坐标位无穷大，且频域（右中）仍是一个冲激序列，若用其与原信号相乘进行采样，采样的过程不就是让左边上中两图简单相乘就行了</p>
</blockquote>
<p><img src="https://img-blog.csdnimg.cn/b6fc290563934d999f455be2631e2eea.png" alt="在这里插入图片描述"></p>
<h2 id="_10-可见性-遮挡" tabindex="-1"><a class="header-anchor" href="#_10-可见性-遮挡" aria-hidden="true">#</a> 10.可见性/遮挡</h2>
<p>当我们要在屏幕上绘制物体的时候，会涉及到物体与物体间的遮挡问题。对于这一问题最常见的做法是像画家绘画那样，先绘制远处的物体，再绘制近处的物体。</p>
<p>但是，这样绘同样会产生一些问题，例如下面三个物体互相遮挡
<img src="https://img-blog.csdnimg.cn/2ea2a33ac02f47589cb3da1febb9eef5.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>这类图使用画家算法是无法实现的</p>
</blockquote>
<h3 id="_1-画家算法" tabindex="-1"><a class="header-anchor" href="#_1-画家算法" aria-hidden="true">#</a> [1]画家算法</h3>
<p>受画家如何从后到前绘制 Paint 的启发，在帧缓冲区中覆盖，从远处开始画（光栅化），然后到近处（光栅化）的。
<img src="https://img-blog.csdnimg.cn/7baad2a123134dbb86ffbaa3d67a5dff.png" alt="在这里插入图片描述"></p>
<h3 id="_2-z-buffer" tabindex="-1"><a class="header-anchor" href="#_2-z-buffer" aria-hidden="true">#</a> [2]Z-buffer</h3>
<p>所以我们在图形学中引入了一个新的概念<strong>深度缓存（Z-Buffer）</strong>，我们通过分析单个像素的深度关系来表示，在<strong>一个像素上永远只保存较近深度的信息</strong>，一般我们会在渲染最后结果的时候会得到两张图，一个是我们想要的图，另一张是记录了这张图中每个像素的最小深度，我们把它称为深度图。</p>
<p>对每个像素进行排序，而不是像画家算法按图形来排序</p>
<p><img src="https://img-blog.csdnimg.cn/b9298213b71946ebbd95d9bd1ef8ca58.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>深度缓冲用来记录每个像素的最小深度</p>
</blockquote>
<h4 id="z-buffer-实现原理" tabindex="-1"><a class="header-anchor" href="#z-buffer-实现原理" aria-hidden="true">#</a> Z-Buffer 实现原理</h4>
<p><img src="https://img-blog.csdnimg.cn/6806a3e6bb424ff78c85dbd3552f3831.png" alt="在这里插入图片描述"></p>
<p>示例
<img src="https://img-blog.csdnimg.cn/39b2260c2efd49adb5751360486ddd4f.png" alt="在这里插入图片描述"></p>
<p>对于 n 个三角形，要得到某个像素的最小深度值，我们只需要遍历所有三角形即可，因此其复杂度为 O(n)。</p>
<p>深度缓冲还有以下的好处：</p>
<ol>
<li>绘制三角形的顺序不影响最终结果</li>
<li>所有 GPU 都支持深度测试</li>
</ol>
<blockquote>
<p>注意：<strong>深度缓冲并不能处理透明物体</strong></p>
</blockquote>
</template>
