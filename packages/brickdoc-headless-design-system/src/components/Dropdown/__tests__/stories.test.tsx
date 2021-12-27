import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../testHelper'
import { FC } from 'react'
import * as DropdownStories from '../dropdown.stories'

const { Basic } = composeStories(DropdownStories)

it('Tooltip Should be passed a11y test', async () => await a11yTest(Basic as FC))
