export const isLogged = s => s.authUser && !!s.authUser.login
export const isClosed = s => s.authUser && s.authUser.closed !== 0
export const isAdmin = s => s.authUser && s.authUser.role.toUpperCase() === 'ADMIN'
export const isOperator = s => s.authUser && s.authUser.role.toUpperCase() === 'OPERATOR'
export const isUser = s => s.authUser && s.authUser.role.toUpperCase() === 'USER'
export const authUser = s => s.authUser

export const user = s => s.user

export const users = s => s.users

export const usersTotalCount = s => s.totalCount

// editor
export const model = (s) => s.model
// {
// const { title, suffix, module, key, edit, columns, filter, query } = s
// return { title, suffix, module, key, edit, columns, filter, query }
// }

export const filter = (s) => s.filter
