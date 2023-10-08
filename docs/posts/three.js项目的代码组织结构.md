---
layout: Post
title:  three.js项目的代码组织结构
date: 2023-07-27
useHeaderImage: true
headerImage: https://img-blog.csdnimg.cn/326a71b6741f433b8371db7af1aae054.png
tags:
  - three.js
---

[[toc]]

通常对于稍微大些的项目或者demo，都需要对three.js的代码结构进行拆分，有利于复用、代码可读性、扩展性

例如下面的一个简单的scene代码直接将所three.js代码都添加到了一个文件中都会有点难受了：

```typescript
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMap/px.jpg',
    '/textures/environmentMap/nx.jpg',
    '/textures/environmentMap/py.jpg',
    '/textures/environmentMap/ny.jpg',
    '/textures/environmentMap/pz.jpg',
    '/textures/environmentMap/nz.jpg'
])

environmentMap.encoding = THREE.sRGBEncoding

// scene.background = environmentMap
scene.environment = environmentMap

debugObject.envMapIntensity = 0.4
gui.add(debugObject, 'envMapIntensity').min(0).max(4).step(0.001).onChange(updateAllMaterials)

/**
 * Models
 */
let foxMixer = null

gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf',
    (gltf) =>
    {
        // Model
        gltf.scene.scale.set(0.02, 0.02, 0.02)
        scene.add(gltf.scene)

        // Animation
        foxMixer = new THREE.AnimationMixer(gltf.scene)
        const foxAction = foxMixer.clipAction(gltf.animations[0])
        foxAction.play()

        // Update materials
        updateAllMaterials()
    }
)

/**
 * Floor
 */
const floorColorTexture = textureLoader.load('textures/dirt/color.jpg')
floorColorTexture.encoding = THREE.sRGBEncoding
floorColorTexture.repeat.set(1.5, 1.5)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping

const floorNormalTexture = textureLoader.load('textures/dirt/normal.jpg')
floorNormalTexture.repeat.set(1.5, 1.5)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

const floorGeometry = new THREE.CircleGeometry(5, 64)
const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    normalMap: floorNormalTexture
})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 4)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(3.5, 2, - 1.25)
scene.add(directionalLight)

gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')

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
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(6, 4, 8)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.CineonToneMapping
renderer.toneMappingExposure = 1.75
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setClearColor('#211d20')
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

    // Update controls
    controls.update()

    // Fox animation
    if(foxMixer)
    {
        foxMixer.update(deltaTime)
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```

下面对就上面的代码功能进行拆分重新组织结构：
重新组织的代码目录如下：

```
core
├── utils
│   ├── debug.js
│   ├── eventEmitter.js
│   ├── size.js
│   ├── resources.js
│   └── time.js
├── world
│   ├── Modal
│   ├── Form
│   └── Table
├── core.js
├── camera.js
├── sources.js
└── renderer.js

```

## [1]常用工具类封装

### EventEmitter

该类用来管理和调度事件，类似Node.js内置的events模块，这个EventEmitter类提供了一个灵活的方式来管理和触发自定义的事件。其中on，off，和trigger方法是事件的添加，移除，和触发，而resolveNames和resolveName则是内部辅助方法，用于处理和解析事件名。

