import { FC, useContext } from 'react'
import { Check, Delete, More } from '@brickdoc/design-icons'
import { Button, css, Menu, Popover, styled, theme } from '@brickdoc/design-system'
import { Link, IconBackground } from '../Icon'
import { Comment } from './Comment'
import { EditorContext } from '../../context/EditorContext'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConversationProps {}

const ConversationCard = styled('div', {
  backgroundColor: theme.colors.ceramicPrimary,
  border: `1px solid ${theme.colors.borderSecondary}`,
  borderRadius: '4px',
  boxShadow: '0px 2px 4px rgba(44, 91, 255, 0.02), 0px 4px 4px rgba(0, 0, 0, 0.04)',
  marginBottom: '.5rem'
})

const ConversationHeader = styled('div', {
  alignItems: 'center',
  backgroundColor: theme.colors.backgroundOverlaySecondary,
  display: 'flex',
  flexDirection: 'row',
  padding: '.5rem .75rem'
})

const ContentQuote = styled('blockquote', {
  color: theme.colors.typeSecondary,
  flex: 1,
  fontFamily: 'inherit',
  fontSize: '.75rem',
  lineHeight: '1.125rem',
  margin: 0,
  paddingLeft: '.25rem',
  position: 'relative',
  '&:before': {
    backgroundColor: theme.colors.grey4,
    content: '',
    height: '.75rem',
    left: '-2px',
    position: 'absolute',
    transform: 'translateY(-50%)',
    top: '50%',
    width: '2px'
  }
})

const ActionButton = styled(Button, {
  variants: {
    size: {
      sm: {
        height: '1rem',
        padding: 0,
        width: '1rem',
        '&:hover, &:focus, &:active': {
          background: theme.colors.secondaryHover
        }
      }
    }
  }
})

const menuIconStyles = css({
  height: '1.3rem',
  width: '1.3rem'
})

export const Conversation: FC<ConversationProps> = props => {
  const { t } = useContext(EditorContext)
  const menu = (
    <Menu>
      <Menu.Item
        itemKey="copy"
        icon={<Link className={menuIconStyles()} square={true} />}
        label={t('action_panel.more.copy')}
      />
      <Menu.Item
        itemKey="delete"
        icon={
          <IconBackground className={menuIconStyles()}>
            <Delete />
          </IconBackground>
        }
        label={t('action_panel.more.delete')}
      />
    </Menu>
  )

  return (
    <ConversationCard>
      <ConversationHeader>
        <ContentQuote>long long long long long long long long long content</ContentQuote>
        <Popover
          compact={true}
          content={menu}
          placement="bottomEnd"
          trigger="click"
          // stick it to aside panel
          // avoid popover locate at wrong place when discussion list be scrolled
          getPopupContainer={() => document.getElementById('aside') ?? document.body}
        >
          <ActionButton type="text" size="sm" icon={<More />} />
        </Popover>
        <ActionButton type="text" size="sm" icon={<Check />} />
      </ConversationHeader>
      <Comment />
      <Comment />
    </ConversationCard>
  )
}
