import i18next from 'i18next'
import { initReactI18next } from "react-i18next"

i18next.use(initReactI18next).init({
  lng: globalThis.brickdocContext?.lang,
  load: 'currentOnly',
  cleanCode: true,
  lowerCaseLng: true
})
