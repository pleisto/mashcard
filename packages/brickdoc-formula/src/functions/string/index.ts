import { stringLen } from './len'
import { stringSplit } from './split'
import { stringStartWith } from './startWith'
import { stringToBar } from './toBar'
import { stringToQrcode } from './toQrcode'
import { stringTrim } from './trim'

export const CORE_STRING_FUNCTION_CLAUSES = [
  stringToBar,
  stringToQrcode,
  stringSplit,
  stringStartWith,
  stringLen,
  stringTrim
]
