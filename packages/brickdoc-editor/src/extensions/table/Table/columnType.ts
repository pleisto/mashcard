import React from 'react'
import { Icon } from '@brickdoc/design-system'

interface MatchType {
  label: string
  value: string
  executor: (columnValue?: string, value?: string) => boolean
}

const is: MatchType['executor'] = (columnValue, value) => columnValue === value
const isNot: MatchType['executor'] = (columnValue, value) => !is(columnValue, value)
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
  type: string
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
  }
]
