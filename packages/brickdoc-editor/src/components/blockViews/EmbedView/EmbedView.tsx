import { FC, useCallback, useRef } from 'react'
import { Embedtype, Preview_Box } from '@brickdoc/schema'
import { AttachmentMode, PreviewMode, WebBookmarkMode } from './modes'
import { linkStorage, getFileTypeByExtension, FileType, getBlobUrl, getFileTypeByContentType } from '../../../helpers'
import { GalleryTypeEmbedBlock, LinkTypeEmbedBlock, UploadTypeEmbedBlock } from './types'
import { ImageView } from '../ImageView'
import './EmbedBlock.less'
import { EmbedViewProps } from '../../../extensions/blocks/embed/meta'
import { useExternalProps } from '../../../hooks/useExternalProps'

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

export const EmbedView: FC<EmbedViewProps> = props => {
  const { node, updateAttributes, deleteNode, getPos } = props
  const externalProps = useExternalProps()
  const latestEmbedBlockAttributes = useRef<Partial<EmbedBlockAttributes>>({})
  const updateEmbedBlockAttributes = useCallback(
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
    const imageUrl = getBlobUrl(externalProps.rootId, node.attrs?.image ?? {}, externalProps.blobs) ?? defaultUrl
    if (imageUrl) {
      return <ImageView {...props} />
    }
  }

  // file mode
  if (node.attrs.attachment?.key) {
    const fileUrl = getBlobUrl(externalProps.rootId, node.attrs?.attachment ?? {}, externalProps.blobs) ?? defaultUrl
    if (fileUrl) {
      const { name, contentType } = node.attrs.attachment
      let fileType = getFileTypeByContentType(contentType ?? '')
      fileType = fileType === 'unknown' ? getFileTypeByExtension(name) : fileType

      const updateAttachmentAttributes = (attrs: Record<string, any>): void =>
        updateEmbedBlockAttributes(attrs, 'attachment')

      if (canFilePreview(fileType, node.attrs.attachment?.mode)) {
        return (
          <PreviewMode
            fileName={name!}
            fileType={fileType}
            fileUrl={fileUrl}
            deleteNode={deleteNode}
            getPos={getPos}
            node={node}
            updateAttachmentAttributes={updateAttachmentAttributes}
          />
        )
      }

      return (
        <AttachmentMode
          name={name!}
          fileType={fileType}
          fileUrl={fileUrl}
          deleteNode={deleteNode}
          node={node}
          getPos={getPos}
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
        title={title!}
        cover={cover!}
        description={description!}
        linkUrl={linkUrl}
        node={node}
        deleteNode={deleteNode}
        getPos={getPos}
      />
    )
  }

  // link embed
  if (node.attrs.embedMeta?.embedType === Embedtype.Link) {
    return (
      <LinkTypeEmbedBlock
        node={node}
        deleteNode={deleteNode}
        getPos={getPos}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    )
  }

  // gallery embed
  if (node.attrs.embedMeta?.embedType === Embedtype.Gallery) {
    return (
      <GalleryTypeEmbedBlock
        node={node}
        deleteNode={deleteNode}
        getPos={getPos}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    )
  }

  // upload embed
  return (
    <UploadTypeEmbedBlock
      deleteNode={deleteNode}
      getPos={getPos}
      node={node}
      updateEmbedBlockAttributes={updateEmbedBlockAttributes}
    />
  )
}
