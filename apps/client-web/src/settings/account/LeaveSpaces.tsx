import { FC, useContext, useState } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { Button, ConfirmDialog, useBoolean, toast } from '@brickdoc/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { SpaceCard } from '@/common/components/SpaceCard'
import { Panel } from '@/settings/common/components/Panel'
import { useGetSpacesQuery, GetSpacesQuery, useSpaceLeaveMutation } from '@/BrickdocGraphQL'
import { Trans } from 'react-i18next'
import * as Root from './styles/LeaveSpaces.style'

export const LeaveSpaces: FC = () => {
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [selectedSpace, setSelectedSpace] = useState<GetSpacesQuery['spaces'][0]>()
  const [spaceLeave, { loading: leaveing }] = useSpaceLeaveMutation()
  const { t } = useSettingsI18n()
  const context = useContext(BrickdocContext)
  const userDomain = context.currentUser!.domain
  const { loading, data, refetch } = useGetSpacesQuery()
  if (loading) return <></>

  const teamSpaces = data?.spaces.filter(p => !p.personal)

  const handleLeave = async (spaceWebId: string): Promise<void> => {
    const result = await spaceLeave({
      variables: {
        input: {
          domain: spaceWebId,
          userDomain
        }
      }
    })
    const errors = result.data?.spaceLeave?.errors
    if (errors && errors.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      toast.success(t('account.space_leave_success', { space: `@${spaceWebId}` }))
      await refetch()
      setClose()
    }
  }

  return (
    <>
      <Panel title={t('account.joined_team_spaces')}>
        <Root.List>
          {teamSpaces?.map(space => (
            <li key={space.domain}>
              <SpaceCard
                space={space}
                key={space.domain}
                label={space.owned ? (t('account.owner_cant_leave_tips') as string) : ''}
              />
              <Button
                disabled={space.owned}
                onClick={() => {
                  setSelectedSpace(space)
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
          await handleLeave(selectedSpace!.domain)
        }}
      >
        <Trans
          t={t}
          i18nKey="account.leave_space_confirm"
          values={{
            space: `${selectedSpace?.name} (@${selectedSpace?.domain})`
          }}
        />
      </ConfirmDialog>
    </>
  )
}
