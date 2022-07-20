import { createRoot } from 'react-dom/client'
import { MashcardPWA } from './core/App'
import { initialization } from './core/initializers'
import { devLog } from '@mashcard/design-system'

initialization()

const container = document.getElementById('app-entrypoint')

if (container) {
  const root = createRoot(container)
  root.render(<MashcardPWA />)
} else {
  devLog('Render failed. #app-entrypoint element do not exists.')
}
