import { fireEvent, render, screen, act } from '@testing-library/react'
import { CommentEditorContent } from '../commentEditor'
import { getDraft, setDraft } from '../draft'

jest.useFakeTimers()

describe('commentEditor', () => {
  it('renders commentEditor correctly', () => {
    const { container } = render(<CommentEditorContent markId="markId" mentionCommandsOptions={{}} />)

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
    render(<CommentEditorContent markId={markId} onSend={mockSend} mentionCommandsOptions={{}} />)

    fireEvent.click(screen.getByText('discussion.editor.send'))

    expect(mockSend).toBeCalled()
  })

  it('clicks cancel button correctly', () => {
    const markId = 'markId'
    setDraft(markId, {
      type: 'text',
      text: 'text'
    })
    render(<CommentEditorContent markId={markId} mentionCommandsOptions={{}} />)

    fireEvent.click(screen.getByText('discussion.editor.cancel'))

    expect(getDraft(markId)).toBeUndefined()
  })
})
