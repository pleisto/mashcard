import { Editor, Range } from '@tiptap/core'
import { MentionCommandsOptions, MenuItems } from './mentionCommands'

export const filterMenuItemsByQuery =
  (options: MentionCommandsOptions) =>
  ({ query }: { query: string }): MenuItems => {
    const searchValue = (query ?? '').toLowerCase()
    const pages = options.editorProps.documentPages
    const domain = options.editorProps.domain
    const pagePath = (parentId: string | null | undefined, path: string[] = []): string[] => {
      const parent = pages.find(p => p.key === parentId)

      if (!parent) return path
      return pagePath(parent.parentId, [parent.title ?? 'Untitled', ...path])
    }
    return {
      users:
        options.editorProps.spaceMembers
          .filter(item => (item.name ?? '').toLowerCase().includes(searchValue))
          .map(item => ({
            name: item.name,
            domain: item.domain,
            avatar: item.avatar ?? '',
            command(editor: Editor, range: Range) {
              editor
                .chain()
                .focus()
                .deleteRange(range)
                .setUserBlock(item.domain, item.name, item.avatar ?? '')
                .run()
            }
          }))
          .slice(0, 5) ?? [],
      pages:
        pages
          .filter(item => {
            if (searchValue) return (item.title ?? '').toLowerCase().includes(searchValue)
            return !item.parentId
          })
          .map(item => ({
            name: item.title ?? '',
            icon: item.icon,
            category: pagePath(item.parentId).join('/'),
            command(editor: Editor, range: Range) {
              editor
                .chain()
                .focus()
                .deleteRange(range)
                .setPageLinkBlock(item.key, `/${domain}/${item.key}`, item.title, item.icon)
                .run()
            }
          }))
          .slice(0, 5) ?? []
    }
  }
