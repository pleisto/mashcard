import React from 'react'
import { Add } from '@brickdoc/design-system/components/icon'
import { useDocsI18n } from '../../../common/hooks'
import { Button } from '@brickdoc/design-system'
import { useNavigate } from 'react-router'
import { useBlockCreateMutation } from '@/BrickdocGraphQL'
import { queryPageBlocks } from '../../../common/graphql'
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'

import styles from './index.module.less'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

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
      navigate(`/${docMeta.webid}/${data?.blockCreate?.id}`)
    }
  }

  return (
    <Button
      data-testid={TEST_ID_ENUM.page.DocumentPage.addPageButton.id}
      type="text"
      className={styles.createBtn}
      onClick={onClick}
      loading={createBlockLoading}
      disabled={createBlockLoading}>
      <Add />
      {t('blocks.create_pages')}
    </Button>
  )
}
