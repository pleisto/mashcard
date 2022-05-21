import { SpreadsheetType } from '@brickdoc/formula'
import { FormulaSpreadsheet } from '../Render'
import { brickdocCls } from '../../../../editors/documentEditor/styles'

export interface SpreadsheetPreviewProps {
  spreadsheet: SpreadsheetType
  rootId: string
}

export const SpreadsheetPreview: React.FC<SpreadsheetPreviewProps> = ({ spreadsheet, rootId }) => {
  return (
    <div className={brickdocCls}>
      <div className="ProseMirror">
        <div className="autocomplete-preview-spreadsheet">
          <FormulaSpreadsheet spreadsheet={spreadsheet} />
        </div>
      </div>
    </div>
  )
}
