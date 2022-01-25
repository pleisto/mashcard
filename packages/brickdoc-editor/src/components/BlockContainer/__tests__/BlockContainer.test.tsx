import { render, act } from '@testing-library/react'
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

    act(() => {
      editorDataSource.documentEditable = true
    })

    rerender(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <BlockContainer />
      </EditorDataSourceContext.Provider>
    )

    // expect dom has 'pointer-event: unset' style
    expect(container.firstChild).toMatchSnapshot()
  })

  it('inline', () => {
    const { container } = render(<BlockContainer inline={true}>block</BlockContainer>)

    // expect dom has two pseudo span element at before and after
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
        ]}
      >
        block
      </BlockContainer>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('with editable = false', () => {
    const { container } = render(<BlockContainer editable={false}>block</BlockContainer>)

    expect(container.firstChild).toHaveStyle({
      'pointer-events': 'none'
    })
  })
})
