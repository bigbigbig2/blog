---
layout: Post
title:  three.js性能优化微指南
date: 2023-08-03
useHeaderImage: true
headerImage: /img/in-post/bu/6.png
tags:
  - three.js
---

[[toc]]


## [1]性能监测

### 检测FPS

使用stats，这里就不过多说明了

### 禁用 FPS 限制

### 监视绘制调用

绘制调用是 GPU 绘制三角形的操作。当我们有一个包含许多对象、几何体、材质等的复杂场景时，会有很多绘制调用。
通常我们可以通过见减少绘制调用来提升性能
这里可以使用这个浏览器扩展来监视绘制调用[https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk](https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk)
具体的使用方式见其说明文档即可

## 渲染信息

可以通过`console.log(renderer.info)`打印一些关于渲染器的一些信息

## [2]销毁

一旦你确定了某个几何体或者材料等资源不再需要使用，那么就请先将其销毁掉
关于如何销毁，three.js官方有相关的文档：
[https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects)
例如销毁一个正方体：

```javascript
scene.remove(cube)
cube.geometry.dispose()
cube.material.dispose()
```

## [3]灯光

尽可能的减少复杂灯光效果的使用，因为消耗性能比较大
同时避免频繁的添加或者删除灯光，因为场景中添加或移除光源时，必须重新编译支持光源的所有材质。这就是Three.js的工作方式，如果你有一个复杂的场景，这可能会冻结屏幕片刻。

## [4]阴影

