import React from 'react'
import { Column, TableColumnSelectOption } from 'react-table'
import { v4 as uuid } from 'uuid'
import { useEditorI18n } from '../../../hooks'

export const DEFAULT_GROUP_ID = '__defaultGroup'

export interface DatabaseColumn {
  key: string
  title: string
  type: string
  // group: string
  selectOptions?: TableColumnSelectOption[]
  dateFormat?: string
  dateIncludeTime?: boolean
}

export interface DatabaseColumns extends Array<DatabaseColumn> {}

export const databaseColumnsToTableColumns = (databaseColumns: DatabaseColumns): Column[] =>
  Object.entries(
    databaseColumns.reduce((r: { [group: string]: Column[] }, dbColumn: DatabaseColumn) => {
      const group = DEFAULT_GROUP_ID
      const column = {
        accessor: dbColumn.key,
        Header: dbColumn.title,
        columnType: dbColumn.type,
        selectOptions: dbColumn.selectOptions ?? [],
        dateIncludeTime: dbColumn.dateIncludeTime,
        dateFormat: dbColumn.dateFormat,
        index: (r[group] || []).length
      }
      r[group] = [...(r[group] || []), column]
      return r
    }, {})
  ).map(([group, columns]) => ({ id: group, columns }))

export function useColumns(options: { databaseColumns: DatabaseColumns; updateAttributeData: (attributes: Record<string, any>) => void }): [
  Column[],
  {
    setColumns: (fn: (prevColumns: DatabaseColumns) => DatabaseColumns) => void
    add: () => void
    remove: (groupId: string, columnId: string) => void
    updateName: (value: string, groupId: string, columnId: string) => void
    updateType: (type: string, groupId: string, columnId: string) => void
  }
] {
  const { t } = useEditorI18n()
  const { databaseColumns, updateAttributeData } = options

  const latestDatabaseColumns = React.useRef<DatabaseColumns>(databaseColumns)
  const latestColumns = React.useRef<Column[]>(databaseColumnsToTableColumns(latestDatabaseColumns.current))

  const setColumns = (fn: (prevColumns: DatabaseColumns) => DatabaseColumns): void => {
    latestDatabaseColumns.current = fn(latestDatabaseColumns.current)
    latestColumns.current = databaseColumnsToTableColumns(latestDatabaseColumns.current)
    updateAttributeData({ columns: latestDatabaseColumns.current })
  }

  const remove = (groupId: string, columnId: string): void =>
    setColumns(prevColumns => prevColumns.filter(dbColumn => dbColumn.key !== columnId))

  const add = (): void =>
    setColumns(prevColumns => [
      ...prevColumns,
      {
        key: uuid(),
        title: `${t('table.column_default_name')}${prevColumns.length + 1}`,
        type: 'text',
        index: prevColumns.length
      }
    ])

  const updateName = (value: string, groupId: string, columnId: string): void =>
    setColumns(prevColumns => prevColumns.map(dbColumn => (dbColumn.key === columnId ? { ...dbColumn, title: value } : dbColumn)))

  const updateType = (type: string, groupId: string, columnId: string): void =>
    setColumns(prevColumns => prevColumns.map(dbColumn => (dbColumn.key === columnId ? { ...dbColumn, type } : dbColumn)))

  return [latestColumns.current, { setColumns, add, remove, updateName, updateType }]
}
