import { createContext, ReactNode, useContext } from 'react'

/**
 * A portal contains dom container and react node.
 */
export interface NodePortal {
  /**
   * the container mounted the react node.
   */
  container: HTMLElement
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
  setNodePortals: (nodePortals: NodePortal[]) => void
}>({ nodePortals: [], setNodePortals(nodePortals) {} })

/**
 * A react hook to use nodePortals.
 * @returns return nodePortals and an updater to update nodePortals.
 */
export function useNodePortals(): {
  nodePortals: NodePortal[]
  setNodePortals: (nodePortals: NodePortal[]) => void
} {
  return useContext(NodePortalsContext)
}
