---
layout: Post
title:  three.js基于滚动的动画
date: 2023-07-24
useHeaderImage: true
headerImage: https://img-blog.csdnimg.cn/2c5563e81e0542f9999a9a6ce9676c57.png
tags:
  - three.js
---

[[toc]]

> 本文部分内容为Three.js Journey课程的学习笔记

todo：

- 学习如何将 Three.js 作为 HTML 页面的背景
- 让相机跟随滚动而移动
- 发现一些技巧让3D效果更具沉浸感
- 基于光标位置添加视差效果，当到达特点区域时触发动画效果

## [1]css设置

要将Three.js 作为HTML 页面的背景，首先需要对页面css布局进行一定的设置

```html
<body>
  <canvas class="webgl"></canvas>
  <section class="section">
    <h1>My Portfolio</h1>
  </section>
  <section class="section">
    <h2>My projects</h2>
  </section>
  <section class="section">
    <h2>Contact me</h2>
  </section>
</body>
```

```csharp
*
{
margin: 0;
padding: 0;
}

html,
body
{
/* overflow: hidden; */
background-color: #363636;;
}

.webgl
{
position: fixed;
top: 0;
left: 0;
outline: none;
}


.section
{
display: flex;
align-items: center;
height: 100vh;
position: relative;
font-family: 'Cabin', sans-serif;
color: #ffeded;
text-transform: uppercase;
font-size: 7vmin;

padding-left: 10%;
padding-right: 10%;
}

section:nth-child(odd)
{
    justify-content: flex-end;
}
```

## [2]固定弹性卷轴

在某些浏览器环境中（这里chorome是不会的），您可能会注意到，如果滚动距离太远，当页面超出限制时，您会看到一种弹性动画。
虽然这是一个很酷的功能，但默认情况下，页面背面是白色的，与我们的体验不符。
为了解决这个问题，我们可以将页面的颜色设置background-color为与 的颜色clearColor相同renderer。相反，我们将使其透明并仅在页面上clearColor设置。background-color

```javascript
const renderer = new THREE.WebGLRenderer({
canvas: canvas,
alpha: true
})
```

## [3]在Three画布中添加多个对象

为了实现鼠标滚动动画效果，通常需要添加多个三维对象

```csharp
/**
* Objects
*/
// Texture---这里添加了一些渐变纹理
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter
// Material
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

// Meshes
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)
```

这里需要根据自己的喜好添加不同的对象和材质，同时也别忘了添加一些光照效果：

```csharp
/**
* Lights
*/
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)
```

然后就是修改这些三维对象的位置了，为了达到滚动滚动条展示不同的三维物体，需要将他们的y坐标值取一定的距离：

```csharp
const objectsDistance = 2  //物体之间的距离
mesh1.position.y = - objectsDistance * 0
mesh2.position.y = - objectsDistance * 1
mesh3.position.y = - objectsDistance * 2
```

然后就是相机设定相机随滚动条滚动而滚动了

```csharp
/**
* Scroll
*/
let scrollY = window.scrollY //检索滚动值
//监听滚动条的滚动值
window.addEventListener('scroll', () =>
{
scrollY = window.scrollY

console.log(scrollY)
})
```

然后在tick函数中，用于scrollY使相机移动（在进行渲染之前）：

```csharp
const tick = () =>
{
// ...

// Animate camera
camera.position.y = - scrollY / sizes.height * objectsDistance

// ...
}
```

后面也可以根据需要对对象的水平位置进行修改：

```csharp
mesh1.position.x = 2
mesh2.position.x = - 2
mesh3.position.x = 2
```

## [4]视差Parallax

为了让我们的体验更加身临其境，我们将通过使相机根据鼠标移动水平和垂直移动来应用这种视差效果。它将创建自然的交互，并帮助用户感受到深度。

### 光标

首先，我们需要检索光标位置。
为此，请创建一个具有和属性的`cursor`对象：`xy`

```csharp
/**
* Cursor
*/
const cursor = {}
cursor.x = 0
cursor.y = 0
```

然后，监听`mousemove`事件`window`并更新这些值：

