import { render } from '@testing-library/react'
import { TestEditorContent } from '../../../../test/testEditor'
import { TaskItem } from '../../taskItem'
import { TaskList } from '../taskList'

describe('TaskList', () => {
  it('renders TaskList correctly', () => {
    const content = `
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[TaskList, TaskItem]} />)

    expect(container).toMatchSnapshot()
  })
})
