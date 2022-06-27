import React from 'react'
import { Editor, NodeViewProps } from '@tiptap/core'
import {
  ContextInterface,
  displayValue,
  dumpDisplayResultForDisplay,
  fetchResult,
  VariableData
} from '@mashcard/formula'
import { BlockContainer } from '../BlockContainer'
import { FormulaDisplay } from '../../ui/Formula'
import { FormulaMenuProps, useFormula, FormulaMenu, UseFormulaInput } from '.'
import { useEditorContext, useDocumentContext } from '../../../hooks'
import { Formula } from '../../../extensions'

export interface FormulaBlockProps extends NodeViewProps {}

export interface FormulaRenderProps {
  attributes: { isNew: boolean; uuid: string }
  handleDefaultPopoverVisibleChange?: FormulaMenuProps['onVisibleChange']
  handleDelete?: FormulaMenuProps['handleDelete']
}

export function getFormulaContext(editor: Editor | undefined | null): ContextInterface | null | undefined {
  const extension = editor?.extensionManager.extensions.find(
    extension => extension.name === Formula.name
  ) as typeof Formula
  return extension?.options.formulaContext
}

export const FormulaRender: React.FC<FormulaRenderProps> = ({
  attributes: { isNew, uuid },
  handleDefaultPopoverVisibleChange,
  handleDelete
}) => {
  const defaultVisible = isNew
  const formulaId = uuid
  const { editor } = useEditorContext()
  const { docId } = useDocumentContext()
  const rootId = docId!
  const formulaContext = getFormulaContext(editor)
  const formulaType = 'normal'
  const formulaName = ''
  const meta: UseFormulaInput['meta'] = {
    namespaceId: rootId,
    variableId: formulaId,
    richType: { type: formulaType },
    name: formulaName
  }
  const {
    selected,
    savedVariableT,
    temporaryVariableT,
    isDisableSave,
    references,
    nameRef,
    onSaveFormula,
    formulaEditor,
    completion
  } = useFormula({ meta, formulaContext })

  const hasMenu = handleDefaultPopoverVisibleChange && handleDelete

  const renderData = (
    <FormulaDisplay
      disablePopover={!hasMenu}
      selected={selected}
      name={savedVariableT?.meta.name}
      display={savedVariableT ? displayValue(fetchResult(savedVariableT), rootId) : undefined}
      displayData={savedVariableT ? dumpDisplayResultForDisplay(savedVariableT) : undefined}
      formulaType={formulaType}
    />
  )

  if (!hasMenu) {
    return renderData
  }

  return (
    <FormulaMenu
      meta={meta}
      references={references}
      temporaryVariableT={temporaryVariableT}
      formulaEditor={formulaEditor}
      defaultVisible={defaultVisible}
      onVisibleChange={handleDefaultPopoverVisibleChange}
      isDisableSave={isDisableSave}
      onSaveFormula={onSaveFormula}
      nameRef={nameRef}
      completion={completion}
      handleDelete={handleDelete}
    >
      {renderData}
    </FormulaMenu>
  )
}

export const FormulaBlock: React.FC<FormulaBlockProps> = ({ editor, node, updateAttributes, getPos }) => {
  const defaultVisible = node.attrs.isNew
  const formulaContext = getFormulaContext(editor)

  const handleDelete = React.useCallback(
    async (variableT?: VariableData): Promise<void> => {
      const position = getPos()
      variableT && (await formulaContext?.removeVariable(variableT.meta.namespaceId, variableT.meta.variableId))
      if (!position || !node) return
      editor.commands.deleteRange({ from: position, to: position + node.nodeSize })
    },
    [editor.commands, formulaContext, getPos, node]
  )

  const handleTurnOffVisible = React.useCallback(() => updateAttributes({ isNew: false }), [updateAttributes])

  const handleDefaultPopoverVisibleChange = React.useCallback(
    (visible: boolean): void => {
      if (!visible && defaultVisible) {
        handleTurnOffVisible?.()
      }
    },
    [defaultVisible, handleTurnOffVisible]
  )

  return (
    <BlockContainer node={node} inline={true}>
      <FormulaRender
        attributes={node.attrs as any}
        handleDefaultPopoverVisibleChange={handleDefaultPopoverVisibleChange}
        handleDelete={handleDelete}
      />
    </BlockContainer>
  )
}
