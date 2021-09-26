import React from 'react'

interface TrashButtonProps {
  webid: string
  docid: string | undefined
}

export const TrashButton: React.FC<TrashButtonProps> = ({ webid, docid }) => {
  return <div>Trash</div>
}
