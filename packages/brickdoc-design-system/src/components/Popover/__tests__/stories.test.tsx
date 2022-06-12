import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../utilities/testing'
import { FC } from 'react'
import * as PopoverStories from '../popover.stories'

const { Basic } = composeStories(PopoverStories)

it('Tooltip Should be passed a11y test', async () => await a11yTest(Basic as FC))
