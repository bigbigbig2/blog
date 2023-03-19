<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-unbiased-light-transport-methods无偏光线传播">1.Unbiased light transport methods无偏光线传播</RouterLink><ul><li><RouterLink to="#_1-双向路径追踪-bdpt">[1]双向路径追踪（BDPT）</RouterLink></li><li><RouterLink to="#_2-metropolis-light-transport-mlt">[2]Metropolis Light Transport (MLT)</RouterLink></li></ul></li><li><RouterLink to="#_2-有偏的光线传播">2.有偏的光线传播</RouterLink><ul><li><RouterLink to="#_1-photon-mapping光子映射">[1]Photon Mapping光子映射</RouterLink></li><li><RouterLink to="#_2-顶点连接与合并vcm">[2]顶点连接与合并VCM</RouterLink></li></ul></li><li><RouterLink to="#_3-instant-radiosity实时辐射度算法-ir">3.Instant Radiosity实时辐射度算法(IR)</RouterLink></li><li><RouterLink to="#_4-高级外观建模">4.高级外观建模</RouterLink><ul><li><RouterLink to="#_1-non-surface-models非表面模型">[1]Non-surface models非表面模型</RouterLink><ul><li><RouterLink to="#participating-media散射介质">Participating media散射介质</RouterLink></li><li><RouterLink to="#hair-fur-fiber-bcsdf-头发-毛皮-纤维">Hair/fur/fiber (BCSDF)头发/毛皮/纤维</RouterLink></li><li><RouterLink to="#kajiya-kay-model">Kajiya-Kay Model</RouterLink></li><li><RouterLink to="#marschner-model">Marschner Model</RouterLink></li><li><RouterLink to="#granular-material颗粒材料">Granular material颗粒材料</RouterLink></li></ul></li><li><RouterLink to="#_2-surface-models表面模型">[2]Surface models表面模型</RouterLink><ul><li><RouterLink to="#translucent-material-bssrdf-半透明材料">Translucent material (BSSRDF) 半透明材料</RouterLink></li><li><RouterLink to="#cloth布料">Cloth布料</RouterLink></li><li><RouterLink to="#detailed-material-non-statistical-brdf-详细模型">Detailed material (non-statistical BRDF)详细模型</RouterLink></li></ul></li></ul></li></ul></nav>
<p>高级光线传播——有偏和无偏的光线传播：</p>
<ul>
<li>无偏：使用蒙特卡洛方法解积分时，不管用多少样本呢，得到的期望是真实值</li>
<li>有偏：估计出来的期望与真实值不一样。极限情况下收敛到真实值也是有偏的，称为consistent。对应到渲染结果，如果结果相对真实值较模糊，则是有偏的，但当样本足够多结果接近真实值就是一致的</li>
</ul>
<h2 id="_1-unbiased-light-transport-methods无偏光线传播" tabindex="-1"><a class="header-anchor" href="#_1-unbiased-light-transport-methods无偏光线传播" aria-hidden="true">#</a> 1.Unbiased light transport methods无偏光线传播</h2>
<h3 id="_1-双向路径追踪-bdpt" tabindex="-1"><a class="header-anchor" href="#_1-双向路径追踪-bdpt" aria-hidden="true">#</a> [1]双向路径追踪（BDPT）</h3>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20554474be3f41a196d8899a34c02094~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>之前做的路径追踪，利用了光路的可逆性，从相机开始发射路径/光线，连接相机与光源</p>
<p>而双向路径追踪会生成两个不同的子路径，从光源会打出路径，从相机也会打出路径，在着色点把两个路径连起来，就形成了整条路径。</p>
<p>思想很简单，实现很困难。</p>
<p>以下是相同采样率下单向和双向的结果：
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acd40ae900fa4d13a1381931abb58bf1~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<ul>
<li>适用于光传输较为复杂的光的侧面</li>
<li>很难实现，而且很慢</li>
</ul>
<h3 id="_2-metropolis-light-transport-mlt" tabindex="-1"><a class="header-anchor" href="#_2-metropolis-light-transport-mlt" aria-hidden="true">#</a> [2]Metropolis Light Transport (MLT)</h3>
<p>使用马尔科夫链：根据当前的样本生成比较接近的样本，因此对于任意未知的函数，都可以通过马尔科夫链的方法得到一系列的样本，使得这些样本的分布，和被积函数的形状一致。对应在光路上是一个局部方法，当存在一条路径时，可以产生与该路径相似的路径。如下橙色与蓝色路径。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0703bfca13a0485486470d4f1af5fcd5~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>MLT使用了马尔可夫链蒙特卡洛（MCMC）方法</p>
<ul>
<li>用一些 PDF 从当前样本跳转到下一个样本</li>
<li>非常善于在局部探索困难的光路</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdc73e6ba9af43289670908f92890de1~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><strong>MLT缺点：</strong></p>
<ul>
<li>难以估计收敛速度</li>
<li>不保证每个像素的收敛速度相等</li>
<li>通常不用于渲染动画</li>
</ul>
<h2 id="_2-有偏的光线传播" tabindex="-1"><a class="header-anchor" href="#_2-有偏的光线传播" aria-hidden="true">#</a> 2.有偏的光线传播</h2>
<h3 id="_1-photon-mapping光子映射" tabindex="-1"><a class="header-anchor" href="#_1-photon-mapping光子映射" aria-hidden="true">#</a> [1]Photon Mapping光子映射</h3>
<p>非常善于处理镜面-漫反射-镜面(SDS)路径和产生焦散线（<strong>caustics</strong>）
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50075af592964ac8b1e543da5e31cf7d~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>光子映射主要分为两步：</p>
<p><strong>Stage 1 — photon tracing</strong></p>
<ul>
<li>从光源发射光子，反弹它们，直到光子反射到一个漫反射材质表面它就停到那里
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b00a1fbc2f33426490ba5c730ecfb4ee~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></li>
</ul>
<p><strong>Stage 2 — photon collection (final gathering)</strong></p>
<ul>
<li>从相机拍摄子路径，反弹他们周围，直到他们到达漫反射表面</li>
</ul>
<p>finally：计算 - 局部密度估计</p>
<ul>
<li>光子较多的区域应该更明亮</li>
<li>对任何一个着色点取周围最近的N个光子，找出这N个光子的占据的面积，从而算出密度。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/051915ca69824a98841b924ea1165463~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></li>
</ul>
<p>但当N取较小时，噪声大，N取较大时，会模糊。一般应该取足够小的面积，选择面积内的光子数量来计算密度，所以上述计算方式有问题。顺应这个思路，当打出的光子足够多时，相对面积就会很小。
但若取固定的面积来计算，当光子很多时，会导致面积内光子变多，造成结果依旧不准确。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c982bbf349984338b1b467e1b5a95335~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>在渲染里，很容易判断是有偏的还是无偏的，就是通过计算判断其渲染结果是否有模糊，有任何一点模糊都是有偏的</p>
<ul>
<li>Biased == blurry</li>
</ul>
</blockquote>
<h3 id="_2-顶点连接与合并vcm" tabindex="-1"><a class="header-anchor" href="#_2-顶点连接与合并vcm" aria-hidden="true">#</a> [2]顶点连接与合并VCM</h3>
<p>BDPT(双向路径追逐)与光子映射的结合，推导很复杂，想法简单：</p>
<ul>
<li>如果 BDPT 中的子路径的端点不能连接但可以合并，那么就不要浪费它们</li>
<li>使用光子映射来处理附近“光子”的合并</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11867cf261eb458fa3f16630e1fa3302~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h2 id="_3-instant-radiosity实时辐射度算法-ir" tabindex="-1"><a class="header-anchor" href="#_3-instant-radiosity实时辐射度算法-ir" aria-hidden="true">#</a> 3.Instant Radiosity实时辐射度算法(IR)</h2>
<p>简单理解：很多光源的算法，使用已经被照亮的面来当作光源去照射其他的面
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b86b98a5abe24628a45acee55ee79898~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<ul>
<li>发射光子路径，并假设每个子路径的终点是虚点光源(VPL)</li>
<li>使用这些 VPL 渲染场景</li>
</ul>
<p>优点: 快速，通常在漫反射场景中给出很好的效果</p>
<p>缺点：</p>
<ul>
<li>尖峰会出现当 VPL 接近阴影点</li>
<li>不能处理光泽材质</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3466e6c5b3d4c778fee001facd8cdc5~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>游戏、电影界现在比较常用的还是Ray Tracing，尽管有些年代了。</p>
</blockquote>
<h2 id="_4-高级外观建模" tabindex="-1"><a class="header-anchor" href="#_4-高级外观建模" aria-hidden="true">#</a> 4.高级外观建模</h2>
<h3 id="_1-non-surface-models非表面模型" tabindex="-1"><a class="header-anchor" href="#_1-non-surface-models非表面模型" aria-hidden="true">#</a> [1]Non-surface models非表面模型</h3>
<h4 id="participating-media散射介质" tabindex="-1"><a class="header-anchor" href="#participating-media散射介质" aria-hidden="true">#</a> Participating media散射介质</h4>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53f0d80e35594d3992384adf870f9f58~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>当光线通过一个散射介质时，它可以被(部分)吸收和散射。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97e4f214a3ba4bdb9c0615431374df9b~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>也就是光线在传播过程中会发生两件事：被吸收和被散射</p>
</blockquote>
<p>使用相位函数（Phase Function ）定义参与/散射介质中任一点 x 上光散射的角度分布</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ada627b685b6454f8be620e9b98c2507~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>渲染方式：</p>
<p>光线往某方向走多远取决于介质的吸收能力和光的能量</p>
<ul>
<li>随机选择一个反弹方向</li>
<li>随机选择一个直行的距离</li>
<li>在每个“阴影点”，连接到光源</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54b72998b23848ff8669851a9dd5ca57~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="hair-fur-fiber-bcsdf-头发-毛皮-纤维" tabindex="-1"><a class="header-anchor" href="#hair-fur-fiber-bcsdf-头发-毛皮-纤维" aria-hidden="true">#</a> Hair/fur/fiber (BCSDF)头发/毛皮/纤维</h4>
<p>需要考虑光线与每根头发的作用。下面有集中相关的作用模型</p>
<h4 id="kajiya-kay-model" tabindex="-1"><a class="header-anchor" href="#kajiya-kay-model" aria-hidden="true">#</a> Kajiya-Kay Model</h4>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4714dab969cd4363a5b544360c0ac4f7~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>光线打到头发上会散射出一个圆锥，该模型的效果并不好</p>
<h4 id="marschner-model" tabindex="-1"><a class="header-anchor" href="#marschner-model" aria-hidden="true">#</a> Marschner Model</h4>
<p>广泛被应用的模型：</p>
<ul>
<li>光线不仅会反射（R）</li>
<li>穿进头发发生折射（T）</li>
<li>穿进头发再穿出（TT）</li>
<li>穿透反射再穿透（TRT）</li>
</ul>
<p>Marschner Model将头发当成一个玻璃圆柱，外层叫cuticle，里面叫cortex，cortex中包含色素
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eefb57b4099c432eb0e0a8e20756557b~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>光线跟头发会产生多次散射，渲染很困难，计算量很大。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4781df471b143abaf24c682f975d80f~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><strong>注意</strong>：人的头发模型并不足以表示动物毛发的模型，生物结构上不同。动物的毛的髓质多。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f1ce2b2de9f4dbeb29c79a20dde4b27~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="granular-material颗粒材料" tabindex="-1"><a class="header-anchor" href="#granular-material颗粒材料" aria-hidden="true">#</a> Granular material颗粒材料</h4>
<p>远看是沙丘，近看是小颗粒堆积的。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef9f2da8280e4e2b8680084f3f9856f8~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_2-surface-models表面模型" tabindex="-1"><a class="header-anchor" href="#_2-surface-models表面模型" aria-hidden="true">#</a> [2]Surface models表面模型</h3>
<h4 id="translucent-material-bssrdf-半透明材料" tabindex="-1"><a class="header-anchor" href="#translucent-material-bssrdf-半透明材料" aria-hidden="true">#</a> Translucent material (BSSRDF) 半透明材料</h4>
<p><strong>次表面散射：</strong></p>
<ul>
<li>光线从一个点进入表面，在内部发生了大量散射，最终再出去</li>
<li>违反了 BRDF 的基本假设（可以说是对BRDF的扩展）</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b6e92d565e848e7be528ff07d0dfbcc~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>BRDF的所有作用都发生在一个点上，而BSSRDF是由一个方向进来，但是可以从其他方向出去， 进来和出去的点不一定一样。渲染方程要考虑对表面其他地方进入的光线，要对面积进行积分。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdb1f0e6484e4f158a5dadf3e99f6424~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>BSSRDF如果按照上面的思路来实现的话其实是很复杂的，那么引入了一个新的概念——Dipole Approximation偶极子近似[ Jensen et al. 2001]</p>
<p>通过引入两个点源，近似光扩散。比如常见的半透明物质，你在观察一个光源照射到它的表面时，它的内部是不是很像有一个上面光源。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a0a956b47264052a43d482291dced25~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><strong>BRDF vs BSSRDF</strong>
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d020d1d3af214bbabfe0bbaf2c1dc054~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b26f6e9507141e2be76f1ca2757e272~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述">
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/556c4e88ddc848f284950d94c15799c4~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><a href="https://cgelves.com/10-most-realistic-human-3d-models-that-will-wow-you/?v=69e1aafeccc5" target="_blank" rel="noopener noreferrer">10个渲染得最真实的人物模型</a></p>
<h4 id="cloth布料" tabindex="-1"><a class="header-anchor" href="#cloth布料" aria-hidden="true">#</a> Cloth布料</h4>
<p>布料的构造：纤维Ply缠绕成股Yarn，股缠绕成线，由线编制为布
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5191cc14f5164ccab9790e5be4b86a32~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>布料渲染方法（常见的三种方式）：</p>
<ol>
<li>当表面模型进行渲染，不同的织法有不同的BRDF（简单，效果也不错）</li>
<li>但对天鹅绒这种织物没办法像上述那样做。因此把织物认为是空间中分布的体积，划分成超级细小的格子，每个格子里知道纤维的分布与朝向，分开来计算。即将织物当作一个体积，知道体积中微小的块的性质。类似云烟的渲染。</li>
<li>最暴力的做法把每根纤维渲染出来，像头发一样</li>
</ol>
<h4 id="detailed-material-non-statistical-brdf-详细模型" tabindex="-1"><a class="header-anchor" href="#detailed-material-non-statistical-brdf-详细模型" aria-hidden="true">#</a> Detailed material (non-statistical BRDF)详细模型</h4>
<p>很多模型使用相应的理论渲染出来的结果或许会太完美，导致与实物有所不同
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41043b0bc06d43248b1ed1a8ceb46c4a~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
</template>
