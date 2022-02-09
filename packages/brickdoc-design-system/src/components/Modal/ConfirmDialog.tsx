import { FC } from 'react'
import { ModalProps, Modal } from './index'
import { ButtonProps, Button } from '../Button'
import { FormControl } from '../Form/FormControl'
import { styled } from '../../themes'

export interface ConfirmDialogProps extends Omit<ModalProps, 'onClose'> {
  onConfirm: () => void
  onCancel: () => void
  confirmBtnText?: string
  cancelBtnText?: string
  confirmBtnProps?: Omit<ButtonProps, 'onClick'>
  cancelBtnProps?: Omit<ButtonProps, 'onClick'>
}

const Content = styled('p', {
  padding: '12px 8px',
  marginBottom: '24px',
  fontWeight: '500'
})

export const ConfirmDialog: FC<ConfirmDialogProps> = props => {
  const {
    onCancel,
    onConfirm,
    confirmBtnText = 'Confirm',
    cancelBtnText = 'Cancel',
    confirmBtnProps = {},
    cancelBtnProps = {},
    width = '400px',
    children,
    dialogCss,
    ...otherProps
  } = props
  return (
    <Modal
      {...otherProps}
      onClose={onCancel}
      dialogCss={{
        width,
        padding: '12px',
        ...dialogCss
      }}
    >
      <Content>{children}</Content>
      <FormControl inlineWrapper layout="horizontal">
        <Button block size="lg" {...(cancelBtnProps as any)} onClick={onCancel}>
          {cancelBtnText}
        </Button>
        <Button block size="lg" type="primary" {...(confirmBtnProps as any)} onClick={onConfirm}>
          {confirmBtnText}
        </Button>
      </FormControl>
    </Modal>
  )
}
