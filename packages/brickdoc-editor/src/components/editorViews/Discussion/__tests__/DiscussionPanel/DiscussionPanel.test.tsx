import { render } from '@testing-library/react'
import { DiscussionPanel } from '../../DiscussionPanel'
import { CommentedNode } from '../../useCommentedNodes'

describe('DiscussionList > DiscussionPanel', () => {
  it('matches correct snapshot', () => {
    const commentedNodes: CommentedNode[] = [
      {
        markId: 'mark id',
        position: 1,
        node: {} as any,
        domNode: document.createElement('div')
      }
    ]
    const { container } = render(
      <DiscussionPanel
        commentedNodes={commentedNodes}
        setActiveMarkId={() => {}}
        visible={true}
        activeMarkId="active mark id"
      />
    )

    expect(container).toMatchSnapshot()
  })
})
