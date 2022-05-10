import { FC, ReactElement, useCallback, useRef } from 'react'
import { Embedtype } from '@brickdoc/schema'
import { TextView, PreviewView, CardView } from './embedViews'
import { linkStorage, getFileTypeByExtension, getBlobUrl, getFileTypeByContentType } from '../../../helpers'
import { GalleryTypeEmbedBlock, LinkTypeEmbedBlock, UploadTypeEmbedBlock } from './embedTypes'
import { ImageView } from '../ImageView'
import './EmbedBlock.less'
import { EmbedAttributes, EmbedViewProps } from '../../../extensions/blocks/embed/meta'
import { useExternalProps } from '../../../hooks/useExternalProps'
import { FileIcon } from '../../ui'

export type EmbedBlockType = 'link' | 'attachment' | 'image'

export type UpdateEmbedBlockAttributes = <T extends 'link' | 'image' | 'attachment'>(
  attrs: Partial<EmbedAttributes[T]>,
  type: T
) => void

const renderAttachment = (
  fileUrl: string,
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes,
  { node, deleteNode, getPos }: EmbedViewProps
): ReactElement => {
  const { name, displayName, contentType, mode } = node.attrs.attachment
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
      getPos={getPos}
      updateEmbedBlockAttributes={updateEmbedBlockAttributes}
    />
  )
}

// eslint-disable-next-line complexity
export const EmbedView: FC<EmbedViewProps> = props => {
  const { node, updateAttributes, deleteNode, getPos } = props
  const externalProps = useExternalProps()
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

  const defaultUrl = linkStorage.get(node.attrs.uuid)

  // image
  if (node.attrs.image?.key) {
    const imageUrl = getBlobUrl(externalProps.rootId, node.attrs?.image ?? {}, externalProps.blobs) ?? defaultUrl
    if (imageUrl) {
      return <ImageView {...props} />
    }
  }

  // file
  if (node.attrs.attachment?.key) {
    const fileUrl = getBlobUrl(externalProps.rootId, node.attrs?.attachment ?? {}, externalProps.blobs) ?? defaultUrl
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
        deleteNode={deleteNode}
        getPos={getPos}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
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
