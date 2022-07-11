import * as React from 'react'
import { Button, Popover, PopoverProps } from '@mashcard/design-system'
import { BlockType, FileSource } from '@/MashcardGraphQL'
import { useDocsI18n } from '@/docs_legacy/common/hooks'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import * as Root from './DocumentCover.style'

export interface DocumentCoverMeta {
  type: BlockType.Image
  key: string
  source: FileSource
  width?: number
  height?: number
  blurHash?: string
}

export interface DocumentCoverProps {
  documentCoverMeta: DocumentCoverMeta
  popoverProps: PopoverProps
  editable: boolean
  localUrl?: string
  onClick?: VoidFunction
  className?: string
  getDocCoverUrl: () => string | undefined
}

export const DocumentCover: React.FC<DocumentCoverProps> = ({
  documentCoverMeta,
  popoverProps,
  editable,
  getDocCoverUrl,
  localUrl,
  className
}) => {
  const { t } = useDocsI18n()
  const [value, setValue] = React.useState('unset')
  if (documentCoverMeta?.type === BlockType.Image) {
    const url = getDocCoverUrl() ?? localUrl ?? ''
    if (url && value !== url) {
      setValue(url)
    }
  }

  return (
    <Root.Cover data-testid={TEST_ID_ENUM.page.DocumentPage.cover.id} className={className}>
      {documentCoverMeta?.type === BlockType.Image && (
        <Root.CoverImage src={value} blurHash={documentCoverMeta.blurHash} />
      )}
      <Root.Actions>
        {editable && (
          <>
            {documentCoverMeta && (
              <Popover {...popoverProps}>
                <Button
                  data-testid={TEST_ID_ENUM.page.DocumentPage.changeCoverButton.id}
                  type="secondary"
                  disabled={!editable}
                >
                  {t('title.change_cover')}
                </Button>
              </Popover>
            )}
          </>
        )}
      </Root.Actions>
    </Root.Cover>
  )
}
