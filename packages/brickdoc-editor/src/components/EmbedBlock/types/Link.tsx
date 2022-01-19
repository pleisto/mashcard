import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { Icon, Input, Popover, styled, theme } from '@brickdoc/design-system'
import { EmbedBlockPlaceholder } from '../Placeholder'
import { BlockContainer } from '../../../components'
import { EditorContext } from '../../../context/EditorContext'
import { EditorDataSourceContext } from '../../../dataSource/DataSource'
import { prependHttp } from '../../../helpers'
import { EmbedBlockAttributes } from '../EmbedBlock'

export interface LinkTypeEmbedBlockProps {
  deleteNode: NodeViewProps['deleteNode']
  node: NodeViewProps['node']
  getPos: NodeViewProps['getPos']
  updateEmbedBlockAttributes: (attrs: EmbedBlockAttributes, type: 'link' | 'image' | 'attachment') => void
}

const LinkInput = styled(Input, {
  width: '20rem'
})

const InputPanel = styled('div', {
  include: ['ceramicPrimary'],
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  padding: '.625rem 1rem 1rem',
  [`${LinkInput} + ${LinkInput}`]: {
    marginTop: '.5rem'
  }
})

const InputPanelHead = styled('span', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 600,
  lineHeight: '1.375rem',
  marginBottom: '.875rem'
})

export const LinkTypeEmbedBlock: React.FC<LinkTypeEmbedBlockProps> = ({
  node,
  deleteNode,
  getPos,
  updateEmbedBlockAttributes
}) => {
  const { t } = React.useContext(EditorContext)
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const [url, setUrl] = React.useState('')
  const [displayName, setDisplayName] = React.useState('')

  const handleSubmit = React.useCallback(async (): Promise<void> => {
    if (!url) return

    const { success, data } = await editorDataSource.fetchWebsiteMeta(prependHttp(url))

    if (!success) return

    if (data.type === 'website') {
      updateEmbedBlockAttributes(
        {
          key: data.url,
          source: 'EXTERNAL',
          title: displayName || data.title,
          description: data.description,
          cover: data.cover
        },
        'link'
      )
    } else if (data.type === 'image') {
      updateEmbedBlockAttributes({ key: data.url, source: 'EXTERNAL' }, 'image')
    } else {
      updateEmbedBlockAttributes(
        {
          key: data.url,
          source: 'EXTERNAL',
          contentType: data.type,
          name: displayName || url,
          size: data.size ? Number(data.size) : undefined
        },
        'attachment'
      )
    }
  }, [displayName, editorDataSource, updateEmbedBlockAttributes, url])

  const handleLinkChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(event => {
    setUrl(event.target.value)
  }, [])

  const handleDisplayNameChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(event => {
    setDisplayName(event.target.value)
  }, [])

  return (
    <BlockContainer getPos={getPos} actionOptions={['delete']} deleteNode={deleteNode}>
      <Popover
        defaultVisible={node.attrs.isNew}
        trigger="click"
        content={
          <InputPanel>
            <InputPanelHead>{t('embed_block.types.link.panel.head')}</InputPanelHead>
            <LinkInput
              prefix={<Icon.Paragraph />}
              placeholder={t('embed_block.types.link.panel.text.placeholder')}
              value={displayName}
              onChange={handleDisplayNameChange}
            />
            <LinkInput
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
              prefix={<Icon.Link />}
              placeholder={t('embed_block.types.link.panel.link.placeholder')}
              onPressEnter={handleSubmit}
              data-testid={TEST_ID_ENUM.editor.embedBlock.link.input.id}
              value={url}
              onChange={handleLinkChange}
            />
          </InputPanel>
        }
        placement="bottom">
        <EmbedBlockPlaceholder
          data-testid={TEST_ID_ENUM.editor.embedBlock.addButton.id}
          icon={<Icon.Link />}
          label={t('embed_block.types.link.label')}
          description={t('embed_block.types.link.description')}
        />
      </Popover>
    </BlockContainer>
  )
}
