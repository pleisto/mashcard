import React from 'react'
import { Button, Icon, Input } from '@brickdoc/design-system'
import {
  SpreadsheetContainer,
  SpreadsheetView,
  SpreadsheetHeader,
  SpreadsheetHeaderColumn,
  SpreadsheetBody,
  SpreadsheetRow,
  SpreadsheetCellContainer,
  useSpreadsheetContext
} from '..'
import { COLOR } from '../../helpers/color'
import {
  displayValue,
  FormulaType,
  ButtonResult,
  InputResult,
  SpreadsheetResult,
  StringResult,
  AnyTypeResult,
  FormulaSourceType,
  VariableResult
} from '@brickdoc/formula'

const COLOR_ARRAY: { [key in FormulaType]: number } = {
  Date: 6,
  Error: 3,
  Column: 6,
  Block: 6,
  void: 3,
  Spreadsheet: 6,
  Button: 1,
  Switch: 1,
  Select: 1,
  Slider: 1,
  Input: 1,
  Radio: 1,
  Rate: 1,
  number: 0,
  null: 0,
  Predicate: 1,
  Cst: 0,
  Function: 3,
  Reference: 0,
  Blank: 0,
  string: 4,
  boolean: 4,
  any: 6,
  Record: 6,
  Array: 6
}

const renderTable = (result: SpreadsheetResult): React.ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const spreadsheetContext = useSpreadsheetContext()
  const columns = result.result.listColumns()
  const rows = result.result.listRows()
  return (
    <span className="brickdoc-formula-spreadsheet">
      <SpreadsheetContainer>
        <div className="spreadsheet-title">{result.result.name()}</div>
        <SpreadsheetView>
          <SpreadsheetHeader context={spreadsheetContext}>
            <SpreadsheetHeaderColumn className="row-action-panel" context={spreadsheetContext} columnId="" />
            {columns.map(c => (
              <SpreadsheetHeaderColumn key={c.columnId} context={spreadsheetContext} columnId={c.columnId}>
                <div className="column">{c.name}</div>
              </SpreadsheetHeaderColumn>
            ))}
          </SpreadsheetHeader>
          <SpreadsheetBody>
            {rows.map((row, rowIdx) => {
              const rowNumber = String((rowIdx as number) + 1)
              return (
                <SpreadsheetRow key={rowIdx} context={spreadsheetContext} rowId={rowNumber} rowNumber={rowNumber}>
                  {columns.map(c => (
                    <SpreadsheetCellContainer
                      key={c.columnId}
                      context={spreadsheetContext}
                      cellId={{ rowId: rowNumber, columnId: c.columnId }}
                    >
                      <div className="column">{row[c.columnId]}</div>
                    </SpreadsheetCellContainer>
                  ))}
                </SpreadsheetRow>
              )
            })}
          </SpreadsheetBody>
        </SpreadsheetView>
      </SpreadsheetContainer>
    </span>
  )
}

const renderOther = (result: AnyTypeResult, type: FormulaSourceType): React.ReactElement => {
  const activeColorIndex = COLOR_ARRAY[result.type] || 0
  const activeColor = COLOR[activeColorIndex]

  return (
    <span
      className="brickdoc-formula"
      style={{
        color: activeColor.color,
        borderColor: `rgb(${activeColor.rgb.join(',')}, 0.3)`,
        background: activeColor.label === 'Default' ? 'unset' : `rgb(${activeColor.rgb.join(',')}, 0.1)`
      }}
    >
      {displayValue(result)}
    </span>
  )
}

const renderButton = (result: ButtonResult): React.ReactElement => {
  return (
    <Button disabled={result.result.disabled} onClick={result.result.onClick}>
      {result.result.name}
    </Button>
  )
}

const renderInput = (result: InputResult): React.ReactElement => {
  return (
    <Input
      disabled={result.result.disabled}
      onChange={e => result.result.onChange?.(e.target.value)}
      value={result.result.value}
    />
  )
}

const renderQrcode = (result: StringResult): React.ReactElement => {
  return <span>[QRCODE] {result.result}</span>
}

const renderLiteral = (result: AnyTypeResult): React.ReactElement => {
  return <span>{result.result}</span>
}

export interface FormulaRenderProps {
  t?: VariableResult
  formulaType: FormulaSourceType
}

export const FormulaRender: React.FC<FormulaRenderProps> = ({ t, formulaType }) => {
  if (!t) {
    if (formulaType === 'normal') {
      return (
        <span className="brickdoc-formula-placeholder">
          <Icon.Formula className="brickdoc-formula-placeholder-icon" />
        </span>
      )
    }
    return <div />
  }

  const {
    variableValue: { result },
    kind,
    type
  } = t

  if (kind === 'literal') {
    return renderLiteral(result)
  }

  switch (result.view?.type ?? result.type) {
    case 'Button':
      return renderButton(result as ButtonResult)
    case 'Input':
      return renderInput(result as InputResult)
    case 'Spreadsheet':
      return renderTable(result as SpreadsheetResult)
    case 'Qrcode':
      return renderQrcode(result as StringResult)
    default:
      return renderOther(result, type)
  }
}
