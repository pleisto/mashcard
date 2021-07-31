import { message } from '@brickdoc/design-system'
import { isEmpty } from 'lodash'
import { arrayToTree, Config, Item } from 'performant-array-to-tree'

export function triggerErrorMessages(errors: string[]): void {
  errors.map(error => message.error(error))
}

interface MutationPayload {
  errors: string[] | null
  [key: string]: unknown
}

/**
 * Perform different actions depending on whether the result of the executed mutation contains errors
 * @param result - Mutation Payload
 * @param onSuccess - On Mutation Success
 * @param onError - on Mutation result have user-level errors
 */
export function mutationResultHandler(
  result: MutationPayload | null | undefined,
  onSuccess: () => void,
  onError = triggerErrorMessages
): void {
  result && isEmpty(result.errors) ? onSuccess() : onError(result?.errors ?? [])
}

/**
 * Converts an array of items with ids and parent ids to a nested tree in a performant way (time complexity `O(n)`).
 *
 * @param items array of items
 * @param config please see `performant-array-to-tree`
 */
export function array2Tree<TItem extends Item>(items: TItem[], config: Partial<Config> = {}): Array<TItem & { children: TItem[] }> {
  return arrayToTree(items, {
    ...config,
    dataField: null,
    nestedIds: false
  }) as Array<TItem & { children: TItem[] }>
}
