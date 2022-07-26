import { render } from '@testing-library/react'
import { FC } from 'react'
import { NodeViewContainer, useNodeContent } from '../NodeViewContainer'

describe('NodeViewContainer', () => {
  it('sets contentDOM correctly', () => {
    const setContentDOM = jest.fn()

    const TestComponent: FC = () => {
      const ref = useNodeContent<HTMLDivElement>()

      return <div ref={ref} />
    }

    render(
      <NodeViewContainer setContentDOM={setContentDOM}>
        <TestComponent />
      </NodeViewContainer>
    )

    expect(setContentDOM).toBeCalled()
  })
})
