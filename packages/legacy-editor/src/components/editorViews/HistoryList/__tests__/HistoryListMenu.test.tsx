import { render, screen, fireEvent } from '@testing-library/react'
import { uuid } from '@mashcard/active-support'
import { HistoryListMenu } from '../'
import { DocumentHistory } from '@mashcard/schema'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

describe('HistoryListMenu', () => {
  it('should render histories', async () => {
    const docId = uuid()
    const navigate = jest.fn()

    const fixedUuids = [
      '4eb341e1-8b1a-4c6a-80d9-b0f489167f9e',
      '0d396117-9b0e-4f28-967d-e2b6e776f833',
      '2506b18f-f436-471d-b48e-af3dc9af6d9e'
    ]

    const historiesArr: DocumentHistory[] = [
      {
        id: fixedUuids[0],
        createdAt: new Date(),
        username: 'test'
      },
      {
        id: fixedUuids[2],
        createdAt: new Date(Date.now() - 86400000 * 2),
        username: 'test'
      },
      {
        id: fixedUuids[1],
        createdAt: new Date(Date.now() - 86400000),
        username: 'test'
      }
    ]

    const histories = Object.fromEntries(historiesArr.map(h => [h.id, h]))
    const users = {
      test: {
        name: 'test',
        domain: 'test',
        avatarData: null
      }
    }

    render(<HistoryListMenu domain="x" docId={docId} navigate={navigate} histories={histories} users={users} />)

    const menuItems = screen.getAllByTestId(TEST_ID_ENUM.editor.history.historyItem.id)

    expect(menuItems).toHaveLength(3)

    fireEvent.click(menuItems[2])

    expect(navigate).toBeCalled()
  })
})
