import { ReactElement } from 'react'
import LogoIcon from '@/common/assets/logo_icon.svg'
import LogoText from '@/common/assets/logo_text.svg'

import styles from './styles.module.less'

export const PageHead = (): ReactElement => {
  return (
    <>
      <div className={styles.headerWarp}>
        <div className={styles.logoWarp}>
          <img src={LogoIcon} alt="Brickdoc" />
          <img src={LogoText} alt="Brickdoc" />
        </div>
      </div>
    </>
  )
}
