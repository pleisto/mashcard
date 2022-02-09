import React from 'react'
import { Form, Input, toast, Modal, Button } from '@brickdoc/design-system'
import { object, string } from 'yup'
import { useDocsI18n } from '../../hooks'
import { PodOperation, useCreateOrUpdatePodMutation, CreateOrUpdatePodInput, Pod } from '@/BrickdocGraphQL'
import { useWebidAvailableValidator } from '@/common/hooks'

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
  const webidAvailableValidator = useWebidAvailableValidator()

  const form = Form.useForm<CreateOrUpdatePodInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    yup: object({
      webid: string().required(t('pods.required.webid')).test(webidAvailableValidator),
      name: string().required(t('pods.required.name'))
    })
  })
  const [createOrUpdatePod] = useCreateOrUpdatePodMutation()

  const handleCancel = (): void => {
    setVisible(false)
    setConfirmLoading(false)
    form.reset()
  }

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    const input: CreateOrUpdatePodInput = {
      type,
      webid: values.webid,
      name: values.name,
      bio: values.bio
    }
    await createOrUpdatePod({ variables: { input } })
    form.reset()
    void toast.success(t('pods.create.success'))
    setConfirmLoading(false)
    setVisible(false)
    globalThis.location.href = `/${values.webid}`
  }

  return (
    <Modal open={visible} onClose={handleCancel} title={title}>
      <Form
        form={form}
        layout="vertical"
        onSubmit={handleOk}
        onError={() => {
          // onError
          setConfirmLoading(false)
        }}
      >
        <Form.Field name="webid" label={t('pods.webid')}>
          <Input />
        </Form.Field>
        <Form.Field name="name" label={t('pods.name')}>
          <Input />
        </Form.Field>
        <Form.Field name="bio" label={t('pods.bio')}>
          <Input />
        </Form.Field>
        <Form.Field inlineWrapper>
          <Button onClick={handleCancel} size="lg" block>
            Cancel
          </Button>
          <Button loading={confirmLoading} type="primary" htmlType="submit" size="lg" block>
            Create
          </Button>
        </Form.Field>
      </Form>
    </Modal>
  )
}
