import { FC } from 'react'
import { GetPodsQuery } from '@/BrickdocGraphQL'
import { Avatar } from '@brickdoc/design-system'
interface PodAvatarProps {
  pod: GetPodsQuery['pods'][0]
}
export const PodAvatar: FC<PodAvatarProps> = ({ pod }) => {
  if (pod.avatarData) {
    return <Avatar src={pod.avatarData.url} />
  } else {
    const letter = (pod.name ?? pod.webid).replace(/^(.).*(.)$/, '$1$2') // first and last character
    return <Avatar style={{ background: 'var(--brk-text-color)' }}>{letter.toUpperCase()}</Avatar>
  }
}
