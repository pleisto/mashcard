import { renderHook } from '@testing-library/react-hooks'
import * as uploader from '@brickdoc/uploader/src/imperativeUpload'
import { EmbedAttributes } from '../../../../../extensions/blocks/embed/meta'
import { mockBlockViewProps } from '../../../../../test'
import { useDefaultFile } from '../../embedTypes/useDefaultFile'

describe('EmbedView > useDefaultFile', () => {
  it('uploads file when defaultFile exists', () => {
    const mockImperativeUpload = jest.fn()
    jest.spyOn(uploader, 'imperativeUpload').mockImplementation(mockImperativeUpload)

    const { node } = mockBlockViewProps<{}, EmbedAttributes>({
      node: {
        attrs: {
          defaultFile: new File([], 'file')
        }
      }
    })
    const onUploaded = (): void => {}
    const onProgress = (): void => {}

    renderHook(() => useDefaultFile(node, onUploaded, onProgress))

    expect(mockImperativeUpload).toBeCalled()
  })
})
