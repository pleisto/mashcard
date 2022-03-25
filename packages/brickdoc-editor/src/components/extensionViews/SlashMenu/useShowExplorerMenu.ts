import { useCallback, useContext, useMemo } from 'react'
import { ExplorerMenuGroup, BrickdocEventBus, SlashMenuHide, ExplorerMenuTrigger } from '@brickdoc/schema'
import { EditorContext } from '../../../context/EditorContext'
import { slashMenuGroup } from '../../../extensions/extensions/slashCommands/items'
import { SlashMenuProps } from './SlashMenu'

export function useShowExplorerMenu(command: SlashMenuProps['command']): [VoidFunction] {
  const { t } = useContext(EditorContext)
  const explorerMenuGroups = useMemo<ExplorerMenuGroup[]>(
    () =>
      slashMenuGroup.map(group => ({
        label: t(`slash_menu.explorer_menu.group.${group.key}.label`),
        items: group.items.map(item => ({
          label: t(`blocks.${item.key}.label`),
          labelText: t(`blocks.${item.key}.label`),
          icon: item.icon,
          onAction: () => {
            command(item)
          }
        }))
      })),
    [command, t]
  )

  const handleShowExplorerMenu = useCallback(() => {
    BrickdocEventBus.dispatch(SlashMenuHide({}))
    BrickdocEventBus.dispatch(ExplorerMenuTrigger({ visible: true, items: explorerMenuGroups }))
  }, [explorerMenuGroups])

  return [handleShowExplorerMenu]
}
