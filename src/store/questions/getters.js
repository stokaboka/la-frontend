export const questions = s => s.questions
export const question = s => s.questions ? s.questions[s.current] : {}
export const test = s => s.test
export const part = s => s.part
export const phase = s => s.phase
export const category = s => s.category

export const current = s => s.current
export const total = s => s.questions ? s.questions.length : 0

export const params = s => `test/${s.test}/part/${s.part}/phase/${s.phase}/category/${s.category}`
