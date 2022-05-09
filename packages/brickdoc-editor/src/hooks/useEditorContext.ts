import { useContext } from 'react'
import { EditorContext, EditorContextData } from '../context/EditorContext'

export function useEditorContext(): EditorContextData {
  return useContext(EditorContext)
}
