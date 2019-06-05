export const isLogged = s => s.user && !!s.user.login
export const isClosed = s => s.user && s.user.closed !== 0
export const isAdmin = s => s.user && s.user.role.toUpperCase() === 'ADMIN'
export const isOperator = s => s.user && s.user.role.toUpperCase() === 'OPERATOR'
export const isUser = s => s.user && s.user.role.toUpperCase() === 'USER'
export const user = s => s.user
export const token = s => s.token
