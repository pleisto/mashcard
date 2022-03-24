import { render } from '@testing-library/react'
import { HeadingOptions, HeadingAttributes } from '../../../../extensions/blocks/heading/meta'
import { mockBlockViewProps } from '../../common/tests'
import { HeadingView } from '../HeadingView'

describe('HeadingView', () => {
  it(`matches snapshot correctly`, () => {
    const props = mockBlockViewProps<HeadingOptions, HeadingAttributes>({
      node: {
        attrs: {
          level: 1
        }
      }
    })
    const { container } = render(<HeadingView {...props} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it(`renders correspond heading according to level`, () => {
    const props = mockBlockViewProps<HeadingOptions, HeadingAttributes>({
      node: {
        attrs: {
          level: 2
        }
      }
    })
    const { container } = render(<HeadingView {...props} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
