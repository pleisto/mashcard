import { useBlockPinOrUnpinMutation } from '@/BrickdocGraphQL'
import { queryBlockInfo } from '@/docs/pages/graphql'
import { CheckOneFill, Star } from '@brickdoc/design-icons'
import { Button, Tooltip } from '@brickdoc/design-system'
import React from 'react'
import { queryBlockPins } from '../../graphql'
import { useDocsI18n } from '../../hooks'
interface PinMenuProps {
  id: string
  webid: string
  className: string
  pin: boolean
}

export const PinMenu: React.FC<PinMenuProps> = ({ id, webid, pin, className }) => {
  const [blockPinOrUnpin, { loading: blockPinOrUnpinLoading }] = useBlockPinOrUnpinMutation({
    refetchQueries: [queryBlockInfo, queryBlockPins]
  })
  const { t } = useDocsI18n()

  const onClick = async (): Promise<void> => {
    const input = { blockId: id, pin: !pin }
    await blockPinOrUnpin({ variables: { input } })
  }

  return (
    <>
      <Tooltip title={t(pin ? 'pin.remove_tooltip' : 'pin.add_tooltip')}>
        <Button className={className} type="text" onClick={onClick} disabled={blockPinOrUnpinLoading} loading={blockPinOrUnpinLoading}>
          {pin ? <CheckOneFill /> : <Star />}
        </Button>
      </Tooltip>
    </>
  )
}
