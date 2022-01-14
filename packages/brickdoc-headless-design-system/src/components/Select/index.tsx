import { ForwardRefRenderFunction, forwardRef, createRef } from 'react'
import StateSelect, { createFilter } from 'react-select'
import { theme } from '../../themes'
import { VirtualMenuList } from './VirtualMenuList'
import { DropdownIndicator, IndicatorSeparator, IndicatorsContainer } from './Indicator'
import { CeramicsMixins } from '../../themes/ceramic-light/colors/ceramics'

type StateSelectProps = Parameters<typeof StateSelect>[0]
export interface SelectProps
  extends Omit<
    StateSelectProps,
    'isMulti' | 'isRtl' | 'isDisabled' | 'isFocused' | 'isSelected' | 'isClearable' | 'isLoading' | 'isSearchable'
  > {
  clearable?: boolean
  disabled?: boolean
  loading?: boolean
  searchable?: boolean
  multi?: boolean
  rtl?: boolean
  focused?: boolean
  selected?: boolean
}

type SelectRef = Parameters<typeof StateSelect>[0]['ref']

const Select: ForwardRefRenderFunction<unknown, SelectProps> = (
  {
    clearable = false,
    loading = false,
    searchable = false,
    multi = false,
    rtl = false,
    disabled = false,
    focused = false,
    selected = false,
    menuPortalTarget = document.body,
    filterOption,
    styles,
    components,
    ...otherProps
  },
  ref
) => {
  const selectRef = (ref ?? createRef()) as SelectRef
  const selectProps = {
    isClearable: clearable,
    isLoading: loading,
    isSearchable: searchable,
    isMulti: multi,
    isRtl: rtl,
    isDisabled: disabled,
    isFocused: focused,
    isSelected: selected,
    menuPortalTarget,
    filterOption: filterOption ?? createFilter({ ignoreAccents: false }),
    ...otherProps
  }
  return (
    <StateSelect
      {...selectProps}
      ref={selectRef}
      components={{
        MenuList: VirtualMenuList,
        DropdownIndicator,
        IndicatorSeparator,
        IndicatorsContainer,
        ...components
      }}
      styles={{
        // `react-select` use emotion.css as css-in-js library.
        control: () => ({
          display: 'flex',
          alignItems: 'center',
          border: `1px solid ${theme.colors.borderSecondary}`,
          borderRadius: '4px',
          background: `${theme.colors.ceramicQuaternary}`,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          minHeight: '38px',
          outline: '0 !important',
          position: 'relative',
          transition: 'all 100ms'
        }),
        menuPortal: base => ({
          ...base,
          zIndex: `${theme.zIndices.dropdown}` as unknown as number
        }),
        menu: base => ({
          ...base,
          ...CeramicsMixins.ceramicPrimary
        }),
        option: (base, state) => ({
          ...base,
          color: `${theme.colors.typePrimary}`,
          cursor: 'pointer',
          background: state.isFocused || state.isSelected ? `${theme.colors.secondaryHover}` : 'transparent'
        }),
        ...styles
      }}
    />
  )
}

const _Select = forwardRef(Select)
_Select.displayName = 'Select'
export { _Select as Select }
