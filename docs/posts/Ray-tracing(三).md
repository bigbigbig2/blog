---
layout: Post
title: 光线追踪(三)
subtitle: Monte Carlo Integration蒙特卡洛积分、Path Tracing路径追踪（Russian Roulette俄罗斯轮盘 、对光源进行采样等）
date: 2022-08-19
useHeaderImage: true
headerImage: /img/in-post/2022-8-19/1.jpg
tags:
  - 计算机图形学
  - 光线追踪
---
[[toc]]
## 1.Monte Carlo Integration蒙特卡洛积分

**蒙特卡洛积分**（Monte Carlo Integration） 是一种积分的方法

先脑补一下莱布尼茨解法，发现如果F(x)很复杂，不容易求出，那么可以使用蒙特卡洛积分来近似求解定积分，其实还有一个也是求近似的叫黎曼积分，这里就不张开
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ba6540000c746838fe7d9c961303566~tplv-k3u1fbpfcp-zoom-1.image)


蒙特卡洛积分思想：在$[a,b]$随机采样一个数$c$，求得$f(c)$，然后其积分结果就是$f(c)xab$的面积（定积分几何意义），然后进行大量采样重复上面操作，求平均。最后便可以得出近似解。

- 定义定积分：$\int_{a}^{b}f(x)dx$
- 依照一种概率密度函数$p(x)$ ，随机采样位置$Xi$
- 近似求解定积分即为：

$$
\int f(x)dx= F_N=\frac{1}{N}\sum_{i=1}^N \frac{f(X_i)}{P(X_i)}
$$

> 样本N越多，结果越近似

## 2.Path Tracing路径追踪

回顾之前的Whitted-Style Ray Tracing方式：

- 在物体表面通过镜面反射/折射来实现光线弹射
- 在物体表面出现漫反射时停止反射

这种简化的方式其实是不够的，而且其采用的用的是Blinn-Phong光照模型，那么接下来对其进行逐渐优化处理

首先先看看Whitted-Style Ray Tracing的不足之处：

problem 1:Whitted-Style Ray Tracing 在处理光照反射时总是沿着镜面反射方向进行，这适用于镜面材质，但却不适用于 Glossy 之类的材质：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c982e110b068450493e33a416d3ee23b~tplv-k3u1fbpfcp-zoom-1.image)


Problem 2:Whitted-Style Ray Tracing 不考虑物体表面漫反射会进一步反射，但实际上漫反射物体仍会继续反射光线：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4cb95db52ab428aa16abbe9a130696a~tplv-k3u1fbpfcp-zoom-1.image)


	渲染方程完美的解决了这些问题，因为它是根据物理量被推出来的
$$
L_{o}\left(p, \omega_{o}\right)=L_{e}\left(p, \omega_{o}\right)+\int_{\Omega^{+}} L_{i}\left(p, \omega_{i}\right) f_{r}\left(p, \omega_{i}, \omega_{o}\right)\left(n \cdot \omega_{i}\right) \mathrm{d} \omega_{i}
$$
为了求解这个积分，那么可以利用前面的蒙特卡洛积分求解（首先对渲染方程进行简化，除其自身发光项并且只包含直接光，没有没其他物体反射过来的光，这样才能直接采用蒙特卡洛来求解），下面为简化后的方程：
$$
L_{o}\left(p, \omega_{o}\right)=\int_{\Omega^{+}} L_{i}\left(p, \omega_{i}\right) f_{r}\left(p, \omega_{i}, \omega_{o}\right)\left(n \cdot \omega_{i}\right) \mathrm{d} \omega_{i} 
$$
然后根据之前的蒙特卡洛公式：
$$
\int^b_a f(x)dx≈ F_N=\frac{1}{N}\sum_{i=1}^N \frac{f(X_i)}{P(X_i)} \\
X_k~p(x)
$$
替换f(x):
$$
f(x)=L_i(p,w_i)f_r(p,w_i,w_0)(n,w_i)
$$
概论密度函数（这里的为一个半球面）：
$$
p(w_i)=\frac{1}{2\pi}
$$
所以就可以将上面的渲染方程写成蒙特卡洛形式：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c74399ec371a4ac4b5647d994f4692dc~tplv-k3u1fbpfcp-zoom-1.image)


这样我们就可以算出任意一个着色点出射的Radiance了1

对照这个公式，我们可以将着色的伪代码算法大致写出来

```
shade(p, wo) //任何一个点p,出射方向wo
    Randomly choose N directions wi~pdf //选任意个方向wi
    Lo = 0.0
    For each wi //对任何一个选中的方向
        Trace a ray r(p, wi) //连出一条入射光线r(p-wi)
        If ray r hit the light //如果光线能够反射到光源
        	Lo += (1 / N) * L_i * f_r * cosine / pdf(wi)
	Return Lo
```

这个算法只是针对于下面这种简单情况（**不考虑间接光照**）的

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc58b584aeb048c9967130545ed426ae~tplv-k3u1fbpfcp-zoom-1.image)


这里进一步学习间接光照的情况：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a00e5f2c89f44f0a80de5e9276fec04~tplv-k3u1fbpfcp-zoom-1.image)


把Q点反射过来的radiance当成某个光源发射来的radiance就可以了

这样改进算法：（加上一个else if语句即可实现全局的路径追踪算法）

