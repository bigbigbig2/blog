---
layout: Post
title:  three.js修改内置材质着色器代码
date: 2023-07-30
useHeaderImage: true
headerImage: https://img-blog.csdnimg.cn/83af9de916f14d90b04aea8d7913d1c3.png
tags:
  - three.js
---

[[toc]]

通常我们是通过修改扩展three.js内置的材质来实现一些复杂的效果的，而不是使用shaderMaterial材质从零开始实现。比如说很满意`MeshStandardMaterial`（一种常规材质）的效果，但是我们希望在这个材质上添加一些顶点动画。如果我们打算从头开始写一个全新的`MeshStandardMaterial`，处理灯光、环境图、物理渲染、各种纹理等等就会耗费我们大量的时间。
有两种常见的方式可以修改着色器：

1. 通过使用一个Three.js提供的“钩子”函数，在着色器编译之前改动着色器并插入我们的代码。
2. 新建一个全新的材质，先复现原来的材质的功能效果，然后再添加一个我们自己需要的效果

很明显第二种方式一般情况下并不太适合，因为需要花费的时间比较多

## [1]获取材质的着色器

要修改内置材质的着色器带啊吗，首先需要访问获取到相应的着色器，要获取着色器等信息我们可以调用材质的onBeforeCompile方法：

```javascript
// Material
const material = new THREE.MeshStandardMaterial( {
    map: mapTexture,
    normalMap: normalTexture
})
material.onBeforeCompile = (shader) =>{
    console.log(shader)
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/d72ca8967a8442cbb7bf30c1d4a2c3ac.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/ae316a3f53354ac8a2f7ee6beffaa794.png)


## [2]向顶点着色器中添加内容

先打印看看原始材质的顶点着色器的内容：

```glsl
#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}
```

并没有太多的代码，这是因为three.js对大部分着色器可复用的代码进行了封装，以防止在不同材质之间重复相同的代码。每个都将 #include ... 注入位于 Three.js依赖项的特定文件夹中的代码。
也就是说我们好些就可以直接使用JavaScript的replace方法直接替换掉其中的代码了
但是我们不知道哪个部分在做什么以及要替换哪个部分。为了理解代码，我们需要深入研究 `three` 依赖关系。
为此，我们可以看看`/node_modules/three/src/renderers/shaders/` 文件夹，这里可以找到大多数three.js着色器代码
![在这里插入图片描述](https://img-blog.csdnimg.cn/d9b82cfc1ed443d9bef38743d359067d.png)

再上面的顶点着色器中包含内容都称为块(chunk），都可以在`ShaderChunk/` 文件夹中找到它们，然后更加可以按照上面打印的材质的着色器代码大概读一些相应的chunk，或者按照你的想法，去读和修改就行。
比如我想对通过修改顶点着色器修改模型的y坐标，经过阅读原有的chunk后发现#include <begin_vertex>这个块里面的代码：

```javascript
export default /* glsl */`
vec3 transformed = vec3( position );
`;
```

那我直接替换大法：

```javascript
const material = new THREE.MeshStandardMaterial( {
    map: mapTexture,
    normalMap: normalTexture
})

