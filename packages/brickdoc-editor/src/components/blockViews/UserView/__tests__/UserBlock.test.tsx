import { render, screen } from '@testing-library/react'
import { UserView } from '../UserView'

describe('UserView', () => {
  const props: any = {
    editor: {},
    node: {
      attrs: {
        people: {
          name: 'name',
          domain: 'domain',
          avatarUrl: 'avatarUrl'
        }
      }
    },
    extension: {
      options: {}
    }
  }

  it('matches correct snapshot', () => {
    const { container } = render(<UserView {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders user normally', () => {
    render(<UserView {...props} />)
    expect(screen.getByText(props.node.attrs.people.name)).toBeInTheDocument()
  })
})
