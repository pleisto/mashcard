import { EditorOptions } from '@mashcard/editor'
import { Block } from '@mashcard/schema'
import { DocMeta } from '@/docs_legacy/store/DocMeta'
import { useMentionCommands } from './useMentionCommands'
import { useEmbed } from './useEmbed'
import { useReactiveVar } from '@apollo/client'
import { FormulaContextVar } from '@/docs_legacy/reactiveVars'
import { useCallback, useMemo } from 'react'
import { PageTree } from '@/docs_legacy/common/components/PageTree'
import { blockProvider } from '../useBlockSyncProvider'
import { getCursorColor } from '@/docs_legacy/utils/cursorColor'
import { useDiscussion } from './useDiscussion'

export interface UseEditorOptions {
  docMeta: DocMeta
  documentBlock: Block
  documentEditable: boolean
  provider: blockProvider | undefined
}

export function useEditorOptions({ docMeta, documentEditable, documentBlock, provider }: UseEditorOptions): EditorOptions {
  const discussion = useDiscussion(docMeta)
  const embed = useEmbed(documentBlock, docMeta)
  const formulaContext = useReactiveVar(FormulaContextVar)
  const mentionCommands = useMentionCommands(docMeta)
  const renderView = useCallback(() => <PageTree mode="subPage" />, [])
  const { currentUser } = globalThis.mashcardContext

  return useMemo<EditorOptions>(
    () => ({
      base: {
        callout: {
          prepareFileUpload: embed.prepareFileUpload
        },
        collaboration: provider ? { document: provider.document } : false,
        collaborationCursor:
          provider && currentUser
            ? {
                provider,
                user: {
                  id: currentUser.name,
                  name: currentUser.name,
                  avatarData: currentUser.avatarData,
                  operatorId: globalThis.mashcardContext.uuid,
                  color: getCursorColor(`c:${currentUser.name}`)
                }
              }
            : false,
        discussion,
        embed,
        formula: {
          formulaContext
        },
        mentionCommands,
        pageLink: {
          pages: mentionCommands.pages
        },
        subPageMenu: {
          renderView
        }
      },
      editable: documentEditable
    }),
    [discussion, documentEditable, embed, formulaContext, mentionCommands, renderView, provider, currentUser]
  )
}
