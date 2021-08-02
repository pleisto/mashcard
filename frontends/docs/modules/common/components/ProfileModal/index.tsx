import React from 'react'
import { Modal, Form, Input, Skeleton, message } from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import { PodOperation, useCreateOrUpdatePodMutation, CreateOrUpdatePodInput, Pod } from '@/BrickdocGraphQL'

interface ProfileModalProps {
  pod: Pod
  visible: boolean
  title: string
  type: PodOperation
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ pod, visible, title, type, setVisible }) => {
  const { t } = useDocsI18n()
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const [form] = Form.useForm()
  const [createOrUpdatePod, { loading }] = useCreateOrUpdatePodMutation()

  const handleCancel = (): void => {
    setVisible(false)
  }

  if (loading) {
    return <Skeleton />
  }

  const handleOk = (): void => {
    setConfirmLoading(true)

    form
      .validateFields()
      .then(values => {
        form.resetFields()
        const input: CreateOrUpdatePodInput = {
          type,
          webid: values.webid,
          name: values.name,
          bio: values.bio,
          avatarSignedId: values.avatar
        }
        void createOrUpdatePod({ variables: { input } })
        setVisible(false)
        setConfirmLoading(false)
        const msg = type === PodOperation.Create ? 'pods.create.success' : 'pods.update.success'
        void message.success(t(msg))
        globalThis.location.href = `/${values.webid}`
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  const initialValues = type === PodOperation.Create ? {} : pod
  const formName = type === PodOperation.Create ? 'Create' : 'Update'

  const webidFormItem =
    type === PodOperation.Create ? (
      <Form.Item name="webid" label={t('pods.webid')} rules={[{ required: true, message: t('pods.required.webid') }]}>
        <Input />
      </Form.Item>
    ) : (
      <Form.Item name="webid" label={t('pods.webid')}>
        <span>{pod.webid}</span>
      </Form.Item>
    )

  const formData = (
    <Form form={form} name={formName} layout="vertical" initialValues={initialValues}>
      {webidFormItem}
      <Form.Item name="name" label={t('pods.name')} rules={[{ required: true, message: t('pods.required.name') }]}>
        <Input />
      </Form.Item>
      <Form.Item name="bio" label={t('pods.bio')}>
        <Input />
      </Form.Item>
      {/* TODO Upload avatar */}
      <Form.Item name="avatar" label={t('pods.avatar')}>
        <Input />
      </Form.Item>
    </Form>
  )

  return (
    <Modal
      title={title}
      okText={t('design_system:modal.okText')}
      cancelText={t('design_system:modal.cancelText')}
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}>
      {formData}
    </Modal>
  )
}
