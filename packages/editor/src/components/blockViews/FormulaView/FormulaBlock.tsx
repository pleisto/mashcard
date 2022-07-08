import React from 'react'
import { Editor, NodeViewProps } from '@tiptap/core'
import {
  ContextInterface,
  display,
  dumpDisplayResultForDisplay,
  fetchResult,
  VariableData,
  VariableDisplayData,
  VariableInterface
} from '@mashcard/formula'
import { BlockContainer } from '../BlockContainer'
import { FormulaDisplay } from '../../ui/Formula'
import { FormulaMenuProps, useFormula, FormulaMenu, UseFormulaInput } from '.'
import { useEditorContext, useDocumentContext } from '../../../hooks'
import { Formula, FormulaAttributes } from '../../../extensions'

export interface FormulaBlockProps extends NodeViewProps {}

type FormulaBlockAttributes = FormulaAttributes & { uuid: string }

export interface FormulaRenderProps {
  attributes: FormulaBlockAttributes
  handleDefaultPopoverVisibleChange?: FormulaMenuProps['onVisibleChange']
  handleDelete?: FormulaMenuProps['handleDelete']
  onUpdateFormula?: UseFormulaInput['onUpdateFormula']
}

export function getFormulaContext(editor: Editor | undefined | null): ContextInterface | null | undefined {
  const extension = editor?.extensionManager.extensions.find(
    extension => extension.name === Formula.name
  ) as typeof Formula
  return extension?.options.formulaContext
}

export const FormulaRender: React.FC<FormulaRenderProps> = ({
  attributes: { isNew, uuid, formula },
  handleDefaultPopoverVisibleChange,
  handleDelete,
  onUpdateFormula
}) => {
  const { attrs } = formula ?? {}
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
    input: attrs?.display ?? '=',
    position: attrs?.position ?? 0,
    variableId: formulaId,
    richType: { type: formulaType },
    name: formulaName
  }

  const fallbackDisplayData: VariableDisplayData | undefined = attrs
    ? {
        definition: attrs.input,
        display: attrs.display,
        resultToRefactor: { type: 'string', result: attrs.display },
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        meta: { richType: { type: 'normal' } } as VariableDisplayData['meta']
      }
    : undefined

  const {
    selected,
    savedVariableT,
    temporaryVariableT,
    isDisableSave,
    references,
    nameRef,
    onSaveFormula,
    formulaEditor,
    maxScreenState,
    completion,
    formulaFormat
  } = useFormula({ meta, formulaContext, onUpdateFormula })

  const noMenu = !(handleDefaultPopoverVisibleChange && handleDelete)
  const [visible, setVisible] = React.useState(defaultVisible)

  const renderData = (
    <FormulaDisplay
      disablePopover={noMenu || visible}
      selected={selected}
      name={savedVariableT?.meta.name ?? formulaName}
      displayData={savedVariableT ? dumpDisplayResultForDisplay(savedVariableT) : fallbackDisplayData}
      formulaType={formulaType}
    />
  )

  if (noMenu) {
    return renderData
  }

  return (
    <FormulaMenu
      meta={meta}
      formulaFormat={formulaFormat}
      references={references}
      temporaryVariableT={temporaryVariableT}
      formulaEditor={formulaEditor}
      defaultVisible={defaultVisible}
      visibleState={[visible, setVisible]}
      maxScreenState={maxScreenState}
      onVisibleChange={handleDefaultPopoverVisibleChange}
      isDisableSave={isDisableSave}
      onSaveFormula={onSaveFormula}
      nameRef={nameRef}
      completion={completion}
      handleDelete={handleDelete}>
      {renderData}
    </FormulaMenu>
  )
}

export const FormulaBlock: React.FC<FormulaBlockProps> = ({ editor, node, updateAttributes, getPos }) => {
  const attrs: FormulaBlockAttributes = node.attrs as any

  const defaultVisible = attrs.isNew
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

  const onUpdateFormula: UseFormulaInput['onUpdateFormula'] = React.useCallback(
    async (v: VariableInterface | undefined) => {
      if (!v) return updateAttributes({ formula: { type: 'FORMULA' } })

      const { name, input, position } = v.meta()
      const attrs: FormulaAttributes['formula']['attrs'] = {
        name,
        input,
        position,
        display: display(fetchResult(v.t)).result
      }

      updateAttributes({ formula: { type: 'FORMULA', attrs } })
    },
    [updateAttributes]
  )

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
        attributes={attrs}
        handleDefaultPopoverVisibleChange={handleDefaultPopoverVisibleChange}
        handleDelete={handleDelete}
        onUpdateFormula={onUpdateFormula}
      />
    </BlockContainer>
  )
}
