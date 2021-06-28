import React from 'react'
import { useGetPodsQuery } from "@/BrickdocGraphQL"
import { Dropdown, Avatar, Skeleton, Menu } from "@brickdoc/design-system"
import { SortTwo } from "@brickdoc/design-system/components/icon"
import { useDocsI18n } from "../../hooks"
import { useHistory } from 'react-router'
import styles from "./index.module.less"

interface PodSelectProps {
  webid: string
}


const PodSelect:React.FC<PodSelectProps> = (props) => {
  const history = useHistory()
  const { t } = useDocsI18n()
  const {loading, data}  = useGetPodsQuery()
  if (loading) {return <Skeleton avatar active paragraph={false} />}

  const pod = !loading
    && data.pods.find(pod=> pod.webid === props.webid )

  if(!pod){
    console.error('Webid does not match the current user')
    return <></>
  }

  const dropdown = (
    <Menu selectedKeys={`pod-${pod.webid}`}>
      { data.pods.map((i)=>
        <Menu.Item
          onClick={()=>history.push(`/${i.webid}`)}
          key={`pod-${i.webid}`}>{i.name}</Menu.Item>) }
      <Menu.Divider />
      <Menu.Item key="pod-create">{t('menu.create_new_pod')}</Menu.Item>
      <Menu.Item key="logout">{t('menu.logout')}</Menu.Item>
    </Menu>
  )

  return <Dropdown trigger={['click']} overlay={dropdown} placement="bottomLeft">
    <div className={styles.select}>
      <Avatar style={{background: '#2376b7'}} shape="square">B</Avatar>
      <div className={styles.name}>
        <span>{pod.name}</span><SortTwo />
      </div>
    </div>
  </Dropdown>

}

export default PodSelect
