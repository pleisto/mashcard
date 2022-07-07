import { styled, theme } from '@mashcard/design-system'
import { FC, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, Outlet } from 'react-router-dom'

import ceramicBackground from '@/common/assets/ceramic-bg.webp'
import Logo from '@/common/assets/logo_brickdoc.svg'
import { MashcardContext } from '@/common/mashcardContext'
import { rootPath } from '@/common/utils'
import { useAccountsI18n } from './_shared/useAccountsI18n'

const PanelLayout = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '1.5rem 2rem',
    a: {
      marginRight: '2rem'
    },
    'a img': {
      height: '2.5rem'
    }
  },
  main: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  variants: {
    theme: {
      fluid: {
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.ceramicPrimary,
        header: {
          justifyContent: 'center'
        },
        main: {
          width: '100%',
          padding: '2rem'
        }
      },
      ceramic: {
        justifyContent: 'space-between',
        background: `url(${ceramicBackground}) no-repeat fixed center center`,
        backgroundSize: 'cover',
        backgroundClip: 'border-box',
        header: {
          justifyContent: 'space-between'
        },
        main: {
          include: ['ceramicPrimary'],
          borderRadius: '0.5rem',
          width: '40rem',
          marginTop: '-5rem',
          padding: '5rem 7rem'
        }
      }
    }
  }
})

export const Layout: FC = () => {
  const { t } = useAccountsI18n()
  const context = useContext(MashcardContext)

  if (context.currentUser) return <Navigate replace={true} to={rootPath(context)} />

  return (
    <>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} />
      <PanelLayout
        theme={{
          '@smDown': 'fluid',
          '@smUp': 'ceramic'
        }}
      >
        <header>
          <a href="/">
            <img src={Logo} alt="MashCard" />
          </a>
        </header>
        <main>
          <Outlet />
        </main>
        <footer />
      </PanelLayout>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default Layout
