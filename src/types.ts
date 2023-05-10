import { AxiosRequestConfig } from 'axios'

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
}
export interface Options {
  httpParser?: (presetParser & { option?: AxiosRequestConfig })[]
  strParser?: presetParser[]
  removeNfcComment?: Boolean
  textInterpolation?: any
}

export type userOptions = Options
