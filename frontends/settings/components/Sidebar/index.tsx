import { FC } from 'react'
import { useGetCurrentPodQuery } from '@/BrickdocGraphQL'
import { useNavigate } from 'react-router-dom'
import { PodCard } from '@/common/components/PodCard'
import { Button } from '@brickdoc/design-system'

export const Sidebar: FC = () => {
  const { loading, data } = useGetCurrentPodQuery({})
  const navigate = useNavigate()
  if (loading) {
    return <></>
  }

  const pod = data!.pod

  return (
    <>
      <h1> {pod.personal ? 'User' : 'Pod'} Settings </h1>
      <PodCard pod={pod} />
      <footer>
        <Button block onClick={() => navigate(`/${pod.webid}`)}>
          Back to Pod
        </Button>
      </footer>
    </>
  )
}
