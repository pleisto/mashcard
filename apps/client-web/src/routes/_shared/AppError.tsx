import { Button, ButtonProps, styled, theme } from '@mashcard/design-system'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import ceramicBackground from '@/common/assets/ceramic-bg.webp'
import mp4Video403 from '@/common/assets/http-status/403.mp4'
import pic403 from '@/common/assets/http-status/403.png'
import webmVideo403 from '@/common/assets/http-status/403.webm'
import mp4Video404 from '@/common/assets/http-status/404.mp4'
import pic404 from '@/common/assets/http-status/404.png'
import webmVideo404 from '@/common/assets/http-status/404.webm'
import mp4Video500 from '@/common/assets/http-status/500.mp4'
import pic500 from '@/common/assets/http-status/500.png'
import webmVideo500 from '@/common/assets/http-status/500.webm'
import logo from '@/common/assets/logo-brickdoc-2.svg'
import { useAccountsI18n } from '../accounts/_shared/useAccountsI18n'

// safari platform needs hevc-encoded video,
// chrome-like platform needs vp9-encoded video,
// plus they both need a poster attribute for the cover

const ErrorLayout = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  justifyContent: 'center',
  background: `url(${ceramicBackground}) no-repeat fixed center center`,
  backgroundSize: 'cover',
  backgroundClip: 'border-box',
  '.logo': {
    position: 'absolute',
    top: 80,
    left: 80
  }
})

interface AppErrorProps {
  title: string
  content: string
  btnContent: React.ReactNode
  btnProps?: ButtonProps
  btnCallback?: () => void
  mediaContent: React.ReactNode
}

export const AppError: React.FC<AppErrorProps> = ({
  title,
  content,
  btnContent,
  mediaContent,
  btnProps,
  btnCallback
}) => {
  const navigate = useNavigate()
  const jumpToIndex: () => void = () => navigate('/')
  return (
    <ErrorLayout>
      <img className="logo" src={logo} alt="MashCard" />
      <div
        style={{
          height: 568,
          width: 982,
          display: 'flex',
          boxSizing: 'border-box'
        }}
      >
        {mediaContent}
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            padding: 24,
            width: 358,
            boxSizing: 'border-box'
          }}
        >
          <h1
            style={{
              fontSize: 24,
              lineHeight: 1.5,
              marginBottom: 4
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.555,
              color: theme.colors.typeThirdary.value
            }}
          >
            {content}
          </p>
          <Button type="primary" onClick={btnCallback ?? jumpToIndex} {...btnProps}>
            {btnContent}
          </Button>
        </div>
      </div>
    </ErrorLayout>
  )
}

export const AppError404: React.FC<Partial<AppErrorProps>> = props => {
  const { t } = useAccountsI18n(['errors'])
  return (
    <AppError
      title={t('errors:app_error.not_found_title')}
      content={t('errors:app_error.not_found_content')}
      btnContent={t('errors:app_error.btn_back')}
      mediaContent={
        <video autoPlay loop muted playsInline style={{ width: 568 }} poster={pic404}>
          <source src={mp4Video404} type='video/mp4; codecs="hvc1"' />
          <source src={webmVideo404} type="video/webm" />
        </video>
      }
      {...props}
    />
  )
}

export const AppError403: React.FC<Partial<AppErrorProps>> = props => {
  const { t } = useAccountsI18n(['errors'])
  return (
    <AppError
      title={t('errors:app_error.not_found_title')}
      content={t('errors:app_error.not_found_content')}
      btnContent={t('errors:app_error.btn_back')}
      mediaContent={
        <video autoPlay loop muted playsInline style={{ width: 568 }} poster={pic403}>
          <source src={mp4Video403} type='video/mp4; codecs="hvc1"' />
          <source src={webmVideo403} type="video/webm" />
        </video>
      }
      {...props}
    />
  )
}

export const AppError500: React.FC<Partial<AppErrorProps>> = props => {
  const { t } = useAccountsI18n(['errors'])
  return (
    <AppError
      title={t('errors:app_error.server_error_title')}
      content={t('errors:app_error.server_error_content')}
      btnContent={t('errors:app_error.btn_back')}
      mediaContent={
        <video autoPlay loop muted playsInline style={{ width: 568 }} poster={pic500}>
          <source src={mp4Video500} type='video/mp4; codecs="hvc1"' />
          <source src={webmVideo500} type="video/webm" />
        </video>
      }
      {...props}
    />
  )
}
