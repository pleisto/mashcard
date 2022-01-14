import { FC } from 'react'
import { DropdownIndicatorProps, IndicatorSeparatorProps, IndicatorsContainerProps } from 'react-select'
import { ArrowDown } from '@brickdoc/design-icons'
import { css } from '../../themes'

const ContainerStyle = css({
  paddingLeft: '8px',
  paddingRight: '8px',
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  flexShrink: 0
})

export const IndicatorsContainer: FC<IndicatorsContainerProps> = props => {
  return (
    <div className={ContainerStyle()} {...props.innerProps}>
      {props.children ?? <ArrowDown />}
    </div>
  )
}

export const IndicatorSeparator: FC<IndicatorSeparatorProps> = ({ innerProps }) => {
  // remove separator
  return <></>
}

export const DropdownIndicator: FC<DropdownIndicatorProps> = ({ innerProps }) => {
  return <ArrowDown aria-label="dropdown" {...innerProps} />
}
