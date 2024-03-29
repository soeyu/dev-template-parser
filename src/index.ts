import axios from 'axios'
import https from 'https'
import { createCombinePlugin } from 'unplugin-combine'
import type { OptionsPlugin } from 'unplugin-combine'
import type { Plugin, PluginOption } from 'vite'
import type { Options, userOptions } from './types'

import { readFile } from 'fs/promises'

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})
const instance = axios.create({
  method: 'get',
  httpsAgent,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  },
})
const NFCCommentRegex = /\{(#|%)[\w\W]+?\1\}/gm
const enforceDefault = 'post'
/* 在link 、 script 、img 标签中添加 remote 属性 将加入/_src/，然后进行单独代理 */
export function transiformSrc(html: string) {
  const reg = /<.*?remote.*?(?:src|href)="(.*?)".*?>/g
  let res
  // eslint-disable-next-line no-cond-assign
  while ((res = reg.exec(html)) !== null) {
    const url = res[1]
    html = html.replaceAll(url, `/_src/${url}`)
  }

  return html
}

// const cmsProTagReg = /<((?=cmspro_)\w+)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gim
/*
 将全部cmsPro标签替换成空
 */

export function transformcmsProTagToEmpty(html: string) {
  const cmsProTagReg = /<(?=cmspro_)\w+\b[^<]*>|<\/(?=cmspro_)\w+\b[^<]*?>/gim
  return html.replaceAll(cmsProTagReg, '')
}

/*
 将全部nfc_标签替换成空
 */

export function transformNfcTagToEmpty(html: string) {
  const nfcTagReg = /<(?=nfc_)\w+\b[^<]*>|<\/(?=nfc_)\w+\b[^<]*?>/gim
  return html.replaceAll(nfcTagReg, '')
}

function parserPost(config: Options = {}): Plugin {
  const { strParser = [], httpParser = [], removeNfcComment = true } = config
  return {
    name: 'parser-post',
    apply: 'serve',
    transformIndexHtml: {
      order: 'post',
      async handler(html, ctx) {
        /* 公共处理 */
        /* 删除所有\r , 确保unix系统换行兼容 */
        html = html.replaceAll(/\r/g, '')
        /* 在link 、 script 、img 标签中添加 remote 属性 将加入/_src/，然后进行单独代理
        移除，用strParser 替代
        html = transiformSrc(html)
*/

        // 替换通过<nfc_include>标签的内容 strParser 属性添加替换目标 from 替换成 to的内容
        for (let i = 0; i < strParser.length; i++) {
          const { from, enforce = enforceDefault } = strParser[i]
          let { to } = strParser[i]
          if (enforce !== 'post') continue
          if (typeof to == 'string') to = to.replaceAll(/\r/g, '')
          if (typeof from == 'string') {
            html = html.replaceAll(to, from)
          } else {
            html = html.replaceAll(to, from)
          }
        }

        // 替换通过链接<!--#include virtual="/header/header.html"-->的内容，httpParser属性 ，请求from的内容，并将内容替换掉to的字符
        for (let i = 0; i < httpParser.length; i++) {
          const { from, enforce = enforceDefault, option = {} } = httpParser[i]
          let { to } = httpParser[i]
          if (enforce !== 'post') continue
          if (typeof to == 'string') to = to.replaceAll(/\r/g, '')
          if (typeof from == 'string') {
            if (!from.startsWith('http')) {
              const filetext = await readFile(from)
              html = html.replaceAll(to, filetext.toString())
            } else {
              const res = await instance({ url: from, ...option }).catch(
                console.error
              )
              if (res) html = html.replaceAll(to, res.data)
            }
          } else {
            html = html.replaceAll(to, from)
          }
        }

        /* 南方网模板处理 */
        // 替换注释 nfc 注释 {# ... #}
        if (removeNfcComment) html = html.replaceAll(NFCCommentRegex, '')

        /* 南方网中 {{...}} 清空 */
        html = html.replaceAll(/\{\{[\w\W]*?\}\}/gm, '')
        // 插值替换
        /* Object.entries(textInterpolation).forEach(([key, value]) => {
        // key ： NFC_CATEGORY
        // value ： {id: '127589', name: '信息公开'}

        Object.entries(value).forEach(([key2, value2]) => {
          // key2 ： id
          // value2 ： '127589'
          const reg = new RegExp(`\\{\\{${key}\\.${key2}\\}\\}`, 'g')
          html = html.replaceAll(reg, value2)
        })
      }) */

        /* 将全部cmsPro标签替换成空 */
        html = transformcmsProTagToEmpty(html)

        return html
      },
    },
  }
}

function parserPre(config: Options = {}): Plugin {
  const { strParser = [], httpParser = [] } = config
  return {
    name: 'parser-pre',
    apply: 'serve',
    transformIndexHtml: {
      order: 'pre',
      async handler(html) {
        html = html.replaceAll(/\r/g, '')
        // 替换通过<nfc_include>标签的内容 strParser 属性添加替换目标 from 替换成 to的内容
        for (let i = 0; i < strParser.length; i++) {
          const { from, enforce = enforceDefault } = strParser[i]
          let { to } = strParser[i]
          if (enforce !== 'pre') continue
          if (typeof to == 'string') to = to.replaceAll(/\r/g, '')
          if (typeof from == 'string') {
            html = html.replaceAll(to, from)
          } else {
            html = html.replaceAll(to, from)
          }
        }

        // 替换通过链接<!--#include virtual="/header/header.html"-->的内容，httpParser属性 ，请求from的内容，并将内容替换掉to的字符
        for (let i = 0; i < httpParser.length; i++) {
          const { from, enforce = enforceDefault, option = {} } = httpParser[i]
          let { to } = httpParser[i]
          if (enforce !== 'pre') continue
          if (typeof to == 'string') to = to.replaceAll(/\r/g, '')
          if (typeof from == 'string') {
            if (!from.startsWith('http')) {
              const filetext = await readFile(from)
              html = html.replaceAll(to, filetext.toString())
            } else {
              const res = await instance({ url: from, ...option }).catch(
                console.error
              )
              if (res) html = html.replaceAll(to, res.data)
            }
          } else {
            html = html.replaceAll(to, from)
          }
        }

        /* 非合法第三方cms的单标签，无法通过vite的parse编译，所以再进入vite转换前进行替换 */
        /* 将全部nfc标签替换成空 */
        html = transformNfcTagToEmpty(html)
        return html
      },
    },
  }
}

function createPlugin(options: userOptions): PluginOption {
  return createCombinePlugin((_options: Options) => {
    const plugins: OptionsPlugin = [parserPost(_options), parserPre(_options)]
    return {
      name: 'dev-template-parser',
      plugins,
    }
  }).vite(options)
}

export default createPlugin
