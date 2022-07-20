import { useContext } from 'react'
import { useBlockCreateMutation } from '@/MashcardGraphQL'
import { queryPageBlocks } from '@/docs_legacy/common/graphql'
import { useNavigate } from 'react-router-dom'
import { MashcardContext } from '@/common/mashcardContext'
import { currentPodUsername } from '@/common/utils/currentPodUsername'

export function useCreateAndNavigateToNewPage(): void {
  const context = useContext(MashcardContext)
  const navigate = useNavigate()
  const domain = currentPodUsername(context)
  const [blockCreate] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  async function createAndNavigateToNewPage(): Promise<void> {
    const { data: blockCreateData } = await blockCreate({ variables: { input: { title: '', username: domain } } })
    if (blockCreateData?.blockCreate?.id) {
      navigate(`/${domain}/${blockCreateData?.blockCreate?.id}`, { replace: true })
    }
  }
  void createAndNavigateToNewPage()
}
