import { DateCell } from '../DateCell'
import { render, screen } from '@testing-library/react'

// See more tests in e2e test
describe('DateCell', () => {
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
    const { container } = render(<DateCell {...props} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly', () => {
    render(<DateCell {...props} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
