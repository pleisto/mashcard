import { render } from '@testing-library/react'
import { Blurhash } from 'react-blurhash'

import { ImageWithSpin } from '../index'

jest.mock('react-blurhash')

describe('ImageWithSpin', () => {
  it(`matches snapshot correctly`, () => {
    const args = {
      src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
      alt: 'baidu',
      className: 'baidu-icon'
    }
    const { container } = render(<ImageWithSpin {...args} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it(`should show a blurred background instead of loading spinner when blurhash is provided`, () => {
    const args = {
      src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
      alt: 'baidu',
      className: 'baidu-icon',
      blurHash: 'LRE3@]RkxYV@00t7IVt7nNoL%2WV',
      style: { width: 100, height: 100 }
    }
    render(<ImageWithSpin {...args} />)
    expect(Blurhash).toHaveBeenCalled()
  })
})
