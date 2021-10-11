import React, { useState, useContext } from 'react'
import { BrickdocContext } from '@/BrickdocPWA'

interface FilledInitialValues {
  webid?: string
  name?: string
}

export function useSignUpInitialValues(): {
  initialValues: FilledInitialValues & { locale: string; timezone: string }
  setFill: React.Dispatch<React.SetStateAction<FilledInitialValues>>
} {
  const [fill, setFill] = useState<FilledInitialValues>({})
  const { locale, timezone } = useContext(BrickdocContext)

  return {
    initialValues: {
      ...fill,
      locale,
      timezone
    },
    setFill
  }
}
