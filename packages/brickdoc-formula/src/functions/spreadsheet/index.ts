import { spreadsheetAverageIfs } from './averageIfs'
import { spreadsheetColumnCount } from './columnCount'
import { spreadsheetCountA } from './countA'
import { spreadsheetCountIfs } from './countIfs'
import { spreadsheetMax } from './max'
import { spreadsheetRow } from './row'
import { spreadsheetRowCount } from './rowCount'
import { spreadsheetSpreadsheet } from './spreadsheet'
import { spreadsheetSum } from './sum'
import { spreadsheetSumIfs } from './sumIfs'
import { spreadsheetSumProduct } from './sumProduct'
import { spreadsheetToRecordArray } from './toRecordArray'
import { spreadsheetVlookup } from './vlookup'
import { spreadsheetXlookup } from './xlookup'

export const CORE_SPREADSHEET_FUNCTION_CLAUSES = [
  spreadsheetSpreadsheet,
  spreadsheetToRecordArray,
  spreadsheetSum,
  spreadsheetMax,
  spreadsheetVlookup,
  spreadsheetXlookup,
  spreadsheetRow,
  spreadsheetColumnCount,
  spreadsheetRowCount,
  spreadsheetSumIfs,
  spreadsheetAverageIfs,
  spreadsheetCountIfs,
  spreadsheetSumProduct,
  spreadsheetCountA
]
