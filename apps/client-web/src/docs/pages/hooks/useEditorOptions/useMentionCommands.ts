import { useGetPodMembersQuery } from '@/MashcardGraphQL'
import { pagesVar } from '@/docs/reactiveVars'
import { DocMeta } from '@/docs/store/DocMeta'
import { useReactiveVar } from '@apollo/client'
import { MentionCommandsOptions } from '@mashcard/editor'
import { useMemo } from 'react'

export function useMentionCommands(docMeta: DocMeta): MentionCommandsOptions {
  const { data } = useGetPodMembersQuery()

  const users = useMemo(
    () =>
      data?.podMembers?.map(member => ({
        id: member.domain,
        name: member.name,
        avatar: member.avatarData?.url ?? ''
      })) ?? [],
    [data?.podMembers]
  )

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
