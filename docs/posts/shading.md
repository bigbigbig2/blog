---
layout: Post
title: shading
subtitle: Blinn-Phong着色模型（漫反射、高光、环境光）、着色频率(平面、高洛德、冯氏着色)、图形（实时渲染）管线、纹理映射（纹理坐标、插值与中心坐标、纹素、双线性插值、Mipmap、三线性插值、各向异性过滤）、纹理的应用（球面、立方体、凹凸、位移贴图等）
date: 2022-08-11
useHeaderImage: true
headerImage: /img/in-post/bu/18.jpg
tags:
  - 计算机图形学
---
[[toc]]
## 1.着色的定义

着色的定义——将材质应用于对象的过程（对不同物体应用不同材质的过程）

简单来说shading就是计算出每个采样像素点的颜色是什么

## 2.Blinn-Phong Reflectance Model(着色模型)

一个简单的着色模型（Blinn-Phong 反射模型）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80d4064e306749cb9d8a4b1b3889f2ed~tplv-k3u1fbpfcp-zoom-1.image)


Blinn-Phong 着色模型主要有三部分组成：

- Diffuse reflection （漫反射）：由物体本身的颜色决定
- Specular highlights（高光）：由观察角度与光线反射角度共同决定，两者夹角越小，高光越明显
- Ambient  highting（环境光）：由环境决定，简化了的

着色是局部的，对于每个着色点，我们可以简化成如下图所示：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de5ee416515e4f1d86cc95bf5575e5a7~tplv-k3u1fbpfcp-zoom-1.image)


其中：

- n 表示表面法线方向
- l 表示入射光方向
- v 表示观察方向
- `color`,`shininess`

> 注意：所有向量都是单位向量，所以确保向量进行过 normalize（归一化） 操作

> 着色不等于阴影，着色不会产生阴影
>
> 考虑某个点的着色情况就只需要看他自己（还要光照等参数），不需要考虑其他物体的存在（也就是不考虑其他物体产生的阴影对其造成的影响）
>
> shading（着色） ≠ shadow（阴影）

### [1]Diffuse(漫反射) 

光线均匀地向各个方向散射，所有观察方向的表面颜色都相同

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23f166081f744cf5a307eae16828a4d9~tplv-k3u1fbpfcp-zoom-1.image)


但是还会有一个问题：不同的角度亮度会不同

细心的同学会发现，上图中的入射光线和反射光线的颜色是不同的，这是因为当入射光线到达物体表面时，物体表面会吸收一部分能量，然后反射它没有吸收的能量（暂时不考虑折射），也就是物体本身的颜色。

从能量的角度考虑，只有当有能量到达物体表面时，物体才能发生漫反射，那么接下来的问题是，怎么知道有多少能量到达物体表面呢？

#### **兰伯特余弦定律**

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13a7ee3981344711ad738507c199a29e~tplv-k3u1fbpfcp-zoom-1.image)


> 法线n的与入射光I的夹角θ之间的角度决定了物体表面的亮度/吸收的能量的多少（兰伯特余弦定律）

左图中的光线与平面法线平行，平面接受了所有光线的能量（6根光线）。

中图中的光线与平面法线夹角为 60度，平面只接受了一半光线的能量（3根光线）。

推广到一般情况下，平面能接受的能量与该平面的法线和入射光的角度有关。其关系是：
$$
平面接受的能量的百分比=cos(n,l)=cosθ
$$
接下来的问题是，能量从哪里来？以点光源为例，它的能量是从中心外四周扩散的，如下图所示：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/093d862a4e584b818764da747e4318c0~tplv-k3u1fbpfcp-zoom-1.image)


假设传播过程中能量守恒，这意味着在半径为 1 时的能量等于半径为 r 时的能量，均为 E。然而，随着半径的增大，球面的表面积也在增大，相当于球面中单位面积的能量减少了。

我们知道，球面的表面积公式为：

