import { render } from '@testing-library/react'
import { HorizontalRuleView } from '../HorizontalRuleView'

describe('HorizontalRuleView', () => {
  const uuid = 'uuid'
  const props: any = {
    editor: {},
    node: {
      attrs: {
        uuid
      }
    },
    extension: {},
    updateAttributes: () => {}
  }
  it(`matches snapshot correctly`, () => {
    const { container } = render(<HorizontalRuleView {...(props as any)} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
