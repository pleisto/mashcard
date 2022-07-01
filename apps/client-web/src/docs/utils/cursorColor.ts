import { theme } from '@mashcard/design-system'

const cursorColors = [
  theme.colors.red9.value,
  theme.colors.orange9.value,
  theme.colors.yellow9.value,
  theme.colors.green9.value,
  theme.colors.cyan9.value,
  theme.colors.blue8.value,
  theme.colors.purple8.value,
  theme.colors.pink9.value,
  theme.colors.black.value,
  theme.colors.red7.value,
  theme.colors.orange8.value,
  theme.colors.yellow9.value,
  theme.colors.green8.value,
  theme.colors.cyan6.value,
  theme.colors.blue6.value,
  theme.colors.purple5.value,
  theme.colors.pink6.value,
  theme.colors.grey9.value,
  theme.colors.red7.value,
  theme.colors.orange7.value,
  theme.colors.green6.value,
  theme.colors.blue4.value,
  theme.colors.purple4.value,
  theme.colors.grey8.value,
  theme.colors.grey7.value,
  theme.colors.grey6.value
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

  return cursorColors[hash % cursorColors.length]
}
