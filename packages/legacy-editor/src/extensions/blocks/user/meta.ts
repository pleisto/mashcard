import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'userBlock',
  extensionType: 'block'
}

export interface UserOptions {
  size?: 'sm' | 'md'
}

export interface UserAttributes {
  people: {
    type: 'PEOPLE'
    domain: string
    name: string
    avatarUrl?: string
  }
}

export interface UserViewProps extends BlockViewProps<UserOptions, UserAttributes> {}
