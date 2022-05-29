import { FC } from 'react'
import { SpaceSelect } from '@/docs/common/components/SpaceSelect'
import { TrashButton } from '@/docs/common/components/TrashButton'
import { NewPage } from '@/docs/pages/components/NewPage'
import { PageTree } from '@/docs/common/components/PageTree'
import Logo from '@/common/assets/logo_brickdoc_without_name.svg'
import { useDocMeta } from '@/docs/store/DocMeta'

export const ContentSidebar: FC = () => {
  const { isMine, isAnonymous } = useDocMeta()
  if (isAnonymous) return null
  return (
    <>
      <header>
        <img className="brk-logo" src={Logo} alt="Brickdoc" />
        <SpaceSelect />
      </header>
      {isMine && (
        <div className="mainActions">
          <nav>
            <PageTree />
          </nav>
          <footer>
            <NewPage />
            <TrashButton />
          </footer>
        </div>
      )}
    </>
  )
}
