---
layout: Post
title: Mapbox Terrain-DEM地形切片原理浅析
date: 2022-10-17
headerImage: /img/in-post/2022-10-17/5.jpg
catalog: true
tags:
  - mapbox
  - 数据切片
  - GIS
---


## 1.Mapbox地形切片简介

Mapbox三维地形使用位移贴图将栅格卫星影像瓦片贴到相应的地形模型上，而mapbox的地形模型通过使用tif-RGB格式的全球数字高程数据切片为png或webp瓦片生成（tif-RGB格式数据比tif-dem轻量些），这些瓦片上每个像素的RGB值通过解码为以米为单位的原始高程值，然后使用mapbox渲染贴图形成三维地形。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acf17bfc161e49d29cd3ef9596a29b90~tplv-k3u1fbpfcp-zoom-1.image)

那么如有生成离线地形需求时，就可以通过在NASA上按经纬度下载相应范围的geotiff格式的dem数据，然后将tif-dem（高程灰度图）转化/编码为tif-RGB格式，然后使用相应的切片工具进行切片（按照相应mapbox相应的规范组织瓦片），而这些处理在github上已经有许多开源的处理工具，这里推荐一个集成了上面所有处理的工具（[根据dem数据生成地形切片的工具](https://github.com/FreeGIS/dem2terrain)）,感兴趣的化也可以基于GDAL写一个。

对于Terrain-RGB的数据解码：Terrain-RGB 中每个颜色通道为 base-256，而三个颜色通道组成的为16,777,216 个值，这些值可以映射到 0.1 米的高度增量，从而实现三维地形应用所需的垂直精度，因此原来表示高程值是足够的。 mapbox收到图块后， 将需要获取各个像素的红色（R），绿色（G）和蓝色（B）值，然后根据下列公式解码为相应的高度值。
$$
height = -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1)
$$

> 注：
>
> - **投影：**mapbox中的地形仅支持在启用globe并且web墨卡托投影3857下使用，若原始数据dem为非3857则需先转换
> - **水平精度为 5 米**：对于 256x256 分辨率的切片， 缩放级别到 15 级， 512x512 分辨率的切片， 缩放级别到 14 级；
> - **垂直精度为 0.1 米**：数据以 0.1 米的高度增量进行映射；
> - **缓冲瓷砖(Buffered tiles):**每个地图瓦片在边缘周围包含一个1像素缓冲区，以在地形网格等用例中启用瓦片插值(也就意味着在生产瓦片时，需要将每个瓦片的像素大小-2，如在mapbox中指定瓦片大小为512x512时，实际切出来的瓦片的大小需要是514 × 514的才对)



## 2.Terrain-RGB与Terrain-DEM

对于mapbox在线地形服务Mapbox Terrain-DEM是Mapbox Terrain-RGB在线瓦片集的优化版本，主要为更新了高程数据与数据压缩，降低了低缩放级别下的精度等来实现体积更小的瓦片，而其它的比如：地区切片生成原理、数据解码等Mapbox Terrain-DEM与Mapbox Terrain-RGB都是相同的。

调用在线Mapbox Terrain-RGB 示例：

```json
map.addSource('mapbox-dem', {
    'type': 'raster-dem',
    'url': 'mapbox://mapbox.terrain-rgb',
    'tileSize': 512,
    'maxzoom': 14
});
map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
```

调用Mapbox在线Mapbox Terrain-DEM示例：

```json
map.addSource('mapbox-dem', {
    'type': 'raster-dem',
    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
    'tileSize': 512,
    'maxzoom': 14
});
map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
```

## 3.离线地形切片实践

此示例数据根据使用使用QGIS的SRTM-Downloader插件下载全球任意范围的dem高程数据

![请添加图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/500dac6eff454822aa2236a005d7447a~tplv-k3u1fbpfcp-zoom-1.image)

然后使用国内一个大佬写的mapbox地形切片工具https://github.com/FreeGIS/dem2terrain将下载的高程数据直接切片，然后使用离线调用离线mapbox地形切片

代码调用示例：

```vue
<template>
    <div id='map'></div>
</template>
<script setup>
import mapboxgl from 'mapbox-gl';
import { onMounted} from "vue"
onMounted(()=>{
    initmap();
})
const initmap = ()=>{
    mapboxgl.accessToken ='your token';
    const map = new mapboxgl.Map({
        container: 'map', // 
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
        center: [110.4680,24.4929],
        zoom:13.1,
        pitch: 85,
        bearing: 80,
        projection: 'globe',
        // worldviews:'CN'
    });
    map.on('load', () => {
        map.addSource('mapbox-dem', {
            type: 'raster-dem',
            encoding:'mapbox',
            // 注释掉官方的地形服务url，替换自己的
            //'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            //使用HTTP服务器，部署静态瓦片，然后直接以xyz方式调用即可
            tiles: ['http://192.168.195.128/static/{z}/{x}/{y}.png'],
            tileSize: 256,
            maxzoom: 15,
        })
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 2.0 });
        map.setFog({
            'horizon-blend': 0.3,
            'color': '#f8f0e3',
            'high-color': '#add8e6',
            'space-color': '#d8f2ff',
            'star-intensity': 0.0
        });
    })
}   
</script>
<style>
#map { 
    width: 1366px;
    height: 722px;
}
</style>
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81a358e005e34b189699b14c27c31e21~tplv-k3u1fbpfcp-zoom-1.image)

下面情况为正常情况，因为其他没有rgb-dem瓦片的地方是没有高度的

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9caa6ff7593347dd94b00ea4998d9e0e~tplv-k3u1fbpfcp-zoom-1.image)

这里只是将地形切片进行离线化，而要将整web map进行离线化还需要将相应的卫星影像、字体、图标等进行离线化。
