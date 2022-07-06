import { FormulaSourceType, RecordResult, View } from '../type'
import { VegaLite, VisualizationSpec } from 'react-vega'

interface FormulaVegaProps {
  result: RecordResult
  formulaType: FormulaSourceType
}

const FormulaVegaBar: React.FC<FormulaVegaProps> = ({ result }) => {
  const values = Object.entries(result.result).map(([key, value]) => ({ key, value: value.result }))

  const spec: VisualizationSpec = {
    width: 1000,
    height: 500,
    mark: 'bar',
    encoding: {
      x: { field: 'key', type: 'ordinal' },
      y: { field: 'value', type: 'quantitative' }
    },
    data: { name: 'table' } // note: vega-lite data attribute is a plain object instead of an array
  }

  const barData = { table: values }

  return <VegaLite spec={spec} data={barData} />
}

export const vegaBarView: View = {
  type: 'bar',
  render: (attrs, data) => <FormulaVegaBar result={data.result as RecordResult} formulaType={data.meta.richType.type} />
}