```csharp
window.addEventListener('mousemove', (event) =>
{
cursor.x = event.clientX / sizes.width - 0.5
cursor.y = event.clientY / sizes.height - 0.5

console.log(cursor)
})
```

然后就可以在函数tick中使用了

```csharp
const tick = () =>
{
// ...

// Animate camera
camera.position.y = - scrollY / sizes.height * objectsDistance

const parallaxX = cursor.x
const parallaxY = - cursor.y
camera.position.x = parallaxX
camera.position.y = parallaxY

// ...
}
```

但是这时就又有一个问题了，就是这里设定了后，相机的滚动就不起作用了，因为问我们更新了camera.position.y两次，第二次将取代第一次
为了解决这个问题，我们将把相机放在一个组[three.js docs](https://threejs.org/docs/index.html?q=group#api/en/objects/Group)中，并对组而不是相机本身应用视差。

```csharp
/**
* Camera
*/
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)
```

在该tick函数中，不是在相机上应用视差，而是将其应用在cameraGroup：

## [5]额外效果

上面的基本是已经有一定的效果了，而如果追求更炫酷的效果，则需要之际补充添加，原理可参考上面的，比如粒子、触发旋转、网格动画、对材质等其他属性进行动画处理、对 HTML 文本进行动画处理

```javascript
import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
  materialColor: '#ffeded',
  materialColor:"#ffeded"
}

/**
 * gui
 */
gui
  .addColor(parameters, 'materialColor')
  .onChange(() =>
    {
      material.color.set(parameters.materialColor)
      particlesMaterial.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test cube
 */
/**
* Objects
*/

// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter
// Material
const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture
})

// Meshes
const mesh1 = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.4, 16, 60),
  material
)
const mesh2 = new THREE.Mesh(
  new THREE.ConeGeometry(1, 2, 32),
  material
)
const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  material
)

const objectsDistance = 4
mesh1.position.y = - objectsDistance * 0
mesh2.position.y = - objectsDistance * 1
mesh3.position.y = - objectsDistance * 2
const sectionMeshes = [ mesh1, mesh2, mesh3 ]

mesh1.position.x = 2
mesh2.position.x = - 2
mesh3.position.x = 2
scene.add(mesh1, mesh2, mesh3)


/**
* Particles
*/
// Geometry
const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)
//构建随机position
for(let i = 0; i < particlesCount; i++)
{
  positions[i * 3 + 0] = (Math.random() - 0.5) * 10
  positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
  color: parameters.materialColor,
  sizeAttenuation: true,
  size: 0.03
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


/**
* Scroll
*/
let scrollY = window.scrollY
let currentSection = 0 //用于记录触发旋转
window.addEventListener('scroll', () =>
  {
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)

    if(newSection != currentSection)
    {
      currentSection = newSection
      gsap.to(
        sectionMeshes[currentSection].rotation,
        {
          duration: 1.5,
          ease: 'power2.inOut',
          x: '+=6',
          y: '+=3',
          z: '+=1.5'
        }
      )
      console.log('changed', currentSection)
    }

  })


/**
* Cursor
*/
const cursor = {}
cursor.x = 0
cursor.y = 0
window.addEventListener('mousemove', (event) =>
  {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5

      })

      /**
      * Lights
      */
      const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
      directionalLight.position.set(1, 1, 0)
      scene.add(directionalLight)

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

      // Group
      const cameraGroup = new THREE.Group()
      scene.add(cameraGroup)
      // Base camera
      const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
      camera.position.z = 6
      cameraGroup.add(camera)

      /**
      * Renderer
      */
      const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true
      })
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      /**
      * Animate
      */
      const clock = new THREE.Clock()
      let previousTime = 0

      const tick = () =>
    {
      const elapsedTime = clock.getElapsedTime()
      const deltaTime = elapsedTime - previousTime
      previousTime = elapsedTime
      // Animate meshes
      for(const mesh of sectionMeshes)
      {
      mesh.rotation.x += deltaTime * 0.1
      mesh.rotation.y += deltaTime * 0.12
      }
      // Animate camera
      camera.position.y = - scrollY / sizes.height * objectsDistance

      const parallaxX = cursor.x * 0.8
      const parallaxY = - cursor.y * 0.8

      cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
      cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
      }

      tick()
```

