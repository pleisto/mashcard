import { render, act } from '@testing-library/react'
import { BlockContainer } from '../'
import { ExternalProps, ExternalPropsContext } from '../../../../context'

describe('BlockContainer', () => {
  it(`changes block pointer event when editor editable state change`, () => {
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const externalProps = new ExternalProps()
    const { container, rerender } = render(
      <ExternalPropsContext.Provider value={externalProps}>
        <BlockContainer />
      </ExternalPropsContext.Provider>
    )
    // expect dom has 'pointer-event: none' style
    expect(container.firstChild).toMatchSnapshot()

    act(() => {
      externalProps.documentEditable = true
    })

    rerender(
      <ExternalPropsContext.Provider value={externalProps}>
        <BlockContainer />
      </ExternalPropsContext.Provider>
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
        ]}>
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
