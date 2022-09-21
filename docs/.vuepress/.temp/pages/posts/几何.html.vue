<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-几何例子">1.几何例子</RouterLink></li><li><RouterLink to="#_2-几何的多种表示方法">2.几何的多种表示方法</RouterLink><ul><li><RouterLink to="#_1-implicit隐式几何">[1]implicit隐式几何</RouterLink><ul><li><RouterLink to="#algebraic-surfaces代数曲面">Algebraic surfaces代数曲面</RouterLink></li><li><RouterLink to="#constructive-solid-geometry-csg-建设性实体几何形状">Constructive solid geometry（CSG）建设性实体几何形状</RouterLink></li><li><RouterLink to="#distance-functions">Distance Functions</RouterLink></li><li><RouterLink to="#level-set-methods水平集">Level Set Methods水平集</RouterLink></li></ul></li><li><RouterLink to="#_2-explicit显式几何">[2]Explicit显式几何</RouterLink><ul><li><RouterLink to="#point-cloud">Point Cloud</RouterLink></li><li><RouterLink to="#polygon-mesh多边形网格">Polygon Mesh多边形网格</RouterLink></li><li><RouterLink to="#wavefront对象文件-obj-格式">Wavefront对象文件（.OBJ）格式</RouterLink></li></ul></li></ul></li><li><RouterLink to="#_3-曲线">3.曲线</RouterLink><ul><li><RouterLink to="#_1-bezier-curves">[1]Bézier Curves</RouterLink><ul><li><RouterLink to="#de-casteljau算法">de Casteljau算法</RouterLink></li></ul></li><li><RouterLink to="#_2-splines样条">[2]splines样条</RouterLink></li></ul></li><li><RouterLink to="#_4-表面">4.表面</RouterLink><ul><li><RouterLink to="#_1-bezier表面">[1]Bezier表面</RouterLink></li><li><RouterLink to="#_2-mesh格网面-三角形和四角形">[2]Mesh格网面（三角形和四角形）</RouterLink></li></ul></li><li><RouterLink to="#_5-网格面处理">5.网格面处理</RouterLink><ul><li><RouterLink to="#_1-mesh-subdivision网格细分">[1]Mesh subdivision网格细分</RouterLink><ul><li><RouterLink to="#loop-subdivision">Loop Subdivision</RouterLink></li><li><RouterLink to="#catmull-clark-细分-通用网格">Catmull-Clark 细分(通用网格)</RouterLink></li></ul></li><li><RouterLink to="#_2-mesh-simplification网格简化">[2]Mesh simplification网格简化</RouterLink><ul><li><RouterLink to="#collapsing-an-edge边坍缩">Collapsing An Edge边坍缩</RouterLink></li><li><RouterLink to="#quadric-error-metrics-二次误差度量">Quadric Error Metrics（二次误差度量）</RouterLink></li></ul></li><li><RouterLink to="#_3-mesh-regularization网格真规化">[3]Mesh regularization网格真规化</RouterLink></li></ul></li><li><RouterLink to="#_6-shadow-mapping">6.Shadow Mapping</RouterLink><ul><li><RouterLink to="#pass-1-render-from-light">Pass 1: Render from Light</RouterLink></li><li><RouterLink to="#pass-2a-render-from-eye">Pass 2A: Render from Eye</RouterLink></li><li><RouterLink to="#example">example：</RouterLink></li><li><RouterLink to="#problems-with-shadow-maps">Problems with shadow maps</RouterLink></li></ul></li></ul></nav>
<h2 id="_1-几何例子" tabindex="-1"><a class="header-anchor" href="#_1-几何例子" aria-hidden="true">#</a> 1.几何例子</h2>
<p><img src="https://img-blog.csdnimg.cn/8a1bfea2c3d14f509ab3cf80c9b16ab4.png" alt="在这里插入图片描述"></p>
<h2 id="_2-几何的多种表示方法" tabindex="-1"><a class="header-anchor" href="#_2-几何的多种表示方法" aria-hidden="true">#</a> 2.几何的多种表示方法</h2>
<p>我们有不同的方式来表示几何，这里主要分为两大类：<strong>Implicit隐式几何</strong>和<strong>Explicit显示几何</strong></p>
<p><strong>Implicit：</strong></p>
<ul>
<li>algebraic surface（代数表面）</li>
<li>level sets（级别集）</li>
<li>distance functions（距离函数）</li>
<li>...</li>
</ul>
<p><strong>Explicit：</strong></p>
<ul>
<li>point cloud（点云）</li>
<li>polygon mesh(多边形网格)</li>
<li>subdivision, NURBS</li>
<li>...</li>
</ul>
<blockquote>
<p>每个不同的表示方法适合于不同的任务/类型的几何形状</p>
</blockquote>
<h3 id="_1-implicit隐式几何" tabindex="-1"><a class="header-anchor" href="#_1-implicit隐式几何" aria-hidden="true">#</a> [1]implicit隐式几何</h3>
<p>在一个三维空间，表示隐式几何的点并不是实际给出的点，而是给你满足一系列条件的点（例如一个单位球表面上所有的点都满足<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.0085em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>）</p>
<p>对于一个更为通用的表现显示，就是通过变换，将条件函数右边变换为0，然后我们要是能找到所有的点，我们就能把表面化出来，比如下面的例子：</p>
<p><img src="https://img-blog.csdnimg.cn/61387e6f229e41d8b8f46e734a24ecec.png" alt="在这里插入图片描述"></p>
<p>根据上面隐式的定义可以很快发现其缺点：<strong>隐式表面采样可能很困难：</strong></p>
<p>例如我给一个函数关系式：</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.2567em;vertical-align:-0.25em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.0067em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7401em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7401em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span><span style="top:-2.9667em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2333em;"><span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.9474em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></span></p>
<p>那么如何获得满足<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>的点呢</p>
<p><img src="https://img-blog.csdnimg.cn/5d146e489c0f418f8a24e9af645cf93c.png" alt="在这里插入图片描述"></p>
<p>显然可以发现，有些任务使用隐式表示很困难</p>
<p>但是，它也有它的优点：例如判断一个点在不在一个面上（或者判断某个顶于某个几何的关系）</p>
<p><img src="https://img-blog.csdnimg.cn/c8792d99bd8848369676708dfd0d57a4.png" alt="在这里插入图片描述"></p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.9474em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.0585em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.9474em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></span></p>
<p>判断点<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mopen">(</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">4</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">4</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">)</span></span></span></span>与上面球体的关系，这就很简单了，将点代入上面的函数：</p>
<ul>
<li>
<p><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">4</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">4</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">0</span><span class="mord cjk_fallback">，</span></span></span></span>则点在表面上</p>
</li>
<li>
<p><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">4</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">4</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">0</span><span class="mord cjk_fallback">，</span></span></span></span>则点位于球体内</p>
</li>
<li>
<p>$f(\frac{3}{4},\frac{1}{2},\frac{1}{4})&gt;0，$0，位于球体外</p>
</li>
</ul>
<p>是不是有点简单，那下面举一些图形学中常见的所有隐式几何的例子</p>
<h4 id="algebraic-surfaces代数曲面" tabindex="-1"><a class="header-anchor" href="#algebraic-surfaces代数曲面" aria-hidden="true">#</a> Algebraic surfaces代数曲面</h4>
<p>曲面是 x，y，z 中多项式的零集（用数学公式去绘制形状），上面举的例子就是属于这一种</p>
<p><img src="https://img-blog.csdnimg.cn/3d152e6d4bea4dfcac200b6a3de1afb4.png" alt="在这里插入图片描述"></p>
<h4 id="constructive-solid-geometry-csg-建设性实体几何形状" tabindex="-1"><a class="header-anchor" href="#constructive-solid-geometry-csg-建设性实体几何形状" aria-hidden="true">#</a> Constructive solid geometry（CSG）建设性实体几何形状</h4>
<p>通过一些列几何的<strong>基本几何的集合运算</strong>来定义新的几何</p>
<p><img src="https://img-blog.csdnimg.cn/3efa2f4da96242ba8d17308cbe42c21e.png" alt="在这里插入图片描述"></p>
<p>也就是通过基本/简单几何创建复杂几何，同时这也是很常见的操作，例如各种制图软件都是支持这种方式的</p>
<h4 id="distance-functions" tabindex="-1"><a class="header-anchor" href="#distance-functions" aria-hidden="true">#</a> Distance Functions</h4>
<p>对于任意一个几何，不直接描述表面，而是描述空间中任何一个点到几何体的最小距离。</p>
<p><strong>距离函数会返回空间中任何一个点到物体表面的最短距离，我们只需要找出距离为0的所有点，即可得到这个物体表面，而距离小于0的点代表在物体内部，距离大于0的点代表在物体外</strong>。</p>
<p><strong>距离函数</strong>返回空间中任何一个点到一个几何形体上面的最小距离（可为负：点在物体内部）</p>
<p><img src="https://img-blog.csdnimg.cn/50003df57143495fb35f746a2eb983f3.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>例如上面的过程：将上面的两个球的距离函数计算出来，然后对这两个距离函数做一个Blending(融合)，然后在把它恢复成原来的物体（就是距离函数都返回0时的点）</p>
</blockquote>
<p>An Example：混合（线性插入）移动边界</p>
<p><img src="https://img-blog.csdnimg.cn/21a55f6b60804fe8920c26380ffbe640.png" alt="在这里插入图片描述"></p>
<p><strong>符号距离函数</strong>（Signed Distance Function，简称SDF）或<strong>定向距离函数</strong>（Oriented Distance Function，简称SDF）</p>
<p><a href="https://zhuanlan.zhihu.com/p/365440831" target="_blank" rel="noopener noreferrer">Shader中使用距离函数（Distance Function）绘制二维图形</a></p>
<h4 id="level-set-methods水平集" tabindex="-1"><a class="header-anchor" href="#level-set-methods水平集" aria-hidden="true">#</a> Level Set Methods水平集</h4>
<p>像距离函数类似的封闭形式的方程很难描述复杂的形状（不容易使用公式去写），但是还是可以通过某种方法表示出来就可以了，利用Level Set Methods水平集方法（如下图）</p>
<p><img src="https://img-blog.csdnimg.cn/67d0520f49024186af91f207d2e4e663.png" alt="在这里插入图片描述"></p>
<ul>
<li>其实和等高线一个原理。。。。。</li>
<li>其实和距离函数类似，其实就它函数的表达形式不同而已</li>
</ul>
<p>水平集在医疗上的应用（三维）：恒定的组织密度</p>
<p><img src="https://img-blog.csdnimg.cn/13f9581b4023446d8d0b7902d4c0a421.png" alt="在这里插入图片描述"></p>
<p>物理模拟中的水平集：
<img src="https://img-blog.csdnimg.cn/ca6c317aad164a9e8099551095d0928b.png" alt="在这里插入图片描述"></p>
<h3 id="_2-explicit显式几何" tabindex="-1"><a class="header-anchor" href="#_2-explicit显式几何" aria-hidden="true">#</a> [2]Explicit显式几何</h3>
<p>所有的点直接给出或通过参数映射给出</p>
<p><img src="https://img-blog.csdnimg.cn/f3c12149107d40219cd5fc333de575f2.png" alt="在这里插入图片描述"></p>
<p>例如，下面的参数映射，把u和v映射导右边的式子中，最终求得相应得值</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">u</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">((</span><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">cos</span><span class="mord mathnormal">u</span><span class="mclose">)</span><span class="mord mathnormal">cos</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mopen">(</span><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">cos</span><span class="mord mathnormal">u</span><span class="mclose">)</span><span class="mord mathnormal">s</span><span class="mord mathnormal">in</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">in</span><span class="mord mathnormal">u</span><span class="mclose">)</span></span></span></span></span></p>
<p><img src="https://img-blog.csdnimg.cn/c79bca9005a9456da057b2471c5fb89d.png" alt="在这里插入图片描述"></p>
<p>与隐式几何不同，判读一个点在几何体得表面、外部、还是内部就比较困难了</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">u</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">cos</span><span class="mord mathnormal">u</span><span class="mord mathnormal">s</span><span class="mord mathnormal">in</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">in</span><span class="mord mathnormal">u</span><span class="mord mathnormal">s</span><span class="mord mathnormal">in</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">cos</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mclose">)</span></span></span></span></span></p>
<p>如何判断点<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mopen">(</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">4</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">4</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">)</span></span></span></span>得位置呢？</p>
<p>这就比较困难了，所以说隐式和显式几何的优缺点是互补的，没有最好的表示几何的方式，我们得根据实际情况的需要去选择。</p>
<p>对几何得表示方法不仅仅是上面的那些</p>
<p>下面说说常见的显示几何表示的应用</p>
<h4 id="point-cloud" tabindex="-1"><a class="header-anchor" href="#point-cloud" aria-hidden="true">#</a> Point Cloud</h4>
<p><img src="https://img-blog.csdnimg.cn/7f8d13d469794bd8b99f53cb0d5c61dc.png" alt="在这里插入图片描述"></p>
<ul>
<li>最简单的表示方法，只通过一些点集(x,y,x)表示即可</li>
<li>很容易表示任何几何形状</li>
<li>适用于大型数据集(&gt;&gt; 1 point/pixel)</li>
<li>通常将其转化为多边形网格</li>
<li>在采样不足的区域很难绘制（点不够）</li>
</ul>
<h4 id="polygon-mesh多边形网格" tabindex="-1"><a class="header-anchor" href="#polygon-mesh多边形网格" aria-hidden="true">#</a> Polygon Mesh多边形网格</h4>
<p><img src="https://img-blog.csdnimg.cn/1016e31b08e944a3bb20baa738eb5cfe.png" alt="在这里插入图片描述"></p>
<ul>
<li>存储顶点和多边形（通常是三角形或四角形）</li>
<li>更容易进行处理 /仿真，自适应采样</li>
<li>更复杂的数据结构</li>
<li>图形中最常见的表示形式</li>
</ul>
<h4 id="wavefront对象文件-obj-格式" tabindex="-1"><a class="header-anchor" href="#wavefront对象文件-obj-格式" aria-hidden="true">#</a> Wavefront对象文件（.OBJ）格式</h4>
<ul>
<li>通常用于图形研究</li>
<li>只是一个文本文件，指定顶点，法线，纹理坐标及其连通性</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/29fdebf9b05342b3862985e80a9caf48.png" alt="在这里插入图片描述"></p>
<h2 id="_3-曲线" tabindex="-1"><a class="header-anchor" href="#_3-曲线" aria-hidden="true">#</a> 3.曲线</h2>
<h3 id="_1-bezier-curves" tabindex="-1"><a class="header-anchor" href="#_1-bezier-curves" aria-hidden="true">#</a> [1]Bézier Curves</h3>
<p>贝塞尔曲线：用一些控制点来定义曲线曲线，而这些控制的要满足一定的规则：</p>
<p><img src="https://img-blog.csdnimg.cn/71a42a105ec945b8ae31b34a655c59db.png" alt="在这里插入图片描述"></p>
<ul>
<li>曲线起点方向为<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>方向，终点的方向为<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>方向</li>
<li>曲线一定要经过起始点，其他点不一定</li>
</ul>
<h4 id="de-casteljau算法" tabindex="-1"><a class="header-anchor" href="#de-casteljau算法" aria-hidden="true">#</a> de Casteljau算法</h4>
<p>de Casteljau（德卡尔斯特里奥）：给定任意多个点将贝塞尔曲线上的点出来算法
<img src="https://img-blog.csdnimg.cn/98fe83c263854928bde398564ca43489.png" alt="在这里插入图片描述"></p>
<p>详见另一篇文章</p>
<h3 id="_2-splines样条" tabindex="-1"><a class="header-anchor" href="#_2-splines样条" aria-hidden="true">#</a> [2]splines样条</h3>
<p>图形学中不仅仅应用到贝塞尔曲线，还有其他许多类型的曲线，比如说：splines样条</p>
<ul>
<li>由以系列控制点控制的曲线，且满足一定的连续性</li>
<li>简单而言：一个可控的曲线</li>
</ul>
<p>样条中常见的有<strong>B-splines样条</strong></p>
<ul>
<li>
<p>属于贝塞尔曲线的一个扩展，它比贝塞尔曲线能力更强（比如贝塞尔曲线如果你动了一个控制点，那么整条线条的变化是很大的），而B-splines则具有局部性的，可控的调整某个范围的变化，当然分段的贝塞尔曲线同样具有这一性质，但是B—splines则不用分段</p>
</li>
<li>
<p>基样条的简称</p>
</li>
<li>
<p>比Bezier曲线需要更多的信息</p>
</li>
<li>
<p>满足 Bézier 曲线的所有重要性质(即超集)</p>
</li>
<li>
<p>但是，B-splines很难学。。所以这里就不深入了</p>
</li>
</ul>
<h2 id="_4-表面" tabindex="-1"><a class="header-anchor" href="#_4-表面" aria-hidden="true">#</a> 4.表面</h2>
<p><img src="https://img-blog.csdnimg.cn/cbff8bec642747e887ffe620f46be252.png" alt="在这里插入图片描述"></p>
<h3 id="_1-bezier表面" tabindex="-1"><a class="header-anchor" href="#_1-bezier表面" aria-hidden="true">#</a> [1]Bezier表面</h3>
<p><img src="https://img-blog.csdnimg.cn/bf9a6bff09914b63b183328949b71019.png" alt="在这里插入图片描述"></p>
<p>使用两个t，这里我们使用<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">u</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mclose">)</span></span></span></span>来定义来实现贝塞尔曲面，让其扫描成一个面即可</p>
<p><img src="https://img-blog.csdnimg.cn/85ade09c49a6435b9815fddadeee271c.gif#pic_center" alt="在这里插入图片描述"></p>
<p>这样就可以通过参数<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">u</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mclose">)</span></span></span></span>来确定曲面上具体的点了,和之前使用de Casteljau Algorithm来实现</p>
<p><img src="https://img-blog.csdnimg.cn/75c23d6f592e47a49cd83e23c388f2c2.png" alt="在这里插入图片描述"></p>
<ul>
<li>首先确定一个参数，这样可以获得4个点</li>
<li>然后在确定另外一个参数v，这样就可以确定处曲面上具体的点了</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/31b0be2e590d4cc594c55ace09b33e30.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>这里可以联想到之前的贝塞尔曲线的相关问题，也可以发现所有贝塞尔曲面也会面临着类似的问题，例如：如何多个平面相交等问题等等，这里就先不展开深入</p>
</blockquote>
<h3 id="_2-mesh格网面-三角形和四角形" tabindex="-1"><a class="header-anchor" href="#_2-mesh格网面-三角形和四角形" aria-hidden="true">#</a> [2]Mesh格网面（三角形和四角形）</h3>
<p>在计算机图形学中应用的比较多的还是mesh网格面，所以还得着重学习学习——网格操作: 几何处理部分</p>
<p><img src="https://img-blog.csdnimg.cn/d04affc322584d039df84977243a31a0.png" alt="在这里插入图片描述"></p>
<ul>
<li>Mesh subdivision网格细分</li>
<li>Mesh simplification网格简化</li>
<li>Mesh regularization网格真规化</li>
</ul>
<h2 id="_5-网格面处理" tabindex="-1"><a class="header-anchor" href="#_5-网格面处理" aria-hidden="true">#</a> 5.网格面处理</h2>
<h3 id="_1-mesh-subdivision网格细分" tabindex="-1"><a class="header-anchor" href="#_1-mesh-subdivision网格细分" aria-hidden="true">#</a> [1]Mesh subdivision网格细分</h3>
<p>一个非常重要的操作</p>
<p>如何增加更多的三角形，使图形更加光滑（类似于增加图形的分辨率）
<img src="https://img-blog.csdnimg.cn/200a5935c12a4ffe8266441cac106a2a.png" alt="在这里插入图片描述"></p>
<p>三角形网格的一般细分规则：</p>
<ul>
<li>First, create more triangles (vertices)</li>
<li>Second, tune their positions</li>
</ul>
<h4 id="loop-subdivision" tabindex="-1"><a class="header-anchor" href="#loop-subdivision" aria-hidden="true">#</a> <strong>Loop Subdivision</strong></h4>
<ul>
<li>
<p>把每个三角形分成四个
<img src="https://img-blog.csdnimg.cn/ddf3a350f23147258211210ed54f14ce.png" alt="在这里插入图片描述"></p>
</li>
<li>
<p>调整新/旧顶点的位置来让这个模型变得光滑（新顶点/旧顶点的更新方式/算法不同）</p>
</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/59755bef3add4451ae4d27a0eeff2f32.png" alt="在这里插入图片描述"></p>
<p>对于新的顶点的更新位置：</p>
<p><img src="https://img-blog.csdnimg.cn/d1f3c2fc63a54db6a4c19e5181da4850.png" alt="在这里插入图片描述"></p>
<ul>
<li>例如白点为新顶点</li>
<li>将其位置跟新至$3/8 * (A + B) + 1/8 * (C + D) $以使其更平滑（加权平均）</li>
</ul>
<p>对于旧顶点的更新：</p>
<p><img src="https://img-blog.csdnimg.cn/c9cb7963c98d498cb0073e32c2f77528.png" alt="在这里插入图片描述"></p>
<ul>
<li>一部分根据相邻的老的顶点的平均值，另外一部分是根据其自己的位置</li>
<li>n：vertex degree(图论中的度)</li>
<li>老顶点更新到：<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4653em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">u</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.9805em;vertical-align:-0.2861em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">or</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">ina</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0197em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">p</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mord mathnormal">os</span><span class="mord mathnormal">i</span><span class="mord mathnormal">t</span><span class="mord mathnormal">i</span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4653em;"></span><span class="mord mathnormal">u</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.9805em;vertical-align:-0.2861em;"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">e</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">hb</span><span class="mord mathnormal">o</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">p</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mord mathnormal">os</span><span class="mord mathnormal">i</span><span class="mord mathnormal">t</span><span class="mord mathnormal">i</span><span class="mord mathnormal">o</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">s</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord mathnormal">u</span><span class="mord mathnormal">m</span></span></span></span></li>
</ul>
<p>例如：loop 细分的效果</p>
<p><img src="https://img-blog.csdnimg.cn/da3b67dcb4d14a488c0c431d78e40b8d.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>总结：先细分，在调整</p>
</blockquote>
<h4 id="catmull-clark-细分-通用网格" tabindex="-1"><a class="header-anchor" href="#catmull-clark-细分-通用网格" aria-hidden="true">#</a> Catmull-Clark 细分(通用网格)</h4>
<p>对于不同网格的细分——例如一个图形中有三角网格细分，正方形网格细分，那么这时loop就不太适用了（loop细分只能用在三角网格细分）
<img src="https://img-blog.csdnimg.cn/b7d70c9c7a794b44820bcbc1c9974d99.png" alt="在这里插入图片描述"></p>
<p>细分后：</p>
<p><img src="https://img-blog.csdnimg.cn/fae2f3b905994ff9b5aae8d5a9203330.png" alt="在这里插入图片描述"></p>
<p>How many extraordinary（奇异点） vertices?</p>
<ul>
<li>4个（有两个是原本的奇异的，增加了2个，因为划分了三角形）</li>
</ul>
<p>What are their degrees?</p>
<ul>
<li>3（新的奇异的的度为3）</li>
</ul>
<p>How many non-quad faces?</p>
<ul>
<li>0（无——一次细分之后所以的非四边形们都改进型了）</li>
</ul>
<blockquote>
<p>Catmull-Clark 细分性质：</p>
<ul>
<li>在一次细分后增加的奇异的数为非四边形面数（之后奇异的数就不会增加了）</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/e7b39cef5f764c1081827439ab8f56b5.png" alt="在这里插入图片描述"></p>
</blockquote>
<p><strong>catmull-clark顶点更新规则（Quad网格）</strong></p>
<ul>
<li>将物体表面上的点细分为三类</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/3677eccf160649409af8b6d587e91d1d.png" alt="在这里插入图片描述"></p>
<ul>
<li>Face point（在面中间的新点）</li>
<li>Edge point（边的中间的点）</li>
<li>Vertex point（老的点）</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/13365988ae4e409ead4ce8e7d92ba8e9.png" alt="在这里插入图片描述"></p>
<h3 id="_2-mesh-simplification网格简化" tabindex="-1"><a class="header-anchor" href="#_2-mesh-simplification网格简化" aria-hidden="true">#</a> [2]Mesh simplification网格简化</h3>
<p>目标：减少网格元素的数量 同时保持整体形状</p>
<p><img src="https://img-blog.csdnimg.cn/856ee782cee54b2a8629af124a15acbd.png" alt="在这里插入图片描述"></p>
<p>做网格简化的目的主要是为了在确保用户体验的情况西进一步的提高性能，也就是在不影响体验的情况下进行简化</p>
<h4 id="collapsing-an-edge边坍缩" tabindex="-1"><a class="header-anchor" href="#collapsing-an-edge边坍缩" aria-hidden="true">#</a> Collapsing An Edge边坍缩</h4>
<p>一种常见的网格简化的方法Collapsing An Edge——把两个或多个顶点捏成一个</p>
<p><img src="https://img-blog.csdnimg.cn/adf37a4d44094909b3d7379cc46d7a47.png" alt="在这里插入图片描述"></p>
<p>那么那些边是重要的（不能把它黏在一块），那些边是不重要的（可以把它黏在一块），也就是为了使模型变化更小，为此引入了一个度量——Quadric Error Metrics（二次误差度量）来解决该问题</p>
<h4 id="quadric-error-metrics-二次误差度量" tabindex="-1"><a class="header-anchor" href="#quadric-error-metrics-二次误差度量" aria-hidden="true">#</a> Quadric Error Metrics（二次误差度量）</h4>
<p>如图所示，将中间三个黑点坍缩成一个蓝点之后，就完成了所谓的简化效果，但是如何确保其进行简化的同时使图形变化最小</p>
<p><img src="https://img-blog.csdnimg.cn/a157d8481a714fc6885841eb8d91bfe3.png" alt="在这里插入图片描述"></p>
<p><strong>新顶点所在的位置与原来各个平面的垂直距离的平方和</strong>即为二次误差度量。如果能够使得这个误差最小那么对整个模型样貌修改一定程度上也会较小。</p>
<p>所以曲面简化的流程为：</p>
<ol>
<li><strong>计算模型的每条边的二次测量误差</strong></li>
<li><strong>选取二次测量误差最小的边做坍缩</strong></li>
<li><strong>坍缩完之后，与之相连其他的边的位置会改动，更新这些边的权值</strong></li>
<li><strong>重复上述步骤，直到到达终止条件</strong></li>
</ol>
<p>因为需要求最小值，同时又要动态更新，所以以上过程可以用<strong>优先队列</strong>（堆）</p>
<p>这是一个标准的贪心算法，并不能达到全局最优解，但是仍然有不错的效果
<img src="https://img-blog.csdnimg.cn/deb04c7f721e4f3c9719ff4a09289c63.png" alt="在这里插入图片描述"></p>
<h3 id="_3-mesh-regularization网格真规化" tabindex="-1"><a class="header-anchor" href="#_3-mesh-regularization网格真规化" aria-hidden="true">#</a> [3]Mesh regularization网格真规化</h3>
<p><img src="https://img-blog.csdnimg.cn/43f0a3af3f21445a960be890b880af49.png" alt="在这里插入图片描述"></p>
<h2 id="_6-shadow-mapping" tabindex="-1"><a class="header-anchor" href="#_6-shadow-mapping" aria-hidden="true">#</a> 6.Shadow Mapping</h2>
<p>Shadow mapping——draw shadows using rasterization</p>
<ul>
<li>
<p>是一种图像空间算法</p>
<ul>
<li>在阴影计算中没有场景几何知识</li>
</ul>
</li>
<li>
<p>Shadow mapping核心思想：</p>
<ul>
<li>将点看出处于两种状态：能被光源照射得到的和能被camera看得到的（非0及1的过程）</li>
<li>这种阴影称为硬阴影</li>
<li>仅适用于点光源情况下</li>
</ul>
</li>
</ul>
<h3 id="pass-1-render-from-light" tabindex="-1"><a class="header-anchor" href="#pass-1-render-from-light" aria-hidden="true">#</a> Pass 1: Render from Light</h3>
<p>第一步从光源找到能看到的点，从而生成一幅图，这个图不需要做着色，把不同位置它所看到的点对应的深度记录下来。</p>
<p>从光源看（虚拟相机）向所有的点，并记录你看到的所有的点的深度是多少——进而得到一幅<strong>深度图</strong></p>
<p><img src="https://img-blog.csdnimg.cn/b33fbaae552c4b4c82b9a450d911f63a.png" alt="在这里插入图片描述"></p>
<h3 id="pass-2a-render-from-eye" tabindex="-1"><a class="header-anchor" href="#pass-2a-render-from-eye" aria-hidden="true">#</a> Pass 2A: Render from Eye</h3>
<p><img src="https://img-blog.csdnimg.cn/57d7051fb138427cb20477858c8146b5.png" alt="在这里插入图片描述"></p>
<ul>
<li>
<p>从相机视角看某个点，然后将相机看到的某个点的反投影回去然后计算处黄色线的深度，然后和之前在点光源处（虚拟相机）获得的该点的深度进行对比，如果是相同的那么就表面该点是看得到的（也就是不是在阴影下并且能看得到的点）</p>
</li>
<li>
<p>如下图为从点光源看到的情况和相机视角下看到的同一点的深度不同的情况下。这样的话可以判断该点是在阴影下的（相机能看到，点光源看不到）。</p>
</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/62ead8f33a534105a9d75253ee3f8107.png" alt="在这里插入图片描述"></p>
<h3 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> example：</h3>
<p>看一个实际案例（shadow mapping实现）</p>
<p><img src="https://img-blog.csdnimg.cn/06152f5716fa4a15b0555cfee8868869.png" alt="在这里插入图片描述"></p>
<p>先从点光源方向开始（生成深度图）</p>
<p><img src="https://img-blog.csdnimg.cn/ad618c0b5c7e4869ad9aaa61bbd34382.png" alt="在这里插入图片描述"></p>
<p>然后比对（这里并不是简单的比较是否相等，其实还包含很多问题需要处理：例如浮点数精度问题等）
<img src="https://img-blog.csdnimg.cn/a767d51c853d45ed80a13b20dbdcfecf.png" alt="在这里插入图片描述"></p>
<h3 id="problems-with-shadow-maps" tabindex="-1"><a class="header-anchor" href="#problems-with-shadow-maps" aria-hidden="true">#</a> Problems with shadow maps</h3>
<ul>
<li>阴影（只支持点光源）</li>
<li>质量取决于阴影图分辨率 （基于图像的技术的一般问题）</li>
<li>涉及到浮点深度值的等式比较，意味着尺度、偏差、公差等问题</li>
</ul>
<p><strong>软阴影vs硬阴影</strong></p>
<p><img src="https://img-blog.csdnimg.cn/24b74aabf1f340e19c548c5cb3e33746.png" alt="在这里插入图片描述"></p>
</template>
