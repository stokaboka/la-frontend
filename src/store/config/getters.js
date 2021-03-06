import { oget } from '../../lib/utils'

export const config = s => s.config
export const exportFormats = s => {
  const exp = oget(s.config, 'result.export', {})
  return Object.entries(exp).map(([format, file]) => {
    return { format, file }
  })
}

export const partOneDebug = s => {
  return oget(s.config, 'part.one.debug', false)
}

export const partTwoCategoryDefaultValue = s => {
  return oget(s.config, 'part.two.categoryDefaultValue', 3)
}

export const partTwoQuestionsNum = s => {
  return oget(s.config, 'part.two.questionsNum', 10)
}
