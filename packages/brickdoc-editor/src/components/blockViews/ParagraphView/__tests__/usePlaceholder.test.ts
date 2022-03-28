import { useRef } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { ParagraphAttributes, ParagraphOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../../common/tests'
import { usePlaceholder } from '../usePlaceholder'
import * as editableHooks from '../../../../hooks/useDocumentEditable'

describe('ParagraphView > usePlaceholder', () => {
  it('shows placeholder normally', () => {
    jest.spyOn(editableHooks, 'useDocumentEditable').mockImplementation(() => [true])
    const { editor, extension, node } = mockBlockViewProps<ParagraphOptions, ParagraphAttributes>({
      editor: {
        state: {
          selection: {
            anchor: 1,
            $from: {
              depth: 0
            }
          }
        }
      }
    })

    const p = document.createElement('p')
    p.setAttribute('data-node-view-content', '')
    const dom = document.createElement('div')
    dom.appendChild(p)
    const getPos = (): number => 1

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(dom)
      return usePlaceholder(editor, extension, node, ref, getPos)
    })

    expect(p.getAttribute('data-placeholder')).toEqual('placeholder')
  })

  it('hides placeholder when content is not empty', () => {
    jest.spyOn(editableHooks, 'useDocumentEditable').mockImplementation(() => [true])
    const { editor, extension, node } = mockBlockViewProps<ParagraphOptions, ParagraphAttributes>({
      node: {
        childCount: 1
      }
    })

    const p = document.createElement('p')
    p.setAttribute('data-node-view-content', '')
    p.textContent = 'p'
    const dom = document.createElement('div')
    dom.appendChild(p)
    const getPos = (): number => 1

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(dom)
      return usePlaceholder(editor, extension, node, ref, getPos)
    })

    expect(p.getAttribute('data-placeholder') ?? '').toEqual('')
  })
})
