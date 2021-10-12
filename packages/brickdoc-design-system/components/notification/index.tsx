import * as React from 'react'
import Notification from 'rc-notification'
import { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification'
import classNames from 'classnames'

import './style'
import {
  IconProvider,
  Close as CloseOutlined,
  CheckOne as CheckCircleOutlined,
  CloseOne as CloseCircleOutlined,
  Attention as ExclamationCircleOutlined,
  Info as InfoCircleOutlined
} from '../icon'
import createUseNotification from './hooks/useNotification'
import { globalConfig } from '../config-provider'

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

export type IconType = 'success' | 'info' | 'error' | 'warning'

const notificationInstance: {
  [key: string]: Promise<RCNotificationInstance>
} = {}
let defaultDuration = 4.5
let defaultTop = 24
let defaultBottom = 24
let defaultPrefixCls = ''
let defaultPlacement: NotificationPlacement = 'topRight'
let defaultGetContainer: () => HTMLElement
let defaultCloseIcon: React.ReactNode
let rtl = false
let maxCount: number

export interface ConfigProps {
  top?: number
  bottom?: number
  duration?: number
  prefixCls?: string
  placement?: NotificationPlacement
  getContainer?: () => HTMLElement
  closeIcon?: React.ReactNode
  rtl?: boolean
  maxCount?: number
}

function setNotificationConfig(options: ConfigProps) {
  const { duration, placement, bottom, top, getContainer, closeIcon, prefixCls } = options
  if (prefixCls !== undefined) {
    defaultPrefixCls = prefixCls
  }
  if (duration !== undefined) {
    defaultDuration = duration
  }
  if (placement !== undefined) {
    defaultPlacement = placement
  } else if (options.rtl) {
    defaultPlacement = 'topLeft'
  }
  if (bottom !== undefined) {
    defaultBottom = bottom
  }
  if (top !== undefined) {
    defaultTop = top
  }
  if (getContainer !== undefined) {
    defaultGetContainer = getContainer
  }
  if (closeIcon !== undefined) {
    defaultCloseIcon = closeIcon
  }
  if (options.rtl !== undefined) {
    rtl = options.rtl
  }
  if (options.maxCount !== undefined) {
    maxCount = options.maxCount
  }
}

function getPlacementStyle(placement: NotificationPlacement, top: number = defaultTop, bottom: number = defaultBottom) {
  let style
  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top,
        bottom: 'auto'
      }
      break
    case 'topRight':
      style = {
        right: 0,
        top,
        bottom: 'auto'
      }
      break
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom
      }
      break
    default:
      style = {
        right: 0,
        top: 'auto',
        bottom
      }
      break
  }
  return style
}

function getNotificationInstance(args: ArgsProps, callback: (info: { prefixCls: string; instance: RCNotificationInstance }) => void) {
  const { placement = defaultPlacement, top, bottom, getContainer = defaultGetContainer, prefixCls: customizePrefixCls } = args
  const { getPrefixCls } = globalConfig()
  const prefixCls = getPrefixCls('notification', customizePrefixCls || defaultPrefixCls)

  const cacheKey = `${prefixCls}-${placement}`
  const cacheInstance = notificationInstance[cacheKey]
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (cacheInstance) {
    void Promise.resolve(cacheInstance).then(instance => {
      // eslint-disable-next-line node/no-callback-literal
      callback({ prefixCls: `${prefixCls}-notice`, instance })
    })

    return
  }

  const notificationClass = classNames(`${prefixCls}-${placement}`, {
    [`${prefixCls}-rtl`]: rtl
  })

  notificationInstance[cacheKey] = new Promise(resolve => {
    Notification.newInstance(
      {
        prefixCls,
        className: notificationClass,
        style: getPlacementStyle(placement, top, bottom),
        getContainer,
        maxCount
      },
      notification => {
        resolve(notification)
        // eslint-disable-next-line node/no-callback-literal
        callback({
          prefixCls: `${prefixCls}-notice`,
          instance: notification
        })
      }
    )
  })
}

const typeToIcon = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined
}

