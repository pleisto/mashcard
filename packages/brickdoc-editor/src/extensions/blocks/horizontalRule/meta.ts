import HorizontalRule, { HorizontalRuleOptions } from '@tiptap/extension-horizontal-rule'
import { BlockViewProps, ExtensionMeta } from '../../common'

export type { HorizontalRuleOptions }
export interface HorizontalRuleAttributes {}

export interface HorizontalRuleViewProps extends BlockViewProps<HorizontalRuleOptions, HorizontalRuleAttributes> {}

export const meta: ExtensionMeta = {
  name: HorizontalRule.name,
  extensionType: 'block'
}
