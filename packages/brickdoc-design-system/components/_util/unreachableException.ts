// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UnreachableException {
  constructor(value: never) {
    return new Error(`unreachable case: ${JSON.stringify(value)}`)
  }
}
