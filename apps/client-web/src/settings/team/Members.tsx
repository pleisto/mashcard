import { FC, useContext, useState } from 'react'
import { MashcardContext } from '@/common/mashcardContext'
import { Button, Box, ConfirmDialog, useBoolean, toast } from '@mashcard/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { SettingsContextProps } from '@/settings/SettingContext'
import { PodCard } from '@/common/components/PodCard'
import { Panel } from '@/settings/common/components/Panel'
import { useGetPodMembersQuery, GetPodMembersQuery, usePodLeaveMutation } from '@/MashcardGraphQL'
import { Trans } from 'react-i18next'

export const Members: FC<{ pod: SettingsContextProps['pod'] }> = ({ pod }) => {
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [selectedUser, setSelectedUser] = useState<NonNullable<GetPodMembersQuery['podMembers']>[0]>()
  const [podLeave, { loading: leaveing }] = usePodLeaveMutation()
  const { t } = useSettingsI18n()
  const context = useContext(MashcardContext)
  const currentUserDomain = context.currentUser!.domain
  const { loading, data, refetch } = useGetPodMembersQuery()
  if (loading) return <></>
  const members = data?.podMembers

  const handleLeave = async (userDomain: string): Promise<void> => {
    const result = await podLeave({
      variables: {
        input: {
          domain: pod!.domain,
          userDomain
        }
      }
    })
    const errors = result.data?.podLeave?.errors
    if (errors && errors.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      toast.success(t('team.user_leave_success', { user: `@${userDomain}` }))
      await refetch()
      setClose()
    }
  }

  return (
    <>
      <Panel title={t('team.members')}>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            listStyle: 'none',
            width: '100%',
            borderRadius: '6px',
            padding: 0,
            margin: 0,
            marginBottom: '2rem',
            li: {
              display: 'flex',
              padding: '8px 0',
              alignItems: 'center',
              justifyContent: 'space-between',
              '&:last-child': {
                borderBottom: 'none'
              }
            }
          }}
          as="ul"
        >
          {members?.map(user => (
            <li key={user.user.domain}>
              <PodCard pod={user.user} key={user.user.domain} label={user.user.domain} />
              <Button
                disabled={user.user.domain === currentUserDomain}
                onClick={() => {
                  setSelectedUser(user)
                  setOpen()
                }}
              >
                {t(user.user.domain === currentUserDomain ? 'account.leave_btn' : 'account.remove_btn')}
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
          await handleLeave(selectedUser!.user.domain)
        }}
      >
        <Trans
          t={t}
          i18nKey="team.leave_user_confirm"
          values={{
            user: `${selectedUser?.user.name} (@${selectedUser?.user.domain})`
          }}
        />
      </ConfirmDialog>
    </>
  )
}
