import { createExtension } from '../../common'
import { meta } from './meta'

export const KeyboardShortcut = createExtension<{}, {}>({
  name: meta.name,

  addKeyboardShortcuts() {
    return {
      // capture cmd+s, prevent default event: save html document
      'Mod-s': () => true
    }
  }
})
