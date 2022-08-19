---
layout: Post
title: ts类型系统补充
date: 2021-12-23
headerImage: /img/in-post/bu/15.jpg
permalinkPattern: /post/:year/:month/:day/:slug/
catalog: true
tags:
  - ts
---
## 1，类型保护

我们通常在 JavaScript 中通过判断来处理⼀些逻辑，在 TypeScript 中这种条件语句块还有另外⼀ 个特性：根据判断逻辑的结果，缩⼩类型范围（有点类似断⾔），这种特性称为类型保护 ，触发条件：

```typescript
逻辑条件语句块：if、else、elseif
特定的一些关键字：typeof、instanceof、in....
```

```typescript
function fn(a: string|number){
    //这时编译器将会报错，因为a变量可能是字符串，但也有可能是数字，ts告
    //诉我们，你不能直接作为字符串去使用，有风险
    //a.substring(1,2)//使用了字符串的方法
    //解决的方式1：类型断言
    (<string> a).substring(1);
    //解决方法2：类型保护
    if (typeof a === 'string'){
        a.substring(1);
    }else{
        a.toFixed(1)//number类型的方法
    }
}
```



### typeof

我们知道 typeof 可以返回某个数据的类型，在 TypeScript 在 if 、 else 代码块中能够把 typeof 识别为类型保护，推断出适合的类型

```javascript
function fn(a: string|number) {
 // error，不能保证 a 就是字符串
 	a.substring(1);
 	if (typeof a === 'string') {
 	// ok
 		a.substring(1);
 	} else {
 	// ok
 		a.toFixed(1);
 }
}
```

### instanceof

与 typeof 类似的(写法不同罢了)， instanceof 也可以被 TypeScript 识别为类型保护

```typescript
function fn(a: Date|Array<any>) {
    if (a instanceof Array) {
        a.push(1);
    }else{
        a.getFullYear();
    }
}
```

### in

```typescript
interface IA {
    x: string;
    y: string;
}
interface IB {
    a: string;
    b: string;
}
function fn(arg: IA | IB ){
    if ('x' in arg){
        //ok
        arg.x;
        //error
        arg.a;
    }else {
        //ok
        arg.a;
        //error
        arg.x;
    }
}
```

### 字面量类型保护

如果类型为字面量类型，那么还可以通过该字面量类型的字面值进行推断

```typescript
interface IA {
    type: 'IA'; //字面量类型）
    x:string;
    y;string;
}
interface IB {
    typ: 'IB';
    a: string;
    b: string;
}
function fn(arg: IA | IB){
    //属于IA类型
    if(arg.type === 'IA'){
        //OK
        arg.x;
        //error
        arg.a;
     //属于IB类型
    }else {
        //ok
        arg.a;
        //error
        arg.x;
    }
}
```



### 自定义类型保护

有的时候，以上的一些方式并不能满足一些特殊情况，则可以自定义类型保护规则

```typescript
//实例
//Element[] 数组元素，NodeList类数组，Element单个元素
//通过一个辅助函数来实现
function canEach(data: any):data is Element[] | NodeList{
    return data.forEach ！== undefined; //可以使用canEach的话就为true
}
function fn2(elements:Element[] | NodeList | Element ){
    //数组类型时
    if (canEach(element)){
        elements.forEach(el:Element) =>{
            el.classList.add('box');
        }
    }else{
        elements.classList.add('box');
    }
}
```

`data is Element[]|NodeList` 是一种类型谓词，格式为：xx is XX ，返回这种类型的函数就可以被 TypeScript 识别为类型保护

## 2，类型操作

TypeScript 提供了⼀些⽅式来操作类型这种数据，但是需要注意的是，类型数据只能作为类型来使 ⽤，⽽不能作为程序中的数据，这是两种不同的数据，⼀个⽤在编译检测阶段，⼀个⽤于程序执⾏阶段

### typeof

在 TypeScript 中， typeof 有两种作⽤

- 获取数据的类型
- 捕获数据的类型

```typescript
let str1 = 'kaikeba';
//let声明的是变量，里面存储的数据是程序运行中使用的
let t = typeof str1;
//type 声明的是类型名称，这个值只是在ts编译监测阶段使用
type myType = "string";
type myType = typeof str1;

let a = t;
let b:myType = '....';
```

### keyof

获取类型的所有值的 key 的集合

```typescript
//实例
interface Person {
    name: string;
    age: number;
}
// 等同：type personKeys = "name" | "age"
type personkey = keyof Person;//这时personkey存储的为类型Person的key："name","age"

let p1 = {
    name:'zMouse',
    age:35
}
function getPersonVal(k: personKeys) {
	return p1[k];
}
/*
等同：
function getPersonVal(k: 'name'|'age') {
	return p1[k];
}
*/
getPersonVal('name'); //正确
getPersonVal('gender'); //错误
```

### in

针对类型进行操作的话，内部使用的 `for...in` 对类型进行遍历

```typescript
interface Person {
    name: string;
    age: number;
}
//取出Person里的key
type personKeys = keyof Person;
type newPerson = {
    //定义一个新的类型，取到Person的键为相同的键，将它们都定义为number类型
    [k in personKeys]:number;
    /*等同于
    [key in 'name' | 'age']: number;
    也可以写成
    [key in keyof Person]: number;
    */
}
/*
type newPerson = {
	name:number;
	age:number;
}
*/
```

注意：in 后面的类型值必须是 string 或者 number 或者 symbol

## 3，类型兼容

TypeScript 的类型系统是基于结构⼦类型的，它与名义类型（如：java）不同（名义类型的数据类型 兼容性或等价性是通过明确的声明或类型的名称来决定的）。这种基于结构⼦类型的类型系统是基于组 成结构的，只要具有相同类型的成员，则两种类型即为兼容的。

```typescript
class Person {
    name:string;
    age: number;
}
class Cat {
    name: string;
    age: number;
}
function fn(p1: Person){
    p.name;
}
let xiaohua = new Cat();
// ok，因为 Cat 类型的结构与 Person 类型的结构相似，所以它们是兼容的
fn(xiaohua)
```


