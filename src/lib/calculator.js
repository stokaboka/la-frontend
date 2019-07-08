const expressionKeys = '+-*/()'

export const calculate = (options) => {
  const { row, columns } = options
  for (const column of columns) {
    const { calculate } = column
    if (calculate) {
      const { field } = column
      if (isMethod(calculate)) {
        row[field] = calcMethod({ row, column })
      } else {
        row[field] = calcExpression({ row, column })
      }
    }
  }
  return row
}

const isEmpty = (val) => {
  return val === undefined || val === null || !`${val}`
}

const calcMethod = (options) => {
  const { column } = options
  const func = methods[column.calculate].method
  return func(options)
}

const isMethod = (expr) => {
  if (expr) {
    return Object
      .entries(methods)
      .findIndex(([key]) => key === expr) >= 0
  }
  return false
}

const calcExpression = (options) => {
  const { row, column } = options
  const { calculate } = column
  const def = row[column.field]
  const expr = calculate
    .split(' ')
    .map(e => {
      if (expressionKeys.includes(e)) {
        return e
      } else {
        const val = row[e]
        return `${val}`
      }
    }).join(' ')

  try {
    // eslint-disable-next-line no-eval
    return eval(expr)
  } catch (e) {
    console.warn(e.message())
  }
  return def
}

const initAutoIncrement = (options) => {
  const { column, rows } = options
  const { field } = column
  let out = 0
  for (const row of rows) {
    out = row[field] > out ? row[field] : out
  }
  return out
}

const calcAutoIncrement = (options) => {
  const { row, column } = options
  const { field } = column
  const { key } = methods.AUTO_INCREMENT
  if (isEmpty(row[field])) {
    if (column[key]) {
      column[key] = column[key] + 1
    } else {
      column[key] = 1
    }
    return column[key]
  }
  return row[field]
}

/**
 * call after update data rows
 * @param options - is model !!!
 */
export const initMethodsData = (options) => {
  const { rows, columns } = options
  for (const column of columns) {
    const { calculate } = column
    if (isMethod(calculate)) {
      const { init, key } = methods[calculate]
      column[key] = init({ rows, column })
    }
  }
}

const methods = {
  AUTO_INCREMENT: {
    method: calcAutoIncrement,
    init: initAutoIncrement,
    key: '__autoincrement'
  }
}