material.onBeforeCompile = (shader) =>{
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        
        transformed.y += 3.0;
        `
    )
    console.log(shader.vertexShader)
}

```

然后看这个打印的代码：
![在这里插入图片描述](https://img-blog.csdnimg.cn/d2acd8e65d85405b8e538d8a8eb0a0d8.png)


## [3]旋转坐标

这里实验一下添加一个2D旋转矩阵（相关内容可参考[The Book of Shaders](https://thebookofshaders.com/08/)），根据输入的角度返回一个循环矩阵，然后将这个矩阵应用到模型坐标中；
按照前面的思想，我们先创建一个旋转矩阵函数

```javascript
mat2 get2dRotateMatrix(float _angle){
    return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
}
```

那么该将这个函数添加到那个chunk中呢？如果是我们之际编写的着色器，我们会把它放到main函数前面即可 ，那么看看有没有chunk，这里有个`'#include <common>'`chunk可以替换放置。

```javascript
material.onBeforeCompile = (shader) =>{
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>

        mat2 get2dRotateMatrix(float _angle){
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
        `
    )
    console.log(shader.vertexShader)
}
```

放置好后就可以在其他chunk中调用了

```javascript
material.onBeforeCompile = (shader) =>{
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>

        mat2 get2dRotateMatrix(float _angle){
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
        `
    )

    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float angle = position.y * 0.9;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        transformed.xz = rotateMatrix * transformed.xz;
        `
    )
    console.log(shader.vertexShader)

}
```

## [4]动画

也可以通过onBeforeCompile钩子函数传递要给uniform时间变量过去片段着色器，以实现动画效果

> 需要注意的是，这里不同shaderMaterial，不能将实时的时间通过如下方式传递`material.uniforms.uTime.value = elapsedTime`，而是向下面那样

```javascript
const customUniforms = {
    uTime: { value: 0 }
}

material.onBeforeCompile = (shader) =>{
    shader.uniforms.uTime = customUniforms.uTime
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float uTime;

        mat2 get2dRotateMatrix(float _angle){
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
        `
    )

    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float angle = (position.y + uTime) * 0.9;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        transformed.xz = rotateMatrix * transformed.xz;
        `
    )
    console.log(shader.vertexShader)

}

//。。。
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update material
    customUniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

```

## [5]阴影修复

当我们使用上面的方式对模型的顶点坐标进行变换后，如果你设置了阴影你会发现阴影的形状等并没有发生改变，这是因为
当我们使用阴影时，Three.js会从光源的视角对场景进行渲染。这些渲染结果会生成关于哪些部分在阴影中，哪些部分在光线下的图片。当这些渲染发生时，所有的材质都会被替换成另一套专门用于这种特定渲染的材质。问题在于，这种材质不会随我们变化后的材质变化而变化，因为它与我们修改过的MeshStandardMaterial没有任何关系
![在这里插入图片描述](https://img-blog.csdnimg.cn/d6efb92abe4f446aab0808105475aca8.png)

要解决这个问题，我们需要找到一种方式来同时改变这个特定的material
用于阴影的材质是 [MeshDepthMaterial](https://threejs.org/docs/#api/en/materials/MeshDepthMaterial)，要访问该材质并不容易，但是我们可以使用mesh的`customDepthMaterial`属性来覆盖它，以便告诉 Three.js 使用自定义材质
具体代码的做简单，只需要在加载后面后对每个mesh应用`customDepthMaterial`属性即可

```javascript
//创建一个此自定义材质，这里使用MeshDepthMaterial，因为这正是Three.js在这些渲染过程中使用的
const depthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking
})
/**
 * Models
 */
gltfLoader.load(
    '/models/LeePerrySmith/LeePerrySmith.glb',
    (gltf) =>{
        // Model
        const mesh = gltf.scene.children[0]
        mesh.rotation.y = Math.PI * 0.5
        mesh.material = material
        mesh.customDepthMaterial = depthMaterial // Update the depth material
        scene.add(mesh)

        updateAllMaterials()
    }
)

//同时也需要对改材质进行同样的操作
depthMaterial.onBeforeCompile = (shader) =>{
    shader.uniforms.uTime = customUniforms.uTime
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>

        uniform float uTime;

        mat2 get2dRotateMatrix(float _angle)
        {
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
        `
    )
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>

        float angle = (position.y + uTime) * 0.9;
        mat2 rotateMatrix = get2dRotateMatrix(angle);

        transformed.xz = rotateMatrix * transformed.xz;
        `
    )
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/83af9de916f14d90b04aea8d7913d1c3.png)


## [6]法向修复

上面的进行阴影修复后其实还有个问题，那个阴影会随着顶点的旋转而旋转。这是一个与法线有关的问题。
因为法线是与每个顶点相关联的坐标，用于获取面朝向的方向。通过用于光照、反射和阴影等相关的内容
而当我们旋转顶点时，我们只是旋转位置，但我们没有旋转法线。我们需要修改处理法线的chunk
通过查找法线处理法线的chunk为`beginnormal_vertex`

```javascript
export default /* glsl */`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

    vec3 objectTangent = vec3( tangent.xyz );

#endif
`;
```

然后对顶点法线和顶点做同样的变换即可：

```javascript
depthMaterial.onBeforeCompile = (shader) =>{
    shader.uniforms.uTime = customUniforms.uTime
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>

        uniform float uTime;

        mat2 get2dRotateMatrix(float _angle){
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
        `
    )
    shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        `
        #include <beginnormal_vertex>
        
        float angle = (position.y + uTime) * 0.9;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        
        objectNormal.xz = rotateMatrix * objectNormal.xz;
        `
    )
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float angle = (position.y + uTime) * 0.9;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        transformed.xz = rotateMatrix * transformed.xz;
        `
    )
}
```

> 注意这块，有些版本是不支持上面的写法的，需要对一些语句去重，因为最后是将上的着色器代码合并到一块的，如果有重复语句会报错，但是在新的版本中则不会。