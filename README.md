# @soeyu/dev-template-parser

[![NPM version](https://img.shields.io/npm/v/@soeyu/dev-template-parser?color=a1b858&label=)](https://www.npmjs.com/package/@soeyu/dev-template-parser)

Starter template for [unplugin](https://github.com/unjs/unplugin).

## Template Usage

To use this template, clone it down using:

```bash
npx degit antfu/@soeyu/dev-template-parser my-unplugin
```

And do a global replace of `@soeyu/dev-template-parser` with your plugin name.

Then you can start developing your unplugin 🔥

To test your plugin, run: `pnpm run dev`
To release a new version, run: `pnpm run release`

## Install

```bash
npm i @soeyu/dev-template-parser
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from '@soeyu/dev-template-parser/vite'

export default defineConfig({
  plugins: [
    Starter({
      /* options */
    }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Starter from '@soeyu/dev-template-parser/rollup'

export default {
  plugins: [
    Starter({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('@soeyu/dev-template-parser/webpack')({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    [
      '@soeyu/dev-template-parser/nuxt',
      {
        /* options */
      },
    ],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('@soeyu/dev-template-parser/webpack')({
        /* options */
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Starter from '@soeyu/dev-template-parser/esbuild'

build({
  plugins: [Starter()],
})
```

<br></details>
