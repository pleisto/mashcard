import { FC } from 'react'

import { Avatar, CollaboratorsConatainer } from './index.style'
import { awarenessInfosVar } from '../../../reactiveVars'

export const CollaboratorsMenu: FC = () => {
  const awarenessInfos = awarenessInfosVar()

  if (!awarenessInfos.length) {
    return <></>
  }

  const currentOperatorId = globalThis.brickdocContext.uuid
  // pull current operator to first
  const infos = awarenessInfos.sort((a, b) => (a.user.operatorId === currentOperatorId ? 1 : -1))

  const avatars = infos.map((info, i) => {
    const pod = { ...info.user, domain: info.user.name }
    return (
      <CollaboratorsConatainer title={info.user.name} key={i}>
        <span>
          <Avatar size={24} pod={pod} style={{ outlineColor: info.user.color }} />
        </span>
      </CollaboratorsConatainer>
    )
  })

  return <>{avatars}</>
}
