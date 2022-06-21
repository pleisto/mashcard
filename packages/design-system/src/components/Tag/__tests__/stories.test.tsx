import { FC } from 'react'
import { render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../utilities/testing'
import { TagProps } from '../constants'
import * as TagStories from '../tag.stories'
import * as TagGroupStories from '../TagGroup.stories'
import { Tag } from '../index'
import { TagGroup } from '../TagGroup'

const { TagBasic } = composeStories(TagStories)
const { Basic } = composeStories(TagGroupStories)

it('Tag Should be passed a11y test', async () => await a11yTest(TagBasic as FC))
it('TagGroup Should be passed a11y test', async () => await a11yTest(Basic as FC))

describe('tag', () => {
  it(`matches snapshot correctly`, () => {
    const { container } = render(<Tag text="test" value="1" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})

describe('tagGroup', () => {
  it(`matches snapshot correctly`, () => {
    const tagList: TagProps[] = [
      { color: 'primary', text: 'Abc', value: '1' },
      { color: 'blue', text: 'Hotsoon', value: '2' },
      { color: 'cyan', text: 'Toutiao', value: '3' },
      { color: 'red', text: 'Pipixia', value: '4' }
    ]

    const { container } = render(<TagGroup tagList={tagList} size="lg" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
