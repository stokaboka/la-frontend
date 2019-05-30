export const title = s => s.test ? s.test.title : ''
export const description = s => s.test ? s.test.description : ''
export const test = s => s.test ? s.test.test : 0
export const part = s => s.test ? s.test.part : 0
export const phase = s => s.test ? s.test.phase : 0
export const maxCategory = s => s.test ? s.test.maxCategory : 0
export const answers = s => s.test ? s.test.answers : []
export const result = s =>
  s.test
    ? s.test.answers
      .filter(e => e.phase === s.test.phase)
      .filter(e => e.a > 0)
      .length
    : 0

export const level = s => s.test ? s.test.level : 0

export const time = s => s.test ? s.test.time : 0
export const timer = s => s.timer
export const timerHint = s => s.timerHint

export const waitReady = s => s.test ? s.test.waitReady : false
