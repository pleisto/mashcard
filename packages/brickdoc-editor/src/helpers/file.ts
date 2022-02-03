import { devLog } from '@brickdoc/design-system'

export const sizeFormat = (size?: number): string => {
  if (size === undefined) return ''
  if (size < 1024) return `${size} b`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`

  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

const _linkStorage: { [key: string]: string | null } = {}
export const linkStorage = {
  set(key: string, url: string | null): void {
    _linkStorage[key] = url
  },
  get(key: string): string | null | undefined {
    return _linkStorage[key]
  }
}

export type FileType = 'word' | 'excel' | 'ppt' | 'pdf' | 'image' | 'html' | 'unknown'

export const getFileTypeByContentType = (name: string): FileType => {
  const [generic, specified] = name.split('/')

  if (generic === 'image') return 'image'

  switch (specified) {
    case 'pdf':
      return 'pdf'
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
    case 'png':
      return 'image'
    case 'msword':
    case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'word'
    case 'vnd.ms-powerpoint':
    case 'vnd.openxmlformats-officedocument.presentationml.presentation':
      return 'ppt'
    case 'vnd.ms-excel':
    case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 'excel'
    default:
      return 'unknown'
  }
}

export const getFileTypeByExtension = (name: string): FileType => {
  const extension = (name ?? '').split('.').pop()

  switch (extension) {
    case 'pdf':
      return 'pdf'
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
    case 'png':
      return 'image'
    case 'doc':
    case 'docx':
      return 'word'
    case 'ppt':
    case 'pptx':
      return 'ppt'
    case 'xls':
    case 'xlsx':
      return 'excel'
    default:
      return 'unknown'
  }
}

const getContentType = async (url: string): Promise<string | null> =>
  await new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('HEAD', url)
    xhr.onreadystatechange = function onreadystatechange() {
      if (this.readyState === this.DONE) {
        resolve(this.getResponseHeader('Content-Type'))
      }
    }
    xhr.send()
  })

export const getFileTypeFromUrl = async (url: string): Promise<FileType> => {
  const contentType = await getContentType(url)
  devLog(contentType)

  return 'unknown'
}
