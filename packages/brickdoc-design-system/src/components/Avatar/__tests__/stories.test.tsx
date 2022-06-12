import { composeStories } from '@storybook/testing-react'
import { render } from '@testing-library/react'
import { a11yTest, toStoryTable } from '../../../utilities/testing'
import * as AvatarStories from '../avatar.stories'

const storyTable = toStoryTable(composeStories(AvatarStories))

describe('Avatar', () => {
  it.each(storyTable)('$name should pass the a11y test', async ({ story }) => {
    await a11yTest(story)
  })

  it.each(storyTable)('$name should match the snapshot', ({ Component }) => {
    const { container } = render(<Component />)
    expect(container).toMatchSnapshot()
  })
})
