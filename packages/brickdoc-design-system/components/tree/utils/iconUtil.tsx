import classNames from 'classnames'
import {
  Rotation as LoadingOutlined,
  /* Reduce as MinusSquareOutlined,
   * Add as PlusSquareOutlined,
   * Notes as FileOutlined, */
  Down as CaretDownFilled
} from '../../icon'
import { AntTreeNodeProps } from '../Tree'
import { isValidElement, cloneElement } from '../../_util/reactNode'

export default function renderSwitcherIcon(
  prefixCls: string,
  switcherIcon: React.ReactNode | null | undefined,
  showLine: boolean | { showLeafIcon: boolean } | undefined,
  { isLeaf, expanded, loading }: AntTreeNodeProps
) {
  if (loading) {
    return <LoadingOutlined className={`${prefixCls}-switcher-loading-icon`} />
  }
  let showLeafIcon
  if (showLine && typeof showLine === 'object') {
    showLeafIcon = showLine.showLeafIcon
  }
  if (isLeaf) {
    if (showLine) {
      if (typeof showLine === 'object' && !showLeafIcon) {
        return <span className={`${prefixCls}-switcher-leaf-line`} />
      }
      return <span className={`${prefixCls}-switcher-leaf-dot`} />
      // return <FileOutlined className={`${prefixCls}-switcher-line-icon`} />
    }
    return null
  }
  const switcherCls = `${prefixCls}-switcher-icon`
  if (isValidElement(switcherIcon)) {
    return cloneElement(switcherIcon, {
      className: classNames(switcherIcon.props.className || '', switcherCls)
    })
  }

  if (switcherIcon) {
    return switcherIcon
  }
  // TODO: Refactoring may be required

  /* if (showLine) {
   *   return expanded ? (
   *     <MinusSquareOutlined className={`${prefixCls}-switcher-line-icon`} />
   *   ) : (
   *     <PlusSquareOutlined className={`${prefixCls}-switcher-line-icon`} />
   *   )
   * } */
  return <CaretDownFilled theme="filled" className={switcherCls} />
}
