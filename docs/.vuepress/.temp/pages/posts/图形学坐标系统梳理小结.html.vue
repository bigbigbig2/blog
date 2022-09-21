<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-计算机图形学中的坐标系统">1.计算机图形学中的坐标系统</RouterLink><ul><li><RouterLink to="#_1-空间与变换">[1]空间与变换</RouterLink></li><li><RouterLink to="#_2-局部空间">[2]局部空间</RouterLink></li><li><RouterLink to="#_3-世界空间">[3]世界空间</RouterLink></li><li><RouterLink to="#_4-观察空间">[4]观察空间</RouterLink></li><li><RouterLink to="#_5-裁剪空间">[5]裁剪空间</RouterLink></li><li><RouterLink to="#_6-屏幕空间">[6]屏幕空间</RouterLink></li></ul></li><li><RouterLink to="#_2-svg坐标系统">2.SVG坐标系统</RouterLink></li><li><RouterLink to="#_3-canvas坐标系统">3.Canvas坐标系统</RouterLink></li><li><RouterLink to="#_4-webgl坐标系统">4.WebGL坐标系统</RouterLink></li></ul></nav>
<h2 id="_1-计算机图形学中的坐标系统" tabindex="-1"><a class="header-anchor" href="#_1-计算机图形学中的坐标系统" aria-hidden="true">#</a> 1.计算机图形学中的坐标系统</h2>
<p>下面解释了从一个数值坐标到输出到屏幕上的坐标变换过程，也是计算机中各种图形学API所遵循采用的方法。</p>
<h3 id="_1-空间与变换" tabindex="-1"><a class="header-anchor" href="#_1-空间与变换" aria-hidden="true">#</a> [1]空间与变换</h3>
<p>不同的坐标系统也被称作相应的<strong>空间</strong>，首先来看一下，一个只有数值的顶点在最终被转化到你在电脑看到的点需要经历哪些坐标系统（空间）：</p>
<ul>
<li>局部空间（Local Space）/ 物体空间（Object Space）</li>
<li>世界空间（World Space）</li>
<li>观察空间（View Space）/ 视觉空间（Eye Space）</li>
<li>裁剪空间（Clip Space）</li>
<li>屏幕空间（Screen Space）</li>
</ul>
<p><a href="https://img-blog.csdnimg.cn/f2ec8a9b1798410ebd3abb30be44f8ca.png" target="_blank" rel="noopener noreferrer"><img src="https://img-blog.csdnimg.cn/f2ec8a9b1798410ebd3abb30be44f8ca.png" alt="在这里插入图片描述"></a></p>
<blockquote>
<p>顶点坐标（位于局部空间），称为局部坐标，然后顶点坐标会从局部空间按照上述顺序一步步变换到屏幕空间💻</p>
</blockquote>
<p>而坐标从一个空间到另一个空间则需要变换矩阵来完成这一过程：</p>
<ul>
<li>模型矩阵（Model Matrix）</li>
<li>视图矩阵（View Matrix）</li>
<li>投影矩阵（Projection Matrix）</li>
</ul>
<h3 id="_2-局部空间" tabindex="-1"><a class="header-anchor" href="#_2-局部空间" aria-hidden="true">#</a> [2]局部空间</h3>
<p><strong>局部空间</strong>是指物体所在的坐标空间，即对象最开始所在的地方。在局部空间中，物体位于空间的原点，所有的调整都是基于物体的相对位置进行的</p>
<h3 id="_3-世界空间" tabindex="-1"><a class="header-anchor" href="#_3-世界空间" aria-hidden="true">#</a> [3]世界空间</h3>
<p><strong>世界空间</strong>是指虚拟的场景所在的空间，比如游戏场景等。它指顶点相对于场景的坐标，当所有物体导入程序时，它们有可能会都挤在世界的原点<code>(0.0, 0.0, 0.0)</code>上，我们需要为每一个物体定义一个位置，从而能在更大的场景中合理的摆放让它们。<strong>模型矩阵</strong>的作用就是通过对物体进行位移、缩放、旋转等操作将其摆放到场景中的不同位置。</p>
<h3 id="_4-观察空间" tabindex="-1"><a class="header-anchor" href="#_4-观察空间" aria-hidden="true">#</a> [4]观察空间</h3>
<p>我们通过<code>WebGL</code>在屏幕上展现给用户的内容并不是世界空间中摆放的全部内容，而是通过摄像机来模拟用户的眼睛所呈现的场景。<strong>观察空间</strong>就是从摄像机的视角所观察到的空间，也会称作<strong>摄像机空间</strong>或<strong>视觉空间</strong>。</p>
<p>以摄像机位置为原点，观察方向为<code>-z</code>轴方向的一个空间通常用一系列的平移和旋转变换把世界空间中的物体转换到观察空间中。</p>
<h3 id="_5-裁剪空间" tabindex="-1"><a class="header-anchor" href="#_5-裁剪空间" aria-hidden="true">#</a> [5]裁剪空间</h3>
<p>摄像机有朝向，也有拍摄的视野范围，所有在视野范围之外的东西都是看不到的，都要被剔除。在每个顶点着色器运行结束的时候，<code>OpenGL</code>希望坐标都在一个指定范围内，超出范围的坐标都会被裁剪掉，剩下的坐标才会进入片元着色阶段，这也就是<strong>裁剪空间</strong>名字的由来。而<strong>投影矩阵</strong>就是将物体从观察空间转换到裁剪空间。</p>
<p>研究表明人两眼重合视域通常为124度，当集中注意力时约为五分之一，即25度（知道为什么当一个人全神贯注时可能会忽略周边发生的事情了吧🤷🏼），单眼的舒适视域为60度。当然，在<code>OpenGL</code>中摄像机的左右、上下方向也都有一定的范围，这个范围称作<strong>视野角度（FOV）</strong>。</p>
<p><img src="https://img-blog.csdnimg.cn/ed37705e58704fa8bf7dad3ae28d1f52.png" alt="在这里插入图片描述"></p>
<p>图中蓝色的<code>w</code>和<code>h</code>就确定了摄像机上下左右能看到的范围大小；通常设置上下左右视野都是90度，同时设置一个<strong>近裁剪面</strong>和<strong>远裁剪面</strong>：比近裁剪面近、比远裁剪面远的物体被剔除，把两个裁剪面之间所有的物体都映射到投影平面上✄</p>
<p>我们再说回到投影矩阵，投影矩阵分为两种：<strong>正射投影矩阵</strong>和<strong>透视投影矩阵</strong>（<em>将特定范围内坐标转化到标准化设备坐标系（NDC）的过程被称之为投影</em>）。正射投影和透视投影的差别很明显，透视投影看起来更加立体真实（就想学画画时老师教的“近大远小，近高远低”），而正射投影则没有这种效果，使用正射投影的物体没有透视，远处的物体也不会显得更小，在正射投影中每个顶点距离观察者的距离都是一样的，当然正射投影也有它的用处，比如用于渲染一些二维的建筑或工程的程序，在这些场景中工程师们更希望顶点不会被透视所影响。</p>
<p>为上述每一个步骤都创建相应的变换矩阵：模型矩阵、观察矩阵和投影矩阵。一个顶点坐标将会根据以下过程被变换到裁剪坐标：</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">c</span><span class="mord mathnormal mtight" style="margin-right:0.01968em;">l</span><span class="mord mathnormal mtight">i</span><span class="mord mathnormal mtight">p</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">p</span><span class="mord mathnormal mtight">ro</span><span class="mord mathnormal mtight" style="margin-right:0.05724em;">j</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">v</span><span class="mord mathnormal mtight">i</span><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight" style="margin-right:0.02691em;">w</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">m</span><span class="mord mathnormal mtight">o</span><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight" style="margin-right:0.01968em;">l</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.01968em;">l</span><span class="mord mathnormal mtight">oc</span><span class="mord mathnormal mtight">a</span><span class="mord mathnormal mtight" style="margin-right:0.01968em;">l</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></p>
<p>顶点着色器的输出要求所有的顶点都在裁剪空间内，这就是使用变换矩阵做的，然后<code>OpenGL</code>对裁剪坐标执行透视除法从而将它们变换到标准化设备坐标；OpenGL使用内部参数来标准化设备坐标映射到屏幕坐标，每一个坐标都关联了一个屏幕上的点，这个过程称为<strong>视口变换</strong>。</p>
<blockquote>
<p>透视除法是将4D裁剪空间坐标变换为3D标准化设备坐标的过程</p>
</blockquote>
<h3 id="_6-屏幕空间" tabindex="-1"><a class="header-anchor" href="#_6-屏幕空间" aria-hidden="true">#</a> [6]屏幕空间</h3>
<p>该空间可以简单地理解为应用窗口，投影平面上的东西和窗口上的像素通过一一对应的方式映射到窗口，在窗口上显示。对于WebGL需要调用相应的API来将裁剪空间转换到屏幕空间，具体见下文</p>
<h2 id="_2-svg坐标系统" tabindex="-1"><a class="header-anchor" href="#_2-svg坐标系统" aria-hidden="true">#</a> 2.SVG坐标系统</h2>
<p>SVG使用的坐标系统或者说网格系统，和<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API" target="_blank" rel="noopener noreferrer">Canvas</a>用的差不多（所有计算机绘图都差不多）。这种坐标系统是：以页面的左上角为(0,0)坐标点，坐标以像素为单位，x轴正方向是向右，y轴正方向是向下。（同cesium中的屏幕坐标系）
<img src="https://img-blog.csdnimg.cn/34bd8270e4c9429f9313bd925b51504e.png" alt="在这里插入图片描述"></p>
<p>示例：</p>
<div class="language-svg ext-svg line-numbers-mode"><pre v-pre class="language-svg"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>rect</span> <span class="token attr-name">x</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">y</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>定义一个矩形，即从左上角开始，向右延展100px，向下延展100px，形成一个100*100大的矩形</p>
<h2 id="_3-canvas坐标系统" tabindex="-1"><a class="header-anchor" href="#_3-canvas坐标系统" aria-hidden="true">#</a> 3.Canvas坐标系统</h2>
<p>以屏幕左上角未原点，向右为x，下为y，单位为px</p>
<p><img src="https://img-blog.csdnimg.cn/f7e3f0ef16b34f74905f845ca922b590.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>注意：Canvas 元素上的 width 和 height 属性不等同于 Canvas 元素的 CSS 样式的属性，Canvas 元素上的 width 和 height是其画布的大小。</p>
</blockquote>
<h2 id="_4-webgl坐标系统" tabindex="-1"><a class="header-anchor" href="#_4-webgl坐标系统" aria-hidden="true">#</a> 4.WebGL坐标系统</h2>
<p>WebGL使用的是正交右手坐标系<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">x</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">x</span></span></span></span>的分量为<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">[</span><span class="mord">−</span><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">1</span><span class="mclose">]</span></span></span></span>，因为使用的是canvas画布，他默认是根据画布的大小来分配至<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">[</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">1</span><span class="mclose">]</span></span></span></span>中</p>
<p>注意:WebGL的顶点着色器只能将数值坐标转化到裁剪空间中，WebGL下面的坐标也就是器裁剪空间中的坐标，无论你的画布有多大，裁剪空间的坐标范围永远是 -1 到 1 。</p>
<p><img src="https://img-blog.csdnimg.cn/78493cd3e63b4f9c99bdf6ab9fc84863.png" alt="在这里插入图片描述"></p>
<p>而要将WebGL的裁剪空间转化到屏幕/像素空间，也是转化到和canvas一样的坐标系中，可以使用WebGLContent.viewport，下面为举例对比说明</p>
<p>使用gl.viewport()与不使用gl.viewport()对比</p>
<p>不使用：（默认在canvas的坐标系下建立webgl坐标系，给分量的取值范围为0~1）</p>
<p><img src="https://img-blog.csdnimg.cn/6c940fee7a8a468ebc4b2bc1486d56f5.png" alt="在这里插入图片描述"></p>
<p>使用后：</p>
<p><img src="https://img-blog.csdnimg.cn/730ed11f653641688798c59269e3cb87.png" alt="f"></p>
<p>参考：</p>
<ul>
<li>https://mp.weixin.qq.com/s?__biz=MzIxMzY1OTQxOQ==&amp;mid=2247483800&amp;idx=1&amp;sn=d0e1ce2f5d7dcab439e915ec0465fd6a&amp;chksm=97b23beca0c5b2fa90e23e4583d922c7be1e4d6d8ed4bfcbd173472e37808275bce7b9313d46&amp;scene=178&amp;cur_album_id=1341289715194036227#rd</li>
<li>https://webglfundamentals.org/webgl/lessons/zh_cn/</li>
</ul>
</template>
