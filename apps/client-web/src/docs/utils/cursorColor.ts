const cursorColors = [
  'red9',
  'orange9',
  'yellow9',
  'green9',
  'cyan9',
  'blue8',
  'purple8',
  'pink9',
  'black',
  'red7',
  'orange8',
  'yellow9',
  'green8',
  'cyan6',
  'blue6',
  'purple5',
  'pink6',
  'grey9',
  'red7',
  'orange7',
  'green6',
  'blue4',
  'purple4',
  'grey8',
  'grey7',
  'grey6'
]

export function getCursorColor(str = 'User'): string {
  // Inspired by JDK's hashCode() algorithm, but use different multiplier seed
  // @see https://vanilla-java.github.io/2018/08/12/Why-do-I-think-Stringhash-Code-is-poor.html
  const multiplier = 109
  let hash = 0
  let i: number
  for (i = 0; i < str.length; i++) {
    hash = (str!.codePointAt(i) ?? 1) + hash * multiplier
  }

  return `var(--mc-colors-${cursorColors[hash % cursorColors.length]})`
}
