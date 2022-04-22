/* eslint-disable max-classes-per-file */
import { ValidationError } from 'yup'
import { BrickdocBaseError, ErrorCode } from '../errors'
import { ItemOptions } from './settings.interface'

class SettingsError extends BrickdocBaseError {
  constructor(name: string, message: string, originalError?: Error) {
    super(`common.settings.${name}`, message, originalError)
  }
}

/**
 * SettingItem not found error
 */
export class NotFoundError extends SettingsError {
  constructor(key: string) {
    super('SETTINGS_ITEM_NOT_FOUND', `Cannot not find settings item \`${key}\`.`)
    this.code = ErrorCode.NOT_FOUND
    this.details.key = key
  }
}

/**
 * Action can not be executed in the current context,
 * such as trying to update a LOCAL_STATIC setting.
 */
export class ChangeConflictError extends SettingsError {
  constructor(settingsItem: { reason: string; key: string; options: ItemOptions }) {
    super(
      'SETTINGS_ITEM_CHANGE_CONFLICT',
      `Cannot be updated on setting item \`${settingsItem.key}\` because ${settingsItem.reason} matched.`
    )
    this.code = ErrorCode.CONFLICT
    this.details.key = settingsItem.key
    this.details.reason = settingsItem.reason
    this.options = settingsItem.options
  }
}

/**
 * Value is invalid. It's catch by yup.ValidationError.
 */
export class ValueValidationError extends SettingsError {
  constructor(key: string, validationError: ValidationError) {
    super(
      'SETTINGS_ITEM_VALUE_VALIDATION_FAILED',
      ` \`${key}\` has invalid value. ${validationError.message}`,
      validationError
    )
    this.code = ErrorCode.BAD_USER_INPUT
    this.details.key = key
    this.details.params = validationError.params
  }
}

export class DuplicateNameSpaceError extends SettingsError {
  constructor(namespaces: string[]) {
    super(
      'CONFIG_MAP_DUPLICATE_NAME_SPACE',
      'Internal server error caused by duplicate namespace found in different ConfigMap files.'
    )
    this.code = ErrorCode.CONFLICT
    this.duplicateNamespaces = namespaces
  }
}

export class UnSupportedScopeLookupStrategyError extends SettingsError {
  constructor(strategy: string) {
    super(
      'SETTINGS_ITEM_HAS_UNSUPPORTED_STRATEGY',
      `${strategy} is unimplemented on \`SettingsService#calculateScope\`.`
    )
    this.details.scopeLookupStrategy = strategy
  }
}
