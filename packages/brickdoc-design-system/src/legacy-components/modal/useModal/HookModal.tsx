import * as React from 'react'
import { ModalFuncProps } from '../Modal'
import ConfirmDialog from '../ConfirmDialog'
import LocaleReceiver from '../../locale-provider/LocaleReceiver'
import { ConfigContext } from '../../config-provider'
import { ModalLocale } from '../locale'

export interface HookModalProps {
  afterClose: () => void
  config: ModalFuncProps
}

export interface HookModalRef {
  destroy: () => void
  update: (config: ModalFuncProps) => void
}

const HookModal: React.ForwardRefRenderFunction<HookModalRef, HookModalProps> = ({ afterClose, config }, ref) => {
  const [visible, setVisible] = React.useState(true)
  const [innerConfig, setInnerConfig] = React.useState(config)
  const { direction, getPrefixCls } = React.useContext(ConfigContext)

  const prefixCls = getPrefixCls('modal')
  const rootPrefixCls = getPrefixCls()

  function close(...args: any[]) {
    setVisible(false)
    const triggerCancel = args.some(param => param?.triggerCancel)
    if (innerConfig.onCancel && triggerCancel) {
      innerConfig.onCancel()
    }
  }

  React.useImperativeHandle(ref, () => ({
    destroy: close,
    update: (newConfig: ModalFuncProps) => {
      setInnerConfig(originConfig => ({
        ...originConfig,
        ...newConfig
      }))
    }
  }))

  return (
    <LocaleReceiver componentName="Modal">
      {(modalLocale: ModalLocale) => (
        <ConfirmDialog
          prefixCls={prefixCls}
          rootPrefixCls={rootPrefixCls}
          {...innerConfig}
          // eslint-disable-next-line react/jsx-no-bind
          close={close}
          visible={visible}
          afterClose={afterClose}
          okText={innerConfig.okText || (innerConfig.okCancel ? modalLocale.okText : modalLocale.justOkText)}
          direction={direction}
          cancelText={innerConfig.cancelText || modalLocale.cancelText}
        />
      )}
    </LocaleReceiver>
  )
}

export default React.forwardRef(HookModal)
