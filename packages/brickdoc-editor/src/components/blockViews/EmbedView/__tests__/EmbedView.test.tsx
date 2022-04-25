import { Embedtype } from '@brickdoc/schema'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { fireEvent, render, screen } from '@testing-library/react'
import { ExternalProps } from '../../../../context'
import { EmbedAttributes, EmbedOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../../../test'
import { EmbedView } from '../EmbedView'

const uuid = 'uuid'
const url = 'https://www.brickdoc.com'

jest.mock('../../../../hooks/useExternalProps.ts', () => {
  const uuid = 'uuid'
  const url = 'https://www.brickdoc.com'
  const externalProps = new ExternalProps()
  externalProps.rootId = uuid
  externalProps.fetchUnsplashImages = async (query: string) => {
    return await new Promise(resolve => {
      resolve({
        success: true,
        data: [
          {
            id: 'id1',
            username: 'user1',
            fullUrl: 'url1',
            smallUrl: 'url1',
            width: 1,
            height: 1
          },
          {
            id: 'id2',
            username: 'user2',
            fullUrl: 'url2',
            smallUrl: 'url2',
            width: 1,
            height: 1
          }
        ].filter(item => item.username === query)
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

  return {
    useExternalProps: () => externalProps
  }
})

Object.assign(window, {
  open: () => {}
})

describe('EmbedView', () => {
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
            cover: 'cover',
            mode: 'bookmark'
          },
          attachment: {
            type: 'ATTACHMENT'
          }
        }
      }
    })

    const { container } = render(<EmbedView {...props} />)
    expect(container).toMatchSnapshot()
  })

  it('renders image correctly', () => {
    const props = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        uuid,
        attrs: {
          image: {
            type: 'IMAGE',
            key: 'image',
            source: 'EXTERNAL'
          }
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByTestId(TEST_ID_ENUM.editor.imageBlock.image.id)).toBeInTheDocument()
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

    render(<EmbedView {...props} />)

    expect(screen.getByText('embed_block.embed_types.link.label')).toBeInTheDocument()
  })

  describe('Gallery', () => {
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

      render(<EmbedView {...props} />)

      expect(screen.getByText('embed_block.types.gallery.label')).toBeInTheDocument()
    })
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

    render(<EmbedView {...props} />)

    expect(screen.getByText('embed_block.types.upload.label')).toBeInTheDocument()
  })

  it('renders link', () => {
    const mockOpenUrl = jest.fn()
    jest.spyOn(window, 'open').mockImplementation(url => mockOpenUrl(url))
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

    render(<EmbedView {...props} />)

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()

    fireEvent.click(screen.getByText(title))
    expect(mockOpenUrl).toBeCalledWith(url)
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

    render(<EmbedView {...props} />)

    expect(screen.getByText(name)).toBeInTheDocument()
  })

  it('renders file preview', () => {
    const name = 'file.pdf'
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

    render(<EmbedView {...props} />)

    expect(screen.getByTestId(TEST_ID_ENUM.editor.embedBlock.pdftron.id)).toBeInTheDocument()
  })
})
