import { ReactNode } from 'react'
import { toast as hotToast, ToastOptions as HotToastOptions, ToastPosition } from 'react-hot-toast'
import { NotificationBar } from './NotificationBar'

/**
 * Use `start` and `end` instead of `top` and `bottom` to ensure
 * more consistent semantics with Internationalization.
 */
export const placementMaps = {
  topStart: 'top-left',
  topCenter: 'top-center',
  topEnd: 'top-right',
  bottomStart: 'bottom-left',
  bottomCenter: 'bottom-center',
  bottomEnd: 'bottom-right'
}

export interface ToastOptions extends Omit<HotToastOptions, 'position'> {
  position?: keyof typeof placementMaps
  type: 'error' | 'loading' | 'success' | 'blank' | 'custom'
}

interface NotificationOptions extends Omit<ToastOptions, 'type'> {
  type?: 'error' | 'info'
}

type Message = Parameters<typeof hotToast>[0]
type ToastHandler = (message: Message, options?: ToastOptions) => string

/**
 * Convert `ToastOptions` to `HotToastOptions`
 * @param opts
 * @returns
 */
const a11yOpts = (opts?: ToastOptions): HotToastOptions => ({
  ...opts,
  position: !opts?.position ? undefined : (placementMaps[opts?.position] as ToastPosition)
})

const toast = (msg: Message, opts?: ToastOptions): string => hotToast(msg, a11yOpts(opts))

toast.error = ((msg, opts?) => hotToast.error(msg, a11yOpts(opts))) as ToastHandler
toast.success = ((msg, opts?) => hotToast.success(msg, a11yOpts(opts))) as ToastHandler
toast.loading = ((msg, opts?) => hotToast.loading(msg, a11yOpts(opts))) as ToastHandler
// toast.custom = ((msg, opts?) => hotToast.custom(msg, a11yOpts(opts))) as ToastHandler
// info is alias of blank toast
toast.info = ((msg, opts?) => hotToast(msg, a11yOpts(opts))) as ToastHandler
toast.notification = (title: ReactNode, description: ReactNode, opts?: NotificationOptions) =>
  hotToast.custom(
    t => <NotificationBar title={title} description={description} type={opts?.type} toast={t} />,
    a11yOpts({
      ...opts,
      type: 'custom',
      position: opts?.position ?? 'topEnd'
    })
  )
toast.dismiss = hotToast.dismiss
toast.remove = hotToast.remove

export { toast }
