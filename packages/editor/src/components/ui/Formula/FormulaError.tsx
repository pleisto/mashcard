import { FC } from 'react'
import { ErrorMessage } from '@mashcard/formula'
import { useFormulaI18n } from '../../../hooks/useFormulaI18n'

export interface FormulaErrorProps {
  error: ErrorMessage
}

export const FormulaError: FC<FormulaErrorProps> = ({ error }) => {
  const { t } = useFormulaI18n()

  let errorMessage: string
  if (typeof error.message === 'string') {
    errorMessage = t(error.message)
  } else {
    errorMessage = t(error.message[0], error.message[1])
  }

  return (
    <>
      <span className="formula-result-error">
        <span className="formula-result-error-type">{error.type}</span>
        <span className="formula-result-error-message">{errorMessage}</span>
      </span>
    </>
  )
}
