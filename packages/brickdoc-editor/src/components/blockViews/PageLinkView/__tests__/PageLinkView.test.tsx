import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { PageLinkView } from '../PageLinkView'
import { mockBlockViewProps } from '../../../common/tests'
import { PageLinkAttributes, PageLinkOptions } from '../../../../extensions'

describe('PageLinkView', () => {
  const title = 'title'
  const props = mockBlockViewProps<PageLinkOptions, PageLinkAttributes>({
    node: {
      attrs: {
        page: {
          type: 'PAGE',
          key: 'key',
          link: '/link',
          icon: 'icon',
          title
        }
      }
    }
  })

  it('matches correct snapshot', () => {
    const { container } = render(
      <Router>
        <PageLinkView {...props} />
      </Router>
    )
    expect(container).toMatchSnapshot()
  })

  it('renders page link normally', () => {
    render(
      <Router>
        <PageLinkView {...props} />
      </Router>
    )
    expect(screen.getByText(title)).toBeInTheDocument()
  })
})
