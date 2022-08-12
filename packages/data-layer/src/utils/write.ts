import { produce } from 'immer'

/**
 * See https://ngneat.github.io/elf/docs/immer for usage
 */
export function write<S>(updater: (draft: S) => void): (baseState: S) => S {
  return baseState => {
    return produce(baseState, updater)
  }
}
