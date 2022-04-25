import { FC, MouseEvent, useCallback } from 'react'
import { Button, styled, theme } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { BlockContainer } from '../../../BlockContainer'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { ModeSwitch } from '../ModeSwitch'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'

export interface WebBookmarkViewProps {
  deleteNode: EmbedViewProps['deleteNode']
  getPos: EmbedViewProps['getPos']
  node: EmbedViewProps['node']
  cover: string
  icon: string
  title: string
  description: string
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
  boxOrient: 'vertical',
  fontSize: theme.fontSizes.body,
  fontWeight: 600,
  lineClamp: 2,
  lineHeight: '1.5rem',
  marginBottom: '.375rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
  wordBreak: 'break-all',
  wordWrap: 'anywhere'
})

const Description = styled('div', {
  boxOrient: 'vertical',
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.callout,
  fontWeight: 450,
  lineClamp: 3,
  lineHeight: '1.25rem',
  marginBottom: '.25rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
  wordBreak: 'break-all',
  wordWrap: 'anywhere'
})

const Link = styled('div', {
  alignItems: 'center',
  color: theme.colors.typeThirdary,
  display: 'flex',
  flexDirection: 'row',
  fontSize: theme.fontSizes.callout,
  fontWeight: 450,
  lineClamp: 3,
  lineHeight: '1.125rem'
})

const LinkIcon = styled('img', {
  height: '.875rem',
  marginRight: '.25rem',
  width: '.875rem'
})

const WebBookmarkContainer = styled(Button, {
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

export const WebBookmarkView: FC<WebBookmarkViewProps> = ({
  linkUrl,
  cover,
  icon,
  title,
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

  return (
    <BlockContainer
      node={node}
      contentForCopy={linkUrl}
      deleteNode={deleteNode}
      getPos={getPos}
      actionOptions={['copy', 'delete']}
    >
      <WebBookmarkContainer
        data-testid={TEST_ID_ENUM.editor.embedBlock.link.id}
        size="md"
        onClick={() => window.open(linkUrl, '_blank')}
      >
        {cover && <Cover style={{ backgroundImage: `url("${cover}")` }} />}
        <Content>
          {title && <Title>{title}</Title>}
          {description && <Description>{description}</Description>}
          <Link>
            {icon && <LinkIcon alt="icon" src={icon} />}
            {linkUrl}
          </Link>
          <ModeSwitchContainer onClick={handleStopPropagation}>
            <ModeSwitch mode="bookmark" blockType={blockType} updateEmbedBlockAttributes={updateEmbedBlockAttributes} />
          </ModeSwitchContainer>
        </Content>
      </WebBookmarkContainer>
    </BlockContainer>
  )
}
