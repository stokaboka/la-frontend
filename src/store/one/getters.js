export const short = s => s.short
export const maxCategory = s => s.maxCategory
export const answers = s => s.answers
export const results = s => s.results
export const result = s => {
  return s.results.filter(e => e > 0).length
}

export const time = s => s.time
export const timer = s => s.timer
