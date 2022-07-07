import { useContext } from 'react'
import { useBlockCreateMutation } from '@/MashcardGraphQL'
import { queryPageBlocks } from '@/docs_legacy/common/graphql'
import { useNavigate } from 'react-router-dom'
import { MashcardContext } from '@/common/mashcardContext'

export function useCreateAndNavigateToNewPage(): void {
  const context = useContext(MashcardContext)
  const navigate = useNavigate()
  const domain = context.currentPod.domain
  const [blockCreate] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  async function createAndNavigateToNewPage(): Promise<void> {
    const { data: blockCreateData } = await blockCreate({ variables: { input: { title: '' } } })
    if (blockCreateData?.blockCreate?.id) {
      navigate(`/${domain}/${blockCreateData?.blockCreate?.id}`, { replace: true })
    }
  }
  void createAndNavigateToNewPage()
}
