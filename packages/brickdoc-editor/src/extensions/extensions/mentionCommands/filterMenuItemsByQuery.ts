import { Editor, Range } from '@tiptap/core'
import { MentionCommandsOptions, MentionPage, MentionUser } from './meta'

export interface UserItem extends MentionUser {
  command: (editor: Editor, range: Range) => void
}

export interface PageItem extends MentionPage {
  category?: string
  command: (editor: Editor, range: Range) => void
}

export interface MenuItems {
  users: UserItem[]
  pages: PageItem[]
}

export const filterMenuItemsByQuery =
  (options: MentionCommandsOptions) =>
  ({ query }: { query: string }): MenuItems => {
    const searchValue = (query ?? '').toLowerCase()
    const pages = options.pages
    const pagePath = (parentId: string | null | undefined, path: string[] = []): string[] => {
      const parent = pages.find(p => p.id === parentId)

      if (!parent) return path
      return pagePath(parent.parentId, [parent.title ?? 'Untitled', ...path])
    }
    return {
      users:
        options.users
          .filter(item => (item.name ?? '').toLowerCase().includes(searchValue))
          .map(item => ({
            id: item.id,
            name: item.name,
            avatar: item.avatar ?? '',
            command(editor: Editor, range: Range) {
              editor
                .chain()
                .focus()
                .deleteRange(range)
                .setUserBlock(item.id, item.name, item.avatar ?? '')
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
            id: item.id,
            link: item.link,
            parentId: item.parentId,
            title: item.title ?? '',
            icon: item.icon,
            category: pagePath(item.parentId).join('/'),
            command(editor: Editor, range: Range) {
              editor
                .chain()
                .focus()
                .deleteRange(range)
                .setPageLinkBlock(item.id, item.link, item.title, item.icon)
                .run()
            }
          }))
          .slice(0, 5) ?? []
    }
  }
