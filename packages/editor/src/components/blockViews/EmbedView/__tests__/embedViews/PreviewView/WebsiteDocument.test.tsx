import { render } from '@testing-library/react'
import { WebsiteDocument } from '../../../embedViews/PreviewView/WebsiteDocument'
import * as editorHooks from '../../../../../../hooks/useEditorContext'
import { mockEditor } from '../../../../../../test'

jest.mock('../../../../../../hooks/useEditorContext')

describe('WebsiteDocument', () => {
  it('renders WebsiteDocument correctly', () => {
    jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
      editor: mockEditor(),
      documentEditable: true
    }))

    const updateEmbedBlockAttributes = jest.fn()
    const { container } = render(
      <WebsiteDocument
        blockType="link"
        icon="icon"
        title="title"
        displayName="displayName"
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
        url="url"
      />
    )

    expect(container).toMatchSnapshot()
  })
})
