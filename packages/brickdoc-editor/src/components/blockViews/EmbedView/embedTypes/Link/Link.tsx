import { ChangeEventHandler, FC } from 'react'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { Input, Popover, styled, theme } from '@brickdoc/design-system'
import { EmbedBlockPlaceholder } from '../../Placeholder'
import { BlockContainer } from '../../../BlockContainer'
import { usePopoverVisible } from '../usePopoverVisible'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { useLinkValue } from './useLinkValue'
import { useEditorI18n } from '../../../../../hooks'
import { CloseOneFill, Link } from '@brickdoc/design-icons'
import { UpdateEmbedBlockAttributes } from '../../EmbedView'

export interface LinkTypeEmbedBlockProps {
  deleteNode: EmbedViewProps['deleteNode']
  node: EmbedViewProps['node']
  getPos: EmbedViewProps['getPos']
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
}

const IconLink = styled(Link, {
  color: theme.colors.iconDisable,
  fontSize: '1rem'
})

const LinkInput = styled(Input, {
  width: '20rem',
  variants: {
    size: {
      md: {
        borderBottom: `1px solid ${theme.colors.dividerOverlayThirdary}`,
        borderRadius: 0,
        padding: '.4375rem 0',

        '> input': {
          fontWeight: 450,
          height: '1.375rem',
          lineHeight: '1.375rem',

          '&:placeholder': {
            color: theme.colors.typeThirdary
          }
        }
      }
    }
  }
})

const InputPanel = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem'
})

const InputPanelHead = styled('span', {
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 600,
  lineHeight: '.875rem',
  marginBottom: '.6875rem'
})

const InputClearIcon = styled(CloseOneFill, {
  color: theme.colors.iconDisable,
  cursor: 'pointer',
  fontSize: '.875rem'
})

export const LinkInputPanel: FC<{
  link: string
  onSubmit: () => void
  onLinkClear: () => void
  onLinkChange: ChangeEventHandler<HTMLInputElement>
}> = ({ link, onLinkChange, onSubmit, onLinkClear }) => {
  const [t] = useEditorI18n()
  return (
    <InputPanel>
      <InputPanelHead>{t('embed_block.embed_types.link.panel.head')}</InputPanelHead>
      <LinkInput
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={true}
        bordered={false}
        suffix={link && <InputClearIcon onClick={onLinkClear} />}
        prefix={<IconLink />}
        placeholder={t('embed_block.embed_types.link.panel.link.placeholder')}
        onPressEnter={onSubmit}
        data-testid={TEST_ID_ENUM.editor.embedBlock.link.input.id}
        value={link}
        size="md"
        onChange={onLinkChange}
      />
    </InputPanel>
  )
}

export const LinkTypeEmbedBlock: FC<LinkTypeEmbedBlockProps> = ({
  node,
  deleteNode,
  getPos,
  updateEmbedBlockAttributes
}) => {
  const [t] = useEditorI18n()
  const [popoverVisible, handlePopoverVisibleChange] = usePopoverVisible(node.attrs.uuid)
  const [link, handleLinkChange, handleLinkClear, handleSubmit, progress] = useLinkValue(updateEmbedBlockAttributes)

  return (
    <BlockContainer node={node} getPos={getPos} actionOptions={['delete']} deleteNode={deleteNode}>
      <Popover
        defaultVisible={popoverVisible}
        compact={true}
        visible={popoverVisible}
        onVisibleChange={handlePopoverVisibleChange}
        trigger="click"
        overlayInnerStyle={{
          marginTop: -30,
          marginLeft: 94
        }}
        content={
          <LinkInputPanel
            link={link}
            onLinkClear={handleLinkClear}
            onSubmit={handleSubmit}
            onLinkChange={handleLinkChange}
          />
        }
        placement="bottomStart"
      >
        <EmbedBlockPlaceholder
          data-testid={TEST_ID_ENUM.editor.embedBlock.addButton.id}
          icon={<Link />}
          label={t('embed_block.embed_types.link.label')}
          description={t('embed_block.embed_types.link.description')}
          progress={progress}
        />
      </Popover>
    </BlockContainer>
  )
}
