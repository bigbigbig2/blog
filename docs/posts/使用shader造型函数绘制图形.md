---
layout: Post
title: 使用shader造型函数绘制图形
date: 2022-11-01
subtitle: 使用smoothstep、step、fract等函数绘制基础图形，加强shader编程思想
useHeaderImage: true
headerImage: /img/in-post/2022-11-01/1.jpg
tags:
  - shader
---

[[toc]]


## 1.shader片段着色器基础

### [1]片段着色器的并行处理结构
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7b7a74134424d35b27e0220873a2b09~tplv-k3u1fbpfcp-zoom-1.image)


片段着色器**并行处理**（parallel processing）为了能使许多管线并行运行，每一个线程必须与其他的相独立，因此也出现了很多限制：

- 所有数据必须以相同的方向流动
- 无法检查其他线程的输出结果，修改输入的数据，或者把一个线程的输出结果输入给另一个线程

> 简单理解：屏幕中的每个像素都会执行一次片段着色器代码（同时执行），没有执行先后的概念

### [2]Uniforms

可以把 uniforms 想象成连通 GPU 和 CPU 的许多小的桥梁，尽管每个线程和其他线程之间不能有数据交换，但我们能从CPU给每个GPU线程输入数据。因为显卡的架构，所有线程的输入值必须**统一**（uniform），而且必须设为**只读**。也就是说，每条GPU线程接收相同的数据，并且是不可改变的数据。

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; //画布尺寸vec2(宽，高)
uniform vec2 u_mouse; //鼠标位置vec2（在屏幕中的那个位置）
uniform float u_time; //shader运行时间（加载后的秒数）

void main() {
    gl_FragColor = vec4(abs(sin(u_time)),0.0,0.0,1.0);
}
```

### [3]gl_FragCoord

`gl_FragCoord`存储了活动线程正在处理的**像素**或**屏幕碎片**的坐标，有了它我们就知道了屏幕上的哪一个线程正在运转。因为是并行处理的，将其理解为屏幕的每个像素坐标

下面用图快速理解归于化代码`vec2 st = gl_FragCoord.xy/u_resolution.xy;`

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d46bd89122554c15a30e14634332dd49~tplv-k3u1fbpfcp-zoom-1.image)


```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; //画布尺寸(宽，高)
uniform vec2 u_mouse; //鼠标位置（在屏幕中的那个位置）
uniform float u_time; //shader运行时间（加载后的秒数）

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    gl_FragColor = vec4(st.x,st.y,0.0,1.0);
}
```

> gl_FragCoord获取到屏幕的每个坐标，除于u_resolution，对坐标进行了规范化。这样做是为了使所有的值落在 0.0 到 1.0 之间，这样就可以轻松把 X 或 Y 的值映射到红色或者绿色通道。
>
> 是不是和之前的编程有所不同？想想shader 的并行处理特性，是不是很🐱！，最后渲染出来的图：
>
> ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec10c05fd3ab481c8ceff67df3851f7a~tplv-k3u1fbpfcp-zoom-1.image)

>
>是根据屏幕坐标的变化来渲染不同的颜色值

[2]

绘制$y=x，y=x^5$函数的线

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st) {    
    //(max,min,value情况) value=0->return 1; value>0.02->return 0
    return smoothstep(0.02, 0.0, abs(st.y - st.x));
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    float y = st.x; //沿x渐变

    vec3 color = vec3(y);

    // Plot a line
    float pct = plot(st);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

	gl_FragColor = vec4(color,1.0);
}
```

```glsl
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
   // //0.2则是线宽
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = pow(st.x,5.0);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}
```

## 2.使用smoothstep函数绘制图形

### [1]绘制圆

先上代码（下面将结合实例来逐渐理解smoothstep平滑阶梯函数）

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; //画布尺寸(宽，高)
uniform vec2 u_mouse; //鼠标位置（在屏幕中的那个位置）
uniform float u_time; //shader运行时间（加载后的秒数）

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //坐标原点从左下角移动到屏幕中间
    st -= 0.5;
    //屏幕像素比，防止画出来的圆在拉伸屏幕宽度x时变型
    st.x*= u_resolution.x/u_resolution.y;
    //使用并行运算的思维思考：相当于屏幕上所有的点到st原点（圆心）的距离
    float r = length(st);
    float c = smoothstep(0.3,0.3,r);
    gl_FragColor = vec4(vec3(c,c,c),1.0);
}
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6e1cd79d7a94035ba96e57958c2d396~tplv-k3u1fbpfcp-zoom-1.image)


对于绘制园，有多种方式，例如：使用distance、length、sqrt

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2b3287a606f4bbf8ca3fb62cd5409ad~tplv-k3u1fbpfcp-zoom-1.image)


### [2]函数定义

`smoothstep(min,max,value)`平滑的阶梯函数内部实现

```cpp
float smoothstep(float t1, float t2, float x) {
  // Scale, bias and saturate x to 0..1 range
  //如果(x - t1) / (t2 - t1)<0.0，则是0.0，大于1.0则是1.0
  x = clamp((x - t1) / (t2 - t1), 0.0, 1.0);
  // Evaluate polynomial
  return x * x * (3 - 2 * x);
}
```

