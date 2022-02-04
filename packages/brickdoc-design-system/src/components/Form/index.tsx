import { useForm, UseFormProps, SubmitHandler, FieldValues, SubmitErrorHandler } from 'react-hook-form'
import { FormField, FormFieldProps } from './FormField'
import { FormProvider, useFormContext } from './context'
import { FormControlProps, FormControl } from './FormControl'
import { yupResolver } from '@hookform/resolvers/yup'

export interface FormProps<TFieldValues extends FieldValues> extends UseFormProps<TFieldValues> {
  onSubmit: SubmitHandler<TFieldValues>
  onError?: SubmitErrorHandler<TFieldValues>
  layout?: FormControlProps['layout']
  children: React.ReactNode
  yup?: Parameters<typeof yupResolver>[0]
}

/**
 * @see https://react-hook-form.com/advanced-usage#SmartFormComponent
 * @param props
 * @returns
 */
const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const {
    onError,
    onSubmit,
    children,
    defaultValues,
    mode = 'onSubmit',
    layout,
    yup,
    resolver: customResolver,
    ...useFormProps
  } = props
  // if customResolver is not provided, try to use yupResolver
  const resolver = customResolver ?? (yup ? yupResolver(yup) : undefined)
  const methods = useForm<T>({ defaultValues, mode, resolver, ...useFormProps })
  return (
    <FormProvider {...methods} layout={layout}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>{children}</form>
    </FormProvider>
  )
}

Form.Field = FormField

export type { FormControlProps, FormFieldProps, SubmitHandler, SubmitErrorHandler }
export { Form, useFormContext, FormControl }
