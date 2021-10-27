import React from 'react'
import cx from 'classnames'
import { Dropdown, Button, Icon } from '@brickdoc/design-system'
import { useEditorI18n } from '../../../../../hooks'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

const MOST_CASCADE_LIMIT = 3

export interface FilterFooterProps {
  path?: number[]
  onAddFilter: (isGroup: boolean, path?: number[]) => void
  cascade?: boolean
}

export const FilterFooter: React.FC<FilterFooterProps> = ({ cascade, onAddFilter, path }) => {
  const { t } = useEditorI18n()
  const Content = (
    <div className="table-block-filter-select-panel">
      <div className="filter-select-title">{t('table.filter.text')}</div>
      <div className="filter-select-option">
        <Button
          data-testid={TEST_ID_ENUM.editor.tableBlock.filter.addButton.id}
          className="filter-select-option-btn"
          type="text"
          onClick={() => onAddFilter(false, path)}>
          <Icon.Add />
          {t('table.filter.add_a_filter')}
        </Button>
      </div>
      {(path?.length ?? 0) < MOST_CASCADE_LIMIT && (
        <div className="filter-select-option">
          <Button
            data-testid={TEST_ID_ENUM.editor.tableBlock.filter.addGroupButton.id}
            className="filter-select-option-btn"
            type="text"
            onClick={() => onAddFilter(true, path)}>
            <div className="filter-select-option-btn-content">
              <Icon.AddGroup />
              {t('table.filter.add_a_filter_group')}
            </div>
            <div className="filter-select-option-btn-desc">{t('table.filter.add_a_filter_group_desc')}</div>
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className={cx('table-toolbar-item-footer', { cascade })}>
      <Dropdown trigger={['click']} overlay={Content}>
        <Button className="table-toolbar-item-footer-button" type="text">
          <Icon.Add />
          <span>{t('table.filter.add_a_filter')}</span>
          <Icon.ArrowDown className="table-toolbar-item-footer-icon" />
        </Button>
      </Dropdown>
    </div>
  )
}
