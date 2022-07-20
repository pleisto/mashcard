import { useGetPodMembersQuery } from '@/MashcardGraphQL'
import { pagesVar } from '@/docs_legacy/reactiveVars'
import { DocMeta } from '@/docs_legacy/store/DocMeta'
import { useReactiveVar } from '@apollo/client'
import { MentionCommandsOptions } from '@mashcard/legacy-editor'
import { useMemo } from 'react'

export function useMentionCommands(docMeta: DocMeta): MentionCommandsOptions {
  const { data } = useGetPodMembersQuery({})

  const users = useMemo(
    () =>
      data?.podMembers?.map(member => ({
        id: member.user.domain,
        name: member.user.name,
        avatar: member.user.avatarData?.url ?? ''
      })) ?? [],
    [data?.podMembers]
  )

  // TODO: migrate to zustand
  const documentPages = useReactiveVar(pagesVar)

  const pages = useMemo(
    () =>
      documentPages.map(item => ({
        id: item.key,
        icon: item.icon,
        link: `/${docMeta.domain}/${item.key}`,
        parentId: item.parentId,
        title: item.title
      })),
    [docMeta.domain, documentPages]
  )

  return useMemo(
    () => ({
      users,
      pages
    }),
    [pages, users]
  )
}
