---
layout: Post
title:  three.js中加载模型及模型动画
date: 2023-07-25
useHeaderImage: true
headerImage: https://img-blog.csdnimg.cn/img_convert/b93ca0d4ebd1b295ac6419787a6b8a7f.gif#averageHue=#403733&clientId=uf40df3e0-4ca1-4&from=paste&height=487&id=uf0504c9d&originHeight=609&originWidth=1099&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=258739&status=done&style=none&taskId=u3ce6b4f0-2408-4207-9eb2-900d3632446&title=&width=879.2
tags:
  - three.js
---

[[toc]]

本文部分内容为Three.js Journey课程的学习笔记

三维模型的格式很多种多样的：[https://en.wikipedia.org/wiki/List_of_file_formats#3D_graphics](https://en.wikipedia.org/wiki/List_of_file_formats#3D_graphics)。
有些格式专用于一种软件。有些已知非常轻，但有时缺乏具体数据。众所周知，有些几乎包含您可能需要的所有数据，但它们很重。有些格式是开源的，有些格式不是，有些是二进制的，有些是 ASCII 的，等等。
如果需要精确的数据并且无法找到软件支持的适当格式，您甚至可以轻松创建自己的格式。
下面是比较常见的三维数据格式：

- OBJ
- FBX
- STL
- PLY
- COLLADA
- 3DS
- GLTF

## [1]GLTF

GLTF支持非常多不同的数据集。可以同时拥有几何形状和材质等数据，但可以拥有相机、灯光、场景图、动画、骨架、变形甚至多个场景等数据。
它还支持各种文件格式，如 json、二进制、嵌入纹理。
GLTF 已成为实时性的标准。由于它正在成为一种标准，因此大多数 3D 软件、游戏引擎和库都支持它。这意味着可以在不同的环境中轻松获得相似的结果。
这并不意味着您在所有情况下都必须使用 GLTF。如果您只需要几何图形，则最好使用其他格式，例如 OBJ、FBX、STL 或 PLY。最好是在每个项目上测试不同的格式，看看是否拥有所需的所有数据、文件是否太重、如果信息被压缩则解压缩信息需要多长时间等。

> GLTF团队还提供各种模型，从简单的三角形到逼真的模型，以及动画，变形，清漆材料等。[https://github.com/KhronosGroup/glTF-Sample-Models](https://github.com/KhronosGroup/glTF-Sample-Models)可以拿来做测试用例

## [2]GLTF 格式

虽然 GLTF 本身是一种格式，但它也可以有不同的文件格式。这有点复杂，但有充分的理由。
常见的有：

- glTF
- glTF-Binary
- glTF-Draco
- glTF-Embedded（嵌入式）

其实还有其他更多的格式，这四种是比较常见的，下面分别了解一下这四种格式

### glTF

此格式是一种默认格式，通常由种格式的文件组成：

- .gltf --是可以在编辑器中打开的 JSON，它包含各种信息，如相机，灯光，场景，材料，对象转换，但既不是几何形状也不是纹理。
- .bin --是一个二进制文件，是不可读的。它通常包含几何等数据以及与顶点相关的所有信息，如 UV 坐标、法线、顶点颜色等。
- .png 纹理图片

当我们加载这种格式时，我们只需要加载包含对其他文件的引用的 .gltf ，然后会自动加载。

### glTF-Binary

此格式仅由一个文件.glb组成。它包含我们以glTF默认格式包含的所有数据。这是一个二进制文件，不能只在代码编辑器中打开它来查看里面的内容。
这种格式可以更轻一些，加载起来更舒适，因为只有一个文件，但您将无法轻松更改其数据。例如，如果您想调整纹理的大小或压缩纹理，则不能，因为它位于该二进制文件中，因此无法与其余文件合并。

### glTF-Draco

此格式类似于 glTF 默认格式，但缓冲区数据（通常是几何图形）使用 Draco 算法进行压缩。 通常.bin 文件会轻一些。
虽然此格式有一个单独的文件夹，但您可以将 Draco 压缩应用于其他格式。

### glTF-Embedded

这种格式类似于glTF-Binary格式，因为它只是一个文件，但这个文件实际上是一个可以在编辑器中打开的JSON。这种格式的唯一好处是只有一个易于编辑的文件。

### 选择

如果希望能够在导出后更改灯光的纹理或坐标，则最好使用 glTF 默认值。它还具有单独加载不同文件的优点，从而提高了加载速度。
如果你每个模型只需要一个文件，并且不关心修改部分东西，最好还是选择glTF-Binary。
**在这两种情况下，都必须决定是否要使用 Draco 压缩**

## [3]在three中加载模型

### 加载.gltf

要在 Three.js 中加载 GLTF 文件，得使用 GLTFLoader。默认情况下，此类在 THREE 变量中不可用。我们需要从位于 examples/ 依赖项中的 three 个文件夹中导入它：

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
```

```javascript
/**
* Models
*/
const gltfLoader = new GLTFLoader()
```

如果需要，我们也可以使用 LoadManager
加载模型几乎和加载纹理一样简单，只需要调用 `load(...)`方法并使用正确的参数：

- 文件的路径
- 成功回调函数
- 错误回调函数

```javascript
gltfLoader.load(
  '/models/Duck/glTF/Duck.gltf',
  (gltf) =>{
    console.log('success')
    console.log(gltf)
    },
  (progress) =>{
    console.log('progress')
    console.log(progress)
    },
  (error) =>
    {
    console.log('error')
    console.log(error)
    }
)
```

查看控制台中记录的对象，您会发现很多元素。最重要的部分是 scene 属性，因为我们在导出的模型中只有一个场景。
![image.png](https://img-blog.csdnimg.cn/img_convert/ec8e82f1c46c0b85e69cd81426aaa7fd.png#averageHue=#fefdfc&clientId=u2ca7c6db-98ca-4&from=paste&height=664&id=u44e3fade&originHeight=830&originWidth=922&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=92915&status=done&style=none&taskId=u9586881b-ce7b-4268-ac24-a4d55ba6807&title=&width=737.6)
将加载的模型添加到我们的场景：
三维模型的 scene 包含我们需要的一切。但它也包括更多。始终从研究其中可用的内容开始，并观察不同[Groups](https://threejs.org/docs/#api/en/objects/Group), [Object3D](https://threejs.org/docs/#api/en/core/Object3D), 和[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)的 scale 属性。
[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)应该是我们的具体模型。我们不必太关心PerspectiveCamera。相机和具体模型似乎都在场景子数组children中的第一个也是唯一一个 Object3D 中。更糟糕的是，Object3D 将 scale 设置为最小值。
![image.png](https://img-blog.csdnimg.cn/img_convert/663b3381ff901855c7449f852546ceda.png#averageHue=#fefdfc&clientId=u2ca7c6db-98ca-4&from=paste&height=526&id=u983e94b6&originHeight=657&originWidth=885&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=83604&status=done&style=none&taskId=uee9bdc30-608a-423a-9346-c4339c70cf9&title=&width=708)
所以，即使加载成功获取到了相应的模型，这个模型也有点复杂，以为信息比较多
但是，我们想要的只是让我们的模型出现在场景中。我们有多种方法可以做到这一点：

- 将模型的整个scene添加到我们的scene中，因为即使它的名字是 scene ，它实际上也是一个组。
- 将 scene 的子项添加到我们的场景中，并忽略未使用的[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)
- 在添加到场景中之前过滤子项以删除不需要的对象，如透视摄像机。
- 只添加网格体[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)，但最终会得到一个可能被错误缩放scaled 、定位positioned或旋转rotated 的鸭子。
- 在 3D 软件中打开文件并移除透视相机，然后再次导出。、

如果我们的模型结构很简单，那就可以将 Object3D 添加到场景中，并忽略里面未使用的 PerspectiveCamera

```javascript
gltfLoader.load(
	'/models/Duck/glTF/Duck.gltf',
	(gltf) =>
    {
    console.log(gltf.scene.children[0])
    scene.add(gltf.scene.children[0])
    }
)
```

![image.png](https://img-blog.csdnimg.cn/img_convert/711250971977e06611dc7c430bd66d42.png#averageHue=#fefdfc&clientId=u2ca7c6db-98ca-4&from=paste&height=491&id=ud0c86ea0&originHeight=614&originWidth=907&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=86338&status=done&style=none&taskId=u019a007e-ccb6-4929-a217-7e113934bf7&title=&width=725.6)

**多children模型加载**
对于多children模型的加载就不能像上一样加载了
![image.png](https://img-blog.csdnimg.cn/img_convert/583fd732a4202f2d09389ac5dbe11310.png#averageHue=#fdfbf9&clientId=uf40df3e0-4ca1-4&from=paste&height=491&id=uaf203193&originHeight=614&originWidth=919&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=98953&status=done&style=none&taskId=u52f42f62-c529-4775-a861-262c2bcd665&title=&width=735.2)
而是需要所以for循环遍历所有的模型添加到scene中：

```javascript
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        for(const child of gltf.scene.children)
        {
        scene.add(child)
        }
    // scene.add(gltf.scene.children[0])
    }
)
```

![image.png](https://img-blog.csdnimg.cn/img_convert/f2038562787cbe24fdfd37bb5d3dc660.png#averageHue=#4b4a4a&clientId=uf40df3e0-4ca1-4&from=paste&height=486&id=uc9055bb4&originHeight=608&originWidth=1051&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=31569&status=done&style=none&taskId=u8c4b2c5a-712f-4dba-bec1-d6129b5bd2f&title=&width=840.8)
但是这样加载并不能加载全，而且刷新网页后会得到不同的部分：
![image.png](https://img-blog.csdnimg.cn/img_convert/56e2dc10aabee363bab7787a08952255.png#averageHue=#444443&clientId=uf40df3e0-4ca1-4&from=paste&height=728&id=u18f3d5ac&originHeight=910&originWidth=1569&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=100372&status=done&style=none&taskId=uc34b19f0-690f-4daf-9269-f84accfeae5&title=&width=1255.2)
造成这样的问题是因为当我们将一个 child 从一个scene添加到另一个scene时，它会自动从第一个场景中删除。这意味着第一个场景中的孩子现在更少了。
当我们添加第一个对象时，它会从第一个场景中移除，第二个元素只是移动到第一个位置。但是您的循环现在采用数组的第二个元素。0 数组中将始终保留元素。
此问题有多种解决方案。第一个解决方案是获取加载场景的第一个子项并将其添加到我们的场景中，直到没有剩余项：

```javascript
while(gltf.scene.children.length){
  scene.add(gltf.scene.children[0])
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/98c5bfb23bd515526dcaf49c8d5cd5d3.png#averageHue=#474646&clientId=uf40df3e0-4ca1-4&from=paste&height=491&id=u88d9831b&originHeight=614&originWidth=1219&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=32333&status=done&style=none&taskId=u92cc3b7a-7645-4fea-836b-9b149b00668&title=&width=975.2)
这样才完整
另一种解决方案是复制 children 数组，以便拥有一个未更改的独立数组。为此，我们可以使用点差运算符 ... 并将结果放入一个全新的数组 [] 中：

```javascript
const children = [...gltf.scene.children]
for(const child of children)
{
scene.add(child)
}
```

最后一种最简单的解决方案是直接添加 scene 属性：

```javascript
scene.add(gltf.scene)
```

### 加载Draco compression

加载所有Draco压缩过的模型并不能使用gltfLoader直接加载，而是需要为我们的 GLTFLoader 提供一个 DRACOLoader 实例，以便它可以加载压缩文件。
Draco 版本可能比默认版本轻得多。压缩应用于缓冲区数据（通常是几何图形）。无论您使用的是默认的 glTF、二进制 glTF 还是嵌入式 glTF，都没有关系

```javascript
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
```

```javascript
const dracoLoader = new DRACOLoader()
```

解码器在原生JavaScript可用，也可以在Web Assembly（wasm）中使用，并且可以在worker中运行（我们在物理课结束时看到的另一个线程）。这两个功能显著提高了性能，但它们意味着具有完全分离的代码。
这个 Draco 解码器文件夹位于 /node_modules/three/examples/js/libs/ 。可将整个 /draco/ 文件夹复制到你的静态文件目录中

```javascript
dracoLoader.setDecoderPath('/draco/')
```

```javascript
/**
* Models
*/
const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load(
	'/models/Duck/glTF-Draco/Duck.gltf',
	(gltf) =>
    {
        // console.log(gltf.scene)
    scene.add(gltf.scene)
    }
)
```

## [4]动画

### 加载动画模型

和加载普通的模型没什么两样

```javascript
/**
* Models
*/
const gltfLoader = new GLTFLoader()
gltfLoader.load(
	'/models/Fox/glTF/Fox.gltf',
	(gltf) =>
    {
        // console.log(gltf.scene)
    gltf.scene.scale.set(0.025, 0.025, 0.025)
    scene.add(gltf.scene)
    }
)
```

### 处理模型动画

如果查看加载的 gltf 对象，可以看到一个名为 animations 的属性包含多个 [AnimationClip](https://threejs.org/docs/#api/en/animation/AnimationClip).
这些[AnimationClip](https://threejs.org/docs/#api/en/animation/AnimationClip)不能轻易使用。我们首先需要创建一个 [AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer).  。[AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer) 类似于与可以包含一个或多个 AnimationClips 的对象关联的播放器。这个想法是为每个需要动画的对象创建一个。
在加载模型的回调函数中，创建一个混音器并将 gltf.scene 作为参数发送：

```javascript
const mixer = new THREE.AnimationMixer(gltf.scene)
```

现在，我们可以使用 clipAction(...) 方法将动画剪辑添加到混音器中。让我们从第一个动画开始：

```javascript
const action = mixer.clipAction(gltf.animations[0])
```

此方法返回一个 AnimationAction，我们最终可以在其上调用 play() 方法：

```javascript
action.play()
```

要播放动画，我们必须告诉混音器在每一帧更新自身。问题是我们的 mixer 变量已在加载回调函数中声明，而我们在 tick 函数中无法访问它。为了解决这个问题，我们可以在 load 回调函数之外声明具有 null 值的 mixer 变量，并在加载模型时更新它：

```javascript
let mixer = null

gltfLoader.load(
'/models/Fox/glTF/Fox.gltf',
  (gltf) =>
  {
  gltf.scene.scale.set(0.03, 0.03, 0.03)
  scene.add(gltf.scene)
  
  mixer = new THREE.AnimationMixer(gltf.scene)
  const action = mixer.clipAction(gltf.animations[0])
  action.play()
}
)
```

最后，我们可以用已经计算出的 deltaTime 更新 tick 函数中的混音器。

```javascript
const tick = () =>
{
// ...

if(mixer)
{
mixer.update(deltaTime)
}

// ...
}
```

![GIF 2023-7-11 9-18-57.gif](https://img-blog.csdnimg.cn/img_convert/dc08cfc30e91e4750c2577f0385f65ba.gif#averageHue=#403733&clientId=uf40df3e0-4ca1-4&from=paste&height=487&id=u8075215a&originHeight=609&originWidth=1099&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=258739&status=done&style=none&taskId=ua0b9c8aa-ad07-4bfd-90b4-5e311892701&title=&width=879.2)
动画应正在运行。可以通过更改 clipAction(...) 方法中的值来测试其他动画。

```javascript
const action = mixer.clipAction(gltf.animations[2])
```

![GIF 2023-7-11 9-18-57.gif](https://img-blog.csdnimg.cn/img_convert/b93ca0d4ebd1b295ac6419787a6b8a7f.gif#averageHue=#403733&clientId=uf40df3e0-4ca1-4&from=paste&height=487&id=uf0504c9d&originHeight=609&originWidth=1099&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=258739&status=done&style=none&taskId=u3ce6b4f0-2408-4207-9eb2-900d3632446&title=&width=879.2)

## [5]Three.js editor

three.js有自己的在线编辑器。你可以在这里找到它： [https://threejs.org/editor/](https://threejs.org/editor/)
它就像一个3D软件，但在线且功能较少。您可以创建基元、光源、材质等。
由于您可以导入模型，因此这是测试模型是否正常工作的好方法。但是由于只能测试由一个文件组成的模型。你可以尝试使用 glTF-Binary 或 glTF-Embedded