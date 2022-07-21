import * as crypto from 'crypto'

export const generateUUID = (): string => {
  return crypto.randomUUID()
}
