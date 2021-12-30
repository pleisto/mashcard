import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../testHelper'
import * as MenuStories from '../menu.stories'

const { withGroup } = composeStories(MenuStories)
it('Menu Should be passed a11y test', async () => await a11yTest(withGroup))
