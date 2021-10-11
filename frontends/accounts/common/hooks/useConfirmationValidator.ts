import { useAccountsI18n } from '@/accounts/common/hooks'
import { FormRuleRender } from '@brickdoc/design-system'

export const useConfirmationValidator = (fieldName: string): FormRuleRender => {
  const { t } = useAccountsI18n()
  return ({ getFieldValue }) => ({
    async validator(_, value) {
      if (!value || getFieldValue(fieldName) === value) {
        return await Promise.resolve()
      }
      throw new Error(
        `${t('common.confirm_not_match', {
          field: t(`sessions.${fieldName}`)
        })}`
      )
    }
  })
}
