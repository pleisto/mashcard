import { mockEditor } from '../../../../test'
import { EditorPropsContext } from '../../../../context'
import { filterMenuItemsByQuery } from '../filterMenuItemsByQuery'
import { MentionCommandsOptions } from '../mentionCommands'

describe('filterMenuItemsByQuery', () => {
  it('filters items correctly', () => {
    const editorProps = { ...EditorPropsContext }
    const query = 'query'

    editorProps.spaceMembers = [
      {
        name: query,
        domain: 'domain',
        avatar: 'avatar'
      },
      {
        name: 'user2',
        domain: 'domain',
        avatar: 'avatar'
      }
    ]

    editorProps.documentPages = [
      {
        key: 'key1',
        value: 'value',
        parentId: null,
        sort: 0,
        icon: 'string',
        nextSort: 0,
        firstChildSort: 0,
        text: 'text',
        title: 'page1'
      },
      {
        key: 'key2',
        value: 'value',
        parentId: 'key1',
        sort: 0,
        icon: 'string',
        nextSort: 0,
        firstChildSort: 0,
        text: 'text',
        title: query
      }
    ]

    const option: MentionCommandsOptions = {
      editorProps
    }

    const { users, pages } = filterMenuItemsByQuery(option)({ query })

    expect(users).toHaveLength(1)
    expect(users[0].name).toEqual(query)

    expect(pages).toHaveLength(1)
    expect(pages[0].name).toEqual(query)
  })

  it('clicks item correctly', () => {
    const editorProps = { ...EditorPropsContext }

    editorProps.spaceMembers = [
      {
        name: 'user2',
        domain: 'domain',
        avatar: 'avatar'
      }
    ]

    editorProps.documentPages = [
      {
        key: 'key1',
        value: 'value',
        parentId: null,
        sort: 0,
        icon: 'string',
        nextSort: 0,
        firstChildSort: 0,
        text: 'text',
        title: 'page1'
      },
      {
        key: 'key2',
        value: 'value',
        parentId: 'key1',
        sort: 0,
        icon: 'string',
        nextSort: 0,
        firstChildSort: 0,
        text: 'text',
        title: 'page2'
      }
    ]

    const option: MentionCommandsOptions = {
      editorProps
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
