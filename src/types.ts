export type presetParser = Record<'from' | 'to', string>[]

export interface Options {
  httpParser?: presetParser
  strParser?: presetParser
  removeNfcComment?: Boolean
  textInterpolation?: any
}
