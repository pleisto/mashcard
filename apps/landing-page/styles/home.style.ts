import { styled, theme, Button, css } from '@brickdoc/design-system'

export const SwiperContainer = styled('div', {
  height: '100vh',

  '.swiper': {
    width: '100%',
    height: '100%'
  },

  '.swiper-slide': {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    color: theme.colors.black,
    textAlign: 'center',
    fontFamily: '"42sans"'
  }
})

export const SectionLogoWrapper = styled('div', {
  '@media (max-width: 420px)': {
    width: 180
  }
})

export const SectionBg = styled('div', {
  height: '100%',
  width: '100%',
  color: 'red',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  transform: 'scale(1.1)'
})

export const SectionWrapper = styled('div', {
  height: '100%',
  width: '100%',
  padding: '0 30px',
  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.304) 28.91%, rgba(234, 234, 234, 0.56) 66.21%)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Section1Title = styled('div', {
  fontWeight: '700',
  fontSize: '120px',
  lineHeight: '128px',
  textAlign: 'center',
  padding: '80px 0 23px'
})

export const Section1Comment = styled('div', {
  fontSize: '26px',
  lineHeight: '47px',
  letterSpacing: '0.1em'
})

export const Section2Title = styled('div', {
  fontWeight: 700,
  fontSize: '64px',
  lineHeight: '90px',
  textAlign: 'center',
  paddingBottom: 16,
  '@media (max-width: 420px)': {
    fontSize: '22px',
    lineHeight: '30px',
  }
})

export const Section2Comment = styled('div', {
  fontWeight: '400',
  fontSize: '30px',
  lineHeight: '44px',
  textAlign: 'center',
  letterSpacing: '0.1em',
  paddingBottom: 56,
  '@media (max-width: 420px)': {
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: '0.05em',
  }
})

export const JoinButton = styled(Button, {
  width: 392,
  height: 64,
  span: {
    fontSize: '24px',
  },
  '@media (max-width: 420px)': {
    width: 236,
    height: 40,
    span: {
      fontSize: '18px',
    },
  }
})

export const LinkList = styled('div', {
  paddingTop: 56,
  display: 'flex',
  '@media (max-width: 420px)': {
    paddingTop: 30,
  }
})

export const LinkBlock = styled('a', {
  width: 75,
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none!important',
  '.icon': {
    height: 40,
    width: 40,
    borderRadius: 2,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.4)',
    color: theme.colors.white,
    fontSize: 20
  },
  '.label': {
    background: theme.colors.backgroundOverlayQuaternary,
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '18px',
    padding: '0 4px',
    color: theme.colors.white,
    borderRadius: 2,
    marginTop: 9,
    opacity: 0
  },
  '&:hover': {
    '.icon': {
      background: theme.colors.dividerOverlayThirdary,
      color: theme.colors.white
    },
    '.label': {
      opacity: 1
    }
  }
})
