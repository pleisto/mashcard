import { FC, useContext, useState } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { Button, Box, ConfirmDialog, theme, useBoolean, toast } from '@brickdoc/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { SettingsContextProps } from '@/settings/SettingContext'
import { PodCard } from '@/common/components/PodCard'
import { Panel } from '@/settings/common/components/Panel'
import { useGetPodMembersQuery, GetPodMembersQuery, usePodLeaveMutation } from '@/BrickdocGraphQL'
import { Trans } from 'react-i18next'

export const Members: FC<{ pod: SettingsContextProps['pod'] }> = ({ pod }) => {
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [selectedUser, setSelectedUser] = useState<NonNullable<GetPodMembersQuery['podMembers']>[0]>()
  const [podLeave, { loading: leaveing }] = usePodLeaveMutation()
  const { t } = useSettingsI18n()
  const context = useContext(BrickdocContext)
  const currentUserWebid = context.currentUser!.webid
  const { loading, data, refetch } = useGetPodMembersQuery()
  if (loading) return <></>
  const members = data?.podMembers

  const handleLeave = async (userWebid: string) => {
    const result = await podLeave({
      variables: {
        input: {
          webid: pod!.webid,
          userWebid
        }
      }
    })
    const errors = result.data?.podLeave?.errors
    if (errors && errors.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      toast.success(t('team.user_leave_success', { user: `@${userWebid}` }))
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
          {members?.map(user => (
            <li key={user.webid}>
              <PodCard pod={user} key={user.webid} label={user.email || user.webid} />
              <Button
                disabled={user.webid === currentUserWebid}
                onClick={() => {
                  setSelectedUser(user)
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
          await handleLeave(selectedUser!.webid)
        }}
      >
        <Trans
          t={t}
          i18nKey="team.leave_user_confirm"
          values={{
            user: `${selectedUser?.name} (@${selectedUser?.webid})`
          }}
        />
      </ConfirmDialog>
    </>
  )
}
