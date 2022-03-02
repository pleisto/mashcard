import { FormulaSourceType, StringResult } from '@brickdoc/formula'
import QRCode from 'qrcode.react'

export interface FormulaQrcodeProps {
  result: StringResult
  formulaType: FormulaSourceType
}

export const FormulaQrcode: React.FC<FormulaQrcodeProps> = ({ result }) => {
  return (
    <span>
      <QRCode value={result.result} />
    </span>
  )
}
