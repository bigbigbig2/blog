export const data = {
  "key": "v-1c96a276",
  "path": "/posts/%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA(%E4%B8%80%EF%BC%89.html",
  "title": "光线追踪(一)",
  "lang": "en-US",
  "frontmatter": {
    "layout": "Post",
    "title": "光线追踪(一)",
    "subtitle": "基础的光线追踪算法(Ray Casting光线投射、Whitted-Style 递归光线追踪)、光线于物体求交（包围盒）、统一空间分区、空间划分（KD-tree）、BVH &对象划分",
    "date": "2022-08-18T00:00:00.000Z",
    "useHeaderImage": true,
    "headerImage": "/img/in-post/bu/20.png",
    "tags": [
      "计算机图形学",
      "光线追踪"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "1.为什么要光线追踪",
      "slug": "_1-为什么要光线追踪",
      "children": []
    },
    {
      "level": 2,
      "title": "2.基础的光线追踪算法",
      "slug": "_2-基础的光线追踪算法",
      "children": [
        {
          "level": 3,
          "title": "[1]Ray Casting（光线投射）",
          "slug": "_1-ray-casting-光线投射",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]Whitted-Style 递归光线追踪",
          "slug": "_2-whitted-style-递归光线追踪",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "３.光线与平面交点",
      "slug": "_3-光线与平面交点",
      "children": [
        {
          "level": 3,
          "title": "[1]光线方程及应用",
          "slug": "_1-光线方程及应用",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]光线和隐式表面的求交",
          "slug": "_2-光线和隐式表面的求交",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]光线和显式表面的求交",
          "slug": "_3-光线和显式表面的求交",
          "children": [
            {
              "level": 4,
              "title": "光线与三角形求交",
              "slug": "光线与三角形求交",
              "children": []
            },
            {
              "level": 4,
              "title": "Möller Trumbore算法",
              "slug": "moller-trumbore算法",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[4]Box包围盒",
          "slug": "_4-box包围盒",
          "children": [
            {
              "level": 4,
              "title": "光线与二维包围盒求交",
              "slug": "光线与二维包围盒求交",
              "children": []
            },
            {
              "level": 4,
              "title": "为什么要使用轴对齐？",
              "slug": "为什么要使用轴对齐",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "level": 2,
      "title": "4.Using AABBs to accelerate ray tracing",
      "slug": "_4-using-aabbs-to-accelerate-ray-tracing",
      "children": [
        {
          "level": 3,
          "title": "[1]Uniform Spatial Partitions (Grids)统一空间分区",
          "slug": "_1-uniform-spatial-partitions-grids-统一空间分区",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]Spatial Partitions空间划分",
          "slug": "_2-spatial-partitions空间划分",
          "children": [
            {
              "level": 4,
              "title": "KD-tree",
              "slug": "kd-tree",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[3]BVH & 对象划分",
          "slug": "_3-bvh-对象划分",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1663764462000
  },
  "readingTime": {
    "minutes": 13,
    "words": 3227
  },
  "filePathRelative": "posts/光线追踪(一）.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
