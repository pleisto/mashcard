import { Button, Space, message } from '../../../components'

const info = () => {
  void message.info('This is a normal message')
}
const success = () => {
  message.success('This is a success message')
}

const error = () => {
  message.error('This is an error message')
}

const warning = () => {
  message.warning('This is a warning message')
}

const loading = () => {
  const hide = message.loading('Action in progress..', 0)
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500)
}

const Base = () => (
  <Space>
    <Button type="primary" onClick={info}>
      Display normal message
    </Button>
    <Button onClick={success}>Success</Button>
    <Button onClick={error}>Error</Button>
    <Button onClick={warning}>Warning</Button>
    <Button onClick={loading}>Loading</Button>
  </Space>
)
export default Base
