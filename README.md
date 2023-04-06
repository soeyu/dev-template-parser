# @soeyu/dev-template-parser

vite-plugin
替换 vite 项目 index.html 中特定内容

基本配置

```ts
parser({
  // 通过http，https，请求获取的替换内容
  // 如果不是以http开头，会尝试使用 readfile 找本地文件
  httpParser: [
    {
      to: string,
      from: string,
      enforce: 'post' | 'pre',
    },
  ],
  strParser: [
    {
      to: string,
      from: string,
      enforce: 'post' | 'pre',
    },
  ],
})
```

使用方法
在 vite.config.js/ts

```ts
import { defineConfig } from 'vite'
import parser from '@soeyu/dev-template-parser'
export default defineConfig({
  plugins: [
    parser({
      httpParser: [
        {
          from: `http://example.com`,
          to: '<!--#include virtual="../header/header.shtml"-->',
          enforce: 'pre',
        },
        {
          from: `https://example.com`,
          to: '<!--#include virtual="/footer/footer.html"-->',
        },
        {
          from: path.resolve(__dirname, 'header.html'),
          to: '<!--#include virtual="/locaheader.html"-->',
        },
      ],
      strParser: [
        {
          from: '',
          to: 'only one line target',
        },
        {
          to: `    target line one
    target line two`,
          from: `    will replace string line one
    will replace string line two`,
        },
      ],
    }),
  ],
})
```
