import {  message } from "@brickdoc/design-system"
import { isEmpty } from 'lodash'

export const triggerErrorMessages = (errors: string[])=>{
  errors.map(error => message.error(error))
}

interface mutationPayload {
  errors: string[] | null;
  [key: string]: unknown;
}

/**
 * Perform different actions depending on whether the result of the executed mutation contains errors
 * @param result - Mutation Payload
 * @param onSuccess - On Mutation Success
 * @param onError - on Mutation result have user-level errors
 */
export const mutationResultHandler = (result: mutationPayload, onSuccess: ()=>void, onError = triggerErrorMessages )=>{
  isEmpty(result.errors) ? onSuccess():onError(result.errors)
}
