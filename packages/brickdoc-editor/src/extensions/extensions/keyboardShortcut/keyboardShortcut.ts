import { createExtension } from '../../common'
import { meta } from './meta'

export const KeyboardShortcut = createExtension<{}, {}>({
  name: meta.name,

  addKeyboardShortcuts() {
    const handleBackspace = (): boolean =>
      this.editor.commands.first(({ commands }) => [
        () => commands.undoInputRule(),
        // maybe convert first text block node to default node
        () =>
          commands.command(({ tr }) => {
            const { selection } = tr
            const { empty, $anchor } = selection
            const { pos, parent } = $anchor
            // Selection.atStart(doc) will not be 1 if there have unselectable nodes
            // at start
            // const isAtStart = Selection.atStart(doc).from === pos
            const isAtStart = pos === 1

            if (!empty || !isAtStart || !parent.type.isTextblock || parent.textContent.length) {
              return false
            }

            return commands.clearNodes()
          }),
        () => commands.deleteSelection(),
        () => commands.joinBackward(),
        () => commands.selectNodeBackward()
      ])

    return {
      Backspace: handleBackspace,
      // capture cmd+s, prevent default event: save html document
      'Mod-s': () => true
    }
  }
})
