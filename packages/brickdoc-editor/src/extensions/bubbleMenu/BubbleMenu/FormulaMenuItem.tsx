import React from 'react'
import { Editor } from '@tiptap/core'
import { Tooltip, Icon, Button } from '@brickdoc/design-system'
import { FormulaMenu } from '../../../components'
import { useEditorI18n } from '../../../hooks'
import { StyleMeta } from './BubbleMenu'
import { FormulaOptions } from '../..'

export interface FormulaMenuItemProps {
  editor: Editor
  formulaContextActions: FormulaOptions['formulaContextActions']
}

const FormulaStyle: StyleMeta = {
  key: 'formula',
  value: 'formula',
  label: <Icon.Formula />
}

export const FormulaMenuItem: React.FC<FormulaMenuItemProps> = ({ editor, formulaContextActions }) => {
  const { t } = useEditorI18n()

  return (
    <Tooltip
      overlayClassName="brickdoc-bubble-menu-item-hint"
      destroyTooltipOnHide={true}
      title={
        <>
          <div className="item-hint-main">{t(`bubblemenu.items.${FormulaStyle.key}.desc`)}</div>
          {FormulaStyle.shortcutDesc && <div className="item-hint-sub">{FormulaStyle.shortcutDesc}</div>}
        </>
      }
      placement="top">
      <FormulaMenu clear={true} editor={editor} formulaContextActions={formulaContextActions}>
        <Button role="menuitem" type="text" className="bubble-menu-item">
          {FormulaStyle.label}
        </Button>
      </FormulaMenu>
    </Tooltip>
  )
}