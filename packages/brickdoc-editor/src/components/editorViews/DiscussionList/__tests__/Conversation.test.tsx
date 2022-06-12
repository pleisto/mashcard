import { render } from '@testing-library/react'
import { Conversation } from '../Conversation'
import { CommentedNode } from '../useCommentedNodes'

describe('DiscussionList > Conversation', () => {
  it('matches correct snapshot', () => {
    const commentedNode: CommentedNode = {
      markId: 'mark id',
      position: 1,
      node: {} as any,
      domNode: document.createElement('div')
    }

    const { container } = render(<Conversation active={true} commentedNode={commentedNode} />)

    expect(container).toMatchSnapshot()
  })
})