$$
S=4πr^2
$$
假设单位面积的能量为 I，那么半径为 1 时的能量为：

$$
E=I_1×4π
$$
半径为 r 时的能量为：

$$
E=I_r×4πr^2
$$
那么我们就能得到半径为 r 时的单位面积的能量了：

$$
Ir=\frac{I_1}{r_2}
$$
**也就是知道了一个点光源和某个shading point离点光源有多远，那么便可以计算出有多少光真正传播到这个点**

**同时也知道了有多少光被吸收**

最后，整理一下漫反射公式：

$$
到达单位面积的着色点的能量=\frac{I}{r^2} \\

接收着色点吸收的能量的百分比（兰伯特余弦定理）=max(0,n⋅l)
$$
因此：

$$
Ld=kd⋅(\frac{I}{r^2})⋅max(0,n⋅l)\\
n\cdot l = θ
$$

- $Ld$ 表示着色点的漫反射分量
- $kd$ 表示材质的漫反射系数，可调节(就是漫反射中着色点吸收的能量的参数，例如1表示shading point不吸收能量)，不同的点吸收不同的能量，就产生了不同的颜色
- $眼睛最终看到的能量（漫反射光） = kd⋅到达了多少能量⋅接收多少能量$

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/506d68e324f3469e98900b2217f8cc72~tplv-k3u1fbpfcp-zoom-1.image)


> 漫反射由于光照射到一个shading point上，然后能量被均匀的反射到各个方向去，那么这就意味不管从哪里观察它(无论v的方向），我看到的结果都是一模一样的。
>
> ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d3cc6df01244bc18b5fd6fee4bbd898~tplv-k3u1fbpfcp-zoom-1.image)

>
>$k_d$随法线与入射光线夹角减小（接近垂直）而增大

#### 小结

漫反射基本原理

漫反射表示一个点的经过反射将光线反射到各个方向上，如果光源位置不变，物体位置不变（$l、n不变$）,那么无论你在那个方向去看这个点，看到的结果（亮度）是一样的

### [2]Specular(高光)

强度取决于观察方向

当光线发生反射时，如果当前视角方向与反射方向接近时（v和R接近时），我们就能看到高光了。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d4bae7e2ad6472187f11b3a24915918~tplv-k3u1fbpfcp-zoom-1.image)


和漫反射公式类似，我们也需要知道有多少能量到达了平面，有多少能量被反射出去了，不同的地方是我们需要求视角方向与反射方向的夹角。

#### 半程向量

**V close to mirror direction <===> half vector close n**

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d226d2f140745b698e4fb452f05d43e~tplv-k3u1fbpfcp-zoom-1.image)


在这里先引入一个新的概念——half vector（半程向量h）

如果我们有一个入射方向$l$和出射方向$v$，那么，直接利用平行四边形法则原理将两向量相加，然后对其进行归一化处理便很容易的可以求出它们的角平分线方向$h$
$$
h=bisector(v,1)=\frac{v+l}{||v+l||}\\
$$
$h$和$n$接近就可以在一定程度上推出$v$和$R$接近

那这么做有什么好处呢？

- 那么我们就可以通过$n$和$h$点乘的结果来判断是否接近（越接近1越接近，远则接近0）

那为什么不直接使用v和R的点乘来计算呢？

#### 公式推导

那我们先推推使用v和R来推公式：
$$
L_s = k_s \cdot (\frac I {r^2}) \cdot max(0, v \cdot R)
$$
其实也可以使用v和R的点乘来计算，这是属于另一个着色模型—— Phong 着色模型的计算方法，但是因为 Phong 着色模型只是经验模型，并没有考虑太多的物理意义，因此在计算高光的时候并没有像漫反射公式那样考虑有多少能量被吸收了，因此就舍弃了 $max(0,n⋅l) $部分

