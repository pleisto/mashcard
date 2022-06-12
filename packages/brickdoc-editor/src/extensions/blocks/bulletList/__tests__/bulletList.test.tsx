import { render } from '@testing-library/react'
import { TestEditorContent } from '../../../../test/testEditor'
import { BulletList } from '../bulletList'

describe('BulletList', () => {
  it('renders BulletList correctly', () => {
    const content = `
    <ul>
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </ul>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[BulletList]} />)

    expect(container).toMatchSnapshot()
  })
})
