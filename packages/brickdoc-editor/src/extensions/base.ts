/* eslint-disable complexity */
import { Extension, Extensions } from '@tiptap/core'
import * as EXTENSION from './index'

export interface BaseOptions {
  all?: boolean
  anchor: Partial<EXTENSION.AnchorOptions> | boolean
  blockquote: Partial<EXTENSION.BlockquoteOptions> | boolean
  bold: Partial<EXTENSION.BoldOptions> | boolean
  brickList: Partial<EXTENSION.BrickListOptions> | boolean
  bulletList: Partial<EXTENSION.BulletListOptions> | boolean
  commandHelper: boolean
  code: Partial<EXTENSION.CodeOptions> | boolean
  codeBlock: Partial<EXTENSION.CodeBlockOptions> | boolean
  document: boolean
  discussion: Partial<EXTENSION.DiscussionOptions> | boolean
  dropcursor: Partial<EXTENSION.DropcursorOptions> | boolean
  embed: Partial<EXTENSION.EmbedOptions> | boolean
  eventHandler: Partial<EXTENSION.EventHandlerOptions> | boolean
  fontColor: Partial<EXTENSION.FontColorOptions> | boolean
  formula: Partial<EXTENSION.FormulaOptions> | boolean
  formulaKeyDown: Partial<EXTENSION.FormulaHandleKeyDownOptions> | boolean
  formulaType: Partial<EXTENSION.FormulaTypeOptions> | boolean
  gapcursor: boolean
  hardBreak: Partial<EXTENSION.HardBreakOptions> | boolean
  heading: Partial<EXTENSION.HeadingOptions> | boolean
  history: Partial<EXTENSION.HistoryOptions> | boolean
  horizontalRule: Partial<EXTENSION.HorizontalRuleOptions> | boolean
  indent: Partial<EXTENSION.IndentOptions> | boolean
  image: Partial<EXTENSION.ImageOptions> | boolean
  italic: Partial<EXTENSION.ItalicOptions> | boolean
  link: Partial<EXTENSION.LinkOptions> | boolean
  listItem: Partial<EXTENSION.ListItemOptions> | boolean
  mentionCommands: Partial<EXTENSION.MentionCommandsOptions> | boolean
  orderedList: Partial<EXTENSION.OrderedListOptions> | boolean
  pageLink: Partial<EXTENSION.PageLinkOptions> | boolean
  paragraph: Partial<EXTENSION.ParagraphOptions> | boolean
  slashCommands: Partial<EXTENSION.SlashCommandsOptions> | boolean
  spreadsheet: Partial<EXTENSION.SpreadsheetOptions> | boolean
  strike: Partial<EXTENSION.StrikeOptions> | boolean
  subPageMenu: Partial<EXTENSION.SubPageMenuOptions> | boolean
  sync: Partial<EXTENSION.SyncOptions> | boolean
  text: boolean
  textStyle: Partial<EXTENSION.TextStyleOptions> | boolean
  toc: Partial<EXTENSION.TocOptions> | boolean
  underline: Partial<EXTENSION.UnderlineOptions> | boolean
  uniqueID: Partial<EXTENSION.UniqueIDOptions> | boolean
  user: Partial<EXTENSION.UserOptions> | boolean
}

const getConfigure = <T>(configure: T | boolean): Partial<T> => (configure === true ? {} : (configure as T))

