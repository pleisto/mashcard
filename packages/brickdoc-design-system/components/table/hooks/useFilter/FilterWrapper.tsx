import * as React from 'react'

export interface FilterDropdownMenuWrapperProps {
  children?: React.ReactNode
  className?: string
}

const FilterDropdownMenuWrapper = (props: FilterDropdownMenuWrapperProps) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div className={props.className} onClick={e => e.stopPropagation()}>
    {props.children}
  </div>
)

export default FilterDropdownMenuWrapper
