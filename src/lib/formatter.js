import { date } from 'quasar'

/**
 *
 * @param options
 * @returns {string|*}
 */
export const formatter = (options) => {
  const { type, value } = options
  if (type) {
    switch (type.toUpperCase()) {
      case 'DATE' :
        return dateToString(options)
    }
  }
  return value
}

const isValidDate = (date) => {
  return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)
}

/**
 *
 * @param options
 * @returns {string}
 */
export const dateToString = (options) => {
  const { value, format } = options
  // let out = ''
  if (value && format) {
    // 2019-07-01T11:37:57.930Z
    if (typeof value === 'string') {
      if (date.isValid(value)) {
        return date.formatDate(value, format)
      }
    } else {
      if (isValidDate(value)) {
        return date.formatDate(value, format)
      }
    }
  }
  return value

  //   let parts = []
  //   if (typeof value === 'string') {
  //     parts = value.split('T')
  //   } else if (isValidDate(value)) {
  //     parts = value.toISOString().split('T')
  //   } else {
  //     return value.toString()
  //   }
  //
  //   const dateParts = getElement(parts, 0).split('-')
  //   const timeParts = getElement(parts, 1).split(':')
  //
  //   const yyyy = getElement(dateParts, 0)
  //   const yy = yyyy.substr(2)
  //   const mm = getElement(dateParts, 1)
  //   const dd = getElement(dateParts, 2)
  //
  //   const hh = getElement(timeParts, 0)
  //   const mi = getElement(timeParts, 1)
  //
  //   const sesmsec = getElement(timeParts, 2).split('.')
  //   const sec = getElement(sesmsec, 0)
  //   const msec = getElement(sesmsec, 1)
  //
  //   out = format
  //   out = out.replace('DD', dd)
  //   out = out.replace('MM', mm)
  //   out = out.replace('YYYY', yyyy)
  //   out = out.replace('YY', yy)
  //   out = out.replace('HH', hh)
  //   out = out.replace('MI', mi)
  //   out = out.replace('SS', sec)
  //   out = out.replace('MS', msec)
  //   return out
  // }
  // return out
}

export const getElement = (arr, idx) => {
  if (arr && arr.length > idx) {
    return arr[idx]
  }
  return ''
}
