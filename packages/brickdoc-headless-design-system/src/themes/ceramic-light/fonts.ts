const fontSeparator = ' ,'

const sansSerif = [
  '"Inter var"', // Web Font
  '-apple-system',
  'system-ui',
  '"Segoe UI"',
  '"Helvetica Neue"',
  'Tahoma',
  '"Apple Color Emoji"'
].join(fontSeparator)

const serif = [
  'Bitter', // Web Font
  '"New York"', // MacOS
  'Cambria',
  'Georgia',
  '"Times New Roman"',
  'Times'
].join(fontSeparator)

const monospace = [
  '"Fira Code"', // Web Font
  '"SF Mono"', // MacOS
  '"Cascadia Code"', // Win11
  'Menlo',
  'Consolas',
  '"Courier New"'
].join(fontSeparator)

export const fonts = {
  defaultSans: `${sansSerif}, sans-serif`,
  defaultSerif: `${serif}, serif`,
  defaultMonospace: `${monospace}, monospace`,

  // Chinese (Traditional)
  zhHanTSans: `"Biaodian Pro Sans CNS", ${sansSerif}, "Han Heiti CNS", sans-serif`,
  zhHanTSerif: `"Biaodian Pro Serif CNS", ${serif}, "Han Songti CNS", serif`,
  zhHanTMonospace: `${monospace}, monospace, "Biaodian Pro Sans CNS"`,

  // Chinese (Simplified)
  zhHanSSans: `"Biaodian Pro Sans GB", ${sansSerif}, "Han Heiti GB",  sans-serif`,
  zhHanSSerif: `"Biaodian Pro Serif GB", ${serif}, "Han Songti GB", serif`,
  zhHanSMonospace: `${monospace}, monospace, "Biaodian Pro Sans GB"`,
  // Japanese
  jaSans: `"Yakumono Sans", ${sansSerif},  "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic Pro", "Noto Sans JP", "Meiryo UI", Meiryo，  sans-serif`,
  jaSerif: `"Yakumono Serif", ${serif}, "Hiragino Mincho", "Noto Serif JP", "Yu Mincho", "MS PMincho", serif`,
  jaMonospace: `"Yakumono Sans", ${monospace}, "Hiragino Kaku Gothic Pro", Meiryo, monospace`
}
