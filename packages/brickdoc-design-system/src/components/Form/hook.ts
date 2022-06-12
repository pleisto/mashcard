import { useForm as useHookForm, UseFormProps as UseHookFormProps, FieldValues, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export interface UseFormProps<TFieldValues extends FieldValues> extends UseHookFormProps<TFieldValues> {
  yup?: Parameters<typeof yupResolver>[0]
}

/**
 * useForm hook with yup validation integration
 * @see https://react-hook-form.com/api/useform
 * @param props
 * @returns
 */
export const useForm = <T extends FieldValues>(props: UseFormProps<T> = {}): UseFormReturn<T, any> => {
  const { yup, resolver, ...rest } = props
  return useHookForm<T>({
    resolver: resolver ?? (yup ? yupResolver(yup) : undefined),
    ...rest
  })
}
