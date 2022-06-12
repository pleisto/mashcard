import { FC, ReactNode } from 'react'
import Logo from '@/common/assets/logo_brickdoc.svg'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { styled, theme } from '@brickdoc/design-system'
import ceramicBackground from '@/common/assets/ceramicBg.webp'
import { Helmet } from 'react-helmet-async'

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

export const PanelLayoutPage: FC<{ children?: ReactNode }> = ({ children }) => {
  const { t } = useAccountsI18n()

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
            <img src={Logo} alt="Brickdoc" />
          </a>
        </header>
        <main>{children}</main>
        <footer />
      </PanelLayout>
    </>
  )
}
