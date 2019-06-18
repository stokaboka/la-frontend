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
    rowsClass: 'col-1-11'
  },
  speakingRate: {
    part: 2,
    phase: 3,
    label: 'Скорость речи / Speaking rate',
    labelClass: 'bg-light-blue-3',
    rowsClass: 'col-1-11'
  },
  usingOfCliche: {
    part: 2,
    phase: 4,
    label: 'Языковые клише и стандартные фразы / Using of cliché',
    labelClass: 'bg-light-blue-4',
    rowsClass: 'col-1-11'
  },
  interactivityOfSpeech: {
    part: 2,
    phase: 5,
    label: 'Характер интерактивности речи / Interactivity of speech',
    labelClass: 'bg-light-blue-5',
    rowsClass: 'col-1-11'
  },
  usingOfTheRussianLanguageInSpeech: {
    part: 2,
    phase: 6,
    label:
      'Использование помощи русского в речи / Using of the Russian language in speech',
    labelClass: 'bg-light-blue-6',
    rowsClass: 'col-1-11'
  },
  phoneticAndPronunciationSelect: {
    part: 2,
    phase: 7,
    label: 'Комментарий к фонетике и произношению / Phonetic and pronunciation',
    labelClass: 'bg-light-blue-7',
    rowsClass: 'col-1-11'
  }
}

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
