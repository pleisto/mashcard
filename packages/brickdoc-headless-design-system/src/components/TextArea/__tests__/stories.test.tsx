import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../utilities/testing'
import * as TextAreaStories from '../textArea.stories'

const { Basic } = composeStories(TextAreaStories)

it('TextArea Should be passed a11y test', async () => await a11yTest(Basic))
