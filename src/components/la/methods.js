export const calculateResultLevel = (results, part) => {
  return results
    .filter(e => e.part === part)
    .reduce((acc, e) => acc + e.level, 0)
}

export const getPartPhaseLevel = (results, part, phase) => {
  if (results) {
    const phaseObj = results.find(
      e => e.part === part && e.phase === phase
    )
    if (phaseObj) return phaseObj.level
  }
  return 0
}
