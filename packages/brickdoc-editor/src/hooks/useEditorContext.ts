import { useContext } from 'react'
import { EditorContext } from '../context/EditorContext'

export function useEditorContext() {
  return useContext(EditorContext)
}
