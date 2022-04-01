import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { CommentEditorContent } from '../commentEditor'
import { getDraft, setDraft } from '../draft'

jest.useFakeTimers()

describe('commentEditor', () => {
  it('renders commentEditor correctly', () => {
    const { container } = render(<CommentEditorContent markId="markId" />)

    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(container).toMatchSnapshot()
  })

  it('clicks send button correctly', () => {
    const mockSend = jest.fn()
    const markId = 'markId'
    setDraft(markId, {
      type: 'text',
      text: 'text'
    })
    render(<CommentEditorContent markId={markId} onSend={mockSend} />)

    fireEvent.click(screen.getByText('discussion.editor.send'))

    expect(mockSend).toBeCalled()
  })

  it('clicks cancel button correctly', () => {
    const markId = 'markId'
    setDraft(markId, {
      type: 'text',
      text: 'text'
    })
    render(<CommentEditorContent markId={markId} />)

    fireEvent.click(screen.getByText('discussion.editor.cancel'))

    expect(getDraft(markId)).toBeUndefined()
  })
})
