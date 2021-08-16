import React from 'react'
import { Button, Icon } from '@brickdoc/design-system'
import { Column } from 'react-table'

export const COLUMN_ID = '__addColumn'

export function useAddNewColumn(addNewColumn: VoidFunction): Column {
  const AddNewColumnButton = React.useCallback(
    () => (
      <Button type="text" className="table-block-add-column-button" onClick={addNewColumn}>
        <Icon name="plus" />
      </Button>
    ),
    [addNewColumn]
  )
  const AddNewColumnCell = React.useCallback(() => <div />, [])

  return {
    id: COLUMN_ID,
    Header: AddNewColumnButton,
    Cell: AddNewColumnCell
  }
}
