import { Upload } from '@mashcard/design-icons'
import { ReactElement, useMemo } from 'react'
import { FileType } from '../../../../../helpers'
import { FileIcon } from '../../../../ui'

export function useFileIcon(fileType: FileType | undefined): ReactElement {
  return useMemo(() => (fileType ? <FileIcon fileType={fileType} /> : <Upload />), [fileType])
}
