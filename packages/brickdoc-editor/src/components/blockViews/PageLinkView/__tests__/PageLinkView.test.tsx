import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { PageLinkView } from '../PageLinkView'

describe('PageLinkView', () => {
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
    },
    extension: {
      options: {}
    }
  }

  it('matches correct snapshot', () => {
    const { container } = render(
      <Router>
        <PageLinkView {...props} />
      </Router>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders page link normally', () => {
    render(
      <Router>
        <PageLinkView {...props} />
      </Router>
    )
    expect(screen.getByText(props.node.attrs.page.title)).toBeInTheDocument()
  })
})
