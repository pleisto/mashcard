import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { TableRender } from './TableRender'
import { useColumns } from './useColumns'
import { useActiveStatus } from './useActiveStatus'
import { useTableRows } from './useTableRows'
import { EditorDataSourceContext } from '../..'

export const Table: React.FC<NodeViewProps> = ({ editor, node, deleteNode, updateAttributes }) => {
  const parentId: string = node.attrs.uuid
  const prevData = node.attrs.data || {}

  const updateAttributeData = (data: Record<string, any>): void => {
    updateAttributes({
      data: { ...prevData, ...data }
    })
  }

  const editorDataSource = React.useContext(EditorDataSourceContext)

  const useColumnsProps = useColumns({
    databaseColumns: prevData.columns,
    updateAttributeData
  })

  const [{ isCellActive, isRowActive, update: updateActiveStatus, reset: resetActiveStatus }] = useActiveStatus()

  const tableRowsProps = useTableRows({ editorDataSource, parentId, updateActiveStatus })

  return (
    <TableRender
      dynamic={false}
      useActiveStatusUtils={{ isCellActive, isRowActive, update: updateActiveStatus, reset: resetActiveStatus }}
      useColumnsProps={useColumnsProps}
      tableRowsProps={tableRowsProps}
      deleteNode={deleteNode}
      updateAttributes={updateAttributes}
      parentId={parentId}
      prevData={prevData}
    />
  )
}
