import ReactDOM from 'react-dom'
import { MashcardPWA } from '@/core/App'
import { initialization } from '@/core/initializers'

initialization()

// TODO: render using React 18's new createRoot() API
ReactDOM.render(<MashcardPWA />, document.getElementById('app-entrypoint'))
