
export const results = s => s.results
export const savedResults = s => s.savedResults
export const count = s => s.count

export const model = (s) => s.model

export const lastSavedResult = s => {
  if (s.savedResults.length > 0) {
    // const lastResult = this.savedResults[this.savedResults.length - 1]
    const lastResultList = s.savedResults
      .filter(e => e.part === 1)
      .sort((a, b) => b.phase - a.phase)
    if (lastResultList.length > 0) {
      const lastResult = lastResultList[0]
      return lastResult
    }
  }
  return false
}

export const anonymousResults = s => {
  return s.anonymousResults
}

export const existResults = s => {
  return s.results.length > 0
}

export const existAnonymousResults = s => {
  return s.anonymousResults.length > 0
}

export const existSavedResults = s => {
  return s.savedResults.length > 0
}

export const isAnonymousSessionComplete = s => {
  return s.anonymousResults.length === 3
}

export const isAuthorisedSessionComplete = s => {
  return s.savedResults.length === 3
}
