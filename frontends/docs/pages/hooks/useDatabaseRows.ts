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
import { SyncStatusContext } from '../contexts/syncStatusContext'

export interface DatabaseRow {
  id: string
  [key: string]: any
}
export interface DatabaseRows extends Array<DatabaseRow> {}

const SORT_GAP = 2 ** 32

function calculateSort(rows: DatabaseRows, targetIndex: number, fromIndex?: number): number {
  let nextIndex = targetIndex
  let prevIndex = targetIndex - 1

  if (fromIndex !== undefined) {
    if (fromIndex > targetIndex) {
      prevIndex = targetIndex - 1
      nextIndex = targetIndex
    } else {
      prevIndex = targetIndex
      nextIndex = targetIndex + 1
    }
  }

  let nextRowSort: number | undefined = rows[nextIndex]?.sort
  let prevRowSort: number | undefined = rows[prevIndex]?.sort

  if (nextRowSort === undefined) {
    if (prevRowSort === undefined) {
      nextRowSort = 0
      prevRowSort = 0
    } else {
      nextRowSort = Number(prevRowSort) + 2 * SORT_GAP
    }
  }

  if (prevRowSort === undefined) {
    prevRowSort = Number(nextRowSort) - 2 * SORT_GAP
  }

  return Math.round(0.5 * (Number(nextRowSort) + Number(prevRowSort)))
}

export function useDatabaseRows(): (parentId: string) => [
  DatabaseRows,
  {
    fetchRows: () => Promise<void>
    addRow: (rowIndex?: number) => DatabaseRow
    updateRow: (row: DatabaseRow, updateState?: boolean) => Promise<void>
    removeRow: (rowId: string) => void
    moveRow: (fromIndex: number, toIndex: number) => DatabaseRow | undefined
    setRowsState: (rows: DatabaseRows) => void
  }
] {
  const { setCommitting } = React.useContext(SyncStatusContext)
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
        setCommitting(true)
        if (updateState) {
          setDatabaseRows(prevRows =>
            prevRows.map((prevRow: DatabaseRow) => {
              return prevRow.id === row.id ? row : prevRow
            })
          )
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
        setCommitting(false)
      },
      [setDatabaseRows, parentId, blockUpdate]
    )

    const addRow = React.useCallback(
      (rowIndex?: number): DatabaseRow => {
        const currentRowIndex: number = rowIndex ?? databaseRows.length
        const id = uuid()
        const sort = calculateSort(databaseRows, currentRowIndex)

        const row = { id, sort }
        void updateRow(row, false)
        setDatabaseRows([...databaseRows.slice(0, currentRowIndex), row, ...databaseRows.slice(currentRowIndex, databaseRows.length)])
        return row
      },
      [databaseRows, setDatabaseRows, updateRow]
    )

    const removeRow = React.useCallback(
      async (rowId: string): Promise<void> => {
        setCommitting(true)
        setDatabaseRows(databaseRows.filter(row => row.id !== rowId))
        const input: BlockSoftDeleteInput = { id: rowId }
        await blockSoftDelete({ variables: { input } })
        setCommitting(false)
      },
      [databaseRows, setDatabaseRows, blockSoftDelete]
    )

    const moveRow = React.useCallback(
      (fromIndex: number, toIndex: number): DatabaseRow | undefined => {
        let targetRow: DatabaseRow | undefined
        const newRows = databaseRows.filter((row, index: number) => {
          if (index !== fromIndex) {
            return true
          } else {
            const sort = calculateSort(databaseRows, toIndex, fromIndex)
            targetRow = { ...row, sort }

            return false
          }
        })

        if (!targetRow) return
        void updateRow(targetRow).then(() => {
          if (!targetRow) return
          setDatabaseRows([...newRows.slice(0, toIndex), targetRow, ...newRows.slice(toIndex, newRows.length)])
        })

        return targetRow
      },
      [databaseRows, updateRow]
    )

    const setRowsState = React.useCallback((rows: DatabaseRows): void => setDatabaseRows(rows), [setDatabaseRows])

    return [
      databaseRows,
      {
        fetchRows,
        addRow,
        updateRow,
        removeRow,
        moveRow,
        setRowsState
      }
    ]
  }
}
