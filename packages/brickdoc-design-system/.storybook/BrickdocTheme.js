import { create } from '@storybook/theming'

export const BrickdocTheme = create({
  base: 'light',
  brandTitle: 'Brickdoc Design system',
  brandUrl: 'https://brickdoc.app',
  brandImage: 'https://s3.brickapis.com/mailer/logo.svg',
  appBg: '#d5d5d4',
  appContentBg: '#f3f5f4',
  colorPrimary: '#2c5bff',
  colorSecondary: '#7493ff',
  appBorderColor: '#e0e0e0',
  barTextColor: '#292323',
  barSelectedColor: '#2c5bff',
  fontBase: '"42sans" ,-apple-system ,system-ui ,"Segoe UI" ,"Helvetica Neue" ,Tahoma ,"Apple Color Emoji", sans-serif',
  fontCode: '"Fira Code" ,"SF Mono" ,"Cascadia Code" ,Menlo ,Consolas ,"Courier New", monospace',
  textColor: '#292323'
})
