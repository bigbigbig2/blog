---
layout: Post
title: 光线追踪(二)——辐射度量学
subtitle: Radiant Energy、Radiant Flux、单位立体角、Radiant Intensity、Irradiance、Radiance、双向反射分布函数BRDF、反射方程、渲染方程
date: 2022-08-18
useHeaderImage: true
headerImage: /img/in-post/2022-8-18/1.jpg
tags:
  - 计算机图形学
  - 光线追踪
---
[[toc]]

为了正确描述光照的属性，需要引入辐射度量学

**辐射度量学**（Radiometry）：用于衡量光照的系统和单位，它能够精确测量光的空间特性、描述光线的物理性质，在物理上更准确地进行光照计算

## [1]辐射能量和通量（功率）

Radiant Energy（辐射能量）

定义：辐射能是电磁辐射的能量。它以焦耳为单位，用符号表示:
$$
Q[J=Joule]
$$

### Radiant Flux辐射通量

定义：辐射通量(功率)是单位时间内发射、反射、传输或接收的辐射能量。
$$
\Phi \equiv \frac{\mathrm{d} Q}{\mathrm{d} t}\ [\rm{~W}=\mathrm{Watt}\ ]\ [\ \rm{lm}=\rm { lumen }\ ]^{*}
$$
类似于物理中的功率，所以**一般用辐射通量来衡量光照的强度**

## [2]单位立体角

立体角可以说是弧度制的扩展，将二维上的单位扩展到三维上

单位立体角即为一个点在单位球面上的投影

