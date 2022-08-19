---
layout: Post
title: vim
subtitle: vim常用操作
date: 2021-12-06
headerImage: /img/in-post/bu/16.jpg
permalinkPattern: /post/:year/:month/:day/:slug/
catalog: true
tags:
  - vim
---


### 0.简单介绍

- 先下面介绍使用vscode+vim插件来使用（当然Linux中也行）
- 安装插件

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb11f52b5f9246999d12ba9cdbe0fc31~tplv-k3u1fbpfcp-watermark.image?)
安装好后推荐根据个人喜好配置一下setting.json文件（这里请自行查看配置参数进行选择）
linux中的配置文件有所不同，因为不是json格式的

附上自己的vim配置信息😐（setting.json)

```json
"vim.insertModeKeyBindings": [
    {
        //jj进入普通模式
        "before": ["j", "j"],
        "after": ["<Esc>"]

    }
],
"editor.quickSuggestions": {
    "strings": true
},
//leader键配置
"vim.leader": "<space>",  
//取消vim关系映射这几个组合键，这样就可以使用vscode原来的Ctrl+C键啥的了
"vim.handleKeys": {  
    "<C-a>": false,
    "<C-f>": false, 
    "<C-n>": false,
    "<C-c>": false,
    "<C-v>": false,
    "<C-x>": false
},
//"editor.lineNumbers":"relative" 根据行号跳跃h几行
"vim.startInInsertMode":true //以插入模式而不是普通模式启动
```

当显示下图时即ok了
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bfd422a018f471b95bc7764ce53c9af~tplv-k3u1fbpfcp-watermark.image?)
具体使用详见下文🤭

### 1.vim的四种模式

在不同的发行版通常需要安装，在有些发行版里是自带的（比如Ubuntu）但是不完整，还需要进行简单安装。

-   简单安装（Linux中）:sudo apt install vim
-   使用vim打开文件：vim 文件名
-   `普通模式`：（命令操作模式）：操作文件有光标在闪
-   `插入模式`：编辑的时候（输入insert或i进）最下面有INSERT显示编写完成之后——》进入普通模式（按esc)
-   保存需要切换到普通模式——》：wq+enter然后变可以使用cat命令器查看你文件编辑的内容 不保持即不需要加w
-   `命令模式`：当输入冒号“ ：”时 在命令模式中也是可以按esc键退出
-   `视图模式`：在普通模式下按v来进行

### 2.光标移动

vim解决了在移动光标的时时将手移动到方向键的麻烦

`HJKL`四个键可以操作替代上下左右键（[`先按esc退到在普通模式下`]()）

-   `H`向左
-   `L`向右
-   `J`向下
-   `K`向上

### 3.翻页

不推荐使用`page up` 和`pagae down` 来翻页，也不推荐使用k和j来翻

-   `Ctrl + f` 向下翻页
-   `Ctrl + b`向上翻页
-   `ctrl + f`向下翻页（是可见的）
-   `ctrl + f`向上翻页（可见）

补充：按shift +小字母输出的便是这个字母的大写，还有Linux中命令是分大小写的

-   `G` 移动到最后一行（`shift +g`)
-   `gg` 移动到第一行两下g

### 4.不同方式编辑文本，以及跳跃单词

-   `i`插入到光标的前面
-   `a`插入到光标的后面
-   `o`在当前行的下一行输入，相当于回车
-   `x` 删除光标所在字符
-   `dd`删除当前一整行
-   `u`撤销操作
-   `dw`骚操作将光标所在位置的单词给干掉
-   `b`跳跃到单词的首字母，还有`shirft+b`
-   `e`跳跃到单词的最后，还有`shift+e`
-   `w`跳跃单词,先跳到单词的首字母，然后再跳到单词的最后
-   `shift+w`大跳

### 5.跳跃行首行尾

-   `shift+5`再本行的开头和结尾中来回切换
-   `shift+4` 跳跃到本行的末尾
-   `shift+6`跳跃到本行的开头
-   `r`替换字母
-   再普通模式里千万别使用退格键backspace,delete,因为它是一个命令，而不是删除键

### 6.大括号跳跃函数段落

-   `{，}`大括号以大括号为单位进行跳跃

### 7.vim复制剪切粘贴

-   `p`类似于粘贴，它保存着剪切版里的内容，dd删除的东西也是再剪切版里的
-   `yw`表示复杂光标所在得单词
-   `y$`表示在本行中从当前光标开始，复制本行后面的全部内容

### 8.Visual可视化模式（选择）

- 可视化模式：作用——让你选择文本的

- 在普通模式下边按`v`进入可视化模式

- `v`——>`hjkl`操作选择——>`y`复制——>`p`粘贴

- 如果是大V则是以行为单位的

- `全选`：`gg`跳到首行——>`v`——>`G`跳到末尾行（然后边可选择`y`复制或者`d`删除掉）

- `o`跳转到你选中的文本中的开头或末尾

- 在视图模式中也是可以使用前面普通模式中的多种跳跃模式的https://cdn.jsdelivr.net/gh

- `ctrl+v`矩阵选择（上图理解）

  ![image-20211014193751132](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2f680cdca1942f9a9316b2e2231ebac~tplv-k3u1fbpfcp-zoom-1.image)

<!---->

-   `0零`补全角落
-   `vaw`光标在单词的任意位置时，迅速选择当前单词
-   `vib`选择当前单词连同包着它的括号（小括号）
-   `viB`选择当前大括号及里边的所有东西
-   `vit`选择xml中的尖括号中的内容，不是xml里的尖括号不能使用
-   `va<`选择尖括号，

### 9.视图模式其他的用法

-   `v+shift+<>`将选择的代码左右缩进
-   `v+shift+~`将选中内容中将小写的转化为大写，将大写的转化为小写
-   `U`将选中的内容全部转为大写的
-   `u`都变成小写的

### 10.查找和替换

- ###### `/+输入你要查找的内容`，光标将跳跃到你需要查找的内容的地方，如果要查找的内容有多个相同的，那么可以使用`回车+n`来将光标跳跃到下一个和相同的内容上

<!---->

- `:s/你要替换的东西/替换成什么/g`在vscode里所有回车执行替换.替换行

- 替换整个文件里的某个内容`:%s/你要替换的东西/替换成什么/g`

- 选中行号进行替换`:set number`临时选中行号，在vscode中不需要

- `:9,15s/你要替换的东西/替换成什么/g`替换第9行到15行的内容

- `:s/你要替换的东西/替换成什么/gc`带有提示的替换，会挨个询问是否替换

  