import { describe, expect, it } from 'vitest'
import { transformcmsProTagToEmpty, transiformSrc } from '../src'

describe('index', () => {
  it('替换cmsPro标签', () => {
    const str = `<cmspro_channel code='' field='channelName' AUTOLINK="true" TARGET="">栏目带连接</cmspro_channel>
<cmspro_channel code='' field='channelName'>栏目标题</cmspro_channel>
<cmspro_channel code='' field='displayName '>显示标题</cmspro_channel>
<cmspro_channel code='' field='channelDescribe'>栏目描述</cmspro_channel>
<cmspro_channel code='' field='codeName'>栏目代号</cmspro_channel>`

    const resStr = `栏目带连接
栏目标题
显示标题
栏目描述
栏目代号`
    expect(transformcmsProTagToEmpty(str)).toMatch(resStr)
  })

  it('有remote属性的标签的src替换为_src', () => {
    const str =
      '<script remote src="http://www.hp.gov.cn/2021js/jquery.js"></script>'
    expect(transiformSrc(str)).toMatchInlineSnapshot(
      '"<script remote src=\\"/_src/http://www.hp.gov.cn/2021js/jquery.js\\"></script>"'
    )
  })
})
