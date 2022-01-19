import React from 'react'
import { Icon, Menu, MenuProps, styled, theme } from '@brickdoc/design-system'
import { ActionItemGroupOption, ActionOptionGroup } from '../BlockActions'
import { ToolbarOption } from '../../Toolbar'
import { EditorContext } from '../../../context/EditorContext'
import * as EditorIcon from '../../Icon'
import { useOptions } from './useOptions'

export interface BlockActionsMenuProps {
  baseId?: MenuProps['baseId']
  basicOptions?: ActionItemGroupOption | null
  extraOptions?: ActionOptionGroup | null
  onClose?: () => void
}

export const ActionIcon = styled(EditorIcon.IconBackground, {
  color: theme.colors.deepPurple4,
  fontSize: '.8125rem',
  height: '1.625rem',
  width: '1.625rem'
})

const ActionMenuItem = styled(Menu.Item, {
  minWidth: 'calc(15rem - 10px)'
})

export const BlockActionsMenu: React.FC<BlockActionsMenuProps> = ({ extraOptions, basicOptions, baseId, onClose }) => {
  const { t } = React.useContext(EditorContext)
  const [options, blockOptions] = useOptions(extraOptions, basicOptions)

  const renderMenuItem = React.useCallback(
    (option: ToolbarOption, key: React.Key, onClose: BlockActionsMenuProps['onClose']): React.ReactElement => {
      if (option.type === 'item')
        return (
          <ActionMenuItem
            key={key}
            label={option.label}
            icon={option.icon}
            itemKey={option.name}
            active={option.active}
            tip={option.tip}
            onAction={key => {
              option.onAction?.(key)
              if (option.closeOnAction !== false) onClose?.()
            }}>
            {option.content}
          </ActionMenuItem>
        )
      else
        return (
          <Menu.SubMenuItem
            baseId={option.baseId}
            key={key}
            itemKey={option.name}
            label={option.label}
            icon={option.icon}>
            {typeof option.items === 'function'
              ? option.items()
              : option.items?.reduce<React.ReactElement[]>((elements, option, index, array) => {
                  if (option.type === 'group')
                    return [
                      ...elements,
                      <Menu.Group label={option.title} key={option.title ?? `group-${index}`}>
                        {option.items.map(option => renderMenuItem(option, option.name, onClose))}
                        {index < array.length - 1 && <Menu.Separator aria-label={t('toolbar.separator')} />}
                      </Menu.Group>
                    ]

                  return [...elements, renderMenuItem(option, option.name, onClose)]
                }, [])}
          </Menu.SubMenuItem>
        )
    },
    [t]
  )

  return (
    <Menu type="ghost" baseId={baseId}>
      {options?.reduce<React.ReactElement[]>((elements, option, index, array) => {
        if (option.type === 'group')
          return [
            ...elements,
            <Menu.Group label={option.title} key={option.title ?? `group-${index}`}>
              {option.items.map(option =>
                renderMenuItem(
                  {
                    ...option,
                    icon: <ActionIcon>{option.icon}</ActionIcon>
                  },
                  option.name,
                  onClose
                )
              )}
              {index < array.length - 1 && <Menu.Separator aria-label={t('toolbar.separator')} />}
            </Menu.Group>
          ]

        return [...elements, renderMenuItem(option, option.name, onClose)]
      }, [])}
      <Menu.SubMenuItem
        baseId={`${baseId}-add-block`}
        itemKey="addBlock"
        label={t('block_actions.add_block')}
        icon={
          <ActionIcon>
            <Icon.Add />
          </ActionIcon>
        }>
        {blockOptions?.reduce<React.ReactElement[]>((elements, option, index, array) => {
          if (option.type === 'group')
            return [
              ...elements,
              <Menu.Group label={option.title} key={option.title ?? `group-${index}`}>
                {option.items.map(option => (
                  renderMenuItem(option, option.name, onClose)
                ))}
                {index < array.length - 1 && <Menu.Separator aria-label={t('toolbar.separator')} />}
              </Menu.Group>
            ]

          return [...elements, renderMenuItem(option, option.name, onClose)]
        }, [])}
      </Menu.SubMenuItem>
    </Menu>
  )
}
