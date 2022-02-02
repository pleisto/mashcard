const INDEX_CACHE = new Map<string, number>()
export const useId = (defaultId?: string) => {
  const testName = expect.getState().currentTestName
  const testId = testName.toLowerCase().replace(/\s/g, '-')
  const index = (INDEX_CACHE.get(testId) ?? -1) + 1
  INDEX_CACHE.set(testId, index)
  return [defaultId, testId, `${index}`].filter(Boolean).join('-')
}
