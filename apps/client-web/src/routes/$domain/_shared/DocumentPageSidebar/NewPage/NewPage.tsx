import { useBlockCreateMutation } from '@/MashcardGraphQL'
import { Add } from '@mashcard/design-icons'
import { Spin } from '@mashcard/design-system'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { NewPageButton, loadingIconCls } from './NewPage.style'
import { useDocMeta } from '../../DocMeta'
import { queryPageBlocks } from '../../graphql'
import { useDocsI18n } from '../../useDocsI18n'

export const NewPage: FC = () => {
  const { t } = useDocsI18n()
  const { domain } = useDocMeta()

  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  const navigate = useNavigate()

  const onClick = async (): Promise<void> => {
    if (createBlockLoading) {
      return
    }
    const input = { title: '', username: domain }
    const { data } = await blockCreate({ variables: { input } })
    if (data?.blockCreate?.id) {
      navigate(`/${domain}/${data?.blockCreate?.id}`)
    }
  }

  return (
    <NewPageButton
      data-testid={TEST_ID_ENUM.page.DocumentPage.addPageButton.id}
      type="text"
      onClick={onClick}
      icon={createBlockLoading ? <Spin className={loadingIconCls} /> : <Add size={18} />}
    >
      {t('blocks.create_pages')}
    </NewPageButton>
  )
}
