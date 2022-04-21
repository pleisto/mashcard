import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { displayValue, dumpDisplayResultForDisplay, fetchResult, VariableData } from '@brickdoc/formula'
import { BlockContainer } from '../BlockContainer'
import { useExternalProps } from '../../../hooks/useExternalProps'
import { FormulaDisplay } from '../../ui/Formula'
import { FormulaMenuProps, useFormula, FormulaMenu } from '.'

export interface FormulaBlockProps extends NodeViewProps {}

export interface FormulaRenderProps {
  attributes: { isNew: boolean; uuid: string }
  handleDefaultPopoverVisibleChange?: FormulaMenuProps['onVisibleChange']
  handleDelete?: FormulaMenuProps['handleDelete']
}

export const FormulaRender: React.FC<FormulaRenderProps> = ({
  attributes: { isNew, uuid },
  handleDefaultPopoverVisibleChange,
  handleDelete
}) => {
  const defaultVisible = isNew
  const formulaId = uuid
  const externalProps = useExternalProps()
  const rootId = externalProps.rootId
  const formulaContext = externalProps.formulaContext
  const formulaType = 'normal'
  const formulaName = ''
  const {
    variableT,
    selected,
    savedVariableT,
    isDisableSave,
    nameRef,
    onSaveFormula,
    updateEditor,
    defaultName,
    editorContent,
    completion
  } = useFormula({
    meta: {
      namespaceId: rootId,
      variableId: formulaId,
      richType: { type: formulaType },
      name: formulaName
    },
    formulaContext
  })

  const hasMenu = handleDefaultPopoverVisibleChange && handleDelete

  const renderData = (
    <FormulaDisplay
      disablePopover={!hasMenu}
      selected={selected}
      name={savedVariableT?.name}
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
      rootId={rootId}
      formulaId={formulaId}
      editorContent={editorContent}
      defaultVisible={defaultVisible}
      onVisibleChange={handleDefaultPopoverVisibleChange}
      updateEditor={updateEditor}
      isDisableSave={isDisableSave}
      onSaveFormula={onSaveFormula}
      variableT={variableT}
      defaultName={defaultName}
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
  const externalProps = useExternalProps()
  const formulaContext = externalProps.formulaContext

  const handleDelete = React.useCallback(
    async (variableT?: VariableData): Promise<void> => {
      const position = getPos()
      variableT && (await formulaContext?.removeVariable(variableT.namespaceId, variableT.variableId))
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
