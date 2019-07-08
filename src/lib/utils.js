export const sleep = (ms) => (new Promise(resolve => setTimeout(resolve, ms)))

export const toDDMMYYYY = (dt) => (dt ? dt.toString().substr(0, 10).split('-').reverse().join('.') : '')

const textRules = {
  minutes: [
    { f: 0, t: 0, x: 'минут' },
    { f: 1, t: 4, x: 'минуты' },
    { f: 5, t: 60, x: 'минут' }
  ],
  seconds: [
    { f: 0, t: 0, x: 'секунд' },
    { f: 1, t: 4, x: 'секунда' },
    { f: 5, t: 60, x: 'секунд' }
  ]
}

const getNumberText = (num, list) => {
  const t = list.find(e => e.f <= num && num <= e.t)
  if (t) return t.x
  return ''
}

export const secondsToTimeText = (val) => {
  const minutes = Math.floor(val / 60)
  const seconds = val % 60
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

export const secondsToTimeTextLong = (val) => {
  const minutes = Math.floor(val / 60)
  const seconds = val % 60
  let out = []
  if (minutes > 0) {
    const m = getNumberText(minutes, textRules.minutes)
    out.push(`${minutes} ${m}`)
  }
  if (seconds > 0) {
    const s = getNumberText(seconds, textRules.seconds)
    out.push(`${seconds} ${s}`)
  }
  return out.join(' ')
}

export const findMinElementIndex = (list, value, prop = '') => {
  let idx = -1
  for (const item of list) {
    const testVal = prop ? item[prop] : item
    if (testVal !== null && testVal <= value) {
      idx++
    } else {
      break
    }
  }
  return idx >= 0 ? idx : 0
}

export const findMinElement = (list, value, prop = '') => {
  const idx = findMinElementIndex(list, value, prop)
  if (idx >= 0) return list[idx]
  return null
}

export const objectToParamStr = (keys, params) => {
  return keys
    .filter(key => params[key] !== undefined)
    .map(key => {
      return `${key}/${params[key]}`
    })
    .join('/')
}

/**
 * https://github.com/zewish/oget
 * @param obj
 * @param path
 * @param def
 * @returns {*}
 */
export const oget = (obj, path, def) => {
  let res = path
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .replace(/^\./, '')
    .split('.')
    .reduce((prev, curr) => {
      return prev && prev[curr]
    }, obj)

  return (res === undefined)
    ? def
    : res
}

export const equalsObjects = (a, b) => {
  for (let prop in a) {
    if (!prop.startsWith('__') && b[prop]) {
      if (a[prop] !== b[prop]) {
        return false
      }
    }
  }
  return true
}

export const getElement = (arr, idx) => {
  if (arr && arr.length > idx) {
    return arr[idx]
  }
  return ''
}

/**
 *
 * @param options
 * @returns {string|*}
 */
export const formatter = (options) => {
  const { type, value } = options
  switch (type.toUpperCase()) {
    case 'DATE' :
      return dateToString(options)
  }
  return value
}

/**
 *
 * @param options
 * @returns {string}
 */
export const dateToString = (options) => {
  const { value, format } = options
  let out = ''
  if (value && format) {
    // 2019-07-01T11:37:57.930Z
    const parts = value.split('T')
    const dateParts = getElement(parts, 0).split('-')
    const timeParts = getElement(parts, 1).split(':')

    const yyyy = getElement(dateParts, 0)
    const yy = yyyy.substr(2)
    const mm = getElement(dateParts, 1)
    const dd = getElement(dateParts, 2)

    const hh = getElement(timeParts, 0)
    const mi = getElement(timeParts, 1)

    const sesmsec = getElement(timeParts, 2).split('.')
    const sec = getElement(sesmsec, 0)
    const msec = getElement(sesmsec, 1)

    out = format
    out = out.replace('DD', dd)
    out = out.replace('MM', mm)
    out = out.replace('YYYY', yyyy)
    out = out.replace('YY', yy)
    out = out.replace('HH', hh)
    out = out.replace('MI', mi)
    out = out.replace('SS', sec)
    out = out.replace('MS', msec)
    return out
  }
  return out
}
