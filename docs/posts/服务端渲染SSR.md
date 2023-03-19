---
layout: Post
title: 服务端渲染SSR
date: 2021-12-25
headerImage: /img/in-post/bu/12.jpg
catalog: true
tags:
  - SSR
---

### 一，补充:浏览器渲染HTML页面过程

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aad68ef2a5174e67ae4af99ffe4bc06f~tplv-k3u1fbpfcp-zoom-1.image)




### 二，客户端渲染CSR

- 也叫动态渲染。

如今我们大部分WEB应用都是使用 JavaScript 框架（Vue、React、Angular）进行页面渲染的，也就是说，在执行 JavaScript 脚本的时候，HTML页面已经开始解析并且构建DOM树了（浏览器工作原理内容），JavaScript 脚本只是动态的改变 DOM 树的结构，使得页面成为希望成为的样子，这种渲染方式叫动态渲染，也可以叫客户端渲染（client side rende）。

### 三，服务端渲染SSR

#### 理解

- 服务端渲染就是在浏览器请求页面URL的时候，服务端将我们需要的HTML文本组装好，并返回给浏览器，这个HTML文本被浏览器解析之后，不需要经过 JavaScript 脚本的执行，即可直接构建出希望的 DOM 树并展示到页面中。这个服务端组装HTML的过程，叫做服务端渲染。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7afd6f471fe4460886a009d26663111~tplv-k3u1fbpfcp-zoom-1.image)


#### 服务的渲染的历程

##### 最初只有服务端渲染

在没有AJAX的时候，也就是web1.0时代，几乎所有应用都是服务端渲染（此时服务器渲染非现在的服务器渲染），那个时候的页面渲染大概是这样的

![image-20211013183232887](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c79c4ea6b9a4dd3862bcd032fc55991~tplv-k3u1fbpfcp-zoom-1.image)

##### 出现客户端渲染（出现前后端分离）

前后端分离之后，网页开始被当成了独立的应用程序（SPA，Single Page Application），前端团队接管了所有页面渲染的事，后端团队只负责提供所有数据查询与处理的API

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a636daa0088848b7bb61424bf409adf5~tplv-k3u1fbpfcp-zoom-1.image)


##### 又出现服务端渲染

随着单页应用（SPA）的发展，程序员们渐渐发现 SEO（Search Engine Optimazition，即搜索引擎优化）出了问题，JavaScript 脚本也不断的臃肿起来，出现首屏渲染慢的问题，使用 nodejs 在服务器进行页面的渲染

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf17ad78872943b881a050c802a393a6~tplv-k3u1fbpfcp-zoom-1.image)


相比于客户端渲染，这里多了在前端服务中向后端服务器请求数据然后组装html返回给浏览器，使其在第一次加载页面时的HTML不是空壳的

### 四，服务端渲染的利弊

#### 优点

##### 利于SEO

有利于SEO，别人使用搜索引擎搜索相关的内容时，你的网页排行能靠得更前。

##### 有利于爬虫来爬你的页面

爬虫分为低级合高级

- 低级爬虫：只请求URL，URL返回的HTML是什么内容就爬什么内容。（如果是客户端渲染就没什么鸟用了，因为放回的HTML只是一个空壳）
- 高级爬虫：请求URL，加载并执行JavaScript脚本渲染页面，爬JavaScript渲染后的内容

##### 首屏加载事件短

相对于客户端渲染，服务端渲染在浏览器请求URL之后已经得到了一个带有数据的HTML文本，浏览器只需要解析HTML，直接构建DOM树就可以。而客户端渲染，需要先得到一个空的HTML页面，这个时候页面已经进入白屏，之后还需要经过加载并执行 JavaScript、请求后端服务器获取数据、JavaScript 渲染页面几个过程才可以看到最后的页面。特别是在复杂应用中，由于需要加载 JavaScript 脚本，越是复杂的应用，需要加载的 JavaScript 脚本就越多、越大，这会导致应用的首屏加载时间非常长，进而降低了体验感。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e2b8abf42094713b678af298179087d~tplv-k3u1fbpfcp-zoom-1.image)


#### 缺点

并不是所有的WEB应用都必须使用SSR，这需要开发者自己来权衡，因为服务端渲染会带来以下问题：

