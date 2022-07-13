import { Box, Button, ConfirmDialog, toast, useBoolean } from '@mashcard/design-system'
import { FC, useContext, useState } from 'react'
import { Trans } from 'react-i18next'

import { PodCard } from '@/common/components/PodCard'
import { MashcardContext } from '@/common/mashcardContext'
import { GetPodMembersQuery, useGetPodMembersQuery, useGroupLeaveMutation } from '@/MashcardGraphQL'
import { Panel } from '../../_shared/Panel'
import { SettingsContextProps } from '../../_shared/SettingContext'
import { useSettingsI18n } from '../../_shared/useSettingsI18n'

export const Members: FC<{ pod: SettingsContextProps['pod'] }> = ({ pod }) => {
  const { t } = useSettingsI18n()
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [selectedUser, setSelectedUser] = useState<NonNullable<GetPodMembersQuery['podMembers']>[0]>()
  const [groupLeave, { loading: leaveing }] = useGroupLeaveMutation()
  const context = useContext(MashcardContext)
  const currentUserDomain = context.currentUser!.domain
  const { loading, data, refetch } = useGetPodMembersQuery()
  if (loading) return <></>
  const members = data?.podMembers

  const handleLeave = async (userDomain: string): Promise<void> => {
    const result = await groupLeave({
      variables: {
        input: {
          domain: pod!.domain,
          userDomain
        }
      }
    })
    const errors = result.data?.groupLeave?.errors
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
          as="ul">
          {members?.map(user => (
            <li key={user.user.domain}>
              <PodCard pod={user.user} key={user.user.domain} label={user.user.domain} />
              <Button
                disabled={user.user.domain === currentUserDomain}
                onClick={() => {
                  setSelectedUser(user)
                  setOpen()
                }}>
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
        }}>
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
