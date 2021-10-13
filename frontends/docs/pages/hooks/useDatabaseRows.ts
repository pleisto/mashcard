import {
  GetDatabaseRowBlocksQuery as Query,
  GetDatabaseRowBlocksQueryVariables as Variables,
  GetDatabaseRowBlocksDocument,
  useBlockUpdateMutation,
  useBlockSoftDeleteMutation,
  BlockUpdateInput,
  BlockSoftDeleteInput,
  BlockInput
} from '@/BrickdocGraphQL'
import React from 'react'
import { v4 as uuid } from 'uuid'
import { useImperativeQuery } from '@/common/hooks'

export interface DatabaseRow {
  id: string
  sort: number
  [key: string]: any
}
export interface DatabaseRows extends Array<DatabaseRow> {}

export function useDatabaseRows(setCommitting?: (value: boolean) => void): (parentId: string) => [
  DatabaseRows,
  {
    fetchRows: () => Promise<void>
    addRow: (rowIndex?: number) => DatabaseRow
    updateRow: (row: DatabaseRow, updateState?: boolean) => void
    removeRow: (rowId: string) => void
    setRowsState: (rows: DatabaseRows) => void
  }
] {
  return function useDatabaseRows(parentId: string) {
    const queryDatabaseRowBlocks = useImperativeQuery<Query, Variables>(GetDatabaseRowBlocksDocument)

    const [blockUpdate] = useBlockUpdateMutation()
    const [blockSoftDelete] = useBlockSoftDeleteMutation()

    const [databaseRows, setDatabaseRows] = React.useState([] as DatabaseRows)

    const fetchRows = React.useCallback(async (): Promise<void> => {
      const { data, error } = await queryDatabaseRowBlocks({ parentId, snapshotVersion: 0 })
      if (!error) {
        setDatabaseRows(data.databaseRowBlocks?.map(block => ({ ...block.data, id: block.id, sort: block.sort })) ?? [])
      }
    }, [parentId, queryDatabaseRowBlocks])

    const updateRow = React.useCallback(
      async (row: DatabaseRow, updateState = true): Promise<void> => {
        setCommitting?.(true)
        if (updateState) {
          const newRows = databaseRows.map((prevRow: DatabaseRow) => {
            return prevRow.id === row.id ? row : prevRow
          })
          setDatabaseRows(newRows)
        }
        const { id, sort, ...data } = row
        const blockArg: BlockInput = {
          id,
          sort,
          data,
          parentId,
          type: 'databaseRow',
          content: [],
          text: ''
        }
        const input: BlockUpdateInput = { block: blockArg, rootId: parentId }
        await blockUpdate({ variables: { input } })
        setCommitting?.(false)
      },
      [databaseRows, setDatabaseRows, parentId, blockUpdate]
    )

    const addRow = React.useCallback(
      (rowIndex?: number): DatabaseRow => {
        const currentRowIndex = rowIndex ?? databaseRows.length - 1
        const id = uuid()
        const row = { id, sort: currentRowIndex }
        void updateRow(row, false)
        setDatabaseRows([
          ...databaseRows.slice(0, currentRowIndex + 1),
          row,
          ...databaseRows.slice(currentRowIndex + 1, databaseRows.length)
        ])
        return row
      },
      [databaseRows, setDatabaseRows, updateRow]
    )

    const removeRow = React.useCallback(
      async (rowId: string): Promise<void> => {
        if (setCommitting) setCommitting(true)
        setDatabaseRows(databaseRows.filter(row => row.id !== rowId))
        const input: BlockSoftDeleteInput = { id: rowId }
        await blockSoftDelete({ variables: { input } })
        if (setCommitting) setCommitting(false)
      },
      [databaseRows, setDatabaseRows, blockSoftDelete]
    )

    const setRowsState = React.useCallback((rows: DatabaseRows): void => setDatabaseRows(rows), [setDatabaseRows])

    return [
      databaseRows,
      {
        fetchRows,
        addRow,
        updateRow,
        removeRow,
        setRowsState
      }
    ]
  }
}
