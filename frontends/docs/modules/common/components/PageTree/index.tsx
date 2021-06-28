import React from 'react'
import { useGetPageBlocksQuery } from '@/BrickdocGraphQL'
import {  Skeleton, Tree } from "@brickdoc/design-system"
import { array2Tree } from '@/utils'

interface PageTreeProps {
  webid: string
}

const PageTree:React.FC<PageTreeProps> = (props) => {
  const { data, loading } = useGetPageBlocksQuery({variables:{webid: props.webid}})
  if(loading){ return <Skeleton /> }

  const flattedData = data.pageBlocks.map(i=>{
    return {
      key: i.id,
      parentId: i.parentId,
      sort: i.sort,
      title: i.data.title
    }
  }).sort((a,b)=> b.sort - a.sort) // descend

  const treeData = array2Tree(flattedData,{ id: 'key' })

  return <>
    <Tree treeData={treeData} draggable />
  </>
}

export default PageTree
