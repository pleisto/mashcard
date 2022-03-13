import { BlockViewProps, ExtensionMeta } from '../../common'
import { SpreadsheetColumn } from '../../../components/blockViews/Spreadsheet/useSpreadsheet'

export const meta: ExtensionMeta = {
  name: 'spreadsheetBlock',
  extensionType: 'block'
}

export interface SpreadsheetOptions {}
export interface SpreadsheetAttributes {
  isNew?: boolean
  data: {
    rowsCount: number
    columns: SpreadsheetColumn[]
  }
  title: string
}

export interface SpreadsheetViewProps extends BlockViewProps<SpreadsheetOptions, SpreadsheetAttributes> {}
