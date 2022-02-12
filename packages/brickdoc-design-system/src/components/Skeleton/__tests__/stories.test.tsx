import { render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import { a11yTest, toStoryTable } from '../../../utilities/testing'
import * as SkeletonStories from '../skeleton.stories'

const stories = composeStories(SkeletonStories)
const storyTable = toStoryTable(stories)

describe('Skeleton rendering', () => {
  it.each(storyTable)('$name should pass the a11y test', async ({ story }) => {
    await a11yTest(story)
  })
  // react-content-loader require a id & aria-labelledby mock
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip.each(storyTable)('$name should match the snapshot', ({ Component }) => {
    const { container } = render(<Component />)
    expect(container).toMatchSnapshot()
  })
})
