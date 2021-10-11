import React from 'react'
import { Plus } from '@brickdoc/design-system/components/icon'
import { useDocsI18n } from '../../hooks'
import { Button } from '@brickdoc/design-system'
import { useHistory } from 'react-router'
import { useBlockCreateMutation } from '@/BrickdocGraphQL'
import { queryPageBlocks } from '../../graphql'

interface NewPageProps {
  webid: string
}

export const NewPage: React.FC<NewPageProps> = ({ webid }) => {
  const { t } = useDocsI18n()

  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  const history = useHistory()

  const onClick = async (): Promise<void> => {
    const input = { title: '' }
    const { data } = await blockCreate({ variables: { input } })
    if (data?.blockCreate?.id) {
      history.push(`/${webid}/p/${data?.blockCreate?.id}`)
    }
  }

  return (
    <Button type="text" onClick={onClick} loading={createBlockLoading} disabled={createBlockLoading}>
      <Plus />
      {t('blocks.create_pages')}
    </Button>
  )
}
