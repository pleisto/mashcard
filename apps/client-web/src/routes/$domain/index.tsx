import { FC } from 'react'

import { RequireLogin } from '../_shared/RequireLogin'
import DocumentContentPage from '@/docs_legacy/pages/DocumentContentPage'

const Index: FC = () => {
  return (
    <RequireLogin>
      <DocumentContentPage />
    </RequireLogin>
  )
}

// eslint-disable-next-line import/no-default-export
export default Index
