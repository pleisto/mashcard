import { render } from '@testing-library/react'
import { FileIcon } from '../..'

describe('FileIcon', () => {
  it('renders pdf icon correctly', () => {
    const { container } = render(<FileIcon fileType="pdf" />)

    expect(container).toMatchSnapshot()
  })

  it('renders image icon correctly', () => {
    const { container } = render(<FileIcon fileType="image" />)

    expect(container).toMatchSnapshot()
  })

  it('renders excel icon correctly', () => {
    const { container } = render(<FileIcon fileType="excel" />)

    expect(container).toMatchSnapshot()
  })

  it('renders ppt icon correctly', () => {
    const { container } = render(<FileIcon fileType="ppt" />)

    expect(container).toMatchSnapshot()
  })

  it('renders word icon correctly', () => {
    const { container } = render(<FileIcon fileType="word" />)

    expect(container).toMatchSnapshot()
  })

  it('renders unknown file icon correctly', () => {
    const { container } = render(<FileIcon fileType="unknown" />)

    expect(container).toMatchSnapshot()
  })
})
