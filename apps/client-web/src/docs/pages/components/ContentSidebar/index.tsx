import { FC } from 'react'
import { PodSelect } from '@/docs/common/components/PodSelect'
import { TrashButton } from '@/docs/common/components/TrashButton'
import { NewPage } from '@/docs/pages/components/NewPage'
import { PageTree } from '@/docs/common/components/PageTree'
import Logo from '@/common/assets/logo_brickdoc_without_name.svg'

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
