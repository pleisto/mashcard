import { FC, cloneElement, isValidElement, memo } from 'react'
import { FormControlProps, FormControl } from './FormControl'
import { RegisterOptions } from 'react-hook-form'
import { useFormContext, FromContextValue } from './context'
import { devWarning } from '../../utilities'

export interface FormFieldProps extends Omit<FormControlProps, 'invalidMessage'> {
  name?: string
  options?: RegisterOptions
}

/**
 * @see https://react-hook-form.com/advanced-usage#FormProviderPerformance
 */
const MemoizedFormField = memo(
  (props: FormFieldProps & Pick<FromContextValue, 'register' | 'formState'>) => {
    const { name, options = {}, children, label, layout, formState, register, ...controlProps } = props
    const error = name && formState?.errors?.[name]
    devWarning(
      !!register && !isValidElement(children),
      '`props.children` must be a valid `ReactElement` when `register` is provided.',
      children
    )
    return (
      <FormControl
        layout={layout}
        {...controlProps}
        // TODO: Add i18n support when using name as the default label
        label={label ?? name}
        invalidMessage={error?.message}
      >
        {name && register && isValidElement(children)
          ? cloneElement(children, {
              ...register(name, options),
              'aria-invalid': error ? 'true' : 'false'
            })
          : children}
      </FormControl>
    )
  },
  (prevProps, nextProps) => prevProps?.formState?.isDirty === nextProps?.formState?.isDirty
)

export const FormField: FC<FormFieldProps> = props => {
  const { register, layout: defaultLayout, formState } = useFormContext()
  return (
    <MemoizedFormField {...props} register={register} layout={props.layout ?? defaultLayout} formState={formState} />
  )
}
