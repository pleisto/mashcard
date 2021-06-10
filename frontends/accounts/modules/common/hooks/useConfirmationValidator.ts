export const useConfirmationValidator = ( fieldName: string ) =>{
  return ({ getFieldValue }) => ({
    async validator(_, value) {
      if (!value || getFieldValue(fieldName) === value) {
        return await Promise.resolve()
      }
      return await Promise.reject(new Error(`${fieldName} and Confirm ${fieldName} that you entered do not match`))
    }
  })
}
