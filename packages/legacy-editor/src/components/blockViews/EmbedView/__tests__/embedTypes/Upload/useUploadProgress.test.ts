import { renderHook, act } from '@testing-library/react'
import { useRef } from 'react'
import { EmbedAttributes, EmbedOptions } from '../../../../../../extensions'
import { mockBlockViewProps } from '../../../../../../test'
import { useUploadProgress } from '../../../embedTypes/Upload/useUploadPorgress'

jest.mock('@mashcard/uploader', () => ({
  imperativeUpload: (file: File, config: any) => {
    config.onProgress({})
    config.onUploaded({})
  }
}))

describe('useUploadProgress', () => {
  it('uploads file correctly', () => {
    const { node, extension } = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      extension: {
        options: {
          prepareFileUpload: (() => {}) as any
        }
      }
    })
    const updateEmbedBlockAttributes = jest.fn()
    const { result } = renderHook(() => {
      const ref = useRef<HTMLInputElement>(document.createElement('input'))
      return useUploadProgress(node, extension, updateEmbedBlockAttributes, ref)
    })

    const { onFileInputChange } = result.current

    const event = {
      target: {
        files: [new File([], 'name')]
      }
    }

    act(() => {
      onFileInputChange(event as any)
    })

    expect(updateEmbedBlockAttributes).toBeCalled()
  })

  it('chooses file correctly', () => {
    const { node, extension } = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      extension: {
        options: {
          prepareFileUpload: (() => {}) as any
        }
      }
    })
    const updateEmbedBlockAttributes = jest.fn()
    const inputRef = {
      current: {
        click: jest.fn()
      }
    }
    const { result } = renderHook(() => {
      return useUploadProgress(node, extension, updateEmbedBlockAttributes, inputRef as any)
    })

    const { onChooseFile } = result.current

    act(() => {
      onChooseFile()
    })

    expect(inputRef.current.click).toBeCalled()
  })
})
