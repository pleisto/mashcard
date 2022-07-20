import { Alert, Box, Loading } from '@mashcard/design-system'
import { FC, ReactElement, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetPodsQuery, useGroupJoinMutation } from '@/MashcardGraphQL'
import { RequireLogin } from '../_shared/RequireLogin'

export const JoinPod: FC = () => {
  const navigate = useNavigate()
  const { loading, data } = useGetPodsQuery()
  const [groupJoin, { loading: joinLoading }] = useGroupJoinMutation()
  const [errorMsg, setErrorMsg] = useState<string | undefined>()
  const { domain, secret } = useParams()
  const podUrl = `/${domain}`
  const existed = !loading && data?.pods.filter(p => p.domain === domain).length === 1

  useEffect(() => {
    const join = async (): Promise<void> => {
      if (existed) navigate(podUrl)
      const result = await groupJoin({
        variables: {
          input: {
            inviteSecret: secret
          }
        }
      })
      const errors = result.data?.groupJoin?.errors
      if (errors) {
        setErrorMsg(errors?.join('\n'))
      } else {
        globalThis.location.href = podUrl
      }
    }
    void join()
  }, [existed, podUrl, navigate, groupJoin, secret])

  if (loading || joinLoading) return <Loading />

  return (
    <>
      {errorMsg && (
        <Box
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            position: 'absolute'
          }}
        >
          <main>
            <Alert message={errorMsg} title="Operation Failed" type="error" />
          </main>
        </Box>
      )}
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default (): ReactElement => (
  <RequireLogin>
    <JoinPod />
  </RequireLogin>
)
