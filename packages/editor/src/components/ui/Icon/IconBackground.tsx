import React from 'react'
import { styled, theme } from '@mashcard/design-system'

// TODO: replace by theme token
export const IconBackgroundOverlay = styled('div', {
  backdropFilter: 'blur(6px)',
  background: 'linear-gradient(0deg, rgba(248, 251, 255, 0.36), rgba(248, 251, 255, 0.36)), rgba(255, 255, 255, 0.74)',
  border: 0,
  bottom: 0,
  boxShadow:
    '1px 1px 0px rgba(255, 255, 255, 0.8), 0px 2px 4px rgba(167, 167, 167, 0.3), inset 1px 1px 0px rgba(255, 255, 255, 0.25)',
  filter: 'drop-shadow(rgba(211, 211, 211, 0.4) 0px 4px 12px)',
  inset: '0px',
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0
})

const IconBackgroundBlur = styled('div', {
  backgroundColor: theme.colors.deepPurple4,
  borderRadius: '100%',
  position: 'absolute',
  height: '53.125%',
  right: 0,
  top: '12%',
  width: '53.125%'
})

const IconBackgroundPanel = styled('span', {
  include: ['flexCenter'],
  display: 'flex',
  position: 'relative'
})

const IconContainer = styled('span', {
  zIndex: 1
})

export interface IconBackgroundProps {
  color?: string
  className?: string
  children?: React.ReactNode
}

export const IconBackground: React.FC<IconBackgroundProps> = ({ color, children, ...props }) => (
  <IconBackgroundPanel {...props}>
    <IconBackgroundBlur css={{ backgroundColor: color }} />
    <IconBackgroundOverlay />
    <IconContainer>{children}</IconContainer>
  </IconBackgroundPanel>
)
