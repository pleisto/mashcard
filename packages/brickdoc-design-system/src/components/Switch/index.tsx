import { forwardRef, ForwardRefRenderFunction, useMemo } from 'react'
import { VisuallyHidden } from '../VisuallyHidden'
import { useSwitch } from '@mui/base/SwitchUnstyled'
import { CheckboxProps } from '../Checkbox'
import { motion } from 'framer-motion'
import { Rotation } from '@brickdoc/design-icons'
import { styled } from '../../themes'
import { root, switcher, switcherHandle as SwitcherHandle } from './styles/index.style'

export interface SwitchProps extends CheckboxProps {
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Switcher = styled(motion.div, switcher)
const SwitchWrapper = styled(motion.label, root)

const Switch: ForwardRefRenderFunction<any, SwitchProps> = (props, ref) => {
  const {
    labelFirst = false,
    loading = false,
    size = 'md',
    className,
    style,
    children,
    disabled: disabledProp,
    ...otherProps
  } = props
  const { getInputProps, checked, disabled } = useSwitch({
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    disabled: disabledProp || loading,
    ...otherProps
  })

  const offsetX = useMemo(() => (size === 'sm' ? 10 : 12), [size])
  const spring = { type: 'spring', stiffness: 800, damping: 50, mass: 1 }
  const animate = { x: checked ? offsetX : 0 }

  return (
    <SwitchWrapper transition={spring} ref={ref} className={className} style={style}>
      {labelFirst && children && <span>{children}</span>}
      <Switcher checked={checked} loading={loading} disabled={disabled} size={size}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <SwitcherHandle animate={animate}>{loading && <Rotation className="brd-icon-spin" />}</SwitcherHandle>
      </Switcher>
      {!labelFirst && children && <span>{children}</span>}
    </SwitchWrapper>
  )
}

const _Switch = forwardRef(Switch)
_Switch.displayName = 'Switch'

export { _Switch as Switch }
