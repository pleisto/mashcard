import * as React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Embedtype, Preview_Box } from '@brickdoc/schema'
import { AttachmentMode, PreviewMode, WebBookmarkMode } from './modes'
import { linkStorage, getFileTypeByExtension, FileType, getBlobUrl, getFileTypeByContentType } from '../../helpers'
import { EditorDataSourceContext } from '../../dataSource/DataSource'
import { GalleryTypeEmbedBlock, LinkTypeEmbedBlock, UploadTypeEmbedBlock } from './types'
import { ImageBlock } from '../ImageBlock'
import './EmbedBlock.less'

export interface EmbedBlockAttributes {
  key: string
  source: string
  name?: string
  size?: number
  title?: Preview_Box['title']
  description?: Preview_Box['description']
  cover?: Preview_Box['cover']
  mode?: 'link' | 'preview' | undefined
  contentType?: string | null
}

const canFilePreview = (fileType: FileType, mode: EmbedBlockAttributes['mode']): boolean =>
  mode !== 'link' && ['pdf', 'excel', 'word', 'ppt'].includes(fileType)

export const EmbedBlock: React.FC<NodeViewProps> = props => {
  const { editor, node, updateAttributes, deleteNode } = props
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const latestEmbedBlockAttributes = React.useRef<Partial<EmbedBlockAttributes>>({})
  const updateEmbedBlockAttributes = React.useCallback(
    (newAttributes: Partial<EmbedBlockAttributes>, type: 'link' | 'image' | 'attachment'): void => {
      latestEmbedBlockAttributes.current = {
        ...latestEmbedBlockAttributes.current,
        ...newAttributes
      }

      updateAttributes({
        [type]: {
          ...node.attrs[type],
          ...latestEmbedBlockAttributes.current
        }
      })
    },
    [node.attrs, updateAttributes]
  )

  const defaultUrl = linkStorage.get(node.attrs.uuid)

  // image mode
  if (node.attrs.image?.key) {
    const imageUrl = getBlobUrl(node.attrs?.uuid, node.attrs?.image ?? {}, editorDataSource.blobs) ?? defaultUrl
    if (imageUrl) {
      return <ImageBlock {...props} />
    }
  }

  // file mode
  if (node.attrs.attachment?.key) {
    const fileUrl = getBlobUrl(node.attrs?.uuid, node.attrs?.attachment ?? {}, editorDataSource.blobs) ?? defaultUrl
    if (fileUrl) {
      const { name, contentType } = node.attrs.attachment
      let fileType = getFileTypeByContentType(contentType ?? '')
      fileType = fileType === 'unknown' ? getFileTypeByExtension(name) : fileType

      const updateAttachmentAttributes = (attrs: Record<string, any>): void =>
        updateEmbedBlockAttributes(attrs, 'attachment')

      if (canFilePreview(fileType, node.attrs.attachment?.mode)) {
        return (
          <PreviewMode
            fileName={name}
            fileType={fileType}
            fileUrl={fileUrl}
            deleteNode={deleteNode}
            updateAttachmentAttributes={updateAttachmentAttributes}
          />
        )
      }

      return (
        <AttachmentMode
          name={name}
          fileType={fileType}
          fileUrl={fileUrl}
          deleteNode={deleteNode}
          updateAttachmentAttributes={updateAttachmentAttributes}
        />
      )
    }
  }

  // web bookmark mode
  const linkUrl = node.attrs.link?.key
  if (linkUrl) {
    const { title, description, cover } = node.attrs.link

    return (
      <WebBookmarkMode
        editor={editor}
        title={title}
        cover={cover}
        description={description}
        linkUrl={linkUrl}
        deleteNode={deleteNode}
      />
    )
  }

  // link embed
  if (node.attrs.embedMeta?.embedType === Embedtype.Link) {
    return (
      <LinkTypeEmbedBlock node={node} deleteNode={deleteNode} updateEmbedBlockAttributes={updateEmbedBlockAttributes} />
    )
  }

  // gallery embed
  if (node.attrs.embedMeta?.embedType === Embedtype.Gallery) {
    return (
      <GalleryTypeEmbedBlock
        node={node}
        deleteNode={deleteNode}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    )
  }

  // upload embed
  return (
    <UploadTypeEmbedBlock deleteNode={deleteNode} node={node} updateEmbedBlockAttributes={updateEmbedBlockAttributes} />
  )
}
