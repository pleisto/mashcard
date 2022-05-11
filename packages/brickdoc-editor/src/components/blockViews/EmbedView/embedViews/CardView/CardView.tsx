import { FC, MouseEvent, ReactElement, useCallback } from 'react'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { BlockContainer } from '../../../BlockContainer'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { EmbedToolbar } from '../EmbedToolbar'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'
import { useActionOptions } from '../useActionOptions'
import {
  FileCoverWrapper,
  Cover,
  Link,
  LinkIcon,
  FileIconWrapper,
  CardContainer,
  Content,
  Title,
  Description,
  LinkText,
  EmbedToolbarContainer
} from './styled'

export interface CardViewProps {
  deleteNode: EmbedViewProps['deleteNode']
  getPos: EmbedViewProps['getPos']
  node: EmbedViewProps['node']
  cover?: string | null
  icon?: string | ReactElement
  displayName: string
  description?: string | null
  linkUrl: string
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
  blockType: EmbedBlockType
}

export const CardCover: FC<Pick<CardViewProps, 'cover' | 'icon' | 'blockType'>> = ({ blockType, cover, icon }) => {
  const isFile = blockType === 'attachment'

  if (isFile && icon) return <FileCoverWrapper>{icon}</FileCoverWrapper>

  if (cover) return <Cover style={{ backgroundImage: `url("${cover}")` }} />

  return null
}

export const CardIcon: FC<Pick<CardViewProps, 'blockType' | 'icon'>> = ({ blockType, icon }) => {
  const isFile = blockType === 'attachment'

  if (isFile || !icon) return null

  if (typeof icon === 'string') return <LinkIcon alt="icon" src={icon} />

  return <FileIconWrapper>{icon}</FileIconWrapper>
}

export const CardView: FC<CardViewProps> = ({
  linkUrl,
  cover,
  icon,
  displayName,
  description,
  blockType,
  node,
  getPos,
  deleteNode,
  updateEmbedBlockAttributes
}) => {
  const handleStopPropagation = useCallback((event: MouseEvent) => {
    event.stopPropagation()
  }, [])
  const isWebsite = blockType === 'link'
  const isFile = blockType === 'attachment'
  const type = isFile ? 'file' : 'default'
  const [actionOptions] = useActionOptions(isWebsite ? undefined : linkUrl)
  const onClick = useCallback(() => window.open(linkUrl, '_blank'), [linkUrl])

  return (
    <BlockContainer
      node={node}
      contentForCopy={linkUrl}
      deleteNode={deleteNode}
      getPos={getPos}
      actionOptions={actionOptions}>
      <CardContainer
        contentType={type}
        data-testid={TEST_ID_ENUM.editor.embedBlock.link.id}
        size="md"
        onClick={onClick}>
        <CardCover blockType={blockType} cover={cover} icon={icon} />
        <Content type={type}>
          {displayName && <Title type={type}>{displayName}</Title>}
          {description && <Description type={type}>{description}</Description>}
          {!isFile && (
            <Link>
              <CardIcon blockType={blockType} icon={icon} />
              <LinkText>{linkUrl}</LinkText>
            </Link>
          )}
          <EmbedToolbarContainer onClick={handleStopPropagation}>
            <EmbedToolbar
              mode="card"
              blockType={blockType}
              displayName={displayName}
              url={linkUrl}
              updateEmbedBlockAttributes={updateEmbedBlockAttributes}
            />
          </EmbedToolbarContainer>
        </Content>
      </CardContainer>
    </BlockContainer>
  )
}
