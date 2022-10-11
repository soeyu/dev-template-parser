import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/'
const siteCode = 'NMDC_GBA'
const basePath = `/${siteCode}/xhtml/sjzy/`
export default defineConfig({
  server: {
    port: 3000,
  },
  base: basePath,
  plugins: [
    Inspect(),
    Unplugin({
      httpParser: [
        {
          from: `http://113.108.133.195:8888/NMDC_GBA/header/header.shtml`,
          to: '<!--#include virtual="../header/header.shtml"-->',
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
