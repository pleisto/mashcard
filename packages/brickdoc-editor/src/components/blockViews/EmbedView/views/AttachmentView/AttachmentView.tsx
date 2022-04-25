import { FC } from 'react'
import { NodeViewProps } from '@tiptap/react'
import { useActionOptions } from '../useActionOptions'
import { useAttachmentMethods, UseAttachmentMethodsProps } from '../useAttachmentMethods'
import { FileIcon } from '../../../../ui'
import { FileType } from '../../../../../helpers/file'
import { BlockContainer } from '../../../BlockContainer'

export interface AttachmentViewProps extends UseAttachmentMethodsProps {
  deleteNode: NodeViewProps['deleteNode']
  getPos: NodeViewProps['getPos']
  node: NodeViewProps['node']
  name: string
  fileType: FileType
}

export const AttachmentView: FC<AttachmentViewProps> = ({
  deleteNode,
  getPos,
  node,
  name,
  fileType,
  ...attachmentMethodsProps
}) => {
  const [{ onDownload }] = useAttachmentMethods(attachmentMethodsProps)
  const [actionOptions] = useActionOptions({
    mode: 'link',
    onDownload
  })

  return (
    <BlockContainer
      node={node}
      contentForCopy={attachmentMethodsProps.fileUrl}
      deleteNode={deleteNode}
      getPos={getPos}
      actionOptions={actionOptions}
    >
      <div className="brickdoc-link-block-attachment">
        <FileIcon fileType={fileType} />
        <div className="link-block-attachment-content">
          <div className="link-block-attachment-name">{name}</div>
        </div>
      </div>
    </BlockContainer>
  )
}
