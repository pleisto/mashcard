import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { ParagraphAttributes, ParagraphOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../../common/tests'
import { usePlaceholder } from '../usePlaceholder'

jest.useFakeTimers()

describe('ParagraphView > usePlaceholder', () => {
  it('shows placeholder normally', () => {
    const { editor, node } = mockBlockViewProps<ParagraphOptions, ParagraphAttributes>()

    const { result } = renderHook(() => usePlaceholder(editor, node, () => 1))

    act(() => {
      jest.runAllTimers()
    })

    const [placeholder] = result.current

    expect(placeholder).not.toEqual('')
  })

  it('hides placeholder when content is not empty', () => {
    const { editor, node } = mockBlockViewProps<ParagraphOptions, ParagraphAttributes>({
      node: {
        childCount: 1
      }
    })

    const { result } = renderHook(() => usePlaceholder(editor, node, () => 1))

    act(() => {
      jest.runAllTimers()
    })

    const [placeholder] = result.current

    expect(placeholder).toEqual('')
  })
})
