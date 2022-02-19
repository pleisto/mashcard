import { render, screen } from '@testing-library/react'
import { User } from '../User'

describe('User', () => {
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
    }
  }

  it('matches correct snapshot', () => {
    const { container } = render(<User {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders user normally', () => {
    render(<User {...props} />)
    expect(screen.getByText(props.node.attrs.people.name)).toBeInTheDocument()
  })
})
