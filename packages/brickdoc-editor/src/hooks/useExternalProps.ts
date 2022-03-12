import { useContext } from 'react'
import { ExternalProps, ExternalPropsContext } from '../context'

export function useExternalProps(): ExternalProps {
  return useContext<ExternalProps>(ExternalPropsContext)
}
