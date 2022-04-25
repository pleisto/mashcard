import React from 'react'

export const getSidebarStyle = (): React.CSSProperties => {
  const sidebarWidth = Number(localStorage.getItem('SIDEBAR_WIDTH'))
  if (sidebarWidth > 15 && sidebarWidth < 50) {
    return {
      width: `${sidebarWidth}%`
    }
  }
  return {}
}

export const logSideBarWidth = (width: number) => {
  localStorage.setItem('SIDEBAR_WIDTH', String(width))
}
