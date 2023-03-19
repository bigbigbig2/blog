export const data = {
  "key": "v-bf9bc1da",
  "path": "/posts/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%90%84%E7%A7%8D%E6%B5%81%E6%B0%B4%E7%BA%BF.html",
  "title": "浏览器运行原理浅析",
  "lang": "en-US",
  "frontmatter": {
    "layout": "Post",
    "title": "浏览器运行原理浅析",
    "date": "2022-03-08T00:00:00.000Z",
    "subtitle": "从输入URL到页面展示流程（HTTP请求流程、页面渲染流程）",
    "headerImage": "/img/in-post/bu/3.jpg",
    "catalog": true,
    "tags": [
      "浏览器工作原理"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "一、HTTP请求流程",
      "slug": "一、http请求流程",
      "children": [
        {
          "level": 3,
          "title": "[1]构建请求",
          "slug": "_1-构建请求",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]查找缓存",
          "slug": "_2-查找缓存",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]准备IP地址和端口",
          "slug": "_3-准备ip地址和端口",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]等待 TCP 队列",
          "slug": "_4-等待-tcp-队列",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]建立 TCP 连接",
          "slug": "_5-建立-tcp-连接",
          "children": []
        },
        {
          "level": 3,
          "title": "[6]发送 HTTP 请求",
          "slug": "_6-发送-http-请求",
          "children": []
        },
        {
          "level": 3,
          "title": "[7]返回请求",
          "slug": "_7-返回请求",
          "children": []
        },
        {
          "level": 3,
          "title": "[8]断开连接",
          "slug": "_8-断开连接",
          "children": []
        },
        {
          "level": 3,
          "title": "[9]重定向",
          "slug": "_9-重定向",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "二、从输入URL到页面展示流程",
      "slug": "二、从输入url到页面展示流程",
      "children": [
        {
          "level": 3,
          "title": "[1]用户输入",
          "slug": "_1-用户输入",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]URL 请求过程",
          "slug": "_2-url-请求过程",
          "children": [
            {
              "level": 4,
              "title": "响应数据类型处理",
              "slug": "响应数据类型处理",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[3]准备渲染进程",
          "slug": "_3-准备渲染进程",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]提交文档",
          "slug": "_4-提交文档",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]渲染阶段",
          "slug": "_5-渲染阶段",
          "children": []
        },
        {
          "level": 3,
          "title": "[6]总结",
          "slug": "_6-总结",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "三、页面渲染流程",
      "slug": "三、页面渲染流程",
      "children": [
        {
          "level": 3,
          "title": "[1]构建 DOM 树",
          "slug": "_1-构建-dom-树",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]样式计算（Recalculate Style）",
          "slug": "_2-样式计算-recalculate-style",
          "children": [
            {
              "level": 4,
              "title": "把 CSS 转换为浏览器能够理解的结构",
              "slug": "把-css-转换为浏览器能够理解的结构",
              "children": []
            },
            {
              "level": 4,
              "title": "转换样式表中的属性值，使其标准化",
              "slug": "转换样式表中的属性值-使其标准化",
              "children": []
            },
            {
              "level": 4,
              "title": "计算出 DOM 树中每个节点的具体样式",
              "slug": "计算出-dom-树中每个节点的具体样式",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[3]布局阶段",
          "slug": "_3-布局阶段",
          "children": [
            {
              "level": 4,
              "title": "创建布局树",
              "slug": "创建布局树",
              "children": []
            },
            {
              "level": 4,
              "title": "布局计算",
              "slug": "布局计算",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[4]分层",
          "slug": "_4-分层",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]图层绘制",
          "slug": "_5-图层绘制",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]栅格化（raster）操作",
          "slug": "_5-栅格化-raster-操作",
          "children": []
        },
        {
          "level": 3,
          "title": "[6]合成和显示",
          "slug": "_6-合成和显示",
          "children": []
        },
        {
          "level": 3,
          "title": "[7]页面渲染流程小结",
          "slug": "_7-页面渲染流程小结",
          "children": []
        },
        {
          "level": 3,
          "title": "[8]相关概念补充",
          "slug": "_8-相关概念补充",
          "children": [
            {
              "level": 4,
              "title": "渲染进程与GPU进程",
              "slug": "渲染进程与gpu进程",
              "children": []
            },
            {
              "level": 4,
              "title": "更新了元素的几何属性（重排）",
              "slug": "更新了元素的几何属性-重排",
              "children": []
            },
            {
              "level": 4,
              "title": "更新元素的绘制属性（重绘）",
              "slug": "更新元素的绘制属性-重绘",
              "children": []
            },
            {
              "level": 4,
              "title": "直接合成阶段",
              "slug": "直接合成阶段",
              "children": []
            }
          ]
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1663764462000
  },
  "readingTime": {
    "minutes": 28,
    "words": 7558
  },
  "filePathRelative": "posts/浏览器的各种流水线.md"
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
