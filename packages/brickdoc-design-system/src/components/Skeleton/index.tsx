import { forwardRef, ForwardRefRenderFunction } from 'react'
import ContentLoader, { IContentLoaderProps, List, BulletList } from 'react-content-loader'
import { ArticleSkeleton } from './ArticleSkeleton'

export interface SkeletonProps extends IContentLoaderProps {
  type?: 'list' | 'bullet-list' | 'article'
}

const Skeleton: ForwardRefRenderFunction<unknown, SkeletonProps> = (props, ref) => {
  const { type, children, ...otherProps } = props

  if (children) return <ContentLoader {...otherProps}>{children}</ContentLoader>

  switch (type) {
    case 'list':
      return <List {...otherProps} />
    case 'bullet-list':
      return <BulletList {...otherProps} />
    default:
      return <ArticleSkeleton />
  }
}

const _Skeleton = forwardRef(Skeleton)

_Skeleton.displayName = `Skeleton`

export { _Skeleton as Skeleton }
