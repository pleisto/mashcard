import * as utils from '@react-aria/utils'
import { type GeneralModule } from '../../src/utilities/testing'
export {}

const INDEX_CACHE = new Map<string, number>()
const mockedUtils = new Proxy(utils, {
  get(target: GeneralModule, key) {
    if (key === 'useId') {
      // Generate a DOM id based on the current test name
      const testName = expect.getState().currentTestName
      const testId = testName.toLowerCase().replace(/\s/g, '-')
      const index = (INDEX_CACHE.get(testId) ?? -1) + 1
      INDEX_CACHE.set(testId, index)
      return (defaultId?: string) => [defaultId, testId, `${index}`].filter(Boolean).join('-')
    }
    return (target as GeneralModule)[key]
  }
})
module.exports = mockedUtils
