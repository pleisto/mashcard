import { colorShadeMixin } from './palette'

interface lessNode {
  value: string
  rgb?: number[]
  parent?: lessNode
}

// less runtime hooks
declare const registerPlugin: (arg: object) => void

registerPlugin({
  install(_less: unknown, _pluginManger: unknown, functions: { add: (name: string, func: (...args: lessNode[]) => string) => void }) {
    functions.add('colorShade', (color: lessNode, shade: lessNode, isInverted: lessNode = { value: 'false' }) => {
      const colorStr = color.value ? color.value : `rgb(${color.rgb.join()})`
      return colorShadeMixin(colorStr, shade.value, isInverted.value)
    })
  }
})
