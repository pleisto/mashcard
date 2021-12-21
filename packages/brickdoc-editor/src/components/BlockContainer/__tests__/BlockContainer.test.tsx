import { render } from '@testing-library/react'
import { BlockContainer } from '../'
import { EditorDataSourceContext, EditorDataSource } from '../../../dataSource/DataSource'

describe('BlockContainer', () => {
  it(`changes block pointer event when editor editable state change`, () => {
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const editorDataSource = new EditorDataSource()
    const { container, rerender } = render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <BlockContainer />
      </EditorDataSourceContext.Provider>
    )
    // expect dom has 'pointer-event: none' style
    expect(container.firstChild).toMatchSnapshot()

    editorDataSource.documentEditable = true

    rerender(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <BlockContainer />
      </EditorDataSourceContext.Provider>
    )

    // expect dom has 'pointer-event: unset' style
    expect(container.firstChild).toMatchSnapshot()
  })

  it('with actionOptions', () => {
    const { container } = render(
      <BlockContainer
        actionOptions={[
          {
            type: 'item',
            name: 'item'
          }
        ]}>
        block
      </BlockContainer>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
