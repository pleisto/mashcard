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
import {
  displayValue,
  ButtonResult,
  InputResult,
  SpreadsheetResult,
  StringResult,
  AnyTypeResult,
  FormulaSourceType,
  VariableResult,
  resultToColorType
} from '@brickdoc/formula'
import { FORMULA_COLORS } from '../../helpers/color'

const renderTable = (result: SpreadsheetResult, formulaType: FormulaSourceType): React.ReactElement => {
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

const renderButton = (result: ButtonResult, formulaType: FormulaSourceType): React.ReactElement => {
  return (
    <Button disabled={result.result.disabled} onClick={result.result.onClick}>
      {result.result.name}
    </Button>
  )
}

const renderInput = (result: InputResult, formulaType: FormulaSourceType): React.ReactElement => {
  return (
    <Input
      disabled={result.result.disabled}
      onChange={e => result.result.onChange?.(e.target.value)}
      value={result.result.value}
    />
  )
}

const renderQrcode = (result: StringResult, formulaType: FormulaSourceType): React.ReactElement => {
  return <span>[QRCODE] {result.result}</span>
}

const renderLiteral = (result: AnyTypeResult, formulaType: FormulaSourceType): React.ReactElement => {
  return <span>{result.result}</span>
}

const renderOther = (result: AnyTypeResult, type: FormulaSourceType): React.ReactElement => {
  const activeColor = FORMULA_COLORS[resultToColorType(result)]
  const className = type === 'normal' ? 'brickdoc-formula' : 'brickdoc-formula-other'
  const style = {
    color: activeColor.color,
    fontFamily: 'Fira Code',
    borderColor: `rgb(${activeColor.rgb.join(',')}, 0.3)`
  }

  return (
    <span className={className} style={style}>
      {displayValue(result)}
    </span>
  )
}
export interface FormulaRenderProps {
  t?: VariableResult
  formulaType: FormulaSourceType
}

export const FormulaRender: React.FC<FormulaRenderProps> = ({ t, formulaType, ...props }) => {
  if (!t) {
    if (formulaType === 'normal') {
      return (
        <span {...props} className="brickdoc-formula-placeholder">
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

  let data: React.ReactElement | null = null
  if (kind === 'literal') {
    data = renderLiteral(result, type)
  } else {
    switch (result.view?.type ?? result.type) {
      case 'Button':
        data = renderButton(result as ButtonResult, type)
        break
      case 'Input':
        data = renderInput(result as InputResult, type)
        break
      case 'Spreadsheet':
        data = renderTable(result as SpreadsheetResult, type)
        break
      case 'Qrcode':
        data = renderQrcode(result as StringResult, type)
        break
      default:
        data = renderOther(result, type)
        break
    }
  }

  return <div {...props}>{data}</div>
}
