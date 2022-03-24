import { Embedtype } from '@brickdoc/schema'
import { render, screen } from '@testing-library/react'
import { ExternalProps, ExternalPropsContext } from '../../../../context'
import { EmbedAttributes, EmbedOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../common/tests'
import { EmbedView } from '../EmbedView'

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
    const props = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        uuid,
        attrs: {
          link: {
            type: 'LINK',
            key: url,
            title: 'brickdoc',
            description: 'desc',
            cover: 'cover'
          },
          attachment: {
            type: 'ATTACHMENT'
          }
        }
      }
    })

    const { container } = render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders link placeholder correctly', () => {
    const props = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        uuid,
        attrs: {
          link: {
            type: 'LINK'
          },
          attachment: {
            type: 'ATTACHMENT'
          },
          embedMeta: {
            type: 'EmbedMeta',
            embedType: Embedtype.Link
          }
        }
      }
    })

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByText('embed_block.types.link.label')).toBeInTheDocument()
  })

  it('renders gallery placeholder correctly', () => {
    const props = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        uuid,
        attrs: {
          link: {
            type: 'LINK'
          },
          attachment: {
            type: 'ATTACHMENT'
          },
          embedMeta: {
            type: 'EmbedMeta',
            embedType: Embedtype.Gallery
          }
        }
      }
    })

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByText('embed_block.types.gallery.label')).toBeInTheDocument()
  })

  it('renders uploader placeholder correctly', () => {
    const props = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        uuid,
        attrs: {
          link: {
            type: 'LINK'
          },
          attachment: {
            type: 'ATTACHMENT'
          },
          embedMeta: {
            type: 'EmbedMeta',
            embedType: Embedtype.Upload
          }
        }
      }
    })

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByText('embed_block.types.upload.label')).toBeInTheDocument()
  })

  it('renders link', () => {
    const title = 'brickdoc'
    const description = 'desc'
    const props = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        uuid,
        attrs: {
          link: {
            type: 'LINK',
            key: url,
            title,
            description,
            cover: 'cover'
          },
          attachment: {
            type: 'ATTACHMENT'
          }
        }
      },
      extension: {
        options: {
          prepareFileUpload: () => {},
          getAttachmentUrl: () => ''
        }
      }
    })

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('renders attachment file', () => {
    const name = 'file.ext'
    const props = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        uuid,
        attrs: {
          link: {
            type: 'LINK'
          },
          attachment: {
            type: 'ATTACHMENT',
            key: url,
            source: 'ORIGIN',
            name
          }
        }
      }
    })

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <EmbedView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByText(name)).toBeInTheDocument()
  })
})
