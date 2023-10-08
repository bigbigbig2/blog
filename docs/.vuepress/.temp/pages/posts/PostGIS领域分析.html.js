export const data = {
  "key": "v-6b33d780",
  "path": "/posts/PostGIS%E9%A2%86%E5%9F%9F%E5%88%86%E6%9E%90.html",
  "title": "使用PostGIS进行领域分析",
  "lang": "en-US",
  "frontmatter": {
    "layout": "Post",
    "title": "使用PostGIS进行领域分析",
    "date": "2022-11-17T00:00:00.000Z",
    "subtitle": "PostGIS领域分析，常见的领域分析应用、NN操作符、地理注记Geotagging",
    "useHeaderImage": true,
    "headerImage": "/img/in-post/2022-11-18/2.jpg",
    "tags": [
      "PostgreSQL",
      "PostGIS"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "1.最邻近搜索",
      "slug": "_1-最邻近搜索",
      "children": [
        {
          "level": 3,
          "title": "[1]哪些地方在x距离之内",
          "slug": "_1-哪些地方在x距离之内",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]使用ST_DWithin和 DISTINCT ON 查找最邻近位置",
          "slug": "_2-使用st-dwithin和-distinct-on-查找最邻近位置",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]带容差的相交",
          "slug": "_3-带容差的相交",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]距离范围内的地点",
          "slug": "_4-距离范围内的地点",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]使用KNN距离操作符查找 N 个最近的点",
          "slug": "_5-使用knn距离操作符查找-n-个最近的点",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "2.对地理类型使用KNN操作符",
      "slug": "_2-对地理类型使用knn操作符",
      "children": [
        {
          "level": 3,
          "title": "[1]使用窗口函数对最近的N个地点进行编号",
          "slug": "_1-使用窗口函数对最近的n个地点进行编号",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "3.地理注记Geotagging",
      "slug": "_3-地理注记geotagging",
      "children": [
        {
          "level": 3,
          "title": "[1]将数据标记到特定区域",
          "slug": "_1-将数据标记到特定区域",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]线性参考：将点捕捉到最近的线串",
          "slug": "_2-线性参考-将点捕捉到最近的线串",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]PostGIS空间聚合窗口函数",
          "slug": "_3-postgis空间聚合窗口函数",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1679201802000
  },
  "readingTime": {
    "minutes": 18,
    "words": 4168
  },
  "filePathRelative": "posts/PostGIS领域分析.md"
}
