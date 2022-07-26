import { cloneElement, FC, Key, ReactElement, useCallback } from 'react'
import { cx, css, Menu, MenuProps, styled, theme, PopoverN, Icon } from '@mashcard/design-system'
import { ActionOptionGroup } from '../BlockActions'
import { Add, IconBackground, ToolbarOption } from '../../../ui'
import { useOptions } from './useOptions'
import { ActionGroupOption } from '..'
import { useEditorI18n } from '../../../../hooks'

const SubMenuRightArrow = styled(Icon.ArrowRight, {
  color: theme.colors.typeThirdary
})

export interface BlockActionsMenuProps {
  baseId?: MenuProps['baseId']
  basicOptions?: ActionGroupOption | null
  extraOptions?: ActionOptionGroup | null
  onClose?: () => void
}

const iconSize = '.8125rem'

export const actionIconStyle = css({
  color: theme.colors.deepPurple4,
  fontSize: iconSize,
  lineHeight: 1,
  marginTop: '2px'
})

export const actionIconBackgroundStyle = css({
  height: '1.3rem',
  width: '1.3rem'
})

export const blockIconStyle = css({
  fontSize: iconSize,
  height: '1.625rem',
  lineHeight: iconSize,
  width: '1.625rem'
})

const ActionMenuItem = styled(Menu.Item, {
  minWidth: 'calc(15rem - 10px)'
})

const PopoverWrapper = styled('div', {
  '&:hover': {
    background: theme.colors.secondaryHover
  }
})

export const BlockActionsMenu: FC<BlockActionsMenuProps> = ({ extraOptions, basicOptions, baseId, onClose }) => {
  const [t] = useEditorI18n()
  const [options, blockOptions] = useOptions(extraOptions, basicOptions)

  const renderMenuItem = useCallback(
    (option: ToolbarOption, key: Key, onClose: BlockActionsMenuProps['onClose']): ReactElement => {
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
          <PopoverWrapper>
            <PopoverN
              overlayInnerStyle={{ padding: 0 }}
              placement="right-start"
              trigger={'hover'}
              render={() => {
                return typeof option.items === 'function'
                  ? option.items()
                  : option.items?.reduce<ReactElement[]>((elements, option, index, array) => {
                      if (option.type === 'group')
                        return [
                          ...elements,
                          <Menu.Group label={option.title} key={option.title ?? `group-${index}`}>
                            {option.items.map(option => renderMenuItem(option, option.name, onClose))}
                            {index < array.length - 1 && <Menu.Separator aria-label={t('toolbar.separator')} />}
                          </Menu.Group>
                        ]

                      return [...elements, renderMenuItem(option, option.name, onClose)]
                    }, [])
              }}>
              <Menu.Item
                style={{ background: 'transparent' }}
                tip={<SubMenuRightArrow />}
                key={key}
                itemKey={option.name}
                label={option.label}
                icon={option.icon}></Menu.Item>
            </PopoverN>
          </PopoverWrapper>
        )
    },
    [t]
  )

  return (
    <Menu type="ghost" baseId={baseId}>
      {options?.reduce<ReactElement[]>((elements, option, index, array) => {
        if (option.type === 'group')
          return [
            ...elements,
            <Menu.Group label={option.title} key={option.title ?? `group-${index}`}>
              {option.items.map(option =>
                renderMenuItem(
                  {
                    ...option,
                    icon: option.icon ? (
                      <IconBackground className={actionIconBackgroundStyle()}>
                        {cloneElement(option.icon, { className: actionIconStyle() })}
                      </IconBackground>
                    ) : undefined
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
      <PopoverWrapper>
        <PopoverN
          overlayInnerStyle={{ padding: 0 }}
          placement="right-start"
          trigger={'hover'}
          render={() => {
            return blockOptions?.reduce<ReactElement[]>((elements, option, index, array) => {
              if (option.type === 'group')
                return [
                  ...elements,
                  <Menu.Group label={option.title} key={option.title ?? `group-${index}`}>
                    {option.items.map(option => renderMenuItem(option, option.name, onClose))}
                    {index < array.length - 1 && <Menu.Separator aria-label={t('toolbar.separator')} />}
                  </Menu.Group>
                ]

              return [...elements, renderMenuItem(option, option.name, onClose)]
            }, [])
          }}>
          <Menu.Item
            style={{ background: 'transparent' }}
            tip={<SubMenuRightArrow />}
            itemKey="addBlock"
            label={t('block_actions.add_block')}
            icon={<Add square={true} className={cx(actionIconStyle(), actionIconBackgroundStyle())} />}
          />
        </PopoverN>
      </PopoverWrapper>
    </Menu>
  )
}
