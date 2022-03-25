import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { BlockActionsProps } from '../../BlockActions'
import { useBlockElement } from '../useBlockElement'

jest.mock('../../BlockActions', () => ({
  BlockActions: (props: BlockActionsProps) => <span>{JSON.stringify(props.options)}</span>
}))

describe('useBlockElement', () => {
  it('renders inline block correctly', () => {
    const { result } = renderHook(() =>
      useBlockElement(<span>element</span>, undefined, { inline: true, disableActionOptions: false })
    )

    const { container } = render(<>{result.current[0]}</>)

    expect(container).toMatchSnapshot()
  })

  it('disables action options normally', () => {
    const { result } = renderHook(() =>
      useBlockElement(<span>element</span>, undefined, { inline: false, disableActionOptions: true })
    )

    const { container } = render(<>{result.current[0]}</>)

    expect(container).toMatchSnapshot()
  })

  it('accepts action options correctly', () => {
    const { result } = renderHook(() =>
      useBlockElement(<span>element</span>, ['transform'], { inline: false, disableActionOptions: false })
    )

    render(<>{result.current[0]}</>)

    expect(screen.getByText('["transform"]')).toBeInTheDocument()
  })

  it('accepts BlockActionsProps correctly', () => {
    const { result } = renderHook(() =>
      useBlockElement(<span>element</span>, { options: ['transform'] }, { inline: false, disableActionOptions: false })
    )

    render(<>{result.current[0]}</>)

    expect(screen.getByText('["transform"]')).toBeInTheDocument()
  })
})
