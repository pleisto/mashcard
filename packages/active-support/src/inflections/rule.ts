/**
 * Implementation reference from:
 * @see {@link https://raw.githubusercontent.com/fakoua/Humanizer.ts/master/src/Humanizer/Inflections/Vocabulary.ts}
 */
export class Rule {
  private readonly _regex: RegExp
  private readonly _replacement: string

  public constructor(pattern: string, replacement: string) {
    this._regex = new RegExp(pattern, 'i')
    this._replacement = replacement
  }

  public apply(word: string): string {
    if (!this._regex.test(word)) {
      return ''
    }
    return word.replace(this._regex, this._replacement)
  }
}
