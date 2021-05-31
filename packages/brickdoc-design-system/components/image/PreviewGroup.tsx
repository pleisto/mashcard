import * as React from 'react'
import RcImage from 'rc-image'
import {
  Undo as RotateLeftOutlined,
  Redo as RotateRightOutlined,
  ZoomIn as ZoomInOutlined,
  ZoomOut as ZoomOutOutlined,
  Close as CloseOutlined,
  Left as LeftOutlined,
  Right as RightOutlined
} from '../icon'
import { GroupConsumerProps } from 'rc-image/lib/PreviewGroup'
import { ConfigContext } from '../config-provider'
import { getTransitionName } from '../_util/motion'

export const icons = {
  rotateLeft: <RotateLeftOutlined />,
  rotateRight: <RotateRightOutlined />,
  zoomIn: <ZoomInOutlined />,
  zoomOut: <ZoomOutOutlined />,
  close: <CloseOutlined />,
  left: <LeftOutlined />,
  right: <RightOutlined />,
}

const InternalPreviewGroup: React.FC<GroupConsumerProps> = ({
  previewPrefixCls: customizePrefixCls,
  preview,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('image-preview', customizePrefixCls)
  const rootPrefixCls = getPrefixCls()

  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview
    }
    const _preview = typeof preview === 'object' ? preview : {}

    return {
      ..._preview,
      transitionName: getTransitionName(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: getTransitionName(rootPrefixCls, 'fade', _preview.maskTransitionName),
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [preview])

  return (
    <RcImage.PreviewGroup
      preview={mergedPreview}
      previewPrefixCls={prefixCls}
      icons={icons}
      {...props}
    />
  )
}

export default InternalPreviewGroup
