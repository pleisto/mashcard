import React from 'react'
import { Add } from '@brickdoc/design-system/components/icon'
import { useDocsI18n } from '../../../common/hooks'
import { Button } from '@brickdoc/design-system'
import { useNavigate } from 'react-router'
import { BlockIdKind, useBlockCreateMutation } from '@/BrickdocGraphQL'
import { queryPageBlocks } from '../../../common/graphql'
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'

export const NewPage: React.FC<DocMetaProps> = ({ docMeta }) => {
  const { t } = useDocsI18n()

  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  const navigate = useNavigate()

  const onClick = async (): Promise<void> => {
    const input = { title: '' }
    const { data } = await blockCreate({ variables: { input } })
    if (data?.blockCreate?.id) {
      navigate(`/${docMeta.webid}/${BlockIdKind.P}/${data?.blockCreate?.id}`)
    }
  }

  return (
    <Button type="text" onClick={onClick} loading={createBlockLoading} disabled={createBlockLoading}>
      <Add />
      {t('blocks.create_pages')}
    </Button>
  )
}
