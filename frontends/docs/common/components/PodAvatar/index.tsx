import { FC } from 'react'
import { Avatar, AvatarProps } from '@brickdoc/design-system'
import { PodType } from '../PodCard'
interface PodAvatarProps extends AvatarProps {
  pod: PodType
}
export const PodAvatar: FC<PodAvatarProps> = ({ pod, ...avatarProps }) => (
  <Avatar {...avatarProps} initials={pod.name ?? pod.webid} src={pod.avatarData ? pod.avatarData.url : undefined} />
)
