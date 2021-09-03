import { AutoComplete, Button, Input, Modal, SelectProps } from '@brickdoc/design-system'
import { Search as SearchOutlined } from '@brickdoc/design-system/components/icon'
import React, { useState } from 'react'
import { useDocsI18n } from '../../hooks'
import { useBlockSearch } from '../SearchResult'

interface SearchModalProps {
  webid: string
}

export const SearchModal: React.FC<SearchModalProps> = ({ webid }) => {
  const { t } = useDocsI18n()

  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false)
  const [options, setOptions] = useState<SelectProps<object>['options']>([])

  const onClick = (): void => {
    setSearchModalVisible(true)
  }

  const onOkOrCancel = (): void => {
    setSearchModalVisible(false)
  }

  const blockSearch = useBlockSearch()

  const handleSearch = async (input: string): Promise<void> => {
    const result = await blockSearch(webid, input)
    const options = result.map((block: any) => {
      return {
        value: `${block.rootId}#${block.id}`,
        label: (
          <div>
            <span>{block.text}</span>
          </div>
        )
      }
    })
    setOptions(options)
  }

  const onSelect = (value: string): void => {
    setSearchModalVisible(false)
    globalThis.location.href = `/${webid}/p/${value.split('#')[0]}`
  }

  return (
    <>
      <Button type="text" icon={<SearchOutlined />} onClick={onClick}>
        {t('search.text')}
      </Button>
      <Modal
        visible={searchModalVisible}
        onOk={onOkOrCancel}
        onCancel={onOkOrCancel}
        title={null}
        footer={null}
        destroyOnClose={true}
        closable={false}>
        <AutoComplete options={options} onSelect={onSelect} onSearch={handleSearch}>
          <Input placeholder={t('search.placeholder')} />
        </AutoComplete>
      </Modal>
    </>
  )
}
