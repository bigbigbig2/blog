---
layout: Post
title: 在shader中使用极坐标绘图
date: 2022-11-02
subtitle: 在shader中使用极坐标绘制基础图形及极坐标的扩展坐标圆柱坐标和球坐标
useHeaderImage: true
headerImage: /img/in-post/2022-11-02/1.jpg
tags:
  - shader
---

[[toc]]

极坐标系统中任意位置可由一个**夹角**和一段相对原点—极点的**距离**来表示。极坐标系统Polar coordinate system方程：


$$
x=rcosθ\\
y=rsinθ\\
r=\sqrt{x^2+y^2}\\
θ=atan2(x,y)=atan(\frac{y}{x})
$$

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa2b21fb35854aee81d4211eff279930~tplv-k3u1fbpfcp-zoom-1.image)

极坐标与直角坐标相互转换代码：

```glsl
// 直角坐标影射为极坐标
function toPolar(x, y) { 
    const r = Math.hypot(x, y); 
    const θ= Math.atan2(y, x); 
    return [r, θ];
}
//在shader中通常写成：
vec2 pos = vec2(0.5)-st;//将坐标系统转化为[-0.5,0.5]
float r = length(pos)*2.0;
float a = atan(pos.y,pos.x);

// 极坐标映射为直角坐标
function fromPolar(r, θ) { 
    const x = r * cos(θ); 
    const y = r * sin(θ); 
    return [x, y];
}
```



### [1]用极坐标绘制圆

首先将st直角坐标系原点移动到画布中心，然后将其转为极坐标系统，最后利用极坐标的性质绘图。例如下图的圆因为在及坐标系中圆的半径是一个常量值，所以取 `smoothstep(st.x, st.x + 0.01, 0.2)`，就能得到一个半径为 0.2 的圆了（也是采用距离场的思想），而在直角坐标系中，点到圆心的距离 d 需要用 x、y 平方和的开方来计算，而在极坐标下，点的极坐标 r 值正好表示了点到圆心的距离 d，所以计算起来就比直角坐标系简单了很多。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e176a1b782834e47b0d5e42a77a11618~tplv-k3u1fbpfcp-zoom-1.image)



可以对比使用直角坐标系和极坐标系绘制相同的圆的思想：

```glsl
float r = length(st);
float c = smoothstep(0.2,0.2,r);
gl_FragColor = vec4(vec3(c,c,c),1.0);
```

下面对于使用极坐标的另一种方式画圆
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/058a17b5298247aeacc9da665392c46e~tplv-k3u1fbpfcp-zoom-1.image)


![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a15436f06d94ef9868953d704c962e8~tplv-k3u1fbpfcp-zoom-1.image)

### [2]利用相应的极坐标方程绘制复杂的曲线图

下面利用一些极坐标方程绘制复杂些的图形

使用玫瑰线的极坐标方程$r = a * cos(k * θ)$绘制如下图形，利用距离场的思维所有玫瑰线上的点都满足$0 = a * cos(k * θ) - r$，最后以距离场的形式（并根据情况填写a、k 参数）写入下面代码及可绘制相应的图案

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b6375ed32da4dcdab81326cfb251838~tplv-k3u1fbpfcp-zoom-1.image)

了解了玫瑰线的绘制之后在其之上绘制一些图形便变得简单得多了，例如直接修改k参数



### [3]圆柱坐标

圆柱坐标可以说是极坐标的三维形式，在极坐标的基础下添加了z轴分量，通常使用它来绘制一些三维曲线，比如螺旋线、圆内螺旋线、费马曲线等等。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03b4d05940ad48a4827d099f390f4d20~tplv-k3u1fbpfcp-zoom-1.image)


因为极坐标系可以和直角坐标系相互转换，所以直角坐标系和圆柱坐标系也可以相互转换，公式如下：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cda06a3e1f9b488084ad63b86ca73752~tplv-k3u1fbpfcp-zoom-1.image)


从上面的公式中你会发现，我们只转换了 x、y 的坐标，因为它们是极坐标，而 z 的坐标因为本身就是直角坐标不用转换。因此圆柱坐标系又被称为**半极坐标系**。

### [4]球坐标

我们还可以进一步将圆柱坐标系转为球坐标系，而球坐标系通常在三维图形绘制、球面定位、碰撞检测等等可视化实现中使用到。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c48389b4e647bf8aee1d5912681a22~tplv-k3u1fbpfcp-zoom-1.image)


同样地，圆柱坐标系也可以和球坐标系相互转换，公式如下

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a616cfb1289543b4a2c564be58a39abe~tplv-k3u1fbpfcp-zoom-1.image)