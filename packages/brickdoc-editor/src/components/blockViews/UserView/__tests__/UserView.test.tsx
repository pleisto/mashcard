import { render, screen } from '@testing-library/react'
import { UserAttributes, UserOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../../common/tests'
import { UserView } from '../UserView'

describe('UserView', () => {
  const name = 'name'
  const props = mockBlockViewProps<UserOptions, UserAttributes>({
    node: {
      attrs: {
        people: {
          type: 'PEOPLE',
          name,
          domain: 'domain',
          avatarUrl: 'avatarUrl'
        }
      }
    }
  })

  it('matches correct snapshot', () => {
    const { container } = render(<UserView {...props} />)
    expect(container).toMatchSnapshot()
  })

  it('renders user normally', () => {
    render(<UserView {...props} />)
    expect(screen.getByText(name)).toBeInTheDocument()
  })
})
