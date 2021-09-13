import React from 'react'
import { cloneDeep } from 'lodash'
import { FilterGroupOption, FilterOption } from './Filter'
import { matches } from '../../columnType'
import { useAsyncDebounce } from 'react-table'

const findTargetGroup = (path: number[], prevGroup: FilterGroupOption): [FilterGroupOption, FilterGroupOption] => {
  const nextGroup = { ...prevGroup }
  const targetGroup = path.reduce((group, index) => {
    group.filters[index] = { ...group.filters[index] }
    return group.filters[index] as FilterGroupOption
  }, nextGroup)

  return [nextGroup, targetGroup]
}

export function useFilter(defaultGroupOption: FilterGroupOption): [
  filterGroup: FilterGroupOption,
  actions: {
    add: (isGroup: boolean, path?: number[]) => void
    remove: (path: number[]) => void
    update: (filter: Partial<FilterOption>, path: number[]) => void
    duplicate: (path: number[]) => void
    filter: (data: Record<string, any>, filterGroup: FilterGroupOption) => boolean
  }
] {
  const [filterGroup, setFilterGroup] = React.useState<FilterGroupOption>(defaultGroupOption)

  const add = React.useCallback(
    (isGroup: boolean, path: number[] = []): void =>
      setFilterGroup(prevGroup => {
        const [nextGroup, targetGroup] = findTargetGroup(path, prevGroup)
        const newFilter: FilterOption = isGroup
          ? { type: 'group', collectionType: 'intersection', filters: [{ type: 'single' }] }
          : { type: 'single' }
        targetGroup.filters = [...targetGroup.filters, newFilter]
        return nextGroup
      }),
    []
  )

  const remove = React.useCallback(
    (path: number[]): void =>
      setFilterGroup(prevGroup => {
        const targetIndex = path.pop()
        const [nextGroup, targetGroup] = findTargetGroup(path, prevGroup)
        targetGroup.filters = targetGroup.filters.filter((item, index) => index !== targetIndex)
        return nextGroup
      }),
    []
  )

  const update = useAsyncDebounce((filter: Partial<FilterOption>, path: number[]): void =>
    setFilterGroup(prevGroup => {
      const targetIndex = path.pop()
      const [nextGroup, targetGroup] = findTargetGroup(path, prevGroup)
      if (targetIndex === undefined) {
        return { ...nextGroup, ...(filter as FilterGroupOption) }
      } else {
        targetGroup.filters = targetGroup.filters.map((item, index) => {
          if (index === targetIndex) return { ...item, ...(filter as FilterOption) }
          return item
        })
        return nextGroup
      }
    })
  )

  const duplicate = React.useCallback(
    (path: number[]): void =>
      setFilterGroup(prevGroup => {
        const targetIndex = path.pop()
        const [nextGroup, targetGroup] = findTargetGroup(path, prevGroup)
        if (targetIndex === undefined) return prevGroup
        const targetFilter = targetGroup.filters[targetIndex]
        targetGroup.filters = [
          ...targetGroup.filters.slice(0, targetIndex + 1),
          cloneDeep(targetFilter),
          ...targetGroup.filters.slice(targetIndex + 1)
        ]
        return nextGroup
      }),
    []
  )

  const filter = React.useCallback((data: Record<string, any>, filterGroup: FilterGroupOption): boolean => {
    const type = filterGroup.collectionType

    return (
      filterGroup.filters.reduce<boolean | undefined>((prev, filterOption) => {
        if (type === 'intersection' && prev === false) return prev
        if (type === 'union' && prev === true) return prev

        if (filterOption.type === 'single') {
          if (!filterOption.matchType || !matches[filterOption.matchType]) return prev
          if (!filterOption.columnId) return prev
          const check = matches[filterOption.matchType].executor(data[filterOption.columnId], filterOption.value)

          if (type === 'intersection') return (prev ?? true) && check
          if (type === 'union') return (prev ?? true) || check
        }

        if (filterOption.type === 'group') return filter(data, filterOption)

        return prev
      }, undefined) ?? true
    )
  }, [])

  return [filterGroup, { add, remove, update, duplicate, filter }]
}
