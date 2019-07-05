export const level = s => s.level
export const model = s => s.model
export const attempt = s => s.level ? s.level.attempt : ''
export const date = s => s.level ? s.level.dt : null
export const test = s => s.level ? s.level.test : ''
export const levelScore = s => s.level ? s.level.level : ''
export const levelCEF = s => s.level ? s.level.levelCEF : ''
export const levelSVS = s => s.level ? s.level.levelSVS : ''
export const manager = s => s.level ? s.level.manager : ''
export const trainer = s => s.level ? s.level.trainer : ''
