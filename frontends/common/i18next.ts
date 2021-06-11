import i18next from 'i18next'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from "react-i18next"


i18next.use(HttpApi).use(initReactI18next).init({
  lng: globalThis.brickdocContext?.locale,
  ns: 'meta',
  fallbackLng: {
    'zh-HK': ['zh-CN'],
    'zh-TW': ['zh-CN']
  },
  load: 'currentOnly',
  cleanCode: true,
  debug: true,
  interpolation: {
    escapeValue: false,
    prefix: "%{",
    suffix: "}",
  },
  backend: {
    loadPath: '/.internal-apis/locales/%{ns}.%{lng}.json',
    queryStringParams: {
      ver: globalThis.brickdocContext?.version
    }
  }
})
