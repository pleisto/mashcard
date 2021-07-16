import bulletList from '@tiptap/extension-bullet-list'

export const BulletListExtension = bulletList.extend({
  addKeyboardShortcuts() {
    return {
      // ↓ new keyboard shortcut
    }
  }
})
