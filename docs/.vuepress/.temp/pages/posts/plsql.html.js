export const data = {
  "key": "v-54caea7c",
  "path": "/posts/plsql.html",
  "title": "PL/pgSQL",
  "lang": "en-US",
  "frontmatter": {
    "layout": "Post",
    "title": "PL/pgSQL",
    "date": "2022-09-10T00:00:00.000Z",
    "subtitle": "PL/pgSQL基本语法、用户自定义函数、存储过程、Cursor游标、触发器等",
    "useHeaderImage": true,
    "headerImage": "/img/in-post/2022-9-10/1.jpg",
    "tags": [
      "PostgreSQL",
      "PL/pgSQL"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "1.简介",
      "slug": "_1-简介",
      "children": [
        {
          "level": 3,
          "title": "[1]使用PL/pgSQL的优点",
          "slug": "_1-使用pl-pgsql的优点",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]PostgreSQL PL/pgSQL 的缺点",
          "slug": "_2-postgresql-pl-pgsql-的缺点",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "2.$$符号引用的字符串常量",
      "slug": "_2-符号引用的字符串常量",
      "children": [
        {
          "level": 3,
          "title": "[1]在匿名块中使用$$",
          "slug": "_1-在匿名块中使用",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]在函数中使用$$",
          "slug": "_2-在函数中使用",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]在存储过程中使用$$",
          "slug": "_2-在存储过程中使用",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "3.PL/pgSQL 块结构",
      "slug": "_3-pl-pgsql-块结构",
      "children": [
        {
          "level": 3,
          "title": "[1]PL/pgSQL 块结构示例",
          "slug": "_1-pl-pgsql-块结构示例",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]PL/pgSQL 子块",
          "slug": "_2-pl-pgsql-子块",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]小结",
          "slug": "_3-小结",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "4.变量和常量",
      "slug": "_4-变量和常量",
      "children": [
        {
          "level": 3,
          "title": "[1]变量",
          "slug": "_1-变量",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]复制数据类型",
          "slug": "_2-复制数据类型",
          "children": [
            {
              "level": 4,
              "title": "块和子块中的变量",
              "slug": "块和子块中的变量",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[3]select into",
          "slug": "_3-select-into",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]行类型变量",
          "slug": "_4-行类型变量",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]记录类型变量",
          "slug": "_5-记录类型变量",
          "children": []
        },
        {
          "level": 3,
          "title": "[6]常量",
          "slug": "_6-常量",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "5.报告消息和错误",
      "slug": "_5-报告消息和错误",
      "children": [
        {
          "level": 3,
          "title": "[1]报告消息",
          "slug": "_1-报告消息",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]等级",
          "slug": "_2-等级",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]格式",
          "slug": "_3-格式",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]引发错误",
          "slug": "_4-引发错误",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]Assert",
          "slug": "_5-assert",
          "children": [
            {
              "level": 4,
              "title": "1) 条件",
              "slug": "_1-条件",
              "children": []
            },
            {
              "level": 4,
              "title": "2) 留言",
              "slug": "_2-留言",
              "children": []
            },
            {
              "level": 4,
              "title": "启用/禁用断言",
              "slug": "启用-禁用断言",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "level": 2,
      "title": "5.控制结构",
      "slug": "_5-控制结构",
      "children": [
        {
          "level": 3,
          "title": "[1]if",
          "slug": "_1-if",
          "children": [
            {
              "level": 4,
              "title": "1) PL/pgSQL if-then 语句",
              "slug": "_1-pl-pgsql-if-then-语句",
              "children": []
            },
            {
              "level": 4,
              "title": "2) PL/pgSQL if-then-else 语句",
              "slug": "_2-pl-pgsql-if-then-else-语句",
              "children": []
            },
            {
              "level": 4,
              "title": "3) PL/pgSQL if-then-elsif 语句",
              "slug": "_3-pl-pgsql-if-then-elsif-语句",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[2]case语句",
          "slug": "_2-case语句",
          "children": [
            {
              "level": 4,
              "title": "1) 简单的case语句",
              "slug": "_1-简单的case语句",
              "children": []
            },
            {
              "level": 4,
              "title": "2) 检索案例陈述",
              "slug": "_2-检索案例陈述",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[3]loop循环",
          "slug": "_3-loop循环",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]while循环",
          "slug": "_4-while循环",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]for循环",
          "slug": "_5-for循环",
          "children": [
            {
              "level": 4,
              "title": "使用 PL/pgSQL for 循环查询结果",
              "slug": "使用-pl-pgsql-for-循环查询结果",
              "children": []
            },
            {
              "level": 4,
              "title": "使用 PL/pgSQL for 循环动态查询结果",
              "slug": "使用-pl-pgsql-for-循环动态查询结果",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[6]exit",
          "slug": "_6-exit",
          "children": [
            {
              "level": 4,
              "title": "1) 使用 PL/pgSQL Exit 语句终止loop",
              "slug": "_1-使用-pl-pgsql-exit-语句终止loop",
              "children": []
            },
            {
              "level": 4,
              "title": "2) 使用 PL/pgSQL Exit 语句退出一个块",
              "slug": "_2-使用-pl-pgsql-exit-语句退出一个块",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[7]continue",
          "slug": "_7-continue",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "7.用户自定义函数",
      "slug": "_7-用户自定义函数",
      "children": [
        {
          "level": 3,
          "title": "[1]创建函数",
          "slug": "_1-创建函数",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]函数参数模式",
          "slug": "_2-函数参数模式",
          "children": [
            {
              "level": 4,
              "title": "1）in模式",
              "slug": "_1-in模式",
              "children": []
            },
            {
              "level": 4,
              "title": "2）out模式",
              "slug": "_2-out模式",
              "children": []
            },
            {
              "level": 4,
              "title": "3）inout模式",
              "slug": "_3-inout模式",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[3]函数重载",
          "slug": "_3-函数重载",
          "children": [
            {
              "level": 4,
              "title": "函数重载和默认值",
              "slug": "函数重载和默认值",
              "children": []
            }
          ]
        },
        {
          "level": 3,
          "title": "[4]返回表的函数",
          "slug": "_4-返回表的函数",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]删除函数",
          "slug": "_5-删除函数",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "8.异常处理",
      "slug": "_8-异常处理",
      "children": [
        {
          "level": 3,
          "title": "[1]处理 no_data_found 异常示例",
          "slug": "_1-处理-no-data-found-异常示例",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]处理 too_many_rows 异常示例",
          "slug": "_2-处理-too-many-rows-异常示例",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]处理多个异常",
          "slug": "_3-处理多个异常",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]将异常处理为 SQLSTATE 代码",
          "slug": "_4-将异常处理为-sqlstate-代码",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "9.存储过程",
      "slug": "_9-存储过程",
      "children": [
        {
          "level": 3,
          "title": "[1]创建存储过程",
          "slug": "_1-创建存储过程",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]调用存储过程",
          "slug": "_2-调用存储过程",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]删除存储过程",
          "slug": "_3-删除存储过程",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "10.Cursor游标",
      "slug": "_10-cursor游标",
      "children": [
        {
          "level": 3,
          "title": "[1]声明游标",
          "slug": "_1-声明游标",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]打开游标",
          "slug": "_2-打开游标",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]使用游标",
          "slug": "_3-使用游标",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]移动光标",
          "slug": "_4-移动光标",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]删除或更新行",
          "slug": "_5-删除或更新行",
          "children": []
        },
        {
          "level": 3,
          "title": "[6]关闭游标",
          "slug": "_6-关闭游标",
          "children": []
        },
        {
          "level": 3,
          "title": "[7]综合示例",
          "slug": "_7-综合示例",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "11.触发器",
      "slug": "_11-触发器",
      "children": [
        {
          "level": 3,
          "title": "[1]触发器简介",
          "slug": "_1-触发器简介",
          "children": []
        },
        {
          "level": 3,
          "title": "[2]创建触发器",
          "slug": "_2-创建触发器",
          "children": []
        },
        {
          "level": 3,
          "title": "[3]删除触发器",
          "slug": "_3-删除触发器",
          "children": []
        },
        {
          "level": 3,
          "title": "[4]重命名触发器",
          "slug": "_4-重命名触发器",
          "children": []
        },
        {
          "level": 3,
          "title": "[5]禁用触发器",
          "slug": "_5-禁用触发器",
          "children": []
        },
        {
          "level": 3,
          "title": "[6]启用触发器",
          "slug": "_6-启用触发器",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": null
  },
  "readingTime": {
    "minutes": 50,
    "words": 11158
  },
  "filePathRelative": "posts/plsql.md"
}
