---
layout: Post
title: Rasterization
subtitle: 屏幕与视口变换、采样、锯齿/走样Alising、Frequency Domain(频域)、走样、滤波（中、高、低通滤波）、卷积、反走样（超采样等）、可见性/遮挡
date: 2022-08-07
headerImage: /img/in-post/bu/1.jpg
tags:
  - 计算机图形学
---
[[toc]]

## 1.屏幕	

当进行完 MVP 变换之后，所有需要绘制的点都变换到 $[−1,1]^3$ 的立方体空间中了，接下来，我们需要将图像画在**屏幕**上

下一步工作就是要把结果绘制到屏幕上，在这之前先了解一下什么是屏幕。

屏幕由一系列的像素(Pixel，是 Picture element 的缩写)排布形成，像素的数量由分辨率决定，如分辨率是 1920 x 1080 的屏幕，就包含了 1920 x 1080 个像素。

每个像素表示的颜色由红（red）、绿（green）、蓝（blue）三种颜色混合而成。

## 2.视口变换

**屏幕空间**：在屏幕上建立坐标系。左下角是原点(0,0)，向右是x轴正方向，向上是y轴正方向
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e394107a55b74672a720caa525d49fd3~tplv-k3u1fbpfcp-zoom-1.image)

- 屏幕跨度为：$(0,0) $到 $(width,height)$
- 像素的索引形式：$(x,y)$，$x,y$ 都是整数
- 像素的索引跨度：$(0,0)$ 到 $(width-1,height-1)$
- 由于像素的宽高都是 1，所以像素中心：$(x+0.5,y+0.5)$

如上图的蓝色的像素的位置就是 (2,1)，

视口变换（将裁剪空间变换到屏幕空间）：把$ [−1,1]^2$ 变换成 $[0,width]x[0,height]$ 的空间。只需要经过如下的步骤即可实现：

1. 对 $[−1,1]^2$ 进行一次缩放，铺满屏幕
2. 平移空间，使空间的左下角位于原点坐标（缩放后的空间的左下角在$ (−width/2,−height/2)$）

因此，这个变换就是：
$$
\begin{bmatrix}
\frac {width} 2 & 0 & 0 & \frac {width} 2 \\\
0 & \frac {height} 2 & 0 & \frac {height} 2 \\\
0 & 0 & 1 & 0 \\\
0 & 0 & 0 & 1
\end{bmatrix}
$$


## 3.三角形 - 基本形状图元

三角形在图形学中应用非常广泛，相比其他图形，它拥有如下性质：

- 复杂图形都能通过三角形组合来表示
- 在空间中的任意三角形的三个顶点都在同一个平面内
- 能很清晰的定义出三角形的内部和外部
- 很容易计算出一个点是位于三角形内部还是外部（通过叉乘）
- 只要定义出三角形的三个顶点的属性，那三角形内部的任意一点都能通过插值的方式计算出对应的属性（通过重心坐标进行插值）

光栅化过程

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9abdad6e5b6a46248b9ea33b4fab4ccc~tplv-k3u1fbpfcp-zoom-1.image)


> 当我们知道了三角形三个顶点的坐标之后，下一步就是决定哪些像素应该被填充了
>
> 三角形内部大部分像素都是被覆盖了的，但边缘位置的像素只是覆盖了一部分，那么应该怎么填充呢
>
> 这就是在光栅化中最重要的概念：**判断一个像素和三角形的位置关系，更确切来说，是判断一个像素中心点与三角形的位置关系。**

## 4.采样

光栅化的过程就是在屏幕空间使用一系列离散的点（像素的中心）判断其是否在三角形内的判断函数的采样。

我们可以通过采样的方式来判断是否应该填充像素。首先要介绍下什么是采样：

简单来说就是：给定一个连续函数 f(x)，然后通过一系列的参数如 1、2、3不断代入 f(x)，求出 f(1),f(2),f(3)，这样我们就得到了三个离散的点。这个过程就是在采样了，转换成代码就是：

```c
for (int x = 0; x < xmax; ++x) {
    output[x] = f(x);
}
```

类似的，我们可以通过像素中心对屏幕空间进行采样，判断该像素中心是否被三角形覆盖，以此来判断该像素应不应该被填充。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/605fd22e6886401db732f15ef1f7562b~tplv-k3u1fbpfcp-zoom-1.image)


如上图所示的三角形，我们给出一个采样函数：
$$
inside(triangle, x, y) =

\begin{equation}
\left\{
\begin{array}{lr}
1, 当像素中心位于三角形内部时 \\
0, 否则
\end{array}
\right.
\end{equation}
$$
如何判断像素中心是否位于三角形内部呢？之前提到过可以利用叉乘的结果来判断，我们来回忆一下

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/465dfa7dc281414885811e4b666a99aa~tplv-k3u1fbpfcp-zoom-1.image)


假设三角形的三个顶点分别是 ，，P0，P1，P2，并且三角形是以逆时针的顺序进行绘制的。那么我们可以求出：
$$
\vec {P_0 P_1} \times \vec {P_0 Q} \\\
\vec {P_1 P_2} \times \vec {P_1 Q} \\\
\vec {P_2 P_0} \times \vec {P_2 Q} \\\
$$
根据右手螺旋定则，当得到的三个向量同时为朝外或者同时朝内时，该点会位于三角形内部。

有了采样函数后，我们再对每个像素进行一次采样：

```c
for (int x = 0; x < width; ++x)
    for (int y = 0; y < height; ++y)
        image[x][y] = inside(triangle, x + 0.5, y + 0.5)
```

然而，如果对每个三角形都进行全屏幕采样的话，性能就非常浪费了。

实际上，我们只需要对三角形所在的轴向包围盒子（Axis Align Bounding Box，简称 AABB）覆盖的范围进行采样即可

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd416aa27a55426299a35b53264bc245~tplv-k3u1fbpfcp-zoom-1.image)


但在极端情况下，例如三角形进行过旋转，或者三角形非常扁，AABB 就会偏大，采样时也会造成浪费。

采样完成后，然后我们就能得到如下的结果：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c642c12c33b540efb7e9c3cb21f2a86a~tplv-k3u1fbpfcp-zoom-1.image)


最后，我们对像素进行填充：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab418e38445c48f4b4ea0b72762a54b0~tplv-k3u1fbpfcp-zoom-1.image)


## 5.锯齿/走样Alising

采样在计算机图形学中无处不在，同时采样又会产生一系列的问题（Artifacts）

采样过程中产生的一系列问题Artifacts也称为“Aliasing（走样）”

- Jaggies（锯齿） – sampling in space  
- Moire（摩尔纹） – undersampling images  
- Wagon wheel effect（车轮的效应） – sampling in time  
- [Many more] …

> 采样产生Artifacts原因：
>
> - 信号变化太快（高频），但采样太慢（采样的速度跟不上信号变化的速度）

**抗锯齿理念：**先对信号做模糊（预过滤）之后采样（近视眼处理）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8917942cac6f44fcbf20af143743a87d~tplv-k3u1fbpfcp-zoom-1.image)
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88eacdc69f784b9bad35e334e0b26e85~tplv-k3u1fbpfcp-zoom-1.image)


> 注意光栅化三角形中的抗锯齿边缘其中像素值取中间值

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ef694fc12f441da949c680b16f79f65~tplv-k3u1fbpfcp-zoom-1.image)


## 6.Frequency Domain(频域)

那为什么先进行模糊再采样就能达到抗锯齿的效果呢？下面将逐步解析

对于一个连续的函数（信号），我们是通过采样来「还原」原来的函数（信号）的。

### 傅里叶级数展开

**傅里叶级数展开**：任何一个周期函数都可以把它写成一系列正弦和余弦函数的线性组合以及一个常数项

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8f98b301f6b45e4b37a56fe7794bb29~tplv-k3u1fbpfcp-zoom-1.image)


### 傅里叶变换

**傅里叶变换**：（*时域—>频域*）将函数表示为正弦加权和和余弦

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/627185a39ba745dfad10a1b18e427c8f~tplv-k3u1fbpfcp-zoom-1.image)


示例：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0c0dd33e2804890b31351e966123795~tplv-k3u1fbpfcp-zoom-1.image)


> - 上面五个f(x)函数频率从低到高，然后使用完全相同的采样方法来对其采样，然后将采样点连起来用于恢复采样点
> - 采样与函数的频率相关性是很大的，通过对上面示例的观察可以发现
>   - 频率越低的函数，采样后的连线与原函数差异越小
>   - 频率越高的函数，采样后的连线与原函数差异越大
> - 人眼采样的频率是有限的，当人眼观察的东西高速运动，人眼的采样率跟不上物体的变化速度，看车轮时出现倒转就是根据这个原理

## 7.**走样**

- 高频信号采样不足：样本错误地看起来来自低频信号（例如下图对高频信号采样采样出来的结果像来自于低频信号）

- 在给定采样率下无法区分的两个频率称为“走样”（例如使用相同的采样率去采样两种完全不同的频率，却得到完全相同的结果）


![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88a4492ba18f4d9e8e78e15d7a60a795~tplv-k3u1fbpfcp-zoom-1.image)


## 8.Filtering滤波

Filtering滤波=去掉一系列的频率

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c65bbcbb6af34bcd840c91b95f1adc5b~tplv-k3u1fbpfcp-zoom-1.image)


> - 这里的时域有时也成为空间域
>
> - 右边频域图中的中心为最低频的区域，周围为高频，从中心到周围逐渐增高
>
> - 图像的频率是表征图像中灰度变化剧烈程度的指标
> - 图片就是每个点都在发光的点的阵列，那么每个点的管就是一束波，不同点的光不一样，频率当然也不一样，滤波就是滤去有些频率的光

### 高通滤波

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8f7bce445a646b2ab2017f7c1bb1ddb~tplv-k3u1fbpfcp-zoom-1.image)


> - 在频域空间中将低频的信号抹掉，只剩下高频的东西，然后使用逆傅里叶变换将其变回去就变成了上面的样（只表示了图像的边界：边缘检测）
> - 因为边界的灰度值变化很大，所以就是高频，所以就能通过！
> - 将低频的信息抹掉之后变称为**高通滤波**（只有高频信号可以通过）

### 低频滤波

模糊省掉了边界，剩余低频信息

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17872f38d12c4557bf24ff7a05f936c9~tplv-k3u1fbpfcp-zoom-1.image)


> - 在频域空间中将高频的信号抹掉，只剩下低频的东西

### 中通滤波

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c25639f89c144d7af957b90155f3ebc~tplv-k3u1fbpfcp-zoom-1.image)


> - 等高线原理
> - 提取到了不是那么明显的边界特征

## 9.卷积

### [1]简介

**卷积**（又称**叠积**（convolution）、**褶积**或**旋积**），是透过两个函数 *f* 和 *g* 生成第三个函数的一种数学算子，表征函数 *f* 与经过翻转和平移的 *g* 的乘积函数所围成的曲边梯形的面积。

> 卷：对*g*函数进行从左到右的数轴翻转
>
> 积：把g函数平移到n，并在这个位置对两个函数进行点乘

概率论中卷积的定义

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88edb1d015ea461a95614ad51dbb78d0~tplv-k3u1fbpfcp-zoom-1.image)


#### 离散卷积
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6673ce892874eabab57e53079b8f956~tplv-k3u1fbpfcp-zoom-1.image)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d654a566c0344f08280b86aca7c6563~tplv-k3u1fbpfcp-zoom-1.image)


z=30~z=40的卷积的过程

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6ac4aeacd9d44dcacd02ba04b05f609~tplv-k3u1fbpfcp-zoom-1.image)


将p1旋转

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87e37743fb18461b96f3af2e0968477a~tplv-k3u1fbpfcp-zoom-1.image)


旋转后的卷积过程

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/214d4616af894f47a4f207a94bf9b9ea~tplv-k3u1fbpfcp-zoom-1.image)


> 上述的过程总结位：卷——>平移——>求和

另一种表现形式

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d4a9901ab1e44fdaf0016a11a476d0f~tplv-k3u1fbpfcp-zoom-1.image)




#### 连续情况的卷积
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79135ac8747c4884b24c6a94a30d089b~tplv-k3u1fbpfcp-zoom-1.image)
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5cb9a3f3ec94afa8b8c351027aa7310~tplv-k3u1fbpfcp-zoom-1.image)




t=9~t=100卷积的过程

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b217679fa26347f1ab617ca8207f5519~tplv-k3u1fbpfcp-zoom-1.image)


> 同样可以对其进行像离散情况进行旋转后卷积

#### 结合滤波器进行理解

- 卷积计算在频域上的平均操作
- Filtering = Convolution卷积  (= Averaging平均)
- 卷积操作是把滤波器（或窗口）沿着信号移动

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a00729b9c02548f0a32fdcd49a840e3e~tplv-k3u1fbpfcp-zoom-1.image)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d8747d14c504cf5b9936f745d7d3b1e~tplv-k3u1fbpfcp-zoom-1.image)


> 其原理就是求平均，在它周围的任何三个数中求平均

### [2]**卷积定理**

空间域/时域的卷积等于频域的乘积，反之亦然

对图片的进行处理的方法：

Option 1:  

- 在空间域中直接通过卷积过滤

Option 2:  

- 变换到频域（傅里叶变换）
- 乘以卷积核的傅里叶变换
- 变换回空间域（逆傅里叶）

应用举例：

均值模糊/滤波(每个像素取其周围3x3，然后使用滤波器/卷积核，整体操作叫卷积)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/786d6bf665534b3ca19d3b61364f4871~tplv-k3u1fbpfcp-zoom-1.image)


> 时域的卷积=频域的乘积

11.Antialising(反走样)

如何抗锯齿？

Option 1: 提高采样率 （例如：提高屏幕分辨率）

- 本质上增加了傅里叶域中副本之间的距离
- 更高分辨率的显示器、传感器、帧缓冲器……  
- 代价高

Option 2: Antialiasing（反走样）

• Making Fourier contents “narrower” before repeating  （先做模糊/低通滤波）

• i.e. Filtering out high frequencies before sampling（后采样）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31ffc18161bd450fba08bf0490c5abcd~tplv-k3u1fbpfcp-zoom-1.image)


对于同一个像素，我们知道它原来有多少地方被覆盖了，这时候如果可以先算出覆盖比例，那么我们就可以根据这个比例对像素进行填充了。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67a6a382b863465296f3aa371fbd1414~tplv-k3u1fbpfcp-zoom-1.image)


如上图所示：我们可以用肉眼看出四个像素分别被覆盖了 12.5%、50%、87.5%、100%，但屏幕在填充像素是不能只填充一部分的，只能填充一整个像素。因此这时候可以对该像素进行一次平均，最后得到像素的颜色。

> 进过低通滤波处理过的像素可以理解为灰度值（覆盖度）

### [1]超采样(MSAA)

事实上，上面的计算像素覆盖面积的做法是很难实现的。但我们可以通过超采样的方式来模拟。

所谓的超采样，是指在一个像素里面放多个采样点来检测三角形是否有被覆盖。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d3377658bf84db69cf17f15e1420ba1~tplv-k3u1fbpfcp-zoom-1.image)


上图表示一个像素里面包含了 16 个采样点，每个采样点采样后再把结果平均起来，最后就能得到三角形对该像素覆盖程度的**近似值**。

如果想要更准确的近似值的话，可以用更多的采样点，但这样计算量就会更大了。

接下来看看实际例子：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/804cd96aa3b74de78ee876222f1a7ef3~tplv-k3u1fbpfcp-zoom-1.image)


上图中一个像素里面只有一个采样点。

超采样的第一步是要为每个像素增加采样点（2x2）：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee1ce6505c53434ba2a115f9fa310abd~tplv-k3u1fbpfcp-zoom-1.image)


接下来是对每个像素中的所有采样点的结果进行平均：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff71f8e259d34135bc7abc72a2ca07c9~tplv-k3u1fbpfcp-zoom-1.image)


最后就能得到平均后的结果：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af3540c5e82e462cbc9b3d1ea0ee7dc5~tplv-k3u1fbpfcp-zoom-1.image)


对于 MSAA，我们需要知道如下几点：

- MSAA 是抗锯齿操作的第一步，也就是模糊操作（求平均）。
- MSAA 增加采样点，并不是为了提高采样率（分辨率没有提高），而是为了得到一个更合理的三角形覆盖率。
- MSAA 的代价是计算量大增，如果一个像素里面有4个采样点，那么计算量就大了 4 倍；如果一个像素里面有 16 个采样点，那么计算量就大了 16 倍。（事实上，工业界会会复用、优化这些采样点，因此计算量并没有增加太多）。

### [2]Sampling=Repeating Frequency Contents

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df223a37895a4d16a997073f16437d63~tplv-k3u1fbpfcp-zoom-1.image)


> 左一列的中间是一个周期冲激序列，它在`t=nT`上纵坐标位无穷大，且频域（右中）仍是一个冲激序列，若用其与原信号相乘进行采样，采样的过程不就是让左边上中两图简单相乘就行了

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40c8d3679df74166b930f4f1b9be5ff7~tplv-k3u1fbpfcp-zoom-1.image)


## 10.可见性/遮挡

当我们要在屏幕上绘制物体的时候，会涉及到物体与物体间的遮挡问题。对于这一问题最常见的做法是像画家绘画那样，先绘制远处的物体，再绘制近处的物体。

但是，这样绘同样会产生一些问题，例如下面三个物体互相遮挡
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/149559a823704872982ace47bb961d1c~tplv-k3u1fbpfcp-zoom-1.image)


> 这类图使用画家算法是无法实现的

### [1]画家算法

受画家如何从后到前绘制 Paint 的启发，在帧缓冲区中覆盖，从远处开始画（光栅化），然后到近处（光栅化）的。
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64eb3047ee26487c88cb2e6939d4f195~tplv-k3u1fbpfcp-zoom-1.image)


### [2]Z-buffer

所以我们在图形学中引入了一个新的概念**深度缓存（Z-Buffer）**，我们通过分析单个像素的深度关系来表示，在**一个像素上永远只保存较近深度的信息**，一般我们会在渲染最后结果的时候会得到两张图，一个是我们想要的图，另一张是记录了这张图中每个像素的最小深度，我们把它称为深度图。

对每个像素进行排序，而不是像画家算法按图形来排序

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff7f08f28b9d4bad9a35604bfafeb9ef~tplv-k3u1fbpfcp-zoom-1.image)


> 深度缓冲用来记录每个像素的最小深度

#### Z-Buffer 实现原理
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33e7fb821eca4ef6981e5da518676dc0~tplv-k3u1fbpfcp-zoom-1.image)


示例
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1cd9a89c20f04bc9ae1ab3caab3e174c~tplv-k3u1fbpfcp-zoom-1.image)



对于 n 个三角形，要得到某个像素的最小深度值，我们只需要遍历所有三角形即可，因此其复杂度为 O(n)。

深度缓冲还有以下的好处：

1. 绘制三角形的顺序不影响最终结果
2. 所有 GPU 都支持深度测试

> 注意：**深度缓冲并不能处理透明物体**