```typescript
export default class EventEmitter{
    constructor(){
        this.callbacks = {}
        this.callbacks.base = {}
    }

    on(_names, callback){
        // Errors
        if(typeof _names === 'undefined' || _names === ''){
            console.warn('wrong names')
            return false
        }

        if(typeof callback === 'undefined'){
            console.warn('wrong callback')
            return false
        }

        // Resolve names
        const names = this.resolveNames(_names)

        // Each name
        names.forEach((_name) =>{
            // Resolve name
            const name = this.resolveName(_name)

            // Create namespace if not exist
            if(!(this.callbacks[ name.namespace ] instanceof Object))
                this.callbacks[ name.namespace ] = {}

            // Create callback if not exist
            if(!(this.callbacks[ name.namespace ][ name.value ] instanceof Array))
                this.callbacks[ name.namespace ][ name.value ] = []

            // Add callback
            this.callbacks[ name.namespace ][ name.value ].push(callback)
        })

        return this
    }

    off(_names){
        // Errors
        if(typeof _names === 'undefined' || _names === ''){
            console.warn('wrong name')
            return false
        }

        // Resolve names
        const names = this.resolveNames(_names)

        // Each name
        names.forEach((_name) =>{
            // Resolve name
            const name = this.resolveName(_name)

            // Remove namespace
            if(name.namespace !== 'base' && name.value === ''){
                delete this.callbacks[ name.namespace ]
            }

            // Remove specific callback in namespace
            else{
                // Default
                if(name.namespace === 'base'){
                    // Try to remove from each namespace
                    for(const namespace in this.callbacks){
                        if(this.callbacks[ namespace ] instanceof Object && this.callbacks[ namespace ][ name.value ] instanceof Array){
                            delete this.callbacks[ namespace ][ name.value ]

                            // Remove namespace if empty
                            if(Object.keys(this.callbacks[ namespace ]).length === 0)
                                delete this.callbacks[ namespace ]
                        }
                    }
                }

                // Specified namespace
                else if(this.callbacks[ name.namespace ] instanceof Object && this.callbacks[ name.namespace ][ name.value ] instanceof Array){
                    delete this.callbacks[ name.namespace ][ name.value ]

                    // Remove namespace if empty
                    if(Object.keys(this.callbacks[ name.namespace ]).length === 0)
                        delete this.callbacks[ name.namespace ]
                }
            }
        })

        return this
    }

    trigger(_name, _args){
        // Errors
        if(typeof _name === 'undefined' || _name === ''){
            console.warn('wrong name')
            return false
        }

        let finalResult = null
        let result = null

        // Default args
        const args = !(_args instanceof Array) ? [] : _args

        // Resolve names (should on have one event)
        let name = this.resolveNames(_name)

        // Resolve name
        name = this.resolveName(name[ 0 ])

        // Default namespace
        if(name.namespace === 'base'){
            // Try to find callback in each namespace
            for(const namespace in this.callbacks){
                if(this.callbacks[ namespace ] instanceof Object && this.callbacks[ namespace ][ name.value ] instanceof Array){
                    this.callbacks[ namespace ][ name.value ].forEach(function(callback){
                        result = callback.apply(this, args)

                        if(typeof finalResult === 'undefined'){
                            finalResult = result
                        }
                    })
                }
            }
        }

        // Specified namespace
        else if(this.callbacks[ name.namespace ] instanceof Object){
            if(name.value === ''){
                console.warn('wrong name')
                return this
            }

            this.callbacks[ name.namespace ][ name.value ].forEach(function(callback){
                result = callback.apply(this, args)

                if(typeof finalResult === 'undefined')
                    finalResult = result
            })
        }

        return finalResult
    }

    resolveNames(_names){
        let names = _names
        names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
        names = names.replace(/[,/]+/g, ' ')
        names = names.split(' ')

        return names
    }

    resolveName(name){
        const newName = {}
        const parts = name.split('.')

        newName.original  = name
        newName.value     = parts[ 0 ]
        newName.namespace = 'base' // Base namespace

        // Specified namespace
        if(parts.length > 1 && parts[ 1 ] !== '')
        {
            newName.namespace = parts[ 1 ]
        }

        return newName
    }
}
```

- `constructor()`: 构造器，用于初始化事件回调集，其中`this.callbacks`对象将存储所有事件的回调函数
- `on(_names, callback)`: 此方法用于添加事件监听器，接受事件名`(_names)`和回调函数(callback)两个参数。此方法首先会检查参数的有效性，然后解析事件名，最后将回调函数存储到this.callbacks对象中。如果事件名包含命名空间，那么它会按照命名空间存储。此方法返回类的实例，以支持链式调用。
- `off(_names)`: 此方法用于移除事件监听器，接受一个参数，事件名`(_names)`。它会解析事件名并尝试从`this.callbacks`对象中移除对应的回调函数。此方法也返回类的实例，以支持链式调用
- `trigger(_name, _args):` 此方法用于触发某个事件，接受事件名(_name)和参数列表(_args)两个参数。此方法首先会解析事件名，然后查找并调用对应的回调函数，传入给定的参数。如果存在多个同名事件，此方法将返回最后一个事件回调函数的返回值。
- `resolveNames(_names):` 此方法用于解析事件名，接受一个参数，事件名(_names)。它会清理事件名中的非字母和数字字符，然后根据空格、逗号和斜杠分割事件名，返回一个包含所有事件名的数组。
- `resolveName(name)`: 此方法用于解析单个事件名，接受一个参数，事件名(name)。它将事件名分割为事件值和命名空间两部分，并返回一个对象，包含原始事件名，事件值和命名空间。

### resize

该类继承事件类`EventEmitter`

```typescript
import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter{
    constructor(){
        super()

        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () =>{
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })
    }
}
```

在`Core`类中使用：

