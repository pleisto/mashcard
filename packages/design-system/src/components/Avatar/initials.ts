export function name2Initials(name: string): string {
  return name
    .split(/(?=[A-Z])/)
    .join(' ') // Split string by uppercase
    .replace(/ +/gi, ' ') // replace multiple spaces to one
    .split(/ /) // break the name into parts
    .filter(Boolean) // filter empty parts
    .reduce((acc, item) => acc + item[0], '') // assemble an abbreviation from the parts
    .replace(/^(.).*(.)$/, '$1$2') // first and last character
    .toUpperCase() // uppercase
}

export function string2Color(str = 'User'): string {
  // Inspired by JDK's hashCode() algorithm, but use different multiplier seed
  // @see https://vanilla-java.github.io/2018/08/12/Why-do-I-think-Stringhash-Code-is-poor.html
  const multiplier = 109
  let hash = 0
  let i: number
  for (i = 0; i < str.length; i++) {
    hash = (str!.codePointAt(i) ?? 1) + hash * multiplier
  }

  const colorMap = [
    // WARNING: Make sure colorMap.length equals to PrimeNumber
    'red6',
    'orange6',
    'green6',
    'cyan6',
    'blue6',
    'deepPurple6',
    'purple6',
    'pink6',
    'grey6',
    'yellow7',
    'cyan9'
  ]
  return `var(--mc-colors-${colorMap[hash % colorMap.length]})`
}
