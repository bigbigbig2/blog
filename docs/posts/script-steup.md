---
layout: Post
title: vue中setup,script setup语法糖梳理
date: 2021-11-03
headerImage: /img/in-post/bu/17.jpg
catalog: true
tags:
  - vue
---

## 一，setup

### 1，简介

- setup 函数是⼀个新的组件选项。作为在组件内使⽤ Composition API 的⼊⼝点。
- setup里写的东西，方法什么可以在外调用，但是在外部写的东西不能再setup内部使用
- 在created实例之前执行

- 注意：在setup()中不能用this
- 在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取，这也是为了避免setup()和其他选项式API混淆。

### 2，返回类型

- 对象

  - 对象的属性将被合并到组件的渲染函数上下⽂：

  - 使用return暴露给模板

- 函数（渲染函数）
  - 该函数会作为组件渲染函数（h函数），渲染函数会创建一个虚拟dom，同时意味着不用依赖挂载到某个dom

### 3，setup参数

#### props

- props是响应式的，但是不能解构，否则将失去响应能⼒如果需要结构，可以在`setup`函数中使用`toRefs`来完成解构

  ```js
  setup(props,context){
   const {count} = toRefs(props);// 这样props不会失去响应式
  }
  ```

- 当传入新的 prop 时，它将被更新

  可以通过props拿到setup外部的数据

  ```js
  <script lang="ts">
      export default {
          props: {
              title: {
                  type: String,
                  default:()=>{return '测试信息'}
              }
          },
          setup(props:any) {
              console.log(props.title)
          }
      }
  </script>
  ```

  

#### context上下文

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/971e428c49d84a5aa2670f8f731b3004~tplv-k3u1fbpfcp-zoom-1.image)


  - attrs

    - ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3549c9557a24df5890a1a618190820e~tplv-k3u1fbpfcp-zoom-1.image)

  - slots

    - ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fd629dea03847ea87e89ae2c94b4bcf~tplv-k3u1fbpfcp-zoom-1.image)

  - emit

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24018e895c434454bf2e606fef9747fd~tplv-k3u1fbpfcp-zoom-1.image)


![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd8eff5c028047bfb67e68083ef94824~tplv-k3u1fbpfcp-zoom-1.image)


```vue
/* 参数说明
 * props 是响应式的，当传入新的 prop 时，它将被更新
 * context 是一个普通的上下文JavaScript对象，它暴露组件的三个 property（包括属性，插槽，方法）,
 * 如下示例1所示 
 */
// 示例1
<script>
    export default {
      setup(props, context) {
        // Attribute (非响应式对象)
        console.log(context.attrs)
        // 插槽 (非响应式对象)
        console.log(context.slots)
        // 触发事件 (方法)
        console.log(context.emit)
      }
    }
</script>
```

## 二 ，script setup语法糖 

注意：defineProps不需要引入，vue单文件内部自动暴露的API

```js
<script setup lang="ts"><script>是在单文件组件（SFC）中使用组合式API的编译时的语法糖。相比普通setup的语法，它具有更多优势：
- 更少的样板内容，更简洁的代码，比如：省略了组件的注册声明，对象暴露return，methods,。
- 能够使用纯 Typescript 声明 props 和发出事件。
- 更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。
- 更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)。
```

**注意点：**

1、在setup语法糖中导入组件不需要注册声明，直接在视图中使用即可；直接import导入，然后直接子啊template里使用即可

2、vue文件结构发生改变，js默认放到页面顶部，而视图template放到js下面，style放到页面底部；

3、导入vue文件必须写上文件后缀名.vue, 否则ts无法识别vue文件。

代码示例:

```vue
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
//这里引入后不用注册便可以直接使用
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

示例对比：

```vue
// 基础setup用法
<script lang="ts">
    export default {
        props: {
            title: {
                type: String,
                default:()=>{return '测试信息'}
            }
        },
        setup(props:any) {
            console.log(props.title)
        }
    }
   //将在控制台打印'测试信息'，这里发出警告是因为App.vue文件里缺少了视图template
</script>
// script setup 语法糖
<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            default:()=>{return '测试信息'}
        }
    })
    console.log(props.title);
</script>
```



### 1、defineProps 和 defineEmits

**`注意：defineProps` 和 `defineEmits` 都是只在 `<script setup>` 中才能使用的编译器宏**

```js
为了声明 `props` 和 `emits` 选项且具备完整的类型推断，可以使用 `defineProps` 和 `defineEmits` API，它们在 `<script setup>` 中都是自动可用的：

- **`defineProps` 和 `defineEmits` 都是只在 `<script setup>` 中才能使用的****编译器宏**。他们不需要导入，且会在处理 `<script setup>` 的时候被编译处理掉。
- `defineProps` 接收与 `props` 选项相同的值，`defineEmits` 也接收 `emits` 选项相同的值。
- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推断。
- 传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的范围。因此，传入的选项不能引用在 setup 范围中声明的局部变量。这样做会引起编译错误。但是，它*可以*引用导入的绑定，因为它们也在模块范围内。
```

子组件vue

```vue
<template>
    <p>{{props.msg}}</p>
    <button @click="handleClick">点击我调用父组件方法</button>
