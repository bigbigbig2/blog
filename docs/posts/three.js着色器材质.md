---
layout: Post
title:  three.js着色器材质
date: 2023-07-26
useHeaderImage: true
headerImage: https://img-blog.csdnimg.cn/img_convert/fbca4cd2a29d5daf4121e1999db9084d.png#averageHue=#cdb085&clientId=uc3a4f176-e383-4&from=paste&height=457&id=u3aeb3540&originHeight=1247&originWidth=2074&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=245547&status=done&style=none&taskId=uaf96a269-b283-4115-b546-46f374ffc95&title=&width=760.4000244140625
tags:
  - three.js
---

[[toc]]

当Three.js内置的材质不能满足需求时，就需要通过编写着色器来实现了
也可能是出于性能原因。像MeshStandardMaterial这样的材料非常复杂，涉及大量的代码和计算。如果我们编写自己的着色器，我们可以将功能和计算保持在最低限度。我们可以更好地控制性能。
编写指定要着色器也是向渲染结果添加后处理效果的绝佳方式

## [1]RawShaderMaterial

要创建一个着色器，我们需要创建一个特定的材质。这个特定的材质可以时着色器材质[ShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial)或者原始材质[RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial), 它们的区别是`ShaderMaterial`会自动将一些代码添加到着色器代码中，而`RawShaderMaterial`则不会。
这里从比较原始的`RawShaderMaterial`实验：

```typescript
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: `
      uniform mat4 projectionMatrix;
      uniform mat4 viewMatrix;
      uniform mat4 modelMatrix;
      
      attribute vec3 position;
      
      void main(){
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision mediump float;
      
      void main(){
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
  `
  })

// Mesh
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```

![image.png](https://img-blog.csdnimg.cn/img_convert/89ab66698a3e445804a6e833367edccc.png#averageHue=#320000&clientId=uf5804c0a-04dc-4&from=paste&height=330&id=ub9ae56f2&originHeight=1211&originWidth=2556&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=22255&status=done&style=none&taskId=uaf4e8e67-c5d2-4af5-823d-9a7603b3230&title=&width=696)
更好的写法是将着色器拆分写到不同文件中
这里可以分别创建`vertex.glsl`、`fragment.glsl`文件，将组织到某个文件夹下，因为一个项目通常有很多个着色器代码。

在vite中import shader文件（.glsl）问题 
在vite中import shader文件（.glsl）问题，不需要安装插件，只需在导入文件的结尾添加一个?raw符号，vite会将改文件的内容解析为字符串导入
`import vertexShader from "./../shader/particels_vs.glsl?raw"`
`import fragmentShader from "./../shader/particels_fs.glsl?raw"`
使用其他打包构建工具估计也需要进行配置才能使用.glsl文件
例如在webpack中则需要添加：一个rules

```javascript
{
    test: /\.(glsl|vs|fs|vert|frag)$/,
    type: 'asset/source',
    generator:
    {
        filename: 'assets/images/[hash][ext]'
    }
}
```

## [2]Properties

在其他常见材质中使用的属性（例如线框、侧面、透明或平面着色）仍然可用于 RawShaderMaterial

```typescript
const material = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  wireframe: true //网格线条
})
```

但是`map`贴图、`alphaMap`、`opacity`、`color`等属性将不再起作用，因为我们需要自己在着色器中编写这些功能。

## [3]补充说明

首先看看MVP矩阵，这里的MVP矩阵于WEBGL中有些不同

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
```

- `modelMatrix `将应用与Mesh相关的所有变换。如果我们缩放、旋转或移动网格，这些转换将包含在 中 modelMatrix 并应用于 position 
- `viewMatrix` 将应用相对于相机的变换。如果我们将相机向左旋转，顶点应该在右侧。如果我们沿网格体的方向移动相机，顶点应该会变大，依此类推。
- 最终 `projectionMatrix` 会将我们的坐标转换为最终的剪辑空间坐标。

> 参考：[LearnOpenGL - Coordinate Systems](https://learnopengl.com/Getting-started/Coordinate-Systems)


关于片段着色器的精度：
当我们使用`ShaderMaterial`而不是`RawShaderMaterial`时，这部分会自动处理。

## [4]内置函数

开始上点费脑的内置函数

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/a8faf82e7a8c6fe6f2b878c8de6113f1.png#averageHue=#530000&clientId=uf5804c0a-04dc-4&from=paste&height=315&id=u3a06baac&originHeight=394&originWidth=798&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=5553&status=done&style=none&taskId=u7129f895-adbb-4ff5-8123-400c28559cd&title=&width=638.4)

## [5]传递Attributes

可以直接将要添加的Attributes属性直接添加到 BufferGeometry 中，例如下面传递一些随机值到顶点着色器重

```javascript
const count = geometry.attributes.position.count //获取几何体的顶点数
const randoms = new Float32Array(count)

for(let i = 0; i < count; i++){
  randoms[i] = Math.random()
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))//传递
```

然后就可以直接在顶点着色器中使用了：

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute float aRandom;
attribute vec3 position;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
  modelPosition.z += aRandom * 0.1;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/699b21527c59044b83dadf4b3f8a259c.png#averageHue=#380000&clientId=uc3a4f176-e383-4&from=paste&height=418&id=uf13dfefc&originHeight=802&originWidth=1707&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=12189&status=done&style=none&taskId=u42c32f90-b9f9-4d37-b587-4801d3bc18f&title=&width=890.4000244140625)
还可以使用varying传递给片元着色器玩玩：

```glsl
varying float vRandom;

void main(){
  // ...
  
  vRandom = aRandom;
}
```

```glsl
precision mediump float;

varying float vRandom;

void main(){
    gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/fbca4cd2a29d5daf4121e1999db9084d.png#averageHue=#cdb085&clientId=uc3a4f176-e383-4&from=paste&height=457&id=u3aeb3540&originHeight=1247&originWidth=2074&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=245547&status=done&style=none&taskId=uaf96a269-b283-4115-b546-46f374ffc95&title=&width=760.4000244140625)

## [6]传递Uniforms

与传递attribute不同的是传递Uniforms直接通过RawShaderMaterial的属性传递即可

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms:{
        uFrequency: { value: new THREE.Vector2(10, 5) } //传递一个波动频率
    }
})
```

使用

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uFrequency;

attribute float aRandom;
attribute vec3 position;

varying float vRandom;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * uFrequency.x) * 0.1;
		modelPosition.z += sin(modelPosition.y * uFrequency.y) * 0.1;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vRandom = aRandom;

}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/201cd3c0af6c1d7eab61cdb47ff9b83e.png#averageHue=#1d1d3b&clientId=uc3a4f176-e383-4&from=paste&height=354&id=u2ee07429&originHeight=442&originWidth=1003&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=7605&status=done&style=none&taskId=u473b2064-3e2f-4c94-8b01-9fc400dc4db&title=&width=802.4)
因为这些值是直接在在传递到着色器的，那么就可以动态控制传递过去，比如通过dat.gui控制

```javascript
gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('frequencyX')
gui.add(material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('frequencyY')
```

还可以通过模型构建类似于shadtory里的一个自带的uTime变量，让图形动起来

```javascript
const material = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  uniforms:{
    uFrequency: { value: new THREE.Vector2(10, 5) },
    uTime: { value: 0 }
  }
})
```

在绘制函数中填值即可

```javascript
const tick = () =>{
  const elapsedTime = clock.getElapsedTime()
  
  // Update material
  material.uniforms.uTime.value = elapsedTime
  
  // ...
}
```

```glsl
// ...
uniform float uTime;

// ...

void main(){
  // ...
  modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
  modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;

  // ...
}
```

这样就动起来了
后面还可以传递更多的uniform，比如color等这里就不演示了

## [7]纹理贴图

这里讨论的是给RawShaderMaterial材质添加纹理图片，这里加载映射纹理同原始的webgl一样，需要uv坐标`texture2D(uTexture, vUv);`这里可以直接将加载好的纹理通过uniform传递到片段着色器：

```glsl
const flagTexture = textureLoader.load('/textures/flag-french.jpg')
const material = new THREE.RawShaderMaterial({
  // ...
  uniforms:{
  // ...
  uTexture: { value: flagTexture }
  }
})
```

这里因为geometry会自动构建uv坐标到attribute上，所以这里就可以直接在顶点着色器中获取到

```glsl
// ...
attribute vec2 uv;

varying vec2 vUv;

void main(){
// ...
vUv = uv;
}
```

```glsl
precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;

void main(){
  vec4 textureColor = texture2D(uTexture, vUv);
  gl_FragColor = textureColor;
}
```

## [8]ShaderMaterial

ShaderMaterial相比于ShaderMaterial要方便一些，内置了一些变量
如下变量就不需要在着色器中定义就可以直接在glsl中使用了

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
attribute vec3 position;
attribute vec2 uv;
precision mediump float;
```

本文部分内容为Three.js Journey课程的学习笔记