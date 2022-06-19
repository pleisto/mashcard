import * as React from 'react'
import { Button, Popover, PopoverProps, ImageWithSpin } from '@brickdoc/design-system'
import { BlockColor, BlockImage, BlockType } from '@/BrickdocGraphQL'
import { useDocsI18n } from '@/docs/common/hooks'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import * as Root from './DocumentCover.style'

interface DocumentCoverImage extends BlockImage {
  type: BlockType.Image
}

interface DocumentCoverColor extends BlockColor {
  type: BlockType.Color
}

export type DocumentCoverMeta = DocumentCoverImage | DocumentCoverColor

export interface DocumentCoverProps {
  documentCoverMeta?: DocumentCoverMeta | null
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
  const [value, setValue] = React.useState('unset')
  const { t } = useDocsI18n()
  if (documentCoverMeta?.type === BlockType.Color && value !== documentCoverMeta.color) {
    setValue(documentCoverMeta.color)
  }
  if (documentCoverMeta?.type === BlockType.Image) {
    const url = getDocCoverUrl() ?? localUrl ?? ''
    if (url && value !== url) {
      setValue(url)
    }
  }

  const style = {
    backgroundColor: documentCoverMeta?.type === BlockType.Color ? value : 'unset'
  }

  return (
    <Root.Cover
      data-testid={TEST_ID_ENUM.page.DocumentPage.cover.id}
      uncover={!documentCoverMeta}
      className={className}
      css={style}>
      {documentCoverMeta?.type === BlockType.Image && <ImageWithSpin src={value} />}
      <Root.Actions>
        {editable && (
          <>
            {documentCoverMeta && (
              <Popover {...popoverProps}>
                <Button
                  data-testid={TEST_ID_ENUM.page.DocumentPage.changeCoverButton.id}
                  type="secondary"
                  disabled={!editable}>
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
