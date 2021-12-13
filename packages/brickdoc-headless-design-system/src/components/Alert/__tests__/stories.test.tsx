import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../testHelper'
import * as AlertStories from '../alert.stories'

const { Basic } = composeStories(AlertStories)
// eslint-disable-next-line jest/no-disabled-tests
it.skip('Basic Alert Should be passed a11y test', async () => await a11yTest(Basic))
