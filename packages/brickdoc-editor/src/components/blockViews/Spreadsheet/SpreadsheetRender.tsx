import { SpreadsheetSelection, useSpreadsheetContext } from './SpreadsheetContext'
import {
  SpreadsheetContainer,
  SpreadsheetPanel,
  SpreadsheetRowAction,
  SpreadsheetScrollView,
  SpreadsheetView,
  SpreadsheetHeader,
  SpreadsheetHeaderColumn,
  SpreadsheetBody,
  SpreadsheetRow,
  SpreadsheetCellContainer,
  SpreadsheetColumnEditable
} from './SpreadsheetView'
import { VariableDisplayData } from '@brickdoc/formula'
import React from 'react'
import { FormulaDisplay } from '../../ui/Formula'

export interface Row {
  rowId: string
}

export interface Column {
  columnId: string
  name: string
  sort: number
}

export interface SpreadsheetRenderProps {
  title: string
  rows: Row[]
  valuesMatrix: Map<string, Map<string, VariableDisplayData | undefined>>
  columns: Column[]
  defaultSelection: SpreadsheetSelection
}

export const SpreadsheetRender: React.FC<SpreadsheetRenderProps> = ({
  rows,
  title,
  columns,
  valuesMatrix,
  defaultSelection
}) => {
  const spreadsheetContext = useSpreadsheetContext({
    editable: false,
    rowIds: rows.map(r => r.rowId),
    columnIds: columns.map(c => c.columnId),
    columnHeaders: new Map(columns.map(c => [c.columnId, c.name])),
    valuesMatrix: new Map(
      rows.map(r => {
        const { rowId } = r
        return [
          r.rowId,
          new Map(columns.map(c => [c.columnId, valuesMatrix.get(rowId)?.get(c.columnId)?.display ?? '']))
        ]
      })
    )
  })

  React.useEffect(() => {
    spreadsheetContext.setSelection(defaultSelection)
  }, [defaultSelection, spreadsheetContext])

  return (
    <SpreadsheetContainer context={spreadsheetContext} className="brickdoc-formula-spreadsheet">
      {/* <div className="spreadsheet-title">{title}</div> */}
      <SpreadsheetPanel context={spreadsheetContext}>
        {rows.map(({ rowId }, rowIdx) => {
          return (
            <SpreadsheetRowAction
              key={rowIdx}
              context={spreadsheetContext}
              rowId={rowId}
              rowNumber={`${rowIdx + 1}`}
              rowActions={[]}
              draggable={false}
            />
          )
        })}
      </SpreadsheetPanel>
      <SpreadsheetScrollView>
        <SpreadsheetView>
          <SpreadsheetHeader rowId="first" context={spreadsheetContext}>
            {columns.map((column, i) => {
              return (
                <SpreadsheetHeaderColumn
                  key={column.columnId}
                  context={spreadsheetContext}
                  columnId={column.columnId}
                  columnActions={[]}
                  draggable={false}
                >
                  <SpreadsheetColumnEditable
                    context={spreadsheetContext}
                    index={i}
                    column={{ ...column, uuid: column.columnId }}
                    editable={false}
                  />
                </SpreadsheetHeaderColumn>
              )
            })}
          </SpreadsheetHeader>
          <SpreadsheetBody>
            {rows.map((rowBlock, rowIdx) => {
              return (
                <SpreadsheetRow key={rowIdx} context={spreadsheetContext} rowId={rowBlock.rowId}>
                  {columns.map((column, columnIdx) => {
                    return (
                      <SpreadsheetCellContainer
                        key={column.columnId}
                        context={spreadsheetContext}
                        cellId={{ rowId: rowBlock.rowId, columnId: column.columnId }}
                      >
                        <div className="cell">
                          <FormulaDisplay
                            displayData={valuesMatrix.get(rowBlock.rowId)?.get(column.columnId)}
                            formulaType="spreadsheet"
                          />
                        </div>
                      </SpreadsheetCellContainer>
                    )
                  })}
                </SpreadsheetRow>
              )
            })}
          </SpreadsheetBody>
        </SpreadsheetView>
      </SpreadsheetScrollView>
    </SpreadsheetContainer>
  )
}
