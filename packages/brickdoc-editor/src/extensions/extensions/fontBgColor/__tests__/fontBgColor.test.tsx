import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { FontBgColor } from '../fontBgColor'

describe('FontBgColor', () => {
  it('renders FontBgColor correctly', () => {
    const content = `
    <p>
      <span style="background-color:red;">red</span>
    </p>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[FontBgColor]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setFontBgColor correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: 'text',
        extensions: [FontBgColor]
      })
    )

    const editor = result.current

    editor?.commands.setTextSelection({ from: 0, to: 1 })
    editor?.commands.setFontBgColor('blue')

    expect(editor?.isActive('textStyle', { fontBgColor: 'blue' })).toBeTruthy()
  })

  it('triggers unsetFontBgColor correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: 'text',
        extensions: [FontBgColor]
      })
    )

    const editor = result.current

    editor?.commands.setTextSelection({ from: 0, to: 1 })

    editor?.commands.setFontBgColor('blue')
    expect(editor?.isActive('textStyle', { fontBgColor: 'blue' })).toBeTruthy()

    editor?.commands.unsetFontBgColor()
    expect(editor?.isActive('textStyle', { FontBgColor: 'blue' })).toBeFalsy()
  })
})
