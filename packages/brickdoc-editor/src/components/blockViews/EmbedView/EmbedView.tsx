import { FC, ReactElement, useCallback, useRef } from 'react'
import { EmbedType } from '@brickdoc/schema'
import { TextView, PreviewView, CardView } from './embedViews'
import { getFileTypeByExtension, getFileTypeByContentType, sizeFormat } from '../../../helpers'
import { GalleryTypeEmbedBlock, LinkTypeEmbedBlock, UploadTypeEmbedBlock } from './embedTypes'
import { ImageView } from './embedViews/ImageView'
import { EmbedAttributes, EmbedViewProps } from '../../../extensions/blocks/embed/meta'
import { FileIcon } from '../../ui'

export type EmbedBlockType = 'link' | 'attachment' | 'image'

export type UpdateEmbedBlockAttributes = <T extends 'link' | 'image' | 'attachment'>(
  attrs: Partial<EmbedAttributes[T]>,
  type: T
) => void

const renderImage = (
  imageUrl: string,
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes,
  { node, deleteNode, getPos, extension }: EmbedViewProps
): ReactElement => {
  const { name, displayName, height, width, align, size, mode } = node.attrs.image

  if (node.attrs.image.mode === 'preview') {
    return (
      <ImageView
        displayName={displayName! || name! || ''}
        url={imageUrl}
        height={height}
        width={width}
        align={align}
        deleteNode={deleteNode}
        getPos={getPos}
        node={node}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    )
  }

  if (mode === 'card') {
    return (
      <CardView
        blockType="image"
        displayName={displayName! || name! || ''}
        description={sizeFormat(size)}
        cover={imageUrl}
        icon={<FileIcon fileType="image" />}
        linkUrl={imageUrl}
        node={node}
        deleteNode={deleteNode}
        getPos={getPos}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    )
  }

  return (
    <TextView
      blockType="image"
      name={name ?? ''}
      displayName={displayName! || name! || ''}
      fileType="image"
      url={imageUrl}
      deleteNode={deleteNode}
      extension={extension}
      node={node}
      getPos={getPos}
      updateEmbedBlockAttributes={updateEmbedBlockAttributes}
    />
  )
}

const renderAttachment = (
  fileUrl: string,
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes,
  { node, deleteNode, extension, getPos }: EmbedViewProps
): ReactElement => {
  const { name, displayName, contentType, size, mode } = node.attrs.attachment
  let fileType = getFileTypeByContentType(contentType ?? '')
  fileType = fileType === 'unknown' ? getFileTypeByExtension(name) : fileType

  if (node.attrs.attachment?.mode === 'preview') {
    return (
      <PreviewView
        blockType="attachment"
        displayName={displayName! || name! || ''}
        fileName={name ?? ''}
        fileType={fileType}
        fileUrl={fileUrl}
        deleteNode={deleteNode}
        getPos={getPos}
        node={node}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    )
  }

  if (mode === 'card') {
    return (
      <CardView
        blockType="attachment"
        displayName={displayName! || name! || ''}
        description={sizeFormat(size)}
        icon={<FileIcon fileType={fileType} />}
        linkUrl={fileUrl}
        node={node}
        deleteNode={deleteNode}
        getPos={getPos}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    )
  }

  return (
    <TextView
      blockType="attachment"
      name={name ?? ''}
      displayName={displayName! || name! || ''}
      fileType={fileType}
      url={fileUrl}
      deleteNode={deleteNode}
      node={node}
      extension={extension}
      getPos={getPos}
      updateEmbedBlockAttributes={updateEmbedBlockAttributes}
    />
  )
}

// eslint-disable-next-line complexity
export const EmbedView: FC<EmbedViewProps> = props => {
  const { node, updateAttributes, deleteNode, getPos, extension } = props
  const latestEmbedBlockAttributes = useRef<Partial<EmbedAttributes>>({})
  const updateEmbedBlockAttributes = useCallback<UpdateEmbedBlockAttributes>(
    (newAttributes, type): void => {
      latestEmbedBlockAttributes.current = {
        ...latestEmbedBlockAttributes.current,
        ...newAttributes
      }

      updateAttributes({
        attachment: {
          type: 'ATTACHMENT'
        },
        link: {
          type: 'LINK'
        },
        image: {
          type: 'IMAGE'
        },
        [type]: {
          ...node.attrs[type],
          ...latestEmbedBlockAttributes.current
        }
      })
    },
    [node.attrs, updateAttributes]
  )

  // image
  if (node.attrs.image?.key) {
    const imageUrl =
      extension.options.getFileUrl?.(node.attrs.image.key, node.attrs.image.source!) ?? node.attrs.image.viewUrl
    if (imageUrl) {
      return renderImage(imageUrl, updateEmbedBlockAttributes, props)
    }
  }

  // file
  if (node.attrs.attachment?.key) {
    const fileUrl =
      node.attrs.attachment.viewUrl! ||
      extension.options.getFileUrl?.(node.attrs.attachment.key, node.attrs.attachment.source!)
    if (fileUrl) {
      return renderAttachment(fileUrl, updateEmbedBlockAttributes, props)
    }
  }

  // link
  const linkUrl = node.attrs.link?.key
  if (linkUrl) {
    const { title, displayName, description, cover, icon, mode } = node.attrs.link

    if (mode === 'card') {
      return (
        <CardView
          blockType="link"
          updateEmbedBlockAttributes={updateEmbedBlockAttributes}
          node={node}
          deleteNode={deleteNode}
          cover={cover}
          description={description}
          getPos={getPos}
          displayName={displayName! || title! || ''}
          linkUrl={linkUrl}
        />
      )
    }

    if (mode === 'preview') {
      return (
        <PreviewView
          blockType="link"
          updateEmbedBlockAttributes={updateEmbedBlockAttributes}
          node={node}
          fileUrl={linkUrl}
          fileType="html"
          fileName={title ?? ''}
          displayName={displayName! || title! || ''}
          icon={icon}
          getPos={getPos}
          deleteNode={deleteNode}
        />
      )
    }

    return (
      <TextView
        blockType="link"
        name={title ?? ''}
        displayName={displayName! || title! || ''}
        fileType="html"
        url={linkUrl}
        node={node}
        extension={extension}
        deleteNode={deleteNode}
        getPos={getPos}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    )
  }

  // link embed
  if (node.attrs.embedMeta?.embedType === EmbedType.Link) {
    return (
      <LinkTypeEmbedBlock
        node={node}
        deleteNode={deleteNode}
        getPos={getPos}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
        extension={extension}
      />
    )
  }

  // gallery embed
  if (node.attrs.embedMeta?.embedType === EmbedType.Gallery) {
    return (
      <GalleryTypeEmbedBlock
        node={node}
        deleteNode={deleteNode}
        getPos={getPos}
        extension={extension}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    )
  }

  // upload embed
  return (
    <UploadTypeEmbedBlock
      deleteNode={deleteNode}
      getPos={getPos}
      extension={extension}
      node={node}
      updateEmbedBlockAttributes={updateEmbedBlockAttributes}
    />
  )
}
