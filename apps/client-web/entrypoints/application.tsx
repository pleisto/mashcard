import ReactDOM from 'react-dom'
import { BrickdocPWA } from '@/core/App'
import { initialization } from '@/core/initializers'

initialization()
ReactDOM.render(<BrickdocPWA />, document.getElementById('app-entrypoint'))
