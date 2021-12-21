import { render, screen } from '@testing-library/react'
import React from 'react'
import { useBasicActionOptions } from '../useBasicActionOptions'

describe('useBasicActionOptions', () => {
  it('returns null when no types specified', () => {
    const Demo: React.FC<{}> = () => {
      const group = useBasicActionOptions({ types: [] })

      return (
        <span>
          {group?.map(item => {
            if (Array.isArray(item)) {
              return (
                <span>
                  {item.map((i, index) => (
                    <span key={index}>{i.name}</span>
                  ))}
                </span>
              )
            }

            return <span key={item.name}>{item.name}</span>
          }) ?? <span>empty</span>}
        </span>
      )
    }

    render(<Demo />)
    expect(screen.getByText('empty')).toBeInTheDocument()
  })

  it('returns options according to types', () => {
    const Demo: React.FC<{}> = () => {
      const group = useBasicActionOptions({ types: ['copy', 'delete', 'duplicate', 'move'] })

      return (
        <span>
          {group?.map(item => {
            if (Array.isArray(item)) {
              return (
                <span role="group">
                  {item.map((i, index) => (
                    <span key={index}>{i.name}</span>
                  ))}
                </span>
              )
            }

            return <span key={item.name}>{item.name}</span>
          }) ?? <span>empty</span>}
        </span>
      )
    }

    render(<Demo />)
    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(screen.getByText('copy')).toBeInTheDocument()
    expect(screen.getByText('delete')).toBeInTheDocument()
    expect(screen.getByText('duplicate')).toBeInTheDocument()
    expect(screen.getByText('move')).toBeInTheDocument()
  })
})
