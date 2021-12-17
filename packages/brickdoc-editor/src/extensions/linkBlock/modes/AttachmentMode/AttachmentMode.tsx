import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { useActionOptions } from '../useActionOptions'
import { useAttachmentMethods, UseAttachmentMethodsProps } from '../useAttachmentMethods'
import { FileIcon } from '../FileIcon/FileIcon'
import { FileType } from '../../../../helpers/file'
import { BlockContainer } from '../../../../components'

export interface AttachmentModeProps extends UseAttachmentMethodsProps {
  editor: NodeViewProps['editor']
  name: string
  fileType: FileType
}

export const AttachmentMode: React.FC<AttachmentModeProps> = ({
  editor,
  name,
  fileType,
  ...attachmentMethodsProps
}) => {
  const [{ onCopy, onDelete, onDownload, onToPreviewMode, onToLinkMode }] = useAttachmentMethods(attachmentMethodsProps)
  const [actionOptions] = useActionOptions({
    mode: 'link',
    onCopy,
    onDelete,
    onDownload,
    onToPreviewMode,
    onToLinkMode
  })

  return (
    <BlockContainer editor={editor} options={actionOptions}>
      <div className="brickdoc-link-block-attachment">
        <FileIcon fileType={fileType} />
        <div className="link-block-attachment-content">
          <div className="link-block-attachment-name">{name}</div>
        </div>
      </div>
    </BlockContainer>
  )
}
