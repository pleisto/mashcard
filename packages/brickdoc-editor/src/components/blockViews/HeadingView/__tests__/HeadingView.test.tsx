import { render } from '@testing-library/react'
import { HeadingOptions, HeadingAttributes } from '../../../../extensions/blocks/heading/meta'
import { mockBlockViewProps } from '../../../common/tests'
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

    expect(container).toMatchSnapshot()
  })

  describe(`renders correspond heading according to level`, () => {
    it('level 2', () => {
      const props = mockBlockViewProps<HeadingOptions, HeadingAttributes>({
        node: {
          attrs: {
            level: 2
          }
        }
      })
      const { container } = render(<HeadingView {...props} />)

      expect(container).toMatchSnapshot()
    })

    it('level 3', () => {
      const props = mockBlockViewProps<HeadingOptions, HeadingAttributes>({
        node: {
          attrs: {
            level: 3
          }
        }
      })
      const { container } = render(<HeadingView {...props} />)

      expect(container).toMatchSnapshot()
    })

    it('level 4', () => {
      const props = mockBlockViewProps<HeadingOptions, HeadingAttributes>({
        node: {
          attrs: {
            level: 4
          }
        }
      })
      const { container } = render(<HeadingView {...props} />)

      expect(container).toMatchSnapshot()
    })

    it('level 5', () => {
      const props = mockBlockViewProps<HeadingOptions, HeadingAttributes>({
        node: {
          attrs: {
            level: 5
          }
        }
      })
      const { container } = render(<HeadingView {...props} />)

      expect(container).toMatchSnapshot()
    })
  })
})
