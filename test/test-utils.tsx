import React, { FC, ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'

const AllTheProviders: FC = ({ children }) => {
  // Add Providers here
  return <>children</>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper' | 'queries'>): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options })

// eslint-disable-next-line import/export
export * from '@testing-library/react'
// eslint-disable-next-line import/export
export { customRender as render }
