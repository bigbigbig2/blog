<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-常用工具类封装">[1]常用工具类封装</RouterLink><ul><li><RouterLink to="#eventemitter">EventEmitter</RouterLink></li><li><RouterLink to="#resize">resize</RouterLink></li><li><RouterLink to="#time">Time</RouterLink></li></ul></li><li><RouterLink to="#_2-核心类封装">[2]核心类封装</RouterLink><ul><li><RouterLink to="#scene">scene</RouterLink></li><li><RouterLink to="#camera">camera</RouterLink></li><li><RouterLink to="#renderer">renderer</RouterLink></li></ul></li><li><RouterLink to="#_3-world">[3]World</RouterLink><ul><li><RouterLink to="#environment">Environment</RouterLink></li><li><RouterLink to="#resources">Resources</RouterLink></li><li><RouterLink to="#fox">fox</RouterLink></li></ul></li><li><RouterLink to="#_4-debug">[4]Debug</RouterLink></li><li><RouterLink to="#_5-销毁场景中所有的物体">[5]销毁场景中所有的物体</RouterLink></li></ul></nav>
<p>通常对于稍微大些的项目或者demo，都需要对three.js的代码结构进行拆分，有利于复用、代码可读性、扩展性</p>
<p>例如下面的一个简单的scene代码直接将所three.js代码都添加到了一个文件中都会有点难受了：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token string">'./style.css'</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> OrbitControls <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'three/examples/jsm/controls/OrbitControls.js'</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> dat <span class="token keyword">from</span> <span class="token string">'lil-gui'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> GLTFLoader <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'three/examples/jsm/loaders/GLTFLoader.js'</span>

<span class="token comment">/**
 * Loaders
 */</span>
<span class="token keyword">const</span> gltfLoader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GLTFLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> textureLoader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">TextureLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> cubeTextureLoader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">CubeTextureLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">/**
 * Base
 */</span>
<span class="token comment">// Debug</span>
<span class="token keyword">const</span> gui <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">dat</span><span class="token punctuation">.</span><span class="token constant">GUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> debugObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// Canvas</span>
<span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'canvas.webgl'</span><span class="token punctuation">)</span>

<span class="token comment">// Scene</span>
<span class="token keyword">const</span> scene <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">Scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">/**
 * Update all materials
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">updateAllMaterials</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
    scene<span class="token punctuation">.</span><span class="token function">traverse</span><span class="token punctuation">(</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span> <span class="token operator">=></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>child <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span>Mesh <span class="token operator">&amp;&amp;</span> child<span class="token punctuation">.</span>material <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span>MeshStandardMaterial<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// child.material.envMap = environmentMap</span>
            child<span class="token punctuation">.</span>material<span class="token punctuation">.</span>envMapIntensity <span class="token operator">=</span> debugObject<span class="token punctuation">.</span>envMapIntensity
            child<span class="token punctuation">.</span>material<span class="token punctuation">.</span>needsUpdate <span class="token operator">=</span> <span class="token boolean">true</span>
            child<span class="token punctuation">.</span>castShadow <span class="token operator">=</span> <span class="token boolean">true</span>
            child<span class="token punctuation">.</span>receiveShadow <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Environment map
 */</span>
<span class="token keyword">const</span> environmentMap <span class="token operator">=</span> cubeTextureLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token string">'/textures/environmentMap/px.jpg'</span><span class="token punctuation">,</span>
    <span class="token string">'/textures/environmentMap/nx.jpg'</span><span class="token punctuation">,</span>
    <span class="token string">'/textures/environmentMap/py.jpg'</span><span class="token punctuation">,</span>
    <span class="token string">'/textures/environmentMap/ny.jpg'</span><span class="token punctuation">,</span>
    <span class="token string">'/textures/environmentMap/pz.jpg'</span><span class="token punctuation">,</span>
    <span class="token string">'/textures/environmentMap/nz.jpg'</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>

environmentMap<span class="token punctuation">.</span>encoding <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>sRGBEncoding

<span class="token comment">// scene.background = environmentMap</span>
scene<span class="token punctuation">.</span>environment <span class="token operator">=</span> environmentMap

debugObject<span class="token punctuation">.</span>envMapIntensity <span class="token operator">=</span> <span class="token number">0.4</span>
gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>debugObject<span class="token punctuation">,</span> <span class="token string">'envMapIntensity'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">onChange</span><span class="token punctuation">(</span>updateAllMaterials<span class="token punctuation">)</span>

<span class="token comment">/**
 * Models
 */</span>
<span class="token keyword">let</span> foxMixer <span class="token operator">=</span> <span class="token keyword">null</span>

gltfLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>
    <span class="token string">'/models/Fox/glTF/Fox.gltf'</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span>gltf<span class="token punctuation">)</span> <span class="token operator">=></span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Model</span>
        gltf<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>scale<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">0.02</span><span class="token punctuation">,</span> <span class="token number">0.02</span><span class="token punctuation">,</span> <span class="token number">0.02</span><span class="token punctuation">)</span>
        scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>gltf<span class="token punctuation">.</span>scene<span class="token punctuation">)</span>

        <span class="token comment">// Animation</span>
        foxMixer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">AnimationMixer</span><span class="token punctuation">(</span>gltf<span class="token punctuation">.</span>scene<span class="token punctuation">)</span>
        <span class="token keyword">const</span> foxAction <span class="token operator">=</span> foxMixer<span class="token punctuation">.</span><span class="token function">clipAction</span><span class="token punctuation">(</span>gltf<span class="token punctuation">.</span>animations<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        foxAction<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">// Update materials</span>
        <span class="token function">updateAllMaterials</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token comment">/**
 * Floor
 */</span>
<span class="token keyword">const</span> floorColorTexture <span class="token operator">=</span> textureLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">'textures/dirt/color.jpg'</span><span class="token punctuation">)</span>
floorColorTexture<span class="token punctuation">.</span>encoding <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>sRGBEncoding
floorColorTexture<span class="token punctuation">.</span>repeat<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1.5</span><span class="token punctuation">,</span> <span class="token number">1.5</span><span class="token punctuation">)</span>
floorColorTexture<span class="token punctuation">.</span>wrapS <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>RepeatWrapping
floorColorTexture<span class="token punctuation">.</span>wrapT <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>RepeatWrapping

<span class="token keyword">const</span> floorNormalTexture <span class="token operator">=</span> textureLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">'textures/dirt/normal.jpg'</span><span class="token punctuation">)</span>
floorNormalTexture<span class="token punctuation">.</span>repeat<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1.5</span><span class="token punctuation">,</span> <span class="token number">1.5</span><span class="token punctuation">)</span>
floorNormalTexture<span class="token punctuation">.</span>wrapS <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>RepeatWrapping
floorNormalTexture<span class="token punctuation">.</span>wrapT <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>RepeatWrapping

