import { keys, values, forEach } from 'lodash'
import { translate, translateObject } from '../src'
import { includeHan } from '../src/utils/detecter'

describe('translate core', () => {
  it('translate text correct', (done) => {
    const beginTime = Date.now()
    const text = '苹果'
    translate(text).then((translatedText) => {
      const firstTransTime = Date.now()
      expect(translatedText).toEqual('Apple')

      /**
       * 命中缓存
       */
      translate(text).then((translatedText) => {
        const cacheTransTime = Date.now()
        expect(translatedText).toEqual('Apple')
        /**
         * 命中缓存的时间应该比第一次获取小一个数据量级
         */
        expect(((cacheTransTime - firstTransTime) * 10) < (firstTransTime - beginTime) ).toBeTruthy()
        done()
      })
    })
  })

  it('translate text not including Han character.', (done) => {
    translate('test').then((translatedText) => {
      expect(typeof translatedText).toEqual('string')
      expect(translatedText).toEqual('test')
      done()
    })
  })

  it('translate invalid text return undefined', async () => {
    const translatedText = await translate('')
    expect(translatedText).toEqual('')
  })

  it('translate object correct', async () => {
    const targetObject = {
      "删除成功": "删除成功",
      "新增成功": "新增成功",
      "学科": "学科",
      "模板": "模板",
      "标签": "标签",
      "FooZhower": "FooZhower"
    }

    const translatedObjectResults = await translateObject(targetObject)

    expect(keys(translatedObjectResults).length).toEqual(keys(targetObject).length)

    forEach(values(translatedObjectResults), (result) => {
      expect(includeHan(result as string)).toBeFalsy()
    })
  })

  it('translate illegal object, return empty object', async () => {
    const illegalObjects = [null, undefined, '', 1, NaN]

    illegalObjects.forEach(async (illegalObject) => {
      const translatedResult = await translateObject(illegalObject as any)
      expect(translatedResult).toEqual({})
    })
  })
})
