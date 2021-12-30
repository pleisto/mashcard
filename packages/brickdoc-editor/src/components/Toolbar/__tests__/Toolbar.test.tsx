import { fireEvent, render, screen } from '@testing-library/react'
import { ToolbarOptionGroup } from '..'
import { Toolbar } from '../Toolbar'

describe('Toolbar', () => {
  it(`matches snapshot correctly`, () => {
    const options: ToolbarOptionGroup = [
      {
        type: 'group',
        items: [
          {
            type: 'item',
            name: 'item',
            icon: <span>item</span>
          },
          {
            type: 'dropdown',
            name: 'dropdown',
            label: 'dropdown',
            items: [
              {
                type: 'item',
                name: 'dropdown item'
              }
            ]
          }
        ]
      },
      {
        type: 'item',
        name: 'item2',
        icon: <span>item2</span>
      }
    ]
    const { container } = render(<Toolbar options={options} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders separator correctly', () => {
    const options: ToolbarOptionGroup = [
      {
        type: 'group',
        items: [
          {
            type: 'item',
            name: 'item1'
          }
        ]
      },
      {
        type: 'group',
        items: [
          {
            type: 'item',
            name: 'item2'
          }
        ]
      },
      {
        type: 'group',
        items: [
          {
            type: 'item',
            name: 'item3'
          }
        ]
      }
    ]
    render(<Toolbar options={options} />)

    expect(screen.getAllByLabelText('toolbar.separator')).toHaveLength(2)
  })

  it('fires onAction event on item normally', () => {
    const onAction = jest.fn()
    const name = 'item'
    const options: ToolbarOptionGroup = [
      {
        type: 'item',
        name,
        icon: <span>{name}</span>,
        onAction
      }
    ]
    render(<Toolbar options={options} />)

    fireEvent.click(screen.getByText(name))

    expect(onAction).toBeCalledWith(name)
  })
})
