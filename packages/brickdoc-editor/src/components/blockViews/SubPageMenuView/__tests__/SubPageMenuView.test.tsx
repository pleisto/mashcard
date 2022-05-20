import { SubPageMenuView } from '../SubPageMenuView'
import { render } from '@testing-library/react'
import { mockBlockViewProps } from '../../../../test'
import { SubPageMenuAttributes, SubPageMenuOptions } from '../../../../extensions'
import * as editorPropsHooks from '../../../../hooks/useEditorPropsContext'
import { EditorPropsContext } from '../../../../context'

describe('SubPageMenuView', () => {
  it('matches correct snapshot', () => {
    const props = mockBlockViewProps<SubPageMenuOptions, SubPageMenuAttributes>()
    const editorProps = { ...EditorPropsContext }
    editorProps.renderPageTree = () => <div>page tree</div>

    jest.spyOn(editorPropsHooks, 'useEditorPropsContext').mockImplementation(() => editorProps)

    const { container } = render(<SubPageMenuView {...props} />)
    expect(container).toMatchSnapshot()
  })
})
