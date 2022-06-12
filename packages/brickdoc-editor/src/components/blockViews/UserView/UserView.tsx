import { FC } from 'react'
import { UserViewProps } from '../../../extensions/blocks/user/meta'
import { User } from '../../ui'
import { BlockContainer } from '../BlockContainer'

export const UserView: FC<UserViewProps> = ({ node, extension }) => {
  return (
    <BlockContainer node={node} inline={true}>
      <User attributes={node.attrs} options={extension.options} />
    </BlockContainer>
  )
}
