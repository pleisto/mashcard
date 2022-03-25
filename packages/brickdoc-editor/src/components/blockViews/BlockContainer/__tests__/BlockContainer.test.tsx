import { render, act } from '@testing-library/react'
import { BlockContainer } from '../'
import { ExternalProps, ExternalPropsContext } from '../../../../context'

describe('BlockContainer', () => {
  it(`changes block pointer event when editor editable state change`, () => {
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const externalProps = new ExternalProps()
    const node: any = { attrs: { uuid: 1 } }
    const { container, rerender } = render(
      <ExternalPropsContext.Provider value={externalProps}>
        <BlockContainer node={node} />
      </ExternalPropsContext.Provider>
    )
    // expect dom has 'pointer-event: none' style
    expect(container).toMatchSnapshot()

    act(() => {
      externalProps.documentEditable = true
    })

    rerender(
      <ExternalPropsContext.Provider value={externalProps}>
        <BlockContainer node={node} />
      </ExternalPropsContext.Provider>
    )

    // expect dom has 'pointer-event: unset' style
    expect(container).toMatchSnapshot()
  })

  it('inline', () => {
    const node: any = { attrs: { uuid: 1 } }
    const { container } = render(
      <BlockContainer node={node} inline={true}>
        block
      </BlockContainer>
    )

    // expect dom has two pseudo span element at before and after
    expect(container).toMatchSnapshot()
  })

  // TODO: move to e2e test
  it('with actionOptions', () => {
    const node: any = { attrs: { uuid: 1 } }
    const { container } = render(
      <BlockContainer
        node={node}
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

    expect(container).toMatchSnapshot()
  })

  it('with editable = false', () => {
    const node: any = { attrs: { uuid: 1 } }
    const { container } = render(
      <BlockContainer node={node} editable={false}>
        block
      </BlockContainer>
    )

    expect(container.firstChild).toHaveStyle({
      'pointer-events': 'none'
    })
  })

  // TODO: move to e2e test
  it('hide action options when node without uuid', () => {
    const node: any = { attrs: {} }
    const { container } = render(
      <BlockContainer node={node} editable={false}>
        block
      </BlockContainer>
    )

    expect(container).toMatchSnapshot()
  })
})
