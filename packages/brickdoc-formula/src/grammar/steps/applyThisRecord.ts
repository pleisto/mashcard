import { CodeFragment, CodeFragmentStep } from '../../types'

export const applyThisRecordStep: CodeFragmentStep = ({
  input: { positionFragment, codeFragments },
  meta: { richType, namespaceId }
}) => {
  if (richType.type !== 'spreadsheet') return { positionFragment, codeFragments }
  const { spreadsheetId } = richType.meta

  const finalCodeFragments: CodeFragment[] = []
  const finalPositionFragment = positionFragment

  codeFragments.forEach((c, idx) => {
    if (c.code === 'Spreadsheet' && c.attrs.id === spreadsheetId && c.attrs.namespaceId === namespaceId) {
      finalCodeFragments.push({ ...c, display: 'ThisRecord', code: 'ThisRecord' })
      return
    }

    finalCodeFragments.push(c)
  })

  return { codeFragments: finalCodeFragments, positionFragment: finalPositionFragment }
}
