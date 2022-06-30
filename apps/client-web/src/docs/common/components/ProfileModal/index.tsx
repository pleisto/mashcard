import React from 'react'
import { Form, Input, toast, Modal, Button } from '@mashcard/design-system'
import { object, string } from 'yup'
import { useDomainAvailableValidator } from '@/common/hooks'
import { useDocsI18n } from '../../hooks'
import { PodOperation, useCreateOrUpdatePodMutation, CreateOrUpdatePodInput } from '@/MashcardGraphQL'

interface ProfileModalProps {
  visible: boolean
  title: string
  type: PodOperation
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogCss = {
  width: 480,
  padding: '54px 80px',
  '&>h1.dialogTitle': {
    marginBottom: '3rem'
  }
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ visible, title, type, setVisible }) => {
  const { t } = useDocsI18n()
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const domainAvailableValidator = useDomainAvailableValidator()

  const form = Form.useForm<CreateOrUpdatePodInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    yup: object({
      name: string().required(t('pods.required.name')).test(domainAvailableValidator)
    })
  })
  const [createOrUpdatePod] = useCreateOrUpdatePodMutation()

  const handleCancel = (): void => {
    setVisible(false)
    setConfirmLoading(false)
    form.reset()
  }

  const handleOk = async (values: CreateOrUpdatePodInput): Promise<void> => {
    setConfirmLoading(true)
    const input: CreateOrUpdatePodInput = {
      type,
      domain: values.name!,
      name: values.name
    }
    await createOrUpdatePod({ variables: { input } })
    form.reset()
    void toast.success(t('pods.create.success'))
    setConfirmLoading(false)
    setVisible(false)
    globalThis.location.href = `/${values.name}`
  }

  return (
    <Modal open={visible} onClose={handleCancel} title={title} dialogCss={{ ...DialogCss }}>
      <Form
        form={form}
        layout="vertical"
        onSubmit={handleOk}
        onError={() => {
          // onError
          setConfirmLoading(false)
        }}
      >
        <Form.Field name="name" label={t('pods.name')}>
          {/* eslint-disable-next-line */}
          <Input borderType="underline" autoFocus />
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
