import ReactDOM from 'react-dom'
import { MashcardPWA } from '@/core/App'
import { initialization } from '@/core/initializers'

initialization()
ReactDOM.render(<MashcardPWA />, document.getElementById('app-entrypoint'))
