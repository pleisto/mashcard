import './style'
import OriginModal, { ModalFuncProps } from './Modal'
import confirm, {
  withWarn,
  withInfo,
  withSuccess,
  withError,
  withConfirm,
  ModalStaticFunctions,
  modalGlobalConfig
} from './confirm'
import useModal from './useModal'
import destroyFns from './destroyFns'

export type { ModalProps, ModalFuncProps } from './Modal'

function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props))
}

type ModalType = typeof OriginModal &
  ModalStaticFunctions & {
    useModal: typeof useModal
    destroyAll: () => void
    config: typeof modalGlobalConfig
  }

const Modal = OriginModal as ModalType

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
Modal.useModal = useModal

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
Modal.info = (props: ModalFuncProps) => confirm(withInfo(props))

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
Modal.success = (props: ModalFuncProps) => confirm(withSuccess(props))

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
Modal.error = (props: ModalFuncProps) => confirm(withError(props))

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
Modal.warning = modalWarn

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
Modal.warn = modalWarn

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
Modal.confirm = (props: ModalFuncProps) => confirm(withConfirm(props))

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
Modal.destroyAll = () => {
  while (destroyFns.length) {
    const close = destroyFns.pop()
    if (close) {
      close()
    }
  }
}

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
Modal.config = modalGlobalConfig

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
export default Modal
