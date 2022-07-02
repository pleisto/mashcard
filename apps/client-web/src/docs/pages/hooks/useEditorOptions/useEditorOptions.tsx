import { Node } from 'prosemirror-model'
import { EditorOptions } from '@mashcard/editor'
import { Block } from '@mashcard/schema'
import { DocMeta } from '@/docs/store/DocMeta'
import { useMentionCommands } from './useMentionCommands'
import { useEmbed } from './useEmbed'
import { useReactiveVar } from '@apollo/client'
import { FormulaContextVar } from '@/docs/reactiveVars'
import { useCallback, useMemo } from 'react'
import { PageTree } from '@/docs/common/components/PageTree'
import { blockProvider } from '../useBlockSyncProvider'
import { getCursorColor } from '@/docs/utils/cursorColor'
import { useDiscussion } from './useDiscussion'

export interface UseEditorOptions {
  docMeta: DocMeta
  blocks: Block[]
  documentEditable: boolean
  provider: blockProvider | undefined
}

export function useEditorOptions({ docMeta, documentEditable, blocks, provider }: UseEditorOptions): EditorOptions {
  const discussion = useDiscussion(docMeta)
  const embed = useEmbed(blocks, docMeta)
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
