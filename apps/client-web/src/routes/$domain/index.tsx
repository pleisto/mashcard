import { FC } from 'react'

import { RequireLogin } from '../_shared/RequireLogin'
import DocIdIndex from './$docId'

const Index: FC = () => {
  // TODO: separate new page redirection logic from the DocIdIndex component
  return (
    <RequireLogin>
      <DocIdIndex />
    </RequireLogin>
  )
}

// eslint-disable-next-line import/no-default-export
export default Index
