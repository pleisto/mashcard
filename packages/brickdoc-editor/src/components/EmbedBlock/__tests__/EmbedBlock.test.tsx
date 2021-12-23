import { render, screen, fireEvent } from '@testing-library/react'
import { EditorDataSource, EditorDataSourceContext } from '../../../dataSource/DataSource'
import { EmbedBlock } from '../EmbedBlock'

// See more specs in e2e test
describe('EmbedBlock', () => {
  const url = 'https://www.brickdoc.com'
  const editorDataSource = new EditorDataSource()
  const uuid = 'uuid'
  editorDataSource.prepareFileUpload = (() => {}) as any
  editorDataSource.blobs = {
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
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <EmbedBlock {...props} />
      </EditorDataSourceContext.Provider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders pending panel when no url', () => {
    const props: any = {
      editor: {},
      node: { uuid, attrs: { link: {}, attachment: {} } },
      extension: {
        options: {}
      },
      updateAttributes: () => {}
    }

    render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <EmbedBlock {...props} />
      </EditorDataSourceContext.Provider>
    )

    expect(screen.getByText('embed_block.hint')).toBeInTheDocument()
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
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <EmbedBlock {...props} />
      </EditorDataSourceContext.Provider>
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
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <EmbedBlock {...props} />
      </EditorDataSourceContext.Provider>
    )

    expect(screen.getByText(props.node.attrs.attachment.name)).toBeInTheDocument()
  })

  it('renders uploader dashboard when click add button', () => {
    const props: any = {
      editor: {},
      node: { attrs: { uuid, link: {}, attachment: {} } },
      extension: {
        options: {
          prepareFileUpload: () => {},
          getAttachmentUrl: () => ''
        }
      },
      updateAttributes: () => {}
    }

    render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <EmbedBlock {...props} />
      </EditorDataSourceContext.Provider>
    )

    fireEvent.click(screen.getByText('embed_block.hint'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
