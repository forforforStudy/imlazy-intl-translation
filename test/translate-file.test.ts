import path from 'path'
import fs from 'fs'
import jsonfile from 'jsonfile'
import { keys, values } from 'lodash'

import { translateJSONFile } from '../src'
import { includeHan } from '../src/utils/detecter'

describe('translate json file core', () => {
  const readFilePath = path.resolve(__dirname, './sources/test.zh-CN.json')
  const writeFilePath = path.resolve(__dirname, './sources/test.en-US.json')

  it('translate json file correct', async (done) => {
    expect(async () => {
      await translateJSONFile(readFilePath, writeFilePath)

      expect(fs.existsSync(writeFilePath)).toBeTruthy()
      const zhCNJsonObject = jsonfile.readFileSync(readFilePath)
      const enUSJsonObject = jsonfile.readFileSync(writeFilePath)

      expect(keys(zhCNJsonObject).length).toEqual(keys(enUSJsonObject).length)
      expect(keys(zhCNJsonObject)).toEqual(keys(enUSJsonObject))

      /**
       * 没有中文存在
       */
      values(enUSJsonObject).forEach((translatedValue) => expect(includeHan(translatedValue)).toBeFalsy())

      done()
    }).not.toThrowError()
  })
})
