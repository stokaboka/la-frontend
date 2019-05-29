import axios from 'axios'
import { Notify } from 'quasar'

const errorNotify = function (error) {
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
        level: 0,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 40,
        level: 1,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 80,
        level: 2,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 100,
        level: 2,
        next: { state: false, category: true, question: false }
      }
    ],

    // category 2
    [
      {
        limit: 0,
        level: 2,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 40,
        level: 3,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 80,
        level: 4,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 100,
        level: 4,
        next: { state: false, category: true, question: false }
      }
    ],

    // category 3
    [
      {
        limit: 0,
        level: 4,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 40,
        level: 5,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 80,
        level: 6,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 100,
        level: 6,
        next: { state: false, category: true, question: false }
      }
    ],

    // category 4
    [
      {
        limit: 0,
        level: 6,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 40,
        level: 7,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 80,
        level: 8,
        next: { state: true, category: false, question: false }
      },
      {
        limit: 100,
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
  one: (phase, category, answers, questionsCount = 0) => {
    const percentLimit = rules.one.limit
    let percent = 0
    // const count = answers.filter(e => e.phase === phase && e.category === category).length
    const score = answers
      .filter(e => e.phase === phase && e.category === category)
      .filter(e => e.a > 0).length
    if (questionsCount > 0) {
      percent = Math.round((100 * score) / questionsCount)
    }

    const level = category > 1 ? (percent >= percentLimit ? category : 0) : 1

    return {
      limit: percentLimit,
      level,
      next: { state: false, category: percent >= percentLimit, question: percent < percentLimit }
    }
  },

  two: (phase, category, answers, questionsCount = 0) => {
    let percent = 0
    const answer = answers.find(
      e => e.phase === phase && e.category === category
    )
    if (answer) {
      let score = answer.a
      if (answer.q > 0) {
        percent = Math.round((100 * score) / answer.q)
      }

      // const rules = [
      //   // category 1
      //   [
      //     {
      //       limit: 0,
      //       level: 0,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 40,
      //       level: 1,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 80,
      //       level: 2,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 100,
      //       level: 2,
      //       next: { state: false, category: true, question: false }
      //     }
      //   ],
      //
      //   // category 2
      //   [
      //     {
      //       limit: 0,
      //       level: 2,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 40,
      //       level: 3,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 80,
      //       level: 4,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 100,
      //       level: 4,
      //       next: { state: false, category: true, question: false }
      //     }
      //   ],
      //
      //   // category 3
      //   [
      //     {
      //       limit: 0,
      //       level: 4,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 40,
      //       level: 5,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 80,
      //       level: 6,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 100,
      //       level: 6,
      //       next: { state: false, category: true, question: false }
      //     }
      //   ],
      //
      //   // category 4
      //   [
      //     {
      //       limit: 0,
      //       level: 6,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 40,
      //       level: 7,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 80,
      //       level: 8,
      //       next: { state: true, category: false, question: false }
      //     },
      //     {
      //       limit: 100,
      //       level: 9,
      //       next: { state: true, category: false, question: false }
      //     }
      //   ]
      // ]

      const rule = rules.two[category - 1]
      const out = rule.find(e => percent <= e.limit)
      return out
    }
    return { limit: 0, level: category, next: false }
  },

  tree: (phase, category, answers, questionsCount = 0) => {
    let percent = 0
    const score = answers
      .filter(e => e.phase === phase && e.category === category)
      .filter(e => e.a > 0).length
    if (questionsCount > 0) {
      percent = Math.round((100 * score) / questionsCount)
    }
    // const rules = [
    //   // category 1
    //   [
    //     {
    //       limit1: null,
    //       limit2: 20,
    //       level: 0,
    //       next: { state: true, category: false, question: false }
    //     },
    //     {
    //       limit1: 20,
    //       limit2: 60,
    //       level: 1,
    //       next: { state: true, category: false, question: false }
    //     },
    //     {
    //       limit1: 60,
    //       limit2: null,
    //       level: 2,
    //       next: { state: false, category: true, question: false }
    //     }
    //   ],
    //
    //   // category 2
    //   [
    //     {
    //       limit1: null,
    //       limit2: 50,
    //       level: 2,
    //       next: { state: true, category: false, question: false }
    //     },
    //     {
    //       limit1: 50,
    //       limit2: 50,
    //       level: 3,
    //       next: { state: true, category: false, question: false }
    //     },
    //     {
    //       limit1: 50,
    //       limit2: null,
    //       level: 4,
    //       next: { state: false, category: true, question: false }
    //     }
    //   ],
    //
    //   // category 3
    //   [
    //     {
    //       limit1: null,
    //       limit2: 50,
    //       level: 4,
    //       next: { state: true, category: false, question: false }
    //     },
    //     {
    //       limit1: 50,
    //       limit2: 50,
    //       level: 5,
    //       next: { state: true, category: false, question: false }
    //     },
    //     {
    //       limit1: 50,
    //       limit2: null,
    //       level: 6,
    //       next: { state: false, category: true, question: false }
    //     }
    //   ],
    //
    //   // category 4
    //   [
    //     {
    //       limit1: null,
    //       limit2: 50,
    //       level: 6,
    //       next: { state: true, category: false, question: false }
    //     },
    //     {
    //       limit1: 50,
    //       limit2: 50,
    //       level: 7,
    //       next: { state: true, category: false, question: false }
    //     },
    //     {
    //       limit1: 50,
    //       limit2: null,
    //       level: 8,
    //       next: { state: true, category: false, question: false }
    //     }
    //   ]
    // ]

    const rule = rules.tree[category - 1]
    const out = rule.find(e => {
      if (e.limit1 === null) {
        return percent < e.limit2
      }
      if (e.limit2 === null) {
        return e.limit1 <= percent
      }
      if (e.limit1 === e.limit2) {
        return e.limit1 === percent
      }
      return e.limit1 <= percent && percent < e.limit2
    })
    return out
  }
}

export const calculateResults = ({ commit, getters, rootGetters }) => {
  const module = rootGetters['app/module']
  const phase = rootGetters['test/phase']
  const answers = rootGetters['test/answers']
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

export const count = ({ commit, getters, rootGetters }) => {
  const { id, attempt } = rootGetters['auth/user']
  const api = rootGetters['app/api']

  return axios
    .get(`${api}/results/count/user/${id}/attempt/${attempt}`)
    .then(response => {
      commit('SET_COUNT', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const load = ({ commit, getters, rootGetters }) => {
  const { id, attempt } = rootGetters['auth/user']
  const api = rootGetters['app/api']

  return axios
    .get(`${api}/results/list/user/${id}/attempt/${attempt}`)
    .then(response => {
      commit('SET_RESULTS', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const save = ({ commit, getters, rootGetters }, data) => {
  const { id, attempt } = rootGetters['auth/user']
  const api = rootGetters['app/api']
  const postData = {
    ...data,
    idUser: id,
    attempt
  }

  return axios
    .post(`${api}/results/save`, postData)
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
