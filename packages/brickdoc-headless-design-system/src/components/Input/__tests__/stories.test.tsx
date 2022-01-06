import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../testHelper'
import * as InputStories from '../input.stories'

const { Basic } = composeStories(InputStories)

it('Input Should be passed a11y test', async () => await a11yTest(Basic))
