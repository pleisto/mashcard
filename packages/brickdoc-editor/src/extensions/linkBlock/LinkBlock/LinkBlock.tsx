import * as React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { BlockWrapper } from '../../../components'
import 'react-medium-image-zoom/dist/styles.css'
import './LinkBlock.less'
import { linkStorage, getFileTypeByExtension, FileType } from '../../../helpers/file'
import { PreviewMode } from '../modes/PreviewMode/PreviewMode'
import { AttachmentMode } from '../modes/AttachmentMode/AttachmentMode'
import { LinkMode } from '../modes/LinkMode/LinkMode'
import { UploaderMode } from '../modes/UploaderMode/UploaderMode'
import { getBlobUrl } from '../../../helpers/getBlobUrl'
import { EditorDataSourceContext, WebsiteMeta } from '../../../dataSource/DataSource'

export interface LinkBlockAttributes {
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

const canFilePreview = (fileType: FileType, mode: LinkBlockAttributes['mode']): boolean =>
  mode !== 'link' && ['pdf', 'excel', 'word', 'ppt'].includes(fileType)

export const LinkBlock: React.FC<NodeViewProps> = ({ editor, node, updateAttributes, deleteNode }) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const latestLinkBlockAttributes = React.useRef<Partial<LinkBlockAttributes>>({})
  const updateLinkBlockAttributes = (
    newAttributes: Partial<LinkBlockAttributes>,
    type: 'link' | 'attachment'
  ): void => {
    latestLinkBlockAttributes.current = {
      ...latestLinkBlockAttributes.current,
      ...newAttributes
    }

    updateAttributes({
      [type]: {
        __typename: type === 'link' ? 'BlockLink' : 'BlockAttachment',
        ...node.attrs[type],
        ...latestLinkBlockAttributes.current
      }
    })
  }

  const fileUrl =
    getBlobUrl(node.attrs?.uuid, node.attrs?.attachment ?? {}, editorDataSource.blobs) ??
    linkStorage.get(node.attrs?.uuid)
  const linkUrl = node.attrs.link?.key

  if (fileUrl) {
    const { name } = node.attrs.attachment
    const fileType = getFileTypeByExtension(name)

    const updateAttachmentAttributes = (attrs: Record<string, any>): void =>
      updateLinkBlockAttributes(attrs, 'attachment')

    if (canFilePreview(fileType, node.attrs.attachment?.mode)) {
      return (
        <BlockWrapper editor={editor}>
          <PreviewMode
            fileName={name}
            fileType={fileType}
            fileUrl={fileUrl}
            deleteNode={deleteNode}
            updateAttachmentAttributes={updateAttachmentAttributes}
          />
        </BlockWrapper>
      )
    }

    return (
      <BlockWrapper editor={editor}>
        <AttachmentMode
          name={name}
          fileType={fileType}
          fileUrl={fileUrl}
          deleteNode={deleteNode}
          updateAttachmentAttributes={updateAttachmentAttributes}
        />
      </BlockWrapper>
    )
  }

  if (linkUrl) {
    const { title, description, cover } = node.attrs.link

    return (
      <BlockWrapper editor={editor}>
        <LinkMode title={title} cover={cover} description={description} linkUrl={linkUrl} deleteNode={deleteNode} />
      </BlockWrapper>
    )
  }

  return (
    <BlockWrapper editor={editor}>
      <UploaderMode node={node} updateLinkBlockAttributes={updateLinkBlockAttributes} />
    </BlockWrapper>
  )
}
