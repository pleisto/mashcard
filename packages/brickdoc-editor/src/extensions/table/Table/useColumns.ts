import React from 'react'
import { Column } from 'react-table'
import { v4 as uuid } from 'uuid'

export const DEFAULT_GROUP_ID = '__defaultGroup'

export function useColumns(defaultColumns: Column[]): [
  Column[],
  {
    remove: (groupId: string, columnId: string) => void
    update: (value: string, groupId: string, columnId: string) => void
    add: () => void
  }
] {
  const [columns, setColumns] = React.useState<Column[]>(defaultColumns)

  const remove = React.useCallback((groupId: string, columnId: string): void => {
    setColumns(prevColumns =>
      prevColumns.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            columns: ((group as any).columns as Column[]).filter(column => column.accessor !== columnId)
          }
        }

        return group
      })
    )
  }, [])

  const update = React.useCallback(
    (value: string, groupId: string, columnId: string): void =>
      setColumns(prevColumns =>
        prevColumns.map(group => {
          if (group.id !== groupId) return group
          return {
            ...group,
            columns: ((group as any).columns as Column[]).map(column => ({
              ...column,
              Header: column.accessor === columnId ? value : column.Header
            }))
          }
        })
      ),
    []
  )

  const add = React.useCallback((): void => {
    setColumns(prevColumns => {
      return prevColumns.map(group => {
        if (group.id === DEFAULT_GROUP_ID) {
          const columns: Column[] = (group as any).columns
          const label = 'Column'
          const existsCount = columns.filter(c => typeof c.Header === 'string' && c.Header.startsWith(label)).length
          const Header = `${label}${existsCount}`

          return {
            ...group,
            columns: [
              ...columns,
              {
                Header,
                accessor: uuid()
              }
            ]
          }
        }

        return group
      })
    })
  }, [])

  return [columns, { add, update, remove }]
}
