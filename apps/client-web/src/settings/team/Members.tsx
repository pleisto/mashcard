import { FC, useContext, useState } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { Button, Box, ConfirmDialog, useBoolean, toast } from '@brickdoc/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { SettingsContextProps } from '@/settings/SettingContext'
import { SpaceCard } from '@/common/components/SpaceCard'
import { Panel } from '@/settings/common/components/Panel'
import { useGetSpaceMembersQuery, GetSpaceMembersQuery, useSpaceLeaveMutation } from '@/BrickdocGraphQL'
import { Trans } from 'react-i18next'

export const Members: FC<{ space: SettingsContextProps['space'] }> = ({ space }) => {
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [selectedUser, setSelectedUser] = useState<NonNullable<GetSpaceMembersQuery['spaceMembers']>[0]>()
  const [spaceLeave, { loading: leaveing }] = useSpaceLeaveMutation()
  const { t } = useSettingsI18n()
  const context = useContext(BrickdocContext)
  const currentUserDomain = context.currentUser!.domain
  const { loading, data, refetch } = useGetSpaceMembersQuery()
  if (loading) return <></>
  const members = data?.spaceMembers

  const handleLeave = async (userDomain: string): Promise<void> => {
    const result = await spaceLeave({
      variables: {
        input: {
          domain: space!.domain,
          userDomain
        }
      }
    })
    const errors = result.data?.spaceLeave?.errors
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
            <li key={user.domain}>
              <SpaceCard space={user} key={user.domain} label={user.email ?? user.domain} />
              <Button
                disabled={user.domain === currentUserDomain}
                onClick={() => {
                  setSelectedUser(user)
                  setOpen()
                }}
              >
                {t(user.domain === currentUserDomain ? 'account.leave_btn' : 'account.remove_btn')}
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
          await handleLeave(selectedUser!.domain)
        }}
      >
        <Trans
          t={t}
          i18nKey="team.leave_user_confirm"
          values={{
            user: `${selectedUser?.name} (@${selectedUser?.domain})`
          }}
        />
      </ConfirmDialog>
    </>
  )
}
