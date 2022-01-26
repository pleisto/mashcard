import * as React from 'react'
import { motion } from 'framer-motion'

export interface ContentProps {
  prefixCls?: string
  overlay: (() => React.ReactNode) | React.ReactNode
  id: string
  overlayInnerStyle?: React.CSSProperties
  visible: boolean
}

const Content = (props: ContentProps) => {
  const { overlay, prefixCls, id, overlayInnerStyle, visible } = props

  const popupCardTrans = {
    open: () => ({ transform: 'scale(1)', opacity: 1, transition: { type: 'spring', stiffness: 800, damping: 50 } }),
    closed: { transform: 'scale(0.9)', opacity: 0, transition: { type: 'spring', stiffness: 800, damping: 50 } }
  }

  return (
    <motion.div
      animate={visible ? 'open' : 'closed'}
      variants={popupCardTrans}
      className={`${prefixCls}-inner`}
      id={id}
      role="tooltip"
      style={overlayInnerStyle}
    >
      {typeof overlay === 'function' ? overlay() : overlay}
    </motion.div>
  )
}

export default Content
