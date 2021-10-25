import { useBlockPinOrUnpinMutation } from '@/BrickdocGraphQL'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { useApolloClient } from '@apollo/client'
import { Button, Tooltip, Icon } from '@brickdoc/design-system'
import React from 'react'
import { queryBlockPins } from '../../graphql'
import { useDocsI18n } from '../../hooks'
interface PinMenuProps {
  docMeta: NonNullDocMeta
  className: string
}

export const PinMenu: React.FC<PinMenuProps> = ({ docMeta, className }) => {
  const client = useApolloClient()
  const [blockPinOrUnpin, { loading: blockPinOrUnpinLoading }] = useBlockPinOrUnpinMutation({
    refetchQueries: [queryBlockPins]
  })
  const { t } = useDocsI18n()

  const onClick = async (): Promise<void> => {
    const input = { blockId: docMeta.id, pin: !docMeta.pin }
    await blockPinOrUnpin({ variables: { input } })
    client.cache.modify({
      id: client.cache.identify({ __typename: 'BlockInfo', id: docMeta.id }),
      fields: {
        pin() {
          return !docMeta.pin
        }
      }
    })
  }

  return (
    <>
      <Tooltip title={t(docMeta.pin ? 'pin.remove_tooltip' : 'pin.add_tooltip')}>
        <Button className={className} type="text" onClick={onClick} disabled={blockPinOrUnpinLoading} loading={blockPinOrUnpinLoading}>
          {docMeta.pin ? <Icon.Pin /> : <Icon.Unpin />}
        </Button>
      </Tooltip>
    </>
  )
}
