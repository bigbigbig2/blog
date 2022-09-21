module.exports = {
  title: "ooco",
    head: [
        ['link', { rel: 'icon', href: '/img/6.png' }]
    ],

  bundler: "@vuepress/vite",

  theme: "vuepress-theme-gungnir",

  themeConfig: {
    catalog: true,
    docsDir: "docs",
    // lastUpdated: true,  //最后更新时间aa
    searchIcon: "ri-search-2-line",
    languageIcon: "hi-translate",
    navbarTitle:"cd ..",
    navbar: [
        {
            text: "首页",
            link: "/",
            icon: "fa-fort-awesome"
        },
        {
            text: "文章分类",
            link: "/tags/",
            icon: "fa-tag"
        },
        {
            text: "链接",
            link: "/links/",
            icon: "fa-satellite-dish"
        },
        {
            text: "About",
            link: "/about/",
            icon: "fa-paw"
        },
    ],
    personalInfo: {
      name: "ooco",
      avatar: "/img/a.png",
      description: "while(life){Motivated++;Interest++;}",
      sns: {
          github: "bigbigbig2",
          email: "abcdglas@gmail.com",
          twitter:"pibv96YZx5HVHx0"
          }
      },
    homeHeaderImages: [
      {
        path: "/img/home-bg/2.jpg",
      },
      {
        path: "/img/home-bg/3.jpg",
      }
    ],
    postNumPerPage: 6,

    pages: {
      tags: {
          subtitle: "吼哇朋友们，这是标签页",
          bgImage: {
          path: "/img/pages/tags.jpg"
          }
      },
      links: {
          subtitle:"吼哇朋友们，这是链接页.",
          bgImage: {
          path: "/img/pages/link.jpg",
          }
      }
    },
    footer: `
    &copy; <a href="https://github.com/bigbigbig2" target="_blank">2021-2022</a>
    <br>
    Powered by VuePress & Gungnir
    `,
    themePlugins: {
      // only enable git plugin in production mode
      katex: true,
      giscus: {
        repo: "bigbigbig2/discussion_for_giscus",
        repoId: "R_kgDOHx-lBA",
        category: "Announcements",
        categoryId: "DIC_kwDOHx-lBM4CQq32",
        darkTheme: "https://rocke.top/styles/giscus-dark.css"
      },
      mdPlus: {
        all: true
      },
      ga:"G-D9PMLNQ1HD"

    },
    
  },
  markdown: {
    extractHeaders: {
      level: [2, 3, 4, 5,6]
    },
    toc:{
      level: [2, 3, 4, 5, 6]
    },
    code: {
      lineNumbers: true
    }
  },
};
