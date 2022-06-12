import { useContext } from 'react'
import { BlockContext, BlockContextData } from '../context/BlockContext'

export function useBlockContext(): BlockContextData {
  return useContext(BlockContext)
}
