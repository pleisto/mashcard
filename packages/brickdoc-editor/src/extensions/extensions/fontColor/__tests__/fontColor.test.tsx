import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { FontColor } from '../fontColor'

describe('FontColor', () => {
  it('renders FontColor correctly', () => {
    const content = `
    <p>
      <span style="color:red;">red</span>
    </p>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[FontColor]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setFontColor correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: 'text',
        extensions: [FontColor]
      })
    )

    const editor = result.current

    editor?.commands.setTextSelection({ from: 0, to: 1 })
    editor?.commands.setFontColor('blue')

    expect(editor?.isActive('textStyle', { fontColor: 'blue' })).toBeTruthy()
  })

  it('triggers unsetFontColor correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: 'text',
        extensions: [FontColor]
      })
    )

    const editor = result.current

    editor?.commands.setTextSelection({ from: 0, to: 1 })

    editor?.commands.setFontColor('blue')
    expect(editor?.isActive('textStyle', { fontColor: 'blue' })).toBeTruthy()

    editor?.commands.unsetFontColor()
    expect(editor?.isActive('textStyle', { FontColor: 'blue' })).toBeFalsy()
  })
})
