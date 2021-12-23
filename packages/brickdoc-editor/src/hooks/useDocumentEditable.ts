import React from 'react'
import { EditorDataSourceContext } from '../dataSource/DataSource'

export function useDocumentEditable(): [boolean] {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const [documentEditable, setEditable] = React.useState(editorDataSource.documentEditable)
  editorDataSource.onUpdate(type => {
    if (type === 'documentEditable') {
      setEditable(editorDataSource.documentEditable)
    }
  })

  return [documentEditable]
}