**第一种情况**`min<max`：

- 如果`value <= min` 返回0
- 如果`value >= max` 返回1
- `min<value<max`:（线性插值）`float t = (value - min) / (max - min)`，返回`(3 - 2 * t ) * t * t`

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4a0ac2f319045469e17f3e3442a5596~tplv-k3u1fbpfcp-zoom-1.image)

**第二种情况**`smoothstep(max,min,value):`

- 如果`value <= min` 返回1
- 如果`value >= max` 返回0
- `min<value<max`:（线性插值）`float t = (value - min) / (max - min)`，返回`(3 - 2 * t ) * t * t`

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55aedcc0d9514090931c06b866c84e1f~tplv-k3u1fbpfcp-zoom-1.image)


**第三种情况/结论：**

如果两个`smoothstep`函数相减，第一个函数的第二个参数是第二个函数的第一个参数，那么它们相减的曲线
$$
smoothstep(1, 2, x)-smoothstep(2, 3, x)
$$
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddacba9f31844dc69a644e81bd1ce7e8~tplv-k3u1fbpfcp-zoom-1.image)

$$
smoothstep(1, 2, x)-smoothstep(3, 4, x)
$$
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/176b6ad5a7e9450687aba8910a1ca6f3~tplv-k3u1fbpfcp-zoom-1.image)


![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41040b4133e84afe971614c1e75b2681~tplv-k3u1fbpfcp-zoom-1.image)


> 大圆内切小圆思想👀

### [3]绘制直线

在大致理解`smoothstep`函数之后逐渐深入的应用：（例如绘制y=x的直线）

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float plot(vec2 st) {
    //也就是在st.y-st.x=0.01~0时线性插值0~1
    return smoothstep(0.01, 0.0, abs(st.y - st.x));
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    //绘制线段
    float pct = plot(st);
    
    vec3 color = pct*vec3(1.0,1.0,1.0);

	gl_FragColor = vec4(color,1.0);
}

```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44b6592fbeef4b5492ce09b0108c375b~tplv-k3u1fbpfcp-zoom-1.image)


### [4]绘制曲线

屏幕像素是离散的而不是连续的，计算机图形学常用插值来填充图像像素之间的空隙。那么就可以通过修改数学函数来改造这些代码行绘制各种图形。比如说我们可以做一个求 x 的 5 次幂的曲线。
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a28a6ff358e143328fc616ad6ea555c4~tplv-k3u1fbpfcp-zoom-1.image)




## 3.使用step函数绘制图形

这个函数相比于smoothstep就简单多了，可以将其记作：开关\阀门函数

### [1]函数定义

```glsl
float step(float edge, float x)  
vec2 step(vec2 edge, vec2 x)  
vec3 step(vec3 edge, vec3 x)  
vec4 step(vec4 edge, vec4 x)

vec2 step(float edge, vec2 x)  
vec3 step(float edge, vec3 x)  
vec4 step(float edge, vec4 x)
```

- x>=dege 返回 1
- x<dege 返回0

示例：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ec10eb44ced4ef3b513765715bdfc5a~tplv-k3u1fbpfcp-zoom-1.image)


了解了使用shader绘制线段、圆心等基本图形后，下面来绘制更多基础的图形，如矩形、网格、甚至是图案

## 4.绘制矩形

在shader中只需要两行代码即可绘制一个矩形，这两行代码里的核心思想：**改变坐标系的原点:**先通过step函数绘制出左和下边界，然后通过1.0-st来翻转坐标系，将其原点变从左下角翻转到右上角，然后重复之前的操作所有step函数绘制出左和下边界即可。

```glsl
step(vec2(0.1),st);// 绘制矩形的左边和下边
step(vec2(0.9),1.0-st);//绘制矩形的右边和上边
//1.0-st改变了坐标系，左下角坐标值变成了(1.0,1.0)，右上角变成了(0.0,0.0)
```

下面逐步拆解，将分量分开写：

```glsl
step(0.1,st.x)  //在x小于0.1处绘制黑色
step(0.1,st.y)  //在y小于0.1处绘制黑色
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8800c6b1bee449c397684aaedfcb683a~tplv-k3u1fbpfcp-zoom-1.image)


简化上面的写法：（**重要操作，改变坐标原点**）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a99a578a78a441b9923f0a1bfae00fdf~tplv-k3u1fbpfcp-zoom-1.image)


还可以将上面的代码再简写：

```glsl
vec2 bl = step(vec2(0.1),st);       // bottom-left
vec2 tr = step(vec2(0.1),1.0-st);   // top-right
color = vec3(bl.x * bl.y * tr.x * tr.y);
```

## 5.使用fract函数绘制网格

知道了如何绘制矩形后绘制网格就容易了，其只需结合fract函数

### [1]fract函数简介

fract函数返回x的小数部分。而根据其这一特性可以用它来绘制一些有重复图案的图形

原理$frac(x) = x - floor(x)$

```glsl
float frac(float x)
{
  // floor函数返回值会向下取值
  return x - floor(x);
}
```

