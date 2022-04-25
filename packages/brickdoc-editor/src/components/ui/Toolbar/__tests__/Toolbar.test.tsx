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
            name: 'item1',
            label: 'item1',
            tooltip: true,
            icon: <span>item1</span>
          },
          {
            type: 'item',
            name: 'item2',
            label: 'item2',
            tooltip: 'tooltip',
            icon: <span>item2</span>
          },
          {
            type: 'item',
            name: 'item3',
            label: 'item3',
            tooltip: {
              title: 'tooltip title',
              description: 'tooltip description'
            },
            icon: <span>item3</span>
          },
          {
            type: 'subMenu',
            name: 'subMenu renderItems',
            label: 'subMenu renderItems',
            items: () => <span>subMenu render items</span>
          },
          {
            type: 'subMenu',
            name: 'subMenu',
            label: 'subMenu',
            items: [
              {
                type: 'item',
                name: 'subMenu item'
              },
              {
                type: 'group',
                items: [
                  {
                    type: 'item',
                    name: 'group item inside subMenu'
                  }
                ]
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

    expect(container).toMatchSnapshot()
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
