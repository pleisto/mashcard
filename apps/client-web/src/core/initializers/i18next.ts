import i18n from 'i18next'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

export const i18nextInit = (): void => {
  void i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
      lng: globalThis.mashcardContext?.locale,
      ns: 'meta',
      fallbackLng: 'en-US',
      load: 'currentOnly',
      cleanCode: true,
      interpolation: {
        escapeValue: false,
        prefix: '%{',
        suffix: '}'
      },
      backend: {
        loadPath: '/.internal-apis/locales/%{ns}.%{lng}.json',
        queryStringParams: {
          ver: globalThis.mashcardContext?.version
        }
      }
    })
}
