export function name2Initials(name: string): string {
  return name
    .split(/(?=[A-Z])/)
    .join(' ') // Split string by uppercase
    .replace(/ +/gi, ' ') // replace multiple spaces to one
    .split(/ /) // break the name into parts
    .reduce((acc, item) => acc + item[0], '') // assemble an abbreviation from the parts
    .replace(/^(.).*(.)$/, '$1$2') // first and last character
    .toUpperCase() // uppercase
}

export function string2Color(string: string) {
  // Inspired by JDK's hashCode() algorithm, but use different multiplier seed
  // @see https://vanilla-java.github.io/2018/08/12/Why-do-I-think-Stringhash-Code-is-poor.html
  const multiplier = 109
  let hash = 0
  let i: number
  for (i = 0; i < string.length; i++) {
    hash = string.codePointAt(i) + hash * multiplier
  }

  const colorMap = [
    // WARNING: Make sure colorMap.length equals to PrimeNumber
    'red-color-6',
    'orange-color-6',
    'green-color-6',
    'cyan-color-6',
    'blue-color-6',
    'deep-purple-color-6',
    'purple-color-6',
    'pink-color-6',
    'grey-color-6',
    'yellow-color-7',
    'cyan-color-9'
  ]
  return `var(--brk-${colorMap[hash % colorMap.length]})`
}
