import { composeStories } from '@storybook/testing-react'
import { a11yTest, toStoryTable } from '../../../utilities/testing'
import { render } from '@testing-library/react'
import { FC } from 'react'
import * as PopoverStories from '../popovern.stories'

const { Basic } = composeStories(PopoverStories)
const storyTable = toStoryTable(composeStories(PopoverStories))

describe('PopoverN', () => {
  it('PopoverN Should be passed a11y test', async () => await a11yTest(Basic as FC))


  it.each(storyTable)('$name should match the snapshot', ({ Component }) => {
    const { container } = render(<Component />)
    expect(container).toMatchSnapshot()
  })
})