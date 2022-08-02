import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { FC } from 'react'
import { awarenessInfosVar } from '../../../../_shared/reactiveVars'
import { Avatar, CollaboratorsConatainer } from './CollaboratorsMenu.style'

export const CollaboratorsMenu: FC = () => {
  const awarenessInfos = awarenessInfosVar()

  if (!awarenessInfos.length) {
    return <></>
  }

  const currentOperatorId = globalThis.mashcardContext.uuid
  const userNames: string[] = []
  // pull current operator to first and unique users
  const infos = awarenessInfos
    .sort((a, b) => (a.user.operatorId === currentOperatorId ? 1 : -1))
    .filter(i => {
      if (!i.user || userNames.includes(i.user.name)) return false
      userNames.push(i.user.name)
      return true
    })

  const avatars = infos.map((info, i) => {
    const pod = { ...info.user, domain: info.user.name }
    return (
      <CollaboratorsConatainer title={info.user.name} key={i}>
        <span data-testid={TEST_ID_ENUM.page.topBar.collaboratorMenu.id}>
          <Avatar size={24} pod={pod} style={{ outlineColor: info.user.color }} />
        </span>
      </CollaboratorsConatainer>
    )
  })

  return <>{avatars}</>
}
