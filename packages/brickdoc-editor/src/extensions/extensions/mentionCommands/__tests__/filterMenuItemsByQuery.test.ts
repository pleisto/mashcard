import { ExternalProps } from '../../../../context'
import { filterMenuItemsByQuery } from '../filterMenuItemsByQuery'
import { MentionCommandsOptions } from '../mentionCommands'

describe('filterMenuItemsByQuery', () => {
  it('filters items correctly', () => {
    const externalProps = new ExternalProps()
    const query = 'query'

    externalProps.spaceMembers = [
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

    externalProps.documentPages = [
      {
        key: 'key1',
        value: 'value',
        parentId: null,
        sort: 0,
        icon: 'string',
        nextSort: 0,
        firstChildSort: 0,
        text: 'text',
        title: query
      },
      {
        key: 'key2',
        value: 'value',
        parentId: null,
        sort: 0,
        icon: 'string',
        nextSort: 0,
        firstChildSort: 0,
        text: 'text',
        title: 'page2'
      }
    ]

    const option: MentionCommandsOptions = {
      externalProps
    }

    const { users, pages } = filterMenuItemsByQuery(option)({ query })

    expect(users).toHaveLength(1)
    expect(users[0].name).toEqual(query)

    expect(pages).toHaveLength(1)
    expect(pages[0].name).toEqual(query)
  })
})
