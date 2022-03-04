import React from 'react'
import { Icon } from '@brickdoc/design-system'
import {
  ButtonResult,
  InputResult,
  SpreadsheetType,
  StringResult,
  FormulaSourceType,
  VariableDisplayData,
  loadDisplayResult
} from '@brickdoc/formula'
import { FormulaValue } from './FormulaValue'
import { FormulaInput } from './Render/FormulaInput'
import { FormulaQrcode } from './Render/FormulaQrcode'
import { FormulaButton } from './Render/FormulaButton'
import { FormulaLiteral } from './Render/FormulaLiteral'
import { FormulaSpreadsheet } from './Render/FormulaSpreadsheet'
import { EditorDataSourceContext } from '../../dataSource/DataSource'
import { BlockContainer } from '../BlockContainer'

export interface FormulaDisplayProps {
  displayData?: VariableDisplayData
  display?: string
  formulaType: FormulaSourceType
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ displayData, display, formulaType, ...props }) => {
  if (!displayData) {
    if (formulaType === 'normal') {
      return (
        <span {...props} className="brickdoc-formula-empty">
          <Icon.Formula className="brickdoc-formula-empty-icon" />
        </span>
      )
    }
    return <div />
  }

  const { kind, result, type, meta } = displayData

  if (kind === 'literal') {
    return (
      <span {...props}>
        <FormulaLiteral result={result} formulaType={type} />
      </span>
    )
  }

  if (formulaType === 'normal' && result.type === 'Error') {
    return (
      <span {...props} className="brickdoc-formula-error">
        <Icon.Formula className="brickdoc-formula-error-icon" />
      </span>
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const formulaContext = editorDataSource.formulaContext!

  const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }
  const newDisplayData = loadDisplayResult(ctx, displayData)

  let preview: React.ReactElement | null = <></>

  switch (newDisplayData.result.view?.type ?? newDisplayData.result.type) {
    case 'Button':
      preview = <FormulaButton result={newDisplayData.result as ButtonResult} formulaType={newDisplayData.type} />
      break
    case 'Input':
      preview = <FormulaInput result={newDisplayData.result as InputResult} formulaType={newDisplayData.type} />
      break
    case 'Spreadsheet':
      preview = (
        <BlockContainer>
          <FormulaSpreadsheet spreadsheet={newDisplayData.result.result as SpreadsheetType} />
        </BlockContainer>
      )
      break
    case 'Qrcode':
      preview = <FormulaQrcode result={newDisplayData.result as StringResult} formulaType={newDisplayData.type} />
      break
    default:
      break
  }

  return (
    <>
      <span {...props}>
        <FormulaValue displayData={newDisplayData} display={display ?? newDisplayData.display} border={true} />
      </span>
      {preview}
    </>
  )
}
