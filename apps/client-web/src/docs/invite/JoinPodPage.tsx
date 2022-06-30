import { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetPodsQuery, useJoinPodMutation } from '@/MashcardGraphQL'
import { Loading, Alert, Box } from '@mashcard/design-system'

export const JoinPodPage: FC = () => {
  const navigate = useNavigate()
  const { loading, data } = useGetPodsQuery()
  const [joinPod, { loading: joinLoading }] = useJoinPodMutation()
  const [errorMsg, setErrorMsg] = useState<string | undefined>()
  const { domain, secret } = useParams() as unknown as {
    domain: string
    secret?: string
  }
  const podUrl = `/${domain}`
  const existed = !loading && data?.pods.filter(p => p.domain === domain).length === 1

  useEffect(() => {
    const join = async (): Promise<void> => {
      if (existed) navigate(podUrl)
      const result = await joinPod({
        variables: {
          input: {
            inviteSecret: secret
          }
        }
      })
      const errors = result.data?.joinPod?.errors
      if (errors) {
        setErrorMsg(errors?.join('\n'))
      } else {
        globalThis.location.href = podUrl
      }
    }
    void join()
  }, [existed, podUrl, navigate, joinPod, secret])

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

export default JoinPodPage
