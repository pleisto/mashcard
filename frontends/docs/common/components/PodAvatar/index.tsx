import { FC } from 'react'
import { GetPodsQuery } from '@/BrickdocGraphQL'
import { Avatar } from '@brickdoc/design-system'
interface PodAvatarProps {
  pod: GetPodsQuery['pods'][0]
}
export const PodAvatar: FC<PodAvatarProps> = ({ pod }) => (
  <Avatar initials={pod.name ?? pod.webid} src={pod.avatarData ? pod.avatarData.url : undefined} />
)
