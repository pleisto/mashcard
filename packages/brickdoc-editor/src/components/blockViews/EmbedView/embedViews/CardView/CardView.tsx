import { FC, MouseEvent, ReactElement, useCallback } from 'react'
import { Button, styled, theme } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { BlockContainer } from '../../../BlockContainer'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { ModeSwitch } from '../ModeSwitch'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'
import { useActionOptions } from '../useActionOptions'
import { maxWidth } from '../../styled'

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

const ModeSwitchContainer = styled('div', {
  bottom: '.5rem',
  opacity: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: '.75rem',
  transition: 'opacity 100ms ease-in-out',

  [`& ${ModeSwitch}`]: {}
})

const Content = styled('div', {
  flex: 1,
  padding: '1rem',
  position: 'relative',

  '&:hover': {
    [`& ${ModeSwitchContainer}`]: {
      opacity: 1,
      pointerEvents: 'inherit'
    }
  }
})

const Cover = styled('div', {
  alignSelf: 'normal',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '14.25rem'
})

const Title = styled('div', {
  fontSize: theme.fontSizes.body,
  fontWeight: 600,
  lineHeight: '1.5rem',
  marginBottom: '.375rem',
  display: '-webkit-box',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  maxWidth: '100%',
  whiteSpace: 'normal',
  wordBreak: 'break-all'
})

const Description = styled('div', {
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.callout,
  fontWeight: 450,
  lineHeight: '1.25rem',
  marginBottom: '.25rem',
  display: '-webkit-box',
  '-webkit-line-clamp': 3,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  maxWidth: '100%',
  whiteSpace: 'normal',
  wordBreak: 'break-all'
})

const Link = styled('div', {
  alignItems: 'center',
  color: theme.colors.typeThirdary,
  display: 'flex',
  flexDirection: 'row',
  fontSize: theme.fontSizes.callout,
  fontWeight: 450,
  maxWidth: '100%'
})

const LinkText = styled('span', {
  display: '-webkit-box',
  '-webkit-line-clamp': 1,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  maxWidth: '80%',
  whiteSpace: 'normal',
  wordBreak: 'break-all'
})

const iconMarginRight = '.25rem'

const LinkIcon = styled('img', {
  height: '.875rem',
  marginRight: iconMarginRight,
  width: '.875rem'
})

const FileIconWrapper = styled('div', {
  include: ['flexCenter'],

  display: 'flex',
  fontSize: '.875rem',
  height: '.875rem',
  marginRight: iconMarginRight,
  width: '.875rem'
})

const CardContainer = styled(Button, {
  variants: {
    size: {
      md: {
        alignItems: 'center',
        background: theme.colors.backgroundPrimary,
        border: `1px solid ${theme.colors.borderPrimary}`,
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'row',
        height: 'auto',
        justifyContent: 'center',
        maxWidth,
        minHeight: '2.5rem',
        padding: '0',
        position: 'relative',
        textAlign: 'left',
        width: '100%',

        '&:hover': {
          background: theme.colors.backgroundPrimary
        }
      }
    }
  }
})

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
  const [actionOptions] = useActionOptions(isWebsite ? undefined : linkUrl)

  return (
    <BlockContainer
      node={node}
      contentForCopy={linkUrl}
      deleteNode={deleteNode}
      getPos={getPos}
      actionOptions={actionOptions}>
      <CardContainer
        data-testid={TEST_ID_ENUM.editor.embedBlock.link.id}
        size="md"
        onClick={() => window.open(linkUrl, '_blank')}>
        {cover && <Cover style={{ backgroundImage: `url("${cover}")` }} />}
        <Content>
          {displayName && <Title>{displayName}</Title>}
          {description && <Description>{description}</Description>}
          <Link>
            {icon &&
              (typeof icon === 'string' ? (
                <LinkIcon alt="icon" src={icon} />
              ) : (
                <FileIconWrapper>{icon}</FileIconWrapper>
              ))}
            <LinkText>{linkUrl}</LinkText>
          </Link>
          <ModeSwitchContainer onClick={handleStopPropagation}>
            <ModeSwitch
              mode="card"
              blockType={blockType}
              displayName={displayName}
              url={linkUrl}
              updateEmbedBlockAttributes={updateEmbedBlockAttributes}
            />
          </ModeSwitchContainer>
        </Content>
      </CardContainer>
    </BlockContainer>
  )
}
