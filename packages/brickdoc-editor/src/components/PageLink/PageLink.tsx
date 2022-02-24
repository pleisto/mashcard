import React from 'react'
import { Link } from 'react-router-dom'
import { NodeViewProps } from '@tiptap/react'
import { isEmpty } from '@brickdoc/active-support'
import { Icon } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { EditorContext } from '../../context/EditorContext'
import './PageLink.less'

export interface PageLinkProps extends NodeViewProps {}

export interface PageLinkRenderProps {
  attributes?: {
    page?: {
      title?: string
      icon?: string
    }
  }
}

export const PageLinkRender: React.FC<PageLinkRenderProps> = ({ attributes }) => {
  const { t } = React.useContext(EditorContext)
  const { icon, title } = attributes?.page ?? {}

  return (
    <span>
      {!!icon && (
        <span role="img" className="brickdoc-page-link-block-icon" aria-label="">
          {icon}
          <Icon.ArrowShortcut className="brickdoc-page-link-block-shortcut-arrow" />
        </span>
      )}
      {!icon && (
        <span className="brickdoc-page-link-block-icon">
          <Icon.FilePages className="brickdoc-page-link-block-default-icon" />
          <Icon.ArrowShortcut className="brickdoc-page-link-block-shortcut-arrow" />
        </span>
      )}
      <span className="brickdoc-page-link-block-name">{isEmpty(title) ? t('page_link_block.untitled') : title}</span>
    </span>
  )
}

export const PageLink: React.FC<PageLinkProps> = ({ node }) => {
  return (
    <BlockContainer inline={true}>
      <Link className="text" to={node.attrs?.page?.link ?? '/'}>
        <PageLinkRender attributes={node.attrs} />
      </Link>
    </BlockContainer>
  )
}
