---
layout: Post
title:  Phong反射模型及glsl实现
date: 2023-03-18
useHeaderImage: true
headerImage: /img/in-post/bu/4.png
tags:
  - WebGL
  - 计算机图形学
---

[[toc]]

Phong着色模型是早期的光照模型，由Bui Tuong Phong在1975年提出。它基于反射模型，将表面光照分为**环境光、漫反射光和镜面反射光**三个组成部分，并针对每个部分分别计算其对表面颜色的影响。Phong着色模型的计算相对简单，但是可能会产生明显的镜面高光过于突出的问题。

## [1]光照模型拆解

物体的光照效果是由**光源、介质（物体的材质）和反射类型**决定的，而反射类型又由物体的材质特点决定。

> 这里只记录基本的光照模式，不深入考虑很细的物理光照模型，如光线追踪之类的。

在 3D 光照模型中，根据不同的光源特点，可以将光源分为 4 种，分别为：

- 无向光：**环境光（Ambient Light）、**
- 有向光：**平行光（Directional Light）、点光源（Positional Light）和聚光灯（Spot Light）**

而反射类型通常分为：

- 漫反射
- 镜面反射

其中环境光为无向光固然就没有镜面反射了，也就只有漫反射了，而其他的光源类型既有漫反射也有镜面反射

那么将这些光源类型的反射类型组合起来就可以实现标准的光照模型，也就是 Phong 反射模型了

## [2]环境反射

环境反射是针对环境光而言的，环境光就是指物体所在的三维空间中天然的光，它充满整个空间，在每一处的光照强度都一样。环境光没有方向，所以，物体表面反射环境光的效果，只和环境光本身以及**材质的反射率**（纹理材质/表面基底色）有关。

因此着色器代码也就很简单了：

```glsl
precision highp float;

uniform vec3 ambientLight;
uniform vec3 materialReflection;

void main() {
  gl_FragColor.rgb = ambientLight * materialReflection;
  gl_FragColor.a = 1.0;
}
```

## [3]平行光

平行光除了颜色这个属性之外，还有方向，它属于有向光。有向光在与物体发生作用的时候，根据物体的材质特性，会产生两种反射，一种叫做**漫反射（Diffuse reflection）**，另一种叫做**镜面反射（Specular reflection）**

而一个物体最终的光照效果，是漫反射、镜面反射以及我们前面说的环境光叠加在一起的效果

### 平行光的漫反射

这里先计算平行光的漫反射：
$$
dirDiffuse=＜入射光颜色>*＜表面基底色/反射率>*cosθ\\cosθ=＜光线方向>*<法线方向>
$$
这里主要需要计算处理的是光线的方向，因为光线的方向需要计运算的次数少，在顶点着色器，会比在片元着色器中计算的性能要好很多。

下面为着色器计算代码：

```glsl
 precision highp float;

  attribute vec3 position;
  attribute vec3 normal;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform mat3 normalMatrix;
  uniform vec3 directionalLight;
  
  varying vec3 vNormal;
  varying vec3 vDir;

  void main() {
    // 计算光线方向（将光线方向向量从世界空间转换到相机空间）
    vec4 invDirectional = viewMatrix * vec4(directionalLight, 0.0);
    vDir = -invDirectional.xyz;
    
    // 计算法向量
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
```

```glsl
precision highp float;

uniform vec3 materialReflection;
uniform vec3 directionalLightColor;

varying vec3 vNormal;
varying vec3 vDir;

void main() {
  // 求光线与法线夹角的余弦
  float cos = max(dot(normalize(vDir), vNormal), 0.0);
  
  // 计算平行光漫反射
  vec3 diffuse = cos * directionalLightColor;
 
  // 合成颜色
  gl_FragColor.rgb = diffuse * materialReflection;
  gl_FragColor.a = 1.0;
}
```

