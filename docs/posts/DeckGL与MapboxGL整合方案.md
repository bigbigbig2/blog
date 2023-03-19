---
layout: Post
title: deckgl与mapboxgl整合方案
date: 2023-2-10
useHeaderImage: true
headerImage: /img/in-post/2023-3/1.jpg
catalog: true
tags:
  - mapbox
  - deckgl
---

[[toc]]


deck.gl 的 MapView 旨在每个缩放级别和旋转角度与 Mapbox 的相机完美同步。对于`DeckGL`与`MapboxGL`的整合官方文档提供了两种方案，不过看网络上也有按需求根据源码定制整合的方案

主要通过deck.gl/mapbox模块中的`MapboxOverlay`和`MapboxLayer`类实现

#### [1]overlay

相应API：`MapboxOverlay`![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42830fc799e248f3b80716d700c1c46d~tplv-k3u1fbpfcp-zoom-1.image)




该方式主要适用于底图为二维的情况，因为是将`DeckGL`的`layer`和`Mapbox`的`layer`分离构建并挂载在不同的DOM中，将DeckGL的画布作为Mapbox底图顶部上的叠加层。官网示例：https://github.com/visgl/deck.gl/tree/8.8-release/examples/get-started/pure-js/mapbox

Deck 的相机和mapbox的相机是同步的，所以这是一个比较灵活强大的选项，因为这两个库彼此独立地管理它们的渲染。如果底图是二维的（因为不会有相互遮挡效果，就是无论底图是不是三维的，DeckGL Layer都会叠加到Mapbox Layer 上，mapBox-gl的dom也就是挂载于deckGL之上，mapbox-gl 处理所有用户输入），通常就足够了。

如果您需要使用除 deck.gl 之外的其他 mapbox-gl 控件和插件，这是有利的

> 注意也是可以将Mapbox 的Layer作为叠加层叠加到DeckGL上的，这里不太推荐，就不过多介绍了

```react
import {MapboxOverlay} from '@deck.gl/mapbox';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
  center: [0.45, 51.47],
  zoom: 4,
  bearing: 0,
  pitch: 30
});

const mapboxOverlay = new MapboxOverlay({
  layers: [
    new GeoJsonLayer({
      id: 'airports',
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: f => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick: info =>
        // eslint-disable-next-line
        info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
    }),
    new ArcLayer({
      id: 'arcs',
      data: AIR_PORTS,
      dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: f => [-0.4531566, 51.4709959], // London
      getTargetPosition: f => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1
    })
  ]
});

map.addControl(mapboxOverlay); //将deckGL的Layers作为mapbox的control添加到mapbox上
map.addControl(new mapboxgl.NavigationControl());
```

#### [2]Interleaving

相应API：`MapboxLayer`

[![在这里插入图片描述](https://img-blog.csdnimg.cn/41d44e02cc374e93af9e44fa1eb0b4c9.png)](https://img-blog.csdnimg.cn/92d9fbf76f9743438b6abb1a80c682fa.png)


该方案采用利用DeckGL自带的API `MapboxLayer`来将DeckGL的layer转化为mapbox的layer然后添加上去即可，也就是将DeckGL的layers渲染到了mapbox的webgl上下文了，这也叫意味着DeckGL层的内容与mapbox（为三维时）层之间有相互遮挡效果了

`MapboxLayer` 是对 Mapbox GL JS 的 CustomLayerInterface API 的实现，通过MapboxLayer就可以将DeckGL中的Layer作为mapbox中的customLayer添加到mapbox的gl上下文中，而不是像上面的将DeckGL的Layer渲染到mapbox上独立的canvas中

虽然这种方式对于熟悉Mapbox GL  CustomLayer的人会比较有利，就会受到Mapbox一些API的限制，其Layers的灵活性没有overlay的好。

使用该种方式来给MapBox时只需安装`@deck.gl/mapbox`包以及相应的Layers包即可

##### Constructor

该类的Constructor，也就是要参数如下

```js
import {MapboxLayer} from '@deck.gl/mapbox';
new MapboxLayer(props);
```

props(object)

- `props.id` (String)
- `props.type` (`Layer`，可选) -由继承与Layer的类，如为提供DeckGL实例，则必须
- `props.deck` (`Deck`, 可选) -控制该层渲染的 Deck 实例。如果提供，该层将在渲染时通过 id 从其层堆栈中查找，并忽略所有其他道具。建议您使用自动管理 Deck 实例的 MapboxOverlay 类
- `Optional`：当前使用的DeckGL layer的props，具体必须参数和可选参数需要查看相应Layers的文档

**example**

```js
import {MapboxLayer} from '@deck.gl/mapbox';
import {ScatterplotLayer} from '@deck.gl/layers';

const map = new mapboxgl.Map({...});

const myScatterplotLayer = new MapboxLayer({
  id: 'my-scatterplot',
  type: ScatterplotLayer,
  data: [
      {position: [-74.5, 40], size: 100}
  ],
  getPosition: d => d.position,
  getRadius: d => d.size,
  getColor: [255, 0, 0]
});
//Methods： setProps
// wait for map to be ready
map.on('load', () => {
  // insert before the mapbox layer "waterway_label"
  map.addLayer(myScatterplotLayer, 'waterway_label');

  // update the layer
  myScatterplotLayer.setProps({
    getColor: [0, 0, 255]
  });
});
```