</template>
<script setup lang="ts">
    const props = defineProps({
         msg:{
            type: String,
            default: () => '默认值'
         }
    })
    const  emit = defineEmits(['on-change', 'update'])
    const handleClick = () =>{
        //第一个参数为父方法，第二个参数是调用的
        emit('on-change', '父组件方法被调用了')
    }
</script>
```

3、父组件vue

```vue
<script setup lang="ts">
    import TestPropsPmit from './components/test-props-emit/index.vue';
    import { ref } from 'vue';

    // 定义字符串变量
    const msg = ref('欢迎使用vite！')
	// 调用事件
    const handleChange = (params:string) =>{
        console.log(params);
    }
</script>
<template>
	<TestPropsPmit :msg="msg" @on-change="handleChange"></TestPropsPmit>
</template>
```



**温馨提示：这里介绍一哈volar插件小图标在vue文件里的作用：**

点击这个三角形图标，会将文件归类显示，方便编写代码；



- 子组件调用父组件的东西
  - 使用api:`defineEmit`

### 2，defineExpose

使用 `<script setup>` 的组件是**默认关闭**的，也就通过模板 ref 或者 `$parent` 链获取到的组件的公开实例，不会暴露任何在 `<script setup>` 中声明的绑定。

为了在 `<script setup>` 组件中明确要暴露出去的属性，使用 `defineExpose` 编译器宏：

#### 子组件暴露属性和方法，给父组件引用

```vue
<script setup lang="ts">
function testChild():void{
    console.log('子组件方法testChild被调用了');
}
const b = ref(2)
// 统一暴露属性
defineExpose({
    obj:{name: '张三', age: 2300},
    b,
    testChild
})
</script>
```

#### 父组件调用子组件方法和属性

```vue
<template>
		<!-- 将子组件暴露的东西传给父组件 -->
    <TestPropsEmit ref="propsEmitRef" :msg='msg' @on-change="handleChange">         	</TestPropsEmit>
</template>
<script setup lang="ts">
    import TestPropsEmit from './components/test-props-emit/index.vue';
    import {ref, onMounted} from 'vue';

    const msg = ref('欢迎学习vite')

    const handleChange = (params:string)=>{
        console.log(params);
    }

    const propsEmitRef = ref()
    onMounted(()=>{
        //打印子组件通过defineExpose暴露的东西
        console.log(propsEmitRef.value.child);
    })
</script>
```

#### 在setup如何定义变量(字符串,对象,数组)

没有什么不同的，以前的是子啊setup(){里写}，也子啊里面解构

```vue
<template>
    <h2>{{count}} {{user.name}}</h2>
    <span v-for="(item, index) in arr" :key="index">{{item}}</span>
    <button @click="setName">点击我增加</button>
</template>
<script setup lang="ts">
    import { ref, reactive } from 'vue';
    // 字符串变量
    const count = ref(0)
    // 对象
    let user = reactive({
        name: '张三'
    })
    // 数组
    let arr = reactive(['1', '2', '3'])
    
    // 综合定义方案，就是响应式的数据将它们定义在一起，代替上面的写法，但是在使用的时候
    //注意修改为originData.count,orifinData.user.name,originData.arr
    const originData = reactive({
        count: 0,
        user:{
            name: '张三'
        },
        arr: ['1', '2', '3']
    })
    
    // 方法
    const setName = ()=>{
        count.value++
        user.name = '李四'
    }
</script>
```



### 3、Watch和WatchEffect

#### 基本使用：

```vue
<template>
    <p>{{originData.count}}  {{originData.user.name}}</p>
    <p v-for="(item, index) in originData.arr" :key="index">{{item}}</p>
    <button @click="incriment">点击我count增加</button>
</template> 
<script setup lang="ts">
    import { ref, reactive, watchEffect, watch } from 'vue';

    const count = ref(0)
    const user = reactive({name: '张三'})
    const arr = reactive([1,2,3,4])

    // 综合定义方案
    const originData = reactive({
        count: 0,
        user:{
            name: '张三'
        },
        arr:[1,2,3,4]
    })
    const incriment = ()=>{
        originData.count++
        count.value++
        originData.user.name = '李四'
    }
	// 默认页面更新之前立即执行监听，懒执行开始
    watchEffect(() => console.log(count.value))
    // 默认监听数据变化后的值，页面更新后不会立即执行
    watch(count, (n, o) => {
        console.log('watch', n, o);
    })
    
    // 监听多个值
    watch([count, originData.user], (newValues, prevValues) => {
        console.log(newValues[0], newValues[1].name)
    })

    // 立即监听
    watch([count, originData.user], (newValues, prevValues) => {
        console.log(newValues[0], newValues[1].name)
    }, {deep: true, immediate: true})
   
</script>
  
