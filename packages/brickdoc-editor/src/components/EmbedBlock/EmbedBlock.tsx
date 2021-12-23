import * as React from 'react'
import { NodeViewProps } from '@tiptap/react'
import 'react-medium-image-zoom/dist/styles.css'
import './EmbedBlock.less'
import { linkStorage, getFileTypeByExtension, FileType } from '../../helpers/file'
import { AttachmentMode, PreviewMode, LinkMode, UploaderMode } from './modes'
import { getBlobUrl } from '../../helpers/getBlobUrl'
import { EditorDataSourceContext, WebsiteMeta } from '../../dataSource/DataSource'

export interface EmbedBlockAttributes {
  key: string
  source: string
  name?: string
  size?: number
  title?: WebsiteMeta['title']
  description?: WebsiteMeta['description']
  cover?: WebsiteMeta['cover']
  icon?: WebsiteMeta['icon']
  mode: 'link' | 'preview' | undefined
}

const canFilePreview = (fileType: FileType, mode: EmbedBlockAttributes['mode']): boolean =>
  mode !== 'link' && ['pdf', 'excel', 'word', 'ppt'].includes(fileType)

export const EmbedBlock: React.FC<NodeViewProps> = ({ editor, node, updateAttributes, deleteNode }) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const latestEmbedBlockAttributes = React.useRef<Partial<EmbedBlockAttributes>>({})
  const updateEmbedBlockAttributes = React.useCallback(
    (newAttributes: Partial<EmbedBlockAttributes>, type: 'link' | 'attachment'): void => {
      latestEmbedBlockAttributes.current = {
        ...latestEmbedBlockAttributes.current,
        ...newAttributes
      }

      updateAttributes({
        [type]: {
          __typename: type === 'link' ? 'BlockLink' : 'BlockAttachment',
          ...node.attrs[type],
          ...latestEmbedBlockAttributes.current
        }
      })
    },
    [node.attrs, updateAttributes]
  )

  const fileUrl =
    getBlobUrl(node.attrs?.uuid, node.attrs?.attachment ?? {}, editorDataSource.blobs) ??
    linkStorage.get(node.attrs?.uuid)
  const linkUrl = node.attrs.link?.key

  if (fileUrl) {
    const { name } = node.attrs.attachment
    const fileType = getFileTypeByExtension(name)

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

  if (linkUrl) {
    const { title, description, cover } = node.attrs.link

    return (
      <LinkMode
        editor={editor}
        title={title}
        cover={cover}
        description={description}
        linkUrl={linkUrl}
        deleteNode={deleteNode}
      />
    )
  }

  return (
    <UploaderMode
      editor={editor}
      deleteNode={deleteNode}
      node={node}
      updateEmbedBlockAttributes={updateEmbedBlockAttributes}
    />
  )
}
