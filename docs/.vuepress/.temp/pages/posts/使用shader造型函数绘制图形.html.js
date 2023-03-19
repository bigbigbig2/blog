export const data = {
  "key": "v-3a07e167",
  "path": "/posts/%E4%BD%BF%E7%94%A8shader%E9%80%A0%E5%9E%8B%E5%87%BD%E6%95%B0%E7%BB%98%E5%88%B6%E5%9B%BE%E5%BD%A2.html",
  "title": "使用shader造型函数绘制图形",
  "lang": "en-US",
  "frontmatter": {
    "layout": "Post",
    "title": "使用shader造型函数绘制图形",
    "date": "2022-11-01T00:00:00.000Z",
    "subtitle": "使用smoothstep、step、fract等函数绘制基础图形，加强shader编程思想",
    "useHeaderImage": true,
    "headerImage": "/img/in-post/2022-11-01/1.jpg",
    "tags": [
      "shader"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "1.shader片段着色器基础",
      "slug": "_1-shader片段着色器基础",
      "children": [
        {
          "level": 3,
          "title": "[1]片段着色器的并行处理结构",
          "slug": "_1-片段着色器的并行处理结构",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]Uniforms",
          "slug": "_2-uniforms",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]gl_FragCoord",
          "slug": "_3-gl-fragcoord",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "2.使用smoothstep函数绘制图形",
      "slug": "_2-使用smoothstep函数绘制图形",
      "children": [
        {
          "level": 3,
          "title": "[1]绘制圆",
          "slug": "_1-绘制圆",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]函数定义",
          "slug": "_2-函数定义",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]绘制直线",
          "slug": "_3-绘制直线",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]绘制曲线",
          "slug": "_4-绘制曲线",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "3.使用step函数绘制图形",
      "slug": "_3-使用step函数绘制图形",
      "children": [
        {
          "level": 3,
          "title": "[1]函数定义",
          "slug": "_1-函数定义",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "4.绘制矩形",
      "slug": "_4-绘制矩形",
      "children": []
    },
    {
      "level": 2,
      "title": "5.使用fract函数绘制网格",
      "slug": "_5-使用fract函数绘制网格",
      "children": [
        {
          "level": 3,
          "title": "[1]fract函数简介",
          "slug": "_1-fract函数简介",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]绘制网格",
          "slug": "_2-绘制网格",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "6.偏移图案",
      "slug": "_6-偏移图案",
      "children": [
        {
          "level": 3,
          "title": "[1]判断线程中行是奇数还是偶数",
          "slug": "_1-判断线程中行是奇数还是偶数",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "7.Truchet 瓷砖",
      "slug": "_7-truchet-瓷砖",
      "children": []
    },
    {
      "level": 2,
      "title": "8.符号距离场渲染SDF",
      "slug": "_8-符号距离场渲染sdf",
      "children": []
    },
    {
      "level": 2,
      "title": "参考",
      "slug": "参考",
      "children": []
    }
  ],
  "git": {
    "updatedTime": null
  },
  "readingTime": {
    "minutes": 17,
    "words": 3688
  },
  "filePathRelative": "posts/使用shader造型函数绘制图形.md"
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
