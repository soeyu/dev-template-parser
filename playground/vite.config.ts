import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      strParser: [
        {
          from: '',
          to: '<NFC_INCLUDE src="/2021gb/meta_site.html" />',
        },
      ],
    }),
  ],
})
