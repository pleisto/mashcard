import { useContext } from 'react'
import { useBlockCreateMutation } from '@/BrickdocGraphQL'
import { queryPageBlocks } from '@/docs/common/graphql'
import { useNavigate } from 'react-router-dom'
import { BrickdocContext } from '@/common/brickdocContext'

export function useCreateAndNavigateToNewPage(): void {
  const context = useContext(BrickdocContext)
  const navigate = useNavigate()
  const webid = context.currentPod.webid
  const [blockCreate] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  async function createAndNavigateToNewPage(): Promise<void> {
    const { data: blockCreateData } = await blockCreate({ variables: { input: { title: '' } } })
    if (blockCreateData?.blockCreate?.id) {
      navigate(`/${webid}/${blockCreateData?.blockCreate?.id}`, { replace: true })
    }
  }
  void createAndNavigateToNewPage()
}
