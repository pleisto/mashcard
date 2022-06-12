import { type GeneralModule } from '../../src/utilities/testing'

export {}

const BYPASSED_EXPORTS: Array<string | symbol> = ['IconProvider', 'DEFAULT_ICON_CONFIGS', 'ImageIcon']
const icons = new Proxy(
  {},
  {
    get(obj: GeneralModule, key) {
      if (BYPASSED_EXPORTS.includes(key)) {
        return obj[key]
      }
      const name = `mock-icon-${key.toString()}`
      return () => <i data-testid={name} />
    }
  }
)
module.exports = icons
