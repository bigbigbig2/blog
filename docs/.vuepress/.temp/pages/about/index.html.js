export const data = {
  "key": "v-74bc627b",
  "path": "/about/",
  "title": "About",
  "lang": "en-US",
  "frontmatter": {
    "layout": "About",
    "title": "About",
    "avatar": "/img/a.png",
    "subname": "ooco"
  },
  "excerpt": "",
  "headers": [],
  "git": {
    "updatedTime": 1660906395000
  },
  "readingTime": {
    "minutes": 1,
    "words": 0
  },
  "filePathRelative": "about/README.md"
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
