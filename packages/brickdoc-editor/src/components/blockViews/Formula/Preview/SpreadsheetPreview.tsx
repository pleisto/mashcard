import { SpreadsheetType } from '@brickdoc/formula'
import { FormulaSpreadsheet } from '../Render/FormulaSpreadsheet'

export interface SpreadsheetPreviewProps {
  spreadsheet: SpreadsheetType
  rootId: string
}

export const SpreadsheetPreview: React.FC<SpreadsheetPreviewProps> = ({ spreadsheet, rootId }) => {
  return (
    <div className="brickdoc">
      <div className="ProseMirror">
        <div className="autocomplete-preview-spreadsheet">
          <FormulaSpreadsheet spreadsheet={spreadsheet} />
        </div>
      </div>
    </div>
  )
}
