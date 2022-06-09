import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { globalStyle } from '@brickdoc/design-system'

globalStyle()

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
