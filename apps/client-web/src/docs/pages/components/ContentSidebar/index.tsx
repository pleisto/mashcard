import React from 'react'
import { SpaceSelect } from '@/docs/common/components/SpaceSelect'
import { TrashButton } from '@/docs/common/components/TrashButton'
import { NewPage } from '@/docs/pages/components/NewPage'
import { PageTree } from '@/docs/common/components/PageTree'
import Logo from '@/common/assets/logo_brickdoc_without_name.svg'

interface IContentSidebar {
  docMeta: { domain: string; loginDomain: string; host: string; isMine: boolean; isAnonymous: boolean }
}

export const ContentSidebar: React.FC<IContentSidebar> = ({ docMeta }) => {
  if (docMeta.isAnonymous) {
    return null
  }
  return (
    <>
      <header>
        <img className="brk-logo" src={Logo} alt="Brickdoc" />
        <SpaceSelect docMeta={docMeta} />
      </header>
      {docMeta.isMine && (
        <div className="mainActions">
          <nav>
            <PageTree docMeta={docMeta} />
          </nav>
          <footer>
            <NewPage docMeta={docMeta} />
            <TrashButton docMeta={docMeta} />
          </footer>
        </div>
      )}
    </>
  )
}
