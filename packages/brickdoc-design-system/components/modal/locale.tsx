export interface ModalLocale {
  okText?: string
  cancelText?: string
  justOkText?: string
}

let runtimeLocale: ModalLocale = {}

export function changeConfirmLocale(newLocale?: ModalLocale) {
  if (newLocale) {
    runtimeLocale = {
      ...runtimeLocale,
      ...newLocale
    }
  } else {
    runtimeLocale = {}
  }
}

export function getConfirmLocale() {
  return runtimeLocale
}
