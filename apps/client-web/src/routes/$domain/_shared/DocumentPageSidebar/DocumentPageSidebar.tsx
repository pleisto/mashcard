import Logo from '@/common/assets/logo-without-name.svg'
import { FC } from 'react'
import { NewPage } from './NewPage'
import { PageTree } from './PageTree'
import { PodSelect } from './PodSelect'
import { TrashButton } from './TrashButton'

export const DocumentPageSidebar: FC = () => {
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
