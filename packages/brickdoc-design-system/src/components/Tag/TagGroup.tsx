import { FC } from 'react'
import { Tag } from './'

import type { TagGroupProps } from './constants'

const TagGroup: FC<TagGroupProps> = props => {
  const { tagList = [], size = 'md', ...otherProps } = props

  return (
    <>
      {tagList.map((i, key) => (
        <Tag size={size} key={key} {...i} {...otherProps} />
      ))}
    </>
  )
}

const _TagGroup = TagGroup

_TagGroup.displayName = `TagGroup`

export { _TagGroup as TagGroup }
