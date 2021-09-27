import React from 'react'
import { MoreMenu } from '../../common/components/MoreMenu'
import styles from './DocumentTopBar.module.css'
import loadingIcon from './loading.png'

export interface DocumentTopBarProps {
  webid: string
  docid?: string
  saving: boolean
}

export const DocumentTopBar: React.FC<DocumentTopBarProps> = ({ webid, docid, saving }) => {
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
      <div className={styles.menu}>
        <MoreMenu className={styles.menuItem} id={docid} webid={webid} />
      </div>
    </div>
  )
}
