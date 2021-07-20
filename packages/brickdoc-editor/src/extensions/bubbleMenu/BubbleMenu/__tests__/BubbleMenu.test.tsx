import * as React from 'react'
import {} from '@tiptap/core'
import { mount } from 'enzyme'
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

      return target[prop]
    }
  })
}

describe('BubbleMenu', () => {
  it('renders nothing if `editor` is not ready', () => {
    const bubbleMenu = mount(<BubbleMenu editor={null} />)

    expect(bubbleMenu.find('.brickdoc-bubble-menu').length).toBe(0)
  })

  it('renders normally if `editor` is supplied', () => {
    const editor = mockEditor()
    const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

    expect(bubbleMenu.find('.brickdoc-bubble-menu').length).toBe(1)
    expect(bubbleMenu.find('button.bubble-menu-item').length).toBe(10)
  })

  it('click Heading1', () => {
    const editor = mockEditor()
    const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

    const item = bubbleMenu.find('button.bubble-menu-item').at(0)
    item.simulate('click')

    expect(editor.toggleHeading).toBeCalledTimes(1)
    expect(editor.toggleHeading).toBeCalledWith({ level: 1 })
  })

  it('click Heading2', () => {
    const editor = mockEditor()
    const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

    const item = bubbleMenu.find('button.bubble-menu-item').at(1)
    item.simulate('click')

    expect(editor.toggleHeading).toBeCalledTimes(1)
    expect(editor.toggleHeading).toBeCalledWith({ level: 2 })
  })

  it('click Heading3', () => {
    const editor = mockEditor()
    const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

    const item = bubbleMenu.find('button.bubble-menu-item').at(2)
    item.simulate('click')

    expect(editor.toggleHeading).toBeCalledTimes(1)
    expect(editor.toggleHeading).toBeCalledWith({ level: 3 })
  })

  it('click Bold', () => {
    const editor = mockEditor()
    const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

    const item = bubbleMenu.find('button.bubble-menu-item').at(3)
    item.simulate('click')

    expect(editor.toggleBold).toBeCalledTimes(1)
  })

  it('click Italic', () => {
    const editor = mockEditor()
    const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

    const item = bubbleMenu.find('button.bubble-menu-item').at(4)
    item.simulate('click')

    expect(editor.toggleItalic).toBeCalledTimes(1)
  })

  it('click Underline', () => {
    const editor = mockEditor()
    const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

    const item = bubbleMenu.find('button.bubble-menu-item').at(5)
    item.simulate('click')

    expect(editor.toggleUnderline).toBeCalledTimes(1)
  })

  it('click Strike', () => {
    const editor = mockEditor()
    const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

    const item = bubbleMenu.find('button.bubble-menu-item').at(6)
    item.simulate('click')

    expect(editor.toggleStrike).toBeCalledTimes(1)
  })

  it('click Bullet List', () => {
    const editor = mockEditor()
    const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

    const item = bubbleMenu.find('button.bubble-menu-item').at(8)
    item.simulate('click')

    expect(editor.toggleBulletList).toBeCalledTimes(1)
  })

  it('click Ordered List', () => {
    const editor = mockEditor()
    const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

    const item = bubbleMenu.find('button.bubble-menu-item').at(9)
    item.simulate('click')

    expect(editor.toggleOrderedList).toBeCalledTimes(1)
  })

  it('active class', () => {
    const editor = mockEditor()
    editor.isActive = (value: string, options: any) => value === 'heading' && options.level === 1
    const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

    const item = bubbleMenu.find('button.bubble-menu-item').at(0)
    expect(item.hasClass('active')).toBeTruthy()

    const item2 = bubbleMenu.find('button.bubble-menu-item').at(1)
    expect(item2.hasClass('active')).toBeFalsy()
  })

  describe('Font Color', () => {
    it('show up menu', () => {
      const editor = mockEditor()
      const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

      expect(bubbleMenu.find('.brickdoc-bubble-font-menu-list').length).toBe(0)

      const item = bubbleMenu.find('button.bubble-menu-item').at(7)
      item.simulate('click')

      expect(bubbleMenu.find('.brickdoc-bubble-font-menu-list').length).toBe(1)
    })

    it('select font color', () => {
      const editor = mockEditor()
      const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

      const item = bubbleMenu.find('button.bubble-menu-item').at(7)
      item.simulate('click')

      const colorItem = bubbleMenu.find('button.font-menu-item').at(1)
      colorItem.simulate('click')

      expect(editor.setFontColor).toBeCalledTimes(1)
      expect(editor.setFontColor).toHaveBeenCalledWith('#A6A6A6')
    })

    it('active class', () => {
      const color = '#A6A6A6'
      const editor = mockEditor()
      editor.isActive = (value: string, options: any) => value === 'textStyle' && options.fontColor === color
      const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

      const item = bubbleMenu.find('button.bubble-menu-item').at(7).find('.font-menu-item-icon').at(0)

      expect(item.prop('style').color).toEqual(color)
    })

    it('last selected color', () => {
      const color = 'Gray'
      const editor = mockEditor()
      const bubbleMenu = mount(<BubbleMenu editor={editor as any} />)

      const item = bubbleMenu.find('button.bubble-menu-item').at(7)
      item.simulate('click')

      bubbleMenu.find('button.font-menu-item').at(1).simulate('click')
      bubbleMenu.find('button.font-menu-item').at(2).simulate('click')

      const lastColor = bubbleMenu.find('.brickdoc-bubble-font-menu-list').at(0).find('.font-menu-item-label').at(0).text()
      expect(lastColor).toEqual(color)
    })
  })
})