```glsl
float fract(float x)  
vec2 fract(vec2 x)  
vec3 fract(vec3 x)  
vec4 fract(vec4 x)
```

特性：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f329db8ac294485876cbac5ccaf3ffe~tplv-k3u1fbpfcp-zoom-1.image)


可以看出其所乘的常数越大其图像的周期越密，而

示例理解：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8725875d419140c9b6dec28c8bc6ac21~tplv-k3u1fbpfcp-zoom-1.image)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96797303015647fb80e8a36435f1055d~tplv-k3u1fbpfcp-zoom-1.image)


### [2]绘制网格

通过放大坐标系与使用fract来实现类似网格效果，使用fract将一个大的空间划分为只有0~1的小空间

一个简单的示例：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9795ea84f4a2492aa26eb3d94f60fc47~tplv-k3u1fbpfcp-zoom-1.image)


然后便可以在每个小空间里绘制图形了

## 6.偏移图案

如何实现一个类型于墙的有偏移的网格图案呢？

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/694f6f279de242919979c79e757266ce~tplv-k3u1fbpfcp-zoom-1.image)


可以根据行是奇数还是偶数，然后选择通过奇偶来决定是否要在x方向上偏移那一行

### [1]判断线程中行是奇数还是偶数

使用mod+三元运算符

```glsl
y = mod(x,2.0);
y = mod(x,2.0) < 1.0 ? 0. : 1. ;
//也可以直接使用下面方式做出相同效果
y = step(1.0,mod(x,2.0)); //更快，因为使用的是内置函数，所以可以使用内置函数的尽量使用
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a20d45ba68d9446f95ce12b166fad99b~tplv-k3u1fbpfcp-zoom-1.image)


有了这些找出奇数的方程，这样我们就可以给奇数行一个偏移量，然后就可以把 *砖块* 做出拼砖的效果。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23fc3b1248b444678812af954265efee~tplv-k3u1fbpfcp-zoom-1.image)


## 7.Truchet 瓷砖

接下来逐渐深入绘制更复杂的图形（主要要加强shader绘图的思想），如下面的效果

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd26942d4d8741dd89a3ff6a918229a1~tplv-k3u1fbpfcp-zoom-1.image)


如何实现上面效果呢？

```glsl
// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;
//旋转实现还是基于旋转被划分后的小空间而言的
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;//将原点移动到小方块中间，因为下面矩阵是绕原点旋转的
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);//将内部每个3x3的在细分为2x2

    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }

    return _st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st = tile(st,3.0);//划分为3x3的小空间
    st = rotateTilePattern(st);

    // Make more interesting combinations
    // 在细划分
    // st = tile(st,2.0);
    // st = rotate2D(st,-PI*u_time*0.25);
    // st = rotateTilePattern(st*2.);
    // st = rotate2D(st,PI*u_time*0.25);

    // step(st.x,st.y) just makes a b&w triangles
    // but you can use whatever design you want.
    gl_FragColor = vec4(vec3(step(st.x,st.y)),1.0);
}

```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20583a71d24844fabe21a2d45238916c~tplv-k3u1fbpfcp-zoom-1.image)




## 8.符号距离场渲染SDF

在图形渲染中有一个概念叫符号距离场渲染方法（Singned Distance Fields Redering)，它本质上是利用空间中的距离分布来着色的。比如前面的绘制园、矩形、网格等图案都是采用这一方法。

该方法在3D图和字体渲染广泛应用，距离场几乎可以用来画任何东西。显然，图形越复杂，方程也越复杂。但是一旦你找到某个特定图形的公式，就很容易添加图形或应用像过渡边界的效果例如[Mapbox GL Labels](https://blog.mapbox.com/drawing-text-with-signed-distance-fields-in-mapbox-gl-b0933af6f817)就是采用该技术

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e030a046d3734a9eb568d1a0dba86d96~tplv-k3u1fbpfcp-zoom-1.image)


这也是计算机图形理论基础中**implicit隐式几何**的距离函数表示方法的一种体现[geometry | ooco (luxd.fun)](https://www.luxd.fun/posts/几何.html#_1-implicit隐式几何)

[Shader中使用距离函数（Distance Function）绘制二维图形](https://zhuanlan.zhihu.com/p/365440831)

对于所有距离符号距离场方法绘图大致分为两步骤：

1. **定义距离**，比如在画圆的时候，它指的是点到圆心的距离；在画直线和线段的时候，它是指点到直线或某条线段的距离；在画几何图形的时候，它是指点到几何图形边的距离。
2. **根据距离着色，**先是用 smoothstep 方法，选择某个范围的距离值，比如在画直线的时候，我们设置 smoothstep(0.0, 0.01, d)，就表示选取距离为 0.0 到 0.01 的值。然后对这个范围着色，我们就可以将图形的边界绘制出来了。



> 在webgl中绘制如下图案只需将纹理坐标传递到shader作为st坐标即可

## 参考

 - https://thebookofshaders.com/?lan=ch
 - https://time.geekbang.org/column/intro/100053801?tab=catalog
