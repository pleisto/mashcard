// eslint-disable-next-line import/export
export * from '@mashcard/active-support'

// eslint-disable-next-line import/export
export function sleep(milliseconds: number): { promise: Promise<void>; cancel: () => void } {
  return {
    promise: Promise.resolve(),
    cancel: () => {}
  }
}
