/* eslint-disable no-template-curly-in-string */
import { TFunction } from 'react-i18next'

import { Locale } from '../locale-provider'

export function getLocaleData(t: TFunction<'design_system'>, language: string): Locale {
  const typeTemplate = t('form.defaultValidateMessages.types.template', '%{label} is not a valid %{type}')

  const locale: Locale = {
    global: {
      placeholder: t('global.placeholder', 'Please select')
    },
    Modal: {
      okText: t('modal.okText', 'OK'),
      cancelText: t('modal.cancelText', 'Cancel'),
      justOkText: t('modal.justOkText', 'OK')
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
    Icon: {
      icon: t('icon.icon', 'icon')
    },
    Text: {
      edit: t('text.edit', 'Edit'),
      copy: t('text.copy', 'Copy'),
      copied: t('text.copied', 'Copied'),
      expand: t('text.expand', 'Expand')
    },
    Form: {
      optional: t('form.optional', '(optional)'),
      defaultValidateMessages: {
        default: t('form.defaultValidationMessages.default', 'Field validation error for label}'),
        required: t('form.defaultValidationMessages.required', 'Please enter %{label}'),
        enum: t('form.defaultValidationMessages.enum', '%{label} must be one of [%{enum}]'),
        whitespace: t('form.defaultValidationMessages.whitespace', '%{label} cannot be a blank character'),
        date: {
          format: t('form.defaultValidationMessages.date.format', '%{label} date format is invalid'),
          parse: t('form.defaultValidationMessages.date.parse', '%{label} cannot be converted to a date'),
          invalid: t('form.defaultValidationMessages.date.invalid', '%{label} is an invalid date')
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
          len: t('form.defaultValidationMessages.string.len', '%{label} must be %{len} characters'),
          min: t('form.defaultValidationMessages.string.min', '%{label} must be at least %{min} characters'),
          max: t('form.defaultValidationMessages.string.max', '%{label} must be up to %{max} characters'),
          range: t('form.defaultValidationMessages.string.range', '%{label} must be between %{min}-%{max} characters')
        },
        number: {
          len: t('form.defaultValidationMessages.number.len', '%{label} must be equal to %{len}'),
          min: t('form.defaultValidationMessages.number.min', '%{label} must be minimum %{min}'),
          max: t('form.defaultValidationMessages.number.max', '%{label} must be maximum %{max}'),
          range: t('form.defaultValidationMessages.number.range', '%{label} must be between %{min}-%{max}')
        },
        array: {
          len: t('form.defaultValidationMessages.array.len', 'Must be %{len} %{label}'),
          min: t('form.defaultValidationMessages.array.min', 'At least %{min} %{label}'),
          max: t('form.defaultValidationMessages.array.max', 'At most %{max} %{label}'),
          range: t('form.defaultValidationMessages.array.range', 'The amount of %{label} must be between %{min}-%{max}')
        },
        pattern: {
          mismatch: t(
            'form.defaultValidationMessages.pattern.mismatch',
            '%{label} does not match the pattern %{pattern}'
          )
        }
      }
    },
    Image: {
      preview: t('image.preview', 'Preview')
    }
  }

  return locale
}
