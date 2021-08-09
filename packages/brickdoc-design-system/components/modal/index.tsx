import './style'
import OriginModal, { ModalFuncProps, destroyFns } from './Modal'
import confirm, { withWarn, withInfo, withSuccess, withError, withConfirm, ModalStaticFunctions, modalGlobalConfig } from './confirm'

export type { ActionButtonProps } from './ActionButton'
export type { ModalProps, ModalFuncProps } from './Modal'

function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props))
}

export type ModalType = typeof OriginModal & ModalStaticFunctions & { destroyAll: () => void; config: typeof modalGlobalConfig }

const Modal = OriginModal as ModalType

Modal.info = (props: ModalFuncProps) => confirm(withInfo(props))

Modal.success = (props: ModalFuncProps) => confirm(withSuccess(props))

Modal.error = (props: ModalFuncProps) => confirm(withError(props))

Modal.warning = modalWarn

Modal.warn = modalWarn

Modal.confirm = (props: ModalFuncProps) => confirm(withConfirm(props))

Modal.destroyAll = () => {
  while (destroyFns.length) {
    const close = destroyFns.pop()
    if (close) {
      close()
    }
  }
}

Modal.config = modalGlobalConfig

export default Modal
