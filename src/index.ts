import chalk from 'chalk'
import { startCase, isEmpty, isString } from 'lodash'
import { baidu, google, youdao } from 'translation.js'

const log = console.log
const infoLogger = (text: string) => log(chalk.green(text))
const warnningLogger = (text: string) => log(chalk.bold.yellow(text))

const engines = [google, youdao, baidu]
const globalCache: Map<string, string> = new Map()

export async function translate(text: string, enginesIndex = 0): Promise<string | undefined> {
  /**
   * 无效的翻译对象返回 undefined
   */
  if (!isString(text) || text === '') {
    warnningLogger('input text is invalid string value.')
    return
  }

  if (!globalCache.get(text)) {
    if (enginesIndex >= engines.length) {
      warnningLogger(`translate fail, all engines can\'t do success of key "${text}"`)
    }

    try {
      const tranResponse = await engines[enginesIndex].translate({ text })
      if (tranResponse && tranResponse.result && !isEmpty(tranResponse.result)) {
        const translatedText = startCase(tranResponse.result[0])

        globalCache.set(text, translatedText)
        infoLogger(`translate success, text: ${text}`)

        return translatedText
      } else {
        throw new Error()
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