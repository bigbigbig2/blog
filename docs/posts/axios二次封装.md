---
layout: Post
title: axios二次封装
date: 2021-12-09
headerImage: /img/in-post/bu/14.jpg
permalinkPattern: /post/:year/:month/:day/:slug/
catalog: true
tags:
  - axios
---
## 1.简介

由于在项目里每次使用请求需要导入axios，并写请求axios请求，项目变大后就会变变得很复杂。可以将axios进行二次封装以便在之后更简便的使用axios。

## 2.代码是实例详解

```js
//axios二次封装（utils/request.js
import axios from "axios";
import config from "./../config"; 
import {ElMessage } from "element-plus" //导入一个报错提示组件
import router from './../router'
const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

//创建axios实例对象，添加全局配置
const service = axios.create({
    baseURL:config.baseApi,
    timeout:8000
})

//请求拦截封装(拦截下来给它添加token)
service.interceptors.request.use((req)=>{
    const headers = req.headers;
    if (!headers.Authorization) headers.Authorization = 'Bear jack'
    return req;
})

//响应拦截
service.interceptors.response.use((res)=>{
    const {code, data, msg} = res.data; 
    if (code === 200){
        return data;
    }else if (code === 40001){
        ElMessage.error(TOKEN_INVALID)
        setTimeout(()=>{
            router.push('/login')
        },15000)
        
        return Promise.reject(TOKEN_INVALID) //这将显示在控制台里
    }else{
        ElMessage.error(msg || NETWORK_ERROR)
    }
})
//封装函数本身（重点）
//请
function request(options){

    return service(options)
}
export default request;
```

```js
#post请求的参数默认叫data，get请求的参数默认叫params。为了统一，我们将它们都叫做data
// 发起一个post请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
// 在 node.js 用GET请求获取远程图片
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });

```

request函数的封装

```js
//封装函数本身（重点）
//请求核心函数
function request(options){
    options.method = option.method || 'get'
    //将get的请求参数params改为和post请求参数相同的data，这样在项目中就不用过度的去区分get请求还是post请求
    if (options.method.toLowerCase == 'get'){
        options.params = options.data
    }
    //mock数据相关
    if(config.env == 'prod'){
        service.defaults.baseURL = config.baseApi //确保万无一失
    }else{
        service.defaults.baseURL = config.mock ? config.mockApi:config.baseApi
    }
    return service(options)
}
```

**实例**：在中调用request封装函数

```js
#可以先在man.js中全局挂载注册封装好的请求函数，之后便可以在组件中直接使用了
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import request from './utils/request'

console.log("环境变量=>", import.meta.env);
const app= createApp(App)
// axios.get(config.mockApi + '/login').then((res)=>{
//     console.log(res)
// })

//全局注册某个变量
app.config.globalProperties.$request = request;
app.use(router).use(ElementPlus).mount('#app')
```

之后便可以在项目中直接这样使用axios调用接口了

```vue
<script>
import welcome from './Welcome.vue'
export default{
  name:'login',
  components:{
    welcome
  },
  mounted(){
    $this.request({
      method: 'get',
      url: '/login',
      data: {
        name:'jack'
  }
    }).then((res)=>{
      console.log(res)
    })
  },
  methods:{
    goHome(){
      this.$router.push('/welcome')
    }
  }
}
</script>

<template>
  <h1>欢迎来到登录页</h1>
  <el-button @click='goHome'>回首页</el-button>
</template>

<style>

</style>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/c78a8d363a1c4168a2759db29e58825b.png)

另外一种封装方式

```js
  mounted(){
    // this.$request ({
    //   //这里边的和axios API 类似
    //   method: 'get',
    //   //根据封装好的reques它便会自动的去判断当前环境以及去选择mockAPI
    //   url: '/login',
    //   data: {
    //     name:'jack'
    //   }
    // }).then((res)=>{
    //   console.log(res)
    // })
    this.$request.get('/login',{name:'jack'},{mock:true,loading:true}).then((res)=>{
      console.log(res)
    })
  },
```

```js
//封装函数本身（重点）
//请求核心函数
function request(options){
    options.method = options.method || 'get'
    //将get的请求参数params改为和post请求参数相同的data，这样在项目中就不用过度的去区分get请求还是post请求
    if (options.method.toLowerCase == 'get'){
        options.params = options.data
    }
    //mock数据相关
    if(config.env == 'prod'){
        service.defaults.baseURL = config.baseApi //确保万无一失
    }else{
        service.defaults.baseURL = config.mock ? config.mockApi:config.baseApi
    }
    return service(options)
}
//将一些静态属性添加到request函数上
['get','post','put','delete','patch'].forEach((item)=>{
    request[item] = (url,data,options) => {
        return request({
            url,
            data,
            method:item,
            ...options
        })
    }
})
```



