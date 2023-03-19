<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-向量究竟是什么">1.向量究竟是什么</RouterLink><ul><li><RouterLink to="#_1-从物理学角度">[1]从物理学角度</RouterLink></li><li><RouterLink to="#_2-从计算机专业角度">[2]从计算机专业角度</RouterLink></li><li><RouterLink to="#_3-从数学角度">[3]从数学角度</RouterLink></li><li><RouterLink to="#_4-思考向量的特点方式">[4]思考向量的特点方式</RouterLink><ul><li><RouterLink to="#向量是空间中的箭头">向量是空间中的箭头</RouterLink></li><li><RouterLink to="#向量是有序的数字列表">向量是有序的数字列表</RouterLink></li><li><RouterLink to="#三维空间中的向量">三维空间中的向量</RouterLink></li></ul></li><li><RouterLink to="#_5-向量加法和向量数乘">[5]向量加法和向量数乘</RouterLink><ul><li><RouterLink to="#向量加法">向量加法</RouterLink></li><li><RouterLink to="#向量数乘">向量数乘</RouterLink></li><li><RouterLink to="#总结">总结</RouterLink></li></ul></li></ul></li><li><RouterLink to="#_2-线性组合、张成的空间与基">2.线性组合、张成的空间与基</RouterLink><ul><li><RouterLink to="#_1-线性组合">[1]线性组合</RouterLink></li><li><RouterLink to="#_2-张成的空间">[2]张成的空间</RouterLink><ul><li><RouterLink to="#二维向量的张成的空间">二维向量的张成的空间</RouterLink></li><li><RouterLink to="#三维向量的张成的空间">三维向量的张成的空间</RouterLink></li></ul></li><li><RouterLink to="#_3-线性相关">[3]线性相关</RouterLink></li><li><RouterLink to="#_4-线性无关">[4]线性无关</RouterLink></li><li><RouterLink to="#_5-基的定义">[5]基的定义</RouterLink></li></ul></li><li><RouterLink to="#_3-矩阵与线性变换">3.矩阵与线性变换</RouterLink><ul><li><RouterLink to="#_1-线性变换">[1]线性变换</RouterLink></li><li><RouterLink to="#_2-使用数值来描述线性变换">[2]使用数值来描述线性变换</RouterLink></li><li><RouterLink to="#_3-矩阵">[3]矩阵</RouterLink></li><li><RouterLink to="#_4-使用矩阵来线性线性变换">[4]使用矩阵来线性线性变换</RouterLink><ul><li><RouterLink to="#旋转变换">旋转变换</RouterLink></li><li><RouterLink to="#剪切变换">剪切变换</RouterLink></li></ul></li><li><RouterLink to="#_5-总结">[5]总结</RouterLink></li></ul></li><li><RouterLink to="#_4-矩阵乘法与线性变换复合的联系">4.矩阵乘法与线性变换复合的联系</RouterLink><ul><li><RouterLink to="#_1-复合变换">[1]复合变换</RouterLink></li><li><RouterLink to="#_2-通过矩阵相乘几何意义思考问题">[2]通过矩阵相乘几何意义思考问题</RouterLink></li><li><RouterLink to="#_3-三维空间的线性变换">[3]三维空间的线性变换</RouterLink></li></ul></li><li><RouterLink to="#_5-行列式">5.行列式</RouterLink><ul><li><RouterLink to="#_1-行列式的定义">[1]行列式的定义</RouterLink></li><li><RouterLink to="#_2-空间定向">[2]空间定向</RouterLink></li><li><RouterLink to="#_3-在三维空间中的行列式">[3]在三维空间中的行列式</RouterLink></li><li><RouterLink to="#_4-三维空间中的定向">[4]三维空间中的定向</RouterLink></li><li><RouterLink to="#_5-结合行列式的数学计算">[5]结合行列式的数学计算</RouterLink></li></ul></li><li><RouterLink to="#_6-逆矩阵、列空间与零空间">6.逆矩阵、列空间与零空间</RouterLink><ul><li><RouterLink to="#_1-矩阵的用途">[1]矩阵的用途</RouterLink></li><li><RouterLink to="#_2-利用矩阵求解方程组">[2]利用矩阵求解方程组</RouterLink></li><li><RouterLink to="#_3-逆矩阵">[3]逆矩阵</RouterLink></li><li><RouterLink to="#_4-秩">[4]秩</RouterLink></li><li><RouterLink to="#_5-列空间">[5]列空间</RouterLink></li><li><RouterLink to="#_6-零空间">[6]零空间</RouterLink></li><li><RouterLink to="#总结-1">总结</RouterLink></li></ul></li><li><RouterLink to="#_7-非方正不同维度之间的线性转换">7.非方正不同维度之间的线性转换</RouterLink><ul><li><RouterLink to="#_1-几何意义">[1]几何意义</RouterLink></li><li><RouterLink to="#_2-非方阵乘法">[2]非方阵乘法</RouterLink></li></ul></li><li><RouterLink to="#_3-非方阵行列式">[3]非方阵行列式</RouterLink></li><li><RouterLink to="#_8-点积与对偶性">8.点积与对偶性</RouterLink><ul><li><RouterLink to="#_1-点积">[1]点积</RouterLink></li><li><RouterLink to="#_2-点积与投影">[2]点积与投影</RouterLink></li><li><RouterLink to="#_3-对偶性">[3]对偶性</RouterLink></li><li><RouterLink to="#总结-2">总结：</RouterLink></li></ul></li><li><RouterLink to="#_9-叉积标准及介绍">9.叉积标准及介绍</RouterLink><ul><li><RouterLink to="#_1-叉积的定义">[1]叉积的定义</RouterLink></li><li><RouterLink to="#_2-叉积计算公式">[2]叉积计算公式</RouterLink></li></ul></li><li><RouterLink to="#_10-以线性变换的思想看叉积">10.以线性变换的思想看叉积</RouterLink></li><li><RouterLink to="#参考">参考：</RouterLink></li></ul></nav>
<p><strong>将只停留在数值运算和公式的线性代数推进到可视化几何直观（Visual Geometric Intuition）的理解领悟上</strong>，本文为<a href="https://www.3blue1brown.com/" target="_blank" rel="noopener noreferrer">3BlueBrown</a>线性代数的本质学习笔记。</p>
<h2 id="_1-向量究竟是什么" tabindex="-1"><a class="header-anchor" href="#_1-向量究竟是什么" aria-hidden="true">#</a> 1.向量究竟是什么</h2>
<p>线性代数中最基础，最根源的组成部分就是向量。</p>
<p>一般来说有三种看待向量的观点，看似不同却有所关联，分别为在物理学，数学，计算机上的观点。</p>
<h3 id="_1-从物理学角度" tabindex="-1"><a class="header-anchor" href="#_1-从物理学角度" aria-hidden="true">#</a> [1]从物理学角度</h3>
<ul>
<li>向量是<strong>空间中的箭头</strong></li>
<li>决定一个向量的是：<strong>它的长度和它所指的方向</strong></li>
<li>向量可以在空间中如何位置落脚（起点），但是在线性代数中向量（通常以坐标系中的原点为起点）</li>
</ul>
<h3 id="_2-从计算机专业角度" tabindex="-1"><a class="header-anchor" href="#_2-从计算机专业角度" aria-hidden="true">#</a> [2]从计算机专业角度</h3>
<ul>
<li>向量是<strong>有序的数字列表</strong></li>
<li>向量不过是“列表”一个花哨的说法</li>
<li>向量的维度等于“列表”的长度</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8f7663e21624089b32f4351c2d74b69~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429213937953"></p>
<h3 id="_3-从数学角度" tabindex="-1"><a class="header-anchor" href="#_3-从数学角度" aria-hidden="true">#</a> [3]从数学角度</h3>
<p>从数学来说，它的本质就是通用和抽象，所以，数学家希望概括这两种观点</p>
<ul>
<li>向量可以是任何东西，只需要保证：<strong>两个向量相加及数字与向量相乘是有意义的即可</strong></li>
<li><strong>向量加法</strong>和<strong>向量乘法</strong>贯穿线性代数始终，十分重要</li>
</ul>
<h3 id="_4-思考向量的特点方式" tabindex="-1"><a class="header-anchor" href="#_4-思考向量的特点方式" aria-hidden="true">#</a> [4]思考向量的特点方式</h3>
<h4 id="向量是空间中的箭头" tabindex="-1"><a class="header-anchor" href="#向量是空间中的箭头" aria-hidden="true">#</a> 向量是空间中的箭头</h4>
<p>从几何方面思考向量，当遇到向量时，首先考虑一个箭头以及器落在某个坐标系中，比如x-y平面，并且箭头起点为原点，这里和物理学角度的不同，向量可以在空间中如何位置落脚（起点），但是在线性代数中向量（通常以坐标系中的原点为起点）</p>
<h4 id="向量是有序的数字列表" tabindex="-1"><a class="header-anchor" href="#向量是有序的数字列表" aria-hidden="true">#</a> 向量是有序的数字列表</h4>
<p>可以通过向量坐标来理解，一对向量坐标由一对数构成，这对数指导你如何从原点（向量起点）触发到达它的尖端（向量终点）</p>
<ul>
<li>
<p>第一个数告诉你沿着x轴走多远，正数代表向右移动，负数代表向左移动</p>
</li>
<li>
<p>第二数告诉你在次之后沿着平行y轴的方向多远，正数代表向上移动，负数代表向下移动</p>
</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93a82d72adba488793809bde68672294~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429214647577"></p>
<blockquote>
<p>为了把向量和点区分开，通常把向量竖着写，然后用方括号括起来</p>
</blockquote>
<h4 id="三维空间中的向量" tabindex="-1"><a class="header-anchor" href="#三维空间中的向量" aria-hidden="true">#</a> 三维空间中的向量</h4>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6525edd3de1400e849224796afc23c5~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429220051086"></p>
<h3 id="_5-向量加法和向量数乘" tabindex="-1"><a class="header-anchor" href="#_5-向量加法和向量数乘" aria-hidden="true">#</a> [5]向量加法和向量数乘</h3>
<h4 id="向量加法" tabindex="-1"><a class="header-anchor" href="#向量加法" aria-hidden="true">#</a> 向量加法</h4>
<p>可以看成是在空间中的平移平行</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b888c88f0ae249b7bf231334185a0a08~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429220537199"></p>
<p>也可以看出数轴上加法的一种扩展</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd2abbd587e47779eaede4a61460e5f~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429220730189"></p>
<p>总共走了四步</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f94bc1191cab4412a5c127f5584175f1~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429220818240"></p>
<h4 id="向量数乘" tabindex="-1"><a class="header-anchor" href="#向量数乘" aria-hidden="true">#</a> 向量数乘</h4>
<ul>
<li>
<p>可以看成，向量长度的数乘（倍数），这种拉伸和压缩，有时还会改变向量方式（正负）的现象，也叫向量的缩放scaling</p>
</li>
<li>
<p>倍数，也称为标量scalars</p>
</li>
<li>
<p>数字在向量中的主要作用就是缩放变量</p>
</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ecabc010de7414daba55ea0b8b43efc~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429221350283"></p>
<h4 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h4>
<p>向量加法和向量数乘</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaa61c528e614fb6ab683f33db759363~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429221429973"></p>
<p>线性代数给物理学家和计算机图形程序员提供了一种语言，让它们通过计算机能够通过数字来描述和操控几何。</p>
<h2 id="_2-线性组合、张成的空间与基" tabindex="-1"><a class="header-anchor" href="#_2-线性组合、张成的空间与基" aria-hidden="true">#</a> 2.线性组合、张成的空间与基</h2>
<p>本部分继续加深一个概念，为何<strong>向量加法与向量乘法是那么重要，并从始至终贯穿整个线性代数</strong></p>
<p><code>i</code>与<code>j</code>是<code>xy</code>坐标系的“基向量<code>（1，1）</code>”</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a911c64cbfa74033bb4804e1864f9290~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429222200029"></p>
<blockquote>
<p>也就是说当你把坐标看作标量时，基向量实际上就是这些标量缩放的对象</p>
</blockquote>
<p>我们完成可以选择不同的基向量，获得一个合理的新坐标系</p>
<p>通过改变所选择的标量，你可以获得所有的二维向量。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ae58fd0b7748ddbaa2da50a1202869~tplv-k3u1fbpfcp-zoom-1.image" alt="啊"></p>
<blockquote>
<p>这样一对新的基向量，同样允许我们一对数和二维向量之间自由转化，当时这种变换关系和之前的<code>i</code>冒和<code>j</code>冒得变换关系完全不同</p>
</blockquote>
<p>每当我们使用数字描述变量时，他都依赖于我们真在使用的基</p>
<h3 id="_1-线性组合" tabindex="-1"><a class="header-anchor" href="#_1-线性组合" aria-hidden="true">#</a> [1]线性组合</h3>
<p>两个数乘向量的和称为这两个向量的线性组合</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35eb5236ac6f468c95738057b33c356a~tplv-k3u1fbpfcp-zoom-1.image" alt="啊"></p>
<p>空间中不共线的两个不为零向量都可以<strong>表示空间中的任意一个向量</strong>，写成符号语言就是：[Math Processing Error]</p>
<p>至于为什么被称为“线性”，有一种几何直观：如果你固定其中一个标量，让另一个标量自由变化，所产生的向量终点会描出一条直线</p>
<h3 id="_2-张成的空间" tabindex="-1"><a class="header-anchor" href="#_2-张成的空间" aria-hidden="true">#</a> [2]张成的空间</h3>
<h4 id="二维向量的张成的空间" tabindex="-1"><a class="header-anchor" href="#二维向量的张成的空间" aria-hidden="true">#</a> 二维向量的张成的空间</h4>
<p>将所有可以表示为给定向量线性组合的向量的集合称为给定向量张成的空间</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abdffe91f5cc4d21a5e7fb27295dadca~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429224231784"></p>
<blockquote>
<p>对于大部分二维向量而言，它们的张成空间是所有的二维向量的集合。</p>
<p>但当它们共线时，它们张成的空间就是终点落在一条直线上的向量集合</p>
</blockquote>
<p>两个向量张成的空间实际是在问，仅通过向量加法与向量数乘这两种基础运算，你能获得的所有可能向量集合是什么</p>
<p><strong>当你考虑一个向量时就把它看作一个箭头，当你考虑多个向量时，就把它们看作点。</strong></p>
<p>在用上面的观点去考虑之前的情况</p>
<ul>
<li>对于大部分二维向量而言，它们的张成的空间是一个无限大的二维平面</li>
<li>对于共线的二维向量来说，它们的张成的空间就是一条直线</li>
</ul>
<h4 id="三维向量的张成的空间" tabindex="-1"><a class="header-anchor" href="#三维向量的张成的空间" aria-hidden="true">#</a> 三维向量的张成的空间</h4>
<p>对于三维向量，它的张成的空间的概念就变得很有趣了</p>
<p>两个三维向量的张成的空间</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2c2362df19a41799f1bdf844a67daa6~tplv-k3u1fbpfcp-zoom-1.image" alt="啊"></p>
<blockquote>
<p>这两个向量的张成的空间便是它们所有的线性组合，也就是缩放在相加之后所有可能得到的向量（上图绿色）</p>
<p>逐渐改变两个线性组合中的两个标量，把缩放后的向量相加，然后跟着最终的向量的终点走，这个终点会画出三维空间中某个过原点的平面，这个平面就是这两个三维向量的张成的空间</p>
<p>或者说所有落在这个平面上的向量的集合是这两个向量的张成的空间。</p>
</blockquote>
<p>如果在加上第三个三维向量，那么它们的张成的空间是怎么样的呢？</p>
<p>三个向量线性组合的定义根之前定义的方法基本一致</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6308f8b28674605b6891b2e1586ce30~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429230456832"></p>
<p>选择三个标量，对三个向量分别进行缩放，然后把结果相加的到（绿色向量）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c985eb8134a4f0fa4af88ce62f95e28~tplv-k3u1fbpfcp-zoom-1.image" alt="a"></p>
<p>这三个向量的所有组合构成了它们张成的空间</p>
<p>如果第三个向量恰好落在前两个向量张成的空间的平面上，那么它们的张成的空间并没有发生改变，你还被困在这平面上。</p>
<p>换句话说，在线性组合中引入第三个向量并没有让你‘走的更远’</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/272f60c1d61a4701811ead1893dd45c8~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>但是如果你随机选一个向量，它几乎不可‘能落在前两个向量所张成的平面中，在这种情况下，由于第三个向量指向不同的方向，我们就能得到所有得三维向量。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1235045d12f44139482a6bd31769b7d~tplv-k3u1fbpfcp-zoom-1.image" alt="a"></p>
<h3 id="_3-线性相关" tabindex="-1"><a class="header-anchor" href="#_3-线性相关" aria-hidden="true">#</a> [3]线性相关</h3>
<p>对于第三个向量已经落在前两个向量得张成的空间中或者两个向量恰好共线的情况，我们使用一些术语来描述它们，即一组向量中至少有一个是多余的，没有对张成的空间做出贡献。</p>
<p>你有多个向量，并且可以移除其中一个而不减小张成的空间，当这种情况发送时，我们称它们是“线性相关的”</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fcd74079882493ab7c0c887a69ce450~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429231945136"></p>
<p>另一种表示方式是其中一个向量可以表示为其他向量的线性组合，因为这个向量已经落在其他向量的张成的空间上了</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9abafc9d4280480b8afecc526007a75c~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429232116789"></p>
<h3 id="_4-线性无关" tabindex="-1"><a class="header-anchor" href="#_4-线性无关" aria-hidden="true">#</a> [4]线性无关</h3>
<p>如果使用的向量都对张成的空间做出贡献，那么就可以称他们为线性无关的</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0aa38f73d8f4c23b81c08140bb31095~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220429232306236"></p>
<h3 id="_5-基的定义" tabindex="-1"><a class="header-anchor" href="#_5-基的定义" aria-hidden="true">#</a> [5]基的定义</h3>
<p>向量空间一组基的严格定义：</p>
<blockquote>
<p><strong>向量空间的一组基是张成该空间的一个线性无关向量集</strong></p>
</blockquote>
<h2 id="_3-矩阵与线性变换" tabindex="-1"><a class="header-anchor" href="#_3-矩阵与线性变换" aria-hidden="true">#</a> 3.矩阵与线性变换</h2>
<h3 id="_1-线性变换" tabindex="-1"><a class="header-anchor" href="#_1-线性变换" aria-hidden="true">#</a> [1]线性变换</h3>
<p>变换本质是“函数”的一种花哨的说法，它介绍内容，并输出对应的结果。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d806333e7df4433977835033b9bb0e1~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430102957056"></p>
<blockquote>
<p>变换和函数又有所不同，因为使用变换是在以特定的方式来可视化这一输入——输出的关系</p>
<p>一种理解“向量函数”的方法是使用运动</p>
</blockquote>
<p>例如一个变换接收一个向量并输出一个向量，我们可以想象这个输入向量移动到输出向量的位置</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/526e2a8302e546abbc988c3793e7b8b5~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430103406207"></p>
<p>线性代数限制在一种特殊类型的变换上，称为“线性变换”，这种变换更容易理解</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/999a3a0be126456fb5825b480eee3f44~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430103648763"></p>
<p>直观的说，如果变换具有以下两条性质，我们便可以称他说线性的</p>
<blockquote>
<ol>
<li>直线在变换后仍然为直线，不能有所弯曲</li>
<li>原点必须保持固定</li>
</ol>
</blockquote>
<p>例如：</p>
<p>非线性变换：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e28ab046bfc5430cbe7c8fbda4f2056b~tplv-k3u1fbpfcp-zoom-1.image" alt="a"></p>
<blockquote>
<p>直线弯曲了，不是线性变换</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/432d1dfa43c64ce6b22a271e7f464c88~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>这也不是线性变换，因为它的原点发送变化了</p>
<p>这也叫<strong>仿射变换</strong></p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8529a5909814e839d0a2e116ffb95bd~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>线性变换：</p>
<p>保持网格平行且等距分布的变换</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d6a3632d491467dbd7fc64a4ffcc52e~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>根据原点旋转</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1a2440b9f1b41769bf16b5bc0693689~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_2-使用数值来描述线性变换" tabindex="-1"><a class="header-anchor" href="#_2-使用数值来描述线性变换" aria-hidden="true">#</a> [2]使用数值来描述线性变换</h3>
<p>如何实现你给计算机一个向量坐标，它返回给你变换后的坐标？</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5034a1d0af21400389910b6b65d646c4~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430105136242"></p>
<blockquote>
<p>答案是你只需要记住两个基向量<code>i帽</code>和<code>j帽</code>变换后的位置</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bb3331350244a2d804e073b2c70e2e9~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430105317330"></p>
<p>换句话说，<code>向量v</code>是<code>i帽</code>与<code>j帽</code>的一个特定线性组合，那么变换后的<code>向量v</code>也是变换后的<code>i帽</code>和<code>j帽</code>的线性组合，这意味着你可以通过变换后的<code>i帽</code>和<code>j帽</code>推出变换后的<code>向量v</code></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3668be8bea6242edb1f13f1682dbffd4~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430105903606"></p>
<blockquote>
<p>小结：</p>
<ul>
<li>只要记录了变换后的i帽和j帽，我们就可以推断出任意向量在变换后的位置</li>
<li>一个二维线性变换仅由四个数字完全确定（变换后i帽和j帽的两个坐标）</li>
</ul>
</blockquote>
<h3 id="_3-矩阵" tabindex="-1"><a class="header-anchor" href="#_3-矩阵" aria-hidden="true">#</a> [3]矩阵</h3>
<p>通常我们把上面的坐标包装在<code>2x2</code>的格子中，称它为<code>2x2</code>矩阵</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c87eb5e74e254aebbe3474a1e30d8ee3~tplv-k3u1fbpfcp-zoom-1.image" alt="a"></p>
<blockquote>
<p>你可以把它的列理解为两个特殊的向量，即变换后的<code>i帽</code>和<code>j帽</code></p>
</blockquote>
<p>如果你有一个描述线性变换的<code>2x2矩阵</code>，以及一个给定向量，想了解线性变换对这两个向量的作用，你只需要 取出向量坐标，分别于矩阵的特定列相乘，然后相加即可（这与缩放基向量在在相加的思想一致）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c8c2c1bb7464b7b9b9c26188fe032a4~tplv-k3u1fbpfcp-zoom-1.image" alt="a"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/014da3077b33424a979ee4cae1973f9b~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430111227787"></p>
<p>等同于矩阵乘法</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0af007dc81ba4474bd6f815541969a3c~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430111300885"></p>
<p>下面使用直观的几何来理解</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b98fc3719dd437bb8070fce1785a0bb~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>把矩阵列看作是变换后的基向量，把矩阵乘法看作它们的线性组合</p>
</blockquote>
<h3 id="_4-使用矩阵来线性线性变换" tabindex="-1"><a class="header-anchor" href="#_4-使用矩阵来线性线性变换" aria-hidden="true">#</a> [4]使用矩阵来线性线性变换</h3>
<h4 id="旋转变换" tabindex="-1"><a class="header-anchor" href="#旋转变换" aria-hidden="true">#</a> 旋转变换</h4>
<p>例如将整个空间逆时针旋转90度，那么i帽便落在坐标（0，1）上，j帽落在坐标（-1，0）上，</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c4d758620ec48e899871e349fb647a2~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430112007200"></p>
<p>如果想计算出任意向量在逆时针旋转90度后的位置，只需要把他和上面矩阵相乘即可</p>
<h4 id="剪切变换" tabindex="-1"><a class="header-anchor" href="#剪切变换" aria-hidden="true">#</a> 剪切变换</h4>
<p>一个有趣的变换，在这个变换里i帽保持不变，使用矩阵第一列为（1，0），j帽移动到了坐标（1，1）上，所以矩阵第二列为（1，1）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51976c03c0b249919e48816fefd096f4~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430112422902"></p>
<blockquote>
<p>注意：</p>
<p>如果变换后的i帽和变换后的j帽是线性相关的，意味着一个向量是另一个向量的倍数，那么这个线性变换，将各二维空间挤压到一个二维它们所在的一条直线上（也就是两个相关向量所张成的一维空间）</p>
</blockquote>
<h3 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结" aria-hidden="true">#</a> [5]总结</h3>
<p>总之，线性变换是操作空间的一种手段，它保持网格线平行等距分布，并且保持原点不动。</p>
<p>严格意义上来讲，线性变换是将向量作为输入和输出的一类函数</p>
<p>这些变换只需要变换后的基向量便可以描述清楚，以这些坐标位列所构成的矩阵为我们提供了一种描述线性变换的语言</p>
<p>而矩阵向量的乘法就是计算线性变换作用于给定向量的一种途径</p>
<p><strong>每当你看到一个矩阵时，你都可以把他解读为，对空间的一种特定变换</strong>（<mark>重重重点</mark>）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf256681609f4c81bbb446084c215131~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h2 id="_4-矩阵乘法与线性变换复合的联系" tabindex="-1"><a class="header-anchor" href="#_4-矩阵乘法与线性变换复合的联系" aria-hidden="true">#</a> 4.矩阵乘法与线性变换复合的联系</h2>
<blockquote>
<p>据我的经验，如果丢掉矩阵的话，那些涉及矩阵的证明可以缩短一半 ——埃米尔·阿廷</p>
<p>It is my experience that proofs involving matrices can be shortened by 50% if one throws the matrices out -Emil Artin</p>
</blockquote>
<h3 id="_1-复合变换" tabindex="-1"><a class="header-anchor" href="#_1-复合变换" aria-hidden="true">#</a> [1]复合变换</h3>
<p>例如先进行旋转变换在进行剪切变换，则可见将这个变换称为，两个独立变换的复合变换</p>
<p>和其他线性变换一样，我们也可以通过追踪i帽和j帽，并用矩阵完全描述这个复合变换。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d69d1d56214d48389fa373401f468c46~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430114916278"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cf2a16fc57742308db35374ebcfa561~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430114941671"></p>
<blockquote>
<p>两个矩阵相乘的几何意义便浮现出来了</p>
<p>需要注意的是，上面的矩阵相乘需要从右往左读，首先应用右边矩阵所描述的变换，然后再应用左矩阵所描述的变换</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0c8e0461f414cb68c499a58a1bc15be~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430121717836"></p>
<p>通过先确定i帽来计算矩阵的乘法</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb1fbb3f9f1648738afd5b93ca88cf86~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430122015537"></p>
<h3 id="_2-通过矩阵相乘几何意义思考问题" tabindex="-1"><a class="header-anchor" href="#_2-通过矩阵相乘几何意义思考问题" aria-hidden="true">#</a> [2]通过矩阵相乘几何意义思考问题</h3>
<p>例如矩阵相乘时可以交换位置吗，通过几何意义推导，比如上面的例子，如果先剪切再旋转，很明显它们的结果是不同的。</p>
<p>再例如通过矩阵乘法的几何理解去推到矩阵乘法的结合率（AB)C=A(BC)可以直观的发现它们是对的，而代替了数字推导的繁杂过程。</p>
<h3 id="_3-三维空间的线性变换" tabindex="-1"><a class="header-anchor" href="#_3-三维空间的线性变换" aria-hidden="true">#</a> [3]三维空间的线性变换</h3>
<p>例如以三维向量为输入并以三维向量为输出（三维空间变换）</p>
<p>我们可以想象它在移动三维空间中的所有点（或网格）保持网格平行且等距分布，并保持原点不动</p>
<p>和二维线性变换一样，三维线性变换由基向量的去向完全决定（i帽，j帽，k帽），将变换后三个基向量的坐标记录在一个3x3的矩阵中。 这样就可以使用9个数字就可以描述三维向量的线性变换了。</p>
<p>对三维空间内扩展的话，你会发现，显示生活中的每一种形态改变都能用一个<code>3*3</code>的矩阵来表示这个变换，这在机器人，自动化操作领域是非常重要的，因为你可以把<strong>现实生活很难描述的动作通过一个矩阵来表示</strong>，是一个连接数字和现实的重要桥梁和工具</p>
<h2 id="_5-行列式" tabindex="-1"><a class="header-anchor" href="#_5-行列式" aria-hidden="true">#</a> 5.行列式</h2>
<blockquote>
<p>计算的目的不在于数字本身，而在于洞察其背后的意义 ——理查德·汉明</p>
<p>The purpose of computation is insight, not numbers - Richard Hamming</p>
</blockquote>
<h3 id="_1-行列式的定义" tabindex="-1"><a class="header-anchor" href="#_1-行列式的定义" aria-hidden="true">#</a> [1]行列式的定义</h3>
<p>我们注意到，有一些变换在结果上<strong>拉伸</strong>了整个网格，有一些则是<strong>压缩</strong>了，那<strong>如何度量这种压缩和拉伸</strong>呢？或者换一种更容易思考的表达，<strong>某一块面积的缩放比例</strong>是多少等</p>
<p>其实，根据我们之前讲的基向量，我们只需要知道<code>i帽</code> 和 <code>j帽</code>组成的面积为1的正方形面积缩放了多少就代表所有的情况。因为线性变换有一个性质：<strong>网格线保持平行且等距分布</strong></p>
<p>所以，<strong>这个特殊的缩放比例，即线性变换对面积产生改变的比例</strong>，就是<strong>行列式</strong></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d7325362fa34f22a741ae4344d5933f~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>比如说一个线性变换的行列式为6，那么就算是它将一个区域的面积增加为原来的6倍</p>
<p>特别的，我们可以发现，如果一个矩阵的<strong>行列式为0</strong>，意味着它把这个<strong>空间降维</strong>了（例如原本二维的变为了一维的线了），并且矩阵的<strong>列线性相关（倍数相关）</strong>，</p>
</blockquote>
<h3 id="_2-空间定向" tabindex="-1"><a class="header-anchor" href="#_2-空间定向" aria-hidden="true">#</a> [2]空间定向</h3>
<p>行列式是可以为负值的，<strong>正负表达的是方向</strong>，行列式的绝对值仍然表示区域面积的缩放比例，类似于纸的翻面，这个变换就相当于将纸翻到了另一面，我们称这样的变换改变了空间的定向。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02fd5db242f7479291fe2f2595b25537~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430125323118"></p>
<p><code>j帽</code> 起始状态在<code>i帽</code>的左侧，如果经过变换，变为在右侧，就添加负号。三维情况下，<strong>右手定位</strong>为正</p>
<p>当i帽接近于j帽时，空间也就逐渐的被压缩，这意味着当i帽与j帽重合时，行列式为0。</p>
<h3 id="_3-在三维空间中的行列式" tabindex="-1"><a class="header-anchor" href="#_3-在三维空间中的行列式" aria-hidden="true">#</a> [3]在三维空间中的行列式</h3>
<p>依然是变换前后的缩放比例，不过这次它的是体积的缩放比例。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ba8ad4e0e554832af9c7401aa224194~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>正方体转变为了<code>平行六面体</code>。</p>
<p>这个正方体的体积开始为1，而行列式表示这个正方体的缩放比例</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/072d1ed72b544377a4e1a9196cb8d02f~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430173259251"></p>
<p>行列式为0，意味着整个空间被压缩为0体积的东西，也就是一个平面，一条直线，或者说是一个点。</p>
<h3 id="_4-三维空间中的定向" tabindex="-1"><a class="header-anchor" href="#_4-三维空间中的定向" aria-hidden="true">#</a> [4]三维空间中的定向</h3>
<p>三个三维向量行列式为负值时又代表着什么呢？</p>
<p>有一种方法来描述三维空间中的定义，那就是“右手定则”</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22dd6161536d490d98fc30b9b0026966~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430173744460"></p>
<p>如果行列式为正则可以使用右手定则，如为负，那么需要使用左手</p>
<h3 id="_5-结合行列式的数学计算" tabindex="-1"><a class="header-anchor" href="#_5-结合行列式的数学计算" aria-hidden="true">#</a> [5]结合行列式的数学计算</h3>
<p>为了连接行列式的计算公式和几何直观，我们假设<code>b</code> <code>c</code> 为0，那么，a表示 <code>i帽</code> 在<code>x轴</code>缩放比例，d表示 <code>j帽</code> 在<code>y轴</code>缩放比例，<code>ad</code>表示<strong>拉伸倍数</strong>，同理来说，<code>bc</code>表示的就是<strong>压缩倍数</strong>，两者的和就是<strong>缩放比例</strong>。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/252f99a80ba84e379e08014921665aff~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<h2 id="_6-逆矩阵、列空间与零空间" tabindex="-1"><a class="header-anchor" href="#_6-逆矩阵、列空间与零空间" aria-hidden="true">#</a> 6.逆矩阵、列空间与零空间</h2>
<blockquote>
<p>提出正确的问题比回答它更难 ——格奥尔格·康托尔</p>
<p>To ask the right question is harder than to answer it - Georg Cantor</p>
</blockquote>
<p>通过线性变换的视角来重新看逆矩阵，列空间，秩，零空间</p>
<h3 id="_1-矩阵的用途" tabindex="-1"><a class="header-anchor" href="#_1-矩阵的用途" aria-hidden="true">#</a> [1]矩阵的用途</h3>
<p>它能用来描绘对空间的操控，这对计算机图形学学习很重要。</p>
<p>它被广泛应用的主要原因是它能帮助我们求解特定的方程组</p>
<h3 id="_2-利用矩阵求解方程组" tabindex="-1"><a class="header-anchor" href="#_2-利用矩阵求解方程组" aria-hidden="true">#</a> [2]利用矩阵求解方程组</h3>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a69728097e4f43ca88c91e27467b6cc5~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430175414344"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8bbdb7f105b4fb2aa6015beac017d3a~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430175505689"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/635e03bc8025499f9446abd415e20a29~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430175550983"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7f3496b24bb433eb344d30e98b1426c~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430175622553"></p>
<p>矩阵A代表一个线性变换，所以求解A<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span></span></span></span> =<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.22222em;">V</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span></span></span></span> 意味着去寻找一个向量<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span></span></span></span>，使得变换后与<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.22222em;">V</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span></span></span></span> 重合</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f3818bda36e4e65af5725738452e392~tplv-k3u1fbpfcp-zoom-1.image" alt="a"></p>
<p>既然使用了 <code>A</code> 这个矩阵变换，那么之前讲解的概念：<strong>行列式</strong>应用在这里就很有意思了。根据之前提到的，<strong>行列式</strong>直观来说就是矩阵变换操作<strong>面积的缩放比例</strong>。我们可以思考，<code>det(A)=0</code> 意味着缩放比例为<code>0</code>，即<strong>降维了</strong>。<strong>很大可能找不到解</strong>，唯一的可能性，比如平面压缩成直线，这个直线恰好落在<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.22222em;">V</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span></span></span></span> 上才有解。这也是<strong>为什么计算行列式的值可以判断方程是否有解的几何直观</strong></p>
<blockquote>
<p>接下来思考如何求 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span></span></span></span>。应用逆向思考，从 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.22222em;">V</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span></span></span></span> 出发，进行某一个矩阵变换，恰好得到 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span></span></span></span> 。而这个反过来的矩阵变换，就称为 A 矩阵的逆矩阵，写成公式是：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9eefb15314a84ba1be499a7b92147b1e~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430181024350"></p>
</blockquote>
<h3 id="_3-逆矩阵" tabindex="-1"><a class="header-anchor" href="#_3-逆矩阵" aria-hidden="true">#</a> [3]逆矩阵</h3>
<p>所谓逆，就是反过来的意思。根据基向量代表整个空间，已经变换过的 <code>i帽</code>和<code>ȷ帽</code>如何通过一个矩阵变换，变回 <code>i帽</code>和 <code>j帽</code>，这个矩阵就是<strong>逆矩阵</strong> ，写作<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">−</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span></span></span></span>，直观理解如下图</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71780d62beb642e7866dd6360f74bf8b~tplv-k3u1fbpfcp-zoom-1.image" alt="65-ReverseMatrix"></p>
<p>逆矩阵乘原矩阵等于恒等变换，写作 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord mathnormal">A</span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">−</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">I</span></span></span></span> 。$I $矩阵表示基向量，对角线元素为1，其余为0（矩阵说对角线，默认为左上方到右下方）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76bef751dd0646759c768b444a96c158~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430220520079"></p>
<p>要想求解方程，你只需要将A逆与向量v相乘即可<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">−</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span><span class="mord mathnormal">A</span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">−</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.22222em;">V</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span></span></span></span> ——&gt;<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1522em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.9663em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">−</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9663em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.22222em;">V</span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.2355em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg xmlns="http://www.w3.org/2000/svg" width='0.471em' height='0.714em' style='width:0.471em' viewBox='0 0 471 714' preserveAspectRatio='xMinYMin'><path d='M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z'/></svg></span></span></span></span></span></span></span></span></span></span></p>
<blockquote>
<p>注意在降维的变换中没有逆变换（它们都对应行列式为0的情况）</p>
</blockquote>
<h3 id="_4-秩" tabindex="-1"><a class="header-anchor" href="#_4-秩" aria-hidden="true">#</a> [4]秩</h3>
<p>秩代表变换后空间的维数</p>
<p>比如说，对于2x2的矩阵那么它的秩最大为2，当秩数小于向量的维数，那么可以说它在变换后被压缩了</p>
<p>如果变换后的向量在一条直线上，那么我们称这个变换为的秩为1，如果变换后的向量在一个平面上，那么我们称这个变换为秩为2</p>
<h3 id="_5-列空间" tabindex="-1"><a class="header-anchor" href="#_5-列空间" aria-hidden="true">#</a> [5]列空间</h3>
<p>不管是一条直线，一个平面还是三维空间等，所有可能的变换结果的集合被称为”列空间“</p>
<p>矩阵的列告诉你基向量变换后的位置，这些变换后的基向量张成的空间就是所有可能的变换结果</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0abd7f0f70064be3b05058a7472599f6~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220430222336231"></p>
<blockquote>
<p>列空间就是矩阵的列所张成的空间</p>
<p>所以更精确秩的定义就是列空间的维数</p>
<p>当秩达到最大时，意味着秩与列数相等（也称为满秩）</p>
</blockquote>
<p>零向量一定包含在列空间中，因为线性变化必须保持原点位置不变，对于一个满秩变换来说，唯一能在变换后落在原点的就是零向量本身。对于非满秩变换，在变换后可能会有一些里点落在原点中</p>
<h3 id="_6-零空间" tabindex="-1"><a class="header-anchor" href="#_6-零空间" aria-hidden="true">#</a> [6]零空间</h3>
<p>变换后落在原点的向量的集合就称为矩阵的”零空间“或”核“</p>
<p>对于线性方程组来说，当向量v恰好为零向量时，零空间给出的就是这个向量方程的所有可能的解</p>
<h3 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1" aria-hidden="true">#</a> 总结</h3>
<p>每个方程组都有一个线性变换与之联系，当逆变换存在时，你就能使用这个逆变换求解方程组，否则，列空间的概念让我们清楚什么时候存在解</p>
<p>零空间的概念有助于我们理解所有的解的集合是什么样的</p>
<h2 id="_7-非方正不同维度之间的线性转换" tabindex="-1"><a class="header-anchor" href="#_7-非方正不同维度之间的线性转换" aria-hidden="true">#</a> 7.非方正不同维度之间的线性转换</h2>
<blockquote>
<p>在这个小测试里，我让你们求一个<code>2*3</code>矩阵的行列式。让我感到非常可笑的是，你们当中竟然有人尝试去做 ——佚名</p>
<p>On this quiz, I asked you to find the determinant of a 2*3 matrix.  Some of you, to my great amusement, actually tried to do this - no name  listed</p>
</blockquote>
<h3 id="_1-几何意义" tabindex="-1"><a class="header-anchor" href="#_1-几何意义" aria-hidden="true">#</a> [1]几何意义</h3>
<p>当你看到一个<code>3x2</code>矩阵的时候，你就明白它的几何意义是将二维空间（原始空间有两个基向量）映射到三维空间上，因为矩阵有两列表明输入空间有两个基向量，有三行表示每个基向量在变换后都用三个独立的坐标来描述</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a1a3a6c413e4b2ea06cd2a31e76cb1b~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220501133948786"></p>
<p>同样的，当你看到一个<code>2x3</code>的矩阵时，你觉得它代表上面？</p>
<p>矩阵有3列表明原始空间有三个基向量，也就是说原始空间是三维的，有两行表示这三个基向量在变换后都仅用两个坐标来描述，所以也就代表了<strong>从三维空间到二维空间的变换</strong></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e37b3a30398b4fbbabb700da122a4f69~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220501134506291"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/646fb0de7b66419ba8c083dc43fc0199~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220501134404084"></p>
<p>从上面的示例，我们可以得到一个结论：<code>n*m</code> 的几何意义是将**m维空间（输入空间）映射到n维空间（输出空间）**上</p>
<h3 id="_2-非方阵乘法" tabindex="-1"><a class="header-anchor" href="#_2-非方阵乘法" aria-hidden="true">#</a> [2]非方阵乘法</h3>
<p>由上面的理解及大学课程的学习，可以知道并不是任意两个非方阵都可以进行矩阵乘法，必须满足一些条件，例如，<code>M1M2</code>（非方阵）计算中，假设 <code>M2</code> 为<code>2×3</code>的矩阵（映射在三维空间中的二维），那么 <code>M1</code>的列必须等于 <code>M2</code> 的行，否则这个乘法是没法计算的。</p>
<blockquote>
<p>直观解释是：<strong>矩阵的行</strong>是这个变换的<strong>输出空间维数</strong>，而<strong>列</strong>是变换的<strong>输入空间维数</strong>。矩阵乘法从右向左读，第一个变换的 M2 的输出向量的维度3必须和第二个变换 M1 的输入向量（ M1 的列）<strong>维度相等</strong>，才可以计算。</p>
</blockquote>
<h2 id="_3-非方阵行列式" tabindex="-1"><a class="header-anchor" href="#_3-非方阵行列式" aria-hidden="true">#</a> [3]非方阵行列式</h2>
<p>这里有一个很好玩的概念，非方阵的行列式呢？都<strong>不是一个维度的变换</strong>，如同归零者和咱们谈判一样，你和我谈<strong>缩放比例</strong>？不存在的</p>
<h2 id="_8-点积与对偶性" tabindex="-1"><a class="header-anchor" href="#_8-点积与对偶性" aria-hidden="true">#</a> 8.点积与对偶性</h2>
<h3 id="_1-点积" tabindex="-1"><a class="header-anchor" href="#_1-点积" aria-hidden="true">#</a> [1]点积</h3>
<p>要深入的理解点积所发挥的作用，就需要从线性变换的角度去理解</p>
<p>点积的数学计算过程</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c84a408774e04decb669cae8d8687713~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220501135518872"></p>
<p>这个计算的几何解释（投影为垂直投影）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee4783cd77814175b0dfa4f20a9aa7a7~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220501135649823"></p>
<blockquote>
<ul>
<li>当向量w和向量v的方向相反时，它们的点积的值为负的</li>
<li>当向量w和向量v的方向大致相同时，它们的点积为正的</li>
<li>当向量w和向量v相互垂直时，意味着一个向量在另一个向量的投影为零向量，它们的点积为零</li>
</ul>
</blockquote>
<p>点积与顺序无关，也就是，谁投影到谁上都是相同的</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6befdda72c849c9bcfe1af33cd9f955~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>首先假设 向量v 和 向量w 长度相同，利用对称轴，两个向量互相的投影相等；</p>
<p>接下来如果你<strong>缩放其中一个到原来的两倍</strong>，对称性被破坏，但是<strong>缩放比例没变</strong>，最终<strong>乘法的结果</strong>也没变，一动图胜千言</p>
</blockquote>
<h3 id="_2-点积与投影" tabindex="-1"><a class="header-anchor" href="#_2-点积与投影" aria-hidden="true">#</a> [2]点积与投影</h3>
<p>直观的乘法与加法的组合运算：点积为何和投影长度的乘积有关？</p>
<p>假如一个线性变换<code>[1,-2]</code>（<code>1x2</code>从二维转到一维的变换），用来计算一个向量<code>v</code>在变换后的向量</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1771e49ca0be49ec9c2cfca891678728~tplv-k3u1fbpfcp-zoom-1.image" alt="a"></p>
<p>建立<strong>多维空间到一维空间的线性变换（描述为<code>1×n</code>的矩阵，列代表对应的基向量压缩到一维空间的位置）</strong>，即<strong>函数</strong>（自变量对应多维空间，f(x) 最后的输出为一维空间，也就是<strong>数轴上的点</strong>，一个确定的数）的概念。一动图胜千言</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c874993c42440e5bd9dadc3e6142e0a~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<blockquote>
<p>你会发现，<code>n×1</code> 表示的是坐标和<code>1×n</code>表示的多维到一维的变换（矩阵）之间有某种联系，即<strong>将向量转化为数的线性变换</strong>和这个<strong>向量本身</strong>有着<strong>某种关系</strong></p>
</blockquote>
<p>接下来，我们想象一个情景，这个<strong>被压缩成的一条线</strong>（数轴）放置在一个<strong>坐标系</strong>（二维空间）中，且空间所有向量都经过<strong>一个变换被压缩到</strong>这个数轴上。记这个数轴的单位向量为 <code>u</code></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec2360abdd0249309c1ffa73f66ae0a1~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>再然后，我们需要考虑的问题变为，坐标系中的 <code>i帽</code>与 <code>j帽</code> 是如何被压缩到这条直线上的呢（基向量表征整个空间的变换）？即求一个<code>1×2</code>的矩阵内的值，第一列表示 <code>i帽</code>变换后的位置（在这条数轴上），第二列表示 <code>j帽</code>变换后的位置。</p>
<p>可以直接给出结论，<strong>这个变换</strong>的数值恰好就是<code>向量u</code> 在这个坐标系中的坐标 (<code>ux</code>,<code>uy</code>) ，推倒方法使用<strong>到了对称性</strong>，一动图胜千言</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a7f9ea445584816adada05b2bf52c19~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<p>动图中的白色虚线就是对称轴，目的就是确定变换后 <code>i帽</code>与 <code>j帽</code>的位置，即<strong>描述变换的矩阵（列表示坐标，行表示变换）</strong>。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6143d023bc954a33b5a54db1471afff4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<blockquote>
<p>小结一下：我们有一个从二维空间到数轴的线性变换，它并不是由向量数值或点运算定义得到的。而是将通过空间投影到给定数轴上来定义得到的，但是因为这个变换是线性的，所以它必然 可以使用某个1x2的矩阵来描述，又因为1x2矩阵与二维向量相乘的计算过程和转置矩阵并求点积的计算过程相同，所以这个投影变换必然会与某个二维向量相关。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be10fec48f9d4b04a3d00ccb86ef19a5~tplv-k3u1fbpfcp-zoom-1.image" alt="a"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b2ee61708b84563a55e4d4154646307~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220501224700081"></p>
</blockquote>
<blockquote>
<p>启发：你在任何时候看到一个线性变换，它的输出空间为一维数轴，无论它是怎么定义的</p>
</blockquote>
<h3 id="_3-对偶性" tabindex="-1"><a class="header-anchor" href="#_3-对偶性" aria-hidden="true">#</a> [3]对偶性</h3>
<p>对偶性贯穿数学始终，在多个方面都有所体现</p>
<p>在数学中，对偶性定义为：两种数学事物之间<strong>自然而又出乎意料</strong>的<strong>对应关系</strong>。刚刚推导的内容是数学上“对偶性”的一个实例，即无论何时你看到一个<strong>二维到一维的变换</strong>，空间中会存在为一个向量 v与之相关</p>
<h3 id="总结-2" tabindex="-1"><a class="header-anchor" href="#总结-2" aria-hidden="true">#</a> 总结：</h3>
<ul>
<li><strong>点积是理解投影的有力几何工具</strong></li>
<li>方便<strong>检验两个向量的指向是否相同</strong></li>
<li>更进一步，两个<strong>向量点乘</strong>，就是将<strong>其中一个向量转化为线性变换</strong></li>
<li>向量仿佛是一个<strong>特定变换的概念性记号</strong>。对一般人类来说，想象空间中的向量比想象这个空间移动到数轴上更加容易</li>
</ul>
<h2 id="_9-叉积标准及介绍" tabindex="-1"><a class="header-anchor" href="#_9-叉积标准及介绍" aria-hidden="true">#</a> 9.叉积标准及介绍</h2>
<h3 id="_1-叉积的定义" tabindex="-1"><a class="header-anchor" href="#_1-叉积的定义" aria-hidden="true">#</a> [1]叉积的定义</h3>
<p>真正的叉积是在通过两个三维向量生成一个新的三维向量</p>
<p>叉积的结果不是一个数，而是一个向量，这个向量的长度为，叉乘向量的平行四边形的面积，这个向量与这个平行边形（所在的面）垂直（右手定则）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb881efb082641c0964b3f69a5d7ea62~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220501230930673"></p>
<h3 id="_2-叉积计算公式" tabindex="-1"><a class="header-anchor" href="#_2-叉积计算公式" aria-hidden="true">#</a> [2]叉积计算公式</h3>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16eae092069545e9a689880d42f82c32~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220501231353436"></p>
<p>其中<code>i,j,k</code>三个基向量后的数字就是对应向量叉积的坐标值</p>
<blockquote>
<p>注：这里将向量写作矩阵的列，而教科书中大多数将向量写作矩阵的行，而这两种结果没有差异，因为装置不改变行列式的值。这里选择按列处理向量更为直观。</p>
</blockquote>
<h2 id="_10-以线性变换的思想看叉积" tabindex="-1"><a class="header-anchor" href="#_10-以线性变换的思想看叉积" aria-hidden="true">#</a> 10.以线性变换的思想看叉积</h2>
<p>在开始前，先再次加深一次<strong>对偶性</strong>的概念：每当你看到一个**（多维）空间到数轴的线性变换<strong>时，它都与那个空间中的</strong>唯一一个向量对应**。即<strong>应用线性变换到某个向量</strong>和<strong>与这个向量点乘</strong>等价</p>
<p>恰好，叉积的运算过程给出了对偶性的一个绝佳的实例：根据 向量v 和 向量w 定义一个从三维空间到数轴的<strong>特定线性变换</strong>，找到这个变换的<strong>对偶向量</strong>，这个<strong>对偶向量</strong>就是 向量v 和 向量w 的<strong>叉积</strong></p>
<p>首先，我们知道三维情况的，求一个<code>3×3</code>矩阵的行列式，就是求这三个向量张成的<strong>平行六面体的体积</strong>，然后，把第一列（向量）换成一个自变量，后两列（两向量）记为 向量v 和 向量w ，那么我们就有</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42e06e528f06468d939fe26ae71c4663~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>
<p>正真的三维向量接收两个向量并输出一个向量，而不是接收三个向量并输出一个数（这里注意不要搞混了）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6eab457e36394fc0b622499d324f4fc1~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>向量v和向量w，向量变。那么我们就有一个从三维空间到数轴的函数了，你数如入一个三维向量（x，y，z）然后通过矩阵的行列式的到一个数。</p>
<blockquote>
<p>这个函数是线性的</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a99cf42055e4238b956f143227522d6~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220513171943190"></p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考：</h2>
<p>https://www.3blue1brown.com/</p>
<p>https://www.bilibili.com/video/av6731067/?p=4</p>
<p>https://www.bilibili.com/video/BV1ib411t7YR?spm_id_from=333.337.search-card.all.click</p>
</template>
