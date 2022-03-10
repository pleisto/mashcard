import { toast } from '@brickdoc/design-system'
import { isEmpty } from '@brickdoc/active-support'

export function triggerErrorMessages(errors: string[]): void {
  errors.map(error => toast.error(error))
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

export * from './paths'
