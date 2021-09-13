import React from 'react'
import { Button, Icon } from '@brickdoc/design-system'

export interface SorterFooterProps {
  onAddSorter: () => void
}

export const SorterFooter: React.FC<SorterFooterProps> = ({ onAddSorter }) => {
  return (
    <div className="table-toolbar-item-footer">
      <Button className="table-toolbar-item-footer-button" type="text" onClick={onAddSorter}>
        <Icon.Add />
        <span>Add a Sort</span>
      </Button>
    </div>
  )
}
