import { render } from '@testing-library/react'
import { BulletList, OrderedList, TaskList } from '../../../../extensions'
import { mockBlockViewProps } from '../../../../test'
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

  it(`renders as task list`, () => {
    const props = mockBlockViewProps<{}, {}>({
      node: {
        type: {
          name: TaskList.name
        }
      }
    })
    const { container } = render(<ListView {...props} />)

    expect(container).toMatchSnapshot()
  })
})
