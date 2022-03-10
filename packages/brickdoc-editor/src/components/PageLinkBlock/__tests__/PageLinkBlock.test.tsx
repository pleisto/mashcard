import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { PageLinkBlock } from '../PageLinkBlock'

describe('PageLinkBlock', () => {
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
        <PageLinkBlock {...props} />
      </Router>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders page link normally', () => {
    render(
      <Router>
        <PageLinkBlock {...props} />
      </Router>
    )
    expect(screen.getByText(props.node.attrs.page.title)).toBeInTheDocument()
  })
})