> 这里需要注意的是还需要对光线方向向量和法向量进行坐标空间进行转换，转换到视图空间
>
> 对光线方向向量进行坐标空间转换：
>
> - 在渲染场景时，相机的位置和方向通常是已知的，而光源的位置和方向则可能是相对于世界空间的。因此，在计算光的效果时，需要将光源的位置和方向转换到相机/视图空间中。
> - 如果不乘以视图矩阵，那么得到的就是一个在世界空间中表示该方向向量的向量。在渲染过程中使用这个向量，可能会导致光源的位置和方向不正确，从而影响到渲染结果的准确性。因此，需要将方向向量转换到相机空间中，才能正确计算光的效果。
>
> 对法向量的坐标空间转换：
>
> - 通常情况下，法向量是在模型空间（局部空间）中计算的，即在模型被放置在世界空间之前。但是，在使用视图矩阵将顶点从世界空间转换到相机空间后，需要使用一个特殊的矩阵`normalMatrix`来计算变换后的法向量
> - 这个特殊的矩阵通常被称为“**法线矩阵**”或“**法向量矩阵**”，它是从视图矩阵中提取出来的。这个矩阵可以将在模型空间中计算的法向量转换为在相机空间中的法向量

### 平行光的镜面反射

如果若干平行光照射在表面光滑的物体上，反射出来的光依然平行，这种反射就是镜面反射。镜面反射的性质是，入射光与法线的夹角等于反射光与法线的夹角。

越光滑的材质，它的镜面反射效果也就越强。最直接的表现就是物体表面会有闪耀的光斑，也叫镜面高光

因为镜面反射需要同时考虑光的入射方向以及相机也就是观察者所在的方向

所以实现平行光的镜面反射可以分为如下几个步骤：

- **求出反射光线的方向向量**
  - 要求出反射光的方向，我们可以直接使用 GLSL 的内置函数 reflect，这个函数能够返回一个向量相对于某个法向量的反射向量，正好就是我们要的镜面反射结果，因为是平行光可以直接将下面的计算过程放到顶点着色器中进行

- **根据相机位置计算视线与反射光线夹角的余弦**
- **使用系数和指数函数来设置镜面反射强度。**
  - 指数越大，镜面越聚焦，高光的光斑范围就越小，系数能改变反射亮度，系数越大，反射的亮度就越高。（如下面的A、B）

$$
specular=A*cosθ^B\\
cosθ=反射光线*视线
$$



## [4]点光源

除了平行光之外，点光源也都是有向光

点光源顾名思义，就是指空间中某一点发出的光，与方向光不同的是，点光源不仅有方向属性，还有**位置属性**

要计算点光源的漫反射和镜面反射就需要先根据光源位置和物体表面相对位置来计算光线位置，后面就和平行光的计算方法一样了，计算光的方向和物体表面法向的夹角



### 点光源的漫反射

```glsl
precision highp float;

attribute vec3 position;
attribute vec3 normal;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

varying vec3 vNormal;
varying vec3 vPos;

void main() {
  vPos = modelViewMatrix * vec4(position, 1.0);//点的位置
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * vPos;
}
```

```glsl
precision highp float;

uniform vec3 ambientLight;
uniform vec3 materialReflection;
uniform vec3 pointLightColor;
uniform vec3 pointLightPosition;
uniform mat4 viewMatrix;

varying vec3 vNormal;
varying vec3 vPos;

void main() {
  // 光线到点坐标的方向
  vec3 dir = (viewMatrix * vec4(pointLightPosition, 1.0)).xyz - vPos;
  // 与法线夹角余弦
  float cos = max(dot(normalize(dir), vNormal), 0.0);
  // 计算漫反射
  vec3 diffuse = cos * pointLightColor;
  // 合成颜色
  gl_FragColor.rgb = (ambientLight + diffuse) * materialReflection;
  gl_FragColor.a = 1.0;
}

```

> 计算方法与平行光的类似

### 点光源的衰减

为了模拟更真实的点光源光照，还需要设置点光源的衰减。

光线的衰减程度，我们一般用衰减系数表示。衰减系数等于一个常量 d0（通常为 1），除以衰减函数 p。

一般来说，衰减函数可以用一个二次多项式 P 来描述，它的计算公式为：
$$
    \begin{cases}
      P=Az^2+Bz+C \\
      d=\frac{d_0}{P} 
    \end{cases}
$$
其中 A、B、C 为常量(自定义），它们的取值会根据实际的需要随时变化，z 是当前位置到点光源的距离。

那么只需要在片元着色器中增加衰减系数即可，也就是需要计算多一个量：点光源到点坐标的距离，直接使用glsl内置函数length计算即可

```glsl
precision highp float;

uniform vec3 ambientLight;
uniform vec3 materialReflection;
uniform vec3 pointLightColor;
uniform vec3 pointLightPosition;
uniform mat4 viewMatrix;
uniform vec3 pointLightDecayFactor;

varying vec3 vNormal;
varying vec3 vPos;

void main() {
  // 光线到点坐标的方向
  vec3 dir = (viewMatrix * vec4(pointLightPosition, 1.0)).xyz - vPos;
  // 光线到点坐标的距离，用来计算衰减
  float dis = length(dir);
  // 与法线夹角余弦
  float cos = max(dot(normalize(dir), vNormal), 0.0);
  // 计算衰减
  float decay = min(1.0, 1.0 /
    (pointLightDecayFactor.x * pow(dis, 2.0) + pointLightDecayFactor.y * dis + pointLightDecayFactor.z));
  // 计算漫反射
  vec3 diffuse = decay * cos * pointLightColor;
  // 合成颜色
  gl_FragColor.rgb = (ambientLight + diffuse) * materialReflection;
  gl_FragColor.a = 1.0;
}
```

### 点光源的镜面反射

点光源的镜面反射与平行光的镜面反射类似，只是在镜面反射的反射光上复杂些

```glsl
precision highp float;

attribute vec3 position;
attribute vec3 normal;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

varying vec3 vNormal;
varying vec3 vPos;
varying vec3 vCameraPos;

void main() {
    vec4 pos = modelViewMatrix * vec4(position, 1.0);
    vPos = pos.xyz;
    vCameraPos = (viewMatrix * vec4(cameraPosition, 1.0)).xyz; 
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * pos;
}
```

```glsl
precision highp float;

uniform vec3 ambientLight;
uniform vec3 materialReflection;
uniform vec3 pointLightColor;
uniform vec3 pointLightPosition;
uniform mat4 viewMatrix;
uniform vec3 pointLightDecayFactor;

varying vec3 vNormal;
varying vec3 vPos;
varying vec3 vCameraPos;

void main() {
    // 光线到点坐标的方向
    vec3 dir = (viewMatrix * vec4(pointLightPosition, 1.0)).xyz - vPos;
    // 光线到点坐标的距离，用来计算衰减
    float dis = length(dir);
    dir = normalize(dir);
    // 与法线夹角余弦
    float cos = max(dot(dir, vNormal), 0.0);
    // 反射光线
    vec3 reflectionLight = reflect(-dir, vNormal);
    vec3 eyeDirection = vCameraPos - vPos;
    eyeDirection = normalize(eyeDirection);
    // 与视线夹角余弦
    float eyeCos = max(dot(eyeDirection, reflectionLight), 0.0);
    // 镜面反射
    float specular = 2.0 *  pow(eyeCos, 50.0);
    // 计算衰减
    float decay = min(1.0, 1.0 /
                      (pointLightDecayFactor.x * pow(dis, 2.0) + pointLightDecayFactor.y * dis + pointLightDecayFactor.z));
    // 计算漫反射
    vec3 diffuse = decay * cos * pointLightColor;
    // 合成颜色
    gl_FragColor.rgb = specular + (ambientLight + diffuse) * materialReflection;
    gl_FragColor.a = 1.0;
}
```

## [5]phong着色模型与Blinn-Phong着色模型

Blinn-Phong着色模型和Phong着色模型都是用于计算光照在物体表面着色的模型但它们有一些不同之处

- Phong着色模型是早期的光照模型，由Bui Tuong Phong在1975年提出。它基于反射模型，将表面光照分为**环境光、漫反射光和镜面反射光**三个组成部分，并针对每个部分分别计算其对表面颜色的影响。Phong着色模型的计算相对简单，但是可能会产生明显的镜面高光过于突出的问题。
- Blinn-Phong着色模型是由Jim Blinn在1977年提出的改进版本。它在Phong着色模型的基础上（表面光的照的组成没有变），引入了一个半程向量的概念，用来代替Phong着色模型中的反射向量。这个半程向量可以更好地模拟物体表面的微观凹凸，使得镜面高光的效果更加自然。Blinn-Phong着色模型计算相对复杂一些，但是可以产生更真实的光照效果。具体可查看之前的[笔记](https://www.luxd.space/posts/shading.html#_2-blinn-phong-reflectance-model-%E7%9D%80%E8%89%B2%E6%A8%A1%E5%9E%8B)。

那么将上面的三种光源类型与两种反射类型组合起来就构成了phong反射模型。