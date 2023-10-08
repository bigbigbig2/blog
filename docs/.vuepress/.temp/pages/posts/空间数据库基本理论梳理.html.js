export const data = {
  "key": "v-2b611e2f",
  "path": "/posts/%E7%A9%BA%E9%97%B4%E6%95%B0%E6%8D%AE%E5%BA%93%E5%9F%BA%E6%9C%AC%E7%90%86%E8%AE%BA%E6%A2%B3%E7%90%86.html",
  "title": "空间数据库理论基础",
  "lang": "en-US",
  "frontmatter": {
    "layout": "Post",
    "title": "空间数据库理论基础",
    "date": "2022-03-28T00:00:00.000Z",
    "headerImage": "/img/in-post/bu/13.jpg",
    "catalog": true,
    "tags": [
      "空间数据库",
      "postgis",
      "pg"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "1.空间数据库概述",
      "slug": "_1-空间数据库概述",
      "children": [
        {
          "level": 3,
          "title": "[1]空间实体",
          "slug": "_1-空间实体",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]空间数据的特征",
          "slug": "_2-空间数据的特征",
          "children": [
            {
              "level": 4,
              "title": "空间特征",
              "slug": "空间特征",
              "children": []
            },
            {
              "level": 4,
              "title": "非结构化特征",
              "slug": "非结构化特征",
              "children": []
            },
            {
              "level": 4,
              "title": "空间关系特征",
              "slug": "空间关系特征",
              "children": []
            },
            {
              "level": 4,
              "title": "时态特征",
              "slug": "时态特征",
              "children": []
            },
            {
              "level": 4,
              "title": "多尺度特征",
              "slug": "多尺度特征",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[3]空间数据库的三大要素",
          "slug": "_3-空间数据库的三大要素",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]空间数据库vs一般数据库",
          "slug": "_4-空间数据库vs一般数据库",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]常见的空间数据库管理系统",
          "slug": "_5-常见的空间数据库管理系统",
          "children": []
        },
        {
          "level": 3,
          "title": "[6]空间数据类型",
          "slug": "_6-空间数据类型",
          "children": []
        },
        {
          "level": 3,
          "title": "[7]空间函数",
          "slug": "_7-空间函数",
          "children": []
        },
        {
          "level": 3,
          "title": "[8]postgis简介",
          "slug": "_8-postgis简介",
          "children": []
        },
        {
          "level": 3,
          "title": "[9]空间数据库标准规范",
          "slug": "_9-空间数据库标准规范",
          "children": [
            {
              "level": 4,
              "title": "SFA SQL",
              "slug": "sfa-sql",
              "children": []
            },
            {
              "level": 4,
              "title": "SQL/MM",
              "slug": "sql-mm",
              "children": []
            },
            {
              "level": 4,
              "title": "两个标准的对比分析（重点）",
              "slug": "两个标准的对比分析-重点",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "level": 2,
      "title": "2.几何对象模型",
      "slug": "_2-几何对象模型",
      "children": [
        {
          "level": 3,
          "title": "[1]空间数据模型",
          "slug": "_1-空间数据模型",
          "children": [
            {
              "level": 4,
              "title": "什么是数据模型？",
              "slug": "什么是数据模型",
              "children": []
            },
            {
              "level": 4,
              "title": "空间数据模型的分类",
              "slug": "空间数据模型的分类",
              "children": [
                {
                  "level": 5,
                  "title": "矢量模型",
                  "slug": "矢量模型",
                  "children": []
                },
                {
                  "level": 5,
                  "title": "栅格模型",
                  "slug": "栅格模型",
                  "children": []
                },
                {
                  "level": 5,
                  "title": "注记文字模型",
                  "slug": "注记文字模型",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "level": 3,
          "title": "[2]几何对象模型",
          "slug": "_2-几何对象模型-1",
          "children": [
            {
              "level": 4,
              "title": "概念模型",
              "slug": "概念模型",
              "children": [
                {
                  "level": 5,
                  "title": "地理要素(feature)",
                  "slug": "地理要素-feature",
                  "children": []
                },
                {
                  "level": 5,
                  "title": "理解该模型的几个要点",
                  "slug": "理解该模型的几个要点",
                  "children": []
                },
                {
                  "level": 5,
                  "title": "几何对象的方法（函数）",
                  "slug": "几何对象的方法-函数",
                  "children": []
                },
                {
                  "level": 5,
                  "title": "空间拓扑关系",
                  "slug": "空间拓扑关系",
                  "children": []
                }
              ]
            },
            {
              "level": 4,
              "title": "逻辑模型",
              "slug": "逻辑模型",
              "children": [
                {
                  "level": 5,
                  "title": "基于预定义数据类型的实现",
                  "slug": "基于预定义数据类型的实现",
                  "children": []
                },
                {
                  "level": 5,
                  "title": "基于扩展几何类型的实现",
                  "slug": "基于扩展几何类型的实现",
                  "children": []
                }
              ]
            },
            {
              "level": 4,
              "title": "物理模型",
              "slug": "物理模型",
              "children": [
                {
                  "level": 5,
                  "title": "WKB",
                  "slug": "wkb",
                  "children": []
                },
                {
                  "level": 5,
                  "title": "WKT",
                  "slug": "wkt",
                  "children": []
                },
                {
                  "level": 5,
                  "title": "注意事项",
                  "slug": "注意事项",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "level": 2,
      "title": "3.空间结构化查询语言",
      "slug": "_3-空间结构化查询语言",
      "children": []
    },
    {
      "level": 2,
      "title": "4,常用开源GIS工具",
      "slug": "_4-常用开源gis工具",
      "children": [
        {
          "level": 3,
          "title": "[1]postgis",
          "slug": "_1-postgis",
          "children": [
            {
              "level": 4,
              "title": "PostGIS中常用数据类型",
              "slug": "postgis中常用数据类型",
              "children": []
            },
            {
              "level": 4,
              "title": "Shapefile数据导入",
              "slug": "shapefile数据导入",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[2]OpenStreetMap",
          "slug": "_2-openstreetmap",
          "children": [
            {
              "level": 4,
              "title": "OSM数据结构",
              "slug": "osm数据结构",
              "children": []
            },
            {
              "level": 4,
              "title": "OSM数据及下载",
              "slug": "osm数据及下载",
              "children": []
            },
            {
              "level": 4,
              "title": "基于OSM数据搭建一个地图服务",
              "slug": "基于osm数据搭建一个地图服务",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "level": 2,
      "title": "5.矢量数据的定义与操纵",
      "slug": "_5-矢量数据的定义与操纵",
      "children": [
        {
          "level": 4,
          "title": "[1]数据定义与插入",
          "slug": "_1-数据定义与插入",
          "children": []
        },
        {
          "level": 4,
          "title": "[2]管理函数",
          "slug": "_2-管理函数",
          "children": []
        },
        {
          "level": 4,
          "title": "[3]构造函数",
          "slug": "_3-构造函数",
          "children": []
        },
        {
          "level": 4,
          "title": "[4]访问函数",
          "slug": "_4-访问函数",
          "children": []
        },
        {
          "level": 4,
          "title": "[5]输出函数",
          "slug": "_5-输出函数",
          "children": []
        },
        {
          "level": 4,
          "title": "[4]编辑函数",
          "slug": "_4-编辑函数",
          "children": []
        },
        {
          "level": 4,
          "title": "[4]几何处理函数",
          "slug": "_4-几何处理函数",
          "children": []
        },
        {
          "level": 4,
          "title": "[4]操作符",
          "slug": "_4-操作符",
          "children": []
        },
        {
          "level": 4,
          "title": "[4]空间关系函数",
          "slug": "_4-空间关系函数",
          "children": []
        },
        {
          "level": 4,
          "title": "[4]量测函数",
          "slug": "_4-量测函数",
          "children": []
        },
        {
          "level": 4,
          "title": "[4]线性参考",
          "slug": "_4-线性参考",
          "children": []
        },
        {
          "level": 4,
          "title": "[4]其他函数",
          "slug": "_4-其他函数",
          "children": [
            {
              "level": 5,
              "title": "总结",
              "slug": "总结",
              "children": []
            }
          ]
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1679201802000
  },
  "readingTime": {
    "minutes": 40,
    "words": 9849
  },
  "filePathRelative": "posts/空间数据库基本理论梳理.md"
}
