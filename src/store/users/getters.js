export const isLogged = s => {
  if (s.authUser !== null) {
    return !!s.authUser.login
  }
  return false
  // s.authUser && !!s.authUser.login
}
export const isAnonymous = s => {
  if (s.authUser !== null) {
    return s.authUser.login === s.anonymous.login
  }
  return false
}
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

export const filter = (s) => s.filter

export const fioUser = s => {
  if (s.user) {
    return `${s.user.firstName} ${s.user.secondName} ${s.user.lastName}`
  }
  return ''
}

export const fioAuthUser = s => {
  if (s.authUser) {
    return `${s.authUser.firstName} ${s.authUser.secondName} ${s.authUser.lastName}`
  }
  return ''
}
