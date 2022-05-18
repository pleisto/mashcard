import { css, theme } from '@brickdoc/design-system'
import { ResizableProps, ResizeCallback } from 're-resizable'
import { useCallback, useMemo } from 'react'
import { UpdateEmbedBlockAttributes } from '../../EmbedView'
import { maxWidth, minWidth } from './styled'

const handleStyle = {
  background: theme.colors.overlayPrimary,
  border: `1px solid ${theme.colors.white}`,
  borderRadius: '18px',
  boxSizing: 'border-box',
  height: '32px',
  opacity: 0,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  transition: 'opacity .3s ease-in',
  width: '4px'
}

const handleMargin = '.625rem'

const resizableContainerStyle = css({
  display: 'inline-block',

  '.left-handle': {
    ...handleStyle,
    left: handleMargin
  },

  '.right-handle': {
    ...handleStyle,
    right: handleMargin
  },

  '&:hover': {
    '.left-handle': {
      opacity: '100%'
    },
    '.right-handle': {
      opacity: '100%'
    }
  }
})

export function useResizable(
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes,
  width?: number | null
): ResizableProps {
  const onResizeStop = useCallback<ResizeCallback>(
    (e, direction, ref, d) => {
      updateEmbedBlockAttributes(
        {
          width: (width ?? 0) + d.width
        },
        'image'
      )
    },
    [updateEmbedBlockAttributes, width]
  )

  return useMemo(
    () => ({
      lockAspectRatio: true,
      className: resizableContainerStyle(),
      maxWidth: `${maxWidth}px`,
      minWidth: `${minWidth}px`,
      handleClasses: {
        left: 'left-handle',
        right: 'right-handle'
      },
      handleStyles: {
        left: {
          left: handleMargin,
          width: handleStyle.width,
          height: handleStyle.height,
          top: handleStyle.top
        },
        right: {
          right: handleMargin,
          width: handleStyle.width,
          height: handleStyle.height,
          top: handleStyle.top
        }
      },
      enable: {
        top: false,
        topLeft: false,
        topRight: false,
        bottom: false,
        bottomLeft: false,
        bottomRight: false,
        left: true,
        right: true
      },
      size: {
        width: width ?? 'unset',
        height: 'auto'
      },
      onResizeStop
    }),
    [onResizeStop, width]
  )
}
