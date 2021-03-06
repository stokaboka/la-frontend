import axios from 'axios'
import { Notify } from 'quasar'

const errorNotify = function (error) {
  // eslint-disable-next-line no-console
  console.warn(error)
  Notify.create({
    message: `Что-то пошло не так...: ${error}`,
    color: 'negative',
    textColor: 'white',
    icon: 'error_outline'
  })
}

const rules = {
  one: {
    limit: 60
  },
  two: [
    // category 1
    [
      {
        limit: 0,
        limit1: 0,
        limit2: 40,
        level: 0,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 40,
        limit1: 40,
        limit2: 80,
        level: 1,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 80,
        limit1: 80,
        limit2: 100,
        level: 2,
        next: { state: false, category: true, question: false }
      },
      {
        limit: 100,
        limit1: 100,
        limit2: 100,
        level: 2,
        next: { state: false, category: true, question: false }
      }
    ],

    // category 2
    [
      {
        limit: 0,
        limit1: 0,
        limit2: 40,
        level: 2,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 40,
        limit1: 40,
        limit2: 80,
        level: 3,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 80,
        limit1: 80,
        limit2: 100,
        level: 4,
        next: { state: false, category: true, question: false }
      },
      {
        limit: 100,
        limit1: 100,
        limit2: 100,
        level: 4,
        next: { state: false, category: true, question: false }
      }
    ],

    // category 3
    [
      {
        limit: 0,
        limit1: 0,
        limit2: 40,
        level: 4,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 40,
        limit1: 40,
        limit2: 80,
        level: 5,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 80,
        limit1: 80,
        limit2: 100,
        level: 6,
        next: { state: false, category: true, question: false }
      },
      {
        limit: 100,
        limit1: 100,
        limit2: 100,
        level: 6,
        next: { state: false, category: true, question: false }
      }
    ],

    // category 4
    [
      {
        limit: 0,
        limit1: 0,
        limit2: 40,
        level: 6,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 40,
        limit1: 40,
        limit2: 80,
        level: 7,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 80,
        limit1: 80,
        limit2: 100,
        level: 8,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 100,
        limit1: 100,
        limit2: 100,
        level: 9,
        next: { state: true, category: false, question: false }
      }
    ]
  ],
  tree: [
    // category 1
    [
      {
        limit1: null,
        limit2: 20,
        level: 0,
        next: { state: true, category: false, question: false }
      },
      {
        limit1: 20,
        limit2: 60,
        level: 1,
        next: { state: true, category: false, question: false }
      },
      {
        limit1: 60,
        limit2: null,
        level: 2,
        next: { state: false, category: true, question: false }
      }
    ],

    // category 2
    [
      {
        limit1: null,
        limit2: 50,
        level: 2,
        next: { state: true, category: false, question: false }
      },
      {
        limit1: 50,
        limit2: 50,
        level: 3,
        next: { state: true, category: false, question: false }
      },
      {
        limit1: 50,
        limit2: null,
        level: 4,
        next: { state: false, category: true, question: false }
      }
    ],

    // category 3
    [
      {
        limit1: null,
        limit2: 50,
        level: 4,
        next: { state: true, category: false, question: false }
      },
      {
        limit1: 50,
        limit2: 50,
        level: 5,
        next: { state: true, category: false, question: false }
      },
      {
        limit1: 50,
        limit2: null,
        level: 6,
        next: { state: false, category: true, question: false }
      }
    ],

    // category 4
    [
      {
        limit1: null,
        limit2: 50,
        level: 6,
        next: { state: true, category: false, question: false }
      },
      {
        limit1: 50,
        limit2: 50,
        level: 7,
        next: { state: true, category: false, question: false }
      },
      {
        limit1: 50,
        limit2: null,
        level: 8,
        next: { state: true, category: false, question: false }
      }
    ]
  ]
}

