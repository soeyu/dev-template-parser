export type presetParser = Record<'from' | 'to', string>[]
export type Preset = 'lg'
export interface Options {
  httpParser?: presetParser
  strParser?: presetParser
  removeNfcComment?: Boolean
  textInterpolation?: any
}

export type userOptions = Options | Preset
