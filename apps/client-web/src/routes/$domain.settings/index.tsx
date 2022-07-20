import { FC } from 'react'
import { Navigate } from 'react-router-dom'

const Index: FC = () => <Navigate replace={true} to="general" />

// eslint-disable-next-line import/no-default-export
export default Index
