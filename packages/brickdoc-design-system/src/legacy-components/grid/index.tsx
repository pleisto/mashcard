import './style'
import Row from './row'
import Col from './col'
import useBreakpoint from './hooks/useBreakpoint'

export type { RowProps } from './row'

export type { ColProps, ColSize } from './col'

export { Row, Col }

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
export default { useBreakpoint }
