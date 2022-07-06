import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SettingsContext } from '@/settings/SettingContext'
import { SwitchSettingPod } from '../SwitchSettingPod'
import { Button } from '@mashcard/design-system'
import { ArrowLeft } from '@mashcard/design-icons'
import { SidebarWrapper, MenuItem } from './index.styles'
import Logo from '@/common/assets/logo-brickdoc-without-name.svg'
import { useSettingsI18n } from '../../hooks'

export const Sidebar: FC = () => {
  const { t } = useSettingsI18n()
  const navigate = useNavigate()
  const { pod, actions } = useContext(SettingsContext)!

  return (
    <SidebarWrapper>
      <div className="actions">
        <header>
          <img className="mc-logo" src={Logo} alt="MashCard" />
          <SwitchSettingPod />
        </header>
        <nav>
          {actions.map(i => (
            <MenuItem to={i.key} key={i.key}>
              {i.icon}
              <span>{t(`menu.${i.key}`)}</span>
            </MenuItem>
          ))}
        </nav>
      </div>
      <footer>
        <Button
          block
          icon={<ArrowLeft />}
          css={{ height: '40px', margin: '0 1rem' }}
          onClick={() => navigate(`/${pod!.domain}`)}
        >
          Back to Pod
        </Button>
      </footer>
    </SidebarWrapper>
  )
}
