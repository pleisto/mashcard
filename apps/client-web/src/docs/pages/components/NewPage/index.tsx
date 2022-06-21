import { FC } from 'react'
import { Add } from '@mashcard/design-icons'
import { useDocsI18n } from '../../../common/hooks'
import { Button } from '@mashcard/design-system'
import { useNavigate } from 'react-router-dom'
import { useBlockCreateMutation } from '@/MashcardGraphQL'
import { queryPageBlocks } from '../../../common/graphql'

import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { sidebarButtonStyles } from '../../DocumentContentPage.style'
import { useDocMeta } from '@/docs/store/DocMeta'

export const NewPage: FC = () => {
  const { t } = useDocsI18n()
  const { domain } = useDocMeta()

  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  const navigate = useNavigate()

  const onClick = async (): Promise<void> => {
    const input = { title: '' }
    const { data } = await blockCreate({ variables: { input } })
    if (data?.blockCreate?.id) {
      navigate(`/${domain}/${data?.blockCreate?.id}`)
    }
  }

  return (
    <Button
      data-testid={TEST_ID_ENUM.page.DocumentPage.addPageButton.id}
      type="text"
      css={sidebarButtonStyles}
      onClick={onClick}
      loading={createBlockLoading}
      icon={<Add size={18}/>}
      disabled={createBlockLoading}
    >
      {t('blocks.create_pages')}
    </Button>
  )
}
