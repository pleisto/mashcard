import { HTMLAttributes, FC, ReactNode, cloneElement, isValidElement } from 'react'
import { useLabel } from '../../hooks'
import { CSS } from '@stitches/react'
import { config } from '../../themes'
import { FormControlWrapper, FieldWrapper, Description, InvalidMsg } from './styles/formControl.style'
import { devWarning } from '../../utilities'

export interface FormControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'css'> {
  layout?: 'horizontal' | 'vertical'
  inlineWrapper?: boolean
  requiredMask?: boolean
  description?: ReactNode
  label?: ReactNode
  invalidMessage?: ReactNode
  children: ReactNode
  hidden?: boolean
  fieldCss?: CSS<typeof config>
}

export const FormControl: FC<FormControlProps> = props => {
  const {
    layout = 'vertical',
    inlineWrapper = false,
    requiredMask,
    description,
    label,
    invalidMessage,
    children,
    fieldCss,
    ...otherProps
  } = props
  const { labelProps, fieldProps } = useLabel({ label, ...otherProps })

  const isVertical = layout === 'vertical'
  const invalidMsgDom = invalidMessage && <InvalidMsg>{invalidMessage}</InvalidMsg>
  const descDom = description && <Description>{description}</Description>

  devWarning(
    !!label && !isValidElement(children),
    '`props.children` must be a valid `ReactElement` when `label` is provided.',
    children
  )

  return (
    <FormControlWrapper layout={layout} requiredMask={requiredMask} {...otherProps}>
      {label && <label {...labelProps}>{label}</label>}
      <FieldWrapper inlineWrapper={inlineWrapper} css={fieldCss as any}>
        {isVertical && descDom}
        {label && isValidElement(children) ? cloneElement(children, { ...fieldProps }) : children}
        {!isVertical && descDom}
        {invalidMsgDom}
      </FieldWrapper>
    </FormControlWrapper>
  )
}
