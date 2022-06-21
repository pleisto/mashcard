import { FC, useCallback, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { styled } from '../../themes'
import { spinStyle } from './styles/index.style'

export type Size = 'lg' | 'md' | 'sm'
export type Color = 'dark' | 'light'

export interface SpinProps {
  size?: Size
  color?: Color
  className?: string
}

const SpinRoot = styled(motion.svg, spinStyle)

/** Spin
 * @example
 * ```tsx
 * <Spin />
 * ```
 */
const Spin: FC<SpinProps> = props => {
  const { size = 'md', color = 'dark', ...otherProps } = props

  const controls = useAnimation()
  const spinnerRef = useRef<SVGSVGElement>(null)

  const spinnerStart = useCallback(() => {
    const strokeDashOffsetArray = [1000, 990, 995, 1000]
    const rotateArray = [-90, 270]
    const animDuration = 0.8

    if (spinnerRef.current) {
      spinnerRef.current.style.opacity = '1'
    }

    void controls.start(i => ({
      strokeDashoffset: strokeDashOffsetArray,
      rotate: rotateArray,
      transition: {
        strokeDashoffset: {
          repeat: Infinity,
          repeatType: 'loop',
          ease: [0.3, 0.0, 0.1, 1.0],
          duration: animDuration,
          delay: i * 0.05
        },
        rotate: {
          repeat: Infinity,
          repeatType: 'loop',
          ease: [0.3, 0.1, 0.7, 0.9],
          duration: animDuration,
          delay: i * 0.05
        }
      }
    }))
  }, [controls])

  const spinnerStop = useCallback(() => {
    void controls.start(i => ({
      strokeDashoffset: 1000,
      rotate: -90,
      transition: { duration: 0 }
    }))
    if (spinnerRef.current) {
      spinnerRef.current.style.opacity = '0'
    }
  }, [controls])

  useEffect(() => {
    if (spinnerRef?.current) {
      spinnerStart()
    }
    return () => {
      spinnerStop()
    }
  }, [spinnerRef, spinnerStart, spinnerStop])

  return (
    <SpinRoot
      {...otherProps}
      ref={spinnerRef}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      size={size}
      color={color}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle strokeLinecap="round" opacity="0.05" cx="10" cy="10" r="9" stroke="black" strokeWidth="2" />
      <motion.circle
        custom={2}
        animate={controls}
        strokeLinecap="round"
        strokeDasharray="1000"
        opacity="0.1"
        cx="10"
        cy="10"
        r="9"
        stroke="black"
        strokeWidth="2"
      />
      <motion.circle
        custom={1}
        animate={controls}
        strokeLinecap="round"
        strokeDasharray="1000"
        opacity="0.2"
        cx="10"
        cy="10"
        r="9"
        stroke="black"
        strokeWidth="2"
      />
      <motion.circle
        custom={0}
        animate={controls}
        strokeLinecap="round"
        strokeDasharray="1000"
        opacity="1.0"
        cx="10"
        cy="10"
        r="9"
        stroke="black"
        strokeWidth="2"
      />
    </SpinRoot>
  )
}

Spin.displayName = 'Spin'

export { Spin }
