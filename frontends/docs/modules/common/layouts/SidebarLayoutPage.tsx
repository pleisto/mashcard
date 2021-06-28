import React from "react"
import { Helmet } from "react-helmet-async"
import { Layout } from "@brickdoc/design-system"
import { useDocsI18n } from "../hooks"
import PageTree from '@/docs/modules/common/components/PageTree'
import PodSelect from "@/docs/modules/common/components/PodSelect"
import { useReactiveVar } from "@apollo/client"
import { currentWebidVar } from "@/docs/vars"

const SidebarLayoutPage: React.FC = (props)=>{
  const { t } = useDocsI18n()
  const { Sider, Content } = Layout
  const currentWebid = useReactiveVar(currentWebidVar)
  return(<>
    <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} />
    <Layout>
      <Sider width={240}>
        <PodSelect webid={currentWebid}  />
        <PageTree webid={currentWebid} />
      </Sider>
      <Content>{props.children}</Content>
    </Layout>
  </>)
}
export default SidebarLayoutPage
