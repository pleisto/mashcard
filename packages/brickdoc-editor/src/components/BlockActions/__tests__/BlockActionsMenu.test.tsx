import { screen, render } from '@testing-library/react'
import { BlockActionsMenu, BlockActionsMenuProps } from '../BlockActionsMenu'

describe('BlockActionsMenu', () => {
  it(`matches snapshot correctly`, () => {
    const extraOptions: BlockActionsMenuProps['extraOptions'] = [
      {
        type: 'item',
        name: 'item',
        label: 'item',
        icon: <span>icon</span>
      },
      {
        type: 'subMenu',
        name: 'subMenu',
        label: 'subMenu',
        baseId: 'subMenu',
        items: [
          {
            type: 'item',
            name: 'menuItem',
            label: 'menuItem',
            icon: <span>menu item icon</span>
          }
        ]
      }
    ]

    const basicOptions: BlockActionsMenuProps['basicOptions'] = {
      type: 'group',
      items: [
        {
          type: 'item',
          name: 'delete',
          label: 'delete',
          icon: <span>delete</span>
        }
      ]
    }
    const { container } = render(
      <BlockActionsMenu baseId="menu" extraOptions={extraOptions} basicOptions={basicOptions} />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('puts extraOptions and basicOptions into menu correctly', () => {
    const extraOptions: BlockActionsMenuProps['extraOptions'] = [
      {
        type: 'item',
        name: 'item',
        label: 'item',
        icon: <span>icon</span>
      }
    ]

    const basicOptions: BlockActionsMenuProps['basicOptions'] = {
      type: 'group',
      items: [
        {
          type: 'item',
          name: 'delete',
          label: 'delete',
          icon: <span>delete</span>
        }
      ]
    }

    render(<BlockActionsMenu baseId="menu" extraOptions={extraOptions} basicOptions={basicOptions} />)

    expect(screen.getByLabelText('item')).toBeInTheDocument()
    expect(screen.getByLabelText('delete')).toBeInTheDocument()
  })
})
