export const data = {
  "key": "v-02c3439c",
  "path": "/posts/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93SSR.html",
  "title": "服务端渲染SSR",
  "lang": "en-US",
  "frontmatter": {
    "layout": "Post",
    "title": "服务端渲染SSR",
    "date": "2021-12-25T00:00:00.000Z",
    "headerImage": "/img/in-post/bu/12.jpg",
    "catalog": true,
    "tags": [
      "SSR"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "一，补充:浏览器渲染HTML页面过程",
      "slug": "一-补充-浏览器渲染html页面过程",
      "children": []
    },
    {
      "level": 3,
      "title": "二，客户端渲染CSR",
      "slug": "二-客户端渲染csr",
      "children": []
    },
    {
      "level": 3,
      "title": "三，服务端渲染SSR",
      "slug": "三-服务端渲染ssr",
      "children": [
        {
          "level": 4,
          "title": "理解",
          "slug": "理解",
          "children": []
        },
        {
          "level": 4,
          "title": "服务的渲染的历程",
          "slug": "服务的渲染的历程",
          "children": [
            {
              "level": 5,
              "title": "最初只有服务端渲染",
              "slug": "最初只有服务端渲染",
              "children": []
            },
            {
              "level": 5,
              "title": "出现客户端渲染（出现前后端分离）",
              "slug": "出现客户端渲染-出现前后端分离",
              "children": []
            },
            {
              "level": 5,
              "title": "又出现服务端渲染",
              "slug": "又出现服务端渲染",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "level": 3,
      "title": "四，服务端渲染的利弊",
      "slug": "四-服务端渲染的利弊",
      "children": [
        {
          "level": 4,
          "title": "优点",
          "slug": "优点",
          "children": [
            {
              "level": 5,
              "title": "利于SEO",
              "slug": "利于seo",
              "children": []
            },
            {
              "level": 5,
              "title": "有利于爬虫来爬你的页面",
              "slug": "有利于爬虫来爬你的页面",
              "children": []
            },
            {
              "level": 5,
              "title": "首屏加载事件短",
              "slug": "首屏加载事件短",
              "children": []
            }
          ]
        },
        {
          "level": 4,
          "title": "缺点",
          "slug": "缺点",
          "children": []
        }
      ]
    },
    {
      "level": 3,
      "title": "五，同构",
      "slug": "五-同构",
      "children": [
        {
          "level": 4,
          "title": "同构的定义",
          "slug": "同构的定义",
          "children": []
        },
        {
          "level": 4,
          "title": "同构的实现",
          "slug": "同构的实现",
          "children": []
        }
      ]
    },
    {
      "level": 3,
      "title": "六，实践",
      "slug": "六-实践",
      "children": [
        {
          "level": 4,
          "title": "实现基础的NODEJS服务端渲染",
          "slug": "实现基础的nodejs服务端渲染",
          "children": []
        },
        {
          "level": 4,
          "title": "实现基础的VUE客户端渲染",
          "slug": "实现基础的vue客户端渲染",
          "children": [
            {
              "level": 5,
              "title": "",
              "slug": "",
              "children": []
            }
          ]
        },
        {
          "level": 4,
          "title": "同构VUE项目",
          "slug": "同构vue项目",
          "children": [
            {
              "level": 5,
              "title": "构建配置",
              "slug": "构建配置",
              "children": []
            },
            {
              "level": 5,
              "title": "第一步：构建服务端代码",
              "slug": "第一步-构建服务端代码",
              "children": []
            },
            {
              "level": 5,
              "title": "实现模板组件的共享",
              "slug": "实现模板组件的共享",
              "children": []
            },
            {
              "level": 5,
              "title": "实现路由的共享",
              "slug": "实现路由的共享",
              "children": []
            },
            {
              "level": 5,
              "title": "数据模型的共享与状态同步",
              "slug": "数据模型的共享与状态同步",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "level": 3,
      "title": "七，ssr的两种模式",
      "slug": "七-ssr的两种模式",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1660906395000
  },
  "readingTime": {
    "minutes": 13,
    "words": 3153
  },
  "filePathRelative": "posts/服务端渲染SSR.md"
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
