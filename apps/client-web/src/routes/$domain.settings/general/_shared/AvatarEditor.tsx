import { Edit } from '@mashcard/design-icons'
import { Avatar, Button, Popover, styled, toast } from '@mashcard/design-system'
import { Dashboard, ImportSourceOption, UploadResultData } from '@mashcard/uploader'
import { FC, useContext, useState } from 'react'

import { usePrepareFileUpload } from '../../../$domain/_shared/usePrepareFileUpload'
import { PodOperation, useCreateOrUpdatePodMutation } from '@/MashcardGraphQL'
import { SettingsContext } from '../../_shared/SettingContext'
import { useSettingsI18n } from '../../_shared/useSettingsI18n'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

const Wrapper = styled(Popover, {
  margin: '.5rem 0',
  cursor: 'pointer',
  position: 'relative'
})

const IMPORT_SOURCES: ImportSourceOption[] = [
  {
    // TODO: open file dialog directly
    type: 'upload',
    typeLabel: 'Local File',
    buttonText: 'Upload a photo...',
    acceptType: 'image/*'
  }
]

export const AvatarEditor: FC = () => {
  const { t } = useSettingsI18n()
  const { pod } = useContext(SettingsContext)!
  const prepareFileUpload = usePrepareFileUpload()
  const [updatePod] = useCreateOrUpdatePodMutation()
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(pod?.avatarData?.url)
  const onUploaded = async (attrs: UploadResultData): Promise<void> => {
    const result = await updatePod({
      variables: {
        input: {
          type: PodOperation.Update,
          domain: pod!.domain,
          avatarSignedId: attrs.signedId
        }
      }
    })
    const errors = result.data?.createOrUpdatePod?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      setAvatarUrl(attrs.viewUrl)
      toast.success(t('general.avatar_updated'))
    }
  }

  return (
    <Wrapper
      aria-haspopup="menu"
      destroyTooltipOnHide={true}
      content={
        <Dashboard
          fileType="image"
          prepareFileUpload={prepareFileUpload}
          onUploaded={onUploaded}
          importSources={IMPORT_SOURCES}
        />
      }
    >
      <Avatar role="button" initials={pod?.name ?? pod?.domain} src={avatarUrl} size={100} />
      <Button
        icon={<Edit />}
        circle={true}
        size="lg"
        css={{
          position: 'absolute',
          bottom: '0',
          right: '0'
        }}
        data-testid={TEST_ID_ENUM.pod.profile.avatarUpdate.id}
      />
    </Wrapper>
  )
}
