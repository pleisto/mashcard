import { FC } from 'react'
import { Avatar } from '@brickdoc/design-system'
import { PodType } from '../PodCard'
interface PodAvatarProps {
  pod: PodType
}
export const PodAvatar: FC<PodAvatarProps> = ({ pod }) => (
  <Avatar initials={pod.name ?? pod.webid} src={pod.avatarData ? pod.avatarData.url : undefined} />
)
