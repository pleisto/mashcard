import React from 'react'
import dayjs from 'dayjs'
import { Icon } from '@brickdoc/design-system'
import { TableColumnType } from 'react-table'

interface MatchType {
  key: string
  value: string
  executor: (columnValue?: any, value?: any) => boolean
}

const is: MatchType['executor'] = (columnValue, value) => columnValue === value
const isNot: MatchType['executor'] = (columnValue, value) => !is(columnValue, value)
const isOn: MatchType['executor'] = (columnValue, value) => {
  const date = columnValue?.[0] || columnValue
  return !!columnValue && !!value && dayjs(date).isSame(value, 'day')
}
const isNotOn: MatchType['executor'] = (columnValue, value) => !isOn(columnValue, value)
const isBefore: MatchType['executor'] = (columnValue, value) => {
  const date = columnValue?.[0] || columnValue
  return !!columnValue && !!value && dayjs(date).isBefore(value, 'day')
}
const isAfter: MatchType['executor'] = (columnValue, value) => {
  const date = columnValue?.[0] || columnValue
  return !!columnValue && !!value && dayjs(date).isAfter(value, 'day')
}
const isOnOrBefore: MatchType['executor'] = (columnValue, value) =>
  isOn(columnValue, value) || isBefore(columnValue, value)
const isOnOrAfter: MatchType['executor'] = (columnValue, value) =>
  isOn(columnValue, value) || isAfter(columnValue, value)
const contains: MatchType['executor'] = (columnValue, value) => columnValue?.includes(value ?? '') ?? false
const doesNotContain: MatchType['executor'] = (columnValue, value) => !contains(columnValue, value)
const startsWith: MatchType['executor'] = (columnValue, value) => columnValue?.startsWith(value ?? '') ?? false
const endsWith: MatchType['executor'] = (columnValue, value) => columnValue?.endsWith(value ?? '') ?? false
const isEmpty: MatchType['executor'] = (columnValue, value) => !columnValue
const isNotEmpty: MatchType['executor'] = (columnValue, value) => !isEmpty(columnValue, value)

export const matches = {
  Is: {
    key: 'is',
    value: 'Is',
    executor: is
  },
  IsNot: {
    key: 'is_not',
    value: 'IsNot',
    executor: isNot
  },
  IsOn: {
    key: 'is_on',
    value: 'IsOn',
    executor: isOn
  },
  IsNotOn: {
    key: 'is_not_on',
    value: 'IsNotOn',
    executor: isNotOn
  },
  IsBefore: {
    key: 'is_before',
    value: 'IsBefore',
    executor: isBefore
  },
  IsAfter: {
    key: 'is_after',
    value: 'IsAfter',
    executor: isAfter
  },
  IsOnOrBefore: {
    key: 'is_on_or_before',
    value: 'IsOnOrBefore',
    executor: isOnOrBefore
  },
  IsOnOrAfter: {
    key: 'is_on_or_after',
    value: 'IsOnOrAfter',
    executor: isOnOrAfter
  },
  Contains: {
    key: 'contains',
    value: 'Contains',
    executor: contains
  },
  DoesNotContain: {
    key: 'does_not_contain',
    value: 'DoesNotContain',
    executor: doesNotContain
  },
  StartsWith: {
    key: 'starts_with',
    value: 'StartsWith',
    executor: startsWith
  },
  EndsWith: {
    key: 'ends_with',
    value: 'EndsWith',
    executor: endsWith
  },
  IsEmpty: {
    key: 'is_empty',
    value: 'IsEmpty',
    executor: isEmpty
  },
  IsNotEmpty: {
    key: 'is_not_empty',
    value: 'IsNotEmpty',
    executor: isNotEmpty
  }
}

export const COLUMN_TYPE: Array<{
  type: TableColumnType
  icon: React.ComponentType
  matches: MatchType[]
}> = [
  {
    type: 'text',
    icon: Icon.AddText,
    matches: [
      matches.Is,
      matches.IsNot,
      matches.Contains,
      matches.DoesNotContain,
      matches.StartsWith,
      matches.EndsWith,
      matches.IsEmpty,
      matches.IsNotEmpty
    ]
  },
  {
    type: 'select',
    icon: Icon.ArrowCircleDown,
    matches: [matches.Is, matches.IsNot, matches.IsEmpty, matches.IsNotEmpty]
  },
  {
    type: 'date',
    icon: Icon.Calendar,
    matches: [
      matches.IsOn,
      matches.IsNotOn,
      matches.IsBefore,
      matches.IsAfter,
      matches.IsOnOrBefore,
      matches.IsOnOrAfter,
      matches.IsEmpty,
      matches.IsNotEmpty
    ]
  },
  {
    type: 'date-range',
    icon: Icon.Calendar,
    matches: [
      matches.IsOn,
      matches.IsNotOn,
      matches.IsBefore,
      matches.IsAfter,
      matches.IsOnOrBefore,
      matches.IsOnOrAfter,
      matches.IsEmpty,
      matches.IsNotEmpty
    ]
  }
]
