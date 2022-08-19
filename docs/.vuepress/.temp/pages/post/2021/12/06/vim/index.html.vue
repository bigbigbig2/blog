<template><h3 id="_0-简单介绍" tabindex="-1"><a class="header-anchor" href="#_0-简单介绍" aria-hidden="true">#</a> 0.简单介绍</h3>
<ul>
<li>先下面介绍使用vscode+vim插件来使用（当然Linux中也行）</li>
<li>安装插件</li>
</ul>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb11f52b5f9246999d12ba9cdbe0fc31~tplv-k3u1fbpfcp-watermark.image?" alt="image.png">
安装好后推荐根据个人喜好配置一下setting.json文件（这里请自行查看配置参数进行选择）
linux中的配置文件有所不同，因为不是json格式的</p>
<p>附上自己的vim配置信息😐（setting.json)</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"vim.insertModeKeyBindings"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//jj进入普通模式</span>
        <span class="token property">"before"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"j"</span><span class="token punctuation">,</span> <span class="token string">"j"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">"after"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"&lt;Esc>"</span><span class="token punctuation">]</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token property">"editor.quickSuggestions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"strings"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token comment">//leader键配置</span>
<span class="token property">"vim.leader"</span><span class="token operator">:</span> <span class="token string">"&lt;space>"</span><span class="token punctuation">,</span>  
<span class="token comment">//取消vim关系映射这几个组合键，这样就可以使用vscode原来的Ctrl+C键啥的了</span>
<span class="token property">"vim.handleKeys"</span><span class="token operator">:</span> <span class="token punctuation">{</span>  
    <span class="token property">"&lt;C-a>"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">"&lt;C-f>"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> 
    <span class="token property">"&lt;C-n>"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">"&lt;C-c>"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">"&lt;C-v>"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">"&lt;C-x>"</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token comment">//"editor.lineNumbers":"relative" 根据行号跳跃h几行</span>
<span class="token property">"vim.startInInsertMode"</span><span class="token operator">:</span><span class="token boolean">true</span> <span class="token comment">//以插入模式而不是普通模式启动</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>当显示下图时即ok了
<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bfd422a018f471b95bc7764ce53c9af~tplv-k3u1fbpfcp-watermark.image?" alt="image.png">
具体使用详见下文🤭</p>
<h3 id="_1-vim的四种模式" tabindex="-1"><a class="header-anchor" href="#_1-vim的四种模式" aria-hidden="true">#</a> 1.vim的四种模式</h3>
<p>在不同的发行版通常需要安装，在有些发行版里是自带的（比如Ubuntu）但是不完整，还需要进行简单安装。</p>
<ul>
<li>简单安装（Linux中）:sudo apt install vim</li>
<li>使用vim打开文件：vim 文件名</li>
<li><code>普通模式</code>：（命令操作模式）：操作文件有光标在闪</li>
<li><code>插入模式</code>：编辑的时候（输入insert或i进）最下面有INSERT显示编写完成之后——》进入普通模式（按esc)</li>
<li>保存需要切换到普通模式——》：wq+enter然后变可以使用cat命令器查看你文件编辑的内容 不保持即不需要加w</li>
<li><code>命令模式</code>：当输入冒号“ ：”时 在命令模式中也是可以按esc键退出</li>
<li><code>视图模式</code>：在普通模式下按v来进行</li>
</ul>
<h3 id="_2-光标移动" tabindex="-1"><a class="header-anchor" href="#_2-光标移动" aria-hidden="true">#</a> 2.光标移动</h3>
<p>vim解决了在移动光标的时时将手移动到方向键的麻烦</p>
<p><code>HJKL</code>四个键可以操作替代上下左右键（<a href=""><code>先按esc退到在普通模式下</code></a>）</p>
<ul>
<li><code>H</code>向左</li>
<li><code>L</code>向右</li>
<li><code>J</code>向下</li>
<li><code>K</code>向上</li>
</ul>
<h3 id="_3-翻页" tabindex="-1"><a class="header-anchor" href="#_3-翻页" aria-hidden="true">#</a> 3.翻页</h3>
<p>不推荐使用<code>page up</code> 和<code>pagae down</code> 来翻页，也不推荐使用k和j来翻</p>
<ul>
<li><code>Ctrl + f</code> 向下翻页</li>
<li><code>Ctrl + b</code>向上翻页</li>
<li><code>ctrl + f</code>向下翻页（是可见的）</li>
<li><code>ctrl + f</code>向上翻页（可见）</li>
</ul>
<p>补充：按shift +小字母输出的便是这个字母的大写，还有Linux中命令是分大小写的</p>
<ul>
<li><code>G</code> 移动到最后一行（<code>shift +g</code>)</li>
<li><code>gg</code> 移动到第一行两下g</li>
</ul>
<h3 id="_4-不同方式编辑文本-以及跳跃单词" tabindex="-1"><a class="header-anchor" href="#_4-不同方式编辑文本-以及跳跃单词" aria-hidden="true">#</a> 4.不同方式编辑文本，以及跳跃单词</h3>
<ul>
<li><code>i</code>插入到光标的前面</li>
<li><code>a</code>插入到光标的后面</li>
<li><code>o</code>在当前行的下一行输入，相当于回车</li>
<li><code>x</code> 删除光标所在字符</li>
<li><code>dd</code>删除当前一整行</li>
<li><code>u</code>撤销操作</li>
<li><code>dw</code>骚操作将光标所在位置的单词给干掉</li>
<li><code>b</code>跳跃到单词的首字母，还有<code>shirft+b</code></li>
<li><code>e</code>跳跃到单词的最后，还有<code>shift+e</code></li>
<li><code>w</code>跳跃单词,先跳到单词的首字母，然后再跳到单词的最后</li>
<li><code>shift+w</code>大跳</li>
</ul>
<h3 id="_5-跳跃行首行尾" tabindex="-1"><a class="header-anchor" href="#_5-跳跃行首行尾" aria-hidden="true">#</a> 5.跳跃行首行尾</h3>
<ul>
<li><code>shift+5</code>再本行的开头和结尾中来回切换</li>
<li><code>shift+4</code> 跳跃到本行的末尾</li>
<li><code>shift+6</code>跳跃到本行的开头</li>
<li><code>r</code>替换字母</li>
<li>再普通模式里千万别使用退格键backspace,delete,因为它是一个命令，而不是删除键</li>
</ul>
<h3 id="_6-大括号跳跃函数段落" tabindex="-1"><a class="header-anchor" href="#_6-大括号跳跃函数段落" aria-hidden="true">#</a> 6.大括号跳跃函数段落</h3>
<ul>
<li><code>{，}</code>大括号以大括号为单位进行跳跃</li>
</ul>
<h3 id="_7-vim复制剪切粘贴" tabindex="-1"><a class="header-anchor" href="#_7-vim复制剪切粘贴" aria-hidden="true">#</a> 7.vim复制剪切粘贴</h3>
<ul>
<li><code>p</code>类似于粘贴，它保存着剪切版里的内容，dd删除的东西也是再剪切版里的</li>
<li><code>yw</code>表示复杂光标所在得单词</li>
<li><code>y$</code>表示在本行中从当前光标开始，复制本行后面的全部内容</li>
</ul>
<h3 id="_8-visual可视化模式-选择" tabindex="-1"><a class="header-anchor" href="#_8-visual可视化模式-选择" aria-hidden="true">#</a> 8.Visual可视化模式（选择）</h3>
<ul>
<li>
<p>可视化模式：作用——让你选择文本的</p>
</li>
<li>
<p>在普通模式下边按<code>v</code>进入可视化模式</p>
</li>
<li>
<p><code>v</code>——&gt;<code>hjkl</code>操作选择——&gt;<code>y</code>复制——&gt;<code>p</code>粘贴</p>
</li>
<li>
<p>如果是大V则是以行为单位的</p>
</li>
<li>
<p><code>全选</code>：<code>gg</code>跳到首行——&gt;<code>v</code>——&gt;<code>G</code>跳到末尾行（然后边可选择<code>y</code>复制或者<code>d</code>删除掉）</p>
</li>
<li>
<p><code>o</code>跳转到你选中的文本中的开头或末尾</p>
</li>
<li>
<p>在视图模式中也是可以使用前面普通模式中的多种跳跃模式的https://cdn.jsdelivr.net/gh</p>
</li>
<li>
<p><code>ctrl+v</code>矩阵选择（上图理解）</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2f680cdca1942f9a9316b2e2231ebac~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20211014193751132"></p>
</li>
</ul>
<!---->
<ul>
<li><code>0零</code>补全角落</li>
<li><code>vaw</code>光标在单词的任意位置时，迅速选择当前单词</li>
<li><code>vib</code>选择当前单词连同包着它的括号（小括号）</li>
<li><code>viB</code>选择当前大括号及里边的所有东西</li>
<li><code>vit</code>选择xml中的尖括号中的内容，不是xml里的尖括号不能使用</li>
<li><code>va&lt;</code>选择尖括号，</li>
</ul>
<h3 id="_9-视图模式其他的用法" tabindex="-1"><a class="header-anchor" href="#_9-视图模式其他的用法" aria-hidden="true">#</a> 9.视图模式其他的用法</h3>
<ul>
<li><code>v+shift+&lt;&gt;</code>将选择的代码左右缩进</li>
<li><code>v+shift+~</code>将选中内容中将小写的转化为大写，将大写的转化为小写</li>
<li><code>U</code>将选中的内容全部转为大写的</li>
<li><code>u</code>都变成小写的</li>
</ul>
<h3 id="_10-查找和替换" tabindex="-1"><a class="header-anchor" href="#_10-查找和替换" aria-hidden="true">#</a> 10.查找和替换</h3>
<ul>
<li>
<h6 id="输入你要查找的内容-光标将跳跃到你需要查找的内容的地方-如果要查找的内容有多个相同的-那么可以使用回车-n来将光标跳跃到下一个和相同的内容上" tabindex="-1"><a class="header-anchor" href="#输入你要查找的内容-光标将跳跃到你需要查找的内容的地方-如果要查找的内容有多个相同的-那么可以使用回车-n来将光标跳跃到下一个和相同的内容上" aria-hidden="true">#</a> <code>/+输入你要查找的内容</code>，光标将跳跃到你需要查找的内容的地方，如果要查找的内容有多个相同的，那么可以使用<code>回车+n</code>来将光标跳跃到下一个和相同的内容上</h6>
</li>
</ul>
<!---->
<ul>
<li>
<p><code>:s/你要替换的东西/替换成什么/g</code>在vscode里所有回车执行替换.替换行</p>
</li>
<li>
<p>替换整个文件里的某个内容<code>:%s/你要替换的东西/替换成什么/g</code></p>
</li>
<li>
<p>选中行号进行替换<code>:set number</code>临时选中行号，在vscode中不需要</p>
</li>
<li>
<p><code>:9,15s/你要替换的东西/替换成什么/g</code>替换第9行到15行的内容</p>
</li>
<li>
<p><code>:s/你要替换的东西/替换成什么/gc</code>带有提示的替换，会挨个询问是否替换</p>
</li>
</ul>
</template>
