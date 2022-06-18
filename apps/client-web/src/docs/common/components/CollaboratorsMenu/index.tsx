import { FC } from 'react'

import { Tooltip } from '@brickdoc/design-system'
import { Avatar } from './index.style'
import { awarenessInfosVar } from '../../../reactiveVars'

export const CollaboratorsMenu: FC = () => {
  const awarenessInfos = awarenessInfosVar()

  if (!awarenessInfos.length) {
    return <></>
  }

  const avatars = awarenessInfos.map((info, i) => {
    return (
      <Tooltip title={info.user.name} key={i}>
        <span>
          <Avatar size={24} pod={info.user} style={{ outlineColor: info.user.color }} />
        </span>
      </Tooltip>
    )
  })

  return <>{avatars}</>
}
