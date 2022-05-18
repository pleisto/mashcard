import { FC, MouseEvent, useCallback } from 'react'
import { useActionOptions } from '../useActionOptions'
import { FileIcon } from '../../../../ui'
import { FileType } from '../../../../../helpers/file'
import { BlockContainer } from '../../../BlockContainer'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'
import { styled, theme } from '@brickdoc/design-system'
import { EmbedToolbar } from '../EmbedToolbar'
import { maxWidth } from '../../styled'

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

const EmbedToolbarContainer = styled('div', {
  left: '50%',
  opacity: 0,
  paddingBottom: '5px',
  position: 'absolute',
  top: 0,
  transform: 'translate(-50%, -100%)',
  transition: 'opacity 200ms ease-in-out',
  pointerEvents: 'none'
})

const EmbedToolbarContainerInner = styled('div', {
  background: theme.colors.backgroundPrimary,
  borderRadius: '4px'
})

const TextViewContainer = styled('div', {
  alignItems: 'center',
  display: 'inline-flex',
  flexDirection: 'row',
  maxWidth,
  position: 'relative',

  '&:hover': {
    [`& ${EmbedToolbarContainer}`]: {
      opacity: 1,
      pointerEvents: 'inherit'
    }
  }
})

const TextViewIcon = styled('span', {
  marginRight: '.4375rem',
  fontSize: '1.125rem',
  width: '1.125rem'
})

const TextViewContent = styled('div', {
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden'
})

const Name = styled('span', {
  fontSize: theme.fontSizes.body,
  fontWeight: 400,
  lineHeight: '1.5rem',
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  '&:hover': {
    textDecoration: 'underline',
    textDecorationColor: theme.colors.grey5
  }
})

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
      <TextViewContainer onClick={handleClick}>
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
        <TextViewIcon>
          <FileIcon fileType={fileType} />
        </TextViewIcon>
        <TextViewContent>
          <Name>{name || url}</Name>
        </TextViewContent>
      </TextViewContainer>
    </BlockContainer>
  )
}
