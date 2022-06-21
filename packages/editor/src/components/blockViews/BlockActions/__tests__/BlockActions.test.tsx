import { render } from '@testing-library/react'
import { BlockActionsProps } from '../BlockActions'
import { BlockActions } from '../index'

describe('BlockActions', () => {
  it(`matches snapshot correctly`, () => {
    const options: BlockActionsProps['options'] = [
      {
        type: 'item',
        name: 'item',
        label: 'item',
        icon: <span>icon</span>
      },
      {
        type: 'group',
        items: [
          {
            type: 'item',
            name: 'menuItem',
            label: 'menuItem',
            icon: <span>menu item icon</span>
          }
        ]
      },
      'delete'
    ]

    const { container } = render(<BlockActions baseId="menu" options={options} />)

    expect(container).toMatchSnapshot()
  })
})
