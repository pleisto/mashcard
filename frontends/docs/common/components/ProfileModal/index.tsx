import React from 'react'
import { Form, Input, toast, Modal, Button } from '@brickdoc/design-system'
import { object, string } from 'yup'
import { useDocsI18n } from '../../hooks'
import { SpaceOperation, useCreateOrUpdateSpaceMutation, CreateOrUpdateSpaceInput, Space } from '@/BrickdocGraphQL'
import { useDomainAvailableValidator } from '@/common/hooks'

interface ProfileModalProps {
  space: Space
  visible: boolean
  title: string
  type: SpaceOperation
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ space, visible, title, type, setVisible }) => {
  const { t } = useDocsI18n()
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const domainAvailableValidator = useDomainAvailableValidator()

  const form = Form.useForm<CreateOrUpdateSpaceInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    yup: object({
      domain: string().required(t('spaces.required.domain')).test(domainAvailableValidator),
      name: string().required(t('spaces.required.name'))
    })
  })
  const [createOrUpdateSpace] = useCreateOrUpdateSpaceMutation()

  const handleCancel = (): void => {
    setVisible(false)
    setConfirmLoading(false)
    form.reset()
  }

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    const input: CreateOrUpdateSpaceInput = {
      type,
      domain: values.domain,
      name: values.name,
      bio: values.bio
    }
    await createOrUpdateSpace({ variables: { input } })
    form.reset()
    void toast.success(t('spaces.create.success'))
    setConfirmLoading(false)
    setVisible(false)
    globalThis.location.href = `/${values.domain}`
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
        <Form.Field name="domain" label={t('spaces.domain')}>
          <Input />
        </Form.Field>
        <Form.Field name="name" label={t('spaces.name')}>
          <Input />
        </Form.Field>
        <Form.Field name="bio" label={t('spaces.bio')}>
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
