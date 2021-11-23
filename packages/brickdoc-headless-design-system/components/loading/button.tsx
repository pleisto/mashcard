import { useRef } from 'react'
import { useButton } from '@react-aria/button'
import { styled } from '../theme'
import { variants } from './style/button'

export type HtmlType = 'button' | 'reset' | 'submit'
export type Size = 'default' | 'small' | 'large'
export type Theme = 'solid' | 'borderless' | 'light'
export type Type = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger'

const Loading = props => {
  const ref = useRef()
  const { buttonProps } = useButton(props, ref)
  const Button = styled('button', {
    variants,
    defaultVariants: {
      type: 'primary'
    }
  })

  return (
    <Button {...buttonProps} ref={ref}>
      {props.children}
    </Button>
  )
}

export default Loading
