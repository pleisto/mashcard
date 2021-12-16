/* eslint-disable max-len */
// import { ContextInterface, BaseFunctionClause, RecordResult } from '../..'

// import { ContextInterface, BaseFunctionClause, RecordResult } from '../..'

// // TODO { long: number; lat: number; msg: string }
// export const CURRENT_POSITION = async (ctx: ContextInterface): Promise<RecordResult> => {
//   if (!navigator.geolocation) {
//     return { type: 'Object', result: { long: 0, lat: 0, msg: 'Geolocation is not supported by your browser' } }
//   }

//   try {
//     const position: GeolocationPosition = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
//     return { type: 'Object', result: { long: position.coords.longitude, lat: position.coords.latitude, msg: 'ok' } }
//   } catch (e) {
//     return { type: 'Object', result: { long: 0, lat: 0, msg: (e as any).message } }
//   }
// }

// export const CORE_API_CLAUSES: BaseFunctionClause[] = [
//   {
//     name: 'CURRENT_POSITION',
//     async: true,
//     pure: false,
//     effect: false,
//     description: 'Returns current position',
//     group: 'core',
//     args: [],
//     returns: 'Object',
//     examples: [{ input: [], output: { long: 0, lat: 0, msg: 'Geolocation is not supported by your browser' } }],
//     chain: false,
//     reference: CURRENT_POSITION
//   }
// ]

export const CORE_API_CLAUSES = []
