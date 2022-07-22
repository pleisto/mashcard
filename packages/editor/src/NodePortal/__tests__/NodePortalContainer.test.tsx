import { render, screen } from '@testing-library/react'
import { FC, useEffect } from 'react'
import { NodePortalContainer } from '../NodePortalContainer'
import { useNodePortals } from '../useNodePortals'

describe('NodePortalContainer', () => {
  it('renders node portals correctly', () => {
    const text = 'node portal'

    const portalContainer = document.createElement('div')
    document.body.append(portalContainer)

    const NodeView: FC = () => {
      const { setNodePortals } = useNodePortals()

      useEffect(() => {
        setNodePortals([
          {
            id: 'id',
            container: portalContainer,
            child: <span>{text}</span>
          }
        ])
      }, [setNodePortals])
      return null
    }

    render(<NodeView />, { wrapper: NodePortalContainer })

    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
