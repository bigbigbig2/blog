---
layout: Post
title:  DeckGL MVTLayer+Mapbox注入shader实现简单效果
date: 2023-04-20
useHeaderImage: true
headerImage: https://img-blog.csdnimg.cn/84a94afb85564c41ad3df2d402d170e1.png
tags:
  - mapbox
  - deckgl
---

[[toc]]



## 1.数据获取与处理
可以从OSM下载相应的带高度的矢量建筑物轮廓数据，下载后进行数据处理，保留高度字段，其他字段根据需求选择（比如说想实现选中建筑物弹出相应建筑物的信息，就把这些信息字段保留下来），然后将shp（如果为shp数据）转为GeoJson（注意如果不是说3857投影的先转为3867投影），接着就是进行矢量切片为MVT格式的xyz数据（我看DecKGL好像并不支持mbtiles数据，不过可以使用一个服务端比如node解析mbties数据为xyz给前端调用，那样估计性能会好些），这里推荐使用[tippecanoe](https://github.com/mapbox/tippecanoe),性能好而且自定义切片程度高。下面为我这次切片的参数选择：

```
tippecanoe --no-tile-compression -s EPSG:3857 -ad -an -Z10 -z16 -e gl-3857 -ai gl_3857.geojson
```

在缩放级别 10-15 时，相对较小的建筑物被稀疏化，矢量切片500K 大小限制以下

- `pC`:--no-tile-compression不要压缩 PBF 矢量切片数据（这个DeckGL的issue上有人提我看了，默认压缩了会会出现问题）
- `ad`or`--drop-fraction-as-needed` :在每个缩放级别下动态删除部分要素，以将大图块保持在 500K 大小限制以下
- `an`or`--drop-smallest-as-needed`:从每个缩放级别动态删除最小的要素(如最小的多边形)，以将大图块保持在 500K 大小限制以下
- `e`:将 tiles 写入指定目录而不是 mbtiles 文件
- `ai`:如果要素 ID 是数字的字符串表示形式，请将其转换为纯数字以用作要素 ID
- `s`:指定投影，默认为3857

这里使用的数据为桂林的建筑物矢量数据，并且将其切片文件放到nginx http服务器上进行调用，当然也有更好的方案，如弄个全国的建筑物数据的话，并且需求更新及时，就可有采用在Postgresql/postgis中动态矢量切片来弄。

## 2.注入shader添加自定义效果
DeckGL比较有有意思也比较难的便是注入shader代码实现各种自定义效果了，这样一来就可以借鉴网络上（如[shadertoy](https://www.shadertoy.com/)）各种有意思的shader demo来结合实现更多的地理信息可视化效果。

因为MVTLayer为TileLayer的派生类图层，而TileLayer又为CompositeLayer，所以这里就采用Layer Extensions来添加自定义效果，而不是采用Subclassed Layers（不过也可以采用这种方式，会更灵活，可以传递attribute、uniform数据到着色器中使用）

通过查看源码层层查找可以发现，其着色其代码继承的是soilpolygonLayer的，所以只需要去看看其着色器代码中有些上面变量可以使用（觉得难找的话还有一个小技巧可以快速定位到相应的着色器代码，就是先随便注入些东西，然后控制台会报错对于的着色器文件编译错误。。。）

```javascript
class Custom extends deck.LayerExtension{
    getShaders(){
      return {
        inject: {
          'vs:#decl':`
              varying vec2 vPosition;
          `,
          'vs:#main-end':`
              vPosition = vertexPositions;
          `,
          'fs:#decl': `
              varying vec2 vPosition;
          `,
          //重写颜色绘制函数
          'fs:DECKGL_FILTER_COLOR': `
              color = vec4(color.rgb, color.a * pow(1.0-vPosition.y,2.0));
          `
        }
      }
    }
}

//使用
const mvtLayer = new MapboxLayer({
  id: "gl-building-mtv",
  type: MVTLayer,
  data: `your mvt url /{z}/{x}/{y}.pbf`,
  minZoom: 2,
  maxZoom: 16,
  getFillColor: [17, 179, 68, 150],
  lineWidthMinPixels: 0.5,
  pickable: true,
  extruded: true,
  autoHighlight: true,
  highlightColor: [0, 245, 255, 100],
  getElevation: d => d.properties.Elevation,
  wireframe: false,
  getLineColor: [105, 160, 126, 1],
  // material: {
  //   ambient: 0.1,
  //   diffuse: 0.9,
  //   shininess: 32,
  //   specularColor: [30, 30, 30]
  // },
  extensions: [new Custom()]
});

```
![在这里插入图片描述](https://img-blog.csdnimg.cn/09f9eee055604d328e3a65acb5345d49.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/84a94afb85564c41ad3df2d402d170e1.png)