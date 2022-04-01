import { render } from '@testing-library/react'
import { Drawer } from '../Drawer'

describe('Drawer', () => {
  it('renders Drawer visible correctly', () => {
    const { baseElement } = render(<Drawer visible={true}>drawer content</Drawer>)

    expect(baseElement).toMatchSnapshot()
  })
})
