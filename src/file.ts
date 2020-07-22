import jsonfile from 'jsonfile'
import os from 'os'

import { translateObject } from './object'
import { warnningLogger, infoLogger } from './utils/logger'

export async function translateJSONFile(filePath: string, writePath: string) {
  if (!filePath) {
    throw new Error('read file path is empty, please check it.')
  }

  if (!writePath) {
    throw new Error('write file path is empty, please check it.')
  }

  try {
    const object = await jsonfile.readFile(filePath)
    const translatedResult = await translateObject(object)

    jsonfile.writeFileSync(writePath, translatedResult, {
      spaces: 2,
      EOL: os.EOL
    })

    infoLogger('translate json file write success, please go to ' + writePath + ' check it out.')
  } catch (error) {
    warnningLogger('translate json file fail. path: ' + filePath)
  }
}