import { render } from '@testing-library/react'
import { BulletList, OrderedList } from '../../../../extensions'
import { mockBlockViewProps } from '../../../common/tests'
import { ListView } from '../ListView'

describe('ListView', () => {
  it(`renders as bullet list`, () => {
    const props = mockBlockViewProps<{}, {}>({
      node: {
        type: {
          name: BulletList.name
        }
      }
    })
    const { container } = render(<ListView {...props} />)

    expect(container).toMatchSnapshot()
  })

  it(`renders as ordered list`, () => {
    const props = mockBlockViewProps<{}, {}>({
      node: {
        type: {
          name: OrderedList.name
        }
      }
    })
    const { container } = render(<ListView {...props} />)

    expect(container).toMatchSnapshot()
  })
})
