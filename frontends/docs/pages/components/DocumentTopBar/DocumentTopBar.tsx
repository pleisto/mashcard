import { CollaboratorsMenu } from '@/docs/common/components/CollaboratorsMenu'
import { PathBreadcrumb } from '@/docs/common/components/PathBreadcrumb'
import { PinMenu } from '@/docs/common/components/PinMenu'
import { useReactiveVar } from '@apollo/client'
import { Button } from '@brickdoc/design-system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MoreMenu } from '../../../common/components/MoreMenu'
import { ShareMenu } from '../../../common/components/ShareMenu'
import { useDocsI18n } from '../../../common/hooks'
import { isSavingVar } from '../../../reactiveVars'
import { DocMeta, NonNullDocMeta } from '../../DocumentContentPage'
import styles from './DocumentTopBar.module.less'
import loadingIcon from './loading.png'

export interface DocumentTopBarProps {
  docMeta: DocMeta
}

export const DocumentTopBar: React.FC<DocumentTopBarProps> = ({ docMeta }) => {
  const { t } = useDocsI18n()
  const navigate = useNavigate()
  const isSaving = useReactiveVar(isSavingVar)

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
      docMeta.isMine ? (
        <div className={styles.menu}>
          <CollaboratorsMenu docMeta={docMeta as NonNullDocMeta} />
          <ShareMenu className={styles.menuItem} docMeta={docMeta as NonNullDocMeta} />
          <PinMenu className={styles.menuItem} docMeta={docMeta as NonNullDocMeta} />
          <MoreMenu className={styles.menuItem} docMeta={docMeta as NonNullDocMeta} />
        </div>
      ) : (
        <div className={styles.menu}>
          <CollaboratorsMenu docMeta={docMeta as NonNullDocMeta} />
        </div>
      )
    ) : (
      <></>
    )

  const handleLogin = (): void => {
    navigate('/')
  }

  const loginMenu =
    docMeta.editable && docMeta.isAnonymous ? (
      <div className={styles.menu}>
        <Button type="text" onClick={handleLogin}>
          {t('anonymous.edit_button')}
        </Button>
      </div>
    ) : (
      <></>
    )

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarStart}>{headMenu}</div>
      <div className={styles.topBarEnd}>
        <div className={styles.status}>
          {isSaving && (
            <div className={styles.loading}>
              <img className={styles.loadingIcon} src={loadingIcon} alt="" />
              <span>{t('saving')}</span>
            </div>
          )}
        </div>
        {editableMenu}
        {loginMenu}
      </div>
    </div>
  )
}
