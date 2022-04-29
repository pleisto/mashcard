import React from 'react'

// always return a valid width!!! can avoid flex sidebar
export const getSidebarStyle = (): React.CSSProperties => {
  const sidebarWidth = Number(localStorage.getItem('SIDEBAR_WIDTH'))
  if (sidebarWidth > 5 && sidebarWidth < 50) {
    return {
      width: `${sidebarWidth}%`
    }
  }
  return { width: 270 }
}

export const logSideBarWidth = (width: number) => {
  localStorage.setItem('SIDEBAR_WIDTH', String(width))
}
