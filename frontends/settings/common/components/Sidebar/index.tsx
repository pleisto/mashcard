import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PodCard } from '@/common/components/PodCard'
import { SettingsContext } from '@/settings/SettingContext'
import { Button, Box } from '@brickdoc/design-system'
import { ArrowLeft } from '@brickdoc/design-icons'
import { SidebarWrapper, MenuItem } from './index.styles'
import { useSettingsI18n } from '../../hooks'

export const Sidebar: FC = () => {
  const navigate = useNavigate()
  const { t } = useSettingsI18n()
  const { pod, actions } = useContext(SettingsContext)!

  return (
    <SidebarWrapper>
      <div className="actions">
        <h1>{pod!.personal ? 'User' : 'Pod'} Settings </h1>
        <Box
          css={{
            padding: '1rem 12px'
          }}
        >
          <PodCard pod={pod!} />
        </Box>
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
          onClick={() => navigate(`/${pod!.webid}`)}
        >
          Back to Pod
        </Button>
      </footer>
    </SidebarWrapper>
  )
}
