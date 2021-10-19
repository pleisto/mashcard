import { CollaboratorsMenu } from '@/docs/common/components/CollaboratorsMenu'
import { PathBreadcrumb } from '@/docs/common/components/PathBreadcrumb'
import { PinMenu } from '@/docs/common/components/PinMenu'
import { Button } from '@brickdoc/design-system'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { MoreMenu } from '../../../common/components/MoreMenu'
import { ShareMenu } from '../../../common/components/ShareMenu'
import { useDocsI18n } from '../../../common/hooks'
import { DocMeta, NonNullDocMeta } from '../../DocumentContentPage'
import styles from './DocumentTopBar.module.less'
import loadingIcon from './loading.png'

export interface DocumentTopBarProps {
  docMeta: DocMeta
  saving: boolean
}

export const DocumentTopBar: React.FC<DocumentTopBarProps> = ({ docMeta, saving }) => {
  const { t } = useDocsI18n()
  const history = useHistory()

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
    docMeta.id && docMeta.shareable && !docMeta.isDeleted ? (
      <div className={styles.menu}>
        <CollaboratorsMenu docMeta={docMeta as NonNullDocMeta} />
        <ShareMenu className={styles.menuItem} docMeta={docMeta as NonNullDocMeta} />
        <PinMenu className={styles.menuItem} docMeta={docMeta as NonNullDocMeta} />
        <MoreMenu className={styles.menuItem} docMeta={docMeta as NonNullDocMeta} />
      </div>
    ) : (
      <></>
    )

  const handleLogin = (): void => {
    history.push('/')
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
          {saving && (
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
