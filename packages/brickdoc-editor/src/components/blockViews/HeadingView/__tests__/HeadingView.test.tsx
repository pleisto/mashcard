import { render } from '@testing-library/react'
import { HeadingView } from '../HeadingView'

describe('HeadingView', () => {
  const uuid = 'uuid'
  const props: any = {
    editor: {},
    node: {
      attrs: {
        uuid,
        level: 1
      }
    },
    updateAttributes: () => {}
  }
  it(`matches snapshot correctly`, () => {
    const { container } = render(<HeadingView {...(props as any)} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it(`renders correspond heading according to level`, () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          uuid,
          level: 2
        }
      },
      updateAttributes: () => {}
    }
    const { container } = render(<HeadingView {...(props as any)} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
