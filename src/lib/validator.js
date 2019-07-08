export const validate = (options) => {
  const { row, columns } = options
  for (const column of columns) {
    const { field, required } = column
    if (required) {
      if (!row[field]) {
        return false
      }
    }
  }
  return true
}
