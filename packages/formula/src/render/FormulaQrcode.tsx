import { AnyTypeResult, FormulaSourceType, View } from '../type'
import QRCode from 'qrcode.react'

interface FormulaQrcodeProps {
  result: AnyTypeResult<'string'>
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
  render: (attrs, data) => (
    <FormulaQrcode result={data.resultToRefactor as AnyTypeResult<'string'>} formulaType={data.meta.richType.type} />
  )
}