然而，上面公式计算反射光与视角夹角时会得到一个 0~90 度的范围，这意味着在这个范围中都能看到高光，这显然不符合高光的定义。因此需要对该部分进行修正：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c30b60eb0db84dc29cc7f6293b3ba6ff~tplv-k3u1fbpfcp-zoom-1.image)


高光亮度随v和R角度变化并不是像cos的曲线一样是那么平滑的，而是有一定的特点的，例如在某个范围内的亮度变化是比较大的。

那么我们可以对夹角余弦进行一个简单的操作——把它加上若干个指数（在多少度之外就看不到高光了）

那么指数用多大合适呢？

- 正常情况下在Blinn-Phong模型下一般使用100~200

这样就对上面的公式进行了升级
$$
L_s = k_s \cdot (\frac I {r^2}) \cdot max(0, v \cdot r)^p
$$

- $L_s$表示着色点的高光分量
- $k_s$ 表示材质的高光系数，可调节
- $p$ 用来调节高光的可视范围



Blinn Phong 着色模型在这基础上进行了优化：当反射向量与视角向量相近时，这相当于视角与入射光的 **半程向量** 与法线的夹角相近，因为根据入射方向计算反射方向并不好算，而半程向量好算
$$
L_S=k_S(\frac{I}{r^2})\cdot max(0,cos\alpha)^p=k_S(\frac{I}{r^2})\cdot max(0,n\cdot h)^p
$$

- $L_s$表示着色点的高光分量
- $k_s$ 表示材质的高光系数，可调节
- $p$ 用来调节高光的可视范围

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04ce382bc26a456da49325e58c4784e2~tplv-k3u1fbpfcp-zoom-1.image)




### [3]Ambient(环境光)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5aaa7195c95404cb02317b0ad312e9f~tplv-k3u1fbpfcp-zoom-1.image)


对于没有光线直接照射的平面（如最开始的茶杯的背光位置），该平面依旧会受到环境中各种光照的反射（来自四面八方的光照），这就是环境光对场景的影响。

由此可见环境光是一个多么复杂的东西，那我们做一个大胆的假设，任何一个点接收到来自环境的光永远都是相同的，强度为$I_a$

根据这一假设我们发现环境光有许多特点

- 环境光不需要关注光线 $l$ 从那个方向进来，也就是与$l$方式无关
- 环境光与观察方向也无关，也就是与$R$无关
- 也就说明环境光与$v$也没有关系，与$n$也没有关系（不是嫌疑人😲）
- 那它就只是一个常数



于是可以得出环境光公式：
$$
L_a=k_aI_a
$$

- $L_a$环境反射光
- $k_a$材质环境系数（可调节）

### [4]小结

当我们计算出漫反射、高光、环境光之后，把它们加起来，就能得到 Blinn Phong 着色模型的结果了：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6104c6cf5e541d78e72ce35fabdae70~tplv-k3u1fbpfcp-zoom-1.image)



$$
L = L_a + L_d + L_s\\
L = k_a I_a + k_d(\frac {I} {r^2}) max(0, n \cdot l) + k_s(\frac {I} {r^2}) max(0, n \cdot h)^p
$$
那么下一步到什么了呢？（现在已经对任何一个点应该长什么样有了了解）

对所有的点做一遍着色操作（着色频率）

## 3.Shading Frequecies着色频率

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b405d4a725864258a738c368803878d3~tplv-k3u1fbpfcp-zoom-1.image)


着色频率指的是把着色应用到那些点上，如上图所示，上面三个球都拥有相同的几何形状，但应用了不同的着色频率，分别是：

- 平面着色（左）

- 高洛德着色（中）

- 冯氏着色（右）

### [1]Falt shading平面着色

着色应用到平面上，一个平面只用做一次shading，因此表现为整个三角面的颜色都是一样的。

### [2]Gouraud shading高洛德着色

