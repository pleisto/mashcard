/* eslint-disable jsx-a11y/no-autofocus */
import { useGetPodQuery } from '@/BrickdocGraphQL'
import { Alert, Skeleton, Tabs } from '@brickdoc/design-system'
import React from 'react'
import { useDocsI18n } from '../../hooks'
interface ProfileTabsProps {
  webid: string
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ webid }) => {
  const { TabPane } = Tabs
  const { t } = useDocsI18n()

  const { data, loading } = useGetPodQuery({ variables: { webid } })

  if (loading) {
    return <Skeleton active />
  }

  const pod = data?.pod

  if (!pod) {
    return <Alert message="TODO pod not found" type="error" />
  }

  const generalData = <>general</>
  const memberData = <>member</>
  const accountData = <>account</>

  const generalPane = (
    <TabPane tab={t('user_setting.general')} key="general">
      {generalData}
    </TabPane>
  )
  const memberPane = pod.personal ? (
    <></>
  ) : (
    <TabPane tab={t('user_setting.member')} key="member">
      {memberData}
    </TabPane>
  )

  const accountPane = (
    <TabPane tab={t('user_setting.account')} key="account">
      {accountData}
    </TabPane>
  )

  return (
    <>
      <Tabs tabPosition="left">
        {generalPane}
        {memberPane}
        {accountPane}
      </Tabs>
    </>
  )
}
