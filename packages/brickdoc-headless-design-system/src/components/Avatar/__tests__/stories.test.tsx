import { composeStories } from '@storybook/testing-react'
import { a11yTest } from '../../../testHelper'
import * as AvatarStories from '../avatar.stories'

const { imageAvatar } = composeStories(AvatarStories)
it('Avatar Should be passed a11y test', async () => await a11yTest(imageAvatar))
