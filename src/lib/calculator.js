const expressionKeys = '+-*/()'

export const calculate = (options) => {
  const { row, columns } = options
  for (const column of columns) {
    const { calculate } = column
    if (calculate) {
      if (isMethod(calculate)) {
        row[column.field] = calcMethod({ row, column })
      } else {
        row[column.field] = calcExpression({ row, column })
      }

      // const expr = column.calculate.split(' ')
      //
      // if (expr.length === 1) {
      //   row[column.field] = calcAutoIncrement({})
      // } else if (expr.length === 3) {
      //   const a = row[expr[0]]
      //   const x = expr[1]
      //   const b = row[expr[2]]
      //   const def = row[column.field]
      //   row[column.field] = calcExpression({ a, x, b, def })
      // }

      // const a = row[expr[0]]
      // const x = expr[1]
      // const b = row[expr[2]]
      // try {
      //   // eslint-disable-next-line no-eval
      //   row[column.field] = eval(`${a} ${x} ${b}`)
      // } catch (e) {
      //   console.warn(e.message())
      // }
    }
  }
  return row
}

const calcMethod = (options) => {
  const { column } = options
  const func = methods[column.calculate]
  return func(options)
}

const isMethod = (expr) => {
  return Object
    .entries(methods)
    .findIndex(([key]) => key === expr) >= 0
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
  const { key } = methods.AUTO_INCREMENT
  let out = 0
  for (const row of rows) {
    out = row[field] > out ? row[field] : out
  }
  column[key] = out
}

const calcAutoIncrement = (options) => {
  const { column } = options
  const { key } = methods.AUTO_INCREMENT
  if (column[key]) {
    column[key] = column[key] + 1
  } else {
    column[key] = 1
  }
  return column[key]
}

/**
 * call after update data rows
 * @param options - is model !!!
 */
export const initMethodsData = (options) => {
  const { data: rows, columns } = options
  for (const column of columns) {
    const { calculate } = column
    if (isMethod(calculate)) {
      const { init, key } = methods[calculate]
      column[key] = init({ rows, columns })
    }
  }
}

const methods = {
  AUTO_INCREMENT: {
    method: calcAutoIncrement,
    init: initAutoIncrement,
    key: 'autoincrement'
  }
}
