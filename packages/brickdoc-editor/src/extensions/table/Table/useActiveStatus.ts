import React from 'react'

export type ActiveStatus = [number, number] | number

export function useActiveStatus(): [
  {
    isRowActive: (rowIndex: number) => boolean
    isCellActive: (rowIndex: number, cellIndex: number) => boolean
    updateActiveStatus: React.Dispatch<React.SetStateAction<ActiveStatus[]>>
  }
] {
  const [activeCells, setActiveCells] = React.useState<ActiveStatus[]>([])
  const isRowActive = (rowIndex: number): boolean => activeCells.includes(rowIndex)
  const isCellActive = (rowIndex: number, cellIndex: number): boolean =>
    activeCells.some(active => {
      if (typeof active === 'number') return false
      return active[0] === rowIndex && (active[1] === -1 || active[1] === cellIndex)
    })

  return [{ isRowActive, isCellActive, updateActiveStatus: setActiveCells }]
}
