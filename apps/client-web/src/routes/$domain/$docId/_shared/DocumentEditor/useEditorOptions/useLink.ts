import { useReactiveVar } from '@apollo/client'
import { LinkOptions, LinkPage } from '@mashcard/legacy-editor'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { DocMeta } from '../../../../_shared/DocMeta'
import { pagesVar } from '../../../../_shared/reactiveVars'

function getParentPath(
  path: string[],
  page: { key: string; parentId?: string | null; title: string },
  pages: Array<{
    key: string
    parentId?: string | null
    title: string
  }>
): string[] {
  const parent = pages.find(item => item.key === page.parentId)
  if (!parent) return path

  return getParentPath([parent.title, ...path], parent, pages)
}

export function useLink(docMeta: DocMeta): LinkOptions {
  // TODO: migrate to zustand
  const documentPages = useReactiveVar(pagesVar)
  const navigate = useNavigate()

  const pages = useMemo<LinkPage[]>(
    () =>
      documentPages.map(item => ({
        id: item.key,
        icon: item.icon,
        href: `/${docMeta.domain}/${item.key}`,
        parentId: item.parentId,
        path: getParentPath([''], item, documentPages).join('/'),
        title: item.title
      })),
    [docMeta.domain, documentPages]
  )

  return useMemo(
    () => ({
      pages,
      onNavigate: navigate
    }),
    [navigate, pages]
  )
}
