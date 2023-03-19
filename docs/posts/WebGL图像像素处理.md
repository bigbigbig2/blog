---
layout: Post
title: WebGL像素处理
subtitle: 简单颜色滤镜、高斯模糊/平滑、利用帧缓冲区首相多种处理效果叠加
date: 2022-10-30
headerImage: /img/in-post/2022-10-30/1.png
catalog: true
tags:
  - WebGL
---

[[toc]]

在对图形进行像素处理之前，需要对其进行像素化。

所谓像素化，就是把一个图像看成是由一组像素点组合而成的。每个像素点负责描述图像上的一个点，并且带有这个点的基本绘图信息。那对于一张 800 像素宽、600 像素高的图片来说，整张图一共就有 48 万个像素点。

每一个像素点都存储着四个颜色通道RGBA

而常见的像素处理应用有：

- 颜色滤镜（灰度图、颜色滤镜等）
- 高斯滤镜（人像美颜等）

在实际的可视化项目中，可以通过像素处理来增强视觉效果

## 1.颜色滤镜

### [1]灰度图

实现灰度图简单来说就是将一张彩色图片变为灰白色图片。具体的实现思路是，我们先将该图片的每个像素点的 R、G、B 通道的值进行加权平均，然后将这个值作为每个像素点新的 R、G、B 通道值，具体公式如下：
$$
V=aR+bG+cB\\
R'=G'=B'=\frac{v}{a+b+c}
$$
其中 R、G、B 是原图片中的 R、G、B 通道的色值，V 是加权平均色值，a、b、c 是加权系数，满足 (a + b + c) = 1。

下面使用公式对应的颜色矩阵来实现：

```glsl
precision mediump float; 
uniform sampler2D u_image;
varying vec2 v_texCoord;  
void main() {
    vec4 color = texture2D(u_image, v_texCoord); //原色
    float average = (color.r + color.g + color.b) / 3.0;//加权平均
    gl_FragColor = vec4(average, average, average, color.a);
}
```

> 对于webgl加载纹理图像这里就不过多阐述

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14778602ab71490395751fcc56533153~tplv-k3u1fbpfcp-zoom-1.image)



### [2]改变图象亮度

实现原理，分别给`RGB`通道乘一个常数`p`，大于1时变亮，小于1时变暗
$$
R'=R*p\\
G'=G*p\\
B'=B*p
$$

```glsl
precision mediump float; 
uniform sampler2D u_image;
varying vec2 v_texCoord;  
void main() {
    vec4 color = texture2D(u_image, v_texCoord); //原色
    float p = 2.0;
    gl_FragColor = vec4(color.r * p,color.g * p, color.b * p, color.a);
}
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b8f3fbc6e794eaa94d83dd077024e59~tplv-k3u1fbpfcp-zoom-1.image)


处理使用公式直接对原图的`rgb`通道直接修改实现一些简单的图像处理效果

## 2.高斯模糊/平滑

上面的滤镜都是一些直接操作图像颜色通道的简单滤镜，而现在一种相对复杂的滤镜——**高斯模糊（Gaussian Blur）**，这个滤镜可以对图像进行平滑处理（美颜）或者是做部分模糊处理，从而突出我们要呈现给用户的内容

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2069f6cc2cd74a888724a3d84703bfaa~tplv-k3u1fbpfcp-zoom-1.image)

> 对于高斯模糊/平滑在之前的计算机图形学文章中有做过笔记记录——[Rasterization光栅化](https://www.luxd.fun/posts/Rasterization.html#%E4%BD%8E%E9%A2%91%E6%BB%A4%E6%B3%A2)，也是解决锯齿/走样Alising的一种方法，所以高斯模糊就是一个低通滤波（图像与二维正态分布做卷积），简单理解的话就是按照高斯分布的权重对当前像素点加权平均，而距离当前像素越近的点的权重越高，权重分布满足正态分布，从而达到平滑/模糊效果。

为了减低算法复杂度和提高性能这里就不对每个像素计算整张图片像素的权重，而是采用——均值模糊/滤波(滤波器/卷积核，整体操作叫卷积)来做简单平滑/模糊，这里以3x3的卷积核方式做测试学习。

卷积内核就是一个 3×3 的矩阵，矩阵中的每一项代表当前处理的像素和周围8个像素的乘法因子， 相乘后将结果加起来除以内核权重（内核中所有值的和或 1.0 ，取二者中较大者）

这里采用最简单的3x3卷积核进行处理（也就是之前学计算机图形学中举的示例的那个卷积核—[Rasterization光栅化](https://www.luxd.fun/posts/Rasterization.html#%E4%BD%8E%E9%A2%91%E6%BB%A4%E6%B3%A2)）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/203f0468ab574d58ad30e90f1e89a677~tplv-k3u1fbpfcp-zoom-1.image)


```glsl
precision mediump float;

// 纹理
uniform sampler2D u_image;
uniform vec2 u_textureSize;
uniform float u_kernel[9];
uniform float u_kernelWeight; //权重

