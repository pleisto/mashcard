import { Vocabularies } from './vocabularies'

const inflections = Vocabularies.Default()

/**
 * @param word
 * @returns the plural form of the word in the string
 */
export function pluralize(word: string, isKnownToBePlural = true): string {
  return inflections.pluralize(word, isKnownToBePlural)
}

/**
 * @param word
 * @returns the singular form of the word in the string
 */
export function singularize(word: string, isKnownToBePlural: boolean = true, skipSimpleWords: boolean = false): string {
  return inflections.singularize(word, isKnownToBePlural, skipSimpleWords)
}
