import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../testHelper'
import * as ButtonStories from '../button.stories'

const { iconOnly } = composeStories(ButtonStories)

it('Button Should be passed a11y test', async () => await a11yTest(iconOnly))
