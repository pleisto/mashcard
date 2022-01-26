import { type ComponentStory } from '@storybook/react'
import { render, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

export const a11yTest = async (Component: React.FC): Promise<void> => {
  jest.useRealTimers()
  const { container } = render(<Component />)
  await act(async () => {
    expect(await axe(container)).toHaveNoViolations()
  })
}

interface StoryTableRow<T extends React.FC> {
  /** The name of the story. */
  name: string
  /** The raw story object for advanced usages. */
  story: ComponentStory<T>
  /** The component to be rendered. */
  Component: React.FC
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
export function toStoryTable<T extends React.FC>(
  stories: Array<ComponentStory<T>> | Record<string, ComponentStory<T>>
): Array<StoryTableRow<T>> {
  const arr = Array.isArray(stories) ? stories : Object.values(stories)
  return arr.map(story => ({
    name: `${story.storyName}`,
    story,
    Component: story as React.FC
  }))
}
