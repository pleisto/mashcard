import { render } from '@testing-library/react'
import { uuid } from '@mashcard/active-support'
import { HistoryList } from '../'

describe('HistoryList', () => {
  it('matches correct snapshot', async () => {
    const docId = uuid()
    const navigate = jest.fn()

    const { container } = render(<HistoryList domain="x" docId={docId} navigate={navigate} />)

    expect(container).toMatchSnapshot()
  })
})
