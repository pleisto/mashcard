import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BubbleMenu } from '../BubbleMenu'

interface MockEditor {
  isActive: (value: string, options: any) => boolean
  chain: () => MockEditor
  focus: () => MockEditor
  run: () => MockEditor
  toggleHeading: jest.Mock
  toggleBold: jest.Mock
  toggleStrike: jest.Mock
  toggleItalic: jest.Mock
  toggleBulletList: jest.Mock
  toggleOrderedList: jest.Mock
  toggleUnderline: jest.Mock
  setFontColor: jest.Mock
}

function mockEditor(): MockEditor {
  const editor: MockEditor = {
    chain: () => editor,
    focus: () => editor,
    run: () => editor,
    isActive: () => false,
    toggleHeading: jest.fn(),
    toggleBold: jest.fn(),
    toggleStrike: jest.fn(),
    toggleItalic: jest.fn(),
    toggleBulletList: jest.fn(),
    toggleOrderedList: jest.fn(),
    toggleUnderline: jest.fn(),
    setFontColor: jest.fn()
  }

  editor.toggleHeading = editor.toggleHeading.mockReturnValue(editor)
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
  it('matches correct snapshot', () => {
    const editor = mockEditor()

    const { container } = render(<BubbleMenu editor={editor as any} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  it('renders nothing if `editor` is not ready', () => {
    render(<BubbleMenu editor={null} />)

    expect(() => screen.getByRole('menu', byRoleOptions)).toThrow()
  })

  it('renders normally if `editor` is supplied', () => {
    const editor = mockEditor()
    render(<BubbleMenu editor={editor as any} />)

    expect(screen.getByRole('menu', byRoleOptions)).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem', byRoleOptions)).toHaveLength(10)
  })

  it('makes menu item active when editor mark it as active', () => {
    const editor = mockEditor()
    editor.isActive = (value: string, options: any) => value === 'heading' && options.level === 1
    render(<BubbleMenu editor={editor as any} />)

    const activeIndex = 0
    const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
    const item = menuItems[activeIndex]
    expect(item).toHaveClass('active')

    menuItems.forEach((item, index) => {
      if (index === activeIndex) return

      expect(item).not.toHaveClass('active')
    })
  })

  it('clicking Heading1 will toggle Heading1', () => {
    const editor = mockEditor()
    render(<BubbleMenu editor={editor as any} />)

    const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
    fireEvent.click(menuItems[0])

    expect(editor.toggleHeading).toBeCalledTimes(1)
    expect(editor.toggleHeading).toBeCalledWith({ level: 1 })
  })

  it('clicking Heading2 will toggle Heading2', () => {
    const editor = mockEditor()
    render(<BubbleMenu editor={editor as any} />)

    const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
    fireEvent.click(menuItems[1])

    expect(editor.toggleHeading).toBeCalledTimes(1)
    expect(editor.toggleHeading).toBeCalledWith({ level: 2 })
  })

  it('clicking Heading3 will toggle Heading3', () => {
    const editor = mockEditor()
    render(<BubbleMenu editor={editor as any} />)

    const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
    fireEvent.click(menuItems[2])

    expect(editor.toggleHeading).toBeCalledTimes(1)
    expect(editor.toggleHeading).toBeCalledWith({ level: 3 })
  })

  it('clicking Bold will toggle bold mark', () => {
    const editor = mockEditor()
    render(<BubbleMenu editor={editor as any} />)

    const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
    fireEvent.click(menuItems[3])

    expect(editor.toggleBold).toBeCalledTimes(1)
  })

  it('clicking Italic will toggle italic mark', () => {
    const editor = mockEditor()
    render(<BubbleMenu editor={editor as any} />)

    const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
    fireEvent.click(menuItems[4])

    expect(editor.toggleItalic).toBeCalledTimes(1)
  })

  it('clicking Underline will toggle underline mark', () => {
    const editor = mockEditor()
    render(<BubbleMenu editor={editor as any} />)

    const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
    fireEvent.click(menuItems[5])

    expect(editor.toggleUnderline).toBeCalledTimes(1)
  })

  it('clicking Strike will toggle strike mark', () => {
    const editor = mockEditor()
    render(<BubbleMenu editor={editor as any} />)

    const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
    fireEvent.click(menuItems[6])

    expect(editor.toggleStrike).toBeCalledTimes(1)
  })

  it('clicking Bullet List will toggle bullet list', () => {
    const editor = mockEditor()
    render(<BubbleMenu editor={editor as any} />)

    const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
    fireEvent.click(menuItems[8])

    expect(editor.toggleBulletList).toBeCalledTimes(1)
  })

  it('click Ordered List', () => {
    const editor = mockEditor()
    render(<BubbleMenu editor={editor as any} />)

    const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
    fireEvent.click(menuItems[9])

    expect(editor.toggleOrderedList).toBeCalledTimes(1)
  })

  describe('Font Color', () => {
    it('shows up font color list when clicking menu item', () => {
      const editor = mockEditor()
      render(<BubbleMenu editor={editor as any} />)

      expect(() => screen.getByText('Color')).toThrow()

      const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
      fireEvent.click(menuItems[7])

      expect(screen.getByText('Color')).toBeInTheDocument()
    })

    it('selects font color normally', () => {
      const editor = mockEditor()
      render(<BubbleMenu editor={editor as any} />)

      const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
      fireEvent.click(menuItems[7])

      const colorItem = screen.getByText('Gray')
      fireEvent.click(colorItem)

      expect(editor.setFontColor).toBeCalledTimes(1)
      expect(editor.setFontColor).toHaveBeenCalledWith('#A6A6A6')
    })

    it('makes color item active when editor mark it as active', () => {
      const color = '#A6A6A6'
      const editor = mockEditor()
      editor.isActive = (value: string, options: any) => value === 'textStyle' && options.fontColor === color
      render(<BubbleMenu editor={editor as any} />)

      const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
      const item = menuItems[7]

      expect(item.firstChild).toHaveStyle({ color })
    })

    it('remains latest selected color', () => {
      const color = 'Gray'
      const secondColor = 'Cyan'
      const editor = mockEditor()
      render(<BubbleMenu editor={editor as any} />)

      const menuItems = screen.getAllByRole('menuitem', byRoleOptions)
      fireEvent.click(menuItems[7])

      fireEvent.click(screen.getByText(color))
      fireEvent.click(screen.getByText(secondColor))

      const lastUsedLabel = screen.getByText('Last Used')
      expect(lastUsedLabel.nextSibling).toHaveTextContent(color)
    })
  })
})
