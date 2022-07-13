import { FC, ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { MashcardContext } from '@/common/mashcardContext'

export const RequireLogin: FC<{ children?: ReactNode }> = ({ children }) => {
  const context = useContext(MashcardContext)
  return context.currentUser ? <>{children}</> : <Navigate replace to="/accounts/sign-in" />
}
