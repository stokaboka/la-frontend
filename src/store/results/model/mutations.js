// /**
//  *
//  * @param state
//  * @param playload = {
//  *   module - module name/id
//  *   suffix - api suffix
//  *   query - url query
//  *   data - data from response, for insert/update/delete
//  * }
//  * @constructor
//  */
// export const SET_BY_ID = (state, data) => {
//   const idx = state.data.findIndex(e => e.id === data.id)
//   if (idx >= 0) {
//     state.data.splice(idx, 1, data)
//   } else {
//     state.data.push(data)
//   }
// }
//
// export const REMOVE_BY_ID = (state, data) => {
//   state.data = state.data.filter(e => e.id !== data.id)
// }
//
// export const SET_DATA = (state, data) => {
//   if (Array.isArray(data)) {
//     state.data = data
//     state.rowsNumber = data.length
//   } else {
//     state.data = data.rows
//     state.rowsNumber = data.rowsNumber
//   }
// }
