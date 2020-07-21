import { translate } from './string'
import { map, reduce, isObject } from 'lodash'

export async function translateObject(object: { [key: string]: string }) {
  if (!isObject(object)) {
    return {}
  }

  const translateResults = await Promise.all(
    map(
      object,
      (value, key) => translate(value).then((translateText) => ({
        key,
        value: translateText
      }))
    )
  )

  return reduce(
    translateResults,
    (pre, cur) => ({
      ...pre,
      [cur.key]: cur.value
    }),
    {}
  )
}