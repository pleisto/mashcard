import { fireEvent, render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { CodeBlockAttributes, CodeBlockOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../../common/tests'
import { ToolbarGroupOption, ToolbarItemOption, ToolbarSubMenuOption } from '../../../ui'
import { BlockActionsMenu, BlockActionsMenuProps } from '../../BlockActions/BlockActionsMenu'
import { useOptions } from '../useOptions'

describe('useCodeBlockActionOptions', () => {
  it('triggers copy correctly', () => {
    const language = 'test-language'
    const defaultLanguage = 'default-language'
    const codeText = 'code text'
    const mockCopy = jest.fn()
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(content => mockCopy(content))
    const { updateAttributes, node } = mockBlockViewProps<CodeBlockOptions, CodeBlockAttributes>({
      node: {
        text: codeText
      }
    })
    const { result } = renderHook(() => useOptions(defaultLanguage, language, updateAttributes, node))

    const actionOptions = result.current[0].filter(
      item => typeof item !== 'string'
    ) as BlockActionsMenuProps['extraOptions']

    render(<BlockActionsMenu extraOptions={actionOptions} />)

    fireEvent.click(screen.getByText(`code_block.copy_code`))

    expect(mockCopy).toBeCalledWith(codeText)
  })

  it('filters language correctly', () => {
    const language = 'test-language'
    const defaultLanguage = 'default-language'
    const filterLanguage = 'javascript'
    const { updateAttributes, node } = mockBlockViewProps<CodeBlockOptions, CodeBlockAttributes>()
    const { result } = renderHook(() => useOptions(defaultLanguage, language, updateAttributes, node))

    const actionOptions = result.current[0].filter(
      item => typeof item !== 'string'
    ) as BlockActionsMenuProps['extraOptions']

    render(<BlockActionsMenu extraOptions={actionOptions} />)

    fireEvent.click(screen.getByText(`code_block.languages.${language}`))
    fireEvent.change(screen.getByPlaceholderText('code_block.search_placeholder'), {
      target: { value: filterLanguage }
    })

    const languageItem = result.current[0][0] as ToolbarGroupOption
    const filterLanguageItem = ((languageItem.items[0] as ToolbarSubMenuOption).items as ToolbarItemOption[])[1]

    expect(filterLanguageItem.name).toBe(filterLanguage)
  })

  it('selects language correctly', () => {
    const language = 'test-language'
    const defaultLanguage = 'default-language'
    const { updateAttributes, node } = mockBlockViewProps<CodeBlockOptions, CodeBlockAttributes>({
      node: {
        attrs: {
          language
        }
      }
    })
    const { result } = renderHook(() => useOptions(defaultLanguage, language, updateAttributes, node))

    const languageItem = result.current[0][0] as ToolbarGroupOption
    const defaultLanguageItem = ((languageItem.items[0] as ToolbarSubMenuOption).items as ToolbarItemOption[])[1]

    defaultLanguageItem.onAction?.('')

    expect(node.attrs.language).toBe(defaultLanguage)
  })
})
