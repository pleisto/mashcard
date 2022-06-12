import { escape } from '@brickdoc/active-support'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { Spreadsheet } from '../spreadsheet'

describe('Spreadsheet', () => {
  it('renders Spreadsheet correctly', () => {
    const content = `
    <spreadsheet-block
      data-spreadsheet="${escape(JSON.stringify({ columns: [], rowCount: 0 }))}"
    ></spreadsheet-block>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[Spreadsheet]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setSpreadsheetBlock correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Spreadsheet]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.setSpreadsheetBlock(position)

    expect(editor?.state.doc.nodeAt(position)?.type.name).toBe(Spreadsheet.name)
  })

  it('can set default title by order', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Spreadsheet]
      })
    )

    const editor = result.current

    editor?.commands.setSpreadsheetBlock(0)
    expect(editor?.state.doc.nodeAt(0)?.attrs.title.slice(-1)).toEqual('1')
    expect(editor?.state.doc.nodeAt(0)?.attrs.isDefaultTitle).toEqual(true)

    editor?.commands.setSpreadsheetBlock(1)
    expect(editor?.state.doc.nodeAt(1)?.attrs.title.slice(-1)).toEqual('2')
    expect(editor?.state.doc.nodeAt(1)?.attrs.isDefaultTitle).toEqual(true)
  })
})
