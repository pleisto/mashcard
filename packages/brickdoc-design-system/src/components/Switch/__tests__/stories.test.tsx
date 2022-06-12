import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../utilities/testing'
import * as SwitchStories from '../switch.stories'

const { Basic } = composeStories(SwitchStories)

it('Switch Should be passed a11y test', async () => await a11yTest(Basic))
