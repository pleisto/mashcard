import { composeStories } from '@storybook/testing-react'
import { FC } from 'react'
import { a11yTest } from '../../../utilities/testing'
import * as AvatarStories from '../avatar.stories'

const { AnonymousAvatar } = composeStories(AvatarStories)
it('Avatar Should be passed a11y test', async () => await a11yTest(AnonymousAvatar as FC))
