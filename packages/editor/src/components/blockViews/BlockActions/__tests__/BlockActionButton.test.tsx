import { render, screen, fireEvent, act } from '@testing-library/react'
import { BlockActionButton, BlockActionButtonProps } from '../BlockActionButton'

jest.useFakeTimers()

describe('BlockActionButton', () => {
  it(`matches snapshot correctly`, () => {
    const props: BlockActionButtonProps = {}

    const { container } = render(<BlockActionButton {...props} />)

    expect(container).toMatchSnapshot()
  })

  it(`drags button normally`, async () => {
    const props: BlockActionButtonProps = {}

    render(<BlockActionButton {...props} />)

    const button = screen.getByRole('button')
    expect(() => {
      act(() => {
        fireEvent.dragStart(button)
        fireEvent.dragEnd(button)
        jest.runAllTimers()
      })
    }).not.toThrow()
  })

  it(`clicks button normally`, async () => {
    const props: BlockActionButtonProps = {}

    render(<BlockActionButton {...props} />)

    expect(() => {
      act(() => {
        fireEvent.click(screen.getByRole('button'))
      })
    }).not.toThrow()
  })

  it(`triggers mouse enter/leave event normally`, async () => {
    const props: BlockActionButtonProps = {}

    const { container, rerender } = render(<BlockActionButton {...props} />)

    expect(() => {
      act(() => {
        fireEvent.mouseEnter(screen.getByRole('button'))
      })
    }).not.toThrow()

    rerender(<BlockActionButton {...props} />)

    expect(container).toMatchSnapshot()

    expect(() => {
      act(() => {
        fireEvent.mouseLeave(screen.getByRole('button'))
      })
    }).not.toThrow()

    rerender(<BlockActionButton {...props} />)

    expect(container).toMatchSnapshot()
  })
})
