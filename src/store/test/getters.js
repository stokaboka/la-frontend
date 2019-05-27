export const short = s => s.current ? s.current.short : ''
export const test = s => s.current ? s.current.test : 0
export const part = s => s.current ? s.current.part : 0
export const phase = s => s.current ? s.current.phase : 0
export const maxCategory = s => s.current ? s.current.maxCategory : 0
export const answers = s => s.current ? s.current.answers : []
export const results = s => s.current ? s.current.results : []
export const result = s => {
  return s.current ? s.current.results.filter(e => e > 0).length : 0
}

export const time = s => s.current ? s.current.time : 0
export const timer = s => s.timer
export const timerHint = s => s.timerHint
