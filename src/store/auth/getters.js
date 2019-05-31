export const isLogged = s => s.user && s.user.login
export const isClosed = s => s.user && s.user.closed !== 0
export const isAdmin = s => s.user && s.user.role === 'admin'
export const isOperator = s => s.user && s.user.role === 'operator'
export const isUser = s => s.user && s.user.role === 'user'
export const user = s => s.user
export const token = s => s.token
