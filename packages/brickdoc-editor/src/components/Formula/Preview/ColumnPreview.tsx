import { ColumnType } from '@brickdoc/formula'
import { FormulaSpreadsheet } from '../Render/FormulaSpreadsheet'

export interface ColumnPreviewProps {
  column: ColumnType
  blockId: string
}

export const ColumnPreview: React.FC<ColumnPreviewProps> = ({ column, blockId }) => {
  return (
    <div className="brickdoc">
      <div className="ProseMirror">
        <div className="autocomplete-preview-column">
          <FormulaSpreadsheet spreadsheet={column.spreadsheet} columnIds={[column.columnId]} />
        </div>
      </div>
    </div>
  )
}
