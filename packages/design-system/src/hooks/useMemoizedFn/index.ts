export {
  /**
   * Hooks for persistent functions. In theory, useMemoizedFn can be used
   * instead of useCallback. In some scenarios, we need to use useCallback
   * to cache a function, but when the second parameter deps changes,
   * the function will be regenerated, causing the function reference to change.
   *
   * @see https://ahooks.js.org/hooks/use-memoized-fn/
   */
  useMemoizedFn
} from 'ahooks'
