import * as React from 'react'
import classNames from 'classnames'
import Col, { ColProps } from '../grid/col'
import { FormLabelAlign } from './interface'
import { FormContext, FormContextProps } from './context'
import { RequiredMark } from './Form'
import { useLocale } from '../locale-provider/LocaleReceiver'
import { TooltipProps } from '../tooltip'

export type WrapperTooltipProps = TooltipProps & {
  icon?: React.ReactElement
}

export type LabelTooltipType = WrapperTooltipProps | React.ReactNode

export interface FormItemLabelProps {
  colon?: boolean
  htmlFor?: string
  label?: React.ReactNode
  labelAlign?: FormLabelAlign
  labelCol?: ColProps
  requiredMark?: RequiredMark
  tooltip?: LabelTooltipType
}

const FormItemLabel: React.FC<FormItemLabelProps & { required?: boolean; prefixCls: string }> = ({
  prefixCls,
  label,
  htmlFor,
  labelCol,
  labelAlign,
  colon,
  required,
  requiredMark,
  tooltip
}) => {
  const formLocale = useLocale('Form')

  if (!label) return null

  return (
    <FormContext.Consumer key="label">
      {({
        vertical,
        labelAlign: contextLabelAlign,
        labelCol: contextLabelCol,
        colon: contextColon
      }: FormContextProps) => {
        const mergedLabelCol: ColProps = labelCol || contextLabelCol || {}

        const mergedLabelAlign: FormLabelAlign | undefined = labelAlign || contextLabelAlign

        const labelClsBasic = `${prefixCls}-item-label`
        const labelColClassName = classNames(
          labelClsBasic,
          mergedLabelAlign === 'left' && `${labelClsBasic}-left`,
          mergedLabelCol.className
        )

        let labelChildren = label
        // Keep label is original where there should have no colon
        const computedColon = colon || (contextColon && colon)
        const haveColon = computedColon && !vertical
        // Remove duplicated user input colon
        if (haveColon && typeof label === 'string' && label.trim() !== '') {
          labelChildren = label.replace(/[:|：]\s*$/, '')
        }

        // Add required mark if optional
        if (requiredMark === 'optional' && !required) {
          labelChildren = (
            <>
              {labelChildren}
              <span className={`${prefixCls}-item-optional`} title="">
                {formLocale?.optional}
              </span>
            </>
          )
        }

        const labelClassName = classNames({
          [`${prefixCls}-item-required`]: required,
          [`${prefixCls}-item-required-mark-optional`]: requiredMark === 'optional',
          [`${prefixCls}-item-no-colon`]: !computedColon
        })

        return (
          <Col {...mergedLabelCol} className={labelColClassName}>
            <label htmlFor={htmlFor} className={labelClassName} title={typeof label === 'string' ? label : ''}>
              {labelChildren}
            </label>
          </Col>
        )
      }}
    </FormContext.Consumer>
  )
}

export default FormItemLabel
