import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { LinkBlock } from '../LinkBlock'

// See more specs in e2e test
describe('LinkBlock', () => {
  const url = 'https://www.brickdoc.com'

  it('matches correct snapshot', () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          link: {
            key: url,
            source: 'EXTERNAL',
            title: 'brickdoc',
            description: 'desc',
            cover: 'cover'
          },
          attachment: {}
        }
      },
      extension: {
        options: {
          prepareFileUpload: () => {},
          getAttachmentUrl: () => ''
        }
      },
      updateAttributes: () => {}
    }

    const { container } = render(<LinkBlock {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders pending panel when no url', () => {
    const props: any = {
      editor: {},
      node: { attrs: { link: {}, attachment: {} } },
      extension: {
        options: {
          prepareFileUpload: () => {},
          getAttachmentUrl: () => ''
        }
      },
      updateAttributes: () => {}
    }

    render(<LinkBlock {...props} />)

    expect(screen.getByText('Embed anything')).toBeInTheDocument()
  })

  it('renders link', () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          link: {
            key: url,
            source: 'EXTERNAL',
            title: 'brickdoc',
            description: 'desc',
            cover: 'cover'
          },
          attachment: {}
        }
      },
      extension: {
        options: {
          prepareFileUpload: () => {},
          getAttachmentUrl: () => ''
        }
      },
      updateAttributes: () => {}
    }

    render(<LinkBlock {...props} />)

    expect(screen.getByText(props.node.attrs.link.title)).toBeInTheDocument()
    expect(screen.getByText(props.node.attrs.link.description)).toBeInTheDocument()
  })

  it('renders attachment file', () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          link: {},
          attachment: {
            key: url,
            source: 'ORIGIN',
            name: 'file.ext',
            size: 1000
          }
        }
      },
      extension: {
        options: {
          prepareFileUpload: () => {},
          getAttachmentUrl: () => 'url'
        }
      },
      updateAttributes: () => {}
    }

    render(<LinkBlock {...props} />)

    expect(screen.getByText(props.node.attrs.attachment.name)).toBeInTheDocument()
    expect(screen.getByText(`${props.node.attrs.attachment.size} b`)).toBeInTheDocument()
  })

  it('renders uploader dashboard when click add button', () => {
    const props: any = {
      editor: {},
      node: { attrs: { link: {}, attachment: {} } },
      extension: {
        options: {
          prepareFileUpload: () => {},
          getAttachmentUrl: () => ''
        }
      },
      updateAttributes: () => {}
    }

    render(<LinkBlock {...props} />)

    fireEvent.click(screen.getByText('Embed anything'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
