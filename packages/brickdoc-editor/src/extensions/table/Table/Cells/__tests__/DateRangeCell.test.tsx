import { DateRangeCell } from '../DateRangeCell'
import { render, screen } from '@testing-library/react'

// See more tests in e2e test
describe('DateRangeCell', () => {
  const props: any = {
    value: new Date('2021-09-15'),
    resetActiveStatus: () => {},
    updateActiveStatus: () => {},
    cell: {
      row: {
        index: 0,
        original: {
          id: 'id'
        }
      },
      column: {
        id: 'columnId'
      }
    }
  }
  it('matches correct snapshot', () => {
    const { container } = render(<DateRangeCell {...props} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly', () => {
    render(<DateRangeCell {...props} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