<span class="token keyword">const</span> floorGeometry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">CircleGeometry</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> floorMaterial <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">MeshStandardMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    map<span class="token operator">:</span> floorColorTexture<span class="token punctuation">,</span>
    normalMap<span class="token operator">:</span> floorNormalTexture
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> floor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">Mesh</span><span class="token punctuation">(</span>floorGeometry<span class="token punctuation">,</span> floorMaterial<span class="token punctuation">)</span>
floor<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">0.5</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>floor<span class="token punctuation">)</span>

<span class="token comment">/**
 * Lights
 */</span>
<span class="token keyword">const</span> directionalLight <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">DirectionalLight</span><span class="token punctuation">(</span><span class="token string">'#ffffff'</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
directionalLight<span class="token punctuation">.</span>castShadow <span class="token operator">=</span> <span class="token boolean">true</span>
directionalLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>camera<span class="token punctuation">.</span>far <span class="token operator">=</span> <span class="token number">15</span>
directionalLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>mapSize<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
directionalLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>normalBias <span class="token operator">=</span> <span class="token number">0.05</span>
directionalLight<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">3.5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span> <span class="token number">1.25</span><span class="token punctuation">)</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">)</span>

gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">,</span> <span class="token string">'intensity'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">'lightIntensity'</span><span class="token punctuation">)</span>
gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">.</span>position<span class="token punctuation">,</span> <span class="token string">'x'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">'lightX'</span><span class="token punctuation">)</span>
gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">.</span>position<span class="token punctuation">,</span> <span class="token string">'y'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">'lightY'</span><span class="token punctuation">)</span>
gui<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>directionalLight<span class="token punctuation">.</span>position<span class="token punctuation">,</span> <span class="token string">'z'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">'lightZ'</span><span class="token punctuation">)</span>

<span class="token comment">/**
 * Sizes
 */</span>
<span class="token keyword">const</span> sizes <span class="token operator">=</span> <span class="token punctuation">{</span>
    width<span class="token operator">:</span> window<span class="token punctuation">.</span>innerWidth<span class="token punctuation">,</span>
    height<span class="token operator">:</span> window<span class="token punctuation">.</span>innerHeight
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'resize'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
    <span class="token comment">// Update sizes</span>
    sizes<span class="token punctuation">.</span>width <span class="token operator">=</span> window<span class="token punctuation">.</span>innerWidth
    sizes<span class="token punctuation">.</span>height <span class="token operator">=</span> window<span class="token punctuation">.</span>innerHeight

    <span class="token comment">// Update camera</span>
    camera<span class="token punctuation">.</span>aspect <span class="token operator">=</span> sizes<span class="token punctuation">.</span>width <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height
    camera<span class="token punctuation">.</span><span class="token function">updateProjectionMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Update renderer</span>
    renderer<span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span>sizes<span class="token punctuation">.</span>width<span class="token punctuation">,</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">)</span>
    renderer<span class="token punctuation">.</span><span class="token function">setPixelRatio</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>devicePixelRatio<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">/**
 * Camera
 */</span>
<span class="token comment">// Base camera</span>
<span class="token keyword">const</span> camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">PerspectiveCamera</span><span class="token punctuation">(</span><span class="token number">35</span><span class="token punctuation">,</span> sizes<span class="token punctuation">.</span>width <span class="token operator">/</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">,</span> <span class="token number">0.1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>camera<span class="token punctuation">)</span>

<span class="token comment">// Controls</span>
<span class="token keyword">const</span> controls <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrbitControls</span><span class="token punctuation">(</span>camera<span class="token punctuation">,</span> canvas<span class="token punctuation">)</span>
controls<span class="token punctuation">.</span>enableDamping <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token comment">/**
 * Renderer
 */</span>
<span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">WebGLRenderer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    canvas<span class="token operator">:</span> canvas<span class="token punctuation">,</span>
    antialias<span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
renderer<span class="token punctuation">.</span>physicallyCorrectLights <span class="token operator">=</span> <span class="token boolean">true</span>
renderer<span class="token punctuation">.</span>outputEncoding <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>sRGBEncoding
renderer<span class="token punctuation">.</span>toneMapping <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>CineonToneMapping
renderer<span class="token punctuation">.</span>toneMappingExposure <span class="token operator">=</span> <span class="token number">1.75</span>
renderer<span class="token punctuation">.</span>shadowMap<span class="token punctuation">.</span>enabled <span class="token operator">=</span> <span class="token boolean">true</span>
renderer<span class="token punctuation">.</span>shadowMap<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>PCFSoftShadowMap
renderer<span class="token punctuation">.</span><span class="token function">setClearColor</span><span class="token punctuation">(</span><span class="token string">'#211d20'</span><span class="token punctuation">)</span>
renderer<span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span>sizes<span class="token punctuation">.</span>width<span class="token punctuation">,</span> sizes<span class="token punctuation">.</span>height<span class="token punctuation">)</span>
renderer<span class="token punctuation">.</span><span class="token function">setPixelRatio</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>devicePixelRatio<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">/**
 * Animate
 */</span>
<span class="token keyword">const</span> clock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">Clock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> previousTime <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">const</span> <span class="token function-variable function">tick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
<span class="token punctuation">{</span>
    <span class="token keyword">const</span> elapsedTime <span class="token operator">=</span> clock<span class="token punctuation">.</span><span class="token function">getElapsedTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> deltaTime <span class="token operator">=</span> elapsedTime <span class="token operator">-</span> previousTime
    previousTime <span class="token operator">=</span> elapsedTime

    <span class="token comment">// Update controls</span>
    controls<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Fox animation</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>foxMixer<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        foxMixer<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>deltaTime<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Render</span>
    renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span>

    <span class="token comment">// Call tick again on the next frame</span>
    window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>tick<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br></div></div><p>下面对就上面的代码功能进行拆分重新组织结构：
重新组织的代码目录如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>core
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

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="_1-常用工具类封装" tabindex="-1"><a class="header-anchor" href="#_1-常用工具类封装" aria-hidden="true">#</a> [1]常用工具类封装</h2>
<h3 id="eventemitter" tabindex="-1"><a class="header-anchor" href="#eventemitter" aria-hidden="true">#</a> EventEmitter</h3>
<p>该类用来管理和调度事件，类似Node.js内置的events模块，这个EventEmitter类提供了一个灵活的方式来管理和触发自定义的事件。其中on，off，和trigger方法是事件的添加，移除，和触发，而resolveNames和resolveName则是内部辅助方法，用于处理和解析事件名。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">EventEmitter</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span>base <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">on</span><span class="token punctuation">(</span>_names<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Errors</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> _names <span class="token operator">===</span> <span class="token string">'undefined'</span> <span class="token operator">||</span> _names <span class="token operator">===</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'wrong names'</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> callback <span class="token operator">===</span> <span class="token string">'undefined'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'wrong callback'</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Resolve names</span>
        <span class="token keyword">const</span> names <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolveNames</span><span class="token punctuation">(</span>_names<span class="token punctuation">)</span>

        <span class="token comment">// Each name</span>
        names<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>_name<span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token comment">// Resolve name</span>
            <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolveName</span><span class="token punctuation">(</span>_name<span class="token punctuation">)</span>

            <span class="token comment">// Create namespace if not exist</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

            <span class="token comment">// Create callback if not exist</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span><span class="token punctuation">[</span> name<span class="token punctuation">.</span>value <span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span><span class="token punctuation">[</span> name<span class="token punctuation">.</span>value <span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

            <span class="token comment">// Add callback</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span><span class="token punctuation">[</span> name<span class="token punctuation">.</span>value <span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>

    <span class="token function">off</span><span class="token punctuation">(</span>_names<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Errors</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> _names <span class="token operator">===</span> <span class="token string">'undefined'</span> <span class="token operator">||</span> _names <span class="token operator">===</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'wrong name'</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Resolve names</span>
        <span class="token keyword">const</span> names <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolveNames</span><span class="token punctuation">(</span>_names<span class="token punctuation">)</span>

        <span class="token comment">// Each name</span>
        names<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>_name<span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token comment">// Resolve name</span>
            <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolveName</span><span class="token punctuation">(</span>_name<span class="token punctuation">)</span>

            <span class="token comment">// Remove namespace</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span>namespace <span class="token operator">!==</span> <span class="token string">'base'</span> <span class="token operator">&amp;&amp;</span> name<span class="token punctuation">.</span>value <span class="token operator">===</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// Remove specific callback in namespace</span>
            <span class="token keyword">else</span><span class="token punctuation">{</span>
                <span class="token comment">// Default</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span>namespace <span class="token operator">===</span> <span class="token string">'base'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token comment">// Try to remove from each namespace</span>
                    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">namespace</span> <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">)</span><span class="token punctuation">{</span>
                        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> namespace <span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> namespace <span class="token punctuation">]</span><span class="token punctuation">[</span> name<span class="token punctuation">.</span>value <span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                            <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> namespace <span class="token punctuation">]</span><span class="token punctuation">[</span> name<span class="token punctuation">.</span>value <span class="token punctuation">]</span>

                            <span class="token comment">// Remove namespace if empty</span>
                            <span class="token keyword">if</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> namespace <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span>
                                <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> namespace <span class="token punctuation">]</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>

                <span class="token comment">// Specified namespace</span>
                <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span><span class="token punctuation">[</span> name<span class="token punctuation">.</span>value <span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span><span class="token punctuation">[</span> name<span class="token punctuation">.</span>value <span class="token punctuation">]</span>

                    <span class="token comment">// Remove namespace if empty</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span>
                        <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>

    <span class="token function">trigger</span><span class="token punctuation">(</span>_name<span class="token punctuation">,</span> _args<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Errors</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> _name <span class="token operator">===</span> <span class="token string">'undefined'</span> <span class="token operator">||</span> _name <span class="token operator">===</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'wrong name'</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">let</span> finalResult <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token keyword">null</span>

        <span class="token comment">// Default args</span>
        <span class="token keyword">const</span> args <span class="token operator">=</span> <span class="token operator">!</span><span class="token punctuation">(</span>_args <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> _args

        <span class="token comment">// Resolve names (should on have one event)</span>
        <span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolveNames</span><span class="token punctuation">(</span>_name<span class="token punctuation">)</span>

        <span class="token comment">// Resolve name</span>
        name <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolveName</span><span class="token punctuation">(</span>name<span class="token punctuation">[</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">)</span>

        <span class="token comment">// Default namespace</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span>namespace <span class="token operator">===</span> <span class="token string">'base'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// Try to find callback in each namespace</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">namespace</span> <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> namespace <span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> namespace <span class="token punctuation">]</span><span class="token punctuation">[</span> name<span class="token punctuation">.</span>value <span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> namespace <span class="token punctuation">]</span><span class="token punctuation">[</span> name<span class="token punctuation">.</span>value <span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span><span class="token punctuation">{</span>
                        result <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>

                        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> finalResult <span class="token operator">===</span> <span class="token string">'undefined'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                            finalResult <span class="token operator">=</span> result
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Specified namespace</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span>value <span class="token operator">===</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'wrong name'</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span> name<span class="token punctuation">.</span>namespace <span class="token punctuation">]</span><span class="token punctuation">[</span> name<span class="token punctuation">.</span>value <span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span><span class="token punctuation">{</span>
                result <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>

                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> finalResult <span class="token operator">===</span> <span class="token string">'undefined'</span><span class="token punctuation">)</span>
                    finalResult <span class="token operator">=</span> result
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> finalResult
    <span class="token punctuation">}</span>

    <span class="token function">resolveNames</span><span class="token punctuation">(</span>_names<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> names <span class="token operator">=</span> _names
        names <span class="token operator">=</span> names<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[^a-zA-Z0-9 ,/.]</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span>
        names <span class="token operator">=</span> names<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[,/]+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">)</span>
        names <span class="token operator">=</span> names<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">' '</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> names
    <span class="token punctuation">}</span>

    <span class="token function">resolveName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> newName <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">const</span> parts <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">'.'</span><span class="token punctuation">)</span>

        newName<span class="token punctuation">.</span>original  <span class="token operator">=</span> name
        newName<span class="token punctuation">.</span>value     <span class="token operator">=</span> parts<span class="token punctuation">[</span> <span class="token number">0</span> <span class="token punctuation">]</span>
        newName<span class="token punctuation">.</span>namespace <span class="token operator">=</span> <span class="token string">'base'</span> <span class="token comment">// Base namespace</span>

        <span class="token comment">// Specified namespace</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>parts<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> parts<span class="token punctuation">[</span> <span class="token number">1</span> <span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token string">''</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            newName<span class="token punctuation">.</span>namespace <span class="token operator">=</span> parts<span class="token punctuation">[</span> <span class="token number">1</span> <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> newName
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br></div></div><ul>
<li><code>constructor()</code>: 构造器，用于初始化事件回调集，其中<code>this.callbacks</code>对象将存储所有事件的回调函数</li>
<li><code>on(_names, callback)</code>: 此方法用于添加事件监听器，接受事件名<code>(_names)</code>和回调函数(callback)两个参数。此方法首先会检查参数的有效性，然后解析事件名，最后将回调函数存储到this.callbacks对象中。如果事件名包含命名空间，那么它会按照命名空间存储。此方法返回类的实例，以支持链式调用。</li>
<li><code>off(_names)</code>: 此方法用于移除事件监听器，接受一个参数，事件名<code>(_names)</code>。它会解析事件名并尝试从<code>this.callbacks</code>对象中移除对应的回调函数。此方法也返回类的实例，以支持链式调用</li>
<li><code>trigger(_name, _args):</code> 此方法用于触发某个事件，接受事件名(_name)和参数列表(_args)两个参数。此方法首先会解析事件名，然后查找并调用对应的回调函数，传入给定的参数。如果存在多个同名事件，此方法将返回最后一个事件回调函数的返回值。</li>
<li><code>resolveNames(_names):</code> 此方法用于解析事件名，接受一个参数，事件名(_names)。它会清理事件名中的非字母和数字字符，然后根据空格、逗号和斜杠分割事件名，返回一个包含所有事件名的数组。</li>
<li><code>resolveName(name)</code>: 此方法用于解析单个事件名，接受一个参数，事件名(name)。它将事件名分割为事件值和命名空间两部分，并返回一个对象，包含原始事件名，事件值和命名空间。</li>
</ul>
<h3 id="resize" tabindex="-1"><a class="header-anchor" href="#resize" aria-hidden="true">#</a> resize</h3>
<p>该类继承事件类<code>EventEmitter</code></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> EventEmitter <span class="token keyword">from</span> <span class="token string">'./EventEmitter.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Sizes</span> <span class="token keyword">extends</span> <span class="token class-name">EventEmitter</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">// Setup</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> window<span class="token punctuation">.</span>innerWidth
        <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> window<span class="token punctuation">.</span>innerHeight
        <span class="token keyword">this</span><span class="token punctuation">.</span>pixelRatio <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>devicePixelRatio<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>

        <span class="token comment">// Resize event</span>
        window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'resize'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> window<span class="token punctuation">.</span>innerWidth
            <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> window<span class="token punctuation">.</span>innerHeight
            <span class="token keyword">this</span><span class="token punctuation">.</span>pixelRatio <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>devicePixelRatio<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>

            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">'resize'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>在<code>Core</code>类中使用：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> Sizes <span class="token keyword">from</span> <span class="token string">'./Utils/Sizes.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Core</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  
  <span class="token keyword">this</span><span class="token punctuation">.</span>sizes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sizes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  <span class="token comment">// Resize event</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'resize'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    	<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'A resize occurred'</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//后续</span>
    <span class="token comment">// this.camera.resize()</span>
    <span class="token comment">// this.renderer.resize()</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><blockquote>
<p>如果直接在<code>Sizes</code>类中使用<code>window.addEventListener('resize', () =&gt;{})</code>，并在Experience类中直接实例化调用的话，虽然也可以实现功能，但是如果有其他类或者函数也需要使用到窗口尺寸变化的事件，就需要重复编写获取和更新窗口尺寸的逻辑，这会增加代码的冗余性。</p>
<p>此外，<code>EventEmitter</code>还提供了许多有用的方法，例如可以同时添加多个监听器，可以移除监听器，可以一次触发多个事件等，这些在直接使用<code>window.addEventListener('resize', () =&gt;{})</code>是不具备的</p>
</blockquote>
<h3 id="time" tabindex="-1"><a class="header-anchor" href="#time" aria-hidden="true">#</a> Time</h3>
<p>另一个非常有用的类是处理时间的类。这个类的工作方式有点像Three.js的<a href="https://threejs.org/docs/#api/en/core/Clock" target="_blank" rel="noopener noreferrer">Clock</a>类。
该类保存了：</p>
<ul>
<li>当前时间</li>
<li>the elapsed time  经过的时间</li>
<li>当前帧与上一帧之间的增量时间</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> EventEmitter <span class="token keyword">from</span> <span class="token string">'./EventEmitter.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Time</span> <span class="token keyword">extends</span> <span class="token class-name">EventEmitter</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">// Setup</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>start <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>start
        <span class="token keyword">this</span><span class="token punctuation">.</span>elapsed <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>delta <span class="token operator">=</span> <span class="token number">16</span> <span class="token comment">//自上一帧以来花费的时间，16这接近两帧之间以 60fps 的速度有多少毫秒</span>

        window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//毫秒为单位</span>
        <span class="token keyword">const</span> currentTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>delta <span class="token operator">=</span> currentTime <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>current
        <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> currentTime
        <span class="token keyword">this</span><span class="token punctuation">.</span>elapsed <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>start

        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">'tick'</span><span class="token punctuation">)</span>

        window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>该类还将在每个帧上触发一个事件，以便我们可以侦听该事件并更新整个Core类</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> sizes <span class="token keyword">from</span> <span class="token string">'./Utils/Sizes.js'</span>
<span class="token keyword">import</span> time <span class="token keyword">from</span> <span class="token string">'./Utils/Sizes.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Core</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">{</span>
  	<span class="token comment">// ...</span>
  
  	<span class="token comment">// Setup</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>time <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Time</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  	<span class="token comment">// Time tick event</span>
  	<span class="token keyword">this</span><span class="token punctuation">.</span>time<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'tick'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//后续</span>
        <span class="token comment">// this.camera.update()</span>
        <span class="token comment">// this.world.update()</span>
        <span class="token comment">// this.renderer.update()</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="_2-核心类封装" tabindex="-1"><a class="header-anchor" href="#_2-核心类封装" aria-hidden="true">#</a> [2]核心类封装</h2>
<h3 id="scene" tabindex="-1"><a class="header-anchor" href="#scene" aria-hidden="true">#</a> scene</h3>
<p>scene就不建一个类来封装了，直接在Core类中初始化，因为后续需要传递给其他类使用</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span>

<span class="token comment">// ...</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Core</span><span class="token punctuation">{</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// ...</span>
  	<span class="token keyword">this</span><span class="token punctuation">.</span>scene <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">Scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// ...</span>
	<span class="token punctuation">}</span>

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="camera" tabindex="-1"><a class="header-anchor" href="#camera" aria-hidden="true">#</a> camera</h3>
<p>对于相机，可以创建一个单独的类来拆分存放相关的代码，这里的相机类主要包含了透视投影相机，相机控制器，相机参数的resize、控制器的update</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Camera</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后再主类中导入实例化：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span>

<span class="token comment">// ...</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Experience</span><span class="token punctuation">{</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// ...</span>

  	<span class="token keyword">this</span><span class="token punctuation">.</span>sizes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sizes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  	<span class="token keyword">this</span><span class="token punctuation">.</span>time <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Time</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  	<span class="token keyword">this</span><span class="token punctuation">.</span>scene <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">Scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Camera</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// ...</span>
	<span class="token punctuation">}</span>

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>因为在相机类中我们需要实例化 <code>PerspectiveCamera </code>和 <code>OrbitControls</code> 类。但是这些额外的类需要像 <code>width</code> 和 这样的 <code>height</code>，这也就意味着需要访问主类<code>Core</code>的变量（属性）
这里有三种方式可以实现传递<code>width</code>和<code>height</code>：</p>
<ul>
<li>从全局变量中访问</li>
<li>通过参数传递</li>
<li>使用单例</li>
</ul>
<p>下面进行分别举例使用：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">/*从全局变量中访问，将Experience上下文添加到window全局对象中*/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Core</span><span class="token punctuation">{</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// ...</span>

  	window<span class="token punctuation">.</span>experience <span class="token operator">=</span> <span class="token keyword">this</span>

		<span class="token comment">// ...</span>
	<span class="token punctuation">}</span>

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
<span class="token comment">//这样就可以直接在相机类中使用了</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Camera</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>experience <span class="token operator">=</span> window<span class="token punctuation">.</span>experience
    
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>experience<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><blockquote>
<p>一般不推荐使用window全局变量的方式</p>
</blockquote>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">/*通过构造参数传递*/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Core</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    
    <span class="token keyword">this</span><span class="token punctuation">.</span>camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Camera</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    
    <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
  
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Camera</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>experience<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>experience <span class="token operator">=</span> experience
    
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>experience<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><blockquote>
<p>此解决方案是一个很好的解决方案’</p>
</blockquote>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">/*通过构造单例模式（无论你构造多少个主类，只有第一个是真实的实例。所有其他实例化也将返回第一个实例。*/</span>
<span class="token comment">// ...</span>

<span class="token keyword">let</span> instance <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Core</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// Singleton</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">{</span>
    	<span class="token keyword">return</span> instance
    <span class="token punctuation">}</span>
    instance <span class="token operator">=</span> <span class="token keyword">this</span>
  
  <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">//使用</span>
<span class="token keyword">import</span> Experience <span class="token keyword">from</span> <span class="token string">'./Experience.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Camera</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>experience <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Experience</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>experience<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><blockquote>
<p>这种方式也挺不错的</p>
</blockquote>
<p>然后接着完成camera类：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span>
<span class="token keyword">import</span> Experience <span class="token keyword">from</span> <span class="token string">'./Experience.js'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> OrbitControls <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'three/examples/jsm/controls/OrbitControls.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Camera</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>experience <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Experience</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sizes <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>experience<span class="token punctuation">.</span>sizes
        <span class="token keyword">this</span><span class="token punctuation">.</span>scene <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>experience<span class="token punctuation">.</span>scene
        <span class="token keyword">this</span><span class="token punctuation">.</span>canvas <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>experience<span class="token punctuation">.</span>canvas

        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//创建透视投影相机并将其存为一个instance实例</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setControls</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//相机轨道控制器</span>
    <span class="token punctuation">}</span>

    <span class="token function">setInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">PerspectiveCamera</span><span class="token punctuation">(</span><span class="token number">35</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span>height<span class="token punctuation">,</span> <span class="token number">0.1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">setControls</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>controls <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrbitControls</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>canvas<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>controls<span class="token punctuation">.</span>enableDamping <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>

    <span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>aspect <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span>height
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span><span class="token function">updateProjectionMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>controls<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>这个<code>resize(</code>)方法和<code>update()</code>方法在主类中进行调用</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Experience</span><span class="token punctuation">{</span>
 	 <span class="token comment">//...</span>
		<span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      	<span class="token comment">// 后续</span>
        <span class="token comment">// this.renderer.resize()</span>
    <span class="token punctuation">}</span>

    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 后续</span>
        <span class="token comment">// this.world.update()</span>
        <span class="token comment">// this.renderer.update()</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="renderer" tabindex="-1"><a class="header-anchor" href="#renderer" aria-hidden="true">#</a> renderer</h3>
<p>将渲染相关的代码拆分为一个Renderer类，主要包含了renderer实例的创建、resize、update：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span>
<span class="token keyword">import</span> Core <span class="token keyword">from</span> <span class="token string">'./Core.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Renderer</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>core <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Core</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>canvas <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>core<span class="token punctuation">.</span>canvas
        <span class="token keyword">this</span><span class="token punctuation">.</span>sizes <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>core<span class="token punctuation">.</span>sizes
        <span class="token keyword">this</span><span class="token punctuation">.</span>scene <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>core<span class="token punctuation">.</span>scene
        <span class="token keyword">this</span><span class="token punctuation">.</span>camera <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>core<span class="token punctuation">.</span>camera

        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//创建render实例对象</span>
    <span class="token punctuation">}</span>

    <span class="token function">setInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">WebGLRenderer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            canvas<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>canvas<span class="token punctuation">,</span>
            antialias<span class="token operator">:</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>physicallyCorrectLights <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>outputEncoding <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>sRGBEncoding
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>toneMapping <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>CineonToneMapping
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>toneMappingExposure <span class="token operator">=</span> <span class="token number">1.75</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>shadowMap<span class="token punctuation">.</span>enabled <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span>shadowMap<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>PCFSoftShadowMap
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span><span class="token function">setClearColor</span><span class="token punctuation">(</span><span class="token string">'#211d20'</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span>width<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span>height<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span><span class="token function">setPixelRatio</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span>pixelRatio<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span>width<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span>height<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span><span class="token function">setPixelRatio</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span>pixelRatio<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>instance<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>scene<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>camera<span class="token punctuation">.</span>instance<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>在主类中实例化与调用：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// ...</span>

<span class="token keyword">import</span> Renderer <span class="token keyword">from</span> <span class="token string">'./Renderer.js'</span>

<span class="token comment">// ...</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Core</span><span class="token punctuation">{</span>
  	<span class="token function">constructor</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">{</span>
  		<span class="token comment">// ...</span>
  
  		<span class="token keyword">this</span><span class="token punctuation">.</span>renderer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Renderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
 	 		<span class="token comment">// ...</span>
  	<span class="token punctuation">}</span>

  	<span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>renderer<span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>renderer<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="_3-world" tabindex="-1"><a class="header-anchor" href="#_3-world" aria-hidden="true">#</a> [3]World</h2>
<p>到此为止我们的场景中仍然没有任何东西，这里推荐构建一个world文件夹并在其中创建一个 World 类：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> Core <span class="token keyword">from</span> <span class="token string">'../core.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">World</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>core <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Core</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>scene <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>core<span class="token punctuation">.</span>scene<span class="token comment">//获取scene</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>使用</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> World <span class="token keyword">from</span> <span class="token string">'./World/World.js'</span>

<span class="token comment">// ...</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Experience</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">{</span>
  	<span class="token comment">// ...</span>
  
  	<span class="token keyword">this</span><span class="token punctuation">.</span>world <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">World</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  	<span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>该world用来放置要添加到scene中的所以三维物体、环境、光照等</p>
<h3 id="environment" tabindex="-1"><a class="header-anchor" href="#environment" aria-hidden="true">#</a> Environment</h3>
<p>在world文件夹下创建environment.js，主要用来存放实现场景中的灯光、环境贴图</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> Experience <span class="token keyword">from</span> <span class="token string">'../Experience.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Environment</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>experience <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Experience</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>scene <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>experience<span class="token punctuation">.</span>scene

    <span class="token comment">// Setup</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setSunLight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//灯光</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setEnvironmentMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//环境贴图</span>
  <span class="token punctuation">}</span>

  <span class="token comment">//添加光照，这里模拟太阳光</span>
  <span class="token function">setSunLight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sunLight <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">DirectionalLight</span><span class="token punctuation">(</span><span class="token string">'#ffffff'</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sunLight<span class="token punctuation">.</span>castShadow <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sunLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>camera<span class="token punctuation">.</span>far <span class="token operator">=</span> <span class="token number">15</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sunLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>mapSize<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sunLight<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>normalBias <span class="token operator">=</span> <span class="token number">0.05</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sunLight<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span> <span class="token number">2.25</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sunLight<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">setEnvironmentMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>environmentMap <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>environmentMap<span class="token punctuation">.</span>intensity <span class="token operator">=</span> <span class="token number">0.4</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>environmentMap<span class="token punctuation">.</span>texture <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>resources<span class="token punctuation">.</span>items<span class="token punctuation">.</span>environmentMapTexture
        <span class="token keyword">this</span><span class="token punctuation">.</span>environmentMap<span class="token punctuation">.</span>texture<span class="token punctuation">.</span>encoding <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>sRGBEncoding
  
        <span class="token keyword">this</span><span class="token punctuation">.</span>scene<span class="token punctuation">.</span>environment <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>environmentMap<span class="token punctuation">.</span>texture

        <span class="token comment">/*如果不添加将不起作用上面的换贴图，因为环境贴图是在添加物体之后添加的，所以需要遍历场景中物体的材料需要更新*/</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>environmentMap<span class="token punctuation">.</span><span class="token function-variable function">updateMaterials</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>scene<span class="token punctuation">.</span><span class="token function">traverse</span><span class="token punctuation">(</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>child <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span>Mesh <span class="token operator">&amp;&amp;</span> child<span class="token punctuation">.</span>material <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span>MeshStandardMaterial<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    child<span class="token punctuation">.</span>material<span class="token punctuation">.</span>envMap <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>environmentMap<span class="token punctuation">.</span>texture
                    child<span class="token punctuation">.</span>material<span class="token punctuation">.</span>envMapIntensity <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>environmentMap<span class="token punctuation">.</span>intensity
                    child<span class="token punctuation">.</span>material<span class="token punctuation">.</span>needsUpdate <span class="token operator">=</span> <span class="token boolean">true</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>environmentMap<span class="token punctuation">.</span><span class="token function">updateMaterials</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><p>然后再World类中实例化：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// ...</span>
<span class="token keyword">import</span> Environment <span class="token keyword">from</span> <span class="token string">'./Environment.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">World</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    	<span class="token comment">// ...</span>
    
     	<span class="token comment">// Setup</span>
    	<span class="token keyword">this</span><span class="token punctuation">.</span>environment <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Environment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="resources" tabindex="-1"><a class="header-anchor" href="#resources" aria-hidden="true">#</a> Resources</h3>
<p>Resources用于将我们所需要的加载器放到一块，方便管理
我们只需要再实例化时传递一个source描述对象即可完成所以资源的加载于，一旦加载完成所有的source，还可以触发一个事件</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> GLTFLoader <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'three/examples/jsm/loaders/GLTFLoader.js'</span>
<span class="token keyword">import</span> EventEmitter <span class="token keyword">from</span> <span class="token string">'./EventEmitter.js'</span>

<span class="token comment">//因为后续需要触发事件，所以继承于EventEmitter来实现</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Resources</span> <span class="token keyword">extends</span> <span class="token class-name">EventEmitter</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span>sources<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>sources <span class="token operator">=</span> sources

        <span class="token keyword">this</span><span class="token punctuation">.</span>items <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token comment">//要加载的sources</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>toLoad <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sources<span class="token punctuation">.</span>length
        <span class="token keyword">this</span><span class="token punctuation">.</span>loaded <span class="token operator">=</span> <span class="token number">0</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setLoaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">startLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  	<span class="token comment">/*根据项目需要的loader创建*/</span>
    <span class="token function">setLoaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>loaders <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>loaders<span class="token punctuation">.</span>gltfLoader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GLTFLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>loaders<span class="token punctuation">.</span>textureLoader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">TextureLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>loaders<span class="token punctuation">.</span>cubeTextureLoader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">CubeTextureLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/**
     * 遍历 sources 数组并使用相应的加载器加载它们
     */</span>
    <span class="token function">startLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Load each source</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> source <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sources<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'gltfModel'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>loaders<span class="token punctuation">.</span>gltfLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>
                    source<span class="token punctuation">.</span>path<span class="token punctuation">,</span>
                    <span class="token punctuation">(</span>file<span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
                        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sourceLoaded</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> file<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'texture'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>loaders<span class="token punctuation">.</span>textureLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>
                    source<span class="token punctuation">.</span>path<span class="token punctuation">,</span>
                    <span class="token punctuation">(</span>file<span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
                        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sourceLoaded</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> file<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'cubeTexture'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>loaders<span class="token punctuation">.</span>cubeTextureLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>
                    source<span class="token punctuation">.</span>path<span class="token punctuation">,</span>
                    <span class="token punctuation">(</span>file<span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
                        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sourceLoaded</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> file<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/**
     * 保存属性中的加载资源,更新 items loaded 属性并测试加载是否完成
     * 如果加载了所有源，我们将触发一个 ready 事件
     * @param {*} source 
     * @param {*} file 
     */</span>
    <span class="token function">sourceLoaded</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> file<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">[</span>source<span class="token punctuation">.</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> file

        <span class="token keyword">this</span><span class="token punctuation">.</span>loaded<span class="token operator">++</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>loaded <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>toLoad<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">'ready'</span><span class="token punctuation">)</span> 
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br></div></div><p>实例化调用</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code> <span class="token comment">// ...</span>

<span class="token keyword">import</span> Resources <span class="token keyword">from</span> <span class="token string">'./Utils/Resources.js'</span>
<span class="token keyword">import</span> sources <span class="token keyword">from</span> <span class="token string">'./sources.js'</span>


<span class="token comment">// ...</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Core</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">{</span>
     <span class="token comment">// ...</span>

      <span class="token keyword">this</span><span class="token punctuation">.</span>scene <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">Scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>resources <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Resources</span><span class="token punctuation">(</span>sources<span class="token punctuation">)</span>

    <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>资源描述对象：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">//sources.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">'environmentMapTexture'</span><span class="token punctuation">,</span>
        type<span class="token operator">:</span> <span class="token string">'cubeTexture'</span><span class="token punctuation">,</span>
        path<span class="token operator">:</span>
        <span class="token punctuation">[</span>
            <span class="token string">'textures/environmentMap/px.jpg'</span><span class="token punctuation">,</span>
            <span class="token string">'textures/environmentMap/nx.jpg'</span><span class="token punctuation">,</span>
            <span class="token string">'textures/environmentMap/py.jpg'</span><span class="token punctuation">,</span>
            <span class="token string">'textures/environmentMap/ny.jpg'</span><span class="token punctuation">,</span>
            <span class="token string">'textures/environmentMap/pz.jpg'</span><span class="token punctuation">,</span>
            <span class="token string">'textures/environmentMap/nz.jpg'</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">'grassColorTexture'</span><span class="token punctuation">,</span>
        type<span class="token operator">:</span> <span class="token string">'texture'</span><span class="token punctuation">,</span>
        path<span class="token operator">:</span> <span class="token string">'textures/dirt/color.jpg'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">'grassNormalTexture'</span><span class="token punctuation">,</span>
        type<span class="token operator">:</span> <span class="token string">'texture'</span><span class="token punctuation">,</span>
        path<span class="token operator">:</span> <span class="token string">'textures/dirt/normal.jpg'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">'foxModel'</span><span class="token punctuation">,</span>
        type<span class="token operator">:</span> <span class="token string">'gltfModel'</span><span class="token punctuation">,</span>
        path<span class="token operator">:</span> <span class="token string">'models/Fox/glTF/Fox.gltf'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><blockquote>
<ul>
<li>name ：将用于检索加载的资源</li>
<li>type ：使用什么加载器类型</li>
<li>path ：要加载的文件的路径</li>
</ul>
</blockquote>
<p>再World中执行加载完成回调：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">//...</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">World</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>resources <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>core<span class="token punctuation">.</span>resources

        <span class="token comment">//监听加载完成事件</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>resources<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'ready'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token comment">// Setup</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>environment <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Environment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>fox<span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>fox<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>floor
可以参照这种方式来往scene中添加三维物体的（先再source.js中添加资源描述字段），清晰明了，没什么可说的</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span>
<span class="token keyword">import</span> Core <span class="token keyword">from</span> <span class="token string">'../core.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Floor</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>core <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Core</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>scene <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>experience<span class="token punctuation">.</span>scene
        <span class="token keyword">this</span><span class="token punctuation">.</span>resources <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>experience<span class="token punctuation">.</span>resources

        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setGeometry</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setTextures</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setMaterial</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setMesh</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">setGeometry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>geometry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">CircleGeometry</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">setTextures</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>textures <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>textures<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>resources<span class="token punctuation">.</span>items<span class="token punctuation">.</span>grassColorTexture
        <span class="token keyword">this</span><span class="token punctuation">.</span>textures<span class="token punctuation">.</span>color<span class="token punctuation">.</span>encoding <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>sRGBEncoding
        <span class="token keyword">this</span><span class="token punctuation">.</span>textures<span class="token punctuation">.</span>color<span class="token punctuation">.</span>repeat<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1.5</span><span class="token punctuation">,</span> <span class="token number">1.5</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>textures<span class="token punctuation">.</span>color<span class="token punctuation">.</span>wrapS <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>RepeatWrapping
        <span class="token keyword">this</span><span class="token punctuation">.</span>textures<span class="token punctuation">.</span>color<span class="token punctuation">.</span>wrapT <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>RepeatWrapping

        <span class="token keyword">this</span><span class="token punctuation">.</span>textures<span class="token punctuation">.</span>normal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>resources<span class="token punctuation">.</span>items<span class="token punctuation">.</span>grassNormalTexture
        <span class="token keyword">this</span><span class="token punctuation">.</span>textures<span class="token punctuation">.</span>normal<span class="token punctuation">.</span>repeat<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1.5</span><span class="token punctuation">,</span> <span class="token number">1.5</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>textures<span class="token punctuation">.</span>normal<span class="token punctuation">.</span>wrapS <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>RepeatWrapping
        <span class="token keyword">this</span><span class="token punctuation">.</span>textures<span class="token punctuation">.</span>normal<span class="token punctuation">.</span>wrapT <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>RepeatWrapping
    <span class="token punctuation">}</span>

    <span class="token function">setMaterial</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">MeshStandardMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            map<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>textures<span class="token punctuation">.</span>color<span class="token punctuation">,</span>
            normalMap<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>textures<span class="token punctuation">.</span>normal
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">setMesh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>mesh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">Mesh</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>geometry<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>material<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>mesh<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">0.5</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>mesh<span class="token punctuation">.</span>receiveShadow <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>mesh<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><h3 id="fox" tabindex="-1"><a class="header-anchor" href="#fox" aria-hidden="true">#</a> fox</h3>
<p>这里添加一个带动画的模型，同样首先添加相应的资源描述对象
然后在World文件夹下创建Fox类：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span>
<span class="token keyword">import</span> Core <span class="token keyword">from</span> <span class="token string">'../Core.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Fox</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>core <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Core</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>scene <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>core<span class="token punctuation">.</span>scene
        <span class="token keyword">this</span><span class="token punctuation">.</span>resources <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>core<span class="token punctuation">.</span>resources
        <span class="token keyword">this</span><span class="token punctuation">.</span>time <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>core<span class="token punctuation">.</span>time
        <span class="token keyword">this</span><span class="token punctuation">.</span>debug <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>core<span class="token punctuation">.</span>debug

      <span class="token comment">//后续</span>
        <span class="token comment">// Debug</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>debug<span class="token punctuation">.</span>active<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>debugFolder <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>debug<span class="token punctuation">.</span>ui<span class="token punctuation">.</span><span class="token function">addFolder</span><span class="token punctuation">(</span><span class="token string">'fox'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Resource</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>resource <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>resources<span class="token punctuation">.</span>items<span class="token punctuation">.</span>foxModel

        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAnimation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//模型动画</span>
    <span class="token punctuation">}</span>

    <span class="token function">setModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>model <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>resource<span class="token punctuation">.</span>scene
        <span class="token keyword">this</span><span class="token punctuation">.</span>model<span class="token punctuation">.</span>scale<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">0.02</span><span class="token punctuation">,</span> <span class="token number">0.02</span><span class="token punctuation">,</span> <span class="token number">0.02</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>model<span class="token punctuation">)</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>model<span class="token punctuation">.</span><span class="token function">traverse</span><span class="token punctuation">(</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>child <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span>Mesh<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                child<span class="token punctuation">.</span>castShadow <span class="token operator">=</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">setAnimation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>animation <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        
        <span class="token comment">// Mixer</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>mixer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span><span class="token function">AnimationMixer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>model<span class="token punctuation">)</span>
        
        <span class="token comment">// Actions</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>actions <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        
        <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>actions<span class="token punctuation">.</span>idle <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>mixer<span class="token punctuation">.</span><span class="token function">clipAction</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resource<span class="token punctuation">.</span>animations<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>actions<span class="token punctuation">.</span>walking <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>mixer<span class="token punctuation">.</span><span class="token function">clipAction</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resource<span class="token punctuation">.</span>animations<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>actions<span class="token punctuation">.</span>running <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>mixer<span class="token punctuation">.</span><span class="token function">clipAction</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resource<span class="token punctuation">.</span>animations<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        
        <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>actions<span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>actions<span class="token punctuation">.</span>idle
        <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>actions<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">// Play the action</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span><span class="token function-variable function">play</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token keyword">const</span> newAction <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>actions<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
            <span class="token keyword">const</span> oldAction <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>actions<span class="token punctuation">.</span>current

            newAction<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            newAction<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            newAction<span class="token punctuation">.</span><span class="token function">crossFadeFrom</span><span class="token punctuation">(</span>oldAction<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

            <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>actions<span class="token punctuation">.</span>current <span class="token operator">=</span> newAction
        <span class="token punctuation">}</span>

        <span class="token comment">// Debug</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>debug<span class="token punctuation">.</span>active<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">const</span> debugObject <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token function-variable function">playIdle</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token string">'idle'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token function-variable function">playWalking</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token string">'walking'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token function-variable function">playRunning</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token string">'running'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>debugFolder<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>debugObject<span class="token punctuation">,</span> <span class="token string">'playIdle'</span><span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>debugFolder<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>debugObject<span class="token punctuation">,</span> <span class="token string">'playWalking'</span><span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>debugFolder<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>debugObject<span class="token punctuation">,</span> <span class="token string">'playRunning'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span>mixer<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>time<span class="token punctuation">.</span>delta <span class="token operator">*</span> <span class="token number">0.001</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br></div></div><p>然后在World 类中实例化调用</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> Fox <span class="token keyword">from</span> <span class="token string">'./Fox.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">World</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  
    <span class="token keyword">this</span><span class="token punctuation">.</span>resources<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'ready'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token comment">// Setup</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>floor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Floor</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>fox <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Fox</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>environment <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Environment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
	<span class="token comment">//后续（模型动画）</span>
  <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>fox<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>fox<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="_4-debug" tabindex="-1"><a class="header-anchor" href="#_4-debug" aria-hidden="true">#</a> [4]Debug</h2>
<p>可以将dat.gui调试相关的代码封装成一个类使用，在Debug类中暂时只创建dat.GUI类</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> dat <span class="token keyword">from</span> <span class="token string">'lil-gui'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Debug</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>ui <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">dat</span><span class="token punctuation">.</span><span class="token constant">GUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>然后在Core类中任何其他类之前实例化它：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// ...</span>

<span class="token keyword">import</span> Debug <span class="token keyword">from</span> <span class="token string">'./Utils/Debug.js'</span>

<span class="token comment">// ...</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Experience</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
      
      <span class="token comment">// Setup</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>debug <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Debug</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>sizes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sizes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>time <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Time</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>然后只需要在相应的需要需要添加调试的三维物体或者环境中添加相应的调试目录即可，例如：
调试fox模型</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Fox</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
      
      <span class="token keyword">this</span><span class="token punctuation">.</span>debug <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>experience<span class="token punctuation">.</span>debug
      
      <span class="token comment">// Debug</span>
      <span class="token keyword">const</span> debugObject <span class="token operator">=</span> <span class="token punctuation">{</span>
          <span class="token function-variable function">playIdle</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token string">'idle'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">playWalking</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token string">'walking'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">playRunning</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>animation<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token string">'running'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      
      <span class="token keyword">this</span><span class="token punctuation">.</span>debugFolder <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>debug<span class="token punctuation">.</span>ui<span class="token punctuation">.</span><span class="token function">addFolder</span><span class="token punctuation">(</span><span class="token string">'fox'</span><span class="token punctuation">)</span> 
      <span class="token keyword">this</span><span class="token punctuation">.</span>debugFolder<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>debugObject<span class="token punctuation">,</span> <span class="token string">'playIdle'</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>debugFolder<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>debugObject<span class="token punctuation">,</span> <span class="token string">'playWalking'</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>debugFolder<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>debugObject<span class="token punctuation">,</span> <span class="token string">'playRunning'</span><span class="token punctuation">)</span>
      
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>调试环境相关：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// ...</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Environment</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        
        <span class="token keyword">this</span><span class="token punctuation">.</span>debug <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>experience<span class="token punctuation">.</span>debug
        
        <span class="token comment">// Debug</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>debugFolder <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>debug<span class="token punctuation">.</span>ui<span class="token punctuation">.</span><span class="token function">addFolder</span><span class="token punctuation">(</span><span class="token string">'environment'</span><span class="token punctuation">)</span>

    
    		<span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="_5-销毁场景中所有的物体" tabindex="-1"><a class="header-anchor" href="#_5-销毁场景中所有的物体" aria-hidden="true">#</a> [5]销毁场景中所有的物体</h2>
<p>在scene中通常使用<code>traverse()</code> 函数来遍历场景中的物体</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Experience</span><span class="token punctuation">{</span>
  

	<span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sizes<span class="token punctuation">.</span><span class="token function">off</span><span class="token punctuation">(</span><span class="token string">'resize'</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>time<span class="token punctuation">.</span><span class="token function">off</span><span class="token punctuation">(</span><span class="token string">'tick'</span><span class="token punctuation">)</span>

        <span class="token comment">// 遍历场景中所有的东西</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>scene<span class="token punctuation">.</span><span class="token function">traverse</span><span class="token punctuation">(</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token comment">// 判断是否为mesh</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>child <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token constant">THREE</span></span><span class="token punctuation">.</span>Mesh<span class="token punctuation">)</span><span class="token punctuation">{</span>
                child<span class="token punctuation">.</span>geometry<span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//释放</span>
                <span class="token comment">//遍历每个mesh相应的material</span>
                <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> child<span class="token punctuation">.</span>material<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token keyword">const</span> value <span class="token operator">=</span> child<span class="token punctuation">.</span>material<span class="token punctuation">[</span>key<span class="token punctuation">]</span>

                    <span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> value<span class="token punctuation">.</span>dispose <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        value<span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      	
        <span class="token keyword">this</span><span class="token punctuation">.</span>camera<span class="token punctuation">.</span>controls<span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>renderer<span class="token punctuation">.</span>instance<span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">//释放控件</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>debug<span class="token punctuation">.</span>ui<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><blockquote>
<p>本文部分内容为Three.js Journey课程的学习笔记</p>
</blockquote>
</template>
