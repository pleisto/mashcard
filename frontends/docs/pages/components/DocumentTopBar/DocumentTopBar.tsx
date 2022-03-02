import { CollaboratorsMenu } from '@/docs/common/components/CollaboratorsMenu'
import { PathBreadcrumb } from '@/docs/common/components/PathBreadcrumb'
import { PinMenu } from '@/docs/common/components/PinMenu'
import { useReactiveVar } from '@apollo/client'
import { Button } from '@brickdoc/design-system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HistoryMenu } from '../../../common/components/HistoryMenu'
import { ShareMenu } from '../../../common/components/ShareMenu'
import { useDocsI18n } from '../../../common/hooks'
import { isSavingVar } from '../../../reactiveVars'
import { DocMeta, NonNullDocMeta } from '../../DocumentContentPage'
import styles from './DocumentTopBar.module.less'
import loadingIcon from './loading.png'
import { BrickdocContext } from '@/common/brickdocContext'

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

  const headMenu = docMeta.id ? (
    <>
      <PathBreadcrumb className={styles.menu} docMeta={docMeta as NonNullDocMeta} />
    </>
  ) : (
    <></>
  )

  const editableMenu =
    // eslint-disable-next-line no-nested-ternary
    docMeta.id && !docMeta.isDeleted ? (
      <>
        <CollaboratorsMenu docMeta={docMeta as NonNullDocMeta} />
        <ShareMenu className={styles.menuItem} docMeta={docMeta as NonNullDocMeta} />
        {features.page_history ? (
          <HistoryMenu className={styles.menuItem} docMeta={docMeta as NonNullDocMeta} />
        ) : (
          <></>
        )}
        {docMeta.isMine ? <PinMenu className={styles.menuItem} docMeta={docMeta as NonNullDocMeta} /> : <></>}
      </>
    ) : (
      <></>
    )

  const handleLogin = (): void => {
    navigate('/')
  }

  const loginMenu =
    docMeta.editable && docMeta.isAnonymous ? (
      <Button type="text" onClick={handleLogin}>
        {t('anonymous.edit_button')}
      </Button>
    ) : (
      <></>
    )

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarStart}>{headMenu}</div>
      <div className={styles.topBarEnd}>
        <div className={styles.menu}>
          {isSaving && (
            <div className={styles.loading}>
              <img className={styles.loadingIcon} src={loadingIcon} alt="" />
              <span>{t('saving')}</span>
            </div>
          )}
          {editableMenu}
          {loginMenu}
        </div>
      </div>
    </div>
  )
}
