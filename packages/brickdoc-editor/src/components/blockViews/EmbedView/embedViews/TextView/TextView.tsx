import { FC, MouseEvent, useCallback } from 'react'
import { useActionOptions } from '../useActionOptions'
import { FileIcon } from '../../../../ui'
import { FileType } from '../../../../../helpers/file'
import { BlockContainer } from '../../../BlockContainer'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'
import { styled, theme } from '@brickdoc/design-system'
import { ModeSwitch } from '../ModeSwitch'

export interface TextViewProps {
  blockType: EmbedBlockType
  deleteNode: EmbedViewProps['deleteNode']
  getPos: EmbedViewProps['getPos']
  node: EmbedViewProps['node']
  name: string
  fileType: FileType
  url: string
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
}

const ModeSwitchContainer = styled('div', {
  left: '50%',
  opacity: 0,
  paddingBottom: '5px',
  position: 'absolute',
  top: 0,
  transform: 'translate(-50%, -100%)',
  transition: 'opacity 200ms ease-in-out',
  pointerEvents: 'none'
})

const ModeSwitchContainerInner = styled('div', {
  background: theme.colors.backgroundPrimary,
  borderRadius: '4px'
})

const TextViewContainer = styled('div', {
  alignItems: 'center',
  display: 'inline-flex',
  flexDirection: 'row',
  position: 'relative',

  '&:hover': {
    [`& ${ModeSwitchContainer}`]: {
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
  flexDirection: 'row'
})

const Name = styled('span', {
  fontSize: theme.fontSizes.body,
  fontWeight: 400,
  lineHeight: '1.5rem',

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
  fileType,
  url
}) => {
  const [actionOptions] = useActionOptions()
  const handleModeSwitchClick = useCallback((event: MouseEvent) => {
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
      actionOptions={actionOptions}
    >
      <TextViewContainer onClick={handleClick}>
        <ModeSwitchContainer onClick={handleModeSwitchClick}>
          <ModeSwitchContainerInner>
            <ModeSwitch mode="text" blockType={blockType} updateEmbedBlockAttributes={updateEmbedBlockAttributes} />
          </ModeSwitchContainerInner>
        </ModeSwitchContainer>
        <TextViewIcon>
          <FileIcon fileType={fileType} />
        </TextViewIcon>
        <TextViewContent>
          <Name>{name}</Name>
        </TextViewContent>
      </TextViewContainer>
    </BlockContainer>
  )
}
