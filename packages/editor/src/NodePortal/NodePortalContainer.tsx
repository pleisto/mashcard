import { FC, ReactNode, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { NodePortal, NodePortalsContext } from './useNodePortals'

export interface NodePortalContainerProps {
  children?: ReactNode
}

/**
 * A react component renders children and all node portals.
 * @returns Return a react node contains children and all node portals.
 */
export const NodePortalContainer: FC<NodePortalContainerProps> = ({ children }) => {
  const [nodePortals, setNodePortals] = useState<NodePortal[]>([])
  const contextValue = useMemo(
    () => ({
      nodePortals,
      setNodePortals
    }),
    [nodePortals]
  )

  return (
    <NodePortalsContext.Provider value={contextValue}>
      {children}
      {nodePortals.map(({ container, child, id }) => createPortal(child, container, id))}
    </NodePortalsContext.Provider>
  )
}
