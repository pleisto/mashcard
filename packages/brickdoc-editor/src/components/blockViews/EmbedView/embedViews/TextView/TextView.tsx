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
} from './styles'

export interface TextViewProps {
  blockType: EmbedBlockType
  deleteNode: EmbedViewProps['deleteNode']
  getPos: EmbedViewProps['getPos']
  node: EmbedViewProps['node']
  name: string
  displayName: string
  fileType: FileType
  url: string
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
}

export const TextView: FC<TextViewProps> = ({
  blockType,
  updateEmbedBlockAttributes,
  deleteNode,
  getPos,
  node,
  name,
  displayName,
  fileType,
  url
}) => {
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
      getPos={getPos}
      actionOptions={actionOptions}>
      <TextViewLayout>
        <EmbedToolbarContainer onClick={handleEmbedToolbarClick}>
          <EmbedToolbarContainerInner>
            <EmbedToolbar
              mode="text"
              displayName={displayName}
              url={url}
              blockType={blockType}
              updateEmbedBlockAttributes={updateEmbedBlockAttributes}
            />
          </EmbedToolbarContainerInner>
        </EmbedToolbarContainer>
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
