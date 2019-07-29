export const calculateResultLevel = (results, part) => {
  return results
    .filter(e => e.part === part)
    .reduce((acc, e) => acc + e.level, 0)
}
