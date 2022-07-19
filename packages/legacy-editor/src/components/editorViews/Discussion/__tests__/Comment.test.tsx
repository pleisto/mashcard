import { render } from '@testing-library/react'
import { Comment } from '../Comment'
import { meta as UserMeta } from '../../../../extensions/blocks/user/meta'
import { meta as TextMeta } from '../../../../extensions/blocks/text/meta'
import { meta as ParagraphMeta } from '../../../../extensions/blocks/paragraph/meta'
import { CommentData } from '../../../../extensions'

describe('DiscussionList > Comment', () => {
  it('renders UserBlock content normally', () => {
    const comment: CommentData = {
      id: '1',
      createdAt: new Date('2022-06-17 16:50:50'),
      creator: {
        name: 'name',
        id: 'id'
      },
      content: {
        content: [
          {
            type: UserMeta.name,
            attrs: {
              people: {
                type: 'PEOPLE',
                name: 'name',
                domain: 'domain',
                avatarUrl: 'avatarUrl'
              }
            }
          }
        ]
      }
    }

    const { container } = render(<Comment comment={comment} />)

    expect(container).toMatchSnapshot()
  })

  it('renders text content normally', () => {
    const comment: CommentData = {
      id: '1',
      createdAt: new Date('2022-06-17 16:50:50'),
      creator: {
        name: 'name',
        id: 'id'
      },
      content: {
        content: [
          {
            type: TextMeta.name,
            text: 'text'
          }
        ]
      }
    }

    const { container } = render(<Comment comment={comment} />)

    expect(container).toMatchSnapshot()
  })

  it('renders paragraph content normally', () => {
    const comment: CommentData = {
      id: '1',
      createdAt: new Date('2022-06-17 16:50:50'),
      creator: {
        name: 'name',
        id: 'id'
      },
      content: {
        content: [
          {
            type: ParagraphMeta.name,
            content: [
              {
                type: TextMeta.name,
                text: 'text'
              }
            ]
          }
        ]
      }
    }

    const { container } = render(<Comment comment={comment} />)

    expect(container).toMatchSnapshot()
  })
})
