import { Tag } from '../../../components'
import { Add } from '../../icon'

const { CheckableTag } = Tag

const Base = () => (
  <>
    <Tag>Tag 1</Tag>
    <Tag>
      <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
    </Tag>
    <Tag closable>Tag 2</Tag>
    <CheckableTag checked={false}>CheckableTag</CheckableTag>
    <CheckableTag checked>CheckableTag</CheckableTag>
    <Tag color="magenta">magenta</Tag>
    <Tag color="red">red</Tag>
    <Tag color="volcano">volcano</Tag>
    <Tag color="orange">orange</Tag>
    <Tag color="gold">gold</Tag>
    <Tag color="lime">lime</Tag>
    <Tag color="green">green</Tag>
    <Tag icon={<Add />} color="#55acee">
      Twitter
    </Tag>
  </>
)
export default Base