export const Base = Extension.create<BaseOptions>({
  name: 'base',

  addExtensions() {
    const extensions: Extensions = []

    if (this.options.all ?? this.options.anchor)
      extensions.push(EXTENSION.Anchor.configure(getConfigure(this.options?.anchor)))
    if (this.options.all ?? this.options.blockquote)
      extensions.push(EXTENSION.Blockquote.configure(getConfigure(this.options?.blockquote)))
    if (this.options.all ?? this.options.bold)
      extensions.push(EXTENSION.Bold.configure(getConfigure(this.options?.bold)))
    if (this.options.all ?? this.options.brickList)
      extensions.push(EXTENSION.BrickList.configure(getConfigure(this.options?.brickList)))
    if (this.options.all ?? this.options.bulletList)
      extensions.push(EXTENSION.BulletList.configure(getConfigure(this.options?.bulletList)))
    if (this.options.all ?? this.options.commandHelper) extensions.push(EXTENSION.CommandHelper)
    if (this.options.all ?? this.options.code)
      extensions.push(EXTENSION.Code.configure(getConfigure(this.options?.code)))
    if (this.options.all ?? this.options.codeBlock)
      extensions.push(EXTENSION.CodeBlock.configure(getConfigure(this.options.codeBlock)))
    if (this.options.all ?? this.options.document) extensions.push(EXTENSION.Document)
    if (this.options.all ?? this.options.discussion)
      extensions.push(EXTENSION.DiscussionMark.configure(getConfigure(this.options?.discussion)))
    if (this.options.all ?? this.options.dropcursor)
      extensions.push(EXTENSION.Dropcursor.configure(getConfigure(this.options?.dropcursor)))
    if (this.options.all ?? this.options.embed)
      extensions.push(EXTENSION.Embed.configure(getConfigure(this.options?.embed)))
    if (this.options.all ?? this.options.eventHandler)
      extensions.push(EXTENSION.EventHandler.configure(getConfigure(this.options?.eventHandler)))
    if (this.options.all ?? this.options.fontColor)
      extensions.push(EXTENSION.FontColorExtension.configure(getConfigure(this.options?.fontColor)))
    if (this.options.all ?? this.options.formula)
      extensions.push(EXTENSION.Formula.configure(getConfigure(this.options?.formula)))
    // NOTE: formula only
    if (this.options.formulaKeyDown)
      extensions.push(EXTENSION.FormulaHandleKeyDownExtension.configure(getConfigure(this.options?.formulaKeyDown)))
    if (this.options.formulaType)
      extensions.push(EXTENSION.FormulaTypeMark.configure(getConfigure(this.options?.formulaType)))
    if (this.options.all ?? this.options.gapcursor) extensions.push(EXTENSION.Gapcursor)
    if (this.options.all ?? this.options.hardBreak)
      extensions.push(EXTENSION.HardBreak.configure(getConfigure(this.options?.hardBreak)))
    if (this.options.all ?? this.options.heading)
      extensions.push(EXTENSION.Heading.configure(getConfigure(this.options?.heading)))
    if (this.options.all ?? this.options.history)
      extensions.push(EXTENSION.History.configure(getConfigure(this.options?.history)))
    if (this.options.all ?? this.options.horizontalRule)
      extensions.push(EXTENSION.HorizontalRule.configure(getConfigure(this.options?.horizontalRule)))
    if (this.options.all ?? this.options.indent)
      extensions.push(EXTENSION.Indent.configure(getConfigure(this.options?.indent)))
    if (this.options.all ?? this.options.image)
      extensions.push(EXTENSION.Image.configure(getConfigure(this.options?.image)))
    if (this.options.all ?? this.options.italic)
      extensions.push(EXTENSION.Italic.configure(getConfigure(this.options?.italic)))
    if (this.options.all ?? this.options.link)
      extensions.push(EXTENSION.Link.configure(getConfigure(this.options?.link)))
    if (this.options.all ?? this.options.listItem)
      extensions.push(EXTENSION.ListItem.configure(getConfigure(this.options?.listItem)))
    if (this.options.all ?? this.options.mentionCommands)
      extensions.push(EXTENSION.MentionCommands.configure(getConfigure(this.options?.mentionCommands)))
    if (this.options.all ?? this.options.orderedList)
      extensions.push(EXTENSION.OrderedList.configure(getConfigure(this.options?.orderedList)))
    if (this.options.all ?? this.options.pageLink)
      extensions.push(EXTENSION.PageLink.configure(getConfigure(this.options?.pageLink)))
    if (this.options.all ?? this.options.paragraph) {
      if (typeof this.options.paragraph !== 'boolean' && this.options.paragraph?.native) {
        extensions.push(EXTENSION.NativeParagraph.configure(getConfigure(this.options?.paragraph)))
      } else {
        extensions.push(EXTENSION.Paragraph.configure(getConfigure(this.options?.paragraph)))
      }
    }
    if (this.options.all ?? this.options.slashCommands)
      extensions.push(EXTENSION.SlashCommands.configure(getConfigure(this.options?.slashCommands)))
    if (this.options.all ?? this.options.spreadsheet)
      extensions.push(EXTENSION.Spreadsheet.configure(getConfigure(this.options?.spreadsheet)))
    if (this.options.all ?? this.options.strike)
      extensions.push(EXTENSION.Strike.configure(getConfigure(this.options?.strike)))
    if (this.options.all ?? this.options.subPageMenu)
      extensions.push(EXTENSION.SubPageMenu.configure(getConfigure(this.options?.subPageMenu)))
    if (this.options.all ?? this.options.sync)
      extensions.push(EXTENSION.Sync.configure(getConfigure(this.options?.sync)))
    if (this.options.all ?? this.options.text) extensions.push(EXTENSION.Text)
    if (this.options.all ?? this.options.textStyle)
      extensions.push(EXTENSION.TextStyle.configure(getConfigure(this.options?.textStyle)))
    if (this.options.all ?? this.options.toc) extensions.push(EXTENSION.Toc.configure(getConfigure(this.options?.toc)))
    if (this.options.all ?? this.options.underline)
      extensions.push(EXTENSION.Underline.configure(getConfigure(this.options?.underline)))
    if (this.options.all ?? this.options.uniqueID)
      extensions.push(EXTENSION.UniqueID.configure(getConfigure(this.options?.uniqueID)))
    if (this.options.all ?? this.options.user)
      extensions.push(EXTENSION.User.configure(getConfigure(this.options?.user)))

    return extensions
  }
})
