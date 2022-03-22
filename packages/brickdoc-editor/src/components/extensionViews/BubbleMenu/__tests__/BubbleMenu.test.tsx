import { render, screen } from '@testing-library/react'
import { BubbleMenu } from '../BubbleMenu'

interface MockEditor {
  isActive: (value: string, options: any) => boolean
  chain: () => MockEditor
  focus: () => MockEditor
  run: () => MockEditor
  setHeading: jest.Mock
  toggleBold: jest.Mock
  toggleStrike: jest.Mock
  toggleItalic: jest.Mock
  toggleBulletList: jest.Mock
  toggleOrderedList: jest.Mock
  toggleUnderline: jest.Mock
  setFontColor: jest.Mock
  state: {
    schema: {
      nodes: {}
    }
    selection: {
      from: number
      to: number
    }
  }
}

function mockEditor(): MockEditor {
  const editor: MockEditor = {
    chain: () => editor,
    focus: () => editor,
    run: () => editor,
    isActive: () => false,
    setHeading: jest.fn(),
    toggleBold: jest.fn(),
    toggleStrike: jest.fn(),
    toggleItalic: jest.fn(),
    toggleBulletList: jest.fn(),
    toggleOrderedList: jest.fn(),
    toggleUnderline: jest.fn(),
    setFontColor: jest.fn(),
    state: {
      schema: {
        nodes: new Proxy(
          {},
          {
            get(target, prop) {
              return prop
            }
          }
        )
      },
      selection: {
        from: 0,
        to: 1
      }
    }
  }

  editor.setHeading = editor.setHeading.mockReturnValue(editor)
  editor.toggleBold = editor.toggleBold.mockReturnValue(editor)
  editor.toggleStrike = editor.toggleStrike.mockReturnValue(editor)
  editor.toggleItalic = editor.toggleItalic.mockReturnValue(editor)
  editor.toggleBulletList = editor.toggleBulletList.mockReturnValue(editor)
  editor.toggleOrderedList = editor.toggleOrderedList.mockReturnValue(editor)
  editor.toggleUnderline = editor.toggleUnderline.mockReturnValue(editor)
  editor.setFontColor = editor.setFontColor.mockReturnValue(editor)

  return new Proxy<MockEditor>(editor, {
    get(target, prop) {
      if (!(prop in target)) {
        return () => this
      }

      // @ts-expect-error
      return target[prop]
    }
  })
}

describe('BubbleMenu', () => {
  const byRoleOptions = { hidden: true }
  it('renders nothing if `editor` is not ready', () => {
    render(<BubbleMenu editor={null} />)

    expect(() => screen.getByRole('menu', byRoleOptions)).toThrow()
  })

  it('renders normally if `editor` is supplied', () => {
    const editor = mockEditor()
    render(<BubbleMenu editor={editor as any} />)

    expect(screen.getByRole('menu', byRoleOptions)).toBeInTheDocument()
  })

  it('renders nothing if editor selection is empty', () => {
    const editor = mockEditor()
    editor.state.selection.from = 1
    editor.state.selection.to = 1

    render(<BubbleMenu editor={editor as any} />)

    expect(() => screen.getByRole('menu', byRoleOptions)).toThrow()
  })
})
