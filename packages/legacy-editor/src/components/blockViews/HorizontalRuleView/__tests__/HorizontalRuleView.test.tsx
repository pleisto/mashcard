import { render } from '@testing-library/react'
import { HorizontalRuleOptions, HorizontalRuleAttributes } from '../../../../extensions'
import { mockBlockViewProps } from '../../../../test'
import { HorizontalRuleView } from '../HorizontalRuleView'

describe('HorizontalRuleView', () => {
  it(`matches snapshot correctly`, () => {
    const props = mockBlockViewProps<HorizontalRuleOptions, HorizontalRuleAttributes>()
    const { container } = render(<HorizontalRuleView {...props} />)

    expect(container).toMatchSnapshot()
  })
})
