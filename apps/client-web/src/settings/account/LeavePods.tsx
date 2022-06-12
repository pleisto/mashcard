import { FC, useContext, useState } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { Button, ConfirmDialog, useBoolean, toast } from '@brickdoc/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { PodCard } from '@/common/components/PodCard'
import { Panel } from '@/settings/common/components/Panel'
import { useGetPodsQuery, GetPodsQuery, usePodLeaveMutation } from '@/BrickdocGraphQL'
import { Trans } from 'react-i18next'
import * as Root from './styles/LeavePods.style'

export const LeavePods: FC = () => {
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [selectedPod, setSelectedPod] = useState<GetPodsQuery['pods'][0]>()
  const [podLeave, { loading: leaveing }] = usePodLeaveMutation()
  const { t } = useSettingsI18n()
  const context = useContext(BrickdocContext)
  const userDomain = context.currentUser!.domain
  const { loading, data, refetch } = useGetPodsQuery()
  if (loading) return <></>

  const teamPods = data?.pods.filter(p => !p.personal)

  const handleLeave = async (domain: string): Promise<void> => {
    const result = await podLeave({
      variables: {
        input: {
          domain,
          userDomain
        }
      }
    })
    const errors = result.data?.podLeave?.errors
    if (errors && errors.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      toast.success(t('account.pod_leave_success', { pod: `@${domain}` }))
      await refetch()
      setClose()
    }
  }

  return (
    <>
      <Panel title={t('account.joined_team_pods')}>
        <Root.List>
          {teamPods?.map(pod => (
            <li key={pod.domain}>
              <PodCard
                pod={pod}
                key={pod.domain}
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
        </Root.List>
      </Panel>
      <ConfirmDialog
        confirmBtnProps={{
          type: 'danger',
          loading: leaveing
        }}
        open={isOpen}
        onCancel={setClose}
        onConfirm={async () => {
          await handleLeave(selectedPod!.domain)
        }}
      >
        <Trans
          t={t}
          i18nKey="account.leave_pod_confirm"
          values={{
            pod: `${selectedPod?.name} (@${selectedPod?.domain})`
          }}
        />
      </ConfirmDialog>
    </>
  )
}
