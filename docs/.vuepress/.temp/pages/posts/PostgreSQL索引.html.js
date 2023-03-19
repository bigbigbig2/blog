export const data = {
  "key": "v-24f00c16",
  "path": "/posts/PostgreSQL%E7%B4%A2%E5%BC%95.html",
  "title": "PostgreSQL索引",
  "lang": "en-US",
  "frontmatter": {
    "layout": "Post",
    "title": "PostgreSQL索引",
    "date": "2022-09-10T00:00:00.000Z",
    "useHeaderImage": true,
    "headerImage": "/img/in-post/2022-9-10/2.jpg",
    "tags": [
      "PostgreSQL"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "0.索引引擎与原理",
      "slug": "_0-索引引擎与原理",
      "children": []
    },
    {
      "level": 3,
      "title": "1.创建索引",
      "slug": "_1-创建索引",
      "children": []
    },
    {
      "level": 3,
      "title": "2.删除索引",
      "slug": "_2-删除索引",
      "children": []
    },
    {
      "level": 3,
      "title": "3.显示索引",
      "slug": "_3-显示索引",
      "children": []
    },
    {
      "level": 3,
      "title": "4.索引方法/访问方法",
      "slug": "_4-索引方法-访问方法",
      "children": [
        {
          "level": 4,
          "title": "[1]B-tree 索引",
          "slug": "_1-b-tree-索引",
          "children": []
        },
        {
          "level": 4,
          "title": "[2]Hash索引",
          "slug": "_2-hash索引",
          "children": []
        },
        {
          "level": 4,
          "title": "[3]GIN 索引",
          "slug": "_3-gin-索引",
          "children": []
        },
        {
          "level": 4,
          "title": "[4]BRIN索引",
          "slug": "_4-brin索引",
          "children": []
        },
        {
          "level": 4,
          "title": "[4]GiST 索引",
          "slug": "_4-gist-索引",
          "children": []
        },
        {
          "level": 4,
          "title": "[5]SP-GiST 索引",
          "slug": "_5-sp-gist-索引",
          "children": []
        }
      ]
    },
    {
      "level": 3,
      "title": "5.唯一键索引",
      "slug": "_5-唯一键索引",
      "children": []
    },
    {
      "level": 3,
      "title": "6.表达式索引",
      "slug": "_6-表达式索引",
      "children": []
    },
    {
      "level": 3,
      "title": "7.部分索引",
      "slug": "_7-部分索引",
      "children": []
    },
    {
      "level": 3,
      "title": "8.REINDEX重置索引",
      "slug": "_8-reindex重置索引",
      "children": []
    },
    {
      "level": 3,
      "title": "9.多列索引",
      "slug": "_9-多列索引",
      "children": []
    },
    {
      "level": 3,
      "title": "10.执行计划器的解释",
      "slug": "_10-执行计划器的解释",
      "children": [
        {
          "level": 4,
          "title": "[1]文本解释与pgAdmin图形解释",
          "slug": "_1-文本解释与pgadmin图形解释",
          "children": [
            {
              "level": 5,
              "title": "图形解释器",
              "slug": "图形解释器",
              "children": []
            }
          ]
        },
        {
          "level": 4,
          "title": "[2]EXPLAIN输出结果解释",
          "slug": "_2-explain输出结果解释",
          "children": []
        },
        {
          "level": 4,
          "title": "[3]EXPLAIN使用示例",
          "slug": "_3-explain使用示例",
          "children": [
            {
              "level": 5,
              "title": "format option",
              "slug": "format-option",
              "children": []
            },
            {
              "level": 5,
              "title": "analyze option",
              "slug": "analyze-option",
              "children": []
            },
            {
              "level": 5,
              "title": "buffer option",
              "slug": "buffer-option",
              "children": []
            }
          ]
        },
        {
          "level": 4,
          "title": "[4]全表扫描",
          "slug": "_4-全表扫描",
          "children": []
        },
        {
          "level": 4,
          "title": "[5]索引扫描",
          "slug": "_5-索引扫描",
          "children": []
        },
        {
          "level": 4,
          "title": "[6]位图扫描",
          "slug": "_6-位图扫描",
          "children": []
        },
        {
          "level": 4,
          "title": "[7]条件过滤",
          "slug": "_7-条件过滤",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "",
      "slug": "",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1663764462000
  },
  "readingTime": {
    "minutes": 24,
    "words": 5779
  },
  "filePathRelative": "posts/PostgreSQL索引.md"
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
