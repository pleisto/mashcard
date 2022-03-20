import { composeStories } from '@storybook/testing-react'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { a11yTest, toStoryTable } from '../../../utilities/testing'
import * as TreeStories from '../tree.stories'

const storyTable = toStoryTable(composeStories(TreeStories))

jest.mock('react-dnd', () => ({
  DndProvider: ({ children }: { children: ReactNode }) => {
    return <>{children}</>
  },
  useDrag: jest.fn().mockReturnValue([{ isDragging: false }, jest.fn()]),
  useDrop: jest.fn().mockReturnValue([{ handlerId: 'mock-id', isOver: true, isOverCurrent: true }, jest.fn()])
}))

describe('Tree', () => {
  it.each(storyTable)('$name should pass the a11y test', async ({ story }) => {
    await a11yTest(story)
  })

  it.each(storyTable)('$name should match the snapshot', ({ Component }) => {
    const { container } = render(<Component />)
    expect(container).toMatchSnapshot()
  })
})
