import React from 'react'
import { Button, Icon } from '@brickdoc/design-system'
import { Column } from 'react-table'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

export const COLUMN_ID = '__addColumn'

export function useAddNewColumn(addNewColumn: VoidFunction): Column {
  const AddNewColumnButton = React.useCallback(
    () => (
      <Button
        data-testid={TEST_ID_ENUM.editor.tableBlock.column.addButton.id}
        type="text"
        className="table-block-add-column-button"
        onClick={addNewColumn}
      >
        <Icon.Plus />
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
