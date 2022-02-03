import { useForm, UseFormProps, SubmitHandler, FieldValues, SubmitErrorHandler } from 'react-hook-form'
import { FormField, FormFieldProps } from './FormField'
import { FormProvider, useFormContext } from './context'
import { FormControlProps, FormControl } from './FormControl'

export interface FormProps<TFieldValues extends FieldValues> extends UseFormProps<TFieldValues> {
  onSubmit: SubmitHandler<TFieldValues>
  onError?: SubmitErrorHandler<TFieldValues>
  layout?: FormControlProps['layout']
  children: React.ReactNode
}

/**
 * @see https://react-hook-form.com/advanced-usage#SmartFormComponent
 * @param props
 * @returns
 */
const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const { onError, onSubmit, children, defaultValues, mode = 'onSubmit', layout, ...useFormProps } = props
  const methods = useForm({ defaultValues, mode, ...useFormProps })
  return (
    <FormProvider {...methods} layout={layout}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>{children}</form>
    </FormProvider>
  )
}

Form.Field = FormField

export type { FormControlProps, FormFieldProps, SubmitHandler, SubmitErrorHandler }
export { Form, useFormContext, FormControl }
