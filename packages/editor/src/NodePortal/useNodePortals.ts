import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from 'react'

/**
 * A portal contains dom container and react node.
 */
export interface NodePortal {
  /**
   * unique id
   */
  id: string
  /**
   * the container mounted the react node.
   */
  container: Element
  /**
   * the react node mounted in the portal.
   */
  child: ReactNode
}

/**
 * React Context for sharing NodePortals
 */
export const NodePortalsContext = createContext<{
  nodePortals: NodePortal[]
  setNodePortals: Dispatch<SetStateAction<NodePortal[]>>
}>({ nodePortals: [], setNodePortals(nodePortals) {} })

/**
 * A react hook to use nodePortals.
 * @returns return nodePortals and an updater to update nodePortals.
 */
export function useNodePortals(): {
  nodePortals: NodePortal[]
  setNodePortals: Dispatch<SetStateAction<NodePortal[]>>
} {
  return useContext(NodePortalsContext)
}
