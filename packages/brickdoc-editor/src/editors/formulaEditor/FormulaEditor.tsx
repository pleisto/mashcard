import React from 'react'
import { EditorContent, Editor, JSONContent } from '@tiptap/react'
import { BrickdocFomulaEditor } from './style'
import { useFormulaEditor } from './useFormulaEditor'

interface FormulaEditorProps {
  formulaEditor: Editor | null
  width?: number
  minHeight?: number
}

interface ReadonlyFormulaEditorProps {
  content: JSONContent | undefined
  width?: number
  minHeight?: number
}

export const FormulaEditor: React.FC<FormulaEditorProps> = ({ formulaEditor, width, minHeight }) => {
  return (
    <>
      <EditorContent
        style={{
          ...(width ? { width: `${width}px` } : {}),
          ...(minHeight ? { minHeight: `${minHeight}px` } : {})
        }}
        className={BrickdocFomulaEditor}
        editor={formulaEditor}
      />
    </>
  )
}

export const ReadonlyFormulaEditor: React.FC<ReadonlyFormulaEditorProps> = ({ content, width, minHeight }) => {
  const formulaEditor = useFormulaEditor({ content, editable: false })
  return <FormulaEditor formulaEditor={formulaEditor} width={width} minHeight={minHeight} />
}
