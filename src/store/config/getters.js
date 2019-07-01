export const config = s => s.config
export const file = s => s.file
export const exportFormats = s => {
  if (s.config.result.export) {
    return Object.entries(s.config.result.export).map(([format, file]) => {
      return { format, file }
    })
  }
  return []
}
