import { ReactNode, useMemo } from 'react'
import { styled } from '@mashcard/design-system'
import { BlockActions, BlockActionsProps } from '../BlockActions'
import { BlockContainerProps } from './BlockContainer'

const Pseudo = styled('span', {
  display: 'inline-block',
  width: '1px'
})

interface Options {
  inline: boolean
  disableActionOptions: boolean
  blockActionClassName?: string
}

export function useBlockElement(
  originElement: ReactNode,
  actionOptions: BlockContainerProps['actionOptions'],
  { inline, disableActionOptions, blockActionClassName }: Options
): [ReactNode] {
  let blockElement = originElement
  if (inline) {
    // add two empty span before and after the block element,
    // to make cursor position look normal
    blockElement = (
      <>
        <Pseudo contentEditable={false}>&nbsp;</Pseudo>
        {blockElement}
        <Pseudo contentEditable={false}>&nbsp;</Pseudo>
      </>
    )
  }

  const blockActionProps = useMemo<BlockActionsProps | undefined>(() => {
    if (disableActionOptions) return undefined
    if (Array.isArray(actionOptions)) return { options: actionOptions }
    return actionOptions
  }, [actionOptions, disableActionOptions])

  if ((blockActionProps?.options?.length ?? 0) === 0) {
    return [blockElement]
  }

  blockElement = (
    <BlockActions buttonClassName={blockActionClassName} {...blockActionProps}>
      {blockElement}
    </BlockActions>
  )

  return [blockElement]
}
