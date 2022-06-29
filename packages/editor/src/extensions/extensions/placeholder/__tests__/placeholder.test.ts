import { PlaceholderOptions, updatePlaceholder } from '../..'
import { mockEditor } from '../../../../test'
import { Embed, Paragraph } from '../../../blocks'
import * as helpers from '../findParagraphWrapper'

jest.mock('../findParagraphWrapper')

describe('Placeholder', () => {
  it('does not update placeholder if editor is not editable', () => {
    jest.spyOn(helpers, 'findParagraphWrapper').mockImplementation(() => undefined)

    const paragraph = document.createElement('p')
    paragraph.setAttribute('data-placeholder', '')

    const editor = mockEditor({
      isEditable: false
    })
    const options: PlaceholderOptions = {
      placeholder: 'placeholder'
    }
    const storage = {}
    updatePlaceholder(editor, options, storage)

    expect(paragraph.getAttribute('data-placeholder')).toBe('')
  })

  it('does not throw error if can not find paragraph dom', () => {
    jest.spyOn(helpers, 'findParagraphWrapper').mockImplementation(() => undefined)

    const text = document.createElement('span')

    const editor = mockEditor({
      view: {
        domAtPos: () => ({
          node: text
        })
      },
      state: {
        selection: {
          anchor: 1,
          $anchor: {
            node: () => ({
              type: {
                name: Paragraph.name
              },
              isLeaf: false,
              childCount: 0
            })
          }
        }
      }
    })
    const options: PlaceholderOptions = {
      placeholder: 'placeholder'
    }
    const storage = {}

    expect(() => updatePlaceholder(editor, options, storage)).not.toThrow()
  })

  it('updates placeholder correctly', () => {
    jest.spyOn(helpers, 'findParagraphWrapper').mockImplementation(() => undefined)

    const paragraph = document.createElement('p')
    paragraph.setAttribute('data-node-view-content', '')
    const text = document.createElement('span')
    paragraph.appendChild(text)

    const editor = mockEditor({
      view: {
        domAtPos: () => ({
          node: text
        })
      },
      state: {
        selection: {
          anchor: 1,
          $anchor: {
            node: () => ({
              type: {
                name: Paragraph.name
              },
              isLeaf: false,
              childCount: 0
            })
          }
        }
      }
    })
    const options: PlaceholderOptions = {
      placeholder: 'placeholder'
    }
    const storage = {}
    updatePlaceholder(editor, options, storage)

    expect(paragraph.getAttribute('data-placeholder')).toBe(options.placeholder)
  })

  it('updates placeholder correctly if focus deep inside paragraph', () => {
    jest.spyOn(helpers, 'findParagraphWrapper').mockImplementation(() => undefined)

    const paragraph = document.createElement('p')
    paragraph.setAttribute('data-node-view-content', '')
    const textWrapper = document.createElement('span')
    const text = document.createElement('span')
    textWrapper.appendChild(text)
    paragraph.appendChild(textWrapper)

    const editor = mockEditor({
      view: {
        domAtPos: () => ({
          node: text
        })
      },
      state: {
        selection: {
          anchor: 1,
          $anchor: {
            node: () => ({
              type: {
                name: Paragraph.name
              },
              isLeaf: false,
              childCount: 0
            })
          }
        }
      }
    })
    const options: PlaceholderOptions = {
      placeholder: 'placeholder'
    }
    const storage = {}
    updatePlaceholder(editor, options, storage)

    expect(paragraph.getAttribute('data-placeholder')).toBe(options.placeholder)
  })

  it('clears placeholder correctly when focus another paragraph', () => {
    jest.spyOn(helpers, 'findParagraphWrapper').mockImplementation(() => undefined)

    const latestFocusedElement = document.createElement('p')
    latestFocusedElement.setAttribute('data-placeholder', 'placeholder')
    const paragraph = document.createElement('p')
    paragraph.setAttribute('data-node-view-content', '')
    const text = document.createElement('span')
    paragraph.appendChild(text)

    const editor = mockEditor({
      view: {
        domAtPos: () => ({
          node: text
        })
      },
      state: {
        selection: {
          anchor: 1,
          $anchor: {
            node: () => ({
              type: {
                name: Paragraph.name
              },
              isLeaf: false,
              childCount: 0
            })
          }
        }
      }
    })
    const options = {
      placeholder: () => 'placeholder'
    }
    const storage = {
      latestFocusedElement
    }
    updatePlaceholder(editor, options, storage)

    expect(paragraph.getAttribute('data-placeholder')).toBe(options.placeholder())
    expect(latestFocusedElement.getAttribute('data-placeholder')).toBe('')
  })

  it('clears placeholder correctly when focus another block', () => {
    jest.spyOn(helpers, 'findParagraphWrapper').mockImplementation(() => undefined)

    const latestFocusedElement = document.createElement('p')
    latestFocusedElement.setAttribute('data-placeholder', 'placeholder')
    const text = document.createElement('span')

    const editor = mockEditor({
      view: {
        domAtPos: () => ({
          node: text
        })
      },
      state: {
        selection: {
          anchor: 1,
          $anchor: {
            node: () => ({
              type: {
                name: Embed.name
              },
              isLeaf: false,
              childCount: 0
            })
          }
        }
      }
    })
    const options: PlaceholderOptions = {
      placeholder: 'placeholder'
    }
    const storage = {
      latestFocusedElement
    }
    updatePlaceholder(editor, options, storage)

    expect(latestFocusedElement.getAttribute('data-placeholder')).toBe('')
  })
})
