export const categories = {
  vocabulary: {
    part: 1,
    phase: 1,
    label: 'Лексика / Vocabulary',
    labelClass: 'bg-green-2',
    rowsClass: 'col-1-11',
    target: 'vocabularyLevel'
  },
  grammar: {
    part: 1,
    phase: 2,
    label: 'Грамматика / Grammar',
    labelClass: 'bg-deep-orange-2',
    rowsClass: 'col-1-11',
    target: 'grammarLevel'
  },
  listening: {
    part: 1,
    phase: 3,
    label: 'Восприятие на слух / Listening',
    labelClass: 'bg-purple-2',
    rowsClass: 'col-1-11',
    target: 'listeningLevel'
  },
  generalCommentOnOralAssessmentBands: {
    part: 2,
    phase: 1,
    label: 'Устное владение лексико-грамматическими компетентностями / General comment on oral Assessment Bands',
    labelClass: 'bg-light-blue-1',
    rowsClass: 'col-1-11'
  },
  confidenceInSpeaking: {
    part: 2,
    phase: 2,
    label: 'Уверенность и охотность при говорении / Confidence in speaking',
    labelClass: 'bg-light-blue-2',
    rowsClass: 'col-1-11 cursor-pointer matrix-col__interactive'
  },
  speakingRate: {
    part: 2,
    phase: 3,
    label: 'Скорость речи / Speaking rate',
    labelClass: 'bg-light-blue-2',
    rowsClass: 'col-1-11 cursor-pointer matrix-col__interactive'
  },
  usingOfCliche: {
    part: 2,
    phase: 4,
    label: 'Языковые клише и стандартные фразы / Using of cliché',
    labelClass: 'bg-light-blue-2',
    rowsClass: 'col-1-11 cursor-pointer matrix-col__interactive'
  },
  interactivityOfSpeech: {
    part: 2,
    phase: 5,
    label: 'Характер интерактивности речи / Interactivity of speech',
    labelClass: 'bg-light-blue-2',
    rowsClass: 'col-1-11 cursor-pointer matrix-col__interactive'
  },
  usingOfTheRussianLanguageInSpeech: {
    part: 2,
    phase: 6,
    label:
      'Использование помощи русского в речи / Using of the Russian language in speech',
    labelClass: 'bg-light-blue-2',
    rowsClass: 'col-1-11 cursor-pointer matrix-col__interactive'
  },
  phoneticAndPronunciationSelect: {
    part: 2,
    phase: 7,
    label: 'Комментарий к фонетике и произношению / Phonetic and pronunciation',
    labelClass: 'bg-light-blue-3',
    rowsClass: 'col-1-11'
  },
  partTwoResult: {
    part: 2,
    phase: 8,
    label: 'Баллы для автоматического определения уровня (по устной части)',
    labelClass: 'bg-orange-1',
    rowsClass: 'col-1-11'
  },
  partTwoResultClear: {
    part: 2,
    phase: 9,
    label: 'Сумма набранных баллов по устной части тестирования (отражается балл и соответствующий уровень):',
    labelClass: 'bg-white',
    rowsClass: 'col-1-11'
  }
}

export const finalTestResultEurope = [
  { value: 17.1, level: 'A1' },
  { value: 35.1, level: 'A2' },
  { value: 54.1, level: 'B1' },
  { value: 73.1, level: 'B2' },
  { value: 83.7, level: 'C1' },
  { value: 100, level: 'C1' }
]

export const finalTestResultSVS = [
  { value: 1, level: 'Beginner Absolute' },
  { value: 8.4, level: 'Beginner False' },
  { value: 17.1, level: 'Elementary Entry' },
  { value: 26.5, level: 'Elementary Confident' },
  { value: 35.1, level: 'Pre-Intermediate Entry' },
  { value: 44.7, level: 'Pre-Intermediate Confident' },
  { value: 54.1, level: 'Intermediate Entry' },
  { value: 63.7, level: 'Intermediate Confident' },
  { value: 73.1, level: 'Upper-Intermediate Entry' },
  { value: 83.7, level: 'Upper-Intermediate Confident' },
  { value: 100, level: 'Advanced Competent' }
]

/**
 * part I
 */
// const FinalRating_values = [1, 8.4, 17.1, 26.5, 35.1, 44.7, 54.1, 63.7, 73.1, 83.7, 100]
export const autoTestLevels = [
  1,
  8.4,
  17.1,
  26.5,
  35.1,
  44.7,
  54.1,
  63.7,
  73.1,
  83.7,
  100
]
export const vocabularyLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, null]
export const grammarLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, null]
export const listeningLevels = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, null]

// Part1_values
// Part1_ID
export const selfTestLevels = vocabularyLevels.map(
  (e, i) => e + grammarLevels[i] + listeningLevels[i]
)

/**
 * part II
 */
// Part2_values
export const generalCommentOnOralAssessmentBands = [
  0,
  0.4,
  1.1,
  2.5,
  3.1,
  4.7,
  6.1,
  7.7,
  9.1,
  11.7,
  12.0
]
export const confidenceInSpeaking = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const speakingRate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const usingOfCliche = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const interactivityOfSpeech = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const usingOfTheRussianLanguageInSpeech = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const Part2_final_values = [0, 5.4, 11.1, 17.5, 23.1, 29.7, 36.1, 42.7, 49.1, 56.7, 62]
export const talkTestLevels = generalCommentOnOralAssessmentBands.map(
  (e, i) =>
    e +
    confidenceInSpeaking[i] +
    speakingRate[i] +
    usingOfCliche[i] +
    interactivityOfSpeech[i] +
    usingOfTheRussianLanguageInSpeech[i]
)

// const FinalRating_values = [1, 8.4, 17.1, 26.5, 35.1, 44.7, 54.1, 63.7, 73.1, 83.7, 100]

export const phoneticAndPronunciation = [
  { value: 1, label: 'необходима работа над звуками' },
  { value: 2, label: 'необходима работа над интонацией' },
  { value: 3, label: 'необходима работа над фонетикой' },
  { value: 4, label: 'рекомендована работа над фонетикой' }
]

export const partTwoCategories = ['A1', 'A2', 'B1', 'B2']

export const levelTwoByCategoryValues = [
  { min: 1, max: 9 },
  { min: 9, max: 15 },
  { min: 15, max: 21 },
  { min: 21, max: 100 }
]
