import { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetSpacesQuery, useJoinSpaceMutation } from '@/BrickdocGraphQL'
import { Loading, Alert, Box } from '@brickdoc/design-system'

export const JoinSpacePage: FC = () => {
  const navigate = useNavigate()
  const { loading, data } = useGetSpacesQuery()
  const [joinSpace, { loading: joinLoading }] = useJoinSpaceMutation()
  const [errorMsg, setErrorMsg] = useState<string | undefined>()
  const { domain, secret } = useParams() as unknown as {
    domain: string
    secret?: string
  }
  const spaceUrl = `/${domain}`
  const existed = !loading && data?.spaces.filter(p => p.domain === domain).length === 1

  useEffect(() => {
    const join = async (): Promise<void> => {
      if (existed) navigate(spaceUrl)
      const result = await joinSpace({
        variables: {
          input: {
            inviteSecret: secret
          }
        }
      })
      const errors = result.data?.joinSpace?.errors
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
