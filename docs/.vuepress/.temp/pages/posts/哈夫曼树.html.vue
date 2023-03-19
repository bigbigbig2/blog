<template><h2 id="哈夫曼树" tabindex="-1"><a class="header-anchor" href="#哈夫曼树" aria-hidden="true">#</a> 哈夫曼树</h2>
<h3 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1，简介</h3>
<p>我们日常在对文件进行压缩时，它的压缩原理简单的说就是把我们要压缩的文本进行重新编码，以减少不必要的空间。</p>
<p>尽管现在最新技术在编码上已经很好很强大，但我们平时所用的压缩和解压缩技术也都是基于哈夫曼的研究之上发展而来。</p>
<p>在编码中用到的特殊的二叉树称之为哈夫曼树，他的编码方法称为哈夫曼编码。</p>
<p>哈夫曼树为美国数学家哈夫曼（David Huffman）也有的翻译为赫夫曼的巨佬开创的。</p>
<h3 id="_2-哈夫曼树定义与原理" tabindex="-1"><a class="header-anchor" href="#_2-哈夫曼树定义与原理" aria-hidden="true">#</a> 2，哈夫曼树定义与原理</h3>
<h4 id="_1-一些名词概念" tabindex="-1"><a class="header-anchor" href="#_1-一些名词概念" aria-hidden="true">#</a> [1]一些名词概念：</h4>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7b3cebe421f4c4e8edb7cbe9d330d92~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211115222014237"></p>
<p><strong>路径</strong>：可以理解为两个节点相连的线</p>
<p><strong>某个节点路径长度</strong>：两个节点中间隔线条数（如上图根结点到结点D最短间隔四条线，那么D的路径长度就为4）</p>
<p><strong>树的路径长度</strong>：如上图二叉树的树路径长度就为1+1+2+2+3+3+4+4=20</p>
<p><strong>结点的带权路径长度</strong>：从该结点到树根之间的路径长度与结点上权的乘积</p>
<p><strong>树的带权路径长度</strong>：为树中所有叶子结点的带权路径长度之和（计算公式如下）</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">W</span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mord mathnormal">L</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1.6em;vertical-align:-0.55em;"></span><span class="mop op-symbol large-op" style="position:relative;top:0em;">∑</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord">1</span><span class="mord mathnormal">n</span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">i</span></span></span></span></span></p>
<p>其中，n表示叶子结点的数目，wi和li分别表示叶子结点ki的权值和树根结点到kiwi和li分别表示叶子结点ki的权值和树根结点到ki之间的路径长度，<strong>带权路径长度WPL最小的二叉树就称做哈夫曼树</strong></p>
<p>例如下面二叉树的WPL值：</p>
<p>二叉树a的<code>WPL=5×1+15×2+40×3+30×4+10×4=315</code>（5是A结点的权，1是A结点的路径长度）</p>
<p>二叉树b的<code>WPL=5×3+15×3+40×2+30×2+10×2=220</code></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f0616089327402cad4c51d6de475555~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211115222828640"></p>
<h4 id="_2-如何判断一颗树为哈夫曼树" tabindex="-1"><a class="header-anchor" href="#_2-如何判断一颗树为哈夫曼树" aria-hidden="true">#</a> [2]如何判断一颗树为哈夫曼树</h4>
<ol>
<li>先把有权值的叶子结点按照从小到大的顺序排列成一个有序序 列，即：A5，E10，B15，D30，C40。</li>
<li>取头两个最小权值的结点作为一个新节点N1的两个子结点，注意相对较小的是左孩子，这里就是A为N1的左孩子，E为N1的右孩子.新结点的权值为两个叶子权值的和5+10=15。</li>
</ol>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed3e8c28950f429da142ad264b6020b3~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211115230322061"></p>
<ol start="3">
<li>将N1替换A与E，插入有序序列中，保持从小到大排列。即： N115，B15，D30，C40。</li>
<li>重复步骤2。将N1与B作为一个新节点N2的两个子结点。如下图所示。N2的权值=15+15=30</li>
</ol>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00a2bc87054f4efaa92fe8426b137718~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211115230436024"></p>
<ol start="5">
<li>
<p>将N2替换N1与B，插入有序序列中，保持从小到大排列。即： N230，D30，C40</p>
</li>
<li>
<p>重复步骤2。将N2与D作为一个新节点N3的两个子结点。如图6-12- 7所示。N3的权值=30+30=60</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/472fe7d715624ec5b91612c88a4027c0~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211115230642849"></p>
</li>
<li>
<p>将N3替换N2与D，插入有序序列中，保持从小到大排列。即： C40，N360。</p>
</li>
<li>
<p>重复步骤2。将C与N3作为一个新节点T的两个子结点，如图6-12-8 所示。由于T即是根结点，完成赫夫曼树的构造。</p>
</li>
</ol>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6aed6d98d08f49ea88e8889453afa74b~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>经过这一些列步骤后的为<code>WPL=40×1+30×2+15×3+10×4+5×4=205</code>。与上面二叉树b的 WPL值220相比，还少了15。显然此时构造出来的二叉树才是最优的哈夫曼树。</p>
<h4 id="_3-哈夫曼算法描述" tabindex="-1"><a class="header-anchor" href="#_3-哈夫曼算法描述" aria-hidden="true">#</a> [3]哈夫曼算法描述</h4>
<p>1.根据给定的n个权值{w1 ,w2 ,...,wn }构成n棵二叉树的集合F= {T1 ,T2 ,...,Tn }，其中每棵二叉树Ti中只有一个带权为wi根结点，其左右子树均为空。</p>
<p>2.在F中选取两棵根结点的权值最小的树作为左右子树构造一棵新的二叉树，且置新的二叉树的根结点的权值为其左右子树上根结点的权值 之和。</p>
<p>3.在F中删除这两棵树，同时将新得到的二叉树加入F中。</p>
<p>4.重复2和3步骤，直到F只含一棵树为止。这棵树便是赫夫曼树。</p>
<h3 id="_3-哈夫曼编码" tabindex="-1"><a class="header-anchor" href="#_3-哈夫曼编码" aria-hidden="true">#</a> 3，哈夫曼编码</h3>
<h4 id="_1-编码" tabindex="-1"><a class="header-anchor" href="#_1-编码" aria-hidden="true">#</a> [1]编码</h4>
<p>赫夫曼研究这种最优树的目的是为了解决当年远距离通信（主要是电报）的数据传输的最优化问题。</p>
<p>比如我们有一段文字内容为“BADCADFEED”要网络传输给别人，我们都知道这将会转为二进制的数字（0和1）表示来传递。</p>
<p>原来的二进制转换为</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a018097de7e54f079ba48f21d8087f49~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>这样真正传输的数据就是编码后 的“001000011010000011101100100011”，</p>
<p>现在假设六个字母的频率为A 27，B 8，C 15，D15，E 30，F 5，那么便可以使用哈夫曼树来规划它们了。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7fe67fc3fcf4594a3505e921976d08a~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c29aa6ac581541afb7be0664ada2bf8c~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>我们对这六个字母用其从树根到叶子所经过路径的0或1来编码，这样这串字母通过哈夫曼编码后为1001010010101001000111100（共25个字符）相比之前的默认编码001000011010000011101100100011（共30个 字符）可以看出数据被压缩了，节约了大约17%的存储或传输成本</p>
<h4 id="_2-解码" tabindex="-1"><a class="header-anchor" href="#_2-解码" aria-hidden="true">#</a> [2]解码</h4>
<p>前缀编码：任一字符的编码都不是另一个字符的编码的前缀</p>
<p>在解码时，还是要 用到赫夫曼树，即发送方和接收方必须要约定好同样的赫夫曼编码规 则。</p>
<p>当我们接收到1001010010101001000111100时，由约定好的赫夫曼 树可知，1001得到第一个字母是B，接下来01意味着第二个字符是 A，如图6-12-10所示，其余的也相应的可以得到，从而成功解码</p>
<h4 id="_3-小结" tabindex="-1"><a class="header-anchor" href="#_3-小结" aria-hidden="true">#</a> [3]小结</h4>
<p>一般地，设需要编码的字符集为{d1 ,d2 ,...,dn }，各个字符在电文中出现 的次数或频率集合为{w1 ,w2 ,...,wn }，以d1 ,d2 ,...,dn作为叶子结点，以 w1 ,w2 ,...,wn作为相应叶子结点的权值来构造一棵赫夫曼树。规定赫夫 曼树的左分支代表0，右分支代表1，则从根结点到叶子结点所经过的 路径分支组成的0和1的序列便为该结点对应字符的编码，这就是赫夫曼编码。</p>
</template>
