import { forwardRef, ForwardRefRenderFunction, ReactElement, ReactChild } from 'react'
import {
  Dialog as ReakitDialog,
  DialogProps as ReakitDialogProps,
  DialogBackdrop,
  DialogStateReturn
} from 'reakit/Dialog'
import { Button, ButtonProps } from '../Button'
import { Close } from '@brickdoc/design-icons'
import { maskStyle, dialogStyle } from './styles/index.style'

export { useDialogState } from 'reakit/Dialog'

export interface DialogProps extends Omit<ReakitDialogProps, 'css' | 'title' | 'baseId' | 'visible'> {
  state: DialogStateReturn
  type?: 'modal' | 'alert'
  mask?: boolean
  closable?: boolean
  title?: ReactChild
  onCancelClick?: ButtonProps['onClick']
  onOkClick?: ButtonProps['onClick']
  okText?: ReactChild
  okType?: ButtonProps['type']
  cancelText?: ReactChild
}

const Dialog: ForwardRefRenderFunction<HTMLDivElement, DialogProps> = (props, ref) => {
  const {
    type = 'modal',
    mask = true,
    title,
    children,
    onOkClick,
    okText = 'OK',
    okType = 'primary',
    onCancelClick,
    cancelText = 'Cancel',
    state,
    ...otherProps
  } = props
  const ariaLabel = props['aria-label'] ?? (typeof title === 'string' ? title : 'Modal')
  // set closable default value is true if type is modal
  const closable = props.closable ?? type === 'modal'
  // add Backdrop if mask is true
  const withWrapper = (children: ReactElement): ReactElement =>
    mask ? (
      <DialogBackdrop className={maskStyle()} {...state}>
        {children}
      </DialogBackdrop>
    ) : (
      children
    )

  const actionFooter = (
    <footer>
      <Button onClick={onCancelClick ?? state.hide} block>
        {cancelText}
      </Button>
      <Button type={okType} onClick={onOkClick ?? state.hide} block>
        {okText}
      </Button>
    </footer>
  )

  return withWrapper(
    <ReakitDialog className={dialogStyle()} {...state} {...otherProps} aria-label={ariaLabel} ref={ref}>
      <main>
        <header>
          {title ? <h1>{title}</h1> : <span />}
          {closable && <Button type="text" icon={<Close />} aria-label="Dismiss Button" onClick={state.hide} />}
        </header>
        {children}
      </main>
      {type === 'alert' && actionFooter}
    </ReakitDialog>
  )
}

const _Dialog = forwardRef(Dialog)
Dialog.displayName = 'Dialog'
export { _Dialog as Dialog }
