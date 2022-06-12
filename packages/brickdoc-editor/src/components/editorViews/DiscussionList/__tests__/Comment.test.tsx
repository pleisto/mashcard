import { render } from '@testing-library/react'
import { Comment, CommentItem } from '../Comment'
import { meta as UserMeta } from '../../../../extensions/blocks/user/meta'
import { meta as TextMeta } from '../../../../extensions/blocks/text/meta'
import { meta as ParagraphMeta } from '../../../../extensions/blocks/paragraph/meta'

describe('DiscussionList > Comment', () => {
  it('renders UserBlock content normally', () => {
    const comment: CommentItem = {
      id: 1,
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
    const comment: CommentItem = {
      id: 1,
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
    const comment: CommentItem = {
      id: 1,
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