```
shade(p, wo) //任何一个点p,出射方向wo
    Randomly choose N directions wi~pdf //选任意个方向wi
    Lo = 0.0
    For each wi //对任何一个选中的方向
        Trace a ray r(p, wi) //连出一条入射光线r(p-wi)
        If ray r hit the light //如果光线能够反射到光源
        	Lo += (1 / N) * L_i * f_r * cosine / pdf(wi)
        Else If ray r hit an object at q
        	Lo += (1 / N) * shade(q, -wi) * f_r * cosine/ pdf(wi)
	Return Lo
```

递归妙解。。 	

### [1]路径追踪

每一条出射光线都需要采样N个入射光线来计算，那么每一条从物体来的入射光线同样需要N个入射光线，这将会是平方级别的增长。即使平均每次只有100条光线是从物体来的，那经过3次弹射之后就需要1000000条入射光线的计算，这样的计算开销十分庞大。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c80573d954a41edb0ec62421048f4a0~tplv-k3u1fbpfcp-zoom-1.image)


显然，只有N=1的时候，计算量才不会爆炸级增长。但N=1又是另一个极端，会使得结果欠采样，非常的 "noisy"。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc229df6aa3147c6942fe4d8fc37daac~tplv-k3u1fbpfcp-zoom-1.image)


那么使用N=1来做蒙特卡洛积分就叫做**路径追踪**

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72850e3a0c444b15879800f4a27b2c49~tplv-k3u1fbpfcp-zoom-1.image)


**重复多次寻找到多条路径**，最后取平均来模拟采样。如下图所示，在同一个像素内采样多个点来生成光线，进行路径追踪
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d34997f6099b4bb280e2a99169add80a~tplv-k3u1fbpfcp-zoom-1.image)


![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/700d131acfc44c41b3c2fe1058e6b120~tplv-k3u1fbpfcp-zoom-1.image)


然而并没有结束，还有一个问题，递归的结束条件（也就是反射多少次后，不再进行反射）呢

### [2]Russian Roulette俄罗斯轮盘赌 

Russian Roulette俄罗斯轮盘赌 很巧妙的解决了这一问题

实现了在一定条件下停下来（无偏估计）


- 通过自己定义一个概率$P$，在每次进行一个点的着色计算之前， 生成一个$[0,1]$的随机数
- 如果随机数是在 $[0,P]$之间，则进行计算，将得到的 $L_o$除以$P$ ，即返回$L_o/P$ 
- 如果是$[p-1]$之间，则停止反射，返回结果 0

$$
E=P∗(Lo/P)+(1−P)∗0=Lo
$$

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1757be9d7104d9f8ed26924fdeeaca4~tplv-k3u1fbpfcp-zoom-1.image)


path Tracing完成了，但还不够高效

光线在反射的过程中打到光源是存在一定概率的，它往往与光源自身大小相关，如果光源过小，会使得大量光线无法打到光源：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e11bd3600764640a6a1f5286f8fab1c~tplv-k3u1fbpfcp-zoom-1.image)


比如下图中大的光源只需要5根光线就可以打到，而最小的需要50000根才有一根能达到，这样就有很多光线浪费掉了，因为打得到达不到光源我们之前是需要看运气的。

那怎么解决呢？

### [3]对光源进行采样

这里的做法就是将物体表面接收到的`radiance`分解为两部分：**来自光源**和**来自其他反射物体**。对于来自光源的部分，直接在光源上进行采样即可，采样过程就是换积分域的过程，在采样完后我们还需要判断光源能否作用在物体表面

这样所有采样的光线都一定会击中光源(如果中间没有别的物体)，没有光线再会被浪费了

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e34c43f0d287453db84e1abfee8c7be5~tplv-k3u1fbpfcp-zoom-1.image)


假设光源的面积为A，那么对光源进行**均匀采样**的概率密度函数 $p(w_o)=1/A$ (因为$\int p(w_o)dA=1$)

但原始的渲染方程是对入射光线 $dw_i$进行积分的，我们需要对其进行修改，改成**对光源面积** $dA$ **的积分**

重写渲染方程得到：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ab40d8fbb51475d9d2f351515397e60~tplv-k3u1fbpfcp-zoom-1.image)


然后就可以利用蒙特卡洛的方法对光源进行采样从而计算直接光照的积分值了，对于间接光照，依然采用先前的方法进行光线方向的均匀采样。最终伪代码如下，分直接光照（无需RR算法）和间接光照两部分计算：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b0e7d043b4e45cf9d8f7018774a05c7~tplv-k3u1fbpfcp-zoom-1.image)


最后还需要考虑一个问题

在对光源进行采样的过程中，可能会存在光源是无法打到物体的，这时需要判断一下：

判断方法：回归原始的原理如果某一点能看见光源，那么它就能被光源照亮。所以只需要先从观测点向着光源发射一条光线，如果光线被阻挡，则不再考虑来自直接光源的部分

只需要在之前的算法上加上一个判断即可

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2370e8b5e37844c2855c28e3403aa75d~tplv-k3u1fbpfcp-zoom-1.image)


对于点光源path trcing是很困难的，可以将其看成一个小的面光源

最终看看path tracing的效果（对比真实照片和渲染图）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd350cdc9890447c99c95ab9c674c1f9~tplv-k3u1fbpfcp-zoom-1.image)


> 以前的Ray tracing 通常指的是 Whitted-style ray tracing
>
> 而现在的Ray tracing通常应该指的是所有光线传播方法的一个大集合例如；
>
> - (Unidirectional & bidirectional)单双向的 path tracin
> - Photon mapping（光子映射）
> - Metropolis light transport
> -  VCM / UPBP
> - ...