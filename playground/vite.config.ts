import path from 'path'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/'
const siteCode = 'NMDC_GBA'
const basePath = `/${siteCode}/xhtml/sjzy/`
export default defineConfig({
  server: {
    port: 3000,
  },
  // base: basePath,
  plugins: [
    Inspect(),
    Unplugin({
      httpParser: [
        {
          from: `http://www.lg.gov.cn/header/header.html`,
          to: '<!--#include virtual="../header/header.shtml"-->',
        },
        {
          from: path.join(__dirname, '/header.html'),
          to: '<!--#include virtual="/header.html"-->',
          enforce: 'pre',
        },
      ],
      strParser: [
        {
          from: '',
          to: '<NFC_INCLUDE src="/2021gb/meta_site.html" />',
        },
      ],
    }),
  ],
})
