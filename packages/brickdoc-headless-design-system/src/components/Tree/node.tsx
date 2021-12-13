import { FC, useCallback, memo, MouseEvent, ReactNode } from 'react'
import { usePress } from '@react-aria/interactions'
import { Right } from '@brickdoc/design-icons'
import type { TNode } from './constants'
import { TreeRoot } from './style'

export interface TreeProps {
  treeData: TNode
  onClick: (node: TNode) => void
  handleSelected: (id: string) => void
  titleRender?: (node: TNode) => ReactNode
  selectedId?: string
}

/** Tree
 * @example
 */
const InternalNode: FC<TreeProps> = ({ treeData, onClick, handleSelected, titleRender, selectedId }) => {
  const {
    key,
    icon = '',
    hasChildren,
    // title,
    indent,
    value,
    isOpen
  } = treeData as any // TODO: WIP

  const { pressProps, isPressed } = usePress({
    onPress: e => {
      if (e.type === 'press') {
        handleSelected(value)
      }
    }
  })

  const handleOpen = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      onClick(treeData)
    },
    [treeData, onClick]
  )

  return (
    <>
      <TreeRoot.Base
        pressed={isPressed}
        selected={Boolean(value === selectedId)}
        role="button"
        tabIndex={0}
        data-test-id="BrkTree"
        key={key}
      >
        <TreeRoot.Indent size={indent} data-test-id="indent" />
        <TreeRoot.PageItem data-test-id="page-item">
          <TreeRoot.ItemContent data-test-id="item-content">
            <TreeRoot.Content data-test-id="content">
              {hasChildren ? (
                <TreeRoot.ContentArrow isOpen={isOpen} data-test-id="content-arrow" onClick={handleOpen}>
                  <Right data-test-id="content-icon" />
                </TreeRoot.ContentArrow>
              ) : (
                <TreeRoot.ContentArrow data-test-id="content-arrow" onClick={handleOpen}>
                  <TreeRoot.LeafDot data-test-id="leaf-dot" />
                </TreeRoot.ContentArrow>
              )}

              {icon ? <TreeRoot.ContentIcon data-test-id="content-icon">{icon}</TreeRoot.ContentIcon> : <></>}
              {/* Todo: fixed TS2769: No overload matches this call. pressProps.css */}
              <TreeRoot.ContentAction data-test-id="content-action" {...(pressProps as any)}>
                {titleRender?.(treeData)}
              </TreeRoot.ContentAction>
            </TreeRoot.Content>
          </TreeRoot.ItemContent>
        </TreeRoot.PageItem>
      </TreeRoot.Base>
    </>
  )
}

InternalNode.displayName = 'BrkTree'

export const Node = memo(InternalNode)
