import { Icon } from '@brickdoc/design-system'
import { Link } from 'react-router-dom'
import { NodeViewRendererProps } from '@tiptap/core'
import React from 'react'
import { useEditorI18n } from '../../..'
import { BlockWrapper } from '../../BlockWrapper'
import './PageLink.less'

export interface PageLinkProps extends NodeViewRendererProps {}

export const PageLink: React.FC<PageLinkProps> = ({ editor, node }) => {
  const [t] = useEditorI18n()
  const attributes = node.attrs.page
  return (
    <BlockWrapper as="span" editor={editor}>
      <Link className="text" to={attributes.link ?? '/'}>
        {!!attributes.icon && (
          <span role="img" className="brickdoc-page-link-block-icon" aria-label="">
            {attributes.icon}
            <Icon.ArrowShortcut className="brickdoc-page-link-block-shortcut-arrow" />
          </span>
        )}
        {!attributes.icon && (
          <span className="brickdoc-page-link-block-icon">
            <Icon.FilePages className="brickdoc-page-link-block-default-icon" />
            <Icon.ArrowShortcut className="brickdoc-page-link-block-shortcut-arrow" />
          </span>
        )}
        <span className="brickdoc-page-link-block-name">{attributes.title || t('page_link_block.untitled')}</span>
      </Link>
    </BlockWrapper>
  )
}
