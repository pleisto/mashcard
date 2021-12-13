import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

export const a11yTest = async (Component: React.FC): Promise<void> => {
  jest.useRealTimers()
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
}
