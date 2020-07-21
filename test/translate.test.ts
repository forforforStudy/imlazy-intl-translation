import { translate } from '../src'

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

  it('translate invalid text return undefined', (done) => {
    translate('').then((translatedText) => {
      expect(translatedText).toEqual('')
      done()
    })
  })
})
