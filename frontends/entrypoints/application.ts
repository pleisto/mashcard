import { cable } from '@/common/apollo'

// I18n
// eslint-disable-next-line import/first
import '@/common/i18next'
globalThis.brickdocContext = globalThis.brickdocContext || {}
globalThis.brickdocContext.wsCable = cable
globalThis.brickdocContext.timezone ||=
  Intl?.DateTimeFormat().resolvedOptions().timeZone || globalThis.brickdocContext.defaultTimezone

// Self-XSS Attack Warning
if (globalThis.brickdocContext.env !== 'development'){
  console.log('\n\n%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS. Do not enter or paste code that you do not understand.','font-weight: bold;color:#dc3545;font-size:18px;')
  console.log('%c使用此控制台可能会使攻击者得以利用 Self-XSS（自跨站脚本）攻击来冒充你，并窃取你的信息。请勿输入或粘贴任何你不明白的代码。\n','font-weight: bold;color:#dc3545;font-size:18px;')
}
