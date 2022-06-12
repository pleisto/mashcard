import { FC } from 'react'
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

export interface ArticleSkeletonProps extends IContentLoaderProps {}

const ArticleSkeleton: FC<ArticleSkeletonProps> = props => {
  const { width = 850, height = 800, ...otherProps } = props

  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#E0E0E0"
      foregroundColor="#ecebeb"
      {...otherProps}
    >
      <rect x="42" y="57" rx="4" ry="4" width="417" height="29" />
      <rect x="42" y="105" rx="4" ry="4" width="67" height="15" />
      <rect x="127" y="105" rx="4" ry="4" width="147" height="15" />
      <circle cx="739" cy="109" r="9" />
      <circle cx="765" cy="109" r="9" />
      <rect x="217" y="157" rx="4" ry="4" width="433" height="291" />
      <rect x="359" y="457" rx="4" ry="4" width="150" height="10" />
      <rect x="48" y="515" rx="4" ry="4" width="720" height="15" />
      <rect x="49" y="547" rx="4" ry="4" width="598" height="15" />
      <rect x="48" y="581" rx="4" ry="4" width="720" height="15" />
      <rect x="49" y="612" rx="4" ry="4" width="520" height="15" />
      <rect x="48" y="652" rx="4" ry="4" width="720" height="15" />
      <rect x="48" y="684" rx="4" ry="4" width="598" height="15" />
      <rect x="48" y="718" rx="4" ry="4" width="720" height="15" />
      <rect x="49" y="748" rx="4" ry="4" width="419" height="15" />
    </ContentLoader>
  )
}
export { ArticleSkeleton }
