import { ArrowLeft } from '@mashcard/design-icons'
import { Button } from '@mashcard/design-system'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '@/common/assets/logo-brickdoc-without-name.svg'
import { SwitchSettingPod } from './SwitchSettingPod'
import { SettingsContext } from './SettingContext'
import { MenuItem, SidebarWrapper } from './Sidebar.style'
import { useSettingsI18n } from './useSettingsI18n'

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
            <MenuItem to={i.navigatePath} key={i.navigatePath}>
              {i.icon}
              <span>{t(`menu.${i.navigatePath}`)}</span>
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
