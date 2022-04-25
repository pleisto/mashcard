import { FC } from 'react'
import { Spin, styled } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { FileType } from '../../../../../../helpers'
import { FileIcon } from '../../../../../ui'
import { usePdftronDocument } from './usePdftronDocument'

export interface PdftronDocumentProps {
  fileName: string
  fileUrl: string
  fileType: FileType
}

const containerHeight = 472

const PdftronDocumentWrapper = styled('div', {
  border: `1px solid var(--brd-colors-grey3)`,
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

const Footer = styled('div', {
  alignItems: 'center',
  background: '#f9f9f9',
  color: '#847e8e',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '14px',
  fontWeight: '500',
  padding: '14px 19px'
})

const DocumentFileIcon = styled(FileIcon, {
  marginRight: '16px'
})

export const PdftronDocument: FC<PdftronDocumentProps> = ({ fileName, fileType, fileUrl }) => {
  const [documentReady, viewer] = usePdftronDocument(fileUrl)

  return (
    <PdftronDocumentWrapper data-testid={TEST_ID_ENUM.editor.embedBlock.pdftron.id}>
      {!documentReady && (
        <SpinWrapper css={{ height: containerHeight }}>
          <DocumentSpin size="lg" />
        </SpinWrapper>
      )}
      <PdftronDocumentContainer ref={viewer} ready={documentReady} />
      <Footer>
        <DocumentFileIcon fileType={fileType} />
        {fileName}
      </Footer>
    </PdftronDocumentWrapper>
  )
}
