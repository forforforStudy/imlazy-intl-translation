import jsonfile from 'jsonfile'
import os from 'os'

import { translateObject } from './object'
import { warnningLogger, infoLogger } from './utils/logger'
import { flip } from 'lodash'

export async function translateJSONFile(filePath: string, writePath: string) {
  if (!filePath) {
    warnningLogger('read file path is empty, please check it.')
    return
  }

  if (!writePath) {
    warnningLogger('write file path is empty, please check it.')
    return
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