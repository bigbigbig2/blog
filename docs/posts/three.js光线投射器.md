---
layout: Post
title:  three.js光线投射
date: 2023-07-23
useHeaderImage: true
headerImage: https://img-blog.csdnimg.cn/img_convert/2a188ced950620b2a41c202c6f07e2c1.png#averageHue=#ded6ce&clientId=u0ece2a17-5dff-4&from=paste&height=641&id=ufef0b508&originHeight=801&originWidth=1651&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=610300&status=done&style=none&taskId=u026c7805-5a4a-4d53-abc2-2ec29ae6680&title=&width=1320.8
tags:
  - three.js
---

[[toc]]


顾名思义，光线投射器(也算叫光线追踪吧）可以向特定方向投射（或发射）光线并测试哪些物体与其相交
光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。
你可以使用该技术来检测玩家前面是否有一堵墙，测试激光枪是否击中了某物，测试当前是否有某物位于鼠标下方以模拟鼠标事件，以及许多其他事情。

> 此文章为threejs-journey课程学习笔记

## [1]创建光线投射器

创建光线投射 Raycaster
我们沿着 x 轴，创建 3 个球体，从最左边发射一个射线，沿着 x 轴指向右侧

```javascript
/**
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: '#B71C1C' })
)
object1.position.setX(-4)
const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: '#B71C1C' })
)
const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: '#B71C1C' })
)
object3.position.setX(4)

scene.add(object1, object2, object3)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
const rayOrigin = new THREE.Vector3(-6, 0, 0)
const rayDirections = new THREE.Vector3(10, 0, 0)
rayDirections.normalize()
raycaster.set(rayOrigin, rayDirections)
```

[Raycaster 类](https://threejs.org/docs/index.html?q=Raycaster#api/zh/core/Raycaster)：
`Raycaster( origin : Vector3, direction : Vector3, near : Float, far : Float )`

- `origin` —— 光线投射的原点向量。
- `direction` —— 向射线提供方向的方向向量，应当被标准化。
- `near` —— 返回的所有结果比near远。near不能为负值，其默认值为0。
- `far` —— 返回的所有结果都比far近。far不能小于near，其默认值为Infinity（正无穷。）

set 方法：
`.set ( origin : Vector3, direction : Vector3 ) : undefined`

- `origin` —— 光线投射的原点向量。
- `direction` —— 为光线提供方向的标准化方向向量。

为了便于观察这个射线，我们使用 arrowHelper 可视化这个射线：

```javascript
// scene.add(axesHelper)
const arrowHelper = new THREE.ArrowHelper(
    raycaster.ray.direction,
    raycaster.ray.origin,
    15,
    0xff0000,
    1,
    0.5,
  )
scene.add(arrowHelper)
```

![image.png](https://img-blog.csdnimg.cn/img_convert/e602144e65d2059e158c7935f58a53cc.png#averageHue=#020000&clientId=u0ece2a17-5dff-4&from=paste&height=780&id=ueb8b5317&originHeight=975&originWidth=1522&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=12544&status=done&style=none&taskId=ud9eff688-751b-47a2-ad73-3e50abf3e3a&title=&width=1217.6)

## [2]相交检测方法

分为两个：
intersectObject(...)单数）和intersectObjects(...)（复数）
intersectObject(...)将测试一个对象并将intersectObjects(...)测试一组对象：

```javascript
const intersect = raycaster.intersectObject(object2)
console.log(intersect)

const intersects = raycaster.intersectObjects([object1, object2, object3])
console.log(intersects)
```

![image.png](https://img-blog.csdnimg.cn/img_convert/2cab0e189e6d67fbab9c33fdac97273b.png#averageHue=#fefdfd&clientId=u0ece2a17-5dff-4&from=paste&height=445&id=ufff1505c&originHeight=556&originWidth=1002&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=60568&status=done&style=none&taskId=u74d699d6-f36e-452b-abec-8710254f127&title=&width=801.6)
返回数组的每一项都包含许多有用的信息：

- distance：射线原点与碰撞点之间的距离。
- face：射线击中几何体的哪个面。
- faceIndex：该面的索引。
- object：碰撞涉及哪个对象。
- point：碰撞在 3D 空间中的精确位置的[Vector3 。](https://threejs.org/docs/index.html#api/en/math/Vector3)
- uv：该几何体中的 UV 坐标。

如果你想测试玩家前面是否有一堵墙，你可以测试distance. 如果要更改对象的颜色，可以更新其object材质。如果您想在撞击点上显示爆炸，您可以在该point位置创建爆炸。

> 注意：即使您只测试一个对象，交集的结果始终是一个数组。这是因为光线可以多次穿过同一个物体。想象一个甜甜圈。光线将穿过环的第一部分，然后穿过中间的孔，然后再次穿过环的第二部分。

![image.png](https://img-blog.csdnimg.cn/img_convert/2a188ced950620b2a41c202c6f07e2c1.png#averageHue=#ded6ce&clientId=u0ece2a17-5dff-4&from=paste&height=641&id=ufef0b508&originHeight=801&originWidth=1651&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=610300&status=done&style=none&taskId=u026c7805-5a4a-4d53-abc2-2ec29ae6680&title=&width=1320.8)

## [3]对每一帧进行测试

通常需要对每一帧都进行相交测试

```javascript
const raycaster = new THREE.Raycaster()
//这里为了测试，将物体动起来
const clock = new THREE.Clock()

const tick = () =>
{
const elapsedTime = clock.getElapsedTime()

// Animate objects
object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

const rayOrigin = new THREE.Vector3(- 3, 0, 0)
const rayDirection = new THREE.Vector3(1, 0, 0)
rayDirection.normalize()

raycaster.set(rayOrigin, rayDirection)

const objectsToTest = [object1, object2, object3]
const intersects = raycaster.intersectObjects(objectsToTest)
console.log(intersects)
//相交测试，相交时改变颜色
for(const object of objectsToTest)
{
object.material.color.set('#ff0000')
}

for(const intersect of intersects)
{
intersect.object.material.color.set('#0000ff')
}

// ...
}
```

## [4]通过鼠标使用光线投射器

我们也可以使用 raycaster 来检测一个物体是否在鼠标后面。其核心原理就是我们需要发射一个从相机位置到鼠标方向的射线。

### 鼠标悬停

首先，我们需要鼠标的坐标。我们不能使用基本的原生 JavaScript 坐标，它以像素为单位。我们需要一个在水平轴和垂直轴上都从 到 的值-1，当鼠标向上移动时，垂直坐标为正。+1
这也就是裁剪空间的坐标值，例如：

- 鼠标位于页面左上角：`-1 / 1`
- 鼠标位于页面左下角：`-1 / - 1`
- 鼠标垂直位于中间，水平位于右侧：`1 / 0`
- 鼠标位于页面中央：`0 / 0`

可以直接通过mousemove事件来获取相应的坐标值：

```javascript
/**
* Mouse
*/
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
mouse.x = event.clientX / window.innerWidth * 2 - 1
mouse.y = - (event.clientY / window.innerHeight) * 2 + 1

console.log(mouse)
})
```

![image.png](https://img-blog.csdnimg.cn/img_convert/4391e0dfaf476c4a9b20ebaa4910facc.png#averageHue=#fdfcfb&clientId=u0ece2a17-5dff-4&from=paste&height=262&id=u2169a75f&originHeight=327&originWidth=976&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=60226&status=done&style=none&taskId=ub283b392-5e52-4180-a4bf-28a22654585&title=&width=780.8)

我们可以在事件回调中投射光线mousemove，但不建议这样做，因为mousemove事件的触发可能超过某些浏览器的帧速率。而在tick函数中则相反，我们将像之前一样在函数中投射光线。
`.setFromCamera ( coords : Vector2, camera : Camera ) : undefined`一个坐标从相机方向发射射线

- coords —— 在标准化设备坐标中鼠标的二维坐标 —— X分量与Y分量应当在-1到1之间。
- camera —— 射线所来源的摄像机。

```javascript
const tick = () =>
{
// ...

raycaster.setFromCamera(mouse, camera)

const objectsToTest = [object1, object2, object3]
const intersects = raycaster.intersectObjects(objectsToTest)

for(const intersect of intersects)
{
intersect.object.material.color.set('#0000ff')
}

for(const object of objectsToTest)
{
if(!intersects.find(intersect => intersect.object === object))
{
object.material.color.set('#ff0000')
}
}

// ...
}
```

这样就实现了如果光标位于球体上方，则球体应变为蓝色。

### 鼠标进入和鼠标离开事件

鼠标事件比如 mouseenter 和 mouseleave, 目前默认还不能支持，canvas 或 WebGL 也没有直接支持，需要自己手动模拟实现这两个事件
为了模拟mouseenter和mouseleave事件，我们可以使用一个包含当前悬停对象的变量：

- 如果有一个对象相交，但之前没有相交，则表示mouseenter该对象上发生了 
- 如果没有任何对象相交，但之前有过一个，则表示mouseleave发生了

```javascript
let currentIntersect = null
```

```javascript
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Animate objects
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // Cast a ray
    const rayOrigin = new THREE.Vector3(-3, 0, 0)
    const rayDirection = new THREE.Vector3(1, 0, 0)
    rayDirection.normalize()

    raycaster.set(rayOrigin, rayDirection)

    raycaster.setFromCamera(mouse, camera)
    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)

    if(intersects.length)
    {
        if(!currentIntersect)
        {
        console.log('mouse enter')
        }

        currentIntersect = intersects[0]
    }
    else
    {
        if(currentIntersect)
        {
        console.log('mouse leave')
        }

        currentIntersect = null
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/ab0490797c41eafbc3feb5c1e55b02bc.png##averageHue=#6d504d&clientId=u0ece2a17-5dff-4&from=paste&height=646&id=HxOOA&originHeight=808&originWidth=2251&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=71790&status=done&style=none&taskId=u4a757119-82fe-4ede-b340-430f2052a34&title=&width=1800.8)

### 鼠标点击

在有了一个包含当前悬停对象的变量后，我们可以轻松地实现一个click事件。
首先，我们需要监听事件，click无论它发生在哪里：

```javascript
window.addEventListener('click', () =>
{

})
```

然后，我们可以测试变量中是否有内容currentIntersect：

```javascript
window.addEventListener('click', () =>
{
if(currentIntersect)
{
console.log('click')
}
})
```

总代码：

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
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
let currentIntersect = null
const rayOrigin = new THREE.Vector3(- 3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()

// raycaster.set(rayOrigin, rayDirection)

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
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

window.addEventListener('click', () =>
{
    if(currentIntersect)
    {
        switch(currentIntersect.object)
        {
            case object1:
                console.log('click on object 1')
                break

            case object2:
                console.log('click on object 2')
                break

            case object3:
                console.log('click on object 3')
                break
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
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
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate objects
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // Cast a fixed ray
    // const rayOrigin = new THREE.Vector3(- 3, 0, 0)
    // const rayDirection = new THREE.Vector3(1, 0, 0)
    // rayDirection.normalize()
    
    // raycaster.set(rayOrigin, rayDirection)
    
    // const objectsToTest = [object1, object2, object3]
    // const intersects = raycaster.intersectObjects(objectsToTest)

    // for(const object of objectsToTest)
    // {
    //     object.material.color.set('#ff0000')
    // }

    // for(const intersect of intersects)
    // {
    //     intersect.object.material.color.set('#0000ff')
    // }

    // Cast a ray from the mouse
    // raycaster.setFromCamera(mouse, camera)
    
    // const objectsToTest = [object1, object2, object3]
    // const intersects = raycaster.intersectObjects(objectsToTest)
    
    // for(const intersect of intersects)
    // {
    //     intersect.object.material.color.set('#0000ff')
    // }

    // for(const object of objectsToTest)
    // {
    //     if(!intersects.find(intersect => intersect.object === object))
    //     {
    //         object.material.color.set('#ff0000')
    //     }
    // }

    // Cast a ray from the mouse and handle events
    raycaster.setFromCamera(mouse, camera)

    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)
    
    if(intersects.length)
    {
        if(!currentIntersect)
        {
            console.log('mouse enter')
        }

        currentIntersect = intersects[0]
    }
    else
    {
        if(currentIntersect)
        {
            console.log('mouse leave')
        }
        
        currentIntersect = null
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```