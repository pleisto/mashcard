import { useContext } from 'react'
import { SidebarLayoutPage } from '@/common/layouts/SidebarLayoutPage'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { siderBarVar } from '@/common/reactiveVars'
import { PodCard } from '@/common/components/PodCard'
import { BrickdocContext } from '@/BrickdocPWA'
import { useGetPodsQuery } from '@/BrickdocGraphQL'
import { useHistory } from 'react-router-dom'
import { Button } from '@brickdoc/design-system'

export const LayoutPage: React.FC<RouteConfigComponentProps> = ({ route }) => {
  const { currentPod } = useContext(BrickdocContext)
  const { loading, data } = useGetPodsQuery()
  const history = useHistory()
  if (loading) {
    return <></>
  }
  const pod = data?.pods.find(p => p.webid === currentPod.webid)

  siderBarVar(
    <>
      <h1> {pod?.personal ? 'User' : 'Pod'} Settings </h1>
      <PodCard pod={pod!} />
      <footer>
        <Button block onClick={() => history.push(`/${pod?.webid}`)}>
          Back to Pod
        </Button>
      </footer>
    </>
  )
  return <SidebarLayoutPage>{renderRoutes(route!.routes)}</SidebarLayoutPage>
}
