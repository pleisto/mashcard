import { forwardRef, ForwardRefRenderFunction, ReactNode, CSSProperties } from 'react'
import ModalUnstyled, { ModalUnstyledTypeMap } from '@mui/base/ModalUnstyled'
import { CSS } from '@stitches/react'
import { styled, theme, config } from '../../themes'

type ModalUnstyledProps = ModalUnstyledTypeMap['props']

export interface ModalProps extends Omit<ModalUnstyledProps, 'children'> {
  children: ReactNode
  title?: ReactNode
  dialogCss?: CSS<typeof config>
  width?: CSSProperties['width']
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

const StyledModal = styled(ModalUnstyled, {
  position: 'fixed',
  zIndex: theme.zIndices.modal,
  display: 'flex',
  inset: 0,
  justifyContent: 'center',
  alignItems: 'center'
})

const Backdrop = styled('div', {
  position: 'fixed',
  zIndex: '-1',
  inset: 0,
  backgroundColor: theme.colors.black_35p,
  '-webkit-tap-highlight-color': 'transparent'
})

const ModalDialog = styled('div', {
  include: ['ceramicPrimary'],
  padding: '1.5rem 1.25rem',
  borderRadius: '8px',
  maxWidth: '100%',
  '&>h1.dialogTitle': {
    fontSize: theme.fontSizes.title5,
    lineHeight: theme.lineHeights.title5,
    marginBottom: '8px'
  }
})

const Modal: ForwardRefRenderFunction<any, ModalProps> = (props, ref) => {
  const { title, children, dialogCss, width = '380px', ...otherProps } = props
  return (
    <StyledModal {...otherProps} BackdropComponent={Backdrop} ref={ref}>
      <ModalDialog
        css={{
          width,
          ...(dialogCss as any)
        }}
      >
        {title && <h1 className="dialogTitle">{title}</h1>}
        {children}
      </ModalDialog>
    </StyledModal>
  )
}

const _Modal = forwardRef(Modal)
_Modal.displayName = 'Modal'

export { _Modal as Modal }
export { ConfirmDialog } from './ConfirmDialog'
