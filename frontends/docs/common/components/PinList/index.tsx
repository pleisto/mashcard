import { GetBlockPinsQuery } from '@/BrickdocGraphQL'
import { Divider, List } from '@brickdoc/design-system'
import React from 'react'
import { useDocsI18n } from '../../hooks'

interface PinListProps {
  webid: string
  docid: string | undefined
  pins: GetBlockPinsQuery['blockPins']
}

export const PinList: React.FC<PinListProps> = ({ webid, docid, pins }) => {
  const { t } = useDocsI18n()

  if (!pins?.length) {
    return <></>
  }

  return (
    <>
      Pin
      <List
        size="small"
        footer={null}
        header={null}
        dataSource={pins}
        split={false}
        renderItem={item => <List.Item>{item.text || t('title.untitled')}</List.Item>}
      />
      <Divider />
      Pages
    </>
  )
}
