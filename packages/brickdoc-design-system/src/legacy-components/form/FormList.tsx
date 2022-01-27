import * as React from 'react'
import { List } from 'rc-field-form'
import { ValidatorRule, StoreValue } from 'rc-field-form/lib/interface'
import devWarning from '../_util/devWarning'
import { ConfigContext } from '../config-provider'
import { FormItemPrefixContext } from './context'

export interface FormListFieldData {
  name: number
  key: number
  fieldKey: number
}

export interface FormListOperation {
  add: (defaultValue?: StoreValue, insertIndex?: number) => void
  remove: (index: number | number[]) => void
  move: (from: number, to: number) => void
}

export interface FormListProps {
  prefixCls?: string
  name: string | number | Array<string | number>
  rules?: ValidatorRule[]
  initialValue?: any[]
  children: (
    fields: FormListFieldData[],
    operation: FormListOperation,
    meta: { errors: React.ReactNode[]; warnings: React.ReactNode[] }
  ) => React.ReactNode
}

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
const FormList: React.FC<FormListProps> = ({ prefixCls: customizePrefixCls, children, ...props }) => {
  devWarning(!!props.name, 'Form.List', 'Miss `name` prop.')

  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('form', customizePrefixCls)

  return (
    <List {...props}>
      {(fields, operation, meta) => (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <FormItemPrefixContext.Provider value={{ prefixCls, status: 'error' }}>
          {children(
            fields.map(field => ({ ...field, fieldKey: field.key })),
            operation,
            {
              errors: meta.errors,
              warnings: meta.warnings
            }
          )}
        </FormItemPrefixContext.Provider>
      )}
    </List>
  )
}

export default FormList
