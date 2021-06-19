/* eslint-disable no-template-curly-in-string */
import { TFunction } from 'react-i18next'

import { Locale } from '../locale-provider'
import { PickerLocale } from '../date-picker/generatePicker'

export function getLocaleData(t: TFunction<'ds'>, language: string): Locale {
  const typeTemplate = t('form.defaultValidateMessages.types.template', '${label} is not a valid ${type}')

  const pickerLocale: PickerLocale = {
    lang: {
      locale: language.replace('-', '_'), // e.g. en_US, zh_CN
      today: t('calendarPicker.today', 'Today'),
      now: t('calendarPicker.now', 'Now'),
      backToToday: t('calendarPicker.backToToday', 'Back to today'),
      ok: t('calendarPicker.ok', 'Ok'),
      clear: t('calendarPicker.clear', t('calendarPicker.clear', 'Clear')),
      month: t('calendarPicker.month', 'Month'),
      year: t('calendarPicker.year', 'Year'),
      timeSelect: t('calendarPicker.timeSelect', 'select time'),
      dateSelect: t('calendarPicker.dateSelect', 'select date'),
      weekSelect: t('calendarPicker.weekSelect', 'Choose a week'),
      monthSelect: t('calendarPicker.monthSelect', 'Choose a month'),
      yearSelect: t('calendarPicker.yearSelect', 'Choose a year'),
      decadeSelect: t('calendarPicker.decadeSelect', 'Choose a decade'),
      yearFormat: t('calendarPicker.yearFormat', 'YYYY'),
      dateFormat: t('calendarPicker.dateFormat', 'M/D/YYYY'),
      dayFormat: t('calendarPicker.dayFormat', 'D'),
      dateTimeFormat: t('calendarPicker.dateTimeFormat', 'M/D/YYYY HH:mm:ss'),
      monthBeforeYear: t('calendarPicker.monthBeforeYear', 'true') === 'true',
      previousMonth: t('calendarPicker.previousMonth', 'Previous month (PageUp)'),
      nextMonth: t('calendarPicker.nextMonth', 'Next month (PageDown)'),
      previousYear: t('calendarPicker.previousYear', 'Last year (Control + left)'),
      nextYear: t('calendarPicker.nextYear', 'Next year (Control + right)'),
      previousDecade: t('calendarPicker.previousDecade', 'Last decade'),
      nextDecade: t('calendarPicker.nextDecade', 'Next decade'),
      previousCentury: t('calendarPicker.previousCentury', 'Last century'),
      nextCentury: t('calendarPicker.nextCentury', 'Next century'),
      placeholder: t('calendarPicker.placeholder', 'Select date'),
      yearPlaceholder: t('calendarPicker.yearPlaceholder', 'Select year'),
      quarterPlaceholder: t('calendarPicker.quarterPlaceholder', 'Select quarter'),
      monthPlaceholder: t('calendarPicker.monthPlaceholder', 'Select month'),
      weekPlaceholder: t('calendarPicker.weekPlaceholder', 'Select week'),
      rangePlaceholder: [
        t('calendarPicker.rangePlaceholder.startDate', 'Start date'),
        t('calendarPicker.rangePlaceholder.endDate', 'End date')
      ],
      rangeYearPlaceholder: [
        t('calendarPicker.rangeYearPlaceholder.startYear', 'Start year'),
        t('calendarPicker.rangeYearPlaceholder.endYear', 'End year')
      ],
      rangeMonthPlaceholder: [
        t('calendarPicker.rangeMonthPlaceholder.startMonth', 'Start month'),
        t('calendarPicker.rangeMonthPlaceholder.endMonth', 'End month')
      ],
      rangeWeekPlaceholder: [
        t('calendarPicker.rangeWeekPlaceholder.startWeek', 'Start week'),
        t('calendarPicker.rangeWeekPlaceholder.endWeek', 'End week')
      ]
    },
    timePickerLocale: {
      placeholder: t('timePicker.placeholder', 'Select time'),
      rangePlaceholder: [t('timePicker.rangePlaceholder.startTime', 'Start time'), t('timePicker.rangePlaceholder.endTime', 'End time')]
    }
  }

  const locale: Locale = {
    Pagination: {
      items_per_page: t('pagination.itemsPerPage', '/ page'),
      jump_to: t('pagination.jumpTo', 'Go to'),
      jump_to_confirm: t('pagination.jumpToConfirm', 'confirm'),
      page: t('pagination.page', ''),
      prev_page: t('pagination.prevPage', 'Previous Page'),
      next_page: t('pagination.nextPage', 'Next Page'),
      prev_5: t('pagination.prev5', 'Previous 5 Pages'),
      next_5: t('pagination.next5', 'Next 5 Pages'),
      prev_3: t('pagination.prev3', 'Previous 3 Pages'),
      next_3: t('pagination.next3', 'Next 3 Pages')
    },
    DatePicker: pickerLocale,
    TimePicker: {
      placeholder: t('timePicker.placeholder', 'Select time'),
      rangePlaceholder: [t('timePicker.rangePlaceholder.startTime', 'Start time'), t('timePicker.rangePlaceholder.endTime', 'End time')]
    },
    Calendar: pickerLocale,
    global: {
      placeholder: t('global.placeholder', 'Please select')
    },
    Table: {
      filterTitle: t('table.filterTitle', 'Filter menu'),
      filterConfirm: t('table.filterConfirm', 'OK'),
      filterReset: t('table.filterReset', 'Reset'),
      filterEmptyText: t('table.filterEmptyText', 'No filters'),
      emptyText: t('table.emptyText', 'No data'),
      selectAll: t('table.selectAll', 'Select current page'),
      selectInvert: t('table.selectInvert', 'Invert current page'),
      selectNone: t('table.selectNone', 'Clear all data'),
      selectionAll: t('table.selectionAll', 'Select all data'),
      sortTitle: t('table.sortTitle', 'Sort'),
      expand: t('table.expand', 'Expand row'),
      collapse: t('table.collapse', 'Collapse row'),
      triggerDesc: t('table.triggerDesc', 'Click to sort descending'),
      triggerAsc: t('table.triggerAsc', 'Click to sort ascending'),
      cancelSort: t('table.cancelSort', 'Click to cancel sorting')
    },
    Modal: {
      okText: t('modal.okText', 'OK'),
      cancelText: t('modal.cancelText', 'Cancel'),
      justOkText: t('modal.justOkText', 'OK')
    },
    Popconfirm: {
      okText: t('popconfirm.okText', 'OK'),
      cancelText: t('popconfirm.cancelText', 'Cancel')
    },
    Transfer: {
      titles: [t('transfer.titles.first', ''), t('transfer.titles.second', '')],
      searchPlaceholder: t('transfer.searchPlaceholder', 'Search here'),
      itemUnit: t('transfer.itemUnit', 'item'),
      itemsUnit: t('transfer.itemsUnit', 'items'),
      remove: t('transfer.remove', 'Remove'),
      selectCurrent: t('transfer.selectCurrent', 'Select current page'),
      removeCurrent: t('transfer.removeCurrent', 'Remove current page'),
      selectAll: t('transfer.selectAll', 'Select all data'),
      removeAll: t('transfer.removeAll', 'Remove all data'),
      selectInvert: t('transfer.selectInvert', 'Invert current page')
    },
    Empty: {
      description: t('empty.description', 'No Data')
    },
    Icon: {
      icon: t('icon.icon', 'icon')
    },
    Text: {
      edit: t('text.edit', 'Edit'),
      copy: t('text.copy', 'Copy'),
      copied: t('text.copied', 'Copied'),
      expand: t('text.expand', 'Expand')
    },
    PageHeader: {
      back: t('pageHeader.back', 'Back')
    },
    Form: {
      optional: t('form.optional', '(optional)'),
      defaultValidateMessages: {
        default: t('form.defaultValidationMessages.default', 'Field validation error for ${label}'),
        required: t('form.defaultValidationMessages.required', 'Please enter ${label}'),
        enum: t('form.defaultValidationMessages.enum', '${label} must be one of [${enum}]'),
        whitespace: t('form.defaultValidationMessages.whitespace', '${label} cannot be a blank character'),
        date: {
          format: t('form.defaultValidationMessages.date.format', '${label} date format is invalid'),
          parse: t('form.defaultValidationMessages.date.parse', '${label} cannot be converted to a date'),
          invalid: t('form.defaultValidationMessages.date.invalid', '${label} is an invalid date')
        },
        types: {
          string: typeTemplate,
          method: typeTemplate,
          array: typeTemplate,
          object: typeTemplate,
          number: typeTemplate,
          date: typeTemplate,
          boolean: typeTemplate,
          integer: typeTemplate,
          float: typeTemplate,
          regexp: typeTemplate,
          email: typeTemplate,
          url: typeTemplate,
          hex: typeTemplate
        },
        string: {
          len: t('form.defaultValidationMessages.string.len', '${label} must be ${len} characters'),
          min: t('form.defaultValidationMessages.string.min', '${label} must be at least ${min} characters'),
          max: t('form.defaultValidationMessages.string.max', '${label} must be up to ${max} characters'),
          range: t('form.defaultValidationMessages.string.range', '${label} must be between ${min}-${max} characters')
        },
        number: {
          len: t('form.defaultValidationMessages.number.len', '${label} must be equal to ${len}'),
          min: t('form.defaultValidationMessages.number.min', '${label} must be minimum ${min}'),
          max: t('form.defaultValidationMessages.number.max', '${label} must be maximum ${max}'),
          range: t('form.defaultValidationMessages.number.range', '${label} must be between ${min}-${max}')
        },
        array: {
          len: t('form.defaultValidationMessages.array.len', 'Must be ${len} ${label}'),
          min: t('form.defaultValidationMessages.array.min', 'At least ${min} ${label}'),
          max: t('form.defaultValidationMessages.array.max', 'At most ${max} ${label}'),
          range: t('form.defaultValidationMessages.array.range', 'The amount of ${label} must be between ${min}-${max}')
        },
        pattern: {
          mismatch: t('form.defaultValidationMessages.pattern.mismatch', '${label} does not match the pattern ${pattern}')
        }
      }
    },
    Image: {
      preview: t('image.preview', 'Preview')
    }
  }

  return locale
}
