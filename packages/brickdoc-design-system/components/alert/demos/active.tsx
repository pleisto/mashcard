import { Alert, Space } from '../../../components'
const ErrorBoundary = Alert.ErrorBoundary

// @ts-expect-error
const ThrowError = () => new ThrowError('test error')

const Active = () => (
  <Space>
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  </Space>
)

export default Active
