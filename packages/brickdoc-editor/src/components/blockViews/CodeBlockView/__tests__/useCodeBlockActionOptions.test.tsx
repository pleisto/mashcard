import { fireEvent, render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { CodeBlockAttributes, CodeBlockOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../../../test'
import { BlockActionsMenu, BlockActionsMenuProps } from '../../BlockActions/BlockActionsMenu'
import { useOptions } from '../useOptions'

describe('useCodeBlockActionOptions', () => {
  it('triggers copy correctly', () => {
    const codeText = 'code text'
    const mockCopy = jest.fn()
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(content => mockCopy(content))
    const { node } = mockBlockViewProps<CodeBlockOptions, CodeBlockAttributes>({
      node: {
        text: codeText
      }
    })
    const { result } = renderHook(() => useOptions(node))

    const actionOptions = result.current[0].filter(
      item => typeof item !== 'string'
    ) as BlockActionsMenuProps['extraOptions']

    render(<BlockActionsMenu extraOptions={actionOptions} />)

    fireEvent.click(screen.getByText(`code_block.copy_code`))

    expect(mockCopy).toBeCalledWith(codeText)
  })
})
