import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-74bc627b","/about/",{"title":"About"},["/about/index.html","/about/README.md"]],
  ["v-f0388862","/links/",{"title":"Links"},["/links/index.html","/links/README.md"]],
  ["v-35e59034","/post/2021/12/09/axios%E4%BA%8C%E6%AC%A1%E5%B0%81%E8%A3%85/",{"title":"axios二次封装"},["/post/2021/12/09/axios二次封装/","/post/2021/12/09/axios%E4%BA%8C%E6%AC%A1%E5%B0%81%E8%A3%85/index.html","/posts/axios二次封装.html","/posts/axios%E4%BA%8C%E6%AC%A1%E5%B0%81%E8%A3%85.html","/posts/axios二次封装.md","/posts/axios%E4%BA%8C%E6%AC%A1%E5%B0%81%E8%A3%85.md"]],
  ["v-364cdc28","/posts/Basic%20radiometry%20(%E8%BE%90%E5%B0%84%E5%BA%A6%E9%87%8F%E5%AD%A6).html",{"title":"光线追踪(二)——辐射度量学"},["/posts/Basic radiometry (辐射度量学).html","/posts/Basic%20radiometry%20(%E8%BE%90%E5%B0%84%E5%BA%A6%E9%87%8F%E5%AD%A6)","/posts/Basic radiometry (辐射度量学).md","/posts/Basic%20radiometry%20(%E8%BE%90%E5%B0%84%E5%BA%A6%E9%87%8F%E5%AD%A6).md"]],
  ["v-75417d86","/posts/cesium%E4%B8%AD%E7%9A%84%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F%E4%B8%8E%E8%BD%AC%E6%8D%A2.html",{"title":"cesium中的坐标系及转换"},["/posts/cesium中的坐标系统与转换.html","/posts/cesium%E4%B8%AD%E7%9A%84%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F%E4%B8%8E%E8%BD%AC%E6%8D%A2","/posts/cesium中的坐标系统与转换.md","/posts/cesium%E4%B8%AD%E7%9A%84%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F%E4%B8%8E%E8%BD%AC%E6%8D%A2.md"]],
  ["v-44fdc8e7","/posts/deckglmapbox.html",{"title":"DeckGL MVTLayer+Mapbox注入shader实现简单效果"},["/posts/deckglmapbox","/posts/deckglmapbox.md"]],
  ["v-6afa7d55","/posts/DeckGL%E4%B8%8EMapboxGL%E6%95%B4%E5%90%88%E6%96%B9%E6%A1%88.html",{"title":"deckgl与mapboxgl整合方案"},["/posts/DeckGL与MapboxGL整合方案.html","/posts/DeckGL%E4%B8%8EMapboxGL%E6%95%B4%E5%90%88%E6%96%B9%E6%A1%88","/posts/DeckGL与MapboxGL整合方案.md","/posts/DeckGL%E4%B8%8EMapboxGL%E6%95%B4%E5%90%88%E6%96%B9%E6%A1%88.md"]],
  ["v-73b4950d","/posts/deckgl%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9B%BE%E5%B1%82.html",{"title":"deckGL自定义图层学习笔记"},["/posts/deckgl自定义图层.html","/posts/deckgl%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9B%BE%E5%B1%82","/posts/deckgl自定义图层.md","/posts/deckgl%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9B%BE%E5%B1%82.md"]],
  ["v-56a232ce","/posts/Mapbox%20Terrain-DEM%E5%9C%B0%E5%BD%A2%E5%88%87%E7%89%87%E5%8E%9F%E7%90%86%E6%B5%85%E6%9E%90.html",{"title":"Mapbox Terrain-DEM地形切片原理浅析"},["/posts/Mapbox Terrain-DEM地形切片原理浅析.html","/posts/Mapbox%20Terrain-DEM%E5%9C%B0%E5%BD%A2%E5%88%87%E7%89%87%E5%8E%9F%E7%90%86%E6%B5%85%E6%9E%90","/posts/Mapbox Terrain-DEM地形切片原理浅析.md","/posts/Mapbox%20Terrain-DEM%E5%9C%B0%E5%BD%A2%E5%88%87%E7%89%87%E5%8E%9F%E7%90%86%E6%B5%85%E6%9E%90.md"]],
  ["v-114242ac","/posts/Phong%E5%8F%8D%E5%B0%84%E6%A8%A1%E5%9E%8B.html",{"title":"Phong反射模型及glsl实现"},["/posts/Phong反射模型.html","/posts/Phong%E5%8F%8D%E5%B0%84%E6%A8%A1%E5%9E%8B","/posts/Phong反射模型.md","/posts/Phong%E5%8F%8D%E5%B0%84%E6%A8%A1%E5%9E%8B.md"]],
  ["v-54caea7c","/posts/plsql.html",{"title":"PL/pgSQL"},["/posts/plsql","/posts/plsql.md"]],
  ["v-6b33d780","/posts/PostGIS%E9%A2%86%E5%9F%9F%E5%88%86%E6%9E%90.html",{"title":"使用PostGIS进行领域分析"},["/posts/PostGIS领域分析.html","/posts/PostGIS%E9%A2%86%E5%9F%9F%E5%88%86%E6%9E%90","/posts/PostGIS领域分析.md","/posts/PostGIS%E9%A2%86%E5%9F%9F%E5%88%86%E6%9E%90.md"]],
  ["v-080d93a9","/posts/PostgreSQL&PostGIS%E6%BA%90%E7%A0%81%E7%BC%96%E8%AF%91%E5%AE%89%E8%A3%85.html",{"title":"PostgreSQL&PostGIS源码编译安装"},["/posts/PostgreSQL&PostGIS源码编译安装.html","/posts/PostgreSQL&PostGIS%E6%BA%90%E7%A0%81%E7%BC%96%E8%AF%91%E5%AE%89%E8%A3%85","/posts/PostgreSQL&PostGIS源码编译安装.md","/posts/PostgreSQL&PostGIS%E6%BA%90%E7%A0%81%E7%BC%96%E8%AF%91%E5%AE%89%E8%A3%85.md"]],
  ["v-24f00c16","/posts/PostgreSQL%E7%B4%A2%E5%BC%95.html",{"title":"PostgreSQL索引"},["/posts/PostgreSQL索引.html","/posts/PostgreSQL%E7%B4%A2%E5%BC%95","/posts/PostgreSQL索引.md","/posts/PostgreSQL%E7%B4%A2%E5%BC%95.md"]],
  ["v-01ae88c7","/posts/Rasterization.html",{"title":"Rasterization"},["/posts/Rasterization","/posts/Rasterization.md"]],
  ["v-545a9331","/posts/Ray-tracing(%E4%B8%89).html",{"title":"光线追踪(三)"},["/posts/Ray-tracing(三).html","/posts/Ray-tracing(%E4%B8%89)","/posts/Ray-tracing(三).md","/posts/Ray-tracing(%E4%B8%89).md"]],
  ["v-08874067","/posts/script-steup.html",{"title":"vue中setup,script setup语法糖梳理"},["/posts/script-steup","/posts/script-steup.md"]],
  ["v-58f2b2e4","/posts/shading.html",{"title":"shading"},["/posts/shading","/posts/shading.md"]],
  ["v-309e6040","/posts/three.js%E4%B8%AD%E5%8A%A0%E8%BD%BD%E6%A8%A1%E5%9E%8B%E5%8F%8A%E6%A8%A1%E5%9E%8B%E5%8A%A8%E7%94%BB.html",{"title":"three.js中加载模型及模型动画"},["/posts/three.js中加载模型及模型动画.html","/posts/three.js%E4%B8%AD%E5%8A%A0%E8%BD%BD%E6%A8%A1%E5%9E%8B%E5%8F%8A%E6%A8%A1%E5%9E%8B%E5%8A%A8%E7%94%BB","/posts/three.js中加载模型及模型动画.md","/posts/three.js%E4%B8%AD%E5%8A%A0%E8%BD%BD%E6%A8%A1%E5%9E%8B%E5%8F%8A%E6%A8%A1%E5%9E%8B%E5%8A%A8%E7%94%BB.md"]],
  ["v-57b46fb1","/posts/three.js%E4%BD%BF%E7%94%A8%E7%9D%80%E8%89%B2%E5%99%A8%E7%BB%98%E5%88%B6%E5%9B%BE%E6%A1%88.html",{"title":"three.js使用着色器绘制图案"},["/posts/three.js使用着色器绘制图案.html","/posts/three.js%E4%BD%BF%E7%94%A8%E7%9D%80%E8%89%B2%E5%99%A8%E7%BB%98%E5%88%B6%E5%9B%BE%E6%A1%88","/posts/three.js使用着色器绘制图案.md","/posts/three.js%E4%BD%BF%E7%94%A8%E7%9D%80%E8%89%B2%E5%99%A8%E7%BB%98%E5%88%B6%E5%9B%BE%E6%A1%88.md"]],
  ["v-38e80041","/posts/three.js%E4%BF%AE%E6%94%B9%E5%86%85%E7%BD%AE%E6%9D%90%E8%B4%A8%E7%9D%80%E8%89%B2%E5%99%A8%E4%BB%A3%E7%A0%81.html",{"title":"three.js修改内置材质着色器代码"},["/posts/three.js修改内置材质着色器代码.html","/posts/three.js%E4%BF%AE%E6%94%B9%E5%86%85%E7%BD%AE%E6%9D%90%E8%B4%A8%E7%9D%80%E8%89%B2%E5%99%A8%E4%BB%A3%E7%A0%81","/posts/three.js修改内置材质着色器代码.md","/posts/three.js%E4%BF%AE%E6%94%B9%E5%86%85%E7%BD%AE%E6%9D%90%E8%B4%A8%E7%9D%80%E8%89%B2%E5%99%A8%E4%BB%A3%E7%A0%81.md"]],
  ["v-84ea0590","/posts/three.js%E5%85%89%E7%BA%BF%E6%8A%95%E5%B0%84%E5%99%A8.html",{"title":"three.js光线投射"},["/posts/three.js光线投射器.html","/posts/three.js%E5%85%89%E7%BA%BF%E6%8A%95%E5%B0%84%E5%99%A8","/posts/three.js光线投射器.md","/posts/three.js%E5%85%89%E7%BA%BF%E6%8A%95%E5%B0%84%E5%99%A8.md"]],
  ["v-43e2713a","/posts/three.js%E5%9F%BA%E4%BA%8E%E6%BB%9A%E5%8A%A8%E7%9A%84%E5%8A%A8%E7%94%BB.html",{"title":"three.js基于滚动的动画"},["/posts/three.js基于滚动的动画.html","/posts/three.js%E5%9F%BA%E4%BA%8E%E6%BB%9A%E5%8A%A8%E7%9A%84%E5%8A%A8%E7%94%BB","/posts/three.js基于滚动的动画.md","/posts/three.js%E5%9F%BA%E4%BA%8E%E6%BB%9A%E5%8A%A8%E7%9A%84%E5%8A%A8%E7%94%BB.md"]],
  ["v-bb4d03f4","/posts/three.js%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E7%9B%B8%E5%85%B3.html",{"title":"three.js性能优化微指南"},["/posts/three.js性能优化相关.html","/posts/three.js%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E7%9B%B8%E5%85%B3","/posts/three.js性能优化相关.md","/posts/three.js%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E7%9B%B8%E5%85%B3.md"]],
  ["v-196f5a56","/posts/three.js%E6%8F%90%E5%8D%87%E6%B8%B2%E6%9F%93%E6%95%88%E6%9E%9C.html",{"title":"three.js提升渲染效果"},["/posts/three.js提升渲染效果.html","/posts/three.js%E6%8F%90%E5%8D%87%E6%B8%B2%E6%9F%93%E6%95%88%E6%9E%9C","/posts/three.js提升渲染效果.md","/posts/three.js%E6%8F%90%E5%8D%87%E6%B8%B2%E6%9F%93%E6%95%88%E6%9E%9C.md"]],
  ["v-20a2b47a","/posts/three.js%E7%9D%80%E8%89%B2%E5%99%A8%E6%9D%90%E8%B4%A8.html",{"title":"three.js着色器材质"},["/posts/three.js着色器材质.html","/posts/three.js%E7%9D%80%E8%89%B2%E5%99%A8%E6%9D%90%E8%B4%A8","/posts/three.js着色器材质.md","/posts/three.js%E7%9D%80%E8%89%B2%E5%99%A8%E6%9D%90%E8%B4%A8.md"]],
  ["v-1aefc4fb","/posts/three.js%E9%A1%B9%E7%9B%AE%E7%9A%84%E4%BB%A3%E7%A0%81%E7%BB%84%E7%BB%87%E7%BB%93%E6%9E%84.html",{"title":"three.js项目的代码组织结构"},["/posts/three.js项目的代码组织结构.html","/posts/three.js%E9%A1%B9%E7%9B%AE%E7%9A%84%E4%BB%A3%E7%A0%81%E7%BB%84%E7%BB%87%E7%BB%93%E6%9E%84","/posts/three.js项目的代码组织结构.md","/posts/three.js%E9%A1%B9%E7%9B%AE%E7%9A%84%E4%BB%A3%E7%A0%81%E7%BB%84%E7%BB%87%E7%BB%93%E6%9E%84.md"]],
  ["v-9beafb4a","/posts/transformation.html",{"title":"transformation"},["/posts/transformation","/posts/transformation.md"]],
  ["v-fb9d97a2","/post/2021/12/23/ts%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F%E6%B7%B1%E5%85%A5/",{"title":"ts类型系统补充"},["/post/2021/12/23/ts类型系统深入/","/post/2021/12/23/ts%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F%E6%B7%B1%E5%85%A5/index.html","/posts/ts类型系统深入.html","/posts/ts%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F%E6%B7%B1%E5%85%A5.html","/posts/ts类型系统深入.md","/posts/ts%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F%E6%B7%B1%E5%85%A5.md"]],
  ["v-6054b769","/posts/vbo,ibo,vao.html",{"title":"vbo,ibo,vao"},["/posts/vbo,ibo,vao","/posts/vbo,ibo,vao.md"]],
  ["v-7fe3092c","/post/2021/12/06/vim/",{"title":"vim"},["/post/2021/12/06/vim/index.html","/posts/vim.html","/posts/vim.md"]],
  ["v-07402e70","/posts/WebGL%E5%9B%BE%E5%83%8F%E5%83%8F%E7%B4%A0%E5%A4%84%E7%90%86.html",{"title":"WebGL像素处理"},["/posts/WebGL图像像素处理.html","/posts/WebGL%E5%9B%BE%E5%83%8F%E5%83%8F%E7%B4%A0%E5%A4%84%E7%90%86","/posts/WebGL图像像素处理.md","/posts/WebGL%E5%9B%BE%E5%83%8F%E5%83%8F%E7%B4%A0%E5%A4%84%E7%90%86.md"]],
  ["v-69a417db","/posts/%E4%BD%BF%E7%94%A8postgis%E6%9E%84%E5%BB%BA%E5%92%8C%E4%BD%BF%E7%94%A8%E6%8B%93%E6%89%91.html",{"title":"使用PostGIS构建和使用拓扑"},["/posts/使用postgis构建和使用拓扑.html","/posts/%E4%BD%BF%E7%94%A8postgis%E6%9E%84%E5%BB%BA%E5%92%8C%E4%BD%BF%E7%94%A8%E6%8B%93%E6%89%91","/posts/使用postgis构建和使用拓扑.md","/posts/%E4%BD%BF%E7%94%A8postgis%E6%9E%84%E5%BB%BA%E5%92%8C%E4%BD%BF%E7%94%A8%E6%8B%93%E6%89%91.md"]],
  ["v-3a07e167","/posts/%E4%BD%BF%E7%94%A8shader%E9%80%A0%E5%9E%8B%E5%87%BD%E6%95%B0%E7%BB%98%E5%88%B6%E5%9B%BE%E5%BD%A2.html",{"title":"使用shader造型函数绘制图形"},["/posts/使用shader造型函数绘制图形.html","/posts/%E4%BD%BF%E7%94%A8shader%E9%80%A0%E5%9E%8B%E5%87%BD%E6%95%B0%E7%BB%98%E5%88%B6%E5%9B%BE%E5%BD%A2","/posts/使用shader造型函数绘制图形.md","/posts/%E4%BD%BF%E7%94%A8shader%E9%80%A0%E5%9E%8B%E5%87%BD%E6%95%B0%E7%BB%98%E5%88%B6%E5%9B%BE%E5%BD%A2.md"]],
  ["v-1c96a276","/posts/%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA(%E4%B8%80%EF%BC%89.html",{"title":"光线追踪(一)"},["/posts/光线追踪(一）.html","/posts/%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA(%E4%B8%80%EF%BC%89","/posts/光线追踪(一）.md","/posts/%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA(%E4%B8%80%EF%BC%89.md"]],
  ["v-44efba9b","/posts/%E5%87%A0%E4%BD%95.html",{"title":"geometry"},["/posts/几何.html","/posts/%E5%87%A0%E4%BD%95","/posts/几何.md","/posts/%E5%87%A0%E4%BD%95.md"]],
  ["v-aefde1bc","/posts/%E5%8E%9F%E5%9E%8B%E6%A8%A1%E5%BC%8F%E3%80%81%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html",{"title":"原型模式、单例模式"},["/posts/原型模式、单例模式.html","/posts/%E5%8E%9F%E5%9E%8B%E6%A8%A1%E5%BC%8F%E3%80%81%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F","/posts/原型模式、单例模式.md","/posts/%E5%8E%9F%E5%9E%8B%E6%A8%A1%E5%BC%8F%E3%80%81%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.md"]],
  ["v-2ce8da2d","/posts/%E5%8F%AF%E8%A7%86%E5%8C%96%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB%E6%B5%85%E6%9E%90.html",{"title":"WEB可视化体系浅析"},["/posts/可视化知识体系浅析.html","/posts/%E5%8F%AF%E8%A7%86%E5%8C%96%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB%E6%B5%85%E6%9E%90","/posts/可视化知识体系浅析.md","/posts/%E5%8F%AF%E8%A7%86%E5%8C%96%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB%E6%B5%85%E6%9E%90.md"]],
  ["v-2a39674b","/posts/%E5%93%88%E5%A4%AB%E6%9B%BC%E6%A0%91.html",{"title":"哈夫曼树"},["/posts/哈夫曼树.html","/posts/%E5%93%88%E5%A4%AB%E6%9B%BC%E6%A0%91","/posts/哈夫曼树.md","/posts/%E5%93%88%E5%A4%AB%E6%9B%BC%E6%A0%91.md"]],
  ["v-b5ff2e00","/posts/%E5%9B%BE%E5%BD%A2%E5%AD%A6%E4%B8%AD%E7%9A%84%E6%95%B0%E5%AD%A6%E7%9F%A5%E8%AF%86.html",{"title":""},["/posts/图形学中的数学知识.html","/posts/%E5%9B%BE%E5%BD%A2%E5%AD%A6%E4%B8%AD%E7%9A%84%E6%95%B0%E5%AD%A6%E7%9F%A5%E8%AF%86","/posts/图形学中的数学知识.md","/posts/%E5%9B%BE%E5%BD%A2%E5%AD%A6%E4%B8%AD%E7%9A%84%E6%95%B0%E5%AD%A6%E7%9F%A5%E8%AF%86.md"]],
  ["v-3dfbaed5","/posts/%E5%9B%BE%E5%BD%A2%E5%AD%A6%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F%E6%A2%B3%E7%90%86%E5%B0%8F%E7%BB%93.html",{"title":"计算机图形学中的坐标系统"},["/posts/图形学坐标系统梳理小结.html","/posts/%E5%9B%BE%E5%BD%A2%E5%AD%A6%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F%E6%A2%B3%E7%90%86%E5%B0%8F%E7%BB%93","/posts/图形学坐标系统梳理小结.md","/posts/%E5%9B%BE%E5%BD%A2%E5%AD%A6%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F%E6%A2%B3%E7%90%86%E5%B0%8F%E7%BB%93.md"]],
  ["v-cdcd33b8","/posts/%E5%9C%A8shader%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%9E%81%E5%9D%90%E6%A0%87%E7%BB%98%E5%9B%BE.html",{"title":"在shader中使用极坐标绘图"},["/posts/在shader中使用极坐标绘图.html","/posts/%E5%9C%A8shader%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%9E%81%E5%9D%90%E6%A0%87%E7%BB%98%E5%9B%BE","/posts/在shader中使用极坐标绘图.md","/posts/%E5%9C%A8shader%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%9E%81%E5%9D%90%E6%A0%87%E7%BB%98%E5%9B%BE.md"]],
  ["v-1f001066","/posts/%E5%9C%B0%E5%9B%BE%E5%AD%A6%E6%95%B0%E5%AD%A6%E5%9F%BA%E7%A1%80.html",{"title":"地图学数学基础"},["/posts/地图学数学基础.html","/posts/%E5%9C%B0%E5%9B%BE%E5%AD%A6%E6%95%B0%E5%AD%A6%E5%9F%BA%E7%A1%80","/posts/地图学数学基础.md","/posts/%E5%9C%B0%E5%9B%BE%E5%AD%A6%E6%95%B0%E5%AD%A6%E5%9F%BA%E7%A1%80.md"]],
  ["v-70856d82","/posts/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F%E3%80%81%E5%BB%BA%E7%AD%91%E8%80%85%E6%A8%A1%E5%BC%8F.html",{"title":"工厂模式、建筑者模式"},["/posts/工厂模式、建筑者模式.html","/posts/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F%E3%80%81%E5%BB%BA%E7%AD%91%E8%80%85%E6%A8%A1%E5%BC%8F","/posts/工厂模式、建筑者模式.md","/posts/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F%E3%80%81%E5%BB%BA%E7%AD%91%E8%80%85%E6%A8%A1%E5%BC%8F.md"]],
  ["v-207f447c","/posts/%E5%B8%B8%E8%A7%81%E4%B8%89%E7%BB%B4%E6%95%B0%E6%8D%AE%E6%A8%A1%E5%9E%8B%E6%A2%B3%E7%90%86.html",{"title":"常见三维数据模型梳理"},["/posts/常见三维数据模型梳理.html","/posts/%E5%B8%B8%E8%A7%81%E4%B8%89%E7%BB%B4%E6%95%B0%E6%8D%AE%E6%A8%A1%E5%9E%8B%E6%A2%B3%E7%90%86","/posts/常见三维数据模型梳理.md","/posts/%E5%B8%B8%E8%A7%81%E4%B8%89%E7%BB%B4%E6%95%B0%E6%8D%AE%E6%A8%A1%E5%9E%8B%E6%A2%B3%E7%90%86.md"]],
  ["v-02c3439c","/posts/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93SSR.html",{"title":"服务端渲染SSR"},["/posts/服务端渲染SSR.html","/posts/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93SSR","/posts/服务端渲染SSR.md","/posts/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93SSR.md"]],
  ["v-74bbfe04","/posts/%E6%9D%90%E8%B4%A8%E4%B8%8E%E8%A1%A8%E9%9D%A2.html",{"title":"材质与表面"},["/posts/材质与表面.html","/posts/%E6%9D%90%E8%B4%A8%E4%B8%8E%E8%A1%A8%E9%9D%A2","/posts/材质与表面.md","/posts/%E6%9D%90%E8%B4%A8%E4%B8%8E%E8%A1%A8%E9%9D%A2.md"]],
  ["v-562fabc0","/posts/%E6%A8%A1%E5%9D%97%E5%8C%96.html",{"title":"模块化系统"},["/posts/模块化.html","/posts/%E6%A8%A1%E5%9D%97%E5%8C%96","/posts/模块化.md","/posts/%E6%A8%A1%E5%9D%97%E5%8C%96.md"]],
  ["v-bf9bc1da","/posts/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%90%84%E7%A7%8D%E6%B5%81%E6%B0%B4%E7%BA%BF.html",{"title":"浏览器运行原理浅析"},["/posts/浏览器的各种流水线.html","/posts/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%90%84%E7%A7%8D%E6%B5%81%E6%B0%B4%E7%BA%BF","/posts/浏览器的各种流水线.md","/posts/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%90%84%E7%A7%8D%E6%B5%81%E6%B0%B4%E7%BA%BF.md"]],
  ["v-2970661c","/posts/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html",{"title":"环境变量及在前端项目中的配置"},["/posts/环境变量.html","/posts/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F","/posts/环境变量.md","/posts/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.md"]],
  ["v-4a4102ce","/posts/%E7%9B%B8%E6%9C%BA%E3%80%81%E9%95%9C%E5%A4%B4%E3%80%81%E5%85%89%E5%9C%BA.html",{"title":"相机视场、镜头、光场、全光函数"},["/posts/相机、镜头、光场.html","/posts/%E7%9B%B8%E6%9C%BA%E3%80%81%E9%95%9C%E5%A4%B4%E3%80%81%E5%85%89%E5%9C%BA","/posts/相机、镜头、光场.md","/posts/%E7%9B%B8%E6%9C%BA%E3%80%81%E9%95%9C%E5%A4%B4%E3%80%81%E5%85%89%E5%9C%BA.md"]],
  ["v-2b611e2f","/posts/%E7%A9%BA%E9%97%B4%E6%95%B0%E6%8D%AE%E5%BA%93%E5%9F%BA%E6%9C%AC%E7%90%86%E8%AE%BA%E6%A2%B3%E7%90%86.html",{"title":"空间数据库理论基础"},["/posts/空间数据库基本理论梳理.html","/posts/%E7%A9%BA%E9%97%B4%E6%95%B0%E6%8D%AE%E5%BA%93%E5%9F%BA%E6%9C%AC%E7%90%86%E8%AE%BA%E6%A2%B3%E7%90%86","/posts/空间数据库基本理论梳理.md","/posts/%E7%A9%BA%E9%97%B4%E6%95%B0%E6%8D%AE%E5%BA%93%E5%9F%BA%E6%9C%AC%E7%90%86%E8%AE%BA%E6%A2%B3%E7%90%86.md"]],
  ["v-c4e09fec","/posts/%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0.html",{"title":"线性代数的本质"},["/posts/线性代数.html","/posts/%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0","/posts/线性代数.md","/posts/%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0.md"]],
  ["v-7031ef41","/posts/%E8%A3%85%E9%A5%B0%E5%99%A8%E6%A8%A1%E5%BC%8F%E3%80%81%E9%80%82%E9%85%8D%E5%99%A8%E6%A8%A1%E5%BC%8F.html",{"title":"装饰器模式、适配器模式"},["/posts/装饰器模式、适配器模式.html","/posts/%E8%A3%85%E9%A5%B0%E5%99%A8%E6%A8%A1%E5%BC%8F%E3%80%81%E9%80%82%E9%85%8D%E5%99%A8%E6%A8%A1%E5%BC%8F","/posts/装饰器模式、适配器模式.md","/posts/%E8%A3%85%E9%A5%B0%E5%99%A8%E6%A8%A1%E5%BC%8F%E3%80%81%E9%80%82%E9%85%8D%E5%99%A8%E6%A8%A1%E5%BC%8F.md"]],
  ["v-75d99ce6","/posts/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF.html",{"title":"贝塞尔曲线"},["/posts/贝塞尔曲线.html","/posts/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF","/posts/贝塞尔曲线.md","/posts/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF.md"]],
  ["v-a823d7fe","/posts/%E9%A2%9C%E8%89%B2%E4%B8%8E%E6%84%9F%E7%9F%A5.html",{"title":"颜色与感知"},["/posts/颜色与感知.html","/posts/%E9%A2%9C%E8%89%B2%E4%B8%8E%E6%84%9F%E7%9F%A5","/posts/颜色与感知.md","/posts/%E9%A2%9C%E8%89%B2%E4%B8%8E%E6%84%9F%E7%9F%A5.md"]],
  ["v-36a1c02c","/posts/%E9%AB%98%E7%BA%A7%E5%85%89%E7%BA%BF%E4%BC%A0%E6%92%AD%E4%B8%8E%E5%A4%8D%E6%9D%82%E5%A4%96%E8%A7%82%E5%BB%BA%E6%A8%A1.html",{"title":"高级的光线传播与复杂外观建模"},["/posts/高级光线传播与复杂外观建模.html","/posts/%E9%AB%98%E7%BA%A7%E5%85%89%E7%BA%BF%E4%BC%A0%E6%92%AD%E4%B8%8E%E5%A4%8D%E6%9D%82%E5%A4%96%E8%A7%82%E5%BB%BA%E6%A8%A1","/posts/高级光线传播与复杂外观建模.md","/posts/%E9%AB%98%E7%BA%A7%E5%85%89%E7%BA%BF%E4%BC%A0%E6%92%AD%E4%B8%8E%E5%A4%8D%E6%9D%82%E5%A4%96%E8%A7%82%E5%BB%BA%E6%A8%A1.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
  ["v-8daa1a0e","/",{"title":"Home"},["/index.html"]],
  ["v-15534fdd","/tags/",{"title":"Tags"},["/tags/index.html"]],
  ["v-23208ed4","/tags/axios/",{"title":"Tags"},["/tags/axios/index.html"]],
  ["v-1ca2c79e","/tags/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9B%BE%E5%BD%A2%E5%AD%A6/",{"title":"Tags"},["/tags/计算机图形学/","/tags/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9B%BE%E5%BD%A2%E5%AD%A6/index.html"]],
  ["v-4b57b843","/tags/%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA/",{"title":"Tags"},["/tags/光线追踪/","/tags/%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA/index.html"]],
  ["v-2971fce2","/tags/cesium/",{"title":"Tags"},["/tags/cesium/index.html"]],
  ["v-9feff422","/tags/%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F/",{"title":"Tags"},["/tags/坐标系统/","/tags/%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F/index.html"]],
  ["v-cd41080a","/tags/GIS/",{"title":"Tags"},["/tags/GIS/index.html"]],
  ["v-336f60a3","/tags/mapbox/",{"title":"Tags"},["/tags/mapbox/index.html"]],
  ["v-5d777424","/tags/deckgl/",{"title":"Tags"},["/tags/deckgl/index.html"]],
  ["v-a1720f2a","/tags/%E6%95%B0%E6%8D%AE%E5%88%87%E7%89%87/",{"title":"Tags"},["/tags/数据切片/","/tags/%E6%95%B0%E6%8D%AE%E5%88%87%E7%89%87/index.html"]],
  ["v-47608b5a","/tags/WebGL/",{"title":"Tags"},["/tags/WebGL/index.html"]],
  ["v-1027b75e","/tags/PostgreSQL/",{"title":"Tags"},["/tags/PostgreSQL/index.html"]],
  ["v-6cce4aee","/tags/PL/pgSQL/",{"title":"Tags"},["/tags/PL/pgSQL/index.html"]],
  ["v-609b323b","/tags/PostGIS/",{"title":"Tags"},["/tags/PostGIS/index.html"]],
  ["v-cd14fe74","/tags/vue/",{"title":"Tags"},["/tags/vue/index.html"]],
  ["v-685e6479","/tags/three.js/",{"title":"Tags"},["/tags/three.js/index.html"]],
  ["v-abc6eeda","/tags/ts/",{"title":"Tags"},["/tags/ts/index.html"]],
  ["v-cd15569c","/tags/vim/",{"title":"Tags"},["/tags/vim/index.html"]],
  ["v-7bf4126d","/tags/shader/",{"title":"Tags"},["/tags/shader/index.html"]],
  ["v-3298445c","/tags/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/",{"title":"Tags"},["/tags/设计模式/","/tags/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/index.html"]],
  ["v-3e734fe6","/tags/TypeScript/",{"title":"Tags"},["/tags/TypeScript/index.html"]],
  ["v-6cf5868e","/tags/%E5%8F%AF%E8%A7%86%E5%8C%96/",{"title":"Tags"},["/tags/可视化/","/tags/%E5%8F%AF%E8%A7%86%E5%8C%96/index.html"]],
  ["v-63f73328","/tags/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/",{"title":"Tags"},["/tags/数据结构与算法/","/tags/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/index.html"]],
  ["v-abc8e23e","/tags/3D/",{"title":"Tags"},["/tags/3D/index.html"]],
  ["v-cd35d44c","/tags/SSR/",{"title":"Tags"},["/tags/SSR/index.html"]],
  ["v-8e602d92","/tags/%E6%9D%90%E8%B4%A8/",{"title":"Tags"},["/tags/材质/","/tags/%E6%9D%90%E8%B4%A8/index.html"]],
  ["v-83b85b80","/tags/%E6%A8%A1%E5%9D%97%E5%8C%96%E7%B3%BB%E7%BB%9F/",{"title":"Tags"},["/tags/模块化系统/","/tags/%E6%A8%A1%E5%9D%97%E5%8C%96%E7%B3%BB%E7%BB%9F/index.html"]],
  ["v-12e84d60","/tags/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/",{"title":"Tags"},["/tags/浏览器工作原理/","/tags/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/index.html"]],
  ["v-55d0b4e0","/tags/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F/",{"title":"Tags"},["/tags/环境变量/","/tags/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F/index.html"]],
  ["v-2d51bdb1","/tags/%E7%A9%BA%E9%97%B4%E6%95%B0%E6%8D%AE%E5%BA%93/",{"title":"Tags"},["/tags/空间数据库/","/tags/%E7%A9%BA%E9%97%B4%E6%95%B0%E6%8D%AE%E5%BA%93/index.html"]],
  ["v-5ccfd5fb","/tags/postgis/",{"title":"Tags"},["/tags/postgis/index.html"]],
  ["v-abc70fca","/tags/pg/",{"title":"Tags"},["/tags/pg/index.html"]],
  ["v-ea143810","/tags/%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0/",{"title":"Tags"},["/tags/线性代数/","/tags/%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0/index.html"]],
  ["v-1ae551cb","/tags/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF/",{"title":"Tags"},["/tags/贝塞尔曲线/","/tags/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF/index.html"]],
  ["v-3a1f8885","/page/1/",{"title":"Home"},["/page/1/index.html"]],
  ["v-3a1f88a4","/page/2/",{"title":"Home"},["/page/2/index.html"]],
  ["v-3a1f88c3","/page/3/",{"title":"Home"},["/page/3/index.html"]],
  ["v-3a1f88e2","/page/4/",{"title":"Home"},["/page/4/index.html"]],
  ["v-3a1f8901","/page/5/",{"title":"Home"},["/page/5/index.html"]],
  ["v-3a1f8920","/page/6/",{"title":"Home"},["/page/6/index.html"]],
  ["v-3a1f893f","/page/7/",{"title":"Home"},["/page/7/index.html"]],
  ["v-3a1f895e","/page/8/",{"title":"Home"},["/page/8/index.html"]],
  ["v-3a1f897d","/page/9/",{"title":"Home"},["/page/9/index.html"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
