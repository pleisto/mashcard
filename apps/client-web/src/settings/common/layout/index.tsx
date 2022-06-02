import { FC, ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { styled } from '@brickdoc/design-system'
import { layoutStyle } from './index.style'
import { Sidebar } from '../components/Sidebar'
import { useSettingsI18n } from '../hooks'

const Layout = styled('div', layoutStyle)

export const SettingsLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  const { t } = useSettingsI18n()

  return (
    <>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} />
      <Layout
        width={{
          '@mdDown': 'fluid',
          '@mdUp': 'fixed'
        }}
      >
        <Sidebar />
        <main>
          <div className="container">{children}</div>
        </main>
      </Layout>
    </>
  )
}
