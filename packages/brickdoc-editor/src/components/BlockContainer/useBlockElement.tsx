import { styled } from '@brickdoc/design-system'
import { BlockActions } from '../BlockActions'
import { BlockContainerProps } from './BlockContainer'

const Pseudo = styled('span', {
  display: 'inline-block',
  width: '1px'
})

export function useBlockElement(
  originElement: React.ReactNode,
  actionOptions: BlockContainerProps['actionOptions'],
  inline: boolean,
  atListStart: boolean
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

  if ((actionOptions?.length ?? 0) > 0) {
    blockElement = (
      <BlockActions atListStart={atListStart} options={actionOptions!}>
        {blockElement}
      </BlockActions>
    )
  }

  return [blockElement]
}
