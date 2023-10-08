---
layout: Post
title:  three.js提升渲染效果
date: 2023-07-28
useHeaderImage: true
headerImage: https://img-blog.csdnimg.cn/img_convert/6b6335029ad35b7d61fed33b63492ae4.png#averageHue=#70604f&clientId=u526bf3fc-28c7-4&from=paste&height=590&id=u43da95dd&originHeight=738&originWidth=1760&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=1906433&status=done&style=none&taskId=u0fbd90e4-40ea-4416-88c9-bc396bbb7db&title=&width=1408
tags:
  - three.js
---

通常我们都希望渲染出更逼真的效果，有许多技术来改善模型在 Three.js 中渲染后的外观。但请注意，其中一些技术可能会影响性能，而某些技术则取决于您的模型。你必须根据情况进行调整。

> 本文部分内容为Three.js Journey课程的学习笔记

这里将采用使用了纹理、法线贴图等的逼真的模型。我们将使用 GLTF 示例模型存储库（[GLTF Sample Models repository](https://github.com/KhronosGroup/glTF-Sample-Models)）中的飞行头盔（[Flight Helmet](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/FlightHelmet)）
初始代码框架：

```javascript
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test sphere
 */
const testSphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial() //标准网格材质
)
scene.add(testSphere)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
  {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 1, - 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const tick = () =>
  {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

tick()
```

## [1]light

这里将只使用一个方向光，尽管只采用要给方向光光源是无法实现逼真的渲染效果的，不过这里可以采用环境贴图来代替实现一些复杂的光照效果，但为了阴影的实现，还是最好创建一个方向光。

```javascript
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(0.25, 3, - 2.25)
scene.add(directionalLight)
```

![image.png](https://img-blog.csdnimg.cn/img_convert/c1d936c5d1deb567cc2c85f05fdfb97f.png#averageHue=#060606&clientId=u526bf3fc-28c7-4&from=paste&height=391&id=uac61539b&originHeight=649&originWidth=1109&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=14720&status=done&style=none&taskId=uee13743b-a410-4696-8357-362535bdcb1&title=&width=668.2000122070312)
顺便添加一些gui选项：

```javascript
/**
 * Base
 */
// Debug
const gui = new dat.GUI()
gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')
```

默认的THREE.js 光强度intensity值并不真实，它们基于任意比例单位，不反映实际值
要将 Three.js 光源更改为更真实的值，请将 WebGLRenderer 实例的属性 physicallyCorrectLights改为 true ：

```javascript
renderer.physicallyCorrectLights = true
```

好多了：
![image.png](https://img-blog.csdnimg.cn/img_convert/ec7e6e073e003f367c8cfd81c816af82.png#averageHue=#030303&clientId=u526bf3fc-28c7-4&from=paste&height=473&id=udd67a6fe&originHeight=775&originWidth=1130&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=19472&status=done&style=none&taskId=u6e857d67-088b-432b-8fb3-87348aaad3e&title=&width=689)

## [2]model

这里加载一个three示例中模型进行实验

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// ...

/**
* Loaders
*/
const gltfLoader = new GLTFLoader()
/**
* Models
*/
gltfLoader.load(
  '/models/FlightHelmet/glTF/FlightHelmet.gltf',
  (gltf) =>{
  console.log(gltf)
  gltf.scene.scale.set(10, 10, 10)
  gltf.scene.position.set(0, - 4, 0)
  gltf.scene.rotation.y = Math.PI * 0.5
  scene.add(gltf.scene) //由于这是一个复杂的模型，因此我们只需将 gltf.scene 组添加到我们自己的场景中
	}
)
```

![image.png](https://img-blog.csdnimg.cn/img_convert/8de8a1f081fd5719e80abe59de33f7cb.png#averageHue=#060403&clientId=u526bf3fc-28c7-4&from=paste&height=529&id=u4e9a4916&originHeight=795&originWidth=1135&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=175378&status=done&style=none&taskId=u6fba59cf-0778-44f0-8062-66deab675d6&title=&width=755)

## [3]Environment map

加载一个环境贴图（天空盒），因为这些纹理由 6 张图像（一个立方体）组成，所以我们必须使用[CubeTextureLoader](https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader)
注意加载顺序为：
`positive x`, `negative x`, `positive y,` `negative y`, `positive z`,  `negative z`

```javascript
const cubeTextureLoader = new THREE.CubeTextureLoader()
/**
* Environment map
*/
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

//应用
scene.background = environmentMap
```

加载后并就开始将环境映射应用于模型：
环境贴图描述了物体周围的环境光照情况，可以用来增强物体的真实感和立体感
可以通过envMap 属性将环境映射应用于网格标准材料，但是我们的模型是许多的网格组成的，需要分别为每个网格的材质设定envMap属性。我们可使用每个 Object3D 上可用的 traverse(...) 方法来添加

```javascript
/**
* Update all materials
*/
const updateAllMaterials = () =>{
    scene.traverse((child) =>{
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
            console.log(child)
            child.material.envMap = environmentMap
            child.material.envMapIntensity = 2.5  //增加强度
        }
    })
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/2530d580c69fbe72ab24de7f815dd967.png#averageHue=#fdfaf8&clientId=u526bf3fc-28c7-4&from=paste&height=268&id=uaa915a01&originHeight=409&originWidth=1048&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=69119&status=done&style=none&taskId=ud28a3b17-66be-4238-a435-891601d7864&title=&width=686.4000244140625)
在模型加载回调中调用：

```javascript
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>{
    gltf.scene.scale.set(10, 10, 10)
    gltf.scene.position.set(0, - 4, 0)
    gltf.scene.rotation.y = Math.PI * 0.5
    scene.add(gltf.scene)
    updateAllMaterials()
    gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')
    }
)
```

还可以将这个envMapIntensity添加到dat.gui上：

```javascript
const debugObject = {}
const updateAllMaterials = () =>
{
// ...
child.material.envMapIntensity = debugObject.envMapIntensity
// ...
}

// ...

debugObject.envMapIntensity = 2.5
gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials)
```

![image.png](https://img-blog.csdnimg.cn/img_convert/9e21061eb676d7181176a2620664dbd9.png#averageHue=#564532&clientId=u526bf3fc-28c7-4&from=paste&height=518&id=u9401e4e8&originHeight=1089&originWidth=1476&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=1812362&status=done&style=none&taskId=u965c3a78-dda3-420e-8aa8-1c083dd05a3&title=&width=701.7999877929688)

## [4]将环境映射应用为默认值

可以通过直接给scene的environment赋值环境环境贴图，这一就不需要通过traverse遍历每一个对象的material去添加envMap属性，

```glsl
scene.environment = environmentMap
```

设置场景中所有物理材质的环境贴图。但是，无法覆盖分配给 `MeshStandardMaterial.envMap` 的现有纹理。默认为 `null` 
但是这样设置并不能修改像上面一样修改环境贴图强度

## [5]render

### Output encoding

在不涉及太多细节的情况下，该 `outputEncoding` 属性控制输出呈现编码。默认情况下其属性为`THREE.LinearEncoding`，设定为该值并不够逼真
建议 `outputEncoding` 的值为 `THREE.sRGBEncoding` ：

```javascript
renderer.outputEncoding = THREE.sRGBEncoding
```

![image.png](https://img-blog.csdnimg.cn/img_convert/b47cabf2b3102a93f49ee186447826b3.png#averageHue=#837363&clientId=u526bf3fc-28c7-4&from=paste&height=594&id=u2a1d2b45&originHeight=1272&originWidth=1490&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=2604625&status=done&style=none&taskId=ud8591f13-5b44-47a3-b64c-91d559dff55&title=&width=696)
还有一种输出编码为THREE.GammaEncoding，这种编码的优点是让你玩一个叫做 gammaFactor 的值，这个值的作用有点像亮度
Gamma编码是一种存储颜色的方法，同时根据人眼灵敏度优化明亮值和暗值的存储方式。当我们使用 sRGBEncoding 时，就像使用 默认 GammaEncoding 伽马因子 2.2 ，这是通用值。

### Textures encoding

其实环境纹理贴图还有地方继续优化，使其效果更令人满意
当我们设定输出编码为`THREE.sRGBEncoding`时，换纹理贴图的编码还是默认值`THREE.LinearEncoding`
规则很简单。我们可以直接看到的所有纹理——比如map——应该使用 `THREE.sRGBEncoding` 作为编码，而所有其他纹理——比如 normalMap——应该使用 THREE.LinearEncoding。
我们可以直接看到 `environmentMap` 纹理，所以我们必须改变它的编码为 `THREE.sRGBEncoding`

```javascript
environmentMap.encoding = THREE.sRGBEncoding
```

> 模型的纹理中GLTFLoader， 已经实现了这个规则，从中加载的所有纹理都会自动拥有正确的编码。

添加前后的对比：
![image.png](https://img-blog.csdnimg.cn/img_convert/6b6335029ad35b7d61fed33b63492ae4.png#averageHue=#70604f&clientId=u526bf3fc-28c7-4&from=paste&height=590&id=u43da95dd&originHeight=738&originWidth=1760&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=1906433&status=done&style=none&taskId=u0fbd90e4-40ea-4416-88c9-bc396bbb7db&title=&width=1408)

###  色调映射

色调映射的目的是将高动态范围（HDR）值转换为低动态范围（LDR）值。 HDR 的含义远超下面的解释，但你可以把它看成是色彩值可以超过1的图像。如果我们想存储光线信息，这是很有用的，因为光线没有强度限制。
虽然我们的资源不是HDR，但色调映射效果可能会像摄像机调节得不太好一样，产生逼真的结果。
其实就有点类似于滤镜效果
要改变色调映射，更新 `WebGLRenderer` 上的 `toneMapping` 属性：

- `THREE.NoToneMapping `
- `THREE.LinearToneMapping`
- `THREE.ReinhardToneMapping`
- `THREE.CineonToneMapping`
- `THREE.ACESFilmicToneMapping`

可以挨个测试这些色调映射的效果来选择满意的一个

```javascript
renderer.toneMapping = THREE.ACESFilmicToneMapping
```

也可以通过dat.gui来添加与option

```javascript
gui.add(renderer, 'toneMapping', {
  No: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping
}).onFinishChange(() =>
{
renderer.toneMapping = Number(renderer.toneMapping)
})
```

在更改色调映射时如果你仔细观察，你会发现背景中环境贴图的色调映射发生了变化，但模型本身却没有改变。如果要使模型的材质也发生变化需要上面发生改变的回调中添加上`updateAllMaterials()`材质更新函数
还可以改变色调的曝光度：

```javascript
renderer.toneMappingExposure = 3
```

添加到dat.gui中：

```javascript
gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)
```

## [6]抗锯齿

锯齿是一个众所周知的问题。当像素的渲染发生时，它会测试正在该像素上渲染的是哪个几何体。它计算颜色，最后，这个颜色就出现在屏幕上。
但几何边缘通常不会完美地与你的屏幕的垂直线和水平线对齐，这就是你会得到这种叫做赫萨效应的阶梯状人为产物的原因。
有许多解决这个问题的方法，开发者已经为此苦苦挣扎了许多年。
![antialias-2.jpg](https://img-blog.csdnimg.cn/img_convert/48b3b57061f62573b31ff26963252a0b.jpeg#averageHue=#746258&clientId=u526bf3fc-28c7-4&from=paste&height=245&id=u6f01f4c1&originHeight=1032&originWidth=3592&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=86663&status=done&style=none&taskId=u354e1d36-8c7e-4190-ab53-595b9e404fa&title=&width=854.4000244140625)
一个简单的解决方案是提高我们的渲染分辨率，比如说加倍。当调整到正常大小时，每个像素颜色将自动从渲染的4个像素平均得出。
这种解决方案称为超采样（SSAA）或全屏采样（FSAA），它是最简单也是最有效的解决方案。不幸的是，这意味着需要渲染4倍更多的像素，这可能会导致性能问题。
另一个解决方案叫做多重采样（MSAA）。再次，该想法是每个像素渲染多个值（通常为4），就像超采样那样，但只在几何体的边缘。然后平均像素的值以得到最终的像素值。
最新的GPU可以执行这种多重采样抗赫萨效应，Three.js 会自动处理设置。我们只需要在实例化过程中——而不是之后——将抗赫萨属性改为 true：

```javascript
const renderer = new THREE.WebGLRenderer({
canvas: canvas,
antialias: true
})
```

使用抗赫萨会消耗一些资源。如我们前面所说，像素比率高于1的屏幕实际上不需要抗赫萨。一个正确的做法是只为像素比率低于2的屏幕启用它。

## [7]Shadows 

为了得到逼真的渲染，最后一步是添加阴影。首先，打开 WebGLRenderer 的阴影。然后将阴影类型改为 THREE.PCFSoftShadowMap：

```javascript
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
```

还有方向光的阴影投射属性：

```javascript
directionalLight.castShadow = true
```

由于我们想要逼真而精确的阴影，并且因为我们只有一个光源，我们可以增加阴影贴图的大小， 1024x1024 而不必担心帧速率下降。

```javascript
directionalLight.shadow.mapSize.set(1024, 1024)
```

最后，我们可以激活模型所有网格体上的阴影。由于我们已经遍历 `updateAllMaterials` 了函数中的场景，让我们简单地激活 `castShadow、receiveShadow` 所有子项

```javascript
const updateAllMaterials = () =>
{
scene.traverse((child) =>
{
if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
{
// ...

child.castShadow = true
child.receiveShadow = true
}
})
}
```