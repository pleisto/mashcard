import { Vocabularies } from './vocabularies'

const inflections = Vocabularies.Default()

/**
 * Pluralizes the provided input considering irregular words
 *
 * @param word
 * @param isKnownToBePlural Normally you call Pluralize on singular words; but if you're unsure call it with false
 * @returns the plural form of the word in the string
 */
export function pluralize(word: string, isKnownToBePlural = true): string {
  return inflections.pluralize(word, isKnownToBePlural)
}

/**
 * Singularizes the provided input considering irregular words
 *
 * @param word
 * @param isKnownToBeSingular Normally you call Singularize on plural words; but if you're unsure call it with false
 * @param skipSimpleWords Skip singularizing single words that have an 's' on the end
 * @returns the singular form of the word in the string
 */
export function singularize(word: string, isKnownToBePlural: boolean = true, skipSimpleWords: boolean = false): string {
  return inflections.singularize(word, isKnownToBePlural, skipSimpleWords)
}
