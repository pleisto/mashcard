import { MashcardContext } from '@/common/mashcardContext'
import { useGetPodsQuery } from '@/MashcardGraphQL'
import { FC, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppError403 } from '../_shared/AppError'
import { LayoutContext } from './_shared/DocumentPageLayout'
import { TrashTable } from './_shared/TrashTable'
import { useDocsI18n } from './_shared/useDocsI18n'

export const Trash: FC = () => {
  const { t } = useDocsI18n()
  const { loading: podDataloding, data: podData } = useGetPodsQuery()
  const { currentUser } = useContext(MashcardContext)
  const { setDocMeta, setErrorPage, setPageTitle, setSibebarVisible } = useContext(LayoutContext)

  const isAnonymous = !currentUser

  const { domain } = useParams() as unknown as { domain: string }

  const matchPod = podData?.pods.find(item => item.domain === domain)

  useEffect(() => {
    setDocMeta({
      domain,
      isAnonymous: false,
      isMine: true
    })
    setPageTitle(t('trash.name'))
    setSibebarVisible(true)
    if (isAnonymous || !matchPod) {
      setErrorPage(<AppError403 />)
    } else {
      setErrorPage(null)
    }
  }, [domain, isAnonymous, matchPod, setDocMeta, setErrorPage, setPageTitle, setSibebarVisible, t])

  if (podDataloding) {
    return null
  }

  return <TrashTable docMeta={{ domain }} />
}

// eslint-disable-next-line import/no-default-export
export default Trash
