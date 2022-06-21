import { SubPageMenuView } from '../SubPageMenuView'
import { render } from '@testing-library/react'
import { mockBlockViewProps } from '../../../../test'
import { SubPageMenuAttributes, SubPageMenuOptions } from '../../../../extensions'

describe('SubPageMenuView', () => {
  it('matches correct snapshot', () => {
    const props = mockBlockViewProps<SubPageMenuOptions, SubPageMenuAttributes>({
      extension: {
        options: {
          renderView: () => <div>page tree</div>
        }
      }
    })

    const { container } = render(<SubPageMenuView {...props} />)
    expect(container).toMatchSnapshot()
  })
})
