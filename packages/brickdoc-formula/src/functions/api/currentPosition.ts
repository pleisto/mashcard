import { createFunctionClause, FunctionContext, RecordResult } from '../../types'

const CURRENT_POSITION = async (ctx: FunctionContext): Promise<RecordResult> => {
  if (!navigator.geolocation) {
    return {
      type: 'Record',
      result: {
        long: { result: 0, type: 'number' },
        lat: { result: 0, type: 'number' }
      },
      subType: 'number'
    }
  }

  try {
    const position: GeolocationPosition = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    )
    return {
      type: 'Record',
      result: {
        long: { result: position.coords.longitude, type: 'number' },
        lat: { result: position.coords.latitude, type: 'number' }
      },
      subType: 'number'
    }
  } catch (e) {
    return {
      type: 'Record',
      result: {
        long: { result: 0, type: 'number' },
        lat: { result: 0, type: 'number' }
      },
      subType: 'number'
    }
  }
}

export const apiCurrentPosition = createFunctionClause({
  name: 'CURRENT_POSITION',
  async: true,
  persist: false,
  pure: false,
  effect: false,
  lazy: false,
  acceptError: false,
  testCases: [],
  description: 'Returns current position',
  group: 'core',
  args: [],
  returns: 'Record',
  examples: [
    {
      input: '=CURRENT_POSITION()',
      output: {
        type: 'Record',
        subType: 'number',
        result: {
          long: { result: 0, type: 'number' },
          lat: { result: 0, type: 'number' }
        }
      }
    }
  ],
  chain: false,
  reference: CURRENT_POSITION
})
