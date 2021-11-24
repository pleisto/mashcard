import { ContextInterface, FunctionClause } from '../..'

export const CURRENT_POSITION = async (ctx: ContextInterface): Promise<{ long: number; lat: number; msg: string }> => {
  if (!navigator.geolocation) {
    return { long: 0, lat: 0, msg: 'Geolocation is not supported by your browser' }
  }

  try {
    const position: GeolocationPosition = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
    return { long: position.coords.longitude, lat: position.coords.latitude, msg: 'ok' }
  } catch (e) {
    return { long: 0, lat: 0, msg: (e as any).message }
  }
}

export const API_CLAUSES: FunctionClause[] = [
  {
    name: 'CURRENT_POSITION',
    async: true,
    pure: false,
    effect: false,
    description: 'Returns current position',
    group: 'core',
    args: [],
    returns: 'object',
    examples: [{ input: [], output: { long: 0, lat: 0, msg: 'Geolocation is not supported by your browser' } }],
    chain: false,
    reference: CURRENT_POSITION
  }
]
