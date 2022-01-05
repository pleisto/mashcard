import { SubPageMenuBlock } from '../SubPageMenuBlock'
import { render } from '@testing-library/react'
import { EditorDataSource, EditorDataSourceContext } from '../../..'

describe('SubPageMenuBlock', () => {
  it('matches correct snapshot', () => {
    const props: any = {}
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const editorDataSource = new EditorDataSource()
    editorDataSource.renderPageTree = () => <div>page tree</div>

    const { container } = render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <SubPageMenuBlock {...props} />
      </EditorDataSourceContext.Provider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
