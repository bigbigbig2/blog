<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-相机">1.相机</RouterLink><ul><li><RouterLink to="#_1-pinholes-camera针孔相机">[1]Pinholes Camera针孔相机</RouterLink></li><li><RouterLink to="#_2-快门与传感器">[2]快门与传感器</RouterLink></li><li><RouterLink to="#_3-field-of-view-fov-视场">[3]Field of View (FOV)视场</RouterLink><ul><li><RouterLink to="#focal-length焦距对视场的影响">Focal Length焦距对视场的影响</RouterLink></li><li><RouterLink to="#传感器对视场的影响">传感器对视场的影响</RouterLink></li><li><RouterLink to="#在较小的传感器上保持fov">在较小的传感器上保持FOV</RouterLink></li></ul></li><li><RouterLink to="#_4-exposure曝光">[4]Exposure曝光</RouterLink><ul><li><RouterLink to="#摄影中的暴光控制">摄影中的暴光控制</RouterLink></li><li><RouterLink to="#快与慢摄影">快与慢摄影</RouterLink></li></ul></li></ul></li><li><RouterLink to="#_2-thin-lens-approximation-薄透镜近似">2.Thin Lens Approximation(薄透镜近似)</RouterLink><ul><li><RouterLink to="#_1-理想的薄镜头-焦点">[1]理想的薄镜头 - 焦点</RouterLink><ul><li><RouterLink to="#薄镜头方程">薄镜头方程</RouterLink></li></ul></li><li><RouterLink to="#_2-defocus-blur-散焦模糊">[2]Defocus Blur(散焦模糊)</RouterLink></li><li><RouterLink to="#_3-光圈f数">[3]光圈F数</RouterLink></li></ul></li><li><RouterLink to="#_3-光线追踪中使用理想透镜">3.光线追踪中使用理想透镜</RouterLink></li><li><RouterLink to="#_4-depth-of-field景深">4.Depth of Field景深</RouterLink></li><li><RouterLink to="#_5-light-field-lumigraph光场">5.Light Field / Lumigraph光场</RouterLink><ul><li><RouterLink to="#_1-the-plenoptic-function全光函数">[1]The Plenoptic Function全光函数</RouterLink></li><li><RouterLink to="#_2-光场">[2]光场</RouterLink></li><li><RouterLink to="#_3-光场相机">[3]光场相机</RouterLink></li></ul></li></ul></nav>
<p>回顾之前，计算机图形学有两种成像的方法：</p>
<ul>
<li>光栅化成像</li>
<li>光线追踪成像</li>
</ul>
<p>这两种成像方法都是Synthesis合成的，不是自然界中存在的，下面再介绍一种成像方式Capture方式</p>
<p>Imaging = Synthesis + Capture</p>
<h2 id="_1-相机" tabindex="-1"><a class="header-anchor" href="#_1-相机" aria-hidden="true">#</a> 1.相机</h2>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8fdc430585d43a2908e2d6c3874aa6f~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_1-pinholes-camera针孔相机" tabindex="-1"><a class="header-anchor" href="#_1-pinholes-camera针孔相机" aria-hidden="true">#</a> [1]Pinholes Camera针孔相机</h3>
<ul>
<li>利用小孔成像原理制作的相机叫针孔相机。针孔相机无法拍出东西的深度，任何地方都是清楚的，不会有虚化</li>
<li>之前做光线追踪基于针孔相机模型，所以得不到因为深度不同产生的模糊效果</li>
<li>因此在渲染过程中如果模拟光线与棱镜透镜的作用，可以得到模糊虚化的效果</li>
<li>所以后来的相机一般采用带棱镜的</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a179993f92dd4bb28695360a5d12b916~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_2-快门与传感器" tabindex="-1"><a class="header-anchor" href="#_2-快门与传感器" aria-hidden="true">#</a> [2]快门与传感器</h3>
<ul>
<li>Shutter快门控制光进入相机</li>
<li>sensor传感器在曝光过程中记录Irradiance辐照度</li>
<li>如果一个相机没有棱镜或针孔，感光元件上任何一个点都可能收集来自不同方向的光，且传感器不会区分，因此得不到真实的照片</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6029441d5de480f8643aeb7ddf6ef21~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_3-field-of-view-fov-视场" tabindex="-1"><a class="header-anchor" href="#_3-field-of-view-fov-视场" aria-hidden="true">#</a> [3]Field of View (FOV)视场</h3>
<p>视场：能看到的范围</p>
<h4 id="focal-length焦距对视场的影响" tabindex="-1"><a class="header-anchor" href="#focal-length焦距对视场的影响" aria-hidden="true">#</a> <strong>Focal Length焦距对视场的影响</strong></h4>
<p>对于一个固定的传感器尺寸，减少焦距增加视场
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84dff5ea337b4be190f230facf50a369~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">FO</span><span class="mord mathnormal" style="margin-right:0.22222em;">V</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.2519em;vertical-align:-0.8804em;"></span><span class="mord">2</span><span class="mord mathnormal">a</span><span class="mord mathnormal">rc</span><span class="mord mathnormal">t</span><span class="mord mathnormal">an</span><span class="mopen">(</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">h</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8804em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">)</span></span></span></span></span></p>
<p>也就是说视场与传感器大小、焦距有关，那么在定义视场时通常会不容易，那么在市场中人们通常就将传感器大小规定为</p>
<p>35mm胶片(36x24毫米)，这样就方便从焦距的大小来旋转视场的大小：</p>
<ul>
<li>17mm is wide angle 104° （广角）</li>
<li>50mm is a “normal” lens 47°</li>
<li>200mm is telephoto lens 12° （远摄镜头）</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8178cde6cf054743a2088dfd306cb062~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="传感器对视场的影响" tabindex="-1"><a class="header-anchor" href="#传感器对视场的影响" aria-hidden="true">#</a> 传感器对视场的影响</h4>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ccbb826cb1a4a4997779f3b0d6e2652~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="在较小的传感器上保持fov" tabindex="-1"><a class="header-anchor" href="#在较小的传感器上保持fov" aria-hidden="true">#</a> 在较小的传感器上保持FOV</h4>
<p>为了保持视场，按照传感器的宽度/高度的比例减小镜头的焦距</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36e1aea54a544509b509bba9382e9d6f~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_4-exposure曝光" tabindex="-1"><a class="header-anchor" href="#_4-exposure曝光" aria-hidden="true">#</a> [4]Exposure曝光</h3>
<ul>
<li>H = T x E</li>
<li>Exposure = time x irradiance</li>
<li>Exposure time (T)
<ul>
<li>Controlled by shutter(快门)，控制有多长时间光可以持续进来</li>
</ul>
</li>
<li>Irradiance (E)
<ul>
<li>Power of light falling on a unit area of sensor</li>
<li>Controlled by lens aperture(镜头光圈) and focal length(焦距)</li>
</ul>
</li>
</ul>
<h4 id="摄影中的暴光控制" tabindex="-1"><a class="header-anchor" href="#摄影中的暴光控制" aria-hidden="true">#</a> 摄影中的暴光控制</h4>
<ul>
<li>
<p>Aperture size (光圈大小)</p>
<ul>
<li>Change the <strong>f-stop</strong> by opening / closing the aperture (if camera has iris control)类似于瞳孔缩放原理</li>
</ul>
</li>
<li>
<p>Shutter speed快门速度</p>
<ul>
<li>改变传感器像素集成光的持续时间</li>
</ul>
</li>
<li>
<p>ISO gain (感光度）</p>
<ul>
<li>更改传感器值和数字图像值之间的放大(模拟和/或数字)，可以发生在硬件上（简单理解：最后接收到多少能量，任何将这个能量乘一个数而已）</li>
</ul>
</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/690481e4d76b4838aaceb108342655c0~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>在后期使用ISO来调整图片亮度，调节的同时也会将它的噪声放大。</p>
<p>摄影师必须权衡景深(?)和运动模糊的移动对象</p>
<h4 id="快与慢摄影" tabindex="-1"><a class="header-anchor" href="#快与慢摄影" aria-hidden="true">#</a> 快与慢摄影</h4>
<p><strong>高速摄影</strong></p>
<p>普通曝光 = 极快的快门速度 x (大光圈和/或高 ISO)
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcf81e410cca482887fffcf32f0fb875~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>低速摄影</p>
<p>Long-Exposure Photography（长的曝光时间，延时摄影）：
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/838d8bbd16034ce6babae1b215b0c91a~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h2 id="_2-thin-lens-approximation-薄透镜近似" tabindex="-1"><a class="header-anchor" href="#_2-thin-lens-approximation-薄透镜近似" aria-hidden="true">#</a> 2.Thin Lens Approximation(薄透镜近似)</h2>
<p>通常入门不会使用单个棱镜来做相机成像，而是使用多个棱镜组成的棱镜来做成像</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00e2ce3cb43d4371b7de5fe858820c1b~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>实际的棱镜并不是我们通常想的可以将光聚集到某一点的那样简单的棱镜，下面先不按这种进行学习，想探索理想的情况下的棱镜</p>
<h3 id="_1-理想的薄镜头-焦点" tabindex="-1"><a class="header-anchor" href="#_1-理想的薄镜头-焦点" aria-hidden="true">#</a> [1]理想的薄镜头 - 焦点</h3>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/917c2606041c4706874be8ee2639c175~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<ul>
<li>所有进入透镜的平行光线都通过透镜的焦点</li>
<li>通过镜头后，所有穿过焦点的光线都将平行</li>
<li>在现实中焦距可以任意改变</li>
</ul>
<h4 id="薄镜头方程" tabindex="-1"><a class="header-anchor" href="#薄镜头方程" aria-hidden="true">#</a> 薄镜头方程</h4>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/729dd9a2910a43e8a32b776a584967f4~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:2.2019em;vertical-align:-0.8804em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10764em;">f</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8804em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1574em;vertical-align:-0.836em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:2.1574em;vertical-align:-0.836em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<ul>
<li><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5806em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>：物距</li>
<li><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5806em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>：像距</li>
<li><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span></span></span></span>：焦距</li>
</ul>
<p>薄镜头方程推导过程：（相似三角形）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6933c2b25874f73ae48c9b1c7bbe82e~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_2-defocus-blur-散焦模糊" tabindex="-1"><a class="header-anchor" href="#_2-defocus-blur-散焦模糊" aria-hidden="true">#</a> [2]Defocus Blur(散焦模糊)</h3>
<ul>
<li>为了解释景深，引入Circle of Confusion (CoC)</li>
<li>左边有一个Focal Plane，其上的东西会成像到Sensor Plane上；Object不在Focal Plane上，可能会聚焦在Image上，然后光线继续传播到Sensor Plane上，这时候在Sensor Plane上形成的圆就是CoC。</li>
<li>CoC的大小与光圈大小成正比。</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b53ca4f029f402da825fa8c3e0cd4bf~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>由CoC得知，看到的东西是否模糊，取决于光圈的大小，大光圈容易有模糊的效果</p>
<h3 id="_3-光圈f数" tabindex="-1"><a class="header-anchor" href="#_3-光圈f数" aria-hidden="true">#</a> [3]光圈F数</h3>
<ul>
<li>F数的定义是焦距除以光圈直径</li>
<li>常见的真实镜头F数： 1.4, 2, 2.8, 4.0, 5.6, 8, 11, 16, 22, 32</li>
<li>F 值为2的光圈有时写成 f/2，反映了这样一个事实，即绝对光圈直径(A)可以通过焦距(f)除以相对光圈(N)来计算。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d7b414715ad4776888a3314e2349b72~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></li>
</ul>
<h2 id="_3-光线追踪中使用理想透镜" tabindex="-1"><a class="header-anchor" href="#_3-光线追踪中使用理想透镜" aria-hidden="true">#</a> 3.光线追踪中使用理想透镜</h2>
<p>以前的光线追踪中，将相机与某个像素进行连线，相机是一个小点，也就是采用的是小孔成像原理</p>
<p>模拟薄透镜可以做出景深的效果
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22147ad1dac248c18f7be92f079984c6~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<ul>
<li>选择sensor size传感器大小、lens focal length棱镜焦距和aperture size光圈大小</li>
<li>选择感兴趣的主题<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07153em;">Z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>的深度(把透镜放到场景中的某个位置)
<ul>
<li>根据透镜公式，我们知道物距是<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07153em;">Z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>，及其焦距，这样就可以计算出其像距<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07153em;">Z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></li>
</ul>
</li>
</ul>
<p>那么接下来就可以进入渲染流程了：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0245c6c9803b4d73a6fb55c90b61137a~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<ul>
<li>对于sensor传感器/成像平面上的点<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7519em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span></span></span></span></li>
<li>在透镜上随机采样点<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7519em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′′</span></span></span></span></span></span></span></span></span></span></span></span></li>
<li>将上面两点连线后，根据透镜性质得知光线可以传播到<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7519em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′′′</span></span></span></span></span></span></span></span></span></span></span></span></li>
<li>估计<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7519em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′′′</span></span></span></span></span></span></span></span></span></span></span></span>到<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7519em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span></span></span></span>的radiance</li>
</ul>
<h2 id="_4-depth-of-field景深" tabindex="-1"><a class="header-anchor" href="#_4-depth-of-field景深" aria-hidden="true">#</a> 4.Depth of Field景深</h2>
<p>用不同大小的光圈可以控制模糊的范围</p>
<p>景深对应的就是CoC小的那一段，这段是清晰的</p>
<p>真实场景中有一段深度（景深）经过透镜会在成像平面附近形成一段区域，这段区域内认为CoC是足够小的。这段就是清晰的。</p>
<p>可以简单理解成只要CoC比像素小或者差不多，画面就是清晰的
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2c7994493f44e2b9a059a4146935c56~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述">
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/baaa4764ec994189982dac2de9d24746~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h2 id="_5-light-field-lumigraph光场" tabindex="-1"><a class="header-anchor" href="#_5-light-field-lumigraph光场" aria-hidden="true">#</a> 5.Light Field / Lumigraph光场</h2>
<p>虚拟现实：将看到的世界在绘制在一张图上，也就是用一张图来模拟真实世界
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48ca7b12952e4f439673561dfd29057b~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_1-the-plenoptic-function全光函数" tabindex="-1"><a class="header-anchor" href="#_1-the-plenoptic-function全光函数" aria-hidden="true">#</a> [1]The Plenoptic Function全光函数</h3>
<p>The Plenoptic Function全光函数描述人可以看到的东西</p>
<p>站在一个场景中，往四面八方看，用极坐标看的位置，全光函数定义了往某个方向看会看到什么值</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">ϕ</span><span class="mclose">)</span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">ϕ</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">λ</span><span class="mclose">)</span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">ϕ</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">λ</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">t</span><span class="mclose">)</span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">ϕ</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">λ</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">t</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">x</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">y</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.04398em;">z</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32c3d3c4b7094e91905dff7e4cf6ffd9~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<ul>
<li><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span>：波长，使图片具有颜色</li>
<li>t，电影世界</li>
<li><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">x</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">y</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.04398em;">z</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>:全息电影，也可以理解为整个世界，整个世界就是一个7维的函数。</li>
</ul>
<h3 id="_2-光场" tabindex="-1"><a class="header-anchor" href="#_2-光场" aria-hidden="true">#</a> [2]光场</h3>
<p>光场其实就是全光函数的一小部分。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/134b7442030b436d8eb0c66f25a10ed5~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述">
定义光线：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3db8c0b966714e73b7769f99a94e58f5~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>将一个物体放在一个包围盒中，从任何位置和任何方向看这个物体。想描述物体所能被看到的多种情况，描述这个物体在包围盒上，在任何位置往任何方向获取的光线，写成一个函数。这个函数就记录了物体表面不同位置往各个方向的发光情况。
光场就是在任何位置往任何方向的光的强度。光场只是全光函数的一小部分，只包含二维位置（相当于uv坐标）和二维方向<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="mord cjk_fallback">，</span><span class="mord mathnormal">φ</span><span class="mclose">)</span></span></span></span>
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91efcb1a8d624642a22b7ef1ae164575~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>把物体变成光场，记录下光场后也就相当于记录下了物体的观测。不需要里面的物体是什么，只需要知道光场就知道了观测。
可以用一个平面，平面上的二维坐标和二维方向定义光线，作为光场的参数。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a17e813bef5a45a0a888acb4e3a03c1c~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>广场就是在任意一个方向往如何一个位置去的光对的强度</p>
<p>根据实例认识两种理解方式（a和b两种）：
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c08a65de440547c8b6f7778b62dca86c~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>不同之前看的一个像素，这个像素的光来自于不同方向的光的平均（也就是下图中接收光的透镜上中），光场实际是将不同方向的光通过像素，将其分别记录下来，记录到sensor中</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d58f8690ea924086b1c34f3f0f87a8df~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_3-光场相机" tabindex="-1"><a class="header-anchor" href="#_3-光场相机" aria-hidden="true">#</a> [3]光场相机</h3>
<p>光场相机应用的是微透镜原理，使用微透镜将不同方向的光分开。</p>
<p>与普通相机不同之处是：光场相机可以先拍照在后期调整聚焦</p>
<p>普通相机中黄色的就是获取计算后得到的最终的像素。光场照相机将这里变为微透镜，微透镜将不同方向的光分散开。普通照相机记录一个像素，光场照相机计算一片像素。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/916270b7dff0419eb40a971847c2f19d~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>然后将每个透镜选择一条光线，将其结果记录为像素值。就相当于用相机拍摄特定方向的照片。通过取不同方向的光线可以虚拟的移动摄像机的位置。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc3c011bc1a44b32a63d5372ad22e63f~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>尽管如此，光场相机并没有广泛使用，是因为其具有如下缺陷：</p>
<ul>
<li>分辨率不足</li>
<li>高成本，难设计</li>
<li>像素总个数和一个像素分成多少个方向需要权衡</li>
</ul>
</template>
