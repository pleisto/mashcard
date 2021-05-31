import * as React from 'react'
import {
  Search as SearchOutlined,
  Close as CloseOutlined,
  CloseOne as CloseCircleFilled,
  Check as CheckOutlined,
  Rotation as LoadingOutlined,
  Down as DownOutlined
} from '../../icon'

export default function getIcons({
  suffixIcon,
  clearIcon,
  menuItemSelectedIcon,
  removeIcon,
  loading,
  multiple,
  prefixCls,
}: {
  suffixIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  menuItemSelectedIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  loading?: boolean;
  multiple?: boolean;
  prefixCls: string;
}) {
  // Clear Icon
  let mergedClearIcon = clearIcon
  if (!clearIcon) {
    mergedClearIcon = <CloseCircleFilled theme="filled" />
  }

  // Arrow item icon
  let mergedSuffixIcon = null
  if (suffixIcon !== undefined) {
    mergedSuffixIcon = suffixIcon
  } else if (loading) {
    mergedSuffixIcon = <LoadingOutlined spin />
  } else {
    const iconCls = `${prefixCls}-suffix`
    mergedSuffixIcon = ({ open, showSearch }: { open: boolean; showSearch: boolean }) => {
      if (open && showSearch) {
        return <SearchOutlined className={iconCls} />
      }
      return <DownOutlined className={iconCls} />
    }
  }

  // Checked item icon
  let mergedItemIcon = null
  if (menuItemSelectedIcon !== undefined) {
    mergedItemIcon = menuItemSelectedIcon
  } else if (multiple) {
    mergedItemIcon = <CheckOutlined />
  } else {
    mergedItemIcon = null
  }

  let mergedRemoveIcon = null
  if (removeIcon !== undefined) {
    mergedRemoveIcon = removeIcon
  } else {
    mergedRemoveIcon = <CloseOutlined />
  }

  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon,
  }
}
