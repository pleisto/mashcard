import { FC, cloneElement, isValidElement, memo } from 'react'
import { FormControlProps, FormControl } from './FormControl'
import { RegisterOptions, FieldError } from 'react-hook-form'
import { useFormContext, FromContextValue } from './context'
import { devWarning } from '../../utilities'

export interface FormFieldProps extends Omit<FormControlProps, 'invalidMessage'> {
  name?: string
  options?: RegisterOptions
}

const MemoizedFormField = memo(
  (props: FormFieldProps & Pick<FromContextValue, 'register' | 'formState'>) => {
    const { name, options = {}, children, label, layout, formState, register, ...controlProps } = props
    const error = name && formState?.errors?.[name]

    const errorMessage =
      typeof error === 'object' ? (typeof error.message === 'string' ? error.message : undefined) : ''
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
        invalidMessage={errorMessage}
      >
        {name && !!register && isValidElement(children)
          ? cloneElement(children, {
              ...register(name, options),
              'aria-invalid': error ? 'true' : 'false'
            })
          : children}
      </FormControl>
    )
  },
  (prevProps, nextProps) => false
  // TODO:  memoize has a bug when yup resolver is used
  /**
   * @see https://react-hook-form.com/advanced-usage#FormProviderPerformance
   * prevProps?.formState?.isDirty === nextProps?.formState?.isDirty &&
   * prevProps?.formState?.errors === nextProps?.formState?.errors
   */
)

export const FormField: FC<FormFieldProps> = props => {
  const { register, layout: defaultLayout, formState } = useFormContext()
  return (
    <MemoizedFormField {...props} register={register} layout={props.layout ?? defaultLayout} formState={formState} />
  )
}
