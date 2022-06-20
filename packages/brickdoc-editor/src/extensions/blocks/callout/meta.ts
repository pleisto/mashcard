import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'callout',
  extensionType: 'block'
}

export interface CalloutEmoji {
  type: 'EMOJI'
  name: string
  emoji: string
}

export interface CalloutImage {
  type: 'IMAGE'
  source: 'ORIGIN'
  key: string
  viewUrl?: string
}

export type CalloutIcon = CalloutEmoji | CalloutImage

export interface CalloutAttributes {
  icon: CalloutIcon
}

export interface CalloutOptions {
  prepareFileUpload?: (
    type: string,
    file: File
  ) => Promise<{
    endpoint: string
    headers: any
    blobKey: string
    signedId: string
    downloadUrl: string
    viewUrl: string
  }>
}

export interface CalloutViewProps extends BlockViewProps<CalloutOptions, CalloutAttributes> {}
