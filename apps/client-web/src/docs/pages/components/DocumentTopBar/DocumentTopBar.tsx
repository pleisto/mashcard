import React from 'react'
import { CollaboratorsMenu } from '@/docs/common/components/CollaboratorsMenu'
import { PathBreadcrumb } from '@/docs/common/components/PathBreadcrumb'
import { ExploreSlash } from '@/docs/common/components/ExploreSlash'
import { TopbarMore } from '@/docs/common/components/TopbarMore'
import { useReactiveVar } from '@apollo/client'
import { Button, Box } from '@brickdoc/design-system'
import { useNavigate } from 'react-router-dom'
// import { HistoryMenu } from '../../../common/components/HistoryMenu'
import { ShareMenu } from '../../../common/components/ShareMenu'
import { useDocsI18n } from '../../../common/hooks'
import { isSavingVar } from '../../../reactiveVars'
import { DocMeta, NonNullDocMeta } from '../../DocumentContentPage'
import { DiscussionMenu } from '@/docs/common/components/DiscussionMenu'
import { BrickdocContext } from '@/common/brickdocContext'
import Logo from '@/common/assets/logo_brickdoc.svg'
import * as Root from './DocumentTopBar.style'
import loadingIcon from './loading.png'

export interface DocumentTopBarProps {
  docMeta: DocMeta
}

export const DocumentTopBar: React.FC<DocumentTopBarProps> = ({ docMeta }) => {
  const { t } = useDocsI18n()
  const navigate = useNavigate()
  const isSaving = useReactiveVar(isSavingVar)
  const { features } = React.useContext(BrickdocContext)

  if (!docMeta.viewable) {
    return <></>
  }

  const headMenu = docMeta.id && (
    <>
      <Root.Menu as={PathBreadcrumb as any} docMeta={docMeta as NonNullDocMeta} />
      <Root.LogoIcon src={Logo} alt="Brickdoc" />
    </>
  )

  const editableMenu = docMeta.id && !docMeta.isDeleted && (
    <>
      <Root.HiddenItem as={CollaboratorsMenu} docMeta={docMeta as NonNullDocMeta} />
      <ShareMenu docMeta={docMeta as NonNullDocMeta} />
      {features.experiment_discussion && <DiscussionMenu />}
      {/* {features.page_history && <HistoryMenu docMeta={docMeta as NonNullDocMeta} />} */}
      {docMeta.editable && <ExploreSlash />}
      <TopbarMore docMeta={docMeta} />
    </>
  )

  const handleLogin = (): void => {
    navigate('/')
  }

  const loginMenu = docMeta.editable && docMeta.isAnonymous && (
    <Button type="text" onClick={handleLogin}>
      {t('anonymous.edit_button')}
    </Button>
  )

  return (
    <Root.TopBar
      width={{
        '@mdDown': 'md'
      }}
    >
      <Box>{headMenu}</Box>
      <Box style={{ flexShrink: 0 }}>
        <Root.Menu>
          <Root.Loading isSaving={isSaving}>
            <Root.LoadingIcon src={loadingIcon} alt="" />
            <span>{t('saving')}</span>
          </Root.Loading>
          {editableMenu}
          {loginMenu}
        </Root.Menu>
      </Box>
    </Root.TopBar>
  )
}
