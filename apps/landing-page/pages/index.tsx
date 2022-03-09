import type { NextPage } from 'next'
/* import Head from 'next/head'
 * import Image from 'next/image' */
import { Skeleton } from '@brickdoc/design-system'

const Home: NextPage = () => {
  return (
    <div>
      <Skeleton uniqueKey="home-page-skeleton" />
      demo
    </div>
  )
}

export default Home
