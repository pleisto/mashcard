import React, { useState, useRef } from 'react'
import {
  DeprecatedModal,
  DeprecatedForm,
  DeprecatedInput,
  toast,
  Avatar,
  Popover,
  DeprecatedFormInstance
} from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import { PodOperation, useCreateOrUpdatePodMutation, CreateOrUpdatePodInput, Pod } from '@/BrickdocGraphQL'
import { Dashboard, ImportSourceOption, UploadResultData } from '@brickdoc/uploader'
import { usePrepareFileUpload } from '@/docs/pages/hooks'
import { useWebidAvailableValidator } from '@/common/hooks'
import styles from './index.module.css'

interface ProfileModalProps {
  pod: Pod
  visible: boolean
  title: string
  type: PodOperation
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

// TODO i18n
const IMPORT_SOURCES: ImportSourceOption[] = [
  {
    type: 'upload',
    buttonText: 'Choose an image',
    acceptType: 'image/*',
    buttonHint: 'Images wider than 1500 pixels work best.'
  }
]

export const ProfileModal: React.FC<ProfileModalProps> = ({ pod, visible, title, type, setVisible }) => {
  const { t } = useDocsI18n()
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const [form] = DeprecatedForm.useForm()
  const [createOrUpdatePod] = useCreateOrUpdatePodMutation()
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    type === PodOperation.Update ? pod.avatarData?.url : ''
  )
  const [avatarSignedId, setAvatarSignedId] = useState<string | undefined>(
    type === PodOperation.Update ? pod.avatarData?.signedId : ''
  )
  const prepareFileUpload = usePrepareFileUpload()
  const formRef = useRef<DeprecatedFormInstance>(null)
  const webidAvailableValidator = useWebidAvailableValidator()

  const handleCancel = (): void => {
    setVisible(false)
    setConfirmLoading(false)
    formRef.current?.resetFields()
  }

  const handleOk = (): void => {
    setConfirmLoading(true)

    form
      .validateFields()
      .then(async (values: any) => {
        form.resetFields()
        const input: CreateOrUpdatePodInput = {
          type,
          webid: values.webid,
          name: values.name,
          bio: values.bio
        }
        if (avatarSignedId) {
          input.avatarSignedId = avatarSignedId
        }
        await createOrUpdatePod({ variables: { input } })
        const msg = type === PodOperation.Create ? 'pods.create.success' : 'pods.update.success'
        void toast.success(t(msg))
        setConfirmLoading(false)
        setVisible(false)
        globalThis.location.href = `/${values.webid}`
      })
      .catch((info: any) => {
        console.log('Validate Failed:', info)
      })
  }

  const initialValues =
    type === PodOperation.Create
      ? {}
      : {
          name: pod.name,
          bio: pod.bio,
          webid: pod.webid,
          avatar: avatarSignedId
        }
  const formName = type === PodOperation.Create ? 'Create' : 'Update'

  const webidFormItem =
    type === PodOperation.Create ? (
      <DeprecatedForm.Item
        name="webid"
        label={t('pods.webid')}
        rules={[{ required: true, message: t('pods.required.webid') }, webidAvailableValidator]}>
        <DeprecatedInput />
      </DeprecatedForm.Item>
    ) : (
      <DeprecatedForm.Item name="webid" label={t('pods.webid')}>
        <span>{pod.webid}</span>
      </DeprecatedForm.Item>
    )

  const onUploaded = (attrs: UploadResultData): void => {
    setAvatarUrl(attrs.viewUrl)
    setAvatarSignedId(attrs.signedId)
  }

  let avatar
  if (avatarUrl) {
    avatar = <Avatar src={avatarUrl} data-testid="profile-form-item-avatar" />
  } else if (type === PodOperation.Create) {
    avatar = <Avatar data-testid="profile-form-item-avatar" />
  } else {
    avatar = (
      <Avatar data-testid="profile-form-item-avatar" style={{ background: '#2376b7' }}>
        {pod.webid}
      </Avatar>
    )
  }

  const updateDashboard = (
    <Dashboard
      fileType="image"
      prepareFileUpload={prepareFileUpload}
      onUploaded={onUploaded}
      importSources={IMPORT_SOURCES}
    />
  )

  const formData = (
    <DeprecatedForm form={form} ref={formRef} name={formName} layout="vertical" initialValues={initialValues}>
      {webidFormItem}
      <DeprecatedForm.Item
        name="name"
        label={t('pods.name')}
        rules={[{ required: true, message: t('pods.required.name') }]}>
        <DeprecatedInput />
      </DeprecatedForm.Item>
      <DeprecatedForm.Item name="bio" label={t('pods.bio')}>
        <DeprecatedInput />
      </DeprecatedForm.Item>
      <DeprecatedForm.Item name="avatar" label={t('pods.avatar')}>
        <Popover overlayClassName={styles.popover} content={updateDashboard}>
          {avatar}
        </Popover>
      </DeprecatedForm.Item>
    </DeprecatedForm>
  )

  return (
    <DeprecatedModal
      title={title}
      okText={t('design_system:modal.okText')}
      cancelText={t('design_system:modal.cancelText')}
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}>
      {formData}
    </DeprecatedModal>
  )
}