着色应用到顶点上，对每个顶点做一次着色（比如基本图元是三角形，对每个三角形顶点进行着色【先求出顶点的法线】，然后三角形内部则是通过插值来实现着色——常见）

### [3]Phong shading冯氏着色

对每个像素进行着色，比如基本图元还是三角形，那么可以得出三角形三个顶点的法线，然后通过插值计算出三角形内部每个像素的法线，然后对每个像素进行着色

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4eb7a02b4d1473eb0060fb759663958~tplv-k3u1fbpfcp-zoom-1.image)


> 如图所示，着色频率对结果的影响，取决于模型的复杂度。模型的复杂度越低，着色结果区别越大，但随着模型复杂度的提高，平面着色也可以达到冯氏着色的效果。因此我们不能迷信冯氏着色一定比平面着色好。

### [4]定义每个顶点的法向量

从三角形面推断顶点法线

有一个简单方案：平均周围面的法线

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8479335b822409d965e20104fd456fb~tplv-k3u1fbpfcp-zoom-1.image)

$$
N_v = \frac{\sum_i N_i}{||\sum_i N_i||}
$$


### [5]定义逐像素的法线

顶点法线的重心插值

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95bbd36f456d4398b53e73dbc7f815d6~tplv-k3u1fbpfcp-zoom-1.image)

> 不要忘记对插值方向进行归一化

## 4.Graphics (Real-time Rendering) Pipeline

图形（实时渲染）管线

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/647d7f7c1d484d01b57bec63401d91cf~tplv-k3u1fbpfcp-zoom-1.image)


- **Vertex Processing**：对每个顶点进行Model, View, Projection transforms
- **Fragment Processing**：当光栅化处理得到像素/Fragment片元时，进行深度测试（Z-Buffer Visibility Tests）等、shading着色

> 在现代的GPU里是允许对上面图形管线进行编程的（例如WebGL中的顶点着色器和片元着色器），整个实时渲染界都在写这些（shader编程）

### [1]Shader Programs

- 程序顶点和片段处理阶段
- shader本质上是一些能在硬件上执行的语言
- 描述对单个顶点（或片段）的操作

### [2]GPU

图形管线的硬件实现，用于执行图形管线计算的专用处理器，高度**并行**化处理器（Heterogeneous, Multi-Core Procesor）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a5bffb25fac46ea9c8bdfa3167390ef~tplv-k3u1fbpfcp-zoom-1.image)


![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43f4e014c04b4eba9433244d8d3869a5~tplv-k3u1fbpfcp-zoom-1.image)


## 5.Texture Mapping纹理映射

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53df4b3e9c9749169c850549172587d9~tplv-k3u1fbpfcp-zoom-1.image)


回顾漫反射公式中，我们可以通过改变 $k_d$ 来调整漫反射分量，当这个 $kd$ 包含了纹理中某个区域的颜色时，这其实就相当于把该纹理应用到着色公式中了。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f4c0ef4fbc742f28c4183f872f034bc~tplv-k3u1fbpfcp-zoom-1.image)


地球上的一个点投影到平面上的一个点（这两个点之间的关系也称为**纹理映射**）

由于任意一个三维物体它都是由二维的三角面构成的，因此我们可以利用这个性质，来建立空间中的三角形与二维纹理中的映射关系。 这项工作通常是在建模软件中完成的。
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8a4c4d51d204e23b2917900270aafa5~tplv-k3u1fbpfcp-zoom-1.image)


### [1]纹理坐标

每个三角形顶点都分配了一个纹理坐标 (u,v)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90eeae4213ac43ee8ea39089d1919a18~tplv-k3u1fbpfcp-zoom-1.image)


$u、v$的范围默认为$[0,1]$

只要三角形中的每个顶点都保存了一个 UV 坐标的信息，那么在着色的时候就可以通过 UV 坐标找到该纹理对应的区域，这样就可以实现应用纹理的效果了。

现在，我们知道了三角形的三个顶点中都包含了 UV 坐标，但三角形中的任意一点的 UV 坐标又应该怎么计算呢？这时候就需要引入一个新的概念：**重心坐标**。

[2]插值--重心坐标

常见的使用到插值的内容

- Texture coordinates, colors, normal vectors, ...

如何进行插值？

- Barycentric coordinates重心坐标

 重心坐标是以三角形的其中一个顶点为原点，分别以另外两个顶点作为基向量作为一个新的坐标系$(\alpha,\beta,\gamma)$


![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1098c5df01d44f1792adaf2531ac31e1~tplv-k3u1fbpfcp-zoom-1.image)

重心坐标：这三个顶点所形成平面内任何一个点$(x,y)$都可以用三个顶点的坐标的线性组合来表示
$$
(x,y) =\alpha A+\beta B+\gamma C
$$
只要满足
$$
\alpha+\beta+\gamma=1
$$
当$\alpha,\beta,\gamma$都是非负的时，就可以判断这个点在三角形内

重心坐标还有另一种表示方式，即每一个分量等于该顶点所对应的面积与整个三角形面积的比值：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/086cbfb8d47e410685542917bf4e2955~tplv-k3u1fbpfcp-zoom-1.image)


如图所示，A 所对应的面积为$A_A$ ，B 所对应的面积为$A_B$ ，C 所对应的面积为$C_A $，于是重心坐标的三个分量就是：
$$
\alpha = \frac {A_A} {A_A + A_B + A_C}\\
\beta = \frac {A_B} {A_A + A_B + A_C}\\
\gamma = \frac {A_C} {A_A + A_B + A_C}
$$


根据重心坐标的定义，我们能得到几个很特殊的重心坐标：

- $(1,0,0)$顶点 A 的坐标
- $(0,1,0)$顶点 B 的坐标
- $(0,0,1)$顶点 C 的坐标
- $(\frac{1}{3},\frac{1}{3},\frac{1}{3})$三角形的重心

更具上面的公式就可以把二维平面中的三角形的任意一点 $(x,y)$转化成重心坐标$(\alpha,\beta,\gamma)$， ，这里有一个通用公式
$$
\alpha = \frac {-(x - x_B)(y_C - y_B) + (y - y_B)(x_C - x_B)} {-(x_A - x_B)(y_C - y_B) + (y_A - y_B)(x_C - x_B)}\\
\beta = \frac {-(x - x_C)(y_A - y_C) + (y - y_C)(x_A - x_C)} {-(x_B - x_C)(y_A - y_C) + (y_B - y_C)(x_A - x_C)}\\
\gamma = 1 - \alpha - \beta
$$
有了重心坐标之后，我们就能计算出三角形中任意一点的属性了（位置、法线、颜色、UV 等等）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a3140c9439746fba559ac5817078c70~tplv-k3u1fbpfcp-zoom-1.image)


需要注意的是，由于三角形在投影前后的重心坐标（形状）会发生变化，因此并不能用投影后的三角形的重心坐标来计算，必须把它还原成投影前的三角形，然后计算其重心坐标，再计算对应的属性。

### [3]应用纹理

有了重心坐标之后，我们能计算出任意一个像素对应 UV 坐标了，然后就能为每个像素应用纹理了。应用纹理的逻辑非常简单，只要遍历就可以了：

```
for each rasteried screen sample(x, y):  //Usually a pixel's center
    (u,v) = evaluate texture corrdiante at(x,y) //Using barycentric coordinates
    texcolor = texture.sample(u,v)
    set sample's color to texcolor; 
    //Usually the diffuse albedo Kd (recall the Blinn-Phong reflectance model)
```

### [4]Texel纹素

纹素与像素非常相似，像素是组成屏幕的基本单位，而纹素则是组成纹理的基本单位，它和像素一样都是有面积的

### [5]Bilinear双线性插值

显然，根据重心坐标计算出来的 UV 坐标是一个浮点数，它会落在纹理中的任意位置。当我们尝试在该位置采样的时候，就会遇到一个问题：我们应该取什么颜色？

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/941de0b5e1154dd8b4c0d3338c87877e~tplv-k3u1fbpfcp-zoom-1.image)


显然，我们需要一个采样策略去决定应该获得什么颜色，常见的策略有：

- **Nearest**：取该采样点所在的纹素的颜色（会发生一次采样）
- **Bilinear Interpolation**（双线性插值）
- **Bicubic**：原理同双线性插值，只不过它是取16个点进行插值（运算量大）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecaebc38f86344209b562b9237ab9a83~tplv-k3u1fbpfcp-zoom-1.image)


- 先通过Linear interpolation(线性插值)计算出$u_0$、$u_1$的值
- 然后再用$u_0，u_1$插值出$t$的具体值
- 这样就实现了平滑过渡效果
- 双线性插值通常以合理的成本获得相当不错的结果

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60c5dadaa8a74656b57f981a75116426~tplv-k3u1fbpfcp-zoom-1.image)




### [6]纹素采样问题

多个屏幕像素可以映射到单个纹素——Texture Magnification纹理放大，这种情况其实比纹理缩小Texture Minification容易引起更严重的问题（远处出现摩尔纹，近处出现锯齿）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02444f55885744af8682b185a49abc3e~tplv-k3u1fbpfcp-zoom-1.image)


这是因为每个像素对应的纹素区域不同导致的。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3193a55005d407bb5a1508ca0e7b847~tplv-k3u1fbpfcp-zoom-1.image)


- 对于近距离的像素来说，它所覆盖的纹素范围较少，纹理发生了放大
- 对于远距离的像素来说，它所覆盖的纹理范围较大，纹理发生了缩小

这背后的问题就是，对于每个像素来说，它们表示的要表示的区域各不相同，但最终要以一个颜色来填充整个像素

这是一个典型的走样问题，我们可以通过超采样**来实现反走样，下面是 512 倍超采样的结果

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55cf1a1afb2443ab863007927bb696ac~tplv-k3u1fbpfcp-zoom-1.image)


可以看到，超采样的效果比较明显，但它有一个致命的问题：性能消耗巨大

细心想想，我们刚刚对纹理采样是一种**点查询**，也就是通过一个 UV 坐标去获取一个纹素的颜色的，如果有一种方式可以实现**范围查询**，也就是通过一个 UV 坐标去获取一个范围（任意大小）的平均颜色，那么就能完美解决这个问题了。

而这个方案就是**Mipmap**。也就是不使用采样的方法了

不同像素-> 不同的纹理大小：

- 远处物体小，多个纹理映射到一个像素
- 近处物体大，一个纹理映射到多个像素

### [7]Mipmap

Mipmap 是指根据一张纹理去生成一系列更小的纹理的技术。

允许（快速的, 近似的, 正方形的）做范围查询

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92f44193dff54366b74ba0085622c4c0~tplv-k3u1fbpfcp-zoom-1.image)


如图所示：

- 第 0 级是纹理的原尺寸
- 第 1 级由第 0 级纹理分辨率缩小一半
- 最后一级的纹理尺寸为 1x1
- 每一级 mipmap 中的每一个像素，都是由上一级 mipmap 相邻的四个像素求平均所得。
- Mipmap 的存储只增加了比原来存储量的$\frac{1}{3}$

这样便可以在渲染之前，拿到纹理之后将这些分层生成好

在采样的时候，我们可以先计算出这个像素覆盖了多大范围的纹素，然后再计算出这个范围应该对应到第几层 mipmap，再对该层 mipmap 进行采样，这样就相当于得到了原区域纹素的平均颜色了。 例如：

- 当一个像素覆盖了 1 个纹素的时候，采样时应该访问第 0 层 mipmap
- 当一个像素覆盖了 2 个纹素的时候，采样时应该访问第 1 层 mipmap
- 当一个像素覆盖了 4 个纹素的时候，采样时应该访问第 2 层 mipmap
- …
- 当一个像素覆盖了 128 个纹素的时候，采样时应该访问第 7 层 mipmap

那要怎么计算一个像素覆盖了多少纹素呢？其实有很多方法可以计算的，这里只介绍一个简单的做法：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26d51fb4f17f4c34baa196b3ebd77eb4~tplv-k3u1fbpfcp-zoom-1.image)


只要根据该像素的四个角的 UV 坐标，计算出它们映射到纹理上的位置，然后把它们连起来就可以了。 实际上，我们在采样 mipmap 的时候，会把这个查询区域近似看成**正方形**，而这个过程中有更复杂的算法去实现，具体可以查阅相关资料。

假设一个像素覆盖了 N 个纹素，应该采样的层数为L ，那么它们的关系就是：
$$
L = log_2 N
$$
显然，L 有可能是一个浮点数，如 1.5，这时候应该怎么办呢？很简单，先采样第1 层，然后采样第 2 层，再对两个值进行插值即可。

#### Trilinear Interpolation三线性插值

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/665ba2a9dc24425fbbaa788361bfe9cb~tplv-k3u1fbpfcp-zoom-1.image)


基于在D层上双线性插值的结果和在D+1层上在做一次插值（**层与层之间**）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6064a435d3c042b4bfe4c6708ac31b58~tplv-k3u1fbpfcp-zoom-1.image)


三线性插值结果对比（过渡效果明显）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab47f2f660dc4450b52ccad118e863cc~tplv-k3u1fbpfcp-zoom-1.image)


对对比之前的一张图，发现还有问题啊!(*￣(￣　*)

- 在远处出现了模糊效果——Overblur，这是为什么呢
- 这是就又出现了一种方法会比三线性插值更好的——各向异性过滤

### [8]Anisotropic Filtering各向异性过滤

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b56043cc6b44366941e7926bb3befb0~tplv-k3u1fbpfcp-zoom-1.image)


Mipmap在远处出现了模糊效果是因为对于远处的像素来说，它们覆盖的纹素实际上并不是一个正方形，而是一个扁矩形，采样 `mipmap` 的时候以正方形区域来采样会带来比较大的误差

因此这里需要一种新的策略，这就是**各向异性过滤**的作用了

和 mipmap 类似，各向异性过滤也是利用原纹理去生成更小尺寸的纹理的技术，mipmap 生成的是宽高比例不变的纹理，而各向异性过滤生成的是宽高比例会发生变化的纹理。如下图所示

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f85d14a0290844ceb9d221f812510e0a~tplv-k3u1fbpfcp-zoom-1.image)

> 可以看出它的开销是原本的三倍

左上角的是原纹理，顺着左上角往右下角方向生成的是 mipmap，它们与原纹理是等比例的，此外的其他纹理都是由各向异性过滤而生成的纹理。

和 mipmap 一样，各向异性过滤和也是有层级的，对于上面的那张图，层级如下图所示，相同颜色的区域表示相同层级下的各向异性过滤：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3509a01c617481d97f09bacdbed675a~tplv-k3u1fbpfcp-zoom-1.image)


我们可以在各种图形 API 中去控制应该生成哪些层级的各向异性过滤的纹理。

有了各向异性过滤之后，在对于扁矩形区域，我们就可以找到对应的纹理中查询颜色了。我们来看看使用了各向异性过滤之后的效果

## 6.纹理的应用

纹理的应用其实是很多的

在现代GPU中，纹理=内存 +对内存的  范围查询（过滤）

- 将数据带入片元计算的一般方法
- Environment lighting（环境光映射/纹理）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eba2359d12f240d29a0e3cdff60e7bf5~tplv-k3u1fbpfcp-zoom-1.image)


### [1]Spherical Map球面贴图

