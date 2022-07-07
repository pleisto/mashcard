import { FC, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { MashcardContext } from '@/common/mashcardContext'
import { rootPath } from '@/common/utils'
import { RequireLogin } from './_shared/RequireLogin'

const Index: FC = () => {
  const context = useContext(MashcardContext)

  return (
    <RequireLogin>
      <Navigate replace to={rootPath(context)} />
    </RequireLogin>
  )
}

// eslint-disable-next-line import/no-default-export
export default Index
