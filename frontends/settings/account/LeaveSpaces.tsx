import { FC, useContext, useState } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { Button, Box, ConfirmDialog, theme, useBoolean, toast } from '@brickdoc/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { PodCard } from '@/common/components/PodCard'
import { Panel } from '@/settings/common/components/Panel'
import { useGetPodsQuery, GetPodsQuery, usePodLeaveMutation } from '@/BrickdocGraphQL'
import { Trans } from 'react-i18next'

export const LeaveSpaces: FC = () => {
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [selectedPod, setSelectedPod] = useState<GetPodsQuery['pods'][0]>()
  const [podLeave, { loading: leaveing }] = usePodLeaveMutation()
  const { t } = useSettingsI18n()
  const context = useContext(BrickdocContext)
  const userWebid = context.currentUser!.webid
  const { loading, data, refetch } = useGetPodsQuery()
  if (loading) return <></>

  const teamPods = data?.pods.filter(p => !p.personal)

  const handleLeave = async (podWebId: string) => {
    const result = await podLeave({
      variables: {
        input: {
          webid: podWebId,
          userWebid
        }
      }
    })
    const errors = result.data?.podLeave?.errors
    if (errors && errors.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      toast.success(t('account.pod_leave_success', { space: `@${podWebId}` }))
      await refetch()
      setClose()
    }
  }

  return (
    <>
      <Panel title={t('account.joined_spaces')}>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            listStyle: 'none',
            width: '100%',
            border: `1px solid ${theme.colors.grey5}`,
            borderRadius: '6px',
            padding: 0,
            li: {
              padding: '1rem',
              borderBottom: `1px solid ${theme.colors.grey5}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              '&:last-child': {
                borderBottom: 'none'
              }
            }
          }}
          as="ul"
        >
          {teamPods?.map(pod => (
            <li key={pod.webid}>
              <PodCard
                pod={pod}
                key={pod.webid}
                label={pod.owned ? (t('account.owner_cant_leave_tips') as string) : ''}
              />
              <Button
                disabled={pod.owned}
                onClick={() => {
                  setSelectedPod(pod)
                  setOpen()
                }}
              >
                {t('account.leave_btn')}
              </Button>
            </li>
          ))}
        </Box>
      </Panel>
      <ConfirmDialog
        confirmBtnProps={{
          type: 'danger',
          loading: leaveing
        }}
        open={isOpen}
        onCancel={setClose}
        onConfirm={async () => {
          await handleLeave(selectedPod!.webid)
        }}
      >
        <Trans
          t={t}
          i18nKey="account.leave_pod_confirm"
          values={{
            space: `${selectedPod?.name} (@${selectedPod?.webid})`
          }}
        />
      </ConfirmDialog>
    </>
  )
}
