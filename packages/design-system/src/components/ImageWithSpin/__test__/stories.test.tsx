import { render } from '@testing-library/react'
import { ImageWithSpin } from '../index'

describe('tag', () => {
  it(`matches snapshot correctly`, () => {
    const args = {
      src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
      alt: 'baidu',
      className: 'baidu-icon'
    }
    const { container } = render(<ImageWithSpin {...args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
