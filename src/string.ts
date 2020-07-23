import { capitalize, isEmpty, isString } from 'lodash'
import { baidu, google, youdao } from 'translation.js'

import { includeHan } from './utils/detecter'
import { infoLogger, warnningLogger } from './utils/logger'

const engines = [youdao, baidu, google]
const globalCache: Map<string, string> = new Map()

export async function translate(text: string, enginesIndex = 0): Promise<string | undefined> {
  /**
   * 无效的翻译对象返回 undefined
   */
  if (!isString(text) || text === '') {
    warnningLogger('input text is invalid string value.')
    return text
  }

  /**
   * 没有存在中文时，返回自身
   */
  if (!includeHan(text)) {
    infoLogger(`text(${text}) is not include zh-Hans, so return itself directly`)
    return text
  }

  if (!globalCache.get(text)) {
    if (enginesIndex >= engines.length) {
      warnningLogger(`translate fail, all engines can\'t do success of key "${text}"`)
      return text
    }

    try {
      const tranResponse = await engines[enginesIndex].translate({ text })
      if (tranResponse && tranResponse.result && !isEmpty(tranResponse.result)) {
        const translatedText = capitalize(tranResponse.result[0])

        globalCache.set(text, translatedText)
        infoLogger(`translate success, text: ${text}`)

        return translatedText
      }
    } catch (error) {
      return translate(text, enginesIndex + 1)
    }
  } else {
    /**
     * 命中缓存后从缓存中获取
     */
    return globalCache.get(text)
  }
}