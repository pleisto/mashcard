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
import { display, SpreadsheetType, VariableDisplayData } from '@mashcard/formula'
import React from 'react'
import { FormulaDisplay } from '../../ui/Formula'
import { styled } from '@mashcard/design-system'
import { spreadsheetStyles } from './Spreadsheet.style'

export interface Row {
  rowId: string
}

export interface Column {
  columnId: string
  name: string
  sort: number
}

export interface SpreadsheetRenderProps {
  spreadsheet: SpreadsheetType
  rows: Row[]
  valuesMatrix: Map<string, Map<string, VariableDisplayData | undefined>>
  columns: Column[]
  defaultSelection: SpreadsheetSelection
}

export const SpreadsheetRender: React.FC<SpreadsheetRenderProps> = ({
  rows,
  spreadsheet,
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
          new Map(
            columns.map(c => {
              const displayData = valuesMatrix.get(rowId)?.get(c.columnId)
              return [c.columnId, displayData ? display(displayData.result, spreadsheet._formulaContext).result : '']
            })
          )
        ]
      })
    )
  })

  React.useEffect(() => {
    spreadsheetContext.setSelection(defaultSelection)
  }, [defaultSelection, spreadsheetContext])

  const SpreadsheetRenderContainer = styled('div', spreadsheetStyles)

  return (
    <SpreadsheetRenderContainer>
      <div className="node-spreadsheetBlock">
        <SpreadsheetContainer context={spreadsheetContext}>
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
      </div>
    </SpreadsheetRenderContainer>
  )
}
