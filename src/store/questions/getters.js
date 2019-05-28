export const questions = s => s.questions
export const question = s => s.questions ? s.questions[s.questionIndex] : {}
// export const questionTest = s => s.test
// export const questionPart = s => s.part
// export const questionPhase = s => s.phase
export const category = s => s.category

export const questionIndex = s => s.questionIndex
export const questionsCount = s => s.questions ? s.questions.length : 0
export const phaseQuestionsTotal = s => s.phaseQuestionsTotal

export const time = s => s.time

export const paramsList = s => `test/${s.test}/part/${s.part}/phase/${s.phase}/category/${s.category}`
export const paramsCount = s => `test/${s.test}/part/${s.part}/phase/${s.phase}`
