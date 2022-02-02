import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../utilities/testing'
import { FC } from 'react'
import * as TooltipStories from '../tooltip.stories'

jest.mock('../../../hooks/useId')
const { Basic } = composeStories(TooltipStories)

it('Tooltip Should be passed a11y test', async () => await a11yTest(Basic as FC))
