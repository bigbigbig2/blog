<template><h2 id="_1-为什么要光线追踪" tabindex="-1"><a class="header-anchor" href="#_1-为什么要光线追踪" aria-hidden="true">#</a> 1.为什么要光线追踪</h2>
<ul>
<li>光栅化不能很好地处理全局效果，例如下面的
<ul>
<li>软阴影</li>
<li>Glossy Reflection (存在一部分反射，也有一定的模糊效果，类似毛玻璃)</li>
<li>间接光照</li>
</ul>
</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/4520bc911c224abc83e5334bfd5a455d.png" alt="在这里插入图片描述"></p>
<ul>
<li>
<p>光栅化是一种很快但质量相对较低的技术</p>
</li>
<li>
<p>光线追踪是一种很准确，但很慢的技术</p>
<ul>
<li>光栅化应用于实时渲染(每秒钟生成超过30帧的图)</li>
<li>光线追踪更多地应用于离线渲染（比如电影制作等）</li>
</ul>
</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/e10d743d29a643ebaae36c11f1cfd828.png" alt="在这里插入图片描述"></p>
<h2 id="_2-基础的光线追踪算法" tabindex="-1"><a class="header-anchor" href="#_2-基础的光线追踪算法" aria-hidden="true">#</a> 2.基础的光线追踪算法</h2>
<p><strong>光线追踪中对光线有以下的假设：</strong></p>
<ol>
<li>光线是沿直线传播的（尽管这是错误的）</li>
<li>光线和光线不会发生“碰撞”(尽管这仍然是错误的)</li>
<li>光线从光源传播到我们的的眼睛（光路可逆）</li>
</ol>
<h3 id="_1-ray-casting-光线投射" tabindex="-1"><a class="header-anchor" href="#_1-ray-casting-光线投射" aria-hidden="true">#</a> [1]Ray Casting（光线投射）</h3>
<p>Appel 1968 - Ray casting</p>
<ul>
<li>对于成像平面上每一个像素，<strong>从人眼（相机）连一条线，穿过该像素，打出一条光线</strong>，该光线会打到场景中某个位置（物体），有些物体可以被前面的物体遮挡到</li>
<li>将打到的位置，<strong>与光源做一条连线</strong>，如果该连线没有和其他物体相交，即该点可以被光源照到，即形成了一条有效的光路，就可应用着色模型着色；</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/a2206c6cbb39470b8a4497245d46be42.png" alt="在这里插入图片描述"></p>
<p>例如：针孔摄像机模型</p>
<p><img src="https://img-blog.csdnimg.cn/d43fd01a3917431d8f591ee16950b4f5.png" alt="在这里插入图片描述"></p>
<p>从人眼对某像素投射出一条线（eye ray）（有了出射光线）到场景中，找到最近的交点，从该点向光源再连一条线（入射光线），如果该点能被光照到，再根据该点的法线，即可应用着色模型计算出着色，再将计算出的值，写入该像素点</p>
<p>但该算法仍只考虑了光的<strong>一次</strong>弹射</p>
<h3 id="_2-whitted-style-递归光线追踪" tabindex="-1"><a class="header-anchor" href="#_2-whitted-style-递归光线追踪" aria-hidden="true">#</a> [2]Whitted-Style 递归光线追踪</h3>
<p>一种改进的阴影显示照明模型</p>
<p><img src="https://img-blog.csdnimg.cn/5593f84ce64144f883cf68fa13f39570.png" alt="在这里插入图片描述"></p>
<p>与 Ray Casting 不同，Whitted-Style 会<strong>递归多次</strong>计算人眼打出光线的折射，反射，并将每次反射、折射的计算结果<strong>叠加</strong>到像素上，（注意能量损失）</p>
<ul>
<li>primary ray：人眼打出的检测光线；</li>
<li>second ray：折射、反射的光线；</li>
<li>shadow ray：计算可见性的光线；</li>
</ul>
<p>这样基本原理了解后，接下来深入其技术细节</p>
<h2 id="_3-光线与平面交点" tabindex="-1"><a class="header-anchor" href="#_3-光线与平面交点" aria-hidden="true">#</a> ３.光线与平面交点</h2>
<h3 id="_1-光线方程及应用" tabindex="-1"><a class="header-anchor" href="#_1-光线方程及应用" aria-hidden="true">#</a> [1]光线方程及应用</h3>
<p>Ray-Surface Intersection</p>
<p>光线在数学上的定义为射线</p>
<p><img src="https://img-blog.csdnimg.cn/3cd9622a8e434619a14ce743c1856fde.png" alt="在这里插入图片描述"></p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mopen">(</span><span class="mord mathnormal">t</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">o</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">t</span><span class="mord mathnormal">d</span><span class="mpunct">;</span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:0.7811em;vertical-align:-0.1367em;"></span><span class="mord">0</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel amsrm">⩽</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6542em;vertical-align:-0.0391em;"></span><span class="mord mathnormal">t</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord">∞</span></span></span></span></span></p>
<p>在推导出光线于各个物体相交前，这里像推导光线与球相交</p>
<p><img src="https://img-blog.csdnimg.cn/7a6d54210c734ca0bf3f3b9c82b1a6cd.png" alt="在这里插入图片描述"></p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8778em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.00773em;">R</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">:</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mopen">(</span><span class="mord mathnormal">t</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">o</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">t</span><span class="mord mathnormal">d</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">0</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel amsrm">⩽</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6542em;vertical-align:-0.0391em;"></span><span class="mord mathnormal">t</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord">∞</span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">Sp</span><span class="mord mathnormal">h</span><span class="mord mathnormal">ere</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">:</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">p</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">:</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">p</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord mathnormal">c</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8641em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.00773em;">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></span></p>
<p>求它们的交点，也就是说这个点即在光线上，也在球面上（联立方程）</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">o</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.7778em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">t</span><span class="mord mathnormal">d</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord mathnormal">c</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8641em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.00773em;">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></span></p>
<p>最终解出t，t需要有物理意义</p>
<h3 id="_2-光线和隐式表面的求交" tabindex="-1"><a class="header-anchor" href="#_2-光线和隐式表面的求交" aria-hidden="true">#</a> [2]光线和隐式表面的求交</h3>
<p>常见隐式表面的定义：</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9084em;vertical-align:-0.1944em;"></span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.714em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal">p</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">:</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.714em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal">p</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></span></p>
<p>与隐式表面求交也就是这个点即在光线上，也在隐式表面上，联合方程</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">o</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">t</span><span class="mord mathnormal">d</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></span></p>
<h3 id="_3-光线和显式表面的求交" tabindex="-1"><a class="header-anchor" href="#_3-光线和显式表面的求交" aria-hidden="true">#</a> [3]光线和显式表面的求交</h3>
<p>光线和显式表面的求交对于最简单的方法是：通过判断光线是否与三角形表面相交来首先，这种方式很简单，但是性能不好（比如一个有千万级三角格网的场景，就需要计算千万级次），这里先按这种方式然后逐渐深入优化。</p>
<h4 id="光线与三角形求交" tabindex="-1"><a class="header-anchor" href="#光线与三角形求交" aria-hidden="true">#</a> 光线与三角形求交</h4>
<p>通过光线和三角形的求交，也可以实现inside/outside test</p>
<p>这里可以将光线与三角形求交简化为：</p>
<ul>
<li>光线和三角形所在平面求交</li>
<li>检测交点是否在三角形内</li>
</ul>
<p>定义平面方程：（平面由一条法线<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span></span></span></span>和一个点<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9463em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">p</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span></span></span></span>定义)</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9084em;vertical-align:-0.1944em;"></span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.714em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal">p</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">:</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.714em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal">p</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.0519em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.714em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal">p</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8019em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0</span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">a</span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">b</span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.04398em;">cz</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">d</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></span></p>
<p>联合平面方程和光线方程得：</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6151em;"></span><span class="mord mathnormal">t</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.2963em;vertical-align:-0.8674em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.4289em;"><span style="top:-2.1326em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9774em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal">d</span></span><span style="top:-3.2634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.0688em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mopen">(</span><span class="mord"><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.714em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal">p</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.714em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal">o</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1799em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8674em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>当<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7811em;vertical-align:-0.1367em;"></span><span class="mord">0</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel amsrm">⩽</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6542em;vertical-align:-0.0391em;"></span><span class="mord mathnormal">t</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord">∞</span></span></span></span>时光线交于平面</p>
<h4 id="moller-trumbore算法" tabindex="-1"><a class="header-anchor" href="#moller-trumbore算法" aria-hidden="true">#</a> Möller Trumbore算法</h4>
<p>一种更快的方法，该算法通过<strong>重心坐标</strong>表示的三角形计算，可以直接算三角形是否与光线相交。（使用克莱姆法则）</p>
<p><img src="https://img-blog.csdnimg.cn/f63139adb7a64ca7a8e0a11d617c5a08.png" alt="在这里插入图片描述"></p>
<p>尽管如此，使用这种方式判断光线于物体相交还是太慢了。所以后来将对光线与三角形的范围推到对一种光线与一种包含空间对象的容器求交的范围，空间的object完全的被容器包围着。</p>
<p><img src="https://img-blog.csdnimg.cn/3562180ce2f847c587f197afc8d6ce60.png" alt="在这里插入图片描述"></p>
<p>其中最常用的是 box 容器</p>
<h3 id="_4-box包围盒" tabindex="-1"><a class="header-anchor" href="#_4-box包围盒" aria-hidden="true">#</a> [4]Box包围盒</h3>
<p>Box包围盒并不是我们之前理解的立方体（在空间中占据一定体积的物体），它是由三对<strong>对面</strong>取交集组成，每对对面都是无限大的。</p>
<p>我们常用的一种是Axis-Aligned Bounding Box (AABB) 轴对⻬包围盒。如下长方体</p>
<p><img src="https://img-blog.csdnimg.cn/7bb1c3a5bf2e4ad2bdc4518e0bcdee6c.png" alt="在这里插入图片描述"></p>
<h4 id="光线与二维包围盒求交" tabindex="-1"><a class="header-anchor" href="#光线与二维包围盒求交" aria-hidden="true">#</a> 光线与二维包围盒求交</h4>
<p>二维和三维的原理是一样的，这里用二维的场景来简化理解，对于一个二维的包围盒，也就是只有两对”对面“组成的平面（脑补。。。）</p>
<p><img src="https://img-blog.csdnimg.cn/53be0c1e6a344b91aaf1eaf6193d068c.png" alt="在这里插入图片描述"></p>
<p>分别计算出光线与每对对面两个交点，然后取交集。即光线进入所有的边后，才算进入，出离一个边后，就算出去。</p>
<p>核心观点：</p>
<ul>
<li>对于三维来说，光线进入所有<strong>对面</strong>后，才算进入，只要离开任何一对平面后，就算出去。</li>
</ul>
<p>对于每一对，计算 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7651em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">t</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 和  <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7651em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">t</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">ma</span><span class="mord mathnormal mtight">x</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>  (可为负)</p>
<p>对于3D box ，<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7651em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">t</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight">n</span><span class="mord mathnormal mtight">t</span><span class="mord mathnormal mtight" style="margin-right:0.02778em;">er</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">ma</span><span class="mord mathnormal">x</span><span class="mopen">[</span><span class="mord"><span class="mord mathnormal">t</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">]</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">t</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight">x</span><span class="mord mathnormal mtight">i</span><span class="mord mathnormal mtight">t</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">ma</span><span class="mord mathnormal">x</span><span class="mopen">[</span><span class="mord"><span class="mord mathnormal">t</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">ma</span><span class="mord mathnormal mtight">x</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">]</span></span></span></span></p>
<ul>
<li>如果<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7651em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">t</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight">n</span><span class="mord mathnormal mtight">t</span><span class="mord mathnormal mtight" style="margin-right:0.02778em;">er</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7651em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">t</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight">x</span><span class="mord mathnormal mtight">i</span><span class="mord mathnormal mtight">t</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>，即光线在盒子里呆了一段时间，即有交点</li>
<li>如果<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7651em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">t</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight">x</span><span class="mord mathnormal mtight">i</span><span class="mord mathnormal mtight">t</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>，即代表射线位于box内部，即有交点</li>
</ul>
<p>总之，<strong>当且仅当进入时间&lt;离开时间且离开时间&gt;=0时</strong>，有交点</p>
<h4 id="为什么要使用轴对齐" tabindex="-1"><a class="header-anchor" href="#为什么要使用轴对齐" aria-hidden="true">#</a> 为什么要使用轴对齐？</h4>
<p>可以优化运算过程
<img src="https://img-blog.csdnimg.cn/f84ff9804b49402cb50401b09a03a467.png" alt="在这里插入图片描述"></p>
<h2 id="_4-using-aabbs-to-accelerate-ray-tracing" tabindex="-1"><a class="header-anchor" href="#_4-using-aabbs-to-accelerate-ray-tracing" aria-hidden="true">#</a> 4.Using AABBs to accelerate ray tracing</h2>
<h3 id="_1-uniform-spatial-partitions-grids-统一空间分区" tabindex="-1"><a class="header-anchor" href="#_1-uniform-spatial-partitions-grids-统一空间分区" aria-hidden="true">#</a> [1]Uniform Spatial Partitions (Grids)统一空间分区</h3>
<p>这里的和物体相交指的是和物体表面相交，将空间中的包围盒重新划分为更小的包围盒</p>
<p><img src="https://img-blog.csdnimg.cn/fc3fc07bf320453c9b3b5c85cb1b670d.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>右上角图有误</p>
<p>这样就将这个场景进行了预处理了，将灰色的（与物体相交的box）存储起来</p>
</blockquote>
<p>然后就可以做光线追踪了，一条光线从场景中经过，我们只记录与其相交的包围盒，然后判断这个包围盒中是否有物体，如果有，再判断光线与这个物体有没有相交。
<img src="https://img-blog.csdnimg.cn/73bbb42f00ef4e4282b69fd22d4dff35.png" alt="在这里插入图片描述"></p>
<p>比如上图中，在深蓝色的格子与一个物体相交，在此之前有2个有物体的包围盒，但是并不与物体相交</p>
<p>关于怎么寻找相交的包围盒的问题，并不需要与所有的包围盒进行判断，我们可以用光栅化一条线（虎书p161）时用的方法（<strong>bresenham</strong>）来做</p>
<p>因为判断光线与盒子求交比判断光线与物体求交简单得多，所以宁可多做光线与包围盒求交也不做光线与物体求交</p>
<p>关于划分的数量选择：</p>
<ul>
<li>如果划分的包围盒特别少：几乎没有加速效果</li>
<li>如果划分的包围盒特别多：会有很多 <strong>多余的、没有物体的 无效包围盒</strong> 影响效率</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/440e93f61db34b77b2391b43d6c4ed02.png" alt="在这里插入图片描述"></p>
<p>那么对于统一空间分区的使用场景：</p>
<ul>
<li>这样的方法适用于场景内均匀分布的很多物体的情况</li>
<li>对于一个空旷的场景，物体与物体之间距离很大，这样的方法效果就会很差（与上同理）</li>
</ul>
<h3 id="_2-spatial-partitions空间划分" tabindex="-1"><a class="header-anchor" href="#_2-spatial-partitions空间划分" aria-hidden="true">#</a> [2]Spatial Partitions空间划分</h3>
<p>空间划分是基于统一空间分区的不足之处而实现的另一种加速渲染的方法</p>
<ul>
<li><strong>Oct-Tree八叉树</strong>：（把一个包围盒切成八块，二维的情况为四叉树：例如上图。八叉树的缺点是随着维度的升高，其分块的数量会成指数级升高）</li>
<li><strong>KD—Tree</strong>：一刀一刀砍，例如先横砍一刀，然后竖砍一刀（类似于二叉树）</li>
<li>**BSP-Tree：**每次选一次方向来砍</li>
</ul>
<h4 id="kd-tree" tabindex="-1"><a class="header-anchor" href="#kd-tree" aria-hidden="true">#</a> KD-tree</h4>
<p><img src="https://img-blog.csdnimg.cn/8a5c402d1f484fd18345d863b22f4dbb.png" alt="在这里插入图片描述"></p>
<p>逐步的将物体存储在叶子节点上，内部节点不存储物体</p>
<p>在下图中，有一道光线从场景中穿过，第一步是判断这个光线与整个场景的包围盒（A）是否有相交</p>
<p><img src="https://img-blog.csdnimg.cn/22daac1c1a4841b28c796d9233cc90eb.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>上图中做左边1叶子节点处应该还要划分的，这里偷懒不做划分</p>
</blockquote>
<p>如果相交，接着判断光线与其2个子区域1、B是否相交，相交的化在划分节点
<img src="https://img-blog.csdnimg.cn/b17d5a1f91214968ba9b73ccff8e62ef.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>这里2还需划分</p>
</blockquote>
<p>和剩下浅色部分在判断，有交点，划分节点</p>
<p><img src="https://img-blog.csdnimg.cn/de5b263aef654bfda0f0c01d7a23f3d1.png" alt="在这里插入图片描述"></p>
<p>直到求交到叶子节点于光线无交点。（判断完与某块包围盒相交后还要判断是否和内部的物体相交，如果与里面的物体相交则挺划分，直接成为叶子节点）</p>
<ul>
<li><strong>优点</strong>：
利用KD-Tree的结构来构建AABB的好处是倘若光线与哪一部分空间不相交，那么则可以直接省略该部分空间所有子空间的判断过程，进一步提升了加速效率</li>
<li><strong>缺点</strong>：
缺点是判断包围盒与物体的是否相交较难，因此KD-Tree的建立过程不是那么想象的简单，其次同一个物体可能被不同的包围盒同时占有，在每一个包围盒内都要重复存一次这个物体</li>
<li>所以近十年很少用KD-Tree</li>
</ul>
<h3 id="_3-bvh-对象划分" tabindex="-1"><a class="header-anchor" href="#_3-bvh-对象划分" aria-hidden="true">#</a> [3]BVH &amp; 对象划分</h3>
<p>直接通过物体来划分，才是现代的做法，不管是实时的光线追踪还是离线的，基本上应用的都是这样的一种结构。</p>
<p><img src="https://img-blog.csdnimg.cn/098517b01d9d48698f3f63155a27076d.png" alt="在这里插入图片描述"></p>
<p>其划分规则如上图所示：将一个包围盒内的物体先划分成两部分，再重新求他们的包围盒，而不是像KD-tree先将空间划分。</p>
<p>这样的划分方法，可以保证<strong>每个物体只会出现在一个包围盒当中</strong>，避免了KD-Tree的缺点</p>
<p>但是它同样有一个小缺陷，它所<strong>划分的物体的包围盒可能会有交错</strong>，不过影响并不大</p>
<p>关于如何划分包围盒（节点）的方法：</p>
<ul>
<li>
<p>选择要拆分的维度</p>
</li>
<li>
<p>永远沿着包围盒最长的轴划分</p>
</li>
<li>
<p>选择一个中位物体，使得左右两边的物体数量尽可能相等进行划分</p>
<p>（举例：选定一个轴，然后将所有包围盒内的三角形面的重心在这个轴上的坐标进行排序/用堆取中位数，这个三角形面当做中位物体）</p>
</li>
</ul>
<p>终止条件：</p>
<ul>
<li>当节点包含几个元素时停止</li>
</ul>
<p>BVH的伪代码实现参考：</p>
<p><img src="https://img-blog.csdnimg.cn/8f8b8b82cbde45a9986dd5625a6e49d9.png" alt="在这里插入图片描述"></p>
</template>
