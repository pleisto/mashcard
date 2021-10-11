import { Button } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { MoreMenu } from '../../../common/components/MoreMenu'
import { ShareMenu } from '../../../common/components/ShareMenu'
import { useDocsI18n } from '../../../common/hooks'
import styles from './DocumentTopBar.module.css'
import loadingIcon from './loading.png'

export interface DocumentTopBarProps {
  webid: string
  docid?: string
  saving: boolean
  viewable: boolean
  shareable: boolean
  editable: boolean
  isAnonymous: boolean
  title: string
  isDeleted: boolean
}

export const DocumentTopBar: React.FC<DocumentTopBarProps> = ({
  webid,
  docid,
  saving,
  viewable,
  title,
  isDeleted,
  isAnonymous,
  editable,
  shareable
}) => {
  const { t } = useDocsI18n()
  const [redirectHome, setRedirectHome] = useState<boolean>(false)

  if (!viewable) {
    return <></>
  }

  if (redirectHome) {
    return <Redirect to="/" />
  }

  const editableMenu =
    shareable && !isDeleted ? (
      <div className={styles.menu}>
        <ShareMenu className={styles.menuItem} id={docid} webid={webid} />
        <MoreMenu className={styles.menuItem} id={docid} webid={webid} />
      </div>
    ) : (
      <></>
    )

  const handleLogin = (): void => {
    setRedirectHome(true)
  }

  const loginMenu =
    editable && isAnonymous ? (
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
      <div className={styles.status}>
        {saving && (
          <div className={styles.loading}>
            <img className={styles.loadingIcon} src={loadingIcon} alt="" />
            <span>Saving</span>
          </div>
        )}
      </div>
      {editableMenu}
      {loginMenu}
    </div>
  )
}
