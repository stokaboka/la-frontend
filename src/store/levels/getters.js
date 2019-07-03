export const level = s => s.level
export const model = s => s.model
export const attempt = s => s.data ? s.data.attempt : ''
export const date = s => s.data ? s.data.dt : null
export const test = s => s.data ? s.data.test : ''
export const levelScore = s => s.data ? s.data.level : ''
export const levelCEF = s => s.data ? s.data.levelCEF : ''
export const levelSVS = s => s.data ? s.data.levelSVS : ''
export const manager = s => s.data ? s.data.manager : ''
export const trainer = s => s.data ? s.data.trainer : ''
