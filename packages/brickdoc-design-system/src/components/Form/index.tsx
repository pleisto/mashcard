import { SubmitHandler, FieldValues, SubmitErrorHandler, UseFormReturn } from 'react-hook-form'
import { useForm } from './hook'
import { FormField, FormFieldProps } from './FormField'
import { FormProvider, useFormContext } from './context'
import { FormControlProps, FormControl } from './FormControl'
import type { CSS } from '@stitches/react'
import { styled, config } from '../../themes'

const StyledForm = styled('form')

export interface FormProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>
  onSubmit?: SubmitHandler<TFieldValues>
  onError?: SubmitErrorHandler<TFieldValues>
  layout?: FormControlProps['layout']
  children: React.ReactNode
  css?: CSS<typeof config>
}

/**
 * @see https://react-hook-form.com/advanced-usage#SmartFormComponent
 * @param props
 * @returns
 */
const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const { css, onError, onSubmit, children, layout, form } = props
  return (
    <FormProvider {...form} layout={layout}>
      <StyledForm css={css as any} onSubmit={onSubmit ? form.handleSubmit(onSubmit, onError) : undefined}>
        {children}
      </StyledForm>
    </FormProvider>
  )
}

Form.Field = FormField
Form.useForm = useForm

export type { FormControlProps, FormFieldProps, SubmitHandler, SubmitErrorHandler }
export { Form, useFormContext, FormControl }
