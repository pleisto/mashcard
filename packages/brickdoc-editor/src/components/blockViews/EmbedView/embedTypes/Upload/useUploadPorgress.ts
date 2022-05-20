import { useCallback, useState, ChangeEventHandler, RefObject } from 'react'
import { UploadResultData, UploadProgress, imperativeUpload } from '@brickdoc/uploader'
import { linkStorage, getFileTypeByExtension, getFileTypeByContentType, FileType } from '../../../../../helpers'
import { useEditorPropsContext } from '../../../../../hooks'
import { useBlockJustCreated } from '../useBlockJustCreated'
import { useDefaultFile } from './useDefaultFile'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { UpdateEmbedBlockAttributes } from '../../EmbedView'

export function useUploadProgress(
  node: EmbedViewProps['node'],
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes,
  inputRef: RefObject<HTMLInputElement>
): {
  progress: UploadProgress | undefined
  onFileInputChange: ChangeEventHandler<HTMLInputElement>
  onChooseFile: () => void
  file: File | undefined
  fileType: FileType | undefined
} {
  const editorProps = useEditorPropsContext()

  const [file, setFile] = useState<File>()
  const [fileType, setFileType] = useState<FileType>()

  const onUploaded = useCallback(
    (data: UploadResultData): void => {
      linkStorage.set(node.attrs.uuid, data.downloadUrl ?? '')

      let fileType = getFileTypeByContentType(data.meta?.contentType ?? '')
      fileType = fileType === 'unknown' ? getFileTypeByExtension(data.meta?.name) : fileType

      updateEmbedBlockAttributes(
        {
          key: data.url!,
          source: 'ORIGIN',
          name: data.meta?.name,
          size: data.meta?.size,
          contentType: data.meta?.contentType,
          mode: 'preview'
        },
        fileType === 'image' ? 'image' : 'attachment'
      )
    },
    [node.attrs.uuid, updateEmbedBlockAttributes]
  )

  const [progress, setProgress] = useState<UploadProgress>()
  const onProgress = (progress: UploadProgress): void => setProgress(progress)

  const handleFileInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      const file = event.target.files?.[0]
      // We clear the input after a file is selected, because otherwise
      // change event is not fired in Chrome and Safari when a file
      // with the same name is selected.
      event.target.value = ''

      if (!file) return

      setFile(file)

      let fileType = getFileTypeByContentType(file.type)
      fileType = fileType === 'unknown' ? getFileTypeByExtension(file.name) : fileType
      setFileType(fileType)

      void imperativeUpload(file, {
        prepareFileUpload: editorProps.prepareFileUpload,
        blockId: editorProps.rootId,
        fileType,
        onUploaded,
        onProgress
      })
    },
    [editorProps.prepareFileUpload, editorProps.rootId, onUploaded]
  )
  const handleChooseFile = useCallback(() => {
    inputRef.current?.click()
  }, [inputRef])

  const handleBlockJustCreated = useCallback(() => {
    if (node.attrs.defaultFile) return
    handleChooseFile()
  }, [handleChooseFile, node.attrs.defaultFile])

  useBlockJustCreated(node.attrs.uuid, handleBlockJustCreated)
  useDefaultFile(node, onUploaded, onProgress)

  return {
    progress,
    onChooseFile: handleChooseFile,
    onFileInputChange: handleFileInputChange,
    file,
    fileType
  }
}
