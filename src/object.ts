import { translate } from './string'
import { reduce, isObject } from 'lodash'
import { infoLogger } from './utils/logger'

export async function translateObject(object: { [key: string]: string }) {
  if (!isObject(object)) {
    return {}
  }

  /**
   * 分组， 1个1个去翻译，不然容易被封ip
   * 中间间隔 2秒
   * 
   * 稳一波埋伏一手
   */
  let finalPromise = reduce(object, (pre, curValue, curKey) => pre.then((result) => {
    return new Promise((resolve) => {
      translate(curValue).then((translateText) => {
        setTimeout(() => {
          infoLogger(`object trans, next value is ${curValue}, time: ${new Date().toISOString()}`)
          resolve({
            ...result,
            [curKey]: translateText || curValue
          })
        }, 1000 * 2)
      })
    })
  }), Promise.resolve({}))

  return await finalPromise
}