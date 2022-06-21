import { type ComponentStory } from '@storybook/react'
import { composeStories } from '@storybook/testing-react'
import { render, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import React, { FC } from 'react'

export const a11yTest = async (Component: React.FC): Promise<void> => {
  jest.useRealTimers()
  const { container } = render(<Component />)
  await act(async () => {
    expect(await axe(container)).toHaveNoViolations()
  })
}

type Stories = ReturnType<typeof composeStories>
interface StoryTableRow<> {
  /** The name of the story. */
  name: string
  /** The raw story object for advanced usages. */
  story: ComponentStory<FC>
  /** The component to be rendered. */
  Component: FC
}

/**
 * Assemble a Jest fixture table so that test cases can be organized as:
 * ```ts
 * it.each(storyTable)(...)
 * ```
 *
 * The parameter `stories` can be either an array for hand-picked stories,
 * or a map that is return by `composeStories()`.
 *
 * @example
 * // by an array
 * it.each(toStoryTable([Story1, Story2]))(
 *   '$name should do something',
 *   async ({ Component }) => {
 *     render(<Component />)
 *     // ...
 *   });
 *
 * // or by a map
 * import * as Stories from './story-module';
 * it.each(toStoryTable(composeStories(Stories)))(
 *   '$name should do something',
 *   async ({ Component }) => {
 *     render(<Component />)
 *     // ...
 *   });
 *
 * @param stories An array or a map of component stories to be tested.
 */
export function toStoryTable(stories: Stories): StoryTableRow[] {
  const arr = Array.isArray(stories) ? stories : Object.values(stories)
  return arr.map(story => ({
    name: `${story.storyName}`,
    story,
    Component: story as FC
  }))
}
