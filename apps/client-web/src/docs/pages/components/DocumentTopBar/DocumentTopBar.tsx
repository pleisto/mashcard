import { FC, useContext } from 'react'
import { CollaboratorsMenu } from '@/docs/common/components/CollaboratorsMenu'
import { PathBreadcrumb } from '@/docs/common/components/PathBreadcrumb'
import { ExploreSlash } from '@/docs/common/components/ExploreSlash'
import { TopbarMore } from '@/docs/common/components/TopbarMore'
import { useReactiveVar } from '@apollo/client'
import { Button, Box } from '@mashcard/design-system'
import { useNavigate } from 'react-router-dom'
import { ShareMenu } from '../../../common/components/ShareMenu'
import { useDocsI18n } from '../../../common/hooks'
import { isSavingVar } from '../../../reactiveVars'
import { DiscussionMenu } from '@/docs/common/components/DiscussionMenu'
import { HistoryMenu } from '../../../common/components/HistoryMenu'
import { MashcardContext } from '@/common/mashcardContext'
import Logo from '@/common/assets/logo_brickdoc.svg'
import Logo_Try from '@/common/assets/logo_brickdoc_try.svg'
import * as Root from './DocumentTopBar.style'
import loadingIcon from './loading.png'
import { useDocMeta } from '@/docs/store/DocMeta'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const DocumentTopBar: FC = () => {
  const { t } = useDocsI18n()
  const navigate = useNavigate()
  const isSaving = useReactiveVar(isSavingVar)
  const { features } = useContext(MashcardContext)

  const { id, viewable, editable, isAnonymous, documentInfo } = useDocMeta()

  if (!viewable) {
    return <></>
  }

  const headMenu = id && (
    <>
      {!isAnonymous && <Root.Menu as={PathBreadcrumb as any} />}
      {isAnonymous ? (
        <Root.LogoIconTry role="button" onClick={() => navigate('/')} src={Logo_Try} alt="Try MashCard" />
      ) : (
        <Root.LogoIcon src={Logo} alt="MashCard" />
      )}
    </>
  )

  const editableMenu = id && !documentInfo?.isDeleted && !isAnonymous && (
    <>
      <CollaboratorsMenu />
      <ShareMenu />
      {features.experiment_discussion && <DiscussionMenu />}
      <HistoryMenu />
      {editable && <ExploreSlash />}
      <TopbarMore />
    </>
  )

  const handleLogin = (): void => {
    navigate('/')
  }

  const loginMenu = editable && isAnonymous && (
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
          <Root.Loading isSaving={isSaving} data-testid={TEST_ID_ENUM.page.topBar.saving.id}>
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
