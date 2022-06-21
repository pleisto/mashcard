import { FormulaSourceType, StringResult, View } from '../types'
import QRCode from 'qrcode.react'

interface FormulaQrcodeProps {
  result: StringResult
  formulaType: FormulaSourceType
}

const FormulaQrcode: React.FC<FormulaQrcodeProps> = ({ result }) => {
  return (
    <span>
      <QRCode value={result.result} />
    </span>
  )
}

export const qrcodeView: View = {
  type: 'qrcode',
  render: (attrs, data) => <FormulaQrcode result={data.result as StringResult} formulaType={data.meta.richType.type} />
}
