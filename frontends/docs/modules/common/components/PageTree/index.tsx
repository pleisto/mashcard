import React from 'react'
import { useGetPageBlocksQuery } from '@/BrickdocGraphQL'
import { Skeleton, Tree } from '@brickdoc/design-system'
import { array2Tree } from '@/utils'
import PageMenu from '../PageMenu'

interface PageTreeProps {
  webid: string
}

const PageTree: React.FC<PageTreeProps> = props => {
  const { data, loading } = useGetPageBlocksQuery({ variables: { webid: props.webid } })

  if (loading) {
    return <Skeleton />
  }

  const flattedData = data.pageBlocks
    .filter(i => {
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
        title: <PageMenu id={i.id} text={data.text} parentId={i.parentId} title={title} webid={props.webid} />
      }
    })
    .sort((a, b) => a.sort - b.sort)

  const treeData = array2Tree(flattedData, { id: 'key' })

  return <Tree treeData={treeData as any} draggable />
}

export default PageTree
