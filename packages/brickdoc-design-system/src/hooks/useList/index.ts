import { useCallback } from 'react'
import { useDynamicList } from '../../hooks'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useList = <T>(initialList: T[] = []) => {
  const {
    list,
    insert,
    merge,
    replace,
    remove,
    getKey,
    getIndex,
    move,
    push,
    pop,
    unshift,
    shift,
    sortList,
    resetList
  } = useDynamicList(initialList)

  const addList = useCallback(
    (data: T[]) => {
      if (!data?.length) {
        return
      }
      data.forEach((item: T) => {
        push(item)
      })
    },
    [push]
  )

  return {
    list,
    addList,
    insert,
    merge,
    replace,
    remove,
    getKey,
    getIndex,
    move,
    push,
    pop,
    unshift,
    shift,
    sortList,
    resetList
  }
}