- 代码复杂度增加。为了实现服务端渲染，应用代码中需要兼容服务端和客户端两种运行情况，而一部分依赖的外部扩展库却只能在客户端运行，需要对其进行特殊处理，才能在服务器渲染应用程序中运行。
- 需要更多的服务器负载均衡。由于服务器增加了组装渲染HTML的需求，使得原本只需要输出静态资源文件的nodejs服务（前端服务器），新增了数据获取的IO和渲染HTML的CPU占用，如果流量突然暴增，有可能导致服务器down机，因此需要使用响应的缓存策略和准备相应的服务器负载。
- 涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序 (SPA) 不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。

所以在使用服务端渲染SSR之前，需要开发者考虑投入产出比，比如大部分应用系统都不需要SEO，而且首屏时间并没有非常的慢，如果使用SSR反而小题大做了。

### 五，同构

假如我们需要在项目中使用服务端渲染，我们需要做什么呢？那就是同构我们的项目。

#### 同构的定义

在服务端渲染中，有两种页面渲染的方式：

- 前端服务器通过请求后端服务器获取数据并组装HTML返回给浏览器，浏览器直接解析HTML后渲染页面（首次渲染）
- 浏览器在交互过程中，请求新的数据并动态更新渲染页面（之后渲染）

这两种渲染方式有一个不同点就是，一个是在服务端中组装html的，一个是在客户端中组装html的，运行环境是不一样的。所谓同构，就是让一份代码，既可以在服务端中执行，也可以在客户端中执行，并且执行的效果都是一样的，都是完成这个html的组装，正确的显示页面。也就是说，一份代码，既可以客户端渲染，也可以服务端渲染。

#### 同构的实现

对于同构应用来说，我们必须实现客户端与服务端的路由、模型组件、数据模型的共享。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5837a2907e043468f46e6f3eafcad74~tplv-k3u1fbpfcp-zoom-1.image)


我们思考一个应用中一个页面的组成，假如我们使用的是`Vue.js`，当我们打开一个页面时，首先是打开这个页面的URL，这个URL，可以通过应用的`路由`匹配，找到具体的页面，不同的页面有不同的视图，那么，视图是什么？从应用的角度来看，视图 = `模板` + `数据`，那么在 Vue.js 中， 模板可以理解成`组件`，数据可以理解为`数据模型`，即响应式数据



### 六，实践

#### 实现基础的NODEJS服务端渲染

```js
const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send(`
        <html>
            <head>
                <title>SSR</title>
            </head>
            <body>
                <p>hello world</p>
            </body>
        </html>
    `);
});

app.listen(3001, function() {
    console.log('listen:3001');
});
//当浏览器拿到服务器返回的这一段HTML源代码的时候，不需要加载任何JavaScript脚本，就可以直接将hello world显示出来。
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a72cb455fdb4a5f84483514259d104b~tplv-k3u1fbpfcp-zoom-1.image)


因为请求的东西都在前端服务器，使用只返回前端服务器的东西

#### 实现基础的VUE客户端渲染

```vue
<template>
  	<div>
    		<p>hello world</p>
    		<button @click="sayHello">say hello</button>
  	</div>
</template>

<script>
export default {
    methods: {
        sayHello() {
	          alert('hello ssr');
        }
    }
}
</script>
使用vue脚手架新建一个vue项目，修改一个App.vue组件：
```

然后运行`npm run serve`启动项目，打开浏览器可以看到页面已经被渲了显示 hello world，但是打开检查看源代码

![image-20211013193931212](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e8afa76acee443a81beb3bfebc6129a~tplv-k3u1fbpfcp-zoom-1.image)

除了简单的兼容性处理 noscript 标签以外，只有一个简单的id为app的div标签，没有关于hello world的任何字眼，可以说这是一个空的页面（白屏），而当加载了下面的 script 标签的 JavaScript 脚本之后，页面开始这行这些脚本，执行结束，hello world 正常显示。也就是说真正渲染 hello world 的是 JavaScript 脚本。

##### 

#### 同构VUE项目

##### 构建配置

1. ##### 第一步：构建服务端代码

   在服务端代码构建结束后，需要将构建结果运行在nodejs服务器上，但是，对于服务端代码的构建，有一下内容需要注意：

   - 不需要编译CSS，样式表只有在浏览器（客户端）运行时需要。
   - 构建的目标的运行环境是commonjs，nodejs的模块化模式为commonjs
   - 不需要代码切割，nodejs将所有代码一次性加载到内存中更有利于运行效率

   ```js
   //服务端的 webpack 构建配置文件 vue.server.config.js
   const nodeExternals = require("webpack-node-externals");
   const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
   
   module.exports = {
       css: {
           extract: false // 不提取 CSS
       },
       configureWebpack: () => ({
           entry: `./src/server-entry.js`, // 服务器入口文件
           devtool: 'source-map',
           target: 'node', // 构建目标为nodejs环境
           output: {
               libraryTarget: 'commonjs2' // 构建目标加载模式 commonjs
           },
           // 跳过 node_mdoules，运行时会自动加载，不需要编译
           externals: nodeExternals({
               allowlist: [/\.css$/] // 允许css文件，方便css module
           }),
           optimization: {
               splitChunks: false // 关闭代码切割
           },
         	plugins: [
               new VueSSRServerPlugin()
           ]
       })
   };
   //使用 vue-server-renderer提供的server-plugin，这个插件主要配合下面讲到的client-plugin使用，作用主要是用来实现nodejs在开发过程中的热加载、source-map、生成html文件。
   ```

2. 第二步：构建客户端代码	

   在构建客户端代码时，使用的是客户端的执行入口文件，构建结束后，将构建结果在浏览器运行即可，但是在服务端渲染中，HTML是由服务端渲染的，也就是说，我们要加载那些JavaScript脚本，是服务端决定的，因为HTML中的script标签是由服务端拼接的，所以在客户端代码构建的时候，我们需要使用插件，生成一个构建结果清单，这个清单是用来告诉服务端，当前页面需要加载哪些JS脚本和CSS样式表。

   

   ```js
   //客户端的构建配置，vue.client.config.js
   const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
   
   module.exports = {
       configureWebpack: () => ({
           entry: `./src/client-entry.js`,
           devtool: 'source-map',
           target: 'web',
           plugins: [
               new VueSSRClientPlugin()
           ]
       }),
       chainWebpack: config => {
         	// 去除所有关于客户端生成的html配置，因为已经交给后端生成
           config.plugins.delete('html');
           config.plugins.delete('preload');
           config.plugins.delete('prefetch');
       }
   };
   //使用vue-server-renderer提供的client-server，主要作用是生成构建加过清单vue-ssr-client-manifest.json，服务端在渲染页面时，根据这个清单来渲染HTML中的script标签（JavaScript）和link标签（CSS）
   ```

   接下来，我们需要将`vue.client.config.js`和`vue.server.config.js`都交给vue-cli内置的构建配置文件`vue.config.js，`根据环境变量使用不同的配置

   ```js
   // vue.config.js
   const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
   const serverConfig = require('./vue.server.config');
   const clientConfig = require('./vue.client.config');
   
   if (TARGET_NODE) {
       module.exports = serverConfig;
   } else {
       module.exports = clientConfig;
   }
   
   ```

   使用`cross-env`区分环境

   ```js
   {
     "scripts": {
       "server": "babel-node src/server.js",
       "serve": "vue-cli-service serve",
       "build": "vue-cli-service build",
       "build:server": "cross-env WEBPACK_TARGET=node vue-cli-service build --mode server"
     }
   }
   
   ```

##### 实现模板组件的共享

实现模板组件的共享：使vue的组件代码也可以在服务端中运行，首先我们需要解决代码编译问题。

假如vue项目使用webpack构建，那么服务端代码的构建，也可以使用webpack

![image-20211013195908827](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58681341ff11422795ec0e8ce054b12d~tplv-k3u1fbpfcp-zoom-1.image)

1. 第一步：创建VUE实例

为了实现模板组件共享，我们需要将获取 Vue 渲染实例写成通用代码，如下 createApp：

```js
import Vue from 'vue';
import App from './App';

export default function createApp (context) {
    const app = new Vue({
        render: h => h(App)
    });
  	return {
      	app
    };
};

```

##### 实现路由的共享

##### 数据模型的共享与状态同步

### 七，ssr的两种模式

第一种是后端首次渲染的单页面应用，第二种是完全使用后端路由的后端模版渲染模式。他们区别在于使用后端路由的程度。

....
