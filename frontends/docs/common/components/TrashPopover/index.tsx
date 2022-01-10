import { DocMeta } from '@/docs/pages/DocumentContentPage'
import { Input, Popover, Icon, Tabs, TabPane } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { useDocsI18n } from '../../hooks'
import { PageTrash } from '../PageTrash'
import styles from './index.module.less'

interface TrashPopoverProps {
  docMeta: DocMeta
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const TrashPopover: React.FC<TrashPopoverProps> = ({ docMeta, visible, setVisible }) => {
  const [searchObject, setSearchObject] = useState<object>({})
  const { t } = useDocsI18n()

  const handleVisibleChange = (value: boolean): void => {
    setVisible(value)
  }

  const handleSearch = (value: string, key: string): void => {
    setSearchObject({ ...searchObject, [key]: value })
  }

  const tabPaneSkelecton = (tab: string, key: string, docid: string | null): React.ReactElement => {
    return (
      <TabPane tab={tab} key={key}>
        <Input.Search
          className={styles.btnHide}
          placeholder={t('trash.search')}
          onSearch={value => {
            handleSearch(value, key)
          }}
        />
        <div className={styles.list}>
          <PageTrash webid={docMeta.webid} search={(searchObject as any)[key]} docid={docid} setVisible={setVisible} />
        </div>
        <div className={styles.footer}>
          <Icon.Help />
          <span>{t('trash.learn')}</span>
        </div>
      </TabPane>
    )
  }

  const currentPageData = docMeta.id ? tabPaneSkelecton(t('trash.current_page'), 'currentPage', docMeta.id) : <></>
  const allPagesData = tabPaneSkelecton(t('trash.all_pages'), 'allPages', null)

  const popoverContent = (
    <Tabs className={styles.tabs} defaultActiveKey="allPages">
      {allPagesData}
      {currentPageData}
    </Tabs>
  )

  return (
    <Popover
      content={popoverContent}
      overlayClassName={styles.popover}
      destroyTooltipOnHide={true}
      trigger="click"
      placement="end"
      title={null}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    />
  )
}
