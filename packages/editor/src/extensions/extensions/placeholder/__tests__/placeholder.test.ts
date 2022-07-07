import { PlaceholderOptions, updatePlaceholder } from '../..'
import { mockEditor } from '../../../../test'
import { CodeBlock, Embed, Heading, Paragraph } from '../../../blocks'
import * as helpers from '../findWrapper'

jest.mock('../findWrapper')

describe('Placeholder', () => {
  it('does not update placeholder if editor is not editable', () => {
    jest.spyOn(helpers, 'findWrapper').mockImplementation(() => undefined)

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
    jest.spyOn(helpers, 'findWrapper').mockImplementation(() => undefined)

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

  it('updates placeholder in heading correctly', () => {
    jest.spyOn(helpers, 'findWrapper').mockImplementation(() => undefined)

    const h1 = document.createElement('h1')
    h1.setAttribute('data-node-view-content', '')
    const text = document.createElement('span')
    h1.appendChild(text)

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
                name: Heading.name
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

    expect(h1.getAttribute('data-placeholder')).toBe(options.placeholder)
  })

  it('updates placeholder in code block correctly', () => {
    jest.spyOn(helpers, 'findWrapper').mockImplementation(() => undefined)

    const code = document.createElement('code')
    code.setAttribute('data-node-view-content', '')
    const text = document.createElement('span')
    code.appendChild(text)

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
                name: CodeBlock.name
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

    expect(code.getAttribute('data-placeholder')).toBe(options.placeholder)
  })

  it('updates placeholder in paragraph correctly', () => {
    jest.spyOn(helpers, 'findWrapper').mockImplementation(() => undefined)

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
    jest.spyOn(helpers, 'findWrapper').mockImplementation(() => undefined)

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
    jest.spyOn(helpers, 'findWrapper').mockImplementation(() => undefined)

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
    jest.spyOn(helpers, 'findWrapper').mockImplementation(() => undefined)

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
