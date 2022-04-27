import { FC, ReactElement, useCallback, useRef } from 'react'
import { Embedtype } from '@brickdoc/schema'
import { AttachmentView, CardView, BookmarkView } from './views'
import { linkStorage, getFileTypeByExtension, FileType, getBlobUrl, getFileTypeByContentType } from '../../../helpers'
import { GalleryTypeEmbedBlock, LinkTypeEmbedBlock, UploadTypeEmbedBlock } from './embedTypes'
import { ImageView } from '../ImageView'
import './EmbedBlock.less'
import { EmbedAttributes, EmbedViewMode, EmbedViewProps } from '../../../extensions/blocks/embed/meta'
import { useExternalProps } from '../../../hooks/useExternalProps'
import { ModeSwitchProps } from './views/ModeSwitch'
import { FileIcon } from '../../ui'

const canFilePreview = (fileType: FileType, mode: EmbedAttributes['attachment']['mode']): boolean =>
  mode !== 'link' && mode !== 'bookmark' && ['pdf', 'excel', 'word', 'ppt'].includes(fileType)

const blockModeToViewMode = (mode: EmbedViewMode | undefined): ModeSwitchProps['mode'] | undefined => {
  if (mode === 'bookmark') return 'bookmark'
  if (mode === 'link') return 'text'
  if (mode === 'preview') return 'card'

  return undefined
}

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
  const { name, contentType, mode } = node.attrs.attachment
  let fileType = getFileTypeByContentType(contentType ?? '')
  fileType = fileType === 'unknown' ? getFileTypeByExtension(name) : fileType

  if (canFilePreview(fileType, node.attrs.attachment?.mode)) {
    return (
      <CardView
        blockType="attachment"
        fileName={name!}
        fileType={fileType}
        fileUrl={fileUrl}
        deleteNode={deleteNode}
        getPos={getPos}
        node={node}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    )
  }

  if (mode === 'bookmark') {
    return (
      <BookmarkView
        blockType="attachment"
        title={name ?? ''}
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
    <AttachmentView
      blockType="attachment"
      name={name!}
      fileType={fileType}
      fileUrl={fileUrl}
      deleteNode={deleteNode}
      node={node}
      getPos={getPos}
      updateEmbedBlockAttributes={updateEmbedBlockAttributes}
    />
  )
}

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
    const { title, description, cover, icon, mode } = node.attrs.link

    const viewMode = blockModeToViewMode(mode)

    if (viewMode === 'card') {
      return (
        <CardView
          blockType="link"
          updateEmbedBlockAttributes={updateEmbedBlockAttributes}
          node={node}
          fileUrl={linkUrl}
          fileType="html"
          fileName={title ?? ''}
          icon={icon}
          getPos={getPos}
          deleteNode={deleteNode}
        />
      )
    }

    return (
      <BookmarkView
        blockType="link"
        title={title ?? ''}
        cover={cover ?? ''}
        icon={icon ?? ''}
        description={description!}
        linkUrl={linkUrl}
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