阴影效果也是性能消化较大的部分，如果整体需要比较极致的优化性能这部分可以考虑使用纹理贴图代替阴影。
可以通过优化阴影贴图来达到类似阴影效果，下面是模拟思路：
首先可以使用[CameraHelper](https://threejs.org/docs/#api/en/helpers/CameraHelper)查看将由阴影贴图摄像机渲染的区域，并将其缩小到尽可能小的区域：

```javascript
directionalLight.shadow.camera.top = 3
directionalLight.shadow.camera.right = 6
directionalLight.shadow.camera.left = - 6
directionalLight.shadow.camera.bottom = - 3
directionalLight.shadow.camera.far = 10

const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(cameraHelper)
```

还要尝试使用尽可能小的分辨率，并给出下降 mapSize 结果：

```javascript
directionalLight.shadow.mapSize.set(1024, 1024)
```

## [5]合理的使用castShadow和Shadow

有些对象可以投射阴影，有些对象可以接收阴影，有些对象可能会同时投射阴影。如果想要考虑性能，可以减少开启castShadow 、receiveShadow 对象

```javascript
cube.castShadow = true
cube.receiveShadow = false

torusKnot.castShadow = true
torusKnot.receiveShadow = false

sphere.castShadow = true
sphere.receiveShadow = false

floor.castShadow = false
floor.receiveShadow = true
```

## [6]关闭阴影自动更新

阴影贴图会在每次渲染之前更新。可以通过关闭此自动更新并开启 Three.js影子贴图仅在必要时需要更新：

```javascript
renderer.shadowMap.autoUpdate = false
renderer.shadowMap.needsUpdate = true
```

## [7]Textures 

### 调整纹理大小

纹理会占用GPU内存中的大量空间，特别是mipmap的话
可以尝试着将分辨率调低的同时保持较好的效果

### 保存2次方的分辨率

进行resizing时，保持2次方的分辨率。这对mipmaps很重要。
如果不这样做，并且渲染需要mipmap，Three.js会尝试通过将图像大小调整到最接近的2次方分辨率来修复它，但这个过程会占用资源，并可能导致质量不好的纹理。

### 使用正确的格式

使用什么格式并不会影响GPU的内存的使用情况，但使用合适的格式可以适当的降低加载时间。
可以根据图像和压缩使用.jpg或.png，也可以使用alpha通道。可以使用一些压缩工具对图片进行压缩后再使用。

## [8]Geometries 

### 使用缓冲区几何图形

对于three.js125之前的版本并不支持BufferGeometries，这对于性能并不好，所以应该尽量使用高于125的版本
如果使用的是最新版本的 Three.js，则无需担心，所有几何图形都是缓冲区几何图形。

### 不更新顶点

更新几何体的顶点对于性能的影响是巨大的，再创建几何图形时执行一次影响到不大，但应该避免再tick函数中执行该操作
如果要对顶点进行动画处理，推荐使用顶点着色器中实现，不要直接再tick函数中更新（这个再使用粒子系统时遇到过，性能差别很大）

### 共用几何图形

这个很容易理解，也很常见，如果有多个网格使用相同的几何形状，就只创建一个来使用就行。

```javascript
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

for(let i = 0; i < 50; i++){
  const material = new THREE.MeshNormalMaterial()
  
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = (Math.random() - 0.5) * 10
  mesh.position.y = (Math.random() - 0.5) * 10
  mesh.position.z = (Math.random() - 0.5) * 10
  mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2
  mesh.rotation.z = (Math.random() - 0.5) * Math.PI * 2
  
  scene.add(mesh)
}
```

### 合并几何图形

当不需要移动几何图形的位置时，还可以使用BufferGeometryUtils来将多个几何图形合并为一个也就减少了绘制调用来提升性能。
使用示例：

```javascript
const geometries = []
for(let i = 0; i < 50; i++){
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  
  geometry.rotateX((Math.random() - 0.5) * Math.PI * 2)
  geometry.rotateY((Math.random() - 0.5) * Math.PI * 2)
  
  geometry.translate(
  (Math.random() - 0.5) * 10,
  (Math.random() - 0.5) * 10,
  (Math.random() - 0.5) * 10
  )
  
  geometries.push(geometry)
}

const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries)
console.log(mergedGeometry)

const material = new THREE.MeshNormalMaterial()

const mesh = new THREE.Mesh(mergedGeometry, material)
scene.add(mesh)
```

## [9]Materials

### 共用材质

很好理解，也就是多个几何使用同一个材料，构建多个不同mesh

### 使用简单的材质

- 占用渲染资源 `MeshBasicMaterial` < `MeshLambertMaterial` < `MeshPhongMaterial` < `MeshStandardMaterial` < `MeshPhysicalMaterial`
- 渲染表现能力 `MeshBasicMaterial` < `MeshLambertMaterial` < `MeshPhongMaterial` < `MeshStandardMaterial `< `MeshPhysicalMaterial`

## [10]mesh

### 使用实例化网格

通过构建一个实例化网格，然后使用矩阵来进行变化得出其他网格
示例：

```javascript
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const material = new THREE.MeshNormalMaterial()

const mesh = new THREE.InstancedMesh(geometry, material, 50)
scene.add(mesh)

for(let i = 0; i < 50; i++){
  const position = new THREE.Vector3(
  (Math.random() - 0.5) * 10,
  (Math.random() - 0.5) * 10,
  (Math.random() - 0.5) * 10
	)

  const quaternion = new THREE.Quaternion()
  quaternion.setFromEuler(new THREE.Euler((Math.random() - 0.5) * Math.PI * 2, (Math.random() - 0.5) * Math.PI * 2, 0))
  
  const matrix = new THREE.Matrix4()
  matrix.makeRotationFromQuaternion(quaternion)
  matrix.setPosition(position)
  
  mesh.setMatrixAt(i, matrix)
}
```

## [11]模型

对于模型首先是尽量使用低多边形

### Draco压缩

如果模型有很多细节和非常复杂的几何形状，请使用 Draco 压缩。它可以大大减轻重量。缺点是解压缩几何体时可能会冻结，还必须加载 Draco 库。

### Gzip

`Gzip`是在服务器端的压缩。大多数服务器不压缩文件，如 .glb 、 .gltf 、 .obj 等

## [12]相机

### 视野

当空间对象不在视野中时，它们不会被渲染。这称为视锥剔除。
这似乎不是一个很好的解决方案，但你还是可以通过缩小相机的视野，这样屏幕上的对象越少，要渲染的三角形就越少。

### Near and far

就像视野一样，可以减少相机的 `near` 和 `far` 属性。比如你有一个广阔的世界，有山脉、树木、结构等，用户可能看不到那些远在山后面看不见的小房子。这时就可以降低 `far` 到一个体面的价值，这些房屋就不会被渲染了。

## [13]render

### 像素比

推荐将渲染器的像素比控制位2

```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```

### 电源选项

可以通过指定一个 powerPreference 属性来提示实例化 WebGLRenderer 时需要什么功率，如果对于不考虑电源消耗，可以考虑开启high-performance（默认为default）

```javascript
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  powerPreference: 'high-performance'
})
```

### 抗锯齿

默认的抗锯齿也是消耗性能的选项，可以再需要时再开启它

## [14]后处理

### 限制通道数

因为每个后处理过程将使用与渲染分辨率（包括像素比率）一样多的像素进行渲染。如果分辨率为1920x1080，后处理通道数为4，像素比为2，则需要渲染1920*2*1080*2*4=33 177 600像素。
对于这方面下性能优化可以做的是通过自定义通道来将原有的多个通道合并为一个

## [15]shader

### 指定精度

对于ShaderMaterial：

```javascript
const shaderMaterial = new THREE.ShaderMaterial({
  precision: 'lowp',
  // ...
})
```

对于RawShaderMaterial则需要像原始的webgl着色器一样通过precision设定

### 使用优雅的代码

尽量保持着色器代码尽可能简单。避免 if 语句。充分利用旋转和内置功能。
例如下面的语句不要使用if语句替换

```glsl
modelPosition.y += clamp(elevation, 0.5, 1.0) * uDisplacementStrength;
```

### 使用纹理

虽然可以使用shader实现各种复杂逼真的效果，比如柏林噪声，但这对于性能的影响是很大的。可以使用纹理来代替以提升性能

### 使用defines

使用unifroms可以实时再JavaScript调整值并传递，但也是对性能有所影响的。如果值不需要修改则推荐直接再着色器中通过defines定义，下面有两种方式定义：

```glsl
#define uDisplacementStrength 1.5
```

```glsl
const shaderMaterial = new THREE.ShaderMaterial({

// ...

defines:
{
uDisplacementStrength: 1.5
},

// ...
}
```

### 在顶点着色器重进行运算

如果可推荐在顶点着色器中进行运算，然后将结果发送到片段着色器。