![在这里插入图片描述](https://img-blog.csdnimg.cn/7eb02050a8324366b9758bb452f7b932.png)


最大弧度为2派，最大立体角为4派

立体角的国际制单位是**球面度（steradian，sr）**。立体角有一个非国际制单位 **平方度，1*sr* = (180/π)** *square degree*

那么对于单位立体角，也就是取物体表面上的单位面积
![在这里插入图片描述](https://img-blog.csdnimg.cn/2f0d3ea470454d70a3dfe34316815c89.png)



	这里只需要直到单位立体角的公式dw即可

## [3]Radiant Intensity辐射强度

定义：辐射强度是点光源发出的单位立体角功率

![在这里插入图片描述](https://img-blog.csdnimg.cn/020c61827085488b99e90db6e29e8a4f.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/17f903d80a7a42ce9c67ae8ccbd3c67e.png)


一个接近生活的例子：

![在这里插入图片描述](https://img-blog.csdnimg.cn/da97cc2a4cbf4e8aafb006d0a3bf7d10.png)


- lumens：流明

这里假设这个灯向任意方向发出的光/辐射是一样的，那么就可以直接代用上面的公式进行求解其任意方向的Intensity（注意其单位为candelas）

## [4]Irradiance辐照度

定义：辐照度是单位面积入射到表面点上的功率

注意和Intensity的区别，Intensity定义的是每个立体角上，而Irradiance定义每一个面积上

在现实世界中也就是衡量光源和衡量物体吸收光程度的关系
![在这里插入图片描述](https://img-blog.csdnimg.cn/140dd740cfc246c9b5c02f7261d4b4a6.png)


这里指的是垂直照射的功率。如果不是垂直，那么就需要进行一个投影（乘以入射向量与表面法向量夹角的余弦$\cos{\theta}$）。

表面辐照度与光线方向与表面法线夹角的余弦成正比

![在这里插入图片描述](https://img-blog.csdnimg.cn/533bb08842c043ffb423ab8a57e749e3.png)


那么可以使用该Irradiance的概念对之前的进行纠正

![在这里插入图片描述](https://img-blog.csdnimg.cn/5b8cf60b8d974117a918fa2a10356dd6.png)


> 也就是说并不是Intensity在衰减，而是Irradiance在衰减

## [5]Radiance辐射率

- 是用来描述光线的属性的
- 渲染就是计算辐射率

定义：**每单位立体角、每单位垂直面积(投影)的功率**，很像是Intensity和irradiance的结合。它同时指定了**光的方向**与**照射到的表面所接受到的亮度**，所以这个是最常用的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/bef3c236ec194afcb82de5dfbd545b0e.png)

$$
L(p,w)=\frac{dE(p)}{dwcosθ}=\frac{dI(p,w)}{dAcosθ}
$$

### Irradiance vs. Radiance

这两则用的非常多，使用这里着重理解：

- Irradiance 辐照度: 面积 dA 接收的总功率
- Radiance: 从方向dω接收到的面积为dA 的功率

![在这里插入图片描述](https://img-blog.csdnimg.cn/3553f9a0fe0e483785b269ff301b360b.png)


也就是说Irradiance就是把来自四面八方的radiance把它门积起来

## [6]双向反射分布函数BRDF

根据上面的辐射度量学的知识，现在我们以一种新的方式看待反射。

把仿射看出是来自某一个方向的一个radiance照射到物体表面上一单位面积点，能量 *(irradiance)* 被表面**吸收**了，接着表面再将这能量以光线的形式 *(辐射率 radience)* 向着不同方向发射出去(具体方向得看是什么反射，如果是镜面反射则将全部能量向一个方向发出去，如果是漫反射，则向四面八方发射）。

![在这里插入图片描述](https://img-blog.csdnimg.cn/b01ac570deb543ed8bd5550359d2902a.png)


 **双向反射分布函数 （Bidirectional Reflectance Distribution Function）**: **描述从不同方向入射之后，反射光线分布情况**（也就是描述了光线与物体如何作用，也就是不同材质与光线的不同作用效果）

![在这里插入图片描述](https://img-blog.csdnimg.cn/1dc6c62d8cc94ccda73f329efc27a803.png)


### 反射方程

所谓反射方程定义的是任何一个着色点在各种不同的光照环境下所有的方向$w_i$的Radiance对出射方向$w_r$的贡献加起来，然后就可以得到非常接近现实的光照效果了。

![在这里插入图片描述](https://img-blog.csdnimg.cn/7872039fe60e4e568b7768c3fd49a73f.png)


也就是从任何一个方向/相机观察一个着色点其实就是一个积分，先是以任意$i$方向进入，然后以radiance形式进入，然后使用BRDF

- $L_i(p,w_i)cosθ_idw_i=dA$小方块吸收的Irradiance(E)
- 然后$E_i(w_i)*BRDF$=出射方向$w_r$的radiance，然后积分求和及可

> 那么对于任何一种着色模型，我们只需要知道其BRDF是什么就可以了

> 然而现实情况是很复杂的，也就是是任何一个出射都可以作为一个入射，因为光的反射递归Whitted，仍需要考虑递归的间接光照。这里暂时不做讨论。

## [7]The Rendering Equation渲染方程

趁热打铁，这里根据反射方程推出一个更加通用的渲染方程

之前的反射方程还有一种情况未考虑，也就是如果物体会发光，那么还需要将发光块加入到方程中——形成的这个方程就叫做渲染方程
$$
L_0(p,w_0)=L_e(p,w_0)+\int_{\Omega+}L_i(p,w_i)fr(p,w_i,w_0)(n\cdot w_i)dw_i
$$

> 注意这里的光线方向，比如入射方向，在计算时都写成向外的

### 渲染方程应用

对于一个点光源的情况：

![在这里插入图片描述](https://img-blog.csdnimg.cn/83da5c3210394316a1597ba0f0e67c9c.png)


那么多个点光源：

![在这里插入图片描述](https://img-blog.csdnimg.cn/0ec30116c13d4ffda717c7ce3fd97aa8.png)


更进一步，如果有一个面光源呢？将这个面光源积分起来

![在这里插入图片描述](https://img-blog.csdnimg.cn/4710fef1affb4879b349ae06787f87d3.png)


还未结束，如果有其他点dA的出射光作为入射光射进来呢？把物体反射出来的光也当作一个光源即可

![在这里插入图片描述](https://img-blog.csdnimg.cn/218cf6821e874019ab892b785890bbcc.png)


在数学上可以通过简化的方式将上面的式子列出来
$$
l(u)=e(u)+ \int l(v)K(u,v)dv
$$

- $l(u)、l(v)$：两个不同位置（光源）辐射出去的radiance，加起来即可
- $e(u)$：在着色点位置发出来的能量
- $K(u,v)dv$：通过BRDF把从多个物体射入的radiance，然后计算会有多大的能量反射到我们观察的着色点上

在简写成：(把积分写成乘积形式)
$$
L=E+KL\\
IL-KL=E\\
(I-K)L=E\\
L=(I-K)^{-1}E\\
$$
其中$I$为单位矩阵，应用二项式定理
$$
L=(I +K +K^2 +K^3 +...)E\\
L =E +KE +K^2E +K^3E +...
$$
其中：

- $E$：光源直射
- $KE$：光照弹射一次，叫直接光照
- $K^2E$：光照弹射两次，叫间接光照
- $...$更多次：全局光照

下面为不同弹射次数所呈现的场景

![在这里插入图片描述](https://img-blog.csdnimg.cn/202a5ad7d6694e48bb622606b8a96ed3.png)


如上图所示，弹射次数越多，场景就越趋于真实，当然变化也就越小，越趋近收敛，当弹射次数达到一定时，场景就会趋于稳定状态，在增加也没多大变化了