export interface ArgsProps {
  message: React.ReactNode
  description?: React.ReactNode
  btn?: React.ReactNode
  key?: string
  onClose?: () => void
  duration?: number | null
  icon?: React.ReactNode
  placement?: NotificationPlacement
  style?: React.CSSProperties
  prefixCls?: string
  className?: string
  readonly type?: IconType
  onClick?: () => void
  top?: number
  bottom?: number
  getContainer?: () => HTMLElement
  closeIcon?: React.ReactNode
}

function getRCNoticeProps(args: ArgsProps, prefixCls: string) {
  const {
    duration: durationArg,
    icon,
    type,
    description,
    message,
    btn,
    onClose,
    onClick,
    key,
    style,
    className,
    closeIcon = defaultCloseIcon
  } = args

  const duration = durationArg === undefined ? defaultDuration : durationArg

  let iconNode: React.ReactNode = null
  if (icon) {
    iconNode = <span className={`${prefixCls}-icon`}>{args.icon}</span>
  } else if (type) {
    iconNode = React.createElement(typeToIcon[type] || null, {
      className: `${prefixCls}-icon ${prefixCls}-icon-${type}`,
      theme: 'outline'
    })
  }

  if (icon || type) {
    iconNode = <IconProvider value={globalConfig().getIconDefaultConfig(rtl)}>{iconNode}</IconProvider>
  }

  const closeIconToRender = (
    <span className={`${prefixCls}-close-x`}>{closeIcon || <CloseOutlined className={`${prefixCls}-close-icon`} />}</span>
  )

  const autoMarginTag = !description && iconNode ? <span className={`${prefixCls}-message-single-line-auto-margin`} /> : null

  return {
    content: (
      <div className={iconNode ? `${prefixCls}-with-icon` : ''} role="alert">
        {iconNode}
        <div className={`${prefixCls}-message`}>
          {autoMarginTag}
          {message}
        </div>
        <div className={`${prefixCls}-description`}>{description}</div>
        {btn ? <span className={`${prefixCls}-btn`}>{btn}</span> : null}
      </div>
    ),
    duration,
    closable: true,
    closeIcon: closeIconToRender,
    onClose,
    onClick,
    key,
    style: style || {},
    className: classNames(className, {
      [`${prefixCls}-${type}`]: !!type
    })
  }
}

function notice(args: ArgsProps) {
  getNotificationInstance(args, ({ prefixCls, instance }) => {
    instance.notice(getRCNoticeProps(args, prefixCls))
  })
}

const api: any = {
  open: notice,
  close(key: string) {
    Object.keys(notificationInstance).forEach(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async cacheKey =>
        await Promise.resolve(notificationInstance[cacheKey]).then(instance => {
          instance.removeNotice(key)
        })
    )
  },
  config: setNotificationConfig,
  destroy() {
    Object.keys(notificationInstance).forEach(cacheKey => {
      void Promise.resolve(notificationInstance[cacheKey]).then(instance => {
        instance.destroy()
      })
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete notificationInstance[cacheKey] // lgtm[js/missing-await]
    })
  }
}

;['success', 'info', 'warning', 'error'].forEach(type => {
  api[type] = (args: ArgsProps) =>
    api.open({
      ...args,
      type
    })
})

api.warn = api.warning
api.useNotification = createUseNotification(getNotificationInstance, getRCNoticeProps)

export interface NotificationInstance {
  success: (args: ArgsProps) => void
  error: (args: ArgsProps) => void
  info: (args: ArgsProps) => void
  warning: (args: ArgsProps) => void
  open: (args: ArgsProps) => void
}

export interface NotificationApi extends NotificationInstance {
  warn: (args: ArgsProps) => void
  close: (key: string) => void
  config: (options: ConfigProps) => void
  destroy: () => void

  // Hooks
  useNotification: () => [NotificationInstance, React.ReactElement]
}

/** @private test Only function. Not work on production */
export const getInstance = async (cacheKey: string) => (process.env.NODE_ENV === 'test' ? await notificationInstance[cacheKey] : null)

export default api as NotificationApi
