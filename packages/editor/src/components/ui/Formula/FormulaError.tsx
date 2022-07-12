import { FC } from 'react'
import { ErrorMessage } from '@mashcard/formula'
import { useFormulaI18n } from '../../../hooks/useFormulaI18n'

export interface FormulaErrorProps {
  error: ErrorMessage
}

export const FormulaError: FC<FormulaErrorProps> = ({ error }) => {
  const { t } = useFormulaI18n()

  return (
    <>
      <span className="formula-result-error">
        <span className="formula-result-error-type">{error.type}</span>
        <span className="formula-result-error-message">{t(error.message)}</span>
      </span>
    </>
  )
}
