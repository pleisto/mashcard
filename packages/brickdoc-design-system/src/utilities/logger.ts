const debugMode =
  (process.env.NODE_ENV !== 'production' || (globalThis as any)?.brickdocContext?.debug) && console !== undefined

export const devWarning = (condition: boolean, message: any, ...params: any[]) => {
  if (debugMode && condition) console.error(`[warn] ${message}`, ...params)
}

export const devLog = (message: any, ...params: any[]) => {
  if (debugMode) console.warn(`[debug] ${message}`, ...params)
}
