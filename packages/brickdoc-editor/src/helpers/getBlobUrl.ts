import { EditorDatabase } from '../dataSource/DataSource'

export const getBlobUrl = (
  uuid: string,
  attrs: {
    key: string
    source: 'EXTERNAL' | 'ORIGIN'
    [key: string]: any
  },
  blobs: EditorDatabase['blobs']
): string | undefined => {
  if (!uuid) return undefined
  if (attrs.source === 'EXTERNAL') return attrs.key
  if (attrs.source === 'ORIGIN') return blobs[uuid].find(blob => blob.key === attrs.key)?.url
  return undefined
}
