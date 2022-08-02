import { Extension } from '@tiptap/core'
import { meta, CommentOptions, CommentAttributes } from './meta'

export const Comment = Extension.create<CommentOptions, CommentAttributes>({
  name: meta.name,

  addKeyboardShortcuts() {
    const handleShiftEnter = (): boolean =>
      this.editor.commands.first(({ commands }) => [
        () => commands.newlineInCode(),
        () => commands.createParagraphNear(),
        () => commands.liftEmptyBlock(),
        () => commands.splitBlock()
      ])

    const handleEnter = (): boolean => {
      if (this.options.onSendComment) {
        this.options.onSendComment()
      }
      return true
    }

    return {
      Enter: handleEnter,
      'Shift-Enter': handleShiftEnter
    }
  },

  addCommands() {
    return {
      insertBlockAt:
        (content, position) =>
        ({ chain }) => {
          return position === undefined
            ? chain().insertContent(content).run()
            : chain().insertContentAt(position, content).run()
        }
    }
  }
})
