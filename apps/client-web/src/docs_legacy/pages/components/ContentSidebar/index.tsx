import { FC } from 'react'

import Logo from '@/common/assets/logo-brickdoc-without-name.svg'
import { PodSelect } from '@/docs_legacy/common/components/PodSelect'
import { PageTree } from '@/docs_legacy/common/components/PageTree'
import { TrashButton } from '@/docs_legacy/common/components/TrashButton'
import { NewPage } from '../NewPage'

export const ContentSidebar: FC = () => {
  return (
    <>
      <header>
        <img className="mc-logo" src={Logo} alt="MashCard" />
        <PodSelect />
      </header>
      <div className="mainActions">
        <nav>
          <PageTree />
          <TrashButton />
        </nav>
        <footer>
          <NewPage />
        </footer>
      </div>
    </>
  )
}
