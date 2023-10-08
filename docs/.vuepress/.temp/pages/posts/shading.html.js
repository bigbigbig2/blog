export const data = {
  "key": "v-58f2b2e4",
  "path": "/posts/shading.html",
  "title": "shading",
  "lang": "en-US",
  "frontmatter": {
    "layout": "Post",
    "title": "shading",
    "subtitle": "Blinn-Phong着色模型（漫反射、高光、环境光）、着色频率(平面、高洛德、冯氏着色)、图形（实时渲染）管线、纹理映射（纹理坐标、插值与中心坐标、纹素、双线性插值、Mipmap、三线性插值、各向异性过滤）、纹理的应用（球面、立方体、凹凸、位移贴图等）",
    "date": "2022-08-11T00:00:00.000Z",
    "useHeaderImage": true,
    "headerImage": "/img/in-post/bu/18.jpg",
    "tags": [
      "计算机图形学"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "1.着色的定义",
      "slug": "_1-着色的定义",
      "children": []
    },
    {
      "level": 2,
      "title": "2.Blinn-Phong Reflectance Model(着色模型)",
      "slug": "_2-blinn-phong-reflectance-model-着色模型",
      "children": [
        {
          "level": 3,
          "title": "[1]Diffuse(漫反射)",
          "slug": "_1-diffuse-漫反射",
          "children": [
            {
              "level": 4,
              "title": "兰伯特余弦定律",
              "slug": "兰伯特余弦定律",
              "children": []
            },
            {
              "level": 4,
              "title": "小结",
              "slug": "小结",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[2]Specular(高光)",
          "slug": "_2-specular-高光",
          "children": [
            {
              "level": 4,
              "title": "半程向量",
              "slug": "半程向量",
              "children": []
            },
            {
              "level": 4,
              "title": "公式推导",
              "slug": "公式推导",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[3]Ambient(环境光)",
          "slug": "_3-ambient-环境光",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]小结",
          "slug": "_4-小结",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "3.Shading Frequecies着色频率",
      "slug": "_3-shading-frequecies着色频率",
      "children": [
        {
          "level": 3,
          "title": "[1]Falt shading平面着色",
          "slug": "_1-falt-shading平面着色",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]Gouraud shading高洛德着色",
          "slug": "_2-gouraud-shading高洛德着色",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]Phong shading冯氏着色",
          "slug": "_3-phong-shading冯氏着色",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]定义每个顶点的法向量",
          "slug": "_4-定义每个顶点的法向量",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]定义逐像素的法线",
          "slug": "_5-定义逐像素的法线",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "4.Graphics (Real-time Rendering) Pipeline",
      "slug": "_4-graphics-real-time-rendering-pipeline",
      "children": [
        {
          "level": 3,
          "title": "[1]Shader Programs",
          "slug": "_1-shader-programs",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]GPU",
          "slug": "_2-gpu",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "5.Texture Mapping纹理映射",
      "slug": "_5-texture-mapping纹理映射",
      "children": [
        {
          "level": 3,
          "title": "[1]纹理坐标",
          "slug": "_1-纹理坐标",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]应用纹理",
          "slug": "_3-应用纹理",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]Texel纹素",
          "slug": "_4-texel纹素",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]Bilinear双线性插值",
          "slug": "_5-bilinear双线性插值",
          "children": []
        },
        {
          "level": 3,
          "title": "[6]纹素采样问题",
          "slug": "_6-纹素采样问题",
          "children": []
        },
        {
          "level": 3,
          "title": "[7]Mipmap",
          "slug": "_7-mipmap",
          "children": [
            {
              "level": 4,
              "title": "Trilinear Interpolation三线性插值",
              "slug": "trilinear-interpolation三线性插值",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[8]Anisotropic Filtering各向异性过滤",
          "slug": "_8-anisotropic-filtering各向异性过滤",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "6.纹理的应用",
      "slug": "_6-纹理的应用",
      "children": [
        {
          "level": 3,
          "title": "[1]Spherical Map球面贴图",
          "slug": "_1-spherical-map球面贴图",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]Bump Mapping凹凸贴图",
          "slug": "_3-bump-mapping凹凸贴图",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]Displacement mapping位移贴图",
          "slug": "_4-displacement-mapping位移贴图",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]其他应用",
          "slug": "_5-其他应用",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1679201802000
  },
  "readingTime": {
    "minutes": 31,
    "words": 7849
  },
  "filePathRelative": "posts/shading.md"
}
