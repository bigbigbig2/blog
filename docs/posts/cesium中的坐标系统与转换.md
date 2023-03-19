---
layout: Post
title: cesium中的坐标系及转换
date: 2022-04-01
headerImage: /img/in-post/bu/10.png
catalog: true
tags:
  - cesium
  - 坐标系统
  - GIS
---

[[toc]]



### 1.cesium坐标介绍

cesium开发中常用的坐标系统

- 屏幕坐标系统(二维)
- 笛卡尔空间直角坐标系统(WGS84）
- 地理坐标系统(经纬度坐标)

Cesium目前支持两种坐标系WGS84地理WKID=4326和WebMercator：WKID=3857，但是在Cesium中没有实际的对象来描述WGS84坐标，都是以弧度的方式来进行运用的也就是Cartographic类：

#### [1]屏幕坐标系统

也就是二维笛卡尔坐标系cesium中使用Cartesian2来描述屏幕坐标系统

构造函数为`new Cesium.Cartesian2(x, y)`,屏幕左上角为原点,x右为正,y下为正

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdf48f29be4741319df57e54d1c561c1~tplv-k3u1fbpfcp-zoom-1.image)


而openlayers中

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9370e9d0f35e45a484d6c0c2f835e135~tplv-k3u1fbpfcp-zoom-1.image)


#### [2]笛卡尔空间直角坐标系统

在GIS引擎中也称这种笛卡尔空间直角坐标系为（World Geodetic System 1984 (WGS84) 坐标系）

- 原点为参考椭球的中心
- 这个坐标系固定在地球上；当地球自转时，系统也会自转，WGS84 中定义的物体相对于地球保持固定
- x 轴指向地理坐标 (0°, 0°)，y 轴指向 (90°, 0°)，z 轴指向北极。赤道位于 xy 平面内。这是一个右手坐标系，因此 x × y = z，其中 x、y 和 z 是沿各自轴的单位向量
- cesium中构造函数为`new Cesium.Cartesian3(x, y, z)`

> 注意这里不要和WGS84地理坐标或者是WGS84椭球体混淆，这只是一个三维的笛卡尔坐标系的定义（只是指定轴向，原点位置等），并不像WGS84那样包含一些椭球参数

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1190b16e16cd43818066401bffc842f4~tplv-k3u1fbpfcp-zoom-1.image)


#### [3]地理坐标

`new Cesium.Cartographic(longitude, latitude, height)`

- 经度：参考椭球面上某点的大地子午面与本初子午面间的两面角。东正西负。
- 纬度：参考椭球面上某点的法线与赤道平面的夹角。北正南负。
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ba4d0b1e5dd46d0869802cb07ec24d1~tplv-k3u1fbpfcp-zoom-1.image)


> 注：Cartographic的经纬度是用弧度表示的，经纬度其实就是角度。弧度即角度对应弧长是半径的倍数。
>
> 所以经纬度是以弧度为单位的，高度是以米为单位。
>
> 弧度= π / 180 × 角度 
> 角度=180 / π × 弧度 

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aee4f009c0a346449529fbfa7225d5e0~tplv-k3u1fbpfcp-zoom-1.image)



### 2.cesium坐标转换

#### [1]角度与弧度的转换

```js
//角度转弧度
var radians = Cesium.CesiumMath.toRadians(degrees)
//弧度转角度
var degrees = Cesium.CesiumMath.toDegrees(radians)
```

#### [2]地理坐标转Cartesian3

Cesium在绘图过程中需要使用笛卡尔空间直角坐标（如WGS84笛卡尔坐标系），因此需要将`经纬度坐标`转换为笛卡尔坐标，才能用于绘图。
cartographic：`弧度制表示的地理坐标系`。使用（经度，纬度，大地高）表示。

##### (1)直接经过经纬度转换

###### 角度制的地理坐标转Cartesian3

直接转换：

```js
Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result)
ellipsoid：该Cartesian3所使用的椭球，默认为Ellipsoid.WGS84
result：存储结果的对象
```

```js
Cesium.Cartesian3.fromDegreesArray(coordinates, ellipsoid, result)
coordinates：经纬度数组列表，用于批量转换[经度，纬度，进度，纬度，。。。。]
```

```js
let cartesian3s = Cesium.Cartesian3.fromDegreesArrayHeights(coordinates);
coordinates：[经度，纬度，高度，进度，纬度，高度]
```

###### **弧度制与笛卡尔转换**

弧度制也类似，使用`Cesium.Cartesian3.fromRadians`, `Cesium.Cartesian3.fromRadiansArray`, `Cesium.Cartesian3.fromRadiansArrayHeights`

##### (2)使用椭球体转换

```js
//先转换为弧度坐标
let position = Cesium.Cartographic.fromDegrees(lon, lat, height);
//获取viewer椭球体实例
let ellipsoid = viewer.scene.globe.ellipsoid;
//开始转换
let cartesian3 = ellipsoid.cartographicToCartesian(position);
// 多个坐标
let cartesian3s = ellipsoid.cartographicArrayToCartesianArray(positions);
```

#### [3]Cartesian3转地理坐标

##### (1)直接转换

```js
//直接转换得到的是WGS84弧度制的经纬度坐标，可将其再转换为角度制。
let cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
```

##### (2)通过椭球体转换

```js
//需要选着或创建地理坐标的椭球体参数
// 单个坐标
let cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian3);
// 多个坐标
let cartographics = Cesium.Ellipsoid.WGS84.cartesianArrayToCartographic(cartesain3Array);
```

#### [4]Cartesian2与Cartesian3互转

屏幕坐标和迪卡尔空间直角坐标系的转换

##### (1)Cartesian2转Cartesian3

屏幕转`椭球面笛卡尔坐标`，不包含地形、模型等的坐标
Cesium中的`Camera`提供了`pickEllipsoid`方法：[传送门](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html?classFilter=camera#pickEllipsoid)

```javascript
let cartesain3 = viewer.scene.camera.pickEllipsoid(cartesian2);
```

屏幕转`场景坐标`，包含地形和模型等的场景空间坐标
使用`Scene`类中的`pickPosition`方法实现：[传送门](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#pickPosition)

```javascript
let cartesian3 = viewer.scene.pickPosition(cartesian2);
```

屏幕坐标转`地表笛卡尔空间坐标`
通过相机与屏幕点位连线来求取坐标。
使用Scene类中globe属性中的pick方法：

```js
let ray = viewer.camera.getPickRay(cartesian2);
let cartesian3 = globe.pick(ray,viewer.scene);
```

##### (2)Cartesian3转Cartesian2

Cesium提供了SceneTransforms的wgs84ToWindowCoordinates方法将笛卡尔坐标转换为屏幕坐标

```js
let cartesian2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(cartesian3);
```