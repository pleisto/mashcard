import {
  GetDatabaseRowBlocksQuery as Query,
  GetDatabaseRowBlocksQueryVariables as Variables,
  GetDatabaseRowBlocksDocument,
  BlockInput
} from '@/BrickdocGraphQL'
import React from 'react'
import { v4 as uuid } from 'uuid'
import { useImperativeQuery } from '@/common/hooks'
import { isSavingVar } from '../../reactiveVars'
import { useDatabaseRowsReturn } from '@brickdoc/editor'

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

export function useDatabaseRows(options: {
  updateBlocks: (blocks: BlockInput[], toDeleteIds: string[]) => Promise<void>
}): useDatabaseRowsReturn {
  const { updateBlocks } = options
  const queryDatabaseRowBlocks = useImperativeQuery<Query, Variables>(GetDatabaseRowBlocksDocument)

  const [databaseRows, setDatabaseRows] = React.useState([] as DatabaseRows)

  const fetchRows = React.useCallback(
    async (parentId: string): Promise<void> => {
      const { data, error } = await queryDatabaseRowBlocks({ parentId, snapshotVersion: 0 })
      if (!error) {
        setDatabaseRows(data.databaseRowBlocks?.map(block => ({ ...block.data, id: block.id, sort: block.sort })) ?? [])
      }
    },
    [queryDatabaseRowBlocks]
  )

  const updateRows = React.useCallback(
    async (parentId: string, rows: DatabaseRows): Promise<void> => {
      if (parentId === '') {
        throw new Error('Updating database with empty parentId.')
      }
      isSavingVar(true)
      const rowsMap = new Map(rows.map(row => [row.id, row]))
      const prevRowsMap = new Map(databaseRows.map(row => [row.id, row]))
      const newRows = [
        ...databaseRows.map(prevRow => rowsMap.get(prevRow.id) ?? prevRow),
        ...rows.filter(row => !prevRowsMap.has(row.id))
      ].sort((a, b) => a.sort - b.sort)
      setDatabaseRows(newRows)
      const blocks: BlockInput[] = rows.map(row => {
        const { id, sort, ...data } = row
        const block: BlockInput = {
          id,
          sort,
          data,
          parentId,
          type: 'databaseRow',
          meta: {},
          content: [],
          text: ''
        }
        return block
      })
      await updateBlocks(blocks, [])
    },
    [databaseRows, updateBlocks]
  )

  const addRow = React.useCallback(
    (parentId: string, rowIndex?: number): DatabaseRow => {
      const currentRowIndex: number = rowIndex ?? databaseRows.length
      const id = uuid()
      const sort = calculateSort(databaseRows, currentRowIndex)

      const row = { id, sort }
      void updateRows(parentId, [row])
      return row
    },
    [databaseRows, updateRows]
  )

  const removeRow = React.useCallback(
    async (rowId: string): Promise<void> => {
      isSavingVar(true)
      setDatabaseRows(databaseRows.filter(row => row.id !== rowId))
      await updateBlocks([], [rowId])
    },
    [databaseRows, updateBlocks]
  )

  const moveRow = React.useCallback(
    (parentId: string, fromIndex: number, toIndex: number): DatabaseRow | undefined => {
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
      void updateRows(parentId, [targetRow]).then(() => {
        if (!targetRow) return
        setDatabaseRows([...newRows.slice(0, toIndex), targetRow, ...newRows.slice(toIndex, newRows.length)])
      })

      return targetRow
    },
    [databaseRows, updateRows]
  )

  return {
    rows: databaseRows,
    fetchRows,
    addRow,
    updateRows,
    removeRow,
    moveRow
  }
}
