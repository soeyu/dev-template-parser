export type presetParser = {
  from: string
  to: string | RegExp
  /**
   * 处理时机：
   * @param  pre: 在vite处理html之前
   * @param  post: 在vite处理html之后
   *
   * @default post
   *  */
  enforce?: 'post' | 'pre'
}[]
export type Preset = 'lg'
export interface Options {
  httpParser?: presetParser
  strParser?: presetParser
  removeNfcComment?: Boolean
  textInterpolation?: any
}

export type userOptions = Options | Preset