```typescript
import Sizes from './Utils/Sizes.js'

export default class Core{
  constructor(canvas){
  // ...
  
  this.sizes = new Sizes()
  
  // Resize event
  this.sizes.on('resize', () =>{
    	console.log('A resize occurred')
      this.resize()
  })
  }

  resize(){
    //后续
    // this.camera.resize()
    // this.renderer.resize()
  }
}
```

> 如果直接在`Sizes`类中使用`window.addEventListener('resize', () =>{})`，并在Experience类中直接实例化调用的话，虽然也可以实现功能，但是如果有其他类或者函数也需要使用到窗口尺寸变化的事件，就需要重复编写获取和更新窗口尺寸的逻辑，这会增加代码的冗余性。
>
> 此外，`EventEmitter`还提供了许多有用的方法，例如可以同时添加多个监听器，可以移除监听器，可以一次触发多个事件等，这些在直接使用`window.addEventListener('resize', () =>{})`是不具备的



### Time

另一个非常有用的类是处理时间的类。这个类的工作方式有点像Three.js的[Clock](https://threejs.org/docs/#api/en/core/Clock)类。
该类保存了：

- 当前时间
- the elapsed time  经过的时间
- 当前帧与上一帧之间的增量时间

```typescript
import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter{
    constructor(){
        super()

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16 //自上一帧以来花费的时间，16这接近两帧之间以 60fps 的速度有多少毫秒

        window.requestAnimationFrame(() =>{
            this.tick()
        })
    }

    tick(){
        //毫秒为单位
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() =>{
            this.tick()
        })
    }
}
```

该类还将在每个帧上触发一个事件，以便我们可以侦听该事件并更新整个Core类

```typescript
import sizes from './Utils/Sizes.js'
import time from './Utils/Sizes.js'

export default class Core{
  constructor(canvas){
  	// ...
  
  	// Setup
    this.time = new Time()
  	// Time tick event
  	this.time.on('tick', () =>{
        this.update()
    })
  }

  update()
    {
        //后续
        // this.camera.update()
        // this.world.update()
        // this.renderer.update()
    }
}
```

## [2]核心类封装

### scene

scene就不建一个类来封装了，直接在Core类中初始化，因为后续需要传递给其他类使用

```typescript
import * as THREE from 'three'

// ...

export default class Core{
	constructor(canvas){
		// ...
  	this.scene = new THREE.Scene()

		// ...
	}

// ...
}
```

### camera

对于相机，可以创建一个单独的类来拆分存放相关的代码，这里的相机类主要包含了透视投影相机，相机控制器，相机参数的resize、控制器的update

```typescript
export default class Camera{
  constructor(){
  }
}
```

然后再主类中导入实例化：

```typescript
import * as THREE from 'three'

// ...
export default class Experience{
	constructor(canvas){
		// ...

  	this.sizes = new Sizes()
  	this.time = new Time()
  	this.scene = new THREE.Scene()
    this.camera = new Camera()

		// ...
	}

// ...
}
```

因为在相机类中我们需要实例化 `PerspectiveCamera `和 `OrbitControls` 类。但是这些额外的类需要像 `width` 和 这样的 `height`，这也就意味着需要访问主类`Core`的变量（属性）
这里有三种方式可以实现传递`width`和`height`：

- 从全局变量中访问
- 通过参数传递
- 使用单例

下面进行分别举例使用：

```typescript
/*从全局变量中访问，将Experience上下文添加到window全局对象中*/
export default class Core{
	constructor(canvas){
		// ...

  	window.experience = this

		// ...
	}

// ...
}
//这样就可以直接在相机类中使用了
export default class Camera{
  constructor(){
    this.experience = window.experience
    
    console.log(this.experience)
  }
}

```

> 一般不推荐使用window全局变量的方式

```typescript
/*通过构造参数传递*/
export default class Core{
  constructor(canvas){
    // ...
    
    this.camera = new Camera(this)
    
    // ...
    }
  
  // ...
}

export default class Camera{
  constructor(experience){
    this.experience = experience
    
    console.log(this.experience)
  }
}

```

> 此解决方案是一个很好的解决方案’

```typescript
/*通过构造单例模式（无论你构造多少个主类，只有第一个是真实的实例。所有其他实例化也将返回第一个实例。*/
// ...

let instance = null

export default class Core{
  constructor(canvas){
    // Singleton
    if(instance){
    	return instance
    }
    instance = this
  
  // ...
  }

// ...
}

//使用
import Experience from './Experience.js'

export default class Camera{
  constructor(){
    this.experience = new Experience()
    
    console.log(this.experience)
  }
}
```

> 这种方式也挺不错的


然后接着完成camera类：

```typescript
import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera{
    constructor(){
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()//创建透视投影相机并将其存为一个instance实例
        this.setControls()//相机轨道控制器
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)
    }

    setControls(){
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize(){
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update(){
        this.controls.update()
    }
}
```

这个`resize(`)方法和`update()`方法在主类中进行调用

