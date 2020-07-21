import * as chalk from 'chalk'
import { startCase, isEmpty } from 'lodash'
import { baidu, google, youdao } from 'translation.js'

const log = console.log
const infoLogger = (text: string) => log(chalk.green(text))
const warnningLogger = (text: string) => log(chalk.bold.yellow(text))

const engines = [google, youdao, baidu]
const globalCache: Map<string, string> = new Map()

export async function translate(text: string, enginesIndex = 0): Promise<string | undefined> {
  if (!globalCache.get(text)) {
    if (enginesIndex >= engines.length) {
      warnningLogger(`translate fail, all engines can\'t do success of key "${text}"`)
    }

    try {
      const tranResponse = await engines[enginesIndex].translate({ text })
      if (tranResponse && tranResponse.result && !isEmpty(tranResponse.result)) {
        const translatedText = startCase(tranResponse.result[0])

        globalCache.set(text, translatedText)

        return translatedText
      } else {
        throw new Error()
      }

    } catch (error) {
      return translate(text, enginesIndex + 1)
    }
  }
}