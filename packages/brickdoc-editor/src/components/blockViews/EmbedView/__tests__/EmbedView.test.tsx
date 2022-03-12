import { render, screen } from '@testing-library/react'
import { ExternalProps, ExternalPropsContext } from '../../../../context'
import { EmbedView } from '../EmbedView'

// See more specs in e2e test
describe('EmbedView', () => {
  const url = 'https://www.brickdoc.com'
  const externalProps = new ExternalProps()
  const uuid = 'uuid'
  externalProps.rootId = uuid
  externalProps.fetchUnsplashImages = async () => {
    return await new Promise(resolve => {
      resolve({
        success: false,
        data: []
      })
    })
  }
  externalProps.prepareFileUpload = (() => {}) as any
  externalProps.blobs = {
    [uuid]: [
      {
        key: url,
        url
      }
    ]
  }

  it('matches correct snapshot', () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          uuid,
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
        options: {}
      },
      updateAttributes: () => {}
    }

    const { container } = render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders link placeholder correctly', () => {
    const props: any = {
      editor: {},
      node: { uuid, attrs: { link: {}, attachment: {}, embedMeta: { embedType: 'LINK' } } },
      extension: {
        options: {}
      },
      updateAttributes: () => {}
    }

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByText('embed_block.types.link.label')).toBeInTheDocument()
  })

  it('renders gallery placeholder correctly', () => {
    const props: any = {
      editor: {},
      node: { uuid, attrs: { link: {}, attachment: {}, embedMeta: { embedType: 'GALLERY' } } },
      extension: {
        options: {}
      },
      updateAttributes: () => {}
    }

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByText('embed_block.types.gallery.label')).toBeInTheDocument()
  })

  it('renders uploader placeholder correctly', () => {
    const props: any = {
      editor: {},
      node: { uuid, attrs: { link: {}, attachment: {}, embedMeta: { embedType: 'UPLOAD' } } },
      extension: {
        options: {}
      },
      updateAttributes: () => {}
    }

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByText('embed_block.types.upload.label')).toBeInTheDocument()
  })

  it('renders link', () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          uuid,
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

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByText(props.node.attrs.link.title)).toBeInTheDocument()
    expect(screen.getByText(props.node.attrs.link.description)).toBeInTheDocument()
  })

  it('renders attachment file', () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          uuid,
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
        options: {}
      },
      updateAttributes: () => {}
    }

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByText(props.node.attrs.attachment.name)).toBeInTheDocument()
  })
})
