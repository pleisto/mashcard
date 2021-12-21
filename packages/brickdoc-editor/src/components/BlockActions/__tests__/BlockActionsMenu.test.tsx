import { screen, render } from '@testing-library/react'
import { BlockActionsMenu, BlockActionsMenuProps } from '../BlockActionsMenu'

describe('BlockActionsMenu', () => {
  it(`matches snapshot correctly`, () => {
    const extraOptions: BlockActionsMenuProps['extraOptions'] = [
      {
        type: 'item',
        name: 'item',
        icon: <span>icon</span>
      },
      {
        type: 'dropdown',
        name: 'dropdown',
        menuItems: [
          {
            type: 'item',
            name: 'menuItem',
            icon: <span>menu item icon</span>
          }
        ]
      }
    ]

    const basicOptions: BlockActionsMenuProps['basicOptions'] = [
      {
        type: 'item',
        name: 'delete',
        icon: <span>delete</span>
      }
    ]
    const { container } = render(<BlockActionsMenu extraOptions={extraOptions} basicOptions={basicOptions} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('puts basicOptions into a dropdown menu item', () => {
    const extraOptions: BlockActionsMenuProps['extraOptions'] = [
      {
        type: 'item',
        name: 'item',
        icon: <span>icon</span>
      }
    ]

    const basicOptions: BlockActionsMenuProps['basicOptions'] = [
      {
        type: 'item',
        name: 'delete',
        icon: <span>delete</span>
      }
    ]

    render(<BlockActionsMenu extraOptions={extraOptions} basicOptions={basicOptions} />)

    expect(screen.getByLabelText('more')).toBeInTheDocument()
  })

  it('fills extraOptions by basicOptions when extraOptions is empty', () => {
    const extraOptions: BlockActionsMenuProps['extraOptions'] = []

    const name = 'delete'

    const basicOptions: BlockActionsMenuProps['basicOptions'] = [
      {
        type: 'item',
        name,
        icon: <span>{name}</span>
      }
    ]

    render(<BlockActionsMenu extraOptions={extraOptions} basicOptions={basicOptions} />)

    expect(screen.getByText(name)).toBeInTheDocument()
  })
})
