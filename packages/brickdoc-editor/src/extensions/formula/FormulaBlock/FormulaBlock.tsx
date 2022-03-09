import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { displayValue, dumpDisplayResultForDisplay, fetchResult, VariableData } from '@brickdoc/formula'
import { EditorDataSourceContext } from '../../../dataSource/DataSource'
import { useFormula, BlockContainer, FormulaMenu, FormulaMenuProps, FormulaDisplay } from '../../../components/'

export interface FormulaBlockProps extends NodeViewProps {}

export interface FormulaRenderProps {
  attributes: { isNew: boolean; uuid: string }
  handleDefaultPopoverVisibleChange?: FormulaMenuProps['onVisibleChange']
  handleDelete?: FormulaMenuProps['handleDelete']
}

const updateFormula = (): void => {}

export const FormulaRender: React.FC<FormulaRenderProps> = ({
  attributes: { isNew, uuid },
  handleDefaultPopoverVisibleChange,
  handleDelete
}) => {
  const defaultVisible = isNew
  const formulaId = uuid
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const rootId = editorDataSource.rootId
  const formulaContext = editorDataSource.formulaContext
  const formulaType = 'normal'
  const formulaName = undefined
  const {
    variableT,
    selected,
    savedVariableT,
    isDisableSave,
    nameRef,
    doHandleSave,
    updateEditor,
    defaultName,
    editorContent,
    completion
  } = useFormula({
    rootId,
    formulaId,
    updateFormula,
    formulaContext,
    formulaType,
    formulaName
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
      doHandleSave={doHandleSave}
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
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const formulaContext = editorDataSource.formulaContext

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
    <BlockContainer inline={true}>
      <FormulaRender
        attributes={node.attrs as any}
        handleDefaultPopoverVisibleChange={handleDefaultPopoverVisibleChange}
        handleDelete={handleDelete}
      />
    </BlockContainer>
  )
}
