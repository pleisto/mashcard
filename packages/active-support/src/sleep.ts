export function sleep(milliseconds: number): { promise: Promise<void>; cancel: () => void } {
  let timeout: NodeJS.Timeout
  let rejectPromise: () => void
  return {
    promise: new Promise((resolve, reject) => {
      rejectPromise = reject
      timeout = setTimeout(resolve, milliseconds)
    }),
    cancel: () => {
      clearTimeout(timeout)
      rejectPromise()
    }
  }
}
