import React from 'react'
import { EditorContent, Editor, JSONContent } from '@tiptap/react'
import { MashcardFomulaEditor } from './style'
import { useFormulaEditor } from './useFormulaEditor'
import { globalCss, theme } from '@mashcard/design-system'

interface FormulaEditorProps {
  formulaEditor: Editor | null
  maxScreen?: boolean
  width?: number
  minHeight?: number
}

interface ReadonlyFormulaEditorProps {
  content: JSONContent | undefined
  width?: number
  minHeight?: number
}

const formulaEditorStyles = globalCss({
  p: {
    '&:before': {
      color: theme.colors.typeThirdary,
      content: 'attr(data-placeholder)',
      fontSize: theme.fontSizes.subHeadline,
      fontFamily: 'unset',
      // fontWeight: 400,
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      transform: 'translateY(-50%)',
      top: '50%',
      whiteSpace: 'nowrap'
    }
  }
})

export const FormulaEditor: React.FC<FormulaEditorProps> = ({ formulaEditor, width, minHeight, maxScreen }) => {
  formulaEditorStyles()
  const style = MashcardFomulaEditor({ maxScreen })
  return (
    <>
      <EditorContent
        style={{
          ...(width ? { width: `${width}px` } : {}),
          ...(minHeight ? { minHeight: `${minHeight}px` } : {})
        }}
        className={`mashcard-formula-editor ${style}`}
        editor={formulaEditor}
      />
    </>
  )
}

export const ReadonlyFormulaEditor: React.FC<ReadonlyFormulaEditorProps> = ({ content, width, minHeight }) => {
  const formulaEditor = useFormulaEditor({ content, editable: false })
  return <FormulaEditor formulaEditor={formulaEditor} width={width} minHeight={minHeight} />
}
