import Logo_Try from '@/common/assets/try.svg'
import { MashcardContext } from '@/common/mashcardContext'
import { useReactiveVar } from '@apollo/client'
import { Box, Button } from '@mashcard/design-system'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocMeta } from '../../../_shared/DocMeta'
import { isSavingVar } from '../../../_shared/reactiveVars'
import { useDocsI18n } from '../../../_shared/useDocsI18n'
import { CollaboratorsMenu } from './CollaboratorsMenu'
import { DiscussionMenu } from './DiscussionMenu'
import { ExploreSlash } from './ExploreSlash'
import { HistoryMenu } from './HistoryMenu'
import { PathBreadcrumb } from './PathBreadcrumb'
import { ShareMenu } from './ShareMenu'
import { TopbarMore } from './TopbarMore'
import * as Root from './DocumentTopBar.style'
import loadingIcon from './loading.png'

export const DocumentTopBar: FC = () => {
  const { t } = useDocsI18n()
  const navigate = useNavigate()
  const isSaving = useReactiveVar(isSavingVar)
  const { features } = useContext(MashcardContext)

  const { id, viewable, editable, isAnonymous, documentInfo } = useDocMeta()

  if (!viewable) {
    return (
      <Root.TopBar
        width={{
          '@mdDown': 'md'
        }}
      />
    )
  }

  const headMenu = (
    <>
      {isAnonymous ? (
        <Root.LogoIconTry role="button" onClick={() => navigate('/')} src={Logo_Try} alt="Try MashCard" />
      ) : (
        <Root.Menu as={PathBreadcrumb as any} />
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
      }}>
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
