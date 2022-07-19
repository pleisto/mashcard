import { FC, MouseEvent, useCallback } from 'react'
import { useActionOptions } from '../useActionOptions'
import { FileIcon } from '../../../../ui'
import { FileType } from '../../../../../helpers/file'
import { BlockContainer } from '../../../BlockContainer'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'
import { EmbedToolbar } from '../EmbedToolbar'
import {
  TextViewLayout,
  EmbedToolbarContainer,
  EmbedToolbarContainerInner,
  TextViewContainer,
  TextViewContainerInner,
  TextViewIcon,
  TextViewContent,
  Name
} from './TextView.style'
import { useEditorContext } from '../../../../../hooks'

export interface TextViewProps {
  blockType: EmbedBlockType
  deleteNode: EmbedViewProps['deleteNode']
  getPos: EmbedViewProps['getPos']
  node: EmbedViewProps['node']
  extension: EmbedViewProps['extension']
  name: string
  displayName: string
  fileType: FileType
  url: string
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
}

export const TextView: FC<TextViewProps> = ({
  blockType,
  updateEmbedBlockAttributes,
  extension,
  deleteNode,
  getPos,
  node,
  name,
  displayName,
  fileType,
  url
}) => {
  const { documentEditable } = useEditorContext()
  const [actionOptions] = useActionOptions()
  const handleEmbedToolbarClick = useCallback((event: MouseEvent) => {
    event.stopPropagation()
  }, [])
  const handleClick = useCallback(() => {
    window.open(url, '_blank')
  }, [url])

  return (
    <BlockContainer
      node={node}
      contentForCopy={url}
      deleteNode={deleteNode}
      editable="custom"
      getPos={getPos}
      actionOptions={actionOptions}
    >
      <TextViewLayout>
        {documentEditable && (
          <EmbedToolbarContainer onClick={handleEmbedToolbarClick}>
            <EmbedToolbarContainerInner>
              <EmbedToolbar
                mode="text"
                displayName={displayName}
                extension={extension}
                url={url}
                blockType={blockType}
                updateEmbedBlockAttributes={updateEmbedBlockAttributes}
              />
            </EmbedToolbarContainerInner>
          </EmbedToolbarContainer>
        )}
        <TextViewContainer>
          <TextViewContainerInner onClick={handleClick}>
            <TextViewIcon>
              <FileIcon fileType={fileType} />
            </TextViewIcon>
            <TextViewContent>
              <Name>{name || url}</Name>
            </TextViewContent>
          </TextViewContainerInner>
        </TextViewContainer>
      </TextViewLayout>
    </BlockContainer>
  )
}