// 从顶点着色器传入的纹理坐标
varying vec2 v_texCoord;

void main() {
    vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;
    vec4 colorSum =
    texture2D(u_image, v_texCoord + onePixel * vec2(-1, -1)) * u_kernel[0] +
    texture2D(u_image, v_texCoord + onePixel * vec2( 0, -1)) * u_kernel[1] +
    texture2D(u_image, v_texCoord + onePixel * vec2( 1, -1)) * u_kernel[2] +
    texture2D(u_image, v_texCoord + onePixel * vec2(-1,  0)) * u_kernel[3] +
    texture2D(u_image, v_texCoord + onePixel * vec2( 0,  0)) * u_kernel[4] +
    texture2D(u_image, v_texCoord + onePixel * vec2( 1,  0)) * u_kernel[5] +
    texture2D(u_image, v_texCoord + onePixel * vec2(-1,  1)) * u_kernel[6] +
    texture2D(u_image, v_texCoord + onePixel * vec2( 0,  1)) * u_kernel[7] +
    texture2D(u_image, v_texCoord + onePixel * vec2( 1,  1)) * u_kernel[8] ;

    // 只把rgb值求和除以权重
    gl_FragColor = vec4((colorSum / u_kernelWeight).rgb, 1.0);
}
```

```js
const kernelLocation = gl.getUniformLocation(program, "u_kernel[0]");
const kernelWeightLocation = gl.getUniformLocation(program, "u_kernelWeight");

const gaussianBlur3 = [
    1, 1, 1,
    1, 1, 1,
    1, 1, 1
];


function computeKernelWeight(kernel) {
    cosnt weight = kernel.reduce(function(prev, curr) {
    	return prev + curr;
    });
    return weight <= 0 ? 1 : weight;
}
gl.uniform1fv(kernelLocation, gaussianBlur3);
gl.uniform1f(kernelWeightLocation, computeKernelWeight(gaussianBlur3));
```

在不同的需求情况下可以选择不同的卷积内核/矩阵来实现多种多样的处理效果[webgl fundamentals网站有很多处理的示例](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-image-processing.html#toc)。

## 3.多层滤镜叠加

要实现多层滤镜效果叠加可以采用帧缓冲区技术，创建两个或多个纹理，然后将一个纹理渲染的结果传递给另一个纹理，如果还要叠加，在将这个纹理的结果传递回去，依次叠加，像打乒乓球一样。

其实现大致思路为：首先在颜色缓冲区渲染绘制原图像，然后创建两纹理对象并将其分别关联到两个帧缓冲区对象中的颜色关联对象，然后定义一些滤镜卷积内核来叠加效果，先是绘制在定义的一个矩形框内把原始图像作为纹理贴上去（在第一个帧缓冲区中），然后将第一个帧缓冲取中绘制的原始图像做为一个纹理对象传递给第二个帧缓冲区中作为初始纹理图像，接下来在对其进行卷积核处理，处理完后再作为一个纹理图像（对象）传递给回第一个帧缓冲区，它将其看作初始纹理做卷积核处理，一直如此直至将要叠加的效果全都叠加上去，最后将最终结果作为一个纹理对象传递个颜色缓冲区进行绘制`gl.bindFramebuffer(gl.FRAMEBUFFER, null);`。

下面截取部分核心代码进行说明

```js
//从原图开始
gl.bindTexture(gl.TEXTURE_2D, originalImageTexture);
//fbo为null时在颜色缓冲区,为帧缓冲区对象时在帧缓冲区中绘制
function setFramebuffer(fbo, width, height) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    //传递给shader帧缓冲区或者颜色缓冲区的高宽
    gl.uniform2f(resolutionLocation, width, height);
    //设置屏幕空间为帧缓冲区大小
    gl.viewport(0, 0, width, height);
}
//循环叠加绘制多种滤镜
var count = 0;
for (var ii = 0; ii < tbody.rows.length; ++ii) {
    var checkbox = tbody.rows[ii].firstChild.firstChild;
    if (checkbox.checked) {
        //在帧缓冲区中绘制
        setFramebuffer(framebuffers[count % 2], image.width, image.height);
        drawWithKernel(checkbox.value);
        //将前一个绘制
        gl.bindTexture(gl.TEXTURE_2D, textures[count % 2]);

        ++count;
    }
}
//最后在颜色缓冲区中将所有滤镜叠加的效果作为一个纹理对象传递个颜色缓冲区对象绘制
setFramebuffer(null, gl.canvas.width, gl.canvas.height);
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c579013394e48ab9d0b51715ce136f7~tplv-k3u1fbpfcp-zoom-1.image)





示例代码：[像素图象处理](https://github.com/bigbigbig2/WebGL-and-shaders-study/tree/master/%E5%83%8F%E7%B4%A0%E5%9B%BE%E8%B1%A1%E5%A4%84%E7%90%86)

参考：

- https://webglfundamentals.org/webgl/lessons/zh_cn/

- [跟月影学可视化](https://time.geekbang.org/column/intro/100053801)