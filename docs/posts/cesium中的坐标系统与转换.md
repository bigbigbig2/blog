---
layout: Post
title: cesium中的坐标系及转换
date: 2022-04-01
headerImage: /img/in-post/bu/10.png
catalog: true
tags:
  - cesium
  - 坐标系统
---

## 1.cesium坐标系统

cesium开发中常用的坐标系统

- 屏幕坐标系统(二维)，对应Cartesian2来
- 笛卡尔空间直角坐标系统(三维)
- 地理坐标系统(经纬度坐标)

### [1]屏幕二维坐标系

是二位笛卡尔坐标系,cesium中使用Cartesian2来描述屏幕坐标系统

构造函数为`new Cesium.Cartesian2(x, y)`,屏幕左上角为原点,x右为正,y下为正

![adfasdf](https://img-blog.csdnimg.cn/img_convert/2e165161ca54a022c1ed836ac33483e0.png)

而openlayers中

![未p](https://img-blog.csdnimg.cn/img_convert/8351face7805b9742afa9cd6e6a55f1d.png)

### [2]笛卡尔空间直角坐标系

原点为参考椭球的中心下

构造函数为`new Cesium.Cartesian3(x, y, z)`

![image-20220319212624672](https://img-blog.csdnimg.cn/img_convert/f85f2cc325b505e649743fd61cde856f.png)

### [3]WGS-84地理坐标系

`new Cesium.Cartographic(longitude, latitude, height)`

> 注：这里的经纬度是用弧度表示的，经纬度其实就是角度。弧度即角度对应弧长是半径的倍数。
>
> 所以经纬度是以弧度为单位的，高度是以米为单位。
>
> 弧度= π / 180 × 角度 
> 角度=180 / π × 弧度 

![image-20220319213157255](https://img-blog.csdnimg.cn/img_convert/a0f0d6a605ac8d299305d52cc04c82b8.png)

### [4]WebGL坐标系

![image-20220424110419983](https://img-blog.csdnimg.cn/img_convert/5056419522856129b54c9beaf9c93723.png)
Cesium使用WebGL进行图形渲染，因此WebGL坐标系也必须了解。在进行自定义渲染时需要用到WebGL坐标系，WebGL坐标系也是右手坐标系，X轴水平，正方向为右；Y轴垂直，正方向为上；Z轴垂直与屏幕，正方向为外。

## 2.cesium坐标转换

### [1]角度与弧度的转换

```js
//角度转弧度
var radians = Cesium.CesiumMath.toRadians(degrees)
//弧度转角度
var degrees = Cesium.CesiumMath.toDegrees(radians)
```

### [2]WGS84转Cartesian3

Cesium在绘图过程中需要使用笛卡尔空间直角坐标，因此需要将`WGS84经纬度坐标`转换为笛卡尔坐标，才能用于绘图。
`cartographic`：弧度制表示的wgs84坐标系。wgs84使用（经度，纬度，大地高）表示。

#### (1)通过弧度或经纬度直接转换

##### 角度制的WGS84转Cartesian3

```js
Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result)
ellipsoid：该经纬度所使用的椭球体
result：存储结果的对象
```

```js
Cesium.Cartesian3.fromDegreesArray(coordinates, ellipsoid, result)
coordinates：经纬度数组列表，用于批量转换[经度，纬度，进度，纬度，。。。。]
```

```js
let cartesian3s = Cesium.Cartesian3.fromDegreesArrayHeights(coordinates);
coordinates：[经度，纬度，高度，进度，纬度，高度。。。。]
```

##### 弧度制WGS84转Cartesian3

弧度制转换类似与角度

- `Cesium.Cartesian3.fromRadians`,
-  `Cesium.Cartesian3.fromRadiansArray`, 
- `Cesium.Cartesian3.fromRadiansArrayHeights`

#### (2)使用椭球体转换

根据椭球体参数将WGS-84转换

同样也分为通过角度式的WGS84经纬度和弧度式的经纬度转为笛卡尔空间直角坐标系

##### 角度制的WGS84转Cartesian3

```js
//度为单位的WGS84
let position = Cesium.Cartographic.fromDegrees(lon, lat, height);
// 单个坐标
let cartesian3 = Cesium.Ellipsoid.WGS84.cartographicToCartesian(position);
// 多个坐标
let cartesian3s = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(positions);
```

##### 弧度制WGS84转Cartesian3

同上

### [3]Cartesian3转WGS84

下面两种方式转换得到的是都是默认的弧度式的经纬度坐标WGS84

#### (1)直接转换

```js
let cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
```

#### (2)通过椭球体转换

```js
// 单个坐标
let cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian3);
// 多个坐标
let cartographics = Cesium.Ellipsoid.WGS84.cartesianArrayToCartographic(cartesain3Array);
```

### [4]Cartesian2与Cartesian3互转

屏幕坐标和迪卡尔空间直角坐标系的转换

#### (1)Cartesian2转Cartesian3

`Cartesian2`转`椭球面笛卡尔坐标`，不包含地形、模型等的坐标，Cesium中的`Camera`提供了`pickEllipsoid`方法

```javascript
let cartesain3 = viewer.scene.camera.pickEllipsoid(cartesian2);
```

`Cartesian2`转`场景坐标`，包含地形和模型等的场景空间坐标，使用`Scene`类中的`pickPosition`方法实现

```javascript
let cartesian3 = viewer.scene.pickPosition(cartesian2);
```

`Cartesian2`坐标转`Cartesian3`，通过相机与屏幕点位连线来求取坐标。使用Scene类中globe属性中的pick方法：

```js
let ray = viewer.camera.getPickRay(cartesian2);
let cartesian3 = globe.pick(ray,viewer.scene);
```

#### (2)Cartesian3转Cartesian2

Cesium提供了SceneTransforms的wgs84ToWindowCoordinates方法将笛卡尔坐标转换为屏幕坐标

```js
let cartesian2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(cartesian3);
```

#### 参考：

- https://github.com/AJJackGIS/Cesium/blob/master/doc/Cesium%E4%B8%AD%E7%9A%84%E5%87%A0%E7%A7%8D%E5%9D%90%E6%A0%87%E5%92%8C%E7%9B%B8%E4%BA%92%E8%BD%AC%E6%8D%A2.md
- https://blog.csdn.net/weixin_45782925/article/details/123365834
- 《面向三维GIS的开发与应用》