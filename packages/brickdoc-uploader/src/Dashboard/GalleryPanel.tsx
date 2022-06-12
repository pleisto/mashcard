/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { DashboardPluginOptions, UploadResultData } from './plugin'

interface GalleryPanelProps {
  pluginOptions: DashboardPluginOptions
}

const COLORS = [
  '#5f5f5f',
  '#D43730',
  '#F75F48',
  '#E47F2A',
  '#A6A6A6',
  '#2CAD94',
  '#5423B9',
  '#9F0F64',
  '#FFE27D',
  'linear-gradient(180deg, #FB9393 0%, #D2B343 100%)',
  '#D78787'
]

export const GalleryPanel: React.FC<GalleryPanelProps> = ({ pluginOptions }) => {
  const handleSelectColor = (color: string, action: UploadResultData['action']) => () => {
    pluginOptions.onUploaded?.({ color, action })
  }
  return (
    <div className="uploader-dashboard-gallery-panel">
      <div role="group" className="dashboard-gallery-group">
        <div className="dashboard-gallery-group-name">COLOR & GRADIENT</div>
        <div role="list" className="dashboard-color-list">
          {COLORS.map(item => (
            <div
              role="img"
              key={item}
              className="dashboard-color-item"
              style={{ background: item }}
              onClick={handleSelectColor(item, 'add')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
