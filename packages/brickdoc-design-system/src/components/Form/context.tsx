import { useContext, createContext } from 'react'
import { UseFormReturn as ReactHookFormContext, FieldValues, FormProviderProps } from 'react-hook-form'
import type { FormControlProps } from './FormControl'

interface BrickdocFormContext {
  layout?: FormControlProps['layout']
}

export type FromContextValue = ReactHookFormContext & BrickdocFormContext

const FormContext = createContext<FromContextValue | null>(null)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useFormContext = <TFieldValues extends FieldValues>() =>
  useContext(FormContext) as unknown as ReactHookFormContext<TFieldValues> & BrickdocFormContext

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const FormProvider = <TFieldValues extends FieldValues, TContext extends object = object>(
  props: FormProviderProps<TFieldValues, TContext> & BrickdocFormContext
) => {
  const { children, ...value } = props
  return <FormContext.Provider value={value as unknown as FromContextValue}>{children}</FormContext.Provider>
}