```

#### watch与 watchEffect 比较，推荐watch监听

watch: 页面更新后不会立即执行，而watchEffect 它会执行；

如果要实现：watch在页面更新之后就执行，需要增加立即执行的属性；

```vue
watch([count,originData.user], (n, o)=> {console.log(n[0],n[1].name)}, {deep: true, immediate: true})
```



```
1、watch和watchEffect都懒执行副作用，不过watchEffect比较频繁，在vue组件更新之前执行；
2、watch更具体地说明什么状态应该触发侦听器重新运行，watchEffect就没有这么友好；
3、watch访问侦听状态变化前后的值。
```



### 4、在setup中的生命周期钩子

因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写。

下表包含如何在 [setup ()](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 内部调用生命周期钩子：

| 选项式 API        | Hook inside `setup`               |
| ----------------- | :-------------------------------- |
| `beforeCreate`    | Not needed*    不需要             |
| `created`         | Not needed*    不需要             |
| `beforeMount`     | `onBeforeMount` 挂载之前          |
| `mounted`         | `onMounted`    页面加载完成时执行 |
| `beforeUpdate`    | `onBeforeUpdate`                  |
| `updated`         | `onUpdated`                       |
| `beforeUnmount`   | `onBeforeUnmount`                 |
| `unmounted`       | `onUnmounted`  页面销毁时执行     |
| `errorCaptured`   | `onErrorCaptured`                 |
| `renderTracked`   | `onRenderTracked`                 |
| `renderTriggered` | `onRenderTriggered`               |
| `activated`       | `onActivated`                     |
| `deactivated`     | `onDeactivated`                   |

```typescript
<script setup lang="ts">
import { onMounted, onActivated, onUnmounted, onUpdated, onDeactivated } from 'vue';
// 读取环境变量
const mode = import.meta.env;
//   import HeadMenu from '@/components/head-menu/index.vue';
 onMounted(() => {
 console.log("组件挂载")
 })

 onUnmounted(() => {
 console.log("组件卸载")
 })

 onUpdated(() => {
 console.log("组件更新")
 })
 onActivated(() => {
 console.log("keepAlive 组件 激活")
 })

 onDeactivated(() => {
 console.log("keepAlive 组件 非激活")
 })
</script>
```

```js
const propsEmitRef = ref()
    onMounted(()=>{
        //打印子组件通过defineExpose暴露的东西
        //console.log(propsEmitRef.value.child);
        console.log('onMounted');
    })
    //子啊页面加载完成之前调用的方式，等同于created钩子
    //因为所有setup是在created钩子上的
    function createds(){
      console.log('created');
    }
    createds()
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f43e548f644406897470b36c663d732~tplv-k3u1fbpfcp-zoom-1.image)


### 5、用Ts限制define(Emits|Props)参数类型

**注意：**

**1、在setup语法糖中引入组件不需要注册声明就可以直接用了**

**2、ts 限制组件传参类型，默认是必须传值的，否则控制台出现警告， 引入组件的地方会出现红色提醒，不想必传在绑定参数后加?即可** 

**3、ts传参支持多种类型校验，一个参数可以传字符串，数组，Boolean等**

**4、用ts方式限制defineEmits和defineProps参数类型**

类似于原生的props中的传值效验

1，子组件

```vue
<template >
    <h1>{{msg}}</h1>
    <h3>{{title}}</h3>
	<!-- @blur：失去焦点时触发 -->
    <input v-model="inputValue" type="text" @blur="handleUpdate($event)">
</template>
<script setup lang="ts">
    import { ref } from "vue";
    //拿父组件传递过来的参数
    // defineProps({
    //     msg:String//使用的是vue的传参效验
    // })
    //下面使用ts来搞传参效验。 ？可选
    defineProps<{
            msg?:(string | number),
            title?: string
        }>()
    	//在父组件的值还没有传递过来时候属于默认值
         // 提供默认值方式 1 定义接口的方式
        interface Props{
            msg?: (string | number | boolean), 
            title?: string[]
        }

        withDefaults(defineProps<Props>(), {
            msg: 'hello',
            title: () => ['one', 'two']
        })

        // 提供默认方式 2
        withDefaults(defineProps<{
            msg?: (string | number | boolean)
            title?: string
        }>(), {
            msg: 3,
            title: '默认标题'
        })

    // const  emit = defineEmits(['updateValue'])
    const emit = defineEmits<{
                        (event: 'change'): void,
                        (event: 'update', data: string): void
                }>()

    const inputValue = ref<any>()

    const handleUpdate = (event: any) =>{
        const { target } = event
        // console.log(target.value, 1111);
        emit('update', event.target.value)
    }
</script>
```

补充：$event多事件处理器

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee820b0ada654892972dea4baee9f460~tplv-k3u1fbpfcp-zoom-1.image)


@blur：失去焦点时触发

@event对象：拿到当前对象

2、父组件

```vue
<script setup lang="ts">
    import CellSample from "./components/cell-samples/index.vue";
    
    const update = (data: any) =>{
        console.log(data);
    }
</script>

<template>
    <CellSample @update="update"></CellSample>
</template>


```

未完待续。。。

```mermaidjs
sequenceDiagram
  Alice->John: Hello John, how are you?
  loop Every minute
    John-->Alice: Great!
  end
```
