import React, { useState, useContext } from 'react'
import { MashcardContext } from '@/common/mashcardContext'

interface FilledInitialValues {
  domain?: string
  name?: string
}

export function useSignUpInitialValues(): {
  initialValues: FilledInitialValues & { locale: string; timezone: string }
  setFill: React.Dispatch<React.SetStateAction<FilledInitialValues>>
} {
  const [fill, setFill] = useState<FilledInitialValues>({})
  const { locale, timezone } = useContext(MashcardContext)

  return {
    initialValues: {
      ...fill,
      locale,
      timezone
    },
    setFill
  }
}
