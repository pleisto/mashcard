import React from 'react'
import { styled } from '@brickdoc/design-system'
import { BlockActions, BlockActionsProps } from '../BlockActions'
import { BlockContainerProps } from './BlockContainer'

const Pseudo = styled('span', {
  display: 'inline-block',
  width: '1px'
})

export function useBlockElement(
  originElement: React.ReactNode,
  actionOptions: BlockContainerProps['actionOptions'],
  inline: boolean,
  disableActionOptions: boolean
): [React.ReactNode] {
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

  const blockActionProps = React.useMemo<BlockActionsProps | undefined>(() => {
    if (disableActionOptions) return undefined
    if (Array.isArray(actionOptions)) return { options: actionOptions }
    return actionOptions
  }, [actionOptions, disableActionOptions])

  if ((blockActionProps?.options?.length ?? 0) > 0) {
    blockElement = <BlockActions {...blockActionProps!}>{blockElement}</BlockActions>
  }

  return [blockElement]
}
