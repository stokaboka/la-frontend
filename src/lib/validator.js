export const validate = (options) => {
  const { data, columns } = options
  for (const column of columns) {
    if (column.required) {
      if (!data[column.field]) {
        return false
      }
    }
  }
  return true
}
