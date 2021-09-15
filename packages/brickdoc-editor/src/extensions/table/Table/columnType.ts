import React from 'react'
import dayjs from 'dayjs'
import { Icon } from '@brickdoc/design-system'
import { TableColumnType } from 'react-table'

interface MatchType {
  label: string
  value: string
  executor: (columnValue?: any, value?: any) => boolean
}

const is: MatchType['executor'] = (columnValue, value) => columnValue === value
const isNot: MatchType['executor'] = (columnValue, value) => !is(columnValue, value)
const isOn: MatchType['executor'] = (columnValue, value) => !!columnValue && !!value && dayjs(columnValue).isSame(value, 'day')
const isNotOn: MatchType['executor'] = (columnValue, value) => !isOn(columnValue, value)
const isBefore: MatchType['executor'] = (columnValue, value) => !!columnValue && !!value && dayjs(columnValue).isBefore(value, 'day')
const isAfter: MatchType['executor'] = (columnValue, value) => !!columnValue && !!value && dayjs(columnValue).isAfter(value, 'day')
const isOnOrBefore: MatchType['executor'] = (columnValue, value) => isOn(columnValue, value) || isBefore(columnValue, value)
const isOnOrAfter: MatchType['executor'] = (columnValue, value) => isOn(columnValue, value) || isAfter(columnValue, value)
const contains: MatchType['executor'] = (columnValue, value) => columnValue?.includes(value ?? '') ?? false
const doesNotContain: MatchType['executor'] = (columnValue, value) => !contains(columnValue, value)
const startsWith: MatchType['executor'] = (columnValue, value) => columnValue?.startsWith(value ?? '') ?? false
const endsWith: MatchType['executor'] = (columnValue, value) => columnValue?.endsWith(value ?? '') ?? false
const isEmpty: MatchType['executor'] = (columnValue, value) => !columnValue
const isNotEmpty: MatchType['executor'] = (columnValue, value) => !isEmpty(columnValue, value)

export const matches = {
  Is: {
    label: 'Is',
    value: 'Is',
    executor: is
  },
  IsNot: {
    label: 'Is not',
    value: 'IsNot',
    executor: isNot
  },
  IsOn: {
    label: 'Is',
    value: 'IsOn',
    executor: isOn
  },
  IsNotOn: {
    label: 'Is not',
    value: 'IsNotOn',
    executor: isNotOn
  },
  IsBefore: {
    label: 'Is before',
    value: 'IsBefore',
    executor: isBefore
  },
  IsAfter: {
    label: 'Is after',
    value: 'IsAfter',
    executor: isAfter
  },
  IsOnOrBefore: {
    label: 'Is on or before',
    value: 'IsOnOrBefore',
    executor: isOnOrBefore
  },
  IsOnOrAfter: {
    label: 'Is on or after',
    value: 'IsOnOrAfter',
    executor: isOnOrAfter
  },
  Contains: {
    label: 'Contains',
    value: 'Contains',
    executor: contains
  },
  DoesNotContain: {
    label: 'Does not contain',
    value: 'DoesNotContain',
    executor: doesNotContain
  },
  StartsWith: {
    label: 'Starts with',
    value: 'StartsWith',
    executor: startsWith
  },
  EndsWith: {
    label: 'Ends with',
    value: 'EndsWith',
    executor: endsWith
  },
  IsEmpty: {
    label: 'Is empty',
    value: 'IsEmpty',
    executor: isEmpty
  },
  IsNotEmpty: {
    label: 'Is not empty',
    value: 'IsNotEmpty',
    executor: isNotEmpty
  }
}

export const COLUMN_TYPE: Array<{
  type: TableColumnType
  label: string
  icon: React.ComponentType
  matches: MatchType[]
}> = [
  {
    type: 'text',
    label: 'Text',
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
    label: 'Select',
    icon: Icon.ArrowCircleDown,
    matches: [matches.Is, matches.IsNot, matches.IsEmpty, matches.IsNotEmpty]
  },
  {
    type: 'date',
    label: 'Date',
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
