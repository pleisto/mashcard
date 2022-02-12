import { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetPodsQuery, useJoinPodMutation } from '@/BrickdocGraphQL'
import { Loading, Alert, Box } from '@brickdoc/design-system'

export const JoinSpacePage: FC = () => {
  const navigate = useNavigate()
  const { loading, data } = useGetPodsQuery()
  const [joinSpace, { loading: joinLoading }] = useJoinPodMutation()
  const [errorMsg, setErrorMsg] = useState<string | undefined>()
  const { webid, secret } = useParams() as unknown as {
    webid: string
    secret?: string
  }
  const spaceUrl = `/${webid}`
  const existed = !loading && data?.pods.filter(p => p.webid === webid).length === 1

  useEffect(() => {
    const join = async () => {
      if (existed) navigate(spaceUrl)
      const result = await joinSpace({
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
        globalThis.location.href = spaceUrl
      }
    }
    void join()
  }, [existed, spaceUrl, navigate, joinSpace, secret])

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
