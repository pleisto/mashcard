import i18next from 'i18next'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from "react-i18next"


i18next.use(HttpApi).use(initReactI18next).init({
  lng: globalThis.brickdocContext?.locale,

  fallbackLng: {
    'zh-HK': ['zh-CN'],
    'zh-TW': ['zh-CN']
  },
  load: 'currentOnly',
  cleanCode: true,
  interpolation: {
    prefix: "%{",
    suffix: "}",
  },
  backend: {
    loadPath: '/.internal-apis/locales/%{lng}.json',
    queryStringParams: {
      ver: globalThis.brickdocContext?.version
    }
  }
})
