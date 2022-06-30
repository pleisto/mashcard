import { toast } from '@mashcard/design-system'
import { UploadProgress } from '@mashcard/uploader'
import { Node } from '@tiptap/core'
import { useState, useCallback, ChangeEventHandler } from 'react'
import { EmbedOptions } from '../../../../../extensions'
import { prependHttp } from '../../../../../helpers'
import { useEditorI18n } from '../../../../../hooks'
import { LinkTypeEmbedBlockProps } from './Link'
import { useWebsiteMetaProgress } from './useWebsiteMetaProgress'

export function useLinkValue(
  updateEmbedBlockAttributes: LinkTypeEmbedBlockProps['updateEmbedBlockAttributes'],
  extension?: Node<EmbedOptions>,
  defaultUrl?: string
): [string, ChangeEventHandler<HTMLInputElement>, () => void, () => void, UploadProgress] {
  const [t] = useEditorI18n()
  const [url, setUrl] = useState(defaultUrl ?? '')
  const [progress, resetProgress, progressing] = useWebsiteMetaProgress()

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!url) {
      toast.error(t('embed_block.embed_types.link.panel.link_validate'))
      return
    }

    if (!extension?.options.getUrlData) {
      updateEmbedBlockAttributes(
        {
          type: 'ATTACHMENT',
          key: url,
          source: 'EXTERNAL',
          contentType: 'unknown',
          name: url
        },

        'attachment'
      )
      return
    }

    progressing()
    const { success, data } = await extension.options.getUrlData(prependHttp(url))

    if (!success) {
      resetProgress()
      toast.error(t('embed_block.embed_types.link.panel.submit_error'))
      return
    }

    resetProgress(100)

    if (data.type === 'website') {
      updateEmbedBlockAttributes(
        {
          type: 'LINK',
          key: data.url,
          title: data.title,
          description: data.description,
          cover: data.cover,
          icon: data.icon
        },
        'link'
      )
    } else if (data.type === 'image') {
      updateEmbedBlockAttributes({ type: 'IMAGE', key: data.url, source: 'EXTERNAL' }, 'image')
    } else {
      updateEmbedBlockAttributes(
        {
          type: 'ATTACHMENT',
          key: data.url,
          source: 'EXTERNAL',
          contentType: data.type,
          name: url
        },
        'attachment'
      )
    }
  }, [extension?.options, progressing, resetProgress, t, updateEmbedBlockAttributes, url])

  const handleLinkChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
    setUrl(event.target.value)
  }, [])

  const handleLinkClear = useCallback(() => {
    setUrl('')
  }, [])

  return [url, handleLinkChange, handleLinkClear, handleSubmit, progress]
}
