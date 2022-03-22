import { FC, MouseEvent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { styled, theme } from '@brickdoc/design-system'
import { ArrowFilleRight } from '@brickdoc/design-icons'
import { isEmpty } from '@brickdoc/active-support'
import { TocNode } from './tocTree'
import { EditorContext } from '../../../context/EditorContext'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

export interface TocNodePanelProps {
  tocNode: TocNode
}

const itemHeight = 24
const itemGap = 7

const TocItemTitle = styled('span', {
  color: theme.colors.typeSecondary,
  cursor: 'pointer',
  display: 'inline-block',
  fontSize: theme.fontSizes.body,
  lineHeight: `${itemHeight}px`,
  position: 'relative',

  '&:after': {
    background: theme.colors.typeDisabled,
    bottom: 0,
    content: '',
    height: '1px',
    left: 0,
    position: 'absolute',
    right: 0
  },
  variants: {
    level: {
      root: {
        marginLeft: '0'
      },
      1: {
        marginLeft: '0'
      },
      2: {
        marginLeft: '1em'
      },
      3: {
        marginLeft: '2em'
      },
      4: {
        marginLeft: '3em'
      },
      5: {
        marginLeft: '4em'
      },
      text: {
        marginLeft: '5em'
      }
    }
  }
})

const TocStyledItem = styled('div', {
  alignItems: 'start',
  display: 'flex',
  flexDirection: 'column'
})

const ToggleIcon = styled(ArrowFilleRight, {
  color: theme.colors.typePrimary,
  display: 'inline',
  fontSize: '.45rem',
  left: '0',
  position: 'absolute',
  transform: 'translate(-.75rem, -29%)',
  transition: 'rotate .1s ease-out',
  top: '50%',
  variants: {
    collapse: {
      true: {
        transform: 'translate(-.75rem, -29%) rotate(0)'
      },
      false: {
        transform: 'translate(-.75rem, -29%) rotate(90deg)'
      }
    }
  }
})

const TocItemContent = styled('div', {
  marginTop: `${itemGap}px`,
  overflow: 'hidden',
  transition: 'max-height .1s ease-out'
})

const containerVerticalPadding = 16

const TocStyledContainer = styled('div', {
  background: theme.colors.backgroundPrimary,
  border: `1px solid ${theme.colors.borderPrimary}`,
  borderRadius: '8px',
  display: 'inline-block',
  minWidth: '23.375rem',
  padding: `${containerVerticalPadding}px 0`
})

const TocStyledContainerInner = styled('div', {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: `0 2rem`
})

export interface TocContainerProps {
  tocItemCount: number
}

export const TocContainer: FC<TocContainerProps> = ({ tocItemCount, children }) => {
  return (
    <TocStyledContainer
      role="presentation"
      css={{
        height: tocItemCount > 0 ? `${containerVerticalPadding * 2 + tocItemCount * (itemHeight + itemGap)}px` : 'unset'
      }}
    >
      <TocStyledContainerInner>{children}</TocStyledContainerInner>
    </TocStyledContainer>
  )
}

export const TocNodePanel: FC<TocNodePanelProps> = ({ tocNode }) => {
  const { t, editor } = useContext(EditorContext)
  const contentRef = useRef<HTMLDivElement>(null)
  const [collapse, setCollapse] = useState(false)
  const toggleCollapse = useCallback(
    (event: MouseEvent<HTMLSpanElement>): void => {
      event.stopPropagation()
      if (!contentRef.current) return
      if (collapse) {
        contentRef.current.style.maxHeight = `${contentRef.current?.scrollHeight}px`
      } else {
        contentRef.current.style.maxHeight = `0px`
      }
      setCollapse(!collapse)
    },
    [collapse]
  )

  useEffect(() => {
    if (!contentRef.current) return
    contentRef.current.style.maxHeight = `${contentRef.current?.scrollHeight}px`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tocNode.children.length])

  const onItemClick = useCallback(() => {
    const dom = editor?.view.domAtPos(tocNode.item.position + 1)
    editor?.chain().setTextSelection(tocNode.item.position).focus().run()
    // try native scrollIntoView first
    if (dom?.node && !(dom.node as HTMLElement).classList.contains('ProseMirror')) {
      ;(dom.node as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
    } else {
      editor?.commands.scrollIntoView()
    }
  }, [editor, tocNode.item.position])

  return (
    <TocStyledItem role="menuitem" data-testid={TEST_ID_ENUM.editor.tocBlock.item.id}>
      <TocItemTitle
        level={tocNode.item.level}
        onClick={onItemClick}
        data-testid={TEST_ID_ENUM.editor.tocBlock.item.title.id}
      >
        {tocNode.children.length > 0 && (
          <ToggleIcon
            data-testid={TEST_ID_ENUM.editor.tocBlock.item.toggleIcon.id}
            collapse={collapse}
            onClick={toggleCollapse}
          />
        )}
        {isEmpty(tocNode.item.content) ? t('blocks.toc.untitled') : tocNode.item.content}
      </TocItemTitle>
      <TocItemContent data-testid={TEST_ID_ENUM.editor.tocBlock.item.contentPanel.id} ref={contentRef}>
        {tocNode.children.map((node, index) => (
          <TocNodePanel key={index} tocNode={node} />
        ))}
      </TocItemContent>
    </TocStyledItem>
  )
}