const calculate = {
  one: (_phase, _category, _answers, _count = 0) => {
    const limit = rules.one.limit
    let percent = 0
    const answers = _answers.filter(
      e => e.phase === _phase && e.category === _category
    )
    const count = answers.length
    const score = answers.filter(e => e.a > 0).length
    if (_count > 0) {
      percent = Math.round((100 * score) / _count)
    }

    const level = _category > 1 ? (percent >= limit ? _category : 0) : 1
    const category = percent >= limit
    const state = percent < limit && count >= _count
    const question = state ? false : percent < limit

    return {
      limit,
      level,
      next: { state, category, question }
    }
  },

  two: (_phase, _category, _answers, _count = 0) => {
    let percent = 0
    const answer = _answers.find(
      e => e.phase === _phase && e.category === _category
    )
    if (answer) {
      let score = answer.a
      if (answer.q > 0) {
        percent = Math.round((100 * score) / answer.q)
      }

      const rule = rules.two[_category - 1]
      // const out = rule.find(e => percent <= e.limit)
      const out = rule.find(e => e.limit1 <= percent && percent <= e.limit2)
      return out
    }
    return { limit: 0, level: _category, next: false }
  },

  tree: (_phase, _category, _answers, _count = 0) => {
    let percent = 0
    const score = _answers
      .filter(e => e.phase === _phase && e.category === _category)
      .filter(e => e.a > 0).length
    if (_count > 0) {
      percent = Math.round((100 * score) / _count)
    }

    const rule = rules.tree[_category - 1]
    const out = rule.find(e => {
      if (e.limit1 === null) return percent < e.limit2
      if (e.limit2 === null) return e.limit1 <= percent
      if (e.limit1 === e.limit2) return e.limit1 === percent
      return e.limit1 <= percent && percent < e.limit2
    })
    return out
  }
}

export const calculateResults = ({ rootGetters }) => {
  const module = rootGetters['app/module']
  const phase = rootGetters['app/phase']
  const answers = rootGetters['app/answers']
  const category = rootGetters['questions/category']
  const questionsCount = rootGetters['questions/questionsCount']

  let result = null
  const func = calculate[module.id]
  if (func) {
    result = func(phase, category, answers, questionsCount)
    return result
  } else {
    return null
  }
}

export const loadAnonymous = ({ commit }) => {
  commit('CLEAR_ANONYMOUS_RESULT')
  commit('CLEAR_SAVED_RESULTS')
  const strObject = localStorage.getItem('la_anonymous_result')
  if (strObject) {
    const anonymousResults = JSON.parse(strObject)
    if (anonymousResults) {
      commit('SET_ANONYMOUS_RESULT', anonymousResults)
      commit('SET_SAVED_RESULTS', anonymousResults)
    }
  }
  return true
}

export const saveAnonymous = ({ getters, commit }, params) => {
  const { test, part, phase, level } = params
  commit('SAVE_ANONYMOUS_RESULT', { test, part, phase, level })
  const anonymousResults = getters['anonymousResults']
  const strObject = JSON.stringify(anonymousResults)
  localStorage.setItem('la_anonymous_result', strObject)
  return true
}

export const count = ({ commit, rootGetters }) => {
  const { id, attempt } = rootGetters['users/authUser']

  return axios
    .get(`/results/count/user/${id}/attempt/${attempt}`)
    .then(response => {
      commit('SET_COUNT', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const load = ({ commit, rootGetters }, params) => {
  const { id, attempt } = params

  return axios
    .get(`/results/user/${id}/attempt/${attempt}`)
    .then(response => {
      commit('SET_SAVED_RESULTS', response.data)
      return response.data
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const savePartOne = ({ commit, getters, rootGetters }, params) => {
  const { id, attempt } = params

  const test = rootGetters['app/test']
  const part = rootGetters['app/part']
  const phase = rootGetters['app/phase']
  const level = rootGetters['app/level']

  const postData = {
    idUser: id,
    attempt,
    test,
    part,
    phase,
    level
  }

  return axios
    .post('/results/save', postData)
    .then(response => {
      Notify.create({
        message: 'Результат сохранен, Вы можете продолжить позднее.',
        color: 'positive',
        textColor: 'white',
        icon: 'done'
      })
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const save = ({ commit, getters, rootGetters }, params) => {
  const { part } = params

  return axios
    .post('/results/save', params)
    .then(response => {
      if (part === 1) {
        Notify.create({
          message: 'Результат сохранен, Вы можете продолжить позднее.',
          color: 'positive',
          textColor: 'white',
          icon: 'done'
        })
      }
    })
    .catch(error => {
      errorNotify(error.message)
    })
}
