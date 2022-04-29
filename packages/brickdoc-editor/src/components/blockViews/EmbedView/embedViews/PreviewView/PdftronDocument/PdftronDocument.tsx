import { FC } from 'react'
import { Spin, styled, theme } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { FileType } from '../../../../../../helpers'
import { FileIcon } from '../../../../../ui'
import { usePdftronDocument } from './usePdftronDocument'
import { DocumentFooter } from '../DocumentFooter'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../../EmbedView'

export interface PdftronDocumentProps {
  blockType: EmbedBlockType
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
  fileName: string
  fileUrl: string
  fileType: FileType
}

const containerHeight = 472

const PdftronDocumentWrapper = styled('div', {
  background: theme.colors.white,
  border: `1px solid ${theme.colors.borderPrimary}`,
  position: 'relative'
})

const PdftronDocumentContainer = styled('div', {
  height: `${containerHeight / 16}rem`,
  variants: {
    ready: {
      false: {
        height: 0
      },
      true: {
        height: `${containerHeight / 16}rem`
      }
    }
  }
})

const SpinWrapper = styled('div', {
  position: 'relative'
})

const DocumentSpin = styled(Spin, {
  height: '50%',
  left: '50%',
  position: 'absolute',
  transform: 'translate(-50%, -50%)'
})

const DocumentFileIcon = styled(FileIcon, {
  marginRight: '16px'
})

export const PdftronDocument: FC<PdftronDocumentProps> = ({
  blockType,
  updateEmbedBlockAttributes,
  fileName,
  fileType,
  fileUrl
}) => {
  const [documentReady, viewer] = usePdftronDocument(fileUrl)

  return (
    <PdftronDocumentWrapper data-testid={TEST_ID_ENUM.editor.embedBlock.pdftron.id}>
      {!documentReady && (
        <SpinWrapper css={{ height: containerHeight }}>
          <DocumentSpin size="lg" />
        </SpinWrapper>
      )}
      <PdftronDocumentContainer ref={viewer} ready={documentReady} />
      <DocumentFooter
        icon={<DocumentFileIcon fileType={fileType} />}
        name={fileName}
        blockType={blockType}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    </PdftronDocumentWrapper>
  )
}
