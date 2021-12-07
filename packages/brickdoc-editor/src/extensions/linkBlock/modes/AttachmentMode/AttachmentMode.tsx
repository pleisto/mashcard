import React from 'react'
import { ActionPanel } from '../../../../components/ActionPanel/ActionPanel'
import { useActionOptions } from '../useActionOptions'
import { useAttachmentMethods, UseAttachmentMethodsProps } from '../useAttachmentMethods'
import { FileIcon } from '../FileIcon/FileIcon'
import { FileType } from '../../../../helpers/file'

export interface AttachmentModeProps extends UseAttachmentMethodsProps {
  name: string
  fileType: FileType
}

export const AttachmentMode: React.FC<AttachmentModeProps> = ({ name, fileType, ...attachmentMethodsProps }) => {
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
    <ActionPanel options={actionOptions}>
      <div className="brickdoc-link-block-attachment">
        <FileIcon fileType={fileType} />
        <div className="link-block-attachment-content">
          <div className="link-block-attachment-name">{name}</div>
        </div>
      </div>
    </ActionPanel>
  )
}
