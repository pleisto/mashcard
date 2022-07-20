import { render } from '@testing-library/react'
import { BlockSelector } from '../BlockSelector'
import { addItemKey } from '../recentItemsManager'

describe('BlockSelector', () => {
  it('renders BlockSelector correctly', () => {
    const { container } = render(<BlockSelector />)

    expect(container).toMatchSnapshot()
  })

  it('renders BlockSelector with query correctly', () => {
    const query = 'embed'
    const { container } = render(<BlockSelector query={query} />)

    expect(container).toMatchSnapshot()
  })

  it('renders BlockSelector with recent selected items correctly', () => {
    const key = 'embed'

    addItemKey(key)

    const { container } = render(<BlockSelector />)

    expect(container).toMatchSnapshot()
  })
})
