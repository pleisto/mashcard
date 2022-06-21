import { FC } from 'react'
import { Spin, styled, theme } from '@mashcard/design-system'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { FileType } from '../../../../../../helpers'
import { FileIcon } from '../../../../../ui'
import { usePdftronDocument } from './usePdftronDocument'
import { DocumentFooter } from '../DocumentFooter'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../../EmbedView'
import { DocumentUnavailable } from '../DocumentUnavailable'

export interface PdftronDocumentProps {
  blockType: EmbedBlockType
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
  displayName: string
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
  fileUrl,
  displayName
}) => {
  const [documentStatus, viewer, toggleFullScreen] = usePdftronDocument(fileUrl)

  return (
    <PdftronDocumentWrapper data-testid={TEST_ID_ENUM.editor.embedBlock.pdftron.id}>
      {documentStatus === 'loading' && (
        <SpinWrapper css={{ height: containerHeight }}>
          <DocumentSpin size="lg" />
        </SpinWrapper>
      )}
      {documentStatus === 'error' && <DocumentUnavailable url={fileUrl} />}
      <PdftronDocumentContainer ref={viewer} ready={documentStatus === 'ready'} />
      <DocumentFooter
        displayName={displayName}
        url={fileUrl}
        icon={<DocumentFileIcon fileType={fileType} />}
        name={fileName}
        blockType={blockType}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
        onFullScreen={toggleFullScreen}
      />
    </PdftronDocumentWrapper>
  )
}
