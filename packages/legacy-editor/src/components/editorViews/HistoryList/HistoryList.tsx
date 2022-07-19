import { FC, useRef, useEffect } from 'react'
import { Drawer } from '../../ui'
import { useDrawer } from '../../ui/Drawer'
import { useEditorI18n } from '../../../hooks'
import { To, NavigateOptions } from 'react-router-dom'

import { useDocHistoryStore } from '@mashcard/schema'

import { drawerStyles } from './HistoryList.style'
import { HistoryListMenu } from './HistoryListMenu'

export interface HistoryListProps {
  domain: string
  docId: string
  historyId?: string
  navigate: (to: To, options?: NavigateOptions) => void
}

export const HistoryList: FC<HistoryListProps> = ({ domain, docId, historyId, navigate }) => {
  const [editorT] = useEditorI18n()
  const { visible, setVisible } = useDrawer('historyList')
  const latestVisiable = useRef<boolean>(visible)
  const drawerContainerStyles = drawerStyles()

  const { store, refetch } = useDocHistoryStore(docId)

  useEffect(() => {
    if (visible && (!latestVisiable.current || !store.loaded)) {
      // refetch on list reopen`
      refetch()
    }
    latestVisiable.current = visible
  }, [visible, refetch, store.loaded])

  return (
    <Drawer
      container={document.getElementById('aside') as HTMLElement}
      className={drawerContainerStyles}
      visible={visible}
      onClose={() => setVisible(false)}
      title={editorT('history.title')}
      renderBody={() => (
        <HistoryListMenu
          domain={domain}
          docId={docId}
          historyId={historyId}
          navigate={navigate}
          histories={store.histories}
          users={store.users}
        />
      )}
    />
  )
}
