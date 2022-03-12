import { SubPageMenuView } from '../SubPageMenuView'
import { render } from '@testing-library/react'
import { ExternalProps, ExternalPropsContext } from '../../../../context'

describe('SubPageMenuView', () => {
  it('matches correct snapshot', () => {
    const props: any = {}
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const externalProps = new ExternalProps()
    externalProps.renderPageTree = () => <div>page tree</div>

    const { container } = render(
      <ExternalPropsContext.Provider value={externalProps}>
        <SubPageMenuView {...props} />
      </ExternalPropsContext.Provider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