环境贴图可以用来表示环境光照。由于环境光是来自四面八方的，因此在采样环境光的时候可以把其看成是一个球面

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2aa1f350e3c4a21abc9a20c7b716c9f~tplv-k3u1fbpfcp-zoom-1.image)


上图中左图是把环境贴图应用在球面上，然后右图的场景中则是利用该环境贴图进行采样得到的结果。

但球面贴图有一个缺点，就是容易发生变形，特别是靠近北极南极的区域，变形非常严重。(同GIS中的投影)

[2]Cube Map立方体贴图

向量沿该方向映射到立方体。 该立方体用6个平方纹理图纹理

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/467cefee17a34d5ca2b39a803c288215~tplv-k3u1fbpfcp-zoom-1.image)


立方体贴图是另一种环境贴图，它是利用六张图来构建成一个立方体，然后再根据法线方向去判断采样哪一个面。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f508db32ac5248768096f2d96b2ca787~tplv-k3u1fbpfcp-zoom-1.image)




### [3]Bump Mapping凹凸贴图

之前的纹理是未来通过使用$k_d$来替换漫反射的颜色与亮度，但是现在还可以使用它来定义高度等属性

凹凸贴图有时候也叫法线贴图

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c07b363d2ee49f098248631b782c248~tplv-k3u1fbpfcp-zoom-1.image)


如果使用之前的普通三角形来实现上面的“橘子”那么需要很多三角形才能实现了，但是使用凹凸贴图的话就会方便很多

- 凹凸贴图是通过伪造详细的几何形状来实现的（计算着色上的着色对比）

实现原理：

- 添加表面细节而不添加更多三角形
- 模拟物体表面变化下的法线

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1dd19c6b0db9499fb0a165c48c0de51e~tplv-k3u1fbpfcp-zoom-1.image)


示例：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/886b72211c3e4d35a519380bf35ebded~tplv-k3u1fbpfcp-zoom-1.image)


- 原物体表面是平整的，这里的蓝色线表示的是凹凸贴图定义的表面，
- 原本的法线n是向上的$(0,1)$
- 那么如果我定义了一个凹凸贴图，那么如何计算某个点对应的梯度\切线\导数（蓝色箭头）

$$
dp = c*[h(p+1) -h(p)]
$$

- 通过求导计算出切线后便可以轻易的计算出法线了(逆时针旋转)

$$
n(P)=(-dp,1).normailzed
$$

在三维情况下：

原来某个点的法向量：
$$
n(p)=(0,0,1)
$$
p处的导数：(求切面)
$$
\frac{dp}{du}=c1*[h(u+1)-h(u)]\\
\frac{dp}{dv}=c2*[h(v+1)-h(v)]\\
$$
结果凹凸贴图定义的法线n：
$$
n=(-\frac{dp}{du},-\frac{dp}{dv},1).normalized
$$

### [4]Displacement mapping位移贴图

一个对于实现凹凸表面更先进的方法

- 原理与凹凸贴图大致相同，只是唯一贴图是真实的移动了顶点

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13ed363157d740f5830ea139b54cbc9f~tplv-k3u1fbpfcp-zoom-1.image)


> 通过上图可以发现：
>
> - 凹凸贴图是通过光线渲染来实现伪3D的，其表面会很容易暴露，还要其阴影也明显的暴露
> - 而位移贴图则是真正的通过移动图形的顶点来实现的，但是位移贴图的效果取决于图形的顶点数，所以对性能有一定的要求

### [5]其他应用

除了上面的应用，纹理映射还要许多有意思的应用，比如下图

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0eedc76bb2241f6ab0fcadaaf8f7e31~tplv-k3u1fbpfcp-zoom-1.image)


> 该图通过三维图形中的噪声函数来实现纹理贴图，也就是说并不存在上面实际的纹理图，纹理图是通过三维图形中的噪声函数实时生成的
