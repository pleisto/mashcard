import { render, act } from '@testing-library/react'
import { axe } from 'jest-axe'

export const a11yTest = async (Component: React.FC): Promise<void> => {
  jest.useRealTimers()
  const { container } = render(<Component />)
  await act(async () => {
    expect(await axe(container)).toHaveNoViolations()
  })
}
