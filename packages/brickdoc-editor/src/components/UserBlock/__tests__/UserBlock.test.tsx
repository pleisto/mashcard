import { render, screen } from '@testing-library/react'
import { UserBlock } from '../UserBlock'

describe('UserBlock', () => {
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
    const { container } = render(<UserBlock {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders user normally', () => {
    render(<UserBlock {...props} />)
    expect(screen.getByText(props.node.attrs.people.name)).toBeInTheDocument()
  })
})
