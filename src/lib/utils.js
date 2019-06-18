export const sleep = (ms) => (new Promise(resolve => setTimeout(resolve, ms)))

export const toDDMMYYYY = (dt) => (dt ? dt.toString().substr(0, 10).split('-').reverse().join('/') : '')

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
    .filter(key => params[key] !== 'undefined')
    .map(key => {
      return `${key}/${params[key]}`
    })
    .join('/')
}
