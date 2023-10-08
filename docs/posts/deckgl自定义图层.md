---
layout: Post
title:  deckGL自定义图层学习笔记
date: 2023-04-28
useHeaderImage: true
headerImage: https://img-blog.csdnimg.cn/cda3d068f2084f92a4f172ee36e13bfd.png
tags:
  - deckgl
---

[[toc]]



## 1.自定义图层
![在这里插入图片描述](https://img-blog.csdnimg.cn/cda3d068f2084f92a4f172ee36e13bfd.png)


当使用DeckGL提供的图层还无法满足需求时`（https://deck.gl/docs/api-reference/layers）`，可能就需要自定义图层了。在DeckGL中有常见的三种自定义图层的方式

- 创建复合层（composite layers.）——复合层是一种可以创建其他层的特殊层
- 子类层（Subclass a layer）——子类层是通过子类化其他层创建的新层。这允许开发人员重用现有层的所有接口和实现
- 从0开始构建图层层——也就是使用WebGL自定义绘制图层绘制，这就意味着你可以完全控制图层生命周期，可以管理自己的模型并直接操作 WebGL 上下文，当然难度也是最大的..（感觉上面两个应用场景也不少了随着DeckGL的版本的升级提供了挺多常用的layer）

### [1]图层的生命周期

为了理解每个 deck.gl Layer的子类都可以定义在其生命周期中的特定点调用的特定方法

-  **initializeState** - 对于刚刚添加的layer进行初始化时（初始化进发生一次），该`[layer.updateState()](https://deck.gl/docs/api-reference/core/layer#updatestate)`生命周期函数将会被调用 
-  **Updating**-layer发生变化（如修改属性、数据等）时调用 `layer.shouldUpdateState()` 以确定图层是否需要更新。 
   - 如果确实需要更新则在Layer渲染前调用 `layer.updateState()` ，通常在这一阶段通过调用`[state.attributeManager.invalidate](https://deck.gl/docs/api-reference/core/attribute-manager#invalidate)` 来重新计算`attribute` 和调用`model.setUniforms`来更新`uniforms` 变量/默认情况下，当 props.data 更改时，所有attribute都会失效并重新计算
-  **Rendering** - 渲染发生在每个渲染周期，将图层绘制到 WebGL 上下文。 
   - 对于primitive layers, `[layer.draw()](https://deck.gl/docs/api-reference/core/layer#draw)`函数在此阶段将被调用
-  **Picking** - 当指针移过或单击 deck.gl 画布时发生 
   - 拾取图层时，将调用 `layer.getPickingInfo()` 以生成有关已拾取内容的信息对象。然后将此对象传递给图层的 onHover 或 onClick 回调。
-  **Finalization** - 发生在每个被移除的层上，即来自上一个渲染周期的层，其 id 与当前周期中的任何层都不匹配。 layer.finalizeState() 在对该层的状态的引用被释放之前被调用 

### [2]复合层

复合层是一种特殊的图层，可以通过组合现有层来构建新的层（**顾名思义：通过组合多个层来构成一个层**）如`GeoJsonLayer`就是复合层

复合层中分为适配层`Adaptor Layers`和集合层`Collection Layers`

**定义一个继承于CompositeLayer的layer**

#### Adaptor Layers

使用复合“适配”层更改现有层的接口和行为通常很方便，而不是修改层本身（例如 S2Layer 是 PolygonLayer 之上的简单适配层）

简单的说也就是，根据现有层添加一些适配（如数据）

对于复合层主要的意义我估计就是使用相同的数据，来给原来的多个层使用渲染，然后组合为一个层

应用举例：

- LASPointCloudLayer为Adaptor Layers的适配层
- TopoJSONLayer为GeoJsonLayer的适配层
- [TextLayer](https://deck.gl/docs/api-reference/layers/text-layer), [HexagonLayer](https://deck.gl/docs/api-reference/aggregation-layers/hexagon-layer), [CPUGridLayer](https://deck.gl/docs/api-reference/aggregation-layers/cpu-grid-layer) 等都为composite "adapter" layers.

#### Collection Layers

通常，一些复杂的可视化层是由使用一组具有通用属性的多个层合成的。例如：

- 例如NodeLayer图层由ScatterplotLayer、TextLayer组合而成
- [GeoJsonLayer](https://deck.gl/docs/api-reference/layers/geojson-layer) 、[PolygonLayer](https://deck.gl/docs/api-reference/layers/polygon-layer) 为集合层

创建一个集合层的优势：

- 可以将处理特定数据格式或可视化配置的复杂代码收集到一个类中
- 通过跨层共享相同的对象/缓冲区来提高内存使用率。复合层将管理数据源并将其向下传递给多个层，而不是每个子层加载和存储自己的原始数据副本。

例如：实现一个有icon和text的layer（通过组合IconLayer和TextLayer）

```javascript
import {CompositeLayer, IconLayer, TextLayer} from 'deck.gl';

class LabeledIconLayer extends CompositeLayer {
   //一个组合图层需要实现renderLayers()方法并返回一个子图层数组
    renderLayers() {
        return [
          new IconLayer({
            //由于复合层不直接绘制到画布上，它通过设置其子层的props来控制渲染结果，而且子图层并不知道复合图层的，所以需要将复合图层的props映射到子图层相应的props
              id: `${this.props.id}-icon`,
              data: this.props.data,

              iconAtlas: this.props.iconAtlas,
              iconMapping: this.props.iconMapping,

              getPosition: this.props.getPosition,
              getIcon: this.props.getIcon,
              getSize: this.props.getIconSize,
              getColor: this.props.getIconColor
              //为了在需要重新计算访问器时使 updateTriggers 起作用
              updateTriggers: {
                  getPosition: this.props.updateTriggers.getPosition,
                  getIcon: this.props.updateTriggers.getIcon,
                  getSize: this.props.updateTriggers.getIconSize,
                  getColor: this.props.updateTriggers.getIconColor
          	 }
          }),
          //由于复合层不直接绘制到画布上，它通过设置其子层的 props 来控制渲染结果
          new TextLayer({
            id: `${this.props.id}-label`,
            data: this.props.data,

            fontFamily: this.props.fontFamily,
            fontWeight: this.props.fontWeight,

            getPosition: this.props.getPosition,
            getText: this.props.getText,
            getSize: this.props.getTextSize
            getColor: this.props.getTextColor
            //为了在需要重新计算访问器时使 updateTriggers 起作用
            updateTriggers: {
              getPosition: this.props.updateTriggers.getPosition,
              getText: this.props.updateTriggers.getText,
              getSize: this.props.updateTriggers.getTextSize,
              getColor: this.props.updateTriggers.getTextColor
            }
          })
        ];
  	}
    
}
LabeledIconLayer.layerName = 'LabeledIconLayer';
//定义组合图层属性
LabeledIconLayer.defaultProps = {
  // Shared accessors
  getPosition: {type: 'accessor', value: x => x.position},
  // Icon properties
  iconAtlas: null,
  iconMapping: {type: 'object', value: {}, async: true},
  // Icon accessors
  getIcon: {type: 'accessor', value: x => x.icon},
  getIconSize: {type: 'accessor', value: 20},
  getIconColor: {type: 'accessor', value: [0, 0, 0, 255]},
  // Text properties
  fontFamily: DEFAULT_FONT_FAMILY,
  fontWeight: DEFAULT_FONT_WEIGHT,
  // Text accessors
  getText: {type: 'accessor', value: x => x.text},
  getTextSize: {type: 'accessor', value: 12}
  getTextColor: {type: 'accessor', value: [0, 0, 0, 255]}
}
```

> 子层 id 必须根据其父层的 id 动态生成，否则当有多个 LabeledIconLayers 实例时，它们的子层 id 将发生冲突。


例如还可以实现`labeldGeoJsonLayer`

#### 小结
构建复合层的通用步骤为（和SubClass差不多）

-  定义面向用户的`api`（继承你要使用的图层的`defaultProps`，然后自定义添加一些而外的`props`）
定义`renderLayers()`渲染逻辑，因为`CompositeLayer`并不是开箱即用的层，而是需要使用`renderLayers()`来组合其他层的渲染逻辑 
-  数据装换（通常想要渲染的数据和`Layer`要求的数据格式是不一样的），那么就可以需要使用`CompositeLayer`的数据解析逻辑“适配”你的数据格式，使用`CompositeLayer`的另外的好处是它允许多个子层共享同一个数据集，这就大程度的提升了数据传输性能。 
   - 使用钩子函数`updateState()`来处理当数据发送变化时，在该函数下对数据进行处理，并会自动将处理结果存储在复合层的状态中。这样它也可以被子层访问。

例如根据`geoJsonLayer`定义一个`CompositeLayer`（给几何添加一些文本标注）

```javascript
const {CompositeLayer, GeoJsonLayer, TextLayer} = deck;
//定义面向用户的prop API
const defaultProps = {
    //继承GeoJsonLayer props API
    ...GeoJsonLayer.defaultProps,
    //获取每个feature的label
    getLabel: {type: 'accessor', value: x => x.text},
    // 每个feature的label的大小
    getLabelSize: {type: 'accessor', value: 32},
    // 每个feature的label的颜色
    getLabelColor: {type: 'accessor', value: [0, 0, 0, 255]},
    // label始终面向相机
    billboard: true,
    // label大小单位
    labelSizeUnits: 'pixels',
    // Label background color
    labelBackground: {type: 'color', value: null, optional: true},
    // Label font
    fontFamily: 'Monaco, monospace'
}


class LabeledGeoJsonLayer extends CompositeLayer {
    //图层的生命周期函数，图层在初始化时被调用，对geojson数据做处理，提取取label文本数据
    updateState({changeFlags}) {
        const {data} = this.props;
        if (changeFlags.dataChanged && data) {
            const labelData = (data.features || data)
            .flatMap((feature, index) => {
                const labelAnchors = getLabelAnchors(feature);
                return labelAnchors.map(p => this.getSubLayerRow({position: p}, feature, index));
            });
            this.setState({labelData});
        }
    }
//渲染逻辑（使用同一个数据将GeoJsonLayer和TextLayer的渲染逻辑组合到一起）
    renderLayers() {
        const {
            getLabel,
            getLabelSize,
            getLabelColor,
            labelSizeUnits,
            labelBackground,
            billboard,
            fontFamily
        } = this.props;
        return [
            new GeoJsonLayer(this.props, this.getSubLayerProps({id: 'geojson'}), {
                data: this.props.data
            }),
            new TextLayer(this.getSubLayerProps({id: 'text'}), {
                data: this.state.labelData,
                billboard,
                sizeUnits: labelSizeUnits,
                backgroundColor: labelBackground,
                getPosition: d => d.position,
                getText: this.getSubLayerAccessor(getLabel),
                getSize: this.getSubLayerAccessor(getLabelSize),
                getColor: this.getSubLayerAccessor(getLabelColor)
            })
        ];
    }
}
LabeledGeoJsonLayer.layerName = 'LabeledGeoJsonLayer';
LabeledGeoJsonLayer.defaultProps = defaultProps;

const layer = new LabeledGeoJsonLayer({
    id: `countries-${Date.now()}`,
    data,
    filled: false,
    billboard: false,
    getLineColor: [180, 180, 180],
    getLabel: f => f.properties.name,
    getLabelSize: f => Math.pow(2, Math.log10(turf.area(f))) * 20,
    getLabelColor: [0, 64, 128],
    labelSizeUnits: 'meters',
    lineWidthMinPixels: 1
});

  deckgl.setProps({layers: [layer]});
```

### [3]Subclassed Layers

deck.gl  Layer被设计为易于扩展以添加功能。子类化允许重新定义层生命周期方法以及顶点和/或片段着色器。

扩展子类的示例：[https://observablehq.com/d/ca5bcbd3d740693b](https://observablehq.com/d/ca5bcbd3d740693b)

如果层中缺少一个小功能，子类化通常是添加它的好方法，常见的有：

通常写一个Subclassed Layers分为如下步骤：

-  设计面向用户的API 
   - To create a new layer class, just extend the `Layer` class from `@deck.gl/core`. By default, the layer does not do anything.
   - 用户通过传递prop给自定义的图层类的构造函数，用来告诉图层如何渲染给定的数据集，通常在defaultProps中扩展添加新的props给用户
   - 其实也就是是继承类后给静态成员等添加一些属性，用来在调用该类是根据数据添加一些option
-  设定自定义attribute和uniform（定义数据怎么传的给的着色器变量的名字）
   [https://observablehq.com/@pessimistress/deck-gl-tutorial-subclassing-a-layer](https://observablehq.com/@pessimistress/deck-gl-tutorial-subclassing-a-layer) 
   - 可以通过定义attribute（每个对象特有）和uniform（所有对象共享）来使shader能够拿到拿到用户提供的数据
   - 默认情况下每个Layer都有一个`AttributeManager`来将要传递给`attribute`的数据上传到`webgl`缓冲区中（`this.getAttributeManager()`)
   - 要自定义`attribute`的话，可以调用`this.attributeManager.add()`或`this.attributeManager.addInstanced()`，然后将其添加到Layer的生命周期`initializeState()`中
   - 设置自定义`uniform`则可以通过`this.state.model.setUniforms()`来设定
-  shader注入 
   - deck.gl 的图层实现了标准的着色器hook，这样一来就可以在着色器中一些常见的地方添加shader代码了

#### Overriding Attribute Calculation

可以创建attribute变量，以供后面添加着色其代码时传输给着色其，在生命周期函数initializeState()中添加

```javascript
export default class MultiColorPathLayer extends PathLayer {
	initializeState() {
        super.initializeState();
        this.getAttributeManager().addInstanced({
              instanceFrequency: {
              size: 1,
              accessor: 'getFrequency',
              defaultValue: 1
            },
        })
  	}
}
```

#### Overriding Shaders

着色器注入语句：

- **vs:#decl：**向顶点着色器顶部（声明）注入代码
- **vs:#main-start：**向顶点着色器主函数开始的地方注入代码
- **vs:#main-end：**向顶点着色器主函数结束的地方注入代码
- **vs:DeckGL_FILTER_SIZE：**顶点着色器中的一个函数，用于操纵几何体的大小，在投影计算前注入 
   - `DECKGL_FILTER_SIZE(inout vec3 size, VertexGeometry geometry)`
- **vs:DeckGL_FILTER_GL_POSITION：**向顶点着色器最终坐标计算上注入重写代码：顶点着色器中的一个函数，用于操作当前顶点的投影位置。投影后调用 
   - `DECKGL_FILTER_GL_POSITION(inout vec4 position, VertexGeometry geometry)`
- **vs:DeckGL_FILTER_COLOR：**向顶点着色器注入顶点颜色重写代码。
- **fs:#decl：**向片元着色器注入声明代码。
- **fs:#main-start：**向片元着色器主函数开始的地方注入代码。
- **fs:#main-end：**向片元着色器主函数结束的地方注入代码。
- **fs:DeckGL_FILTER_COLOR：**向片元着色器注入最终的颜色重写代码。

#### Defining Additional Uniforms

额外的Uniforms传递给自定义着色器的最佳方法是重写 draw() 方法：

#### Defining Additional Attributes

#### Layer Extensions

对于CompositeLayer通常采用添加图层扩展而不直接继承为子类图层去添加一个功能或效果，因为CompositeLayer通常是由几个图层组合而成的，所以在CompositeLayer继承进行添加自定义效果时，要确保在每个图层都生效就要通过对每个子图层进行子类扩展并添加相同的内容，这样就会比较麻且代码重复了，而图层扩展直接给CompositeLayer图层添加一个扩展变可以对其CompositeLayer的所有组成Layer都生效了。

有时我们需要对多个层进行子类化以添加类似的功能。层扩展是一种概括、重用和共享子类层代码的方法

### [4]Primitive Layers

直接扩展Layer基类来自定义一个layer

### [5]shader注入

着色器注入语句：

- `**vs:#decl**`**：**向顶点着色器顶部（声明）注入代码
- `**vs:#main-start**`**：**向顶点着色器主函数开始的地方注入代码
- `**vs:#main-end**`**：**向顶点着色器主函数结束的地方注入代码
- `**vs:DeckGL_FILTER_SIZE**`**：**顶点着色器中的一个函数，用于操纵几何体的大小，在投影计算前注入 
   - `DECKGL_FILTER_SIZE(inout vec3 size, VertexGeometry geometry)`
- `**vs:DeckGL_FILTER_GL_POSITION**`**：**向顶点着色器最终坐标计算上注入重写代码：顶点着色器中的一个函数，用于操作当前顶点的投影位置。投影后调用 
   - `DECKGL_FILTER_GL_POSITION(inout vec4 position, VertexGeometry geometry)`
- `**vs:DeckGL_FILTER_COLOR**`**：**向顶点着色器注入顶点颜色重写代码。
- `**fs:#decl**`**：**向片元着色器注入声明代码。
- `**fs:#main-start**`**：**向片元着色器主函数开始的地方注入代码。
- `**fs:#main-end**`**：**向片元着色器主函数结束的地方注入代码。
- `**fs:DeckGL_FILTER_COLOR**`**：**向片元着色器注入最终的颜色重写代码。

## 2.API使用

此部分为对官方文档的翻译

### [1]Using Layers

- 图层是deckGL中一个核心的概念， deck.gl 图层是一种打包的可视化类型，它采用一组数据，将每个数据与位置、颜色、拉伸等相关联，并将它们呈现在地图上。DeckGL定义了封装了很多图层，同时也允许通过编写着色其自定义图层
- DeckGL将按顺序渲染渲染图层

### [2]add Interactivity

- 可以在实例化Deck实例时通过initialViewState配置相机位置

### [3]坐标系统CS

把地理坐标中各种投影坐标系看做渲染引擎中的世界空间即可

#### **基本概念**

- **世界空间（World space）**

数据集的世界坐标系。它通常由数据源决定，例如生成数据的设备，以及存储在磁盘或云数据仓库中的格式

- **公共空间（Common space）**

为了将来自不同世界空间的数据正确地组合在一起，deck.gl 将它们转换为公共空间（Common space），一个统一的中间层 3D 空间，它是一个右手笛卡尔坐标系。一旦位置位于公共空间中，就可以安全地使用标准线性代数将它们添加、减去、旋转、缩放和拉伸为 3D 向量。这是 deck.gl 图层中所有几何处理的基础。

世界空间和公共空间之间的转换在 deck.gl 文档中称为“project”（世界空间到公共空间）和“unproject”（公共空间到世界空间），由世界空间规范（例如 WGS84）和投影方式（例如 Web Mercator）控制的过程。投影是作为 deck.gl 核心的一部分实现的

- **屏幕空间**

也就是像素坐标，对于给定的数据集，公共空间中的位置通常不会随着用户交互而改变，而它们在屏幕空间中的外观会随着用户平移、缩放和旋转相机而频繁变化

## 3.源码学习

其源码结构类似于常见的常见的地图引擎，很多继承类的关系。

MapboxLayer其实是对mapbox中的customLayer的进一步封装，实例化其实就是customLayer图层

### [1]view

- View 实例包装了相机的“硬配置”。一旦定义，就不需要经常更改
- DeckGL允许调用多同时使用多个视图

### [2]View State

- View 实例必须与 viewState **对象结合使用**
- View State对象描述了 View 实例的状态。视图状态对象在运行时定义视图的临时属性，如相机位置、方向、缩放等。如果视图是交互式的，每次用户平移/旋转/缩放时，视图状态都会更新以反映改变

### [3]Viewport

- 视口实例是相机本身，是从 View 实例及其 viewState 中“解析”出来的。它处理数学运算，例如坐标投影/反投影、投影矩阵的计算以及着色器所需的其他 GLSL uniforms
- 每当 viewState 更新时，view都会在后台创建一个新的viewport，通常，deck.gl 用户不需要直接使用视口Viewport。在某些用例中，Viewport 实例提供的 JavaScript 函数可以方便地投影和取消投影坐标。

### 坐标变换

在DeckGL绘制地理数据时因为地理数据的坐标系是很多种类的，所以在实际绘制时需要先对地理坐标进行转换，需要将经纬度为单位的地理进行投影为米为单位的，然后在进行类似于常见渲染引擎中的变换，如观测变换、投影变换等。

而因为地理数据的地理坐标的坐标系的种类是非常多的，所以为了方便计算和提升性能，大多数WebGIS引擎（如DeckGL、openlayers、mapbox）都默认只支持一种地理坐标系和一种投影坐标系，也就是WGS84 WKID=4326和web墨卡托 WKID=3857。

所以如果要使用其他坐标系的地理数据（如地方坐标系）时，就比较麻烦了，可以先查看有没有相应的API提供，如没有则自己写或者调用网络上其他开源的工具（如proj）来对坐标进行装换计算了。

### Layer

Layer 类是所有 deck.gl  Layers的基类，它对许多Layers提供了一些基础属性

### MapboxLayer

在DeckGL中MapboxLayer类位于源码目录中的`modules/mapbox/src/mapbox-layers.ts`中

```typescript
//实现了MapBox的CustomLayerInterface接口
export default class MapboxLayer<LayerT extends Layer> implements CustomLayerInterface {
  id: string;
  type: 'custom';
  renderingMode: '2d' | '3d';
  map: Map | null;
  deck: Deck | null;
  props: MapboxLayerProps<LayerT>;

  constructor(props: MapboxLayerProps<LayerT>) {
    if (!props.id) {
      throw new Error('Layer must have an unique id');
    }

    this.id = props.id;
    this.type = 'custom';
    this.renderingMode = props.renderingMode || '3d';
    this.map = null;
    this.deck = null;
    this.props = props;
  }

  /* deck对onAdd方法的实现主要是创建deck实例，并添加设置一些props给deck实例，然后将 */
  onAdd(map: Map, gl: WebGLRenderingContext): void {
    ////获取mapbox的map实例，主要
    this.map = map;
    //这里通过Layer构建
    this.deck = getDeckInstance({map, gl, deck: this.props.deck});
    addLayer(this.deck, this);
  }

  onRemove(): void {
    if (this.deck) {
      removeLayer(this.deck, this);
    }
  }

  setProps(props: MapboxLayerProps<LayerT>) {
    // id cannot be changed
    Object.assign(this.props, props, {id: this.id});
    // safe guard in case setProps is called before onAdd
    if (this.deck) {
      updateLayer(this.deck, this);
    }
  }

  render() {
    drawLayer(this.deck!, this.map!, this);
  }
}
```

因为上面代码是基于Mapbox 代码为


下面以MVTLayer为里继续深入阅读源码，以了解其渲染机制：

### 安装说明

安装整个deckGL库

```
npm install deck.gl --save
```

选择性安装模块，直接安装DeckGL库的话其包含如下库

-  `@deck.gl/core`
- Core module that handles the WebGL rendering pipeline, data management, and user interaction 
   -  `@deck.gl/layers`
- Primitive layers that are the building blocks of all visualizations 
      - `@deck.gl/aggregation-layers` - Advanced layers that aggregate data into alternative representations, e.g. heatmap, contour, hex bins, etc.
      - `@deck.gl/geo-layers` - Additional layers that handle geospatial use cases and GIS formats.
      - `@deck.gl/mesh-layers` - Additional layers that render 3D meshes and [scene graphs](https://en.wikipedia.org/wiki/Scene_graph).
   -  `@deck.gl/json` - Declarative interface that supports specifying deck.gl layers and views using a JSON format. 
   -  `@deck.gl/mapbox` - An integration with the [Mapbox custom layer](https://deck.gl/docs/api-reference/mapbox/overview) API. 
   -  `@deck.gl/react` - React wrapper of deck.gl. 
   -  `@deck.gl/test-utils` - Testing utilities. 

为了减小包的大小可以按需选择上面的包进行安装