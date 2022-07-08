import { EmbedType } from '@mashcard/schema'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { fireEvent, render, screen } from '@testing-library/react'
import { EmbedAttributes, EmbedOptions } from '../../../../extensions'
import * as editorHooks from '../../../../hooks/useEditorContext'
import { mockBlockViewProps, mockEditor } from '../../../../test'
import { EmbedView } from '../EmbedView'

jest.mock('../../../../hooks/useEditorContext')

Object.assign(window, {
  open: () => {}
})

describe('EmbedView', () => {
  const uuid = 'uuid'
  const url = 'https://mashcard.cloud'
  const fetchUnsplashImages: NonNullable<EmbedOptions['getGalleryImages']> = async ({ query }) => {
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
            height: 1,
            blurHash: 'L9A^j]IAtRD%_3WBx]Rj00tRMxxu'
          },
          {
            id: 'id2',
            username: 'user2',
            fullUrl: 'url2',
            smallUrl: 'url2',
            width: 1,
            height: 1,
            blurHash: 'L9A^j]IAtRD%_3WBx]Rj00tRMxxu'
          }
        ].filter(item => item.username === query)
      })
    })
  }
  const prepareFileUpload = (() => {}) as any

  it('matches correct snapshot', () => {
    jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
      editor: mockEditor(),
      documentEditable: true
    }))

    const props = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        uuid,
        attrs: {
          link: {
            type: 'LINK',
            key: url,
            title: 'mashcard',
            description: 'desc',
            cover: 'cover',
            mode: 'card'
          },
          attachment: {
            type: 'ATTACHMENT'
          }
        }
      },
      extension: {
        options: {
          getGalleryImages: fetchUnsplashImages,
          prepareFileUpload
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
            viewUrl: 'viewUrl',
            source: 'EXTERNAL',
            mode: 'preview'
          }
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByTestId(TEST_ID_ENUM.editor.imageBlock.image.id)).toBeInTheDocument()
  })

  it('renders image in card view correctly', () => {
    const name = 'name'
    const props = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        uuid,
        attrs: {
          image: {
            type: 'IMAGE',
            key: 'image',
            viewUrl: 'viewUrl',
            source: 'EXTERNAL',
            name,
            mode: 'card'
          }
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByText(name)).toBeInTheDocument()
  })

  it('renders image in text view correctly', () => {
    const name = 'name'
    const props = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        uuid,
        attrs: {
          image: {
            type: 'IMAGE',
            key: 'image',
            viewUrl: 'viewUrl',
            source: 'EXTERNAL',
            name,
            mode: 'text'
          }
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByText(name)).toBeInTheDocument()
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
            embedType: EmbedType.Link
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
              embedType: EmbedType.Gallery
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
            embedType: EmbedType.Upload
          }
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByText('embed_block.embed_types.upload.label')).toBeInTheDocument()
  })

  it('renders link', () => {
    const mockOpenUrl = jest.fn()
    jest.spyOn(window, 'open').mockImplementation(url => mockOpenUrl(url))
    const title = 'mashcard'
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
            cover: 'cover',
            mode: 'card'
          },
          attachment: {
            type: 'ATTACHMENT'
          }
        }
      },
      extension: {
        options: {
          prepareFileUpload
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()

    fireEvent.click(screen.getByText(title))
    expect(mockOpenUrl).toBeCalledWith(url)
  })

  it('renders link in text mode', () => {
    const title = 'mashcard'
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
            cover: 'cover',
            mode: 'text'
          },
          attachment: {
            type: 'ATTACHMENT'
          }
        }
      },
      extension: {
        options: {
          prepareFileUpload
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('renders link in preview mode', () => {
    const title = 'mashcard'
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
            cover: 'cover',
            mode: 'preview'
          },
          attachment: {
            type: 'ATTACHMENT'
          }
        }
      },
      extension: {
        options: {
          prepareFileUpload
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByText(url)).toBeInTheDocument()
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
            viewUrl: 'viewUrl',
            source: 'ORIGIN',
            name
          }
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByText(name)).toBeInTheDocument()
  })

  it('renders file in preview mode', () => {
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
            viewUrl: 'viewUrl',
            source: 'ORIGIN',
            name,
            mode: 'preview'
          }
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByTestId(TEST_ID_ENUM.editor.embedBlock.pdftron.id)).toBeInTheDocument()
  })

  it('renders file in card mode', () => {
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
            viewUrl: 'viewUrl',
            source: 'ORIGIN',
            name,
            mode: 'card'
          }
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByText(name)).toBeInTheDocument()
  })

  it('renders file in text mode', () => {
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
            viewUrl: 'viewUrl',
            source: 'ORIGIN',
            name,
            mode: 'text'
          }
        }
      }
    })

    render(<EmbedView {...props} />)

    expect(screen.getByText(name)).toBeInTheDocument()
  })
})
