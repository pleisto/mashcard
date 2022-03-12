import { FC } from 'react'
import { render, screen } from '@testing-library/react'
import { ExternalProps, ExternalPropsContext } from '../../../../context'
import { useBasicActionOptions } from '../useBasicActionOptions'

describe('useBasicActionOptions', () => {
  it('returns null document is not editable', () => {
    const Demo: FC<{}> = () => {
      const group = useBasicActionOptions({ types: ['copy', 'delete', 'duplicate', 'move'] })

      return (
        <span>
          {group?.items.map(item => {
            return <span key={item.name}>{item.name}</span>
          }) ?? <span>empty</span>}
        </span>
      )
    }

    render(<Demo />)
    expect(screen.getByText('empty')).toBeInTheDocument()
  })
  it('returns null when no types specified', () => {
    const Demo: FC<{}> = () => {
      const group = useBasicActionOptions({ types: [] })

      return (
        <span>
          {group?.items.map(item => {
            return <span key={item.name}>{item.name}</span>
          }) ?? <span>empty</span>}
        </span>
      )
    }

    render(<Demo />)
    expect(screen.getByText('empty')).toBeInTheDocument()
  })

  it('returns options according to types', () => {
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const externalProps = new ExternalProps()
    externalProps.documentEditable = true

    const Demo: FC<{}> = () => {
      const group = useBasicActionOptions({ types: ['copy', 'delete', 'duplicate', 'move'] })

      return (
        <span>
          {group?.items.map(item => {
            return <span key={item.name}>{item.name}</span>
          }) ?? <span>empty</span>}
        </span>
      )
    }

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <Demo />
      </ExternalPropsContext.Provider>
    )
    expect(screen.getByText('copy')).toBeInTheDocument()
    expect(screen.getByText('delete')).toBeInTheDocument()
    expect(screen.getByText('duplicate')).toBeInTheDocument()
    expect(screen.getByText('move')).toBeInTheDocument()
  })
})
