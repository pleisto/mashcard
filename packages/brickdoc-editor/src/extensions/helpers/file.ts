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

export type FileType = 'pdf' | 'image' | 'unknown'

export const getFileTypeByExtension = (name: string): FileType => {
  const extension = name.split('.').pop()

  switch (extension) {
    case 'pdf':
      return 'pdf'
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
    case 'png':
      return 'image'
    default:
      return 'unknown'
  }
}
