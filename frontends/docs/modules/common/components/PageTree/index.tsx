import React, { useMemo } from 'react'
import { useGetPageBlocksQuery } from '@/BrickdocGraphQL'
import { Skeleton, Tree } from '@brickdoc/design-system'
import { array2Tree } from '@/utils'
import { PageMenu } from '../PageMenu'

interface PageTreeProps {
  webid: string
}

export const PageTree: React.FC<PageTreeProps> = ({ webid }) => {
  const { data, loading } = useGetPageBlocksQuery({ variables: { webid } })

  const treeData = useMemo(() => {
    if (!data) return []
    const flattedData =
      data.pageBlocks
        ?.filter(i => {
          // check if is NEWLINE
          const data: any = i.data
          return i.type !== 'paragraph' || !!(data.title || data.text)
        })
        .map(i => {
          const data: any = i.data
          const title = data.title || data.text.slice(0, 20)
          return {
            key: i.id,
            value: i.id,
            parentId: i.parentId,
            sort: i.sort,
            title: <PageMenu id={i.id} text={data.text} parentId={i.parentId ?? undefined} title={title} webid={webid} />
          }
        })
        .sort((a, b) => a.sort - b.sort) ?? []
    return array2Tree(flattedData, { id: 'key' })
  }, [data, webid])

  if (loading) {
    return <Skeleton />
  }

  return <Tree treeData={treeData} draggable />
}
