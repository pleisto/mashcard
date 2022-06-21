import { escape } from '@mashcard/active-support'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { Paragraph } from '../../paragraph'
import { Callout } from '../callout'

describe('Callout', () => {
  it('renders Callout correctly', () => {
    const content = `
    <callout
      data-icon="${escape(JSON.stringify({ type: 'IMAGE', viewUrl: 'viewUrl', key: 'key' }))}"
    ></callout>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[Callout]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setCallout correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Callout]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.setCallout()

    expect(editor?.state.doc.nodeAt(position)?.type.name).toBe(Callout.name)
  })

  it('triggers toggleCallout correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Callout]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.toggleCallout()

    expect(editor?.state.doc.nodeAt(position)?.type.name).toBe(Callout.name)
  })

  it('triggers unsetCallout correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Callout]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.toggleCallout()

    expect(editor?.state.doc.nodeAt(position)?.type.name).toBe(Callout.name)

    editor?.commands.unsetCallout()

    expect(editor?.state.doc.nodeAt(position)?.type.name).toBe(Paragraph.name)
  })
})
