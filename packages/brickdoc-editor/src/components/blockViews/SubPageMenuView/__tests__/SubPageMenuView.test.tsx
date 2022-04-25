import { SubPageMenuView } from '../SubPageMenuView'
import { render } from '@testing-library/react'
import { ExternalProps, ExternalPropsContext } from '../../../../context'
import { mockBlockViewProps } from '../../../../test'
import { SubPageMenuAttributes, SubPageMenuOptions } from '../../../../extensions'

describe('SubPageMenuView', () => {
  it('matches correct snapshot', () => {
    const props = mockBlockViewProps<SubPageMenuOptions, SubPageMenuAttributes>()
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const externalProps = new ExternalProps()
    externalProps.renderPageTree = () => <div>page tree</div>

    const { container } = render(
      <ExternalPropsContext.Provider value={externalProps}>
        <SubPageMenuView {...props} />
      </ExternalPropsContext.Provider>
    )
    expect(container).toMatchSnapshot()
  })
})
