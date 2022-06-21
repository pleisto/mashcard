import { Content, Extension } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    eventHandler: {
      insertBlockAt: (content: Content, position?: number) => ReturnType
    }
  }
}

export const CommandHelper = Extension.create({
  name: 'commentHelper',

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
