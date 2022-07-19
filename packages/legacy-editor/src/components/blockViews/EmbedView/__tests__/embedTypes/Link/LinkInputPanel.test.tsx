import { render } from '@testing-library/react'
import { LinkInputPanel } from '../../../embedTypes'

describe('LinkInputPanel', () => {
  it('renders LinkInputPanel correctly', () => {
    const onSubmit = (): void => {}
    const onLinkChange = (): void => {}
    const onLinkClear = (): void => {}

    const { container } = render(
      <LinkInputPanel link="link" onSubmit={onSubmit} onLinkChange={onLinkChange} onLinkClear={onLinkClear} />
    )

    expect(container).toMatchSnapshot()
  })
})
