import React from 'react'
import { useAsyncDebounce } from 'react-table'
import { orderBy, uniqBy } from 'lodash-es'
import { SorterOption } from './Sorter'

export function useSorter(defaultSorterOptions: SorterOption[]): [
  sorterOptions: SorterOption[],
  actions: {
    add: () => void
    remove: (index: number) => void
    update: (sorterOption: Partial<SorterOption>, index: number) => void
    sort: <T extends Record<string, any>>(data: T[]) => T[]
  }
] {
  const [sorters, setSorters] = React.useState<SorterOption[]>(defaultSorterOptions)

  const add = React.useCallback((): void => setSorters(prevSorters => [...prevSorters, {}]), [])

  const remove = React.useCallback(
    (targetIndex: number): void =>
      setSorters(prevSorters => prevSorters.filter((item, index) => index !== targetIndex)),
    []
  )

  const update = useAsyncDebounce((sorter: Partial<SorterOption>, targetIndex: number) =>
    setSorters(prevSorters =>
      prevSorters.map((item, index) => {
        if (index === targetIndex) {
          return {
            ...item,
            ...sorter
          }
        }

        return item
      })
    )
  )

  const sort = React.useCallback(
    <T extends Record<string, any>>(data: T[]): T[] => {
      const [fields, sorts] = uniqBy(
        sorters.filter(item => item.columnId && item.sort),
        'columnId'
      ).reduce<[string[], Array<'asc' | 'desc'>]>(
        (prev, cur) => {
          prev[0].push(cur.columnId!)
          prev[1].push(cur.sort!)
          return prev
        },
        [[], []]
      )
      return orderBy(data, fields, sorts)
    },
    [sorters]
  )

  return [sorters, { add, remove, update, sort }]
}
