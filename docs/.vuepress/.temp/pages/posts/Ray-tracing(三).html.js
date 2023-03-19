export const data = {
  "key": "v-545a9331",
  "path": "/posts/Ray-tracing(%E4%B8%89).html",
  "title": "光线追踪(三)",
  "lang": "en-US",
  "frontmatter": {
    "layout": "Post",
    "title": "光线追踪(三)",
    "subtitle": "Monte Carlo Integration蒙特卡洛积分、Path Tracing路径追踪（Russian Roulette俄罗斯轮盘 、对光源进行采样等）",
    "date": "2022-08-19T00:00:00.000Z",
    "useHeaderImage": true,
    "headerImage": "/img/in-post/2022-8-19/1.jpg",
    "tags": [
      "计算机图形学",
      "光线追踪"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "1.Monte Carlo Integration蒙特卡洛积分",
      "slug": "_1-monte-carlo-integration蒙特卡洛积分",
      "children": []
    },
    {
      "level": 2,
      "title": "2.Path Tracing路径追踪",
      "slug": "_2-path-tracing路径追踪",
      "children": [
        {
          "level": 3,
          "title": "[1]路径追踪",
          "slug": "_1-路径追踪",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]Russian Roulette俄罗斯轮盘赌",
          "slug": "_2-russian-roulette俄罗斯轮盘赌",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]对光源进行采样",
          "slug": "_3-对光源进行采样",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1663764462000
  },
  "readingTime": {
    "minutes": 11,
    "words": 2559
  },
  "filePathRelative": "posts/Ray-tracing(三).md"
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
