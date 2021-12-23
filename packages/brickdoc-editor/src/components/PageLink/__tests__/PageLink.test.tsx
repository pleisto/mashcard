import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { PageLink } from '../PageLink'

describe('PageLink', () => {
  const props: any = {
    editor: {},
    node: {
      attrs: {
        page: {
          link: '/link',
          icon: 'icon',
          title: 'title'
        }
      }
    }
  }

  it('matches correct snapshot', () => {
    const { container } = render(
      <Router>
        <PageLink {...props} />
      </Router>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders page link normally', () => {
    render(
      <Router>
        <PageLink {...props} />
      </Router>
    )
    expect(screen.getByText(props.node.attrs.page.title)).toBeInTheDocument()
  })
})
