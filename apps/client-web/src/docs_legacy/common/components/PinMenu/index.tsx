import { useBlockPinOrUnpinMutation } from '@/MashcardGraphQL'
import { hiddenItemStyle } from '@/docs_legacy/pages/components/DocumentTopBar/DocumentTopBar.style'
import { useNonNullDocMeta } from '@/docs_legacy/store/DocMeta'
import { useApolloClient } from '@apollo/client'
import { Button, Tooltip, Icon } from '@mashcard/design-system'
import React from 'react'
import { queryBlockPins } from '../../graphql'
import { useDocsI18n } from '../../hooks'
interface PinMenuProps {
  className?: string
}

export const PinMenu: React.FC<PinMenuProps> = ({ className }) => {
  const { t } = useDocsI18n()
  const { id, documentInfo } = useNonNullDocMeta()
  const pin = documentInfo?.pin
  const client = useApolloClient()
  const [blockPinOrUnpin, { loading: blockPinOrUnpinLoading }] = useBlockPinOrUnpinMutation({
    refetchQueries: [queryBlockPins]
  })

  const onClick = async (): Promise<void> => {
    const input = { blockId: id, pin: !pin }
    await blockPinOrUnpin({ variables: { input } })
    client.cache.modify({
      id: client.cache.identify({ __typename: 'BlockInfo', id }),
      fields: {
        pin() {
          return !pin
        }
      }
    })
  }

  const iconRender = pin ? <Icon.Pin /> : <Icon.Unpin />

  return (
    <>
      <Tooltip title={t(pin ? 'pin.remove_tooltip' : 'pin.add_tooltip')}>
        <Button
          className={className}
          type="text"
          aria-label={t('pin.name')}
          onClick={onClick}
          disabled={blockPinOrUnpinLoading}
          css={hiddenItemStyle}
        >
          {blockPinOrUnpinLoading ? <></> : iconRender}
        </Button>
      </Tooltip>
    </>
  )
}
