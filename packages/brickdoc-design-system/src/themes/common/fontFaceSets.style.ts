const fontServiceProvider = `https://s3.brickapis.com/webfonts/`

const fontSrc = (file: string): string => `url('${fontServiceProvider}${file}') format('woff2-variations')`

const webFontCommonSettings = {
  fontStyle: 'normal',
  fontWeight: '100 900',
  fontDisplay: 'swap',
  fontNamedInstance: 'Regular'
}

const italicSettings = {
  fontStyle: 'italic',
  fontNamedInstance: 'Italic'
}

export const fontFaceSets = {
  '@font-face': [
    {
      fontFamily: '42sans',
      ...webFontCommonSettings,
      src: fontSrc('42sans-roman.var.woff2?v=4.26')
    },
    {
      fontFamily: '42sans',
      ...webFontCommonSettings,
      src: fontSrc('42sans-italic.var.woff2?v=4.26'),
      ...italicSettings
    },
    {
      fontFamily: 'Bitter',
      ...webFontCommonSettings,
      src: fontSrc('bitter-regular.var.woff2?v=3.19')
    },
    {
      fontFamily: 'Bitter',
      ...webFontCommonSettings,
      src: fontSrc('bitter-italic.var.woff2?v=3.19'),
      ...italicSettings
    },
    {
      fontFamily: 'Fira Code',
      ...webFontCommonSettings,
      fontWeight: '300 700',
      src: fontSrc('FiraCode-VF.woff2')
    },
    {
      fontFamily: 'Biaodian Pro Sans CNS',
      src: 'local("PingFang TC"), local("PingFang HK"), local("Noto Sans TC"), local("Noto Sans HK"), local("Microsoft JhengHei"), local("Hiragino Sans TC"), local("Heiti TC")',
      unicodeRange:
        'U+00B7, U+2014, U+2018-2019, U+201C-201D, U+2026, U+25CF, U+3001-3002, U+3008-3009, U+300A-300F, U+3014-3015, U+FF01, U+FF08-FF09, U+FF0C-FF0F, U+FF1A-1F, U+FF3C'
    },
    {
      fontFamily: 'Biaodian Pro Serif CNS',
      src: 'local("Noto Serif TC"), local("Noto Serif HK"), local("Songti TC"), local("STSongti"), local("LiSong Pro"), local("Heiti TC"), local("PMingLiU"), local("細明體_HKSCS")',
      unicodeRange:
        'U+00B7, U+2014, U+2018-2019, U+201C-201D, U+2026, U+25CF, U+3001-3002, U+3008-3009, U+300A-300F, U+3014-3015, U+FF01, U+FF08-FF09, U+FF0C-FF0F, U+FF1A-1F, U+FF3C'
    },
    {
      fontFamily: 'Biaodian Pro Sans GB',
      src: 'local("PingFang SC"),local("Noto Sans SC"), local("Hiragino Sans GB"), local("Heiti SC"), local("Microsoft YaHei")',
      unicodeRange:
        'U+00B7, U+2014, U+2018-2019, U+201C-201D, U+2026, U+25CF, U+3001-3002, U+3008-3009, U+300A-300F, U+3014-3015, U+FF01, U+FF08-FF09, U+FF0C-FF0F, U+FF1A-1F, U+FF3C'
    },
    {
      fontFamily: 'Biaodian Pro Serif GB',
      src: 'local("Noto Serif SC"), local("Songti SC"), local("STSongti"), local("LiSong Pro"), local("Heiti SC"),  local("SimSun")',
      unicodeRange:
        'U+00B7, U+2014, U+2018-2019, U+201C-201D, U+2026, U+25CF, U+3001-3002, U+3008-3009, U+300A-300F, U+3014-3015, U+FF01, U+FF08-FF09, U+FF0C-FF0F, U+FF1A-1F, U+FF3C'
    },
    {
      fontFamily: 'Yakumono Sans',
      src: 'local("Hiragino Kaku Gothic ProN"), local("Hiragino Kaku Gothic Pro"), local("Noto Sans JP"), local("Hiragino Sans"), local("Meiryo")',
      unicodeRange:
        'U+00B7, U+2014, U+2018-2019, U+201C-201D, U+2026, U+25CF, U+3001-3002, U+3008-3009, U+300A-300F, U+3014-3015, U+FF01, U+FF08-FF09, U+FF0C-FF0F, U+FF1A-1F, U+FF3C'
    },
    {
      fontFamily: 'Yakumono Serif',
      src: 'local("Hiragino Mincho"), local("Noto Serif JP"), local("Yu Mincho"), local("MS PMincho")',
      unicodeRange:
        'U+00B7, U+2014, U+2018-2019, U+201C-201D, U+2026, U+25CF, U+3001-3002, U+3008-3009, U+300A-300F, U+3014-3015, U+FF01, U+FF08-FF09, U+FF0C-FF0F, U+FF1A-1F, U+FF3C'
    },
    {
      fontFamily: 'Han Heiti CNS',
      src: 'local("PingFang TC"), local("PingFang HK"), local("Noto Sans TC"), local("Noto Sans HK"), local("Microsoft JhengHei"), local("Hiragino Sans TC"), local("Heiti TC")'
    },
    {
      fontFamily: 'Han Songti CNS',
      src: 'local("Noto Serif TC"), local("Noto Serif HK"), local("Songti TC"), local("STSongti"), local("LiSong Pro"), local("PMingLiU"), local("細明體_HKSCS")'
    },
    {
      fontFamily: 'Han Heiti GB',
      src: 'local("PingFang SC"),local("Noto Sans SC"), local("Hiragino Sans GB"), local("Heiti SC"), local("Microsoft YaHei")'
    },
    {
      fontFamily: 'Han Songti GB',
      src: 'local("Noto Serif SC"), local("Songti SC"), local("STSongti"), local("LiSong Pro"), local("SimSun")'
    }
  ]
}

