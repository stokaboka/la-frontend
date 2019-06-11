export const loading = state => state.loading
export const key = state => state.key
export const edit = state => state.edit
export const suffix = state => state.suffix
export const module = state => state.module
export const columns = state => state.columns
export const visibleColumns = state =>
  state.columns.filter(e => e.visible).map(e => e.name)
export const updateColumns = state => state.columns.filter(e => e.update)
export const insertColumns = state => state.columns.filter(e => e.insert)
export const title = state => state.title
export const query = state => state.query
export const filterComponent = state => state.filter
export const rowsNumber = state => state.rowsNumber
export const data = state => state.data
export const result = state => state.result
export const error = state => state.error

export const lastQuery = state => state.lastQuery
