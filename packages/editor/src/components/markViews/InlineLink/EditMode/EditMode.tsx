import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Menu, MenuItemProps, toast } from '@mashcard/design-system'
import { FilePages, Link } from '@mashcard/design-icons'
import {
  RemoveButton,
  InputIcon,
  LinkInput,
  UnlinkIcon,
  Title,
  InputContainer,
  OptionsMenu,
  OptionsMenuItemIconWrapper,
  OptionsMenuItem,
  OptionsMenuItemInner,
  OptionsMenuItemLabel,
  OptionsMenuItemDescription,
  OptionsMenuItemContent,
  InputPlaceholder
} from './EditMode.style'
import { Row } from '../Detail/Detail.style'
import { useEditorContext, useEditorI18n } from '../../../../hooks'
import { prependUrlScheme } from '@mashcard/active-support'
import { LinkAttributes, LinkPage } from '../../../../extensions/marks/link/meta'
import { Link as LinkMark } from '../../../../extensions/marks/link'

export interface InlineLinkEditModeProps {
  link: string
  type: LinkAttributes['type']
  onLinkChange: (type: LinkAttributes['type'], linkOrPageId: string) => void
  onUnsetLink: () => void
}

const MenuItem: FC<{
  active?: MenuItemProps['active']
  itemKey: MenuItemProps['itemKey']
  label: string
  description?: string
  icon: ReactElement
  onClick?: () => void
}> = ({ itemKey, active, label, description, icon, onClick }) => {
  return (
    <OptionsMenuItem itemKey={itemKey} active={active} onAction={onClick}>
      <OptionsMenuItemInner>
        <OptionsMenuItemIconWrapper>{icon}</OptionsMenuItemIconWrapper>
        <OptionsMenuItemContent>
          <OptionsMenuItemLabel>{label}</OptionsMenuItemLabel>
          {description && <OptionsMenuItemDescription>{description}</OptionsMenuItemDescription>}
        </OptionsMenuItemContent>
      </OptionsMenuItemInner>
    </OptionsMenuItem>
  )
}

function usePages(): LinkPage[] {
  const { editor } = useEditorContext()
  const extension = editor?.extensionManager.extensions.find(
    extension => extension.name === LinkMark.name
  ) as typeof LinkMark

  if (!extension) return []

  return extension.options.pages ?? []
}

export const InlineLinkEditMode: FC<InlineLinkEditModeProps> = ({ link, type, onLinkChange, onUnsetLink }) => {
  const [t] = useEditorI18n()
  const [originalLink, setOriginalLink] = useState(type === 'page' ? '' : link)
  const [inputLink, setInputLink] = useState(type === 'page' ? '' : link)
  useEffect(() => {
    const inputLink = type === 'page' ? '' : link
    setInputLink(inputLink)
    setOriginalLink(inputLink)
  }, [link, type])

  const handleUnsetLink = useCallback(() => {
    setInputLink('')
    setOriginalLink('')
    onUnsetLink()
  }, [onUnsetLink])

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
    setInputLink(event.target.value)
  }, [])

  const pages = usePages()
  const options = useMemo(
    () =>
      pages.filter(
        item =>
          inputLink &&
          (item.title.toLowerCase().includes(inputLink.toLowerCase()) ||
            (item.path ?? '').toLowerCase().includes(inputLink.toLowerCase()))
      ),
    [inputLink, pages]
  )

  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const active = useMemo(
    () => (activeIndex === undefined ? options.length : activeIndex),
    [activeIndex, options.length]
  )
  const moveUp = useCallback(() => setActiveIndex(Math.max(active - 1, 0)), [active])
  const moveDown = useCallback(() => setActiveIndex(Math.min(active + 1, options.length)), [active, options.length])

  const handleConfirm = useCallback(
    (activeIndex?: number) => {
      if (!inputLink) {
        toast.error(t('inline_link.edit.blank'))
        return
      }

      const activeItemIndex = activeIndex ?? active
      const type = activeItemIndex === options.length ? 'link' : 'page'

      const link = type === 'link' ? prependUrlScheme(inputLink) : ''
      const linkOrPageId = type === 'link' ? link : options[activeItemIndex].id

      setInputLink(link)
      setOriginalLink(link)
      onLinkChange(type, linkOrPageId)
    },
    [active, inputLink, onLinkChange, options, t]
  )

  const handleKeyDown = useCallback<KeyboardEventHandler>(
    event => {
      if (event.altKey || event.ctrlKey || event.metaKey) return

      switch (event.key) {
        case 'ArrowUp':
          moveUp()
          break
        case 'ArrowDown':
          moveDown()
          break
        case 'Enter':
          handleConfirm()
          break
        default:
          return
      }

      event.preventDefault()
    },
    [handleConfirm, moveDown, moveUp]
  )

  const isLinkDirty = originalLink !== inputLink

  return (
    <>
      <Row>
        <Title>{t('inline_link.edit.title')}</Title>
        {link && (
          <RemoveButton onClick={handleUnsetLink} type="text" size="md" icon={<UnlinkIcon />}>
            {t('inline_link.edit.remove')}
          </RemoveButton>
        )}
      </Row>
      <Row>
        {isLinkDirty && <InputPlaceholder />}
        <InputContainer mode={isLinkDirty ? 'selector' : 'default'}>
          <LinkInput
            prefix={
              <InputIcon>
                <Link />
              </InputIcon>
            }
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            borderType="underline"
            value={inputLink}
            placeholder={t('inline_link.edit.placeholder')}
          />
          {isLinkDirty && (
            <OptionsMenu type="ghost">
              {options.length > 0 && (
                <Menu.Group label={t('inline_link.edit.options.group_label')}>
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      active={active === index}
                      itemKey={index.toString()}
                      icon={<span>{(option.icon ?? '') || <FilePages />}</span>}
                      label={option.title}
                      description={option.path}
                      onClick={() => handleConfirm(index)}
                    />
                  ))}
                </Menu.Group>
              )}
              {options.length > 0 && <Menu.Separator />}
              <Menu.Group>
                <MenuItem
                  active={active === options.length}
                  itemKey="link_web"
                  icon={<Link />}
                  label={t('inline_link.edit.options.link_web')}
                  onClick={() => handleConfirm()}
                />
              </Menu.Group>
            </OptionsMenu>
          )}
        </InputContainer>
      </Row>
    </>
  )
}
