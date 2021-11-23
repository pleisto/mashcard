import { render, screen, fireEvent } from '@testing-library/react'
import { PagePanel, PagePanelProps } from '../MentionMenu/PagePanel/PagePanel'

describe('MentionMenuPagePanel', () => {
  const items: PagePanelProps['items'] = [
    {
      name: 'page name 0',
      icon: 'icon 0',
      command: jest.fn()
    },
    {
      name: 'page name 1',
      icon: 'icon 1',
      command: jest.fn()
    },
    {
      name: 'page name 2',
      icon: null,
      command: jest.fn()
    }
  ]

  const props: any = {
    items
  }

  it('matches correct snapshot', () => {
    const { container } = render(<PagePanel {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders page items normally', () => {
    render(<PagePanel {...props} />)
    expect(screen.getAllByRole('menuitem')).toHaveLength(items.length)
  })

  it('renders active item correspond to active index', () => {
    const activeIndex = 1
    render(<PagePanel {...props} active={true} activeIndex={activeIndex} />)
    const items = screen.getAllByRole('menuitem')

    expect(items[activeIndex]).toHaveClass('active')
  })

  it('handles item onSelect correctly', () => {
    const editor: any = {}
    const range = { from: 1, to: 2 }

    render(<PagePanel {...props} editor={editor} range={range} />)

    const menuItems = screen.getAllByRole('menuitem')

    fireEvent.click(menuItems[0])

    expect(items[0].command).toBeCalledWith(editor, range)
  })
})
