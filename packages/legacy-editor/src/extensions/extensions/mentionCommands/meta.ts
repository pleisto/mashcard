import { PageData } from '../../blocks/pageLink/meta'
import { ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'mentionCommands',
  extensionType: 'extension'
}

export interface MentionUser {
  id: string
  name: string | null | undefined
  avatar: string | null | undefined
}

export type MentionPage = PageData

export interface MentionCommandsOptions {
  users: MentionUser[]
  pages: MentionPage[]
  size?: 'sm' | 'md'
}

export interface MentionCommandsAttributes {}
