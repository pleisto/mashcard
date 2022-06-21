import { mockEditor } from '../../../../test'
import { filterMenuItemsByQuery } from '../filterMenuItemsByQuery'
import { MentionCommandsOptions } from '../meta'

describe('filterMenuItemsByQuery', () => {
  it('filters items correctly', () => {
    const query = 'query'

    const option: MentionCommandsOptions = {
      users: [
        {
          name: query,
          id: 'domain',
          avatar: 'avatar'
        },
        {
          name: 'user2',
          id: 'domain',
          avatar: 'avatar'
        }
      ],

      pages: [
        {
          id: 'key1',
          parentId: null,
          icon: 'string',
          link: 'link',
          title: 'page1'
        },
        {
          id: 'key2',
          parentId: 'key1',
          icon: 'string',
          link: 'link',
          title: query
        }
      ]
    }

    const { users, pages } = filterMenuItemsByQuery(option)({ query })

    expect(users).toHaveLength(1)
    expect(users[0].name).toEqual(query)

    expect(pages).toHaveLength(1)
    expect(pages[0].title).toEqual(query)
  })

  it('clicks item correctly', () => {
    const option: MentionCommandsOptions = {
      users: [
        {
          name: 'user2',
          id: 'domain',
          avatar: 'avatar'
        }
      ],

      pages: [
        {
          id: 'key1',
          parentId: null,
          icon: 'string',
          link: 'link',
          title: 'page1'
        },
        {
          id: 'key2',
          parentId: 'key1',
          icon: 'string',
          link: 'link',
          title: 'page2'
        }
      ]
    }

    const { users, pages } = filterMenuItemsByQuery(option)({ query: '' })
    const editor = mockEditor()

    expect(() => {
      users[0].command(editor, { from: 0, to: 1 })
    }).not.toThrow()

    expect(() => {
      pages[0].command(editor, { from: 0, to: 1 })
    }).not.toThrow()
  })
})
