import { render } from '@testing-library/react'
import { CalloutAttributes, CalloutOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../../../test'
import { CalloutView } from '../CalloutView'

describe('CalloutView', () => {
  it('renders CalloutView with emoji icon correctly', () => {
    const props = mockBlockViewProps<CalloutOptions, CalloutAttributes>({
      node: {
        attrs: {
          icon: {
            type: 'EMOJI',
            name: 'name',
            emoji: 'emoji'
          }
        }
      }
    })
    const { container } = render(<CalloutView {...props} />)

    expect(container).toMatchSnapshot()
  })
})
