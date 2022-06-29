import { renderHook } from '@testing-library/react-hooks'
import * as uploader from '@mashcard/uploader/src/imperativeUpload'
import { EmbedAttributes, EmbedOptions } from '../../../../../../extensions/blocks/embed/meta'
import { mockBlockViewProps } from '../../../../../../test'
import { useDefaultFile } from '../../../embedTypes/Upload/useDefaultFile'

jest.mock('@mashcard/uploader/src/imperativeUpload')

describe('EmbedView > useDefaultFile', () => {
  it('uploads file when defaultFile exists', () => {
    const mockImperativeUpload = jest.fn()
    jest.spyOn(uploader, 'imperativeUpload').mockImplementation(mockImperativeUpload)

    const { node, extension } = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        attrs: {
          defaultFile: new File([], 'file')
        }
      },
      extension: {
        options: {
          prepareFileUpload: jest.fn()
        }
      }
    })
    const onUploaded = (): void => {}
    const onProgress = (): void => {}

    renderHook(() => useDefaultFile({ node, extension, onUploaded, onProgress }))

    expect(mockImperativeUpload).toBeCalled()
  })
})
