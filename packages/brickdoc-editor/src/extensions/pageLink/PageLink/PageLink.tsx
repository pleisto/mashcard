import React from 'react'
import { Link } from 'react-router-dom'
import { NodeViewProps } from '@tiptap/react'
import { Icon } from '@brickdoc/design-system'
import { BlockContainer } from '../../../components'
import { EditorContext } from '../../../context/EditorContext'
import './PageLink.less'

export interface PageLinkProps extends NodeViewProps {}

export const PageLink: React.FC<PageLinkProps> = ({ node }) => {
  const { t } = React.useContext(EditorContext)
  const attributes = node.attrs.page
  return (
    <BlockContainer inline={true}>
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
    </BlockContainer>
  )
}
