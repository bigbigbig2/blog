import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-74bc627b","/about/",{"title":"About"},["/about/index.html","/about/README.md"]],
  ["v-f0388862","/links/",{"title":"Links"},["/links/index.html","/links/README.md"]],
  ["v-35e59034","/post/2021/12/09/axios%E4%BA%8C%E6%AC%A1%E5%B0%81%E8%A3%85/",{"title":"axios二次封装"},["/post/2021/12/09/axios二次封装/","/post/2021/12/09/axios%E4%BA%8C%E6%AC%A1%E5%B0%81%E8%A3%85/index.html","/posts/axios二次封装.html","/posts/axios%E4%BA%8C%E6%AC%A1%E5%B0%81%E8%A3%85.html","/posts/axios二次封装.md","/posts/axios%E4%BA%8C%E6%AC%A1%E5%B0%81%E8%A3%85.md"]],
  ["v-364cdc28","/posts/Basic%20radiometry%20(%E8%BE%90%E5%B0%84%E5%BA%A6%E9%87%8F%E5%AD%A6).html",{"title":"光线追踪(二)——辐射度量学"},["/posts/Basic radiometry (辐射度量学).html","/posts/Basic%20radiometry%20(%E8%BE%90%E5%B0%84%E5%BA%A6%E9%87%8F%E5%AD%A6)","/posts/Basic radiometry (辐射度量学).md","/posts/Basic%20radiometry%20(%E8%BE%90%E5%B0%84%E5%BA%A6%E9%87%8F%E5%AD%A6).md"]],
  ["v-75417d86","/posts/cesium%E4%B8%AD%E7%9A%84%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F%E4%B8%8E%E8%BD%AC%E6%8D%A2.html",{"title":"cesium中的坐标系及转换"},["/posts/cesium中的坐标系统与转换.html","/posts/cesium%E4%B8%AD%E7%9A%84%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F%E4%B8%8E%E8%BD%AC%E6%8D%A2","/posts/cesium中的坐标系统与转换.md","/posts/cesium%E4%B8%AD%E7%9A%84%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F%E4%B8%8E%E8%BD%AC%E6%8D%A2.md"]],
  ["v-01ae88c7","/posts/Rasterization.html",{"title":"Rasterization"},["/posts/Rasterization","/posts/Rasterization.md"]],
  ["v-545a9331","/posts/Ray-tracing(%E4%B8%89).html",{"title":"光线追踪(三)"},["/posts/Ray-tracing(三).html","/posts/Ray-tracing(%E4%B8%89)","/posts/Ray-tracing(三).md","/posts/Ray-tracing(%E4%B8%89).md"]],
  ["v-08874067","/posts/script-steup.html",{"title":"vue中setup,script setup语法糖梳理"},["/posts/script-steup","/posts/script-steup.md"]],
  ["v-58f2b2e4","/posts/shading.html",{"title":"shading"},["/posts/shading","/posts/shading.md"]],
  ["v-9beafb4a","/posts/transformation.html",{"title":"transformation"},["/posts/transformation","/posts/transformation.md"]],
  ["v-fb9d97a2","/post/2021/12/23/ts%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F%E6%B7%B1%E5%85%A5/",{"title":"ts类型系统补充"},["/post/2021/12/23/ts类型系统深入/","/post/2021/12/23/ts%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F%E6%B7%B1%E5%85%A5/index.html","/posts/ts类型系统深入.html","/posts/ts%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F%E6%B7%B1%E5%85%A5.html","/posts/ts类型系统深入.md","/posts/ts%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F%E6%B7%B1%E5%85%A5.md"]],
  ["v-7fe3092c","/post/2021/12/06/vim/",{"title":"vim"},["/post/2021/12/06/vim/index.html","/posts/vim.html","/posts/vim.md"]],
  ["v-1c96a276","/posts/%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA(%E4%B8%80%EF%BC%89.html",{"title":"光线追踪(一)"},["/posts/光线追踪(一）.html","/posts/%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA(%E4%B8%80%EF%BC%89","/posts/光线追踪(一）.md","/posts/%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA(%E4%B8%80%EF%BC%89.md"]],
  ["v-44efba9b","/posts/%E5%87%A0%E4%BD%95.html",{"title":"geometry"},["/posts/几何.html","/posts/%E5%87%A0%E4%BD%95","/posts/几何.md","/posts/%E5%87%A0%E4%BD%95.md"]],
  ["v-2ce8da2d","/posts/%E5%8F%AF%E8%A7%86%E5%8C%96%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB%E6%B5%85%E6%9E%90.html",{"title":"WEB可视化体系浅析"},["/posts/可视化知识体系浅析.html","/posts/%E5%8F%AF%E8%A7%86%E5%8C%96%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB%E6%B5%85%E6%9E%90","/posts/可视化知识体系浅析.md","/posts/%E5%8F%AF%E8%A7%86%E5%8C%96%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB%E6%B5%85%E6%9E%90.md"]],
  ["v-2a39674b","/posts/%E5%93%88%E5%A4%AB%E6%9B%BC%E6%A0%91.html",{"title":"哈夫曼树"},["/posts/哈夫曼树.html","/posts/%E5%93%88%E5%A4%AB%E6%9B%BC%E6%A0%91","/posts/哈夫曼树.md","/posts/%E5%93%88%E5%A4%AB%E6%9B%BC%E6%A0%91.md"]],
  ["v-b5ff2e00","/posts/%E5%9B%BE%E5%BD%A2%E5%AD%A6%E4%B8%AD%E7%9A%84%E6%95%B0%E5%AD%A6%E7%9F%A5%E8%AF%86.html",{"title":"可视化中的数学基础"},["/posts/图形学中的数学知识.html","/posts/%E5%9B%BE%E5%BD%A2%E5%AD%A6%E4%B8%AD%E7%9A%84%E6%95%B0%E5%AD%A6%E7%9F%A5%E8%AF%86","/posts/图形学中的数学知识.md","/posts/%E5%9B%BE%E5%BD%A2%E5%AD%A6%E4%B8%AD%E7%9A%84%E6%95%B0%E5%AD%A6%E7%9F%A5%E8%AF%86.md"]],
  ["v-02c3439c","/posts/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93SSR.html",{"title":"服务端渲染SSR"},["/posts/服务端渲染SSR.html","/posts/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93SSR","/posts/服务端渲染SSR.md","/posts/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93SSR.md"]],
  ["v-74bbfe04","/posts/%E6%9D%90%E8%B4%A8%E4%B8%8E%E8%A1%A8%E9%9D%A2.html",{"title":"材质与表面"},["/posts/材质与表面.html","/posts/%E6%9D%90%E8%B4%A8%E4%B8%8E%E8%A1%A8%E9%9D%A2","/posts/材质与表面.md","/posts/%E6%9D%90%E8%B4%A8%E4%B8%8E%E8%A1%A8%E9%9D%A2.md"]],
  ["v-562fabc0","/posts/%E6%A8%A1%E5%9D%97%E5%8C%96.html",{"title":"模块化系统"},["/posts/模块化.html","/posts/%E6%A8%A1%E5%9D%97%E5%8C%96","/posts/模块化.md","/posts/%E6%A8%A1%E5%9D%97%E5%8C%96.md"]],
  ["v-bf9bc1da","/posts/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%90%84%E7%A7%8D%E6%B5%81%E6%B0%B4%E7%BA%BF.html",{"title":"浏览器运行三大流水线"},["/posts/浏览器的各种流水线.html","/posts/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%90%84%E7%A7%8D%E6%B5%81%E6%B0%B4%E7%BA%BF","/posts/浏览器的各种流水线.md","/posts/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%90%84%E7%A7%8D%E6%B5%81%E6%B0%B4%E7%BA%BF.md"]],
  ["v-2970661c","/posts/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html",{"title":"环境变量及在前端项目中的配置"},["/posts/环境变量.html","/posts/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F","/posts/环境变量.md","/posts/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.md"]],
  ["v-2b611e2f","/posts/%E7%A9%BA%E9%97%B4%E6%95%B0%E6%8D%AE%E5%BA%93%E5%9F%BA%E6%9C%AC%E7%90%86%E8%AE%BA%E6%A2%B3%E7%90%86.html",{"title":"空间数据库理论基础"},["/posts/空间数据库基本理论梳理.html","/posts/%E7%A9%BA%E9%97%B4%E6%95%B0%E6%8D%AE%E5%BA%93%E5%9F%BA%E6%9C%AC%E7%90%86%E8%AE%BA%E6%A2%B3%E7%90%86","/posts/空间数据库基本理论梳理.md","/posts/%E7%A9%BA%E9%97%B4%E6%95%B0%E6%8D%AE%E5%BA%93%E5%9F%BA%E6%9C%AC%E7%90%86%E8%AE%BA%E6%A2%B3%E7%90%86.md"]],
  ["v-c4e09fec","/posts/%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0.html",{"title":"线性代数的本质"},["/posts/线性代数.html","/posts/%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0","/posts/线性代数.md","/posts/%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0.md"]],
  ["v-75d99ce6","/posts/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF.html",{"title":"贝塞尔曲线"},["/posts/贝塞尔曲线.html","/posts/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF","/posts/贝塞尔曲线.md","/posts/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF.md"]],
  ["v-36a1c02c","/posts/%E9%AB%98%E7%BA%A7%E5%85%89%E7%BA%BF%E4%BC%A0%E6%92%AD%E4%B8%8E%E5%A4%8D%E6%9D%82%E5%A4%96%E8%A7%82%E5%BB%BA%E6%A8%A1.html",{"title":"高级的光线传播与复杂外观建模"},["/posts/高级光线传播与复杂外观建模.html","/posts/%E9%AB%98%E7%BA%A7%E5%85%89%E7%BA%BF%E4%BC%A0%E6%92%AD%E4%B8%8E%E5%A4%8D%E6%9D%82%E5%A4%96%E8%A7%82%E5%BB%BA%E6%A8%A1","/posts/高级光线传播与复杂外观建模.md","/posts/%E9%AB%98%E7%BA%A7%E5%85%89%E7%BA%BF%E4%BC%A0%E6%92%AD%E4%B8%8E%E5%A4%8D%E6%9D%82%E5%A4%96%E8%A7%82%E5%BB%BA%E6%A8%A1.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
  ["v-8daa1a0e","/",{"title":"Home"},["/index.html"]],
  ["v-15534fdd","/tags/",{"title":"Tags"},["/tags/index.html"]],
  ["v-23208ed4","/tags/axios/",{"title":"Tags"},["/tags/axios/index.html"]],
  ["v-1ca2c79e","/tags/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9B%BE%E5%BD%A2%E5%AD%A6/",{"title":"Tags"},["/tags/计算机图形学/","/tags/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9B%BE%E5%BD%A2%E5%AD%A6/index.html"]],
  ["v-4b57b843","/tags/%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA/",{"title":"Tags"},["/tags/光线追踪/","/tags/%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA/index.html"]],
  ["v-2971fce2","/tags/cesium/",{"title":"Tags"},["/tags/cesium/index.html"]],
  ["v-9feff422","/tags/%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F/",{"title":"Tags"},["/tags/坐标系统/","/tags/%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F/index.html"]],
  ["v-cd14fe74","/tags/vue/",{"title":"Tags"},["/tags/vue/index.html"]],
  ["v-abc6eeda","/tags/ts/",{"title":"Tags"},["/tags/ts/index.html"]],
  ["v-cd15569c","/tags/vim/",{"title":"Tags"},["/tags/vim/index.html"]],
  ["v-6cf5868e","/tags/%E5%8F%AF%E8%A7%86%E5%8C%96/",{"title":"Tags"},["/tags/可视化/","/tags/%E5%8F%AF%E8%A7%86%E5%8C%96/index.html"]],
  ["v-63f73328","/tags/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/",{"title":"Tags"},["/tags/数据结构与算法/","/tags/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/index.html"]],
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
