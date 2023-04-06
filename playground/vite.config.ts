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
          from: path.resolve(__dirname,'header.html'),
          to: '<!--#include virtual="/locaheader.html"-->',
        },
        {
          from: `https://shenzhen.chinatax.gov.cn/sztax/wzqt/footer/footer.shtml`,
          to: '<!--#include virtual="/footer/footer.html"-->',
        },
        {
          from: `https://www.shantou.gov.cn/ymys/tb/`,
          to: '<!--#include virtual="/footer/shantoufooter.html"-->',
        },
      ],
      strParser: [
        {
          from: '',
          to: '<NFC_INCLUDE src="/2021gb/meta_site.html" />',
        },
        {
          to: `    <link href="/res_main/css/lgzx_lgzf.css" />
    <script src="/res_main/js/lgzx_voice.js"></script>`,
          from: `    <link href="http://www.lg.gov.cn/res_main/css/lgzx_lgzf.css" />
    <script src="http://www.lg.gov.cn/res_main/js/lgzx_voice.js"></script>`,
        },
      ],
    }),
  ],
})
