import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../testHelper'
import * as CheckboxStories from '../checkbox.stories'

const { Basic } = composeStories(CheckboxStories)

it('Checkbox Should be passed a11y test', async () => await a11yTest(Basic))
