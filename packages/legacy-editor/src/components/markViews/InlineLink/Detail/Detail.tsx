import { Edit, FilePages } from '@mashcard/design-icons'
import { FC, useCallback, useState } from 'react'
import { LinkAttributes, Link as LinkMark, LinkPage, LinkOptions } from '../../../../extensions'
import { useEditorContext } from '../../../../hooks'
import { InlineLinkEditMode as EditMode, InlineLinkEditModeProps } from '../EditMode'
import { DetailPopover, DetailContainer, EditIconWrapper, Link, Row, PageTitle, Page, PageIcon } from './Detail.style'

export interface InlineLinkDetailProps extends InlineLinkEditModeProps {
  type: LinkAttributes['type']
  pageId: LinkAttributes['pageId'] | null
  defaultEdit?: boolean
}

function usePage(pageId: string | null | undefined): LinkPage | undefined {
  const { editor } = useEditorContext()
  const extension = editor?.extensionManager.extensions.find(
    extension => extension.name === LinkMark.name
  ) as typeof LinkMark

  if (!extension) return undefined

  return (extension.options.pages ?? []).find(page => page.id === pageId)
}

function useNavigate(): LinkOptions['onNavigate'] {
  const { editor } = useEditorContext()
  const extension = editor?.extensionManager.extensions.find(
    extension => extension.name === LinkMark.name
  ) as typeof LinkMark

  return extension?.options.onNavigate
}

export const InlineLinkDetail: FC<InlineLinkDetailProps> = ({ defaultEdit, ...props }) => {
  const [editing, setEditing] = useState(defaultEdit)
  const handleEditClick = useCallback(() => setEditing(true), [])
  const handleLinkChange = useCallback<InlineLinkEditModeProps['onLinkChange']>(
    (type, linkOrPageId) => {
      props.onLinkChange(type, linkOrPageId)
      setEditing(false)
    },
    [props]
  )

  const page = usePage(props.pageId)
  const navigate = useNavigate()

  return (
    <DetailPopover>
      <DetailContainer>
        {editing ? (
          <EditMode {...props} onLinkChange={handleLinkChange} />
        ) : (
          <Row>
            {props.type === 'link' && (
              <Link target="_blank" href={props.link}>
                {props.link}
              </Link>
            )}
            {props.type === 'page' && (
              <Page onClick={() => navigate?.(page?.href ?? '/')}>
                <PageIcon>{(page?.icon ?? '') || <FilePages />}</PageIcon>
                <PageTitle>{page?.title}</PageTitle>
              </Page>
            )}
            <EditIconWrapper onClick={handleEditClick}>
              <Edit />
            </EditIconWrapper>
          </Row>
        )}
      </DetailContainer>
    </DetailPopover>
  )
}