```typescript
export default class Experience{
 	 //...
		resize()
    {
        this.camera.resize()
      	// 后续
        // this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        // 后续
        // this.world.update()
        // this.renderer.update()
    }
}
```

### renderer

将渲染相关的代码拆分为一个Renderer类，主要包含了renderer实例的创建、resize、update：

```typescript
import * as THREE from 'three'
import Core from './Core.js'

export default class Renderer{
    constructor(){
        this.core = new Core()
        this.canvas = this.core.canvas
        this.sizes = this.core.sizes
        this.scene = this.core.scene
        this.camera = this.core.camera

        this.setInstance()//创建render实例对象
    }

    setInstance(){
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    resize(){
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update(){
        this.instance.render(this.scene, this.camera.instance)
    }
}
```

在主类中实例化与调用：

```typescript
// ...

import Renderer from './Renderer.js'

// ...

export default class Core{
  	constructor(canvas){
  		// ...
  
  		this.renderer = new Renderer()
  
 	 		// ...
  	}

  	resize(){
        this.renderer.resize()
    }

    update(){
        this.renderer.update()
    }
}
```

## [3]World

到此为止我们的场景中仍然没有任何东西，这里推荐构建一个world文件夹并在其中创建一个 World 类：

```typescript
import Core from '../core.js'

export default class World{
    constructor(){
        this.core = new Core()
        this.scene = this.core.scene//获取scene
    }
}
```

使用

```typescript
import World from './World/World.js'

// ...

export default class Experience{
  constructor(canvas){
  	// ...
  
  	this.world = new World()
  
  	// ...
  }
}
```

该world用来放置要添加到scene中的所以三维物体、环境、光照等

### Environment

在world文件夹下创建environment.js，主要用来存放实现场景中的灯光、环境贴图

```typescript
import Experience from '../Experience.js'

export default class Environment{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.scene

    // Setup
    this.setSunLight() //灯光
		this.setEnvironmentMap()//环境贴图
  }

  //添加光照，这里模拟太阳光
  setSunLight(){
    this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3, 3, - 2.25)
    this.scene.add(this.sunLight)
  }
  setEnvironmentMap(){
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
  
        this.scene.environment = this.environmentMap.texture

        /*如果不添加将不起作用上面的换贴图，因为环境贴图是在添加物体之后添加的，所以需要遍历场景中物体的材料需要更新*/
        this.environmentMap.updateMaterials = () =>{
            this.scene.traverse((child) =>{
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.environmentMap.updateMaterials()
  }
}
```

然后再World类中实例化：

```typescript
// ...
import Environment from './Environment.js'

export default class World{
    constructor(){
    	// ...
    
     	// Setup
    	this.environment = new Environment()
    }
}
```

### Resources

Resources用于将我们所需要的加载器放到一块，方便管理
我们只需要再实例化时传递一个source描述对象即可完成所以资源的加载于，一旦加载完成所有的source，还可以触发一个事件

```typescript
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from './EventEmitter.js'

//因为后续需要触发事件，所以继承于EventEmitter来实现
export default class Resources extends EventEmitter{
    constructor(sources){
        super()

        this.sources = sources

        this.items = {}//要加载的sources
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }
  	/*根据项目需要的loader创建*/
    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    /**
     * 遍历 sources 数组并使用相应的加载器加载它们
     */
    startLoading(){
        // Load each source
        for(const source of this.sources){
            if(source.type === 'gltfModel'){
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>{
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture'){
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>{
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture'){
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>{
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    /**
     * 保存属性中的加载资源,更新 items loaded 属性并测试加载是否完成
     * 如果加载了所有源，我们将触发一个 ready 事件
     * @param {*} source 
     * @param {*} file 
     */
    sourceLoaded(source, file){
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad){
            this.trigger('ready') 
        }
    }
}
```

实例化调用

```typescript
 // ...

import Resources from './Utils/Resources.js'
import sources from './sources.js'


// ...

export default class Core{
    constructor(canvas){
     // ...

      this.scene = new THREE.Scene()
      this.resources = new Resources(sources)

    // ...
    }

// ...
}
```

资源描述对象：

```typescript
//sources.js
export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.jpg'
    },
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'models/Fox/glTF/Fox.gltf'
    }
]
```

> - name ：将用于检索加载的资源
> - type ：使用什么加载器类型
> - path ：要加载的文件的路径

再World中执行加载完成回调：

```typescript
//...
export default class World{
    constructor(){
        // ...
        this.resources = this.core.resources

        //监听加载完成事件
        this.resources.on('ready', () =>{
            // Setup
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.fox)
            this.fox.update()
    }
}
```

floor
可以参照这种方式来往scene中添加三维物体的（先再source.js中添加资源描述字段），清晰明了，没什么可说的

```typescript
import * as THREE from 'three'
import Core from '../core.js'

export default class Floor{
    constructor(){
        this.core = new Core()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry(){
        this.geometry = new THREE.CircleGeometry(5, 64)
    }

    setTextures(){
        this.textures = {}

        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}
```

### fox

这里添加一个带动画的模型，同样首先添加相应的资源描述对象
然后在World文件夹下创建Fox类：

```typescript
import * as THREE from 'three'
import Core from '../Core.js'

export default class Fox{
    constructor(){
        this.core = new Core()
        this.scene = this.core.scene
        this.resources = this.core.resources
        this.time = this.core.time
        this.debug = this.core.debug

      //后续
        // Debug
        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('fox')
        }

        // Resource
        this.resource = this.resources.items.foxModel

        this.setModel()
        this.setAnimation()//模型动画
    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.model.traverse((child) =>{
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setAnimation(){
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) =>{
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        // Debug
        if(this.debug.active){
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') }
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
    }

    update(){
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}
```

然后在World 类中实例化调用

```typescript
import Fox from './Fox.js'

export default class World{
  constructor(){
  // ...
  
    this.resources.on('ready', () =>{
    // Setup
      this.floor = new Floor()
      this.fox = new Fox()
      this.environment = new Environment()
  })
  }
	//后续（模型动画）
  update(){
    if(this.fox)
        this.fox.update()
  }
}
```

## [4]Debug

可以将dat.gui调试相关的代码封装成一个类使用，在Debug类中暂时只创建dat.GUI类

```typescript
import * as dat from 'lil-gui'

export default class Debug{
    constructor(){
      this.ui = new dat.GUI()
    }
}
```

然后在Core类中任何其他类之前实例化它：

```typescript
// ...

import Debug from './Utils/Debug.js'

// ...

export default class Experience{
    constructor(canvas){
      // ...
      
      // Setup
      this.debug = new Debug()
      this.sizes = new Sizes()
      this.time = new Time()
      
      // ...
    }

// ...
}
```

然后只需要在相应的需要需要添加调试的三维物体或者环境中添加相应的调试目录即可，例如：
调试fox模型

```typescript
export default class Fox{
    constructor(){
      // ...
      
      this.debug = this.experience.debug
      
      // Debug
      const debugObject = {
          playIdle: () => { this.animation.play('idle') },
          playWalking: () => { this.animation.play('walking') },
          playRunning: () => { this.animation.play('running') }
      }
      
      this.debugFolder = this.debug.ui.addFolder('fox') 
      this.debugFolder.add(debugObject, 'playIdle')
      this.debugFolder.add(debugObject, 'playWalking')
      this.debugFolder.add(debugObject, 'playRunning')
      
      // ...
    }

// ...
}
```

调试环境相关：

```typescript
// ...

export default class Environment{
    constructor(){
        // ...
        
        this.debug = this.experience.debug
        
        // Debug
        this.debugFolder = this.debug.ui.addFolder('environment')

    
    		// ...
    }

// ...
}
```

## [5]销毁场景中所有的物体

在scene中通常使用`traverse()` 函数来遍历场景中的物体

```typescript
export default class Experience{
  

	destroy(){
        this.sizes.off('resize')
        this.time.off('tick')

        // 遍历场景中所有的东西
        this.scene.traverse((child) =>{
            // 判断是否为mesh
            if(child instanceof THREE.Mesh){
                child.geometry.dispose() //释放
                //遍历每个mesh相应的material
                for(const key in child.material){
                    const value = child.material[key]

                    if(value && typeof value.dispose === 'function'){
                        value.dispose()
                    }
                }
            }
        })
      	
        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        //释放控件
        this.debug.ui.destroy()
    }
}
```

> 本文部分内容为Three.js Journey课程的学习笔记