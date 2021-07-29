import React from 'react'
import { DocumentProps } from 'react-pdf'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

export interface PdfDocumentProps {
  file: File | string
  scale?: number
}

export const PdfDocument: React.FC<PdfDocumentProps> = ({ scale, file }) => {
  const [numPages, setNumPages] = React.useState<number | null>(null)

  const onDocumentLoadSuccess: DocumentProps['onLoadSuccess'] = ({ numPages }) => {
    setNumPages(numPages)
  }

  return (
    <div className="brickdoc-pdf-section-document">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scale ?? 1} />
        ))}
      </Document>
    </div>
  )
}
