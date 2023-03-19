<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-physical-basis-of-color颜色的物理基础">1.Physical Basis of Color颜色的物理基础</RouterLink><ul><li><RouterLink to="#_1-光的基本组成部分">[1]光的基本组成部分</RouterLink></li><li><RouterLink to="#_2-可见光谱">[2]可见光谱</RouterLink></li><li><RouterLink to="#_3-spectral-power-distribution-spd-谱功率密度">[3]Spectral Power Distribution（SPD 谱功率密度）</RouterLink></li></ul></li><li><RouterLink to="#_2-biological-basis-of-color颜色的生物基础">2.Biological Basis of Color颜色的生物基础</RouterLink><ul><li><RouterLink to="#_1-什么是颜色">[1]什么是颜色</RouterLink></li><li><RouterLink to="#_2-人眼解剖学">[2]人眼解剖学</RouterLink><ul><li><RouterLink to="#视网膜上的感光细胞">视网膜上的感光细胞</RouterLink></li></ul></li><li><RouterLink to="#_3-色彩的三色理论">[3]色彩的三色理论</RouterLink></li></ul></li><li><RouterLink to="#_3-同色异普">3.同色异普</RouterLink></li><li><RouterLink to="#_4-color-reproduction-matching色彩复制-配色">4.Color Reproduction / Matching色彩复制/配色</RouterLink><ul><li><RouterLink to="#_1-cie-rgb颜色匹配">[1]CIE RGB颜色匹配</RouterLink></li></ul></li><li><RouterLink to="#_5-color-spaces颜色空间">5.Color Spaces颜色空间</RouterLink><ul><li><RouterLink to="#_1-standardized-rgb-srgb">[1]Standardized RGB (sRGB)</RouterLink><ul><li><RouterLink to="#rgba">RGBA</RouterLink></li><li><RouterLink to="#rgb-颜色表示法的局限性">RGB 颜色表示法的局限性</RouterLink></li></ul></li><li><RouterLink to="#_2-cie-xyz">[2]CIE XYZ</RouterLink><ul><li><RouterLink to="#色域gamut">色域Gamut</RouterLink></li></ul></li></ul></li><li><RouterLink to="#_6-perceptually-organized-color-spaces感知组织的色彩空间">6.Perceptually Organized Color Spaces感知组织的色彩空间</RouterLink><ul><li><RouterLink to="#_1-hsv-hsl颜色空间">[1]HSV/HSL颜色空间</RouterLink><ul><li><RouterLink to="#hsl-和-hsv-的局限性">HSL 和 HSV 的局限性</RouterLink></li></ul></li><li><RouterLink to="#_2-cie-lab色彩空间">[2]CIE Lab色彩空间</RouterLink></li></ul></li><li><RouterLink to="#_7-互补色理论">7.互补色理论</RouterLink></li><li><RouterLink to="#_8-减色系统cmyk">8.减色系统CMYK</RouterLink></li></ul></nav>
<h2 id="_1-physical-basis-of-color颜色的物理基础" tabindex="-1"><a class="header-anchor" href="#_1-physical-basis-of-color颜色的物理基础" aria-hidden="true">#</a> 1.Physical Basis of Color颜色的物理基础</h2>
<h3 id="_1-光的基本组成部分" tabindex="-1"><a class="header-anchor" href="#_1-光的基本组成部分" aria-hidden="true">#</a> [1]光的基本组成部分</h3>
<p>牛顿对光的发现：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6897aa768e784c1c92ee71a670cb338e~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>一个白光早穿过棱镜后出现多种光是因为它们的折射率的不同导致</p>
<h3 id="_2-可见光谱" tabindex="-1"><a class="header-anchor" href="#_2-可见光谱" aria-hidden="true">#</a> [2]可见光谱</h3>
<ul>
<li>光谱——不同的波长对应不同的折射率</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d7df522e41c4d31b5f160461c7f1ae4~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>而物理上的可见光位于波长400~700范围中，图形学通常关注可见光部分</p>
<h3 id="_3-spectral-power-distribution-spd-谱功率密度" tabindex="-1"><a class="header-anchor" href="#_3-spectral-power-distribution-spd-谱功率密度" aria-hidden="true">#</a> [3]Spectral Power Distribution（SPD 谱功率密度）</h3>
<p>测量光的显著特性</p>
<ul>
<li>每个波长的光量</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df8d8e36641145789cc7ed657f06220b~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/030d7e794cf04315afbe0c69f5cdddcb~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>多种光混合之后的SPD等于单个光对应得SPD相加，如下图所示</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb365dbed375441eb8ac8666720bc98c~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h2 id="_2-biological-basis-of-color颜色的生物基础" tabindex="-1"><a class="header-anchor" href="#_2-biological-basis-of-color颜色的生物基础" aria-hidden="true">#</a> 2.Biological Basis of Color颜色的生物基础</h2>
<h3 id="_1-什么是颜色" tabindex="-1"><a class="header-anchor" href="#_1-什么是颜色" aria-hidden="true">#</a> [1]什么是颜色</h3>
<ul>
<li>颜色是人感知的结果；并非物理上的普适概念</li>
<li>不同波长的光不是“颜色”</li>
</ul>
<h3 id="_2-人眼解剖学" tabindex="-1"><a class="header-anchor" href="#_2-人眼解剖学" aria-hidden="true">#</a> [2]人眼解剖学</h3>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a44cb51a49546da83c299a3199bba8a~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="视网膜上的感光细胞" tabindex="-1"><a class="header-anchor" href="#视网膜上的感光细胞" aria-hidden="true">#</a> 视网膜上的感光细胞</h4>
<p>Retinal Photoreceptor Cells: Rods（杆） and Cones（锥）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d457c68ad3ce4de5b6920f8671fff714~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>Rods：</p>
<ul>
<li>眼睛里有一亿两千万根杆子</li>
<li>用来感知光的强度，得到灰度图， 没有颜色</li>
</ul>
<p>Cones：</p>
<ul>
<li>眼睛里有600-700万个视锥细胞</li>
<li>用来感知颜色</li>
<li>分为三种不同的锥型细胞S-con、M-Con、L-Con</li>
</ul>
<p>三种细胞对不同波长的响应各不相同
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf2d0620dc6145d78786fb5d4f459480~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>不同的人的这三种细胞的分布和数量差异很大，下面这幅图展示的是12个正常视力的人的三种锥形细胞分布情况</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e15e90622ee54b3dadc8102241e81106~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_3-色彩的三色理论" tabindex="-1"><a class="header-anchor" href="#_3-色彩的三色理论" aria-hidden="true">#</a> [3]色彩的三色理论</h3>
<p>知道光在不同波长上的分布，某细胞对某波长的响应是多少，感知的结果S、M、L是将两者积分即可得到，即响应曲线和SPD的积分。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae7eecd8befb47e6b894a24f06611c91~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>给定任何一种光线，人们看到的是S，M，L三个数，不知道原本光线的分布（SPD）</p>
<p>[4]人类视觉系统</p>
<ul>
<li>
<p>人眼无法测量，大脑也无法接收有关每种光波长的信息</p>
</li>
<li>
<p>相反，眼睛只“看到”三个响应值（S、M、L），而这只是大脑可用的信息</p>
</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43d3276f5f3c4496b578081e6b2bd453~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h2 id="_3-同色异普" tabindex="-1"><a class="header-anchor" href="#_3-同色异普" aria-hidden="true">#</a> 3.同色异普</h2>
<p>根据上面的色彩三色理论可以推想到，尽管两种光线不同光谱，但经过上述积分后，得到的SML是相同的，那么人们看到的颜色是相同的。（还可以出同一物体每个人看到的是不一样的），如下图尽管它们的SPD不同，但是它们最终显示的颜色还是一样的。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4ab23eb11f3432ab527fe412175c9ae~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>通过显示器的三色光，可以混合出现实中的种种颜色，但背后的光谱一般是不一样的。</p>
<h2 id="_4-color-reproduction-matching色彩复制-配色" tabindex="-1"><a class="header-anchor" href="#_4-color-reproduction-matching色彩复制-配色" aria-hidden="true">#</a> 4.Color Reproduction / Matching色彩复制/配色</h2>
<p>计算机中的颜色系统是加色系统。即RGB三个值最高是混合为白色。绘画印刷是减色系统。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4beb9c76039b4ab9892aa152793fe059~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>加色系统：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/785891337273408c97cc8b54a8bdae83~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>通过将一些颜色混合可以调处别的颜色。但有些颜色怎么也混合不出，通过给这些颜色加色就可以混合出，即将最后混合的颜色减去加上的颜色，就可以混合出该颜色。因此有些颜色的取值是负的。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60b50f728dd34058adfddc8fdf7c1014~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_1-cie-rgb颜色匹配" tabindex="-1"><a class="header-anchor" href="#_1-cie-rgb颜色匹配" aria-hidden="true">#</a> [1]CIE RGB颜色匹配</h3>
<p>实验：给出三种都是单一波长的光，目标光也是单一波长的光，将多少强度的三种光混合得到和目标光一样的颜色。</p>
<p>颜色匹配函数：描述了三种主光各自多少强度加起来得到给定波长的光的颜色。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/191bc6680f8e44a8b9c23fbbd13fb4bc~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>现实中的光是许多不同强度的单一波长光的积分</p>
<h2 id="_5-color-spaces颜色空间" tabindex="-1"><a class="header-anchor" href="#_5-color-spaces颜色空间" aria-hidden="true">#</a> 5.Color Spaces颜色空间</h2>
<h3 id="_1-standardized-rgb-srgb" tabindex="-1"><a class="header-anchor" href="#_1-standardized-rgb-srgb" aria-hidden="true">#</a> [1]Standardized RGB (sRGB)</h3>
<ul>
<li>广泛应用于我们现在的显示设备</li>
<li>制造方式
<ul>
<li>先制造一台标准的显示器，测定它的匹配函数</li>
<li>大家按照这个标准去制造，得到的结果就和标准的一致了</li>
</ul>
</li>
<li>形成的色域（gamut）是有限的</li>
</ul>
<p>例如web端常用的RGB颜色表示法：</p>
<p>#RRGGBB的颜色代码，就是 RGB 颜色的十六进制表示法，其中 RR、GG、BB 分别是两位十六进制数字，表示红、绿、蓝三色通道的色阶，色阶可以表示某个通道的强弱。每个通道一共有 <code>256</code> 阶，取值是 0 到 255。RGB 的三个通道色阶的组合，理论上一共能表示 2的24次方。也就是一共 16777216 种不同的颜色。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec025960cf2d47eca4e4d2e7924b6255~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>但是RGB并不能表示人眼所能见到的所有颜色
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce444adb3e184207b6410fd906de01b7~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="rgba" tabindex="-1"><a class="header-anchor" href="#rgba" aria-hidden="true">#</a> RGBA</h4>
<p>它其实就是在 RGB 的基础上增加了一个 Alpha 通道，也就是透明度。一些新版本的浏览器，可以用 #RRGGBBAA 的形式来表示 RGBA 色值</p>
<p>（注意：这里的 alpha 是一个从 0 到 1 的数）</p>
<p><code>WebGL</code> 的 shader 默认支持 RGBA。因为在 WebGL 的 shader 中，我们是使用一个四维向量来表示颜色的，向量的 r、g、b、a 分量分别表示红色、绿色、蓝色和 alpha 通道</p>
<p>不过和 CSS 的颜色表示稍有不同的是，WebGL 采用归一化的浮点数值，也就是说，WebGL 的颜色分量 r、g、b、a 的数值都是 0 到 1 之间的浮点数。</p>
<h4 id="rgb-颜色表示法的局限性" tabindex="-1"><a class="header-anchor" href="#rgb-颜色表示法的局限性" aria-hidden="true">#</a> RGB 颜色表示法的局限性</h4>
<p>对一个 RGB 颜色来说，我们只能大致直观地判断出它偏向于红色、绿色还是蓝色，或者在颜色立方体的大致位置。所以，在对比两个 RGB 颜色的时候，我们只能通过对比它们在 RGB 立方体中的相对距离，来判断它们的颜色差异。除此之外，我们几乎就得不到其他任何有用的信息了。</p>
<p>也就是说，当要选择一组颜色给图表使用时，我们并不知道要以什么样的规则来配置颜色，才能让不同数据对应的图形之间的对比尽可能鲜明</p>
<p>在需要动态构建视觉颜色效果的时候，我们很少直接选用 RGB 色值，而是使用其他的颜色表示形式。这其中，比较常用的就是 HSL 和 HSV 颜色表示形式</p>
<h3 id="_2-cie-xyz" tabindex="-1"><a class="header-anchor" href="#_2-cie-xyz" aria-hidden="true">#</a> [2]CIE XYZ</h3>
<ul>
<li>科学上应用更广泛</li>
<li>人造的颜色匹配系统，不是实验测出来的</li>
<li>匹配函数曲线如下</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23b26e8a26c0431b8414f9d5b1743080~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<ul>
<li>Y表示亮度，没有负数</li>
<li>将<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.07153em;">Z</span><span class="mclose">)</span></span></span></span>归一化，然后对（x，y）进行枚举，得到一张二维图像，表示在Y（亮度）固定的情况下，不同XZ对应的颜色。色域是一个颜色空间所有可能显示的颜色，下图右边就是色域。</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75ed7025746e444eaf1109041cf4242e~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="色域gamut" tabindex="-1"><a class="header-anchor" href="#色域gamut" aria-hidden="true">#</a> 色域Gamut</h4>
<p>一个颜色空间所能表示的颜色的范围，如下图</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55e0a48045344821957b8e6786802a19~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<ul>
<li>色域的中心是白色的（最不纯）</li>
<li>色域的边缘则是纯色</li>
</ul>
<h2 id="_6-perceptually-organized-color-spaces感知组织的色彩空间" tabindex="-1"><a class="header-anchor" href="#_6-perceptually-organized-color-spaces感知组织的色彩空间" aria-hidden="true">#</a> 6.Perceptually Organized Color Spaces感知组织的色彩空间</h2>
<h3 id="_1-hsv-hsl颜色空间" tabindex="-1"><a class="header-anchor" href="#_1-hsv-hsl颜色空间" aria-hidden="true">#</a> [1]HSV/HSL颜色空间</h3>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0345b432b6824c9ca79def6318fc64b2~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>HSL 和 HSV 用色相/色调（Hue）、饱和度（Saturation）和亮度（Lightness）或明度（Value）来表示颜色。其中，Hue 是角度，取值范围是 0 到 360 度，饱和度和亮度/明度的值都是从0到100%如上图</p>
<ul>
<li>色相/色调（Hue）：不同颜色</li>
<li>饱和度（Saturation）：接近单色还是白色</li>
<li>明度（Value）：亮度（黑色到有色）</li>
</ul>
<p>我们可以把 <code>HSL</code> 和 <code>HSV</code> 颜色理解为，是将 RGB 颜色的立方体从直角坐标系投影到极坐标的圆柱上，所以它的色值和<code>RGB</code>色值是一一对应的。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10bf1361fef04bffb1878e433a97342a~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>CSS 和 Canvas2D 都可以直接支持 HSL 颜色，而 WebGL 需要通过算法转换（下面为RGB于HSL转换的代码）</p>
</blockquote>
<div class="language-glsl ext-glsl line-numbers-mode"><pre v-pre class="language-glsl"><code><span class="token keyword">vec3</span> <span class="token function">rgb2hsv</span><span class="token punctuation">(</span><span class="token keyword">vec3</span> c<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">vec4</span> K <span class="token operator">=</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1.0</span> <span class="token operator">/</span> <span class="token number">3.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span> <span class="token operator">/</span> <span class="token number">3.0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">vec4</span> p <span class="token operator">=</span> <span class="token function">mix</span><span class="token punctuation">(</span><span class="token keyword">vec4</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>bg<span class="token punctuation">,</span> K<span class="token punctuation">.</span>wz<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>gb<span class="token punctuation">,</span> K<span class="token punctuation">.</span>xy<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">step</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>b<span class="token punctuation">,</span> c<span class="token punctuation">.</span>g<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">vec4</span> q <span class="token operator">=</span> <span class="token function">mix</span><span class="token punctuation">(</span><span class="token keyword">vec4</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>xyw<span class="token punctuation">,</span> c<span class="token punctuation">.</span>r<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>r<span class="token punctuation">,</span> p<span class="token punctuation">.</span>yzx<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">step</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>x<span class="token punctuation">,</span> c<span class="token punctuation">.</span>r<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">float</span> d <span class="token operator">=</span> q<span class="token punctuation">.</span>x <span class="token operator">-</span> <span class="token function">min</span><span class="token punctuation">(</span>q<span class="token punctuation">.</span>w<span class="token punctuation">,</span> q<span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">float</span> e <span class="token operator">=</span> <span class="token number">1.0e-10</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">vec3</span><span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>q<span class="token punctuation">.</span>z <span class="token operator">+</span> <span class="token punctuation">(</span>q<span class="token punctuation">.</span>w <span class="token operator">-</span> q<span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token number">6.0</span> <span class="token operator">*</span> d <span class="token operator">+</span> e<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> d <span class="token operator">/</span> <span class="token punctuation">(</span>q<span class="token punctuation">.</span>x <span class="token operator">+</span> e<span class="token punctuation">)</span><span class="token punctuation">,</span> q<span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">vec3</span> <span class="token function">hsv2rgb</span><span class="token punctuation">(</span><span class="token keyword">vec3</span> c<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">vec3</span> rgb <span class="token operator">=</span> <span class="token function">clamp</span><span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span><span class="token function">mod</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>x<span class="token operator">*</span><span class="token number">6.0</span><span class="token operator">+</span><span class="token keyword">vec3</span><span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">,</span><span class="token number">4.0</span><span class="token punctuation">,</span><span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">6.0</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">3.0</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  rgb <span class="token operator">=</span> rgb <span class="token operator">*</span> rgb <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">3.0</span> <span class="token operator">-</span> <span class="token number">2.0</span> <span class="token operator">*</span> rgb<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> c<span class="token punctuation">.</span>z <span class="token operator">*</span> <span class="token function">mix</span><span class="token punctuation">(</span><span class="token keyword">vec3</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> rgb<span class="token punctuation">,</span> c<span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="hsl-和-hsv-的局限性" tabindex="-1"><a class="header-anchor" href="#hsl-和-hsv-的局限性" aria-hidden="true">#</a> HSL 和 HSV 的局限性</h4>
<p>HSL 依然不是最完美的颜色方法，我们还需要建立一套针对人类知觉的标准，这个标准在描述颜色的时候要尽可能地满足以下 2 个原则：</p>
<ul>
<li>人眼看到的色差 = 颜色向量间的欧氏距离</li>
<li>相同的亮度，能让人感觉亮度相同</li>
</ul>
<p>于是，一个针对人类感觉的颜色描述方式就产生了，它就是 CIE Lab</p>
<h3 id="_2-cie-lab色彩空间" tabindex="-1"><a class="header-anchor" href="#_2-cie-lab色彩空间" aria-hidden="true">#</a> [2]CIE Lab色彩空间</h3>
<p>CIE Lab 颜色空间简称 Lab，它其实就是一种符合人类感觉的色彩空间，它用L表示亮度，a和b表示颜色对立度。RGB 值也可以 Lab 转换，但是转换规则比较复杂
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c4424ab1404444190417240f48abbdc~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>CIE Lab与感知有关。一个轴的两端是互补色。白-黑，红-绿，黄-蓝。</p>
<p>CIE Lab 比较特殊的一点是，目前还没有能支持 CIE Lab 的图形系统，但是css-color level4规范已经给出了 Lab 颜色值的定义</p>
<p>而且，一些 JavaScript 库也已经可以直接处理 Lab 颜色空间了，如d3-color。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/657126e77f2149f8b6266636de8163ba~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>你会发现，在以 CIELab 方式呈现的色彩变化中，我们设置的数值和人眼感知的一致性比较强。</p>
</blockquote>
<h2 id="_7-互补色理论" tabindex="-1"><a class="header-anchor" href="#_7-互补色理论" aria-hidden="true">#</a> 7.互补色理论</h2>
<p>根据人眼的感知的一个现象：</p>
<ul>
<li>
<p>红绿互补</p>
</li>
<li>
<p>蓝黄互补</p>
</li>
<li>
<p>白黑互补</p>
</li>
</ul>
<p>白色-黑色轴是亮度，其他轴决定色调和饱和度</p>
<p>根据人的视觉暂留时间，当你盯着一幅某一颜色画面久了之后，撤去画面你会看到互补色</p>
<p>还有一个有以上的视觉感知现象——错视觉
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fb7f91ee1d542edad99fa1e39b0c4ad~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述">
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71109753fadb4e88a878bd571049129a~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h2 id="_8-减色系统cmyk" tabindex="-1"><a class="header-anchor" href="#_8-减色系统cmyk" aria-hidden="true">#</a> 8.减色系统CMYK</h2>
<p>减色系统-颜色混得越多越黑——打印机</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc231afc01b6425ba7666baa75be38ef~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>加色系统颜色混的越多越白</p>
</template>
