import React from 'react'
import { Edit } from '@brickdoc/design-icons'
import { Form, Input, toast, Modal, Button, Avatar, Popover, styled } from '@brickdoc/design-system'
import { Dashboard, ImportSourceOption, UploadResultData } from '@brickdoc/uploader'
import { usePrepareFileUpload } from '@/docs/pages/hooks'
import { object, string } from 'yup'
import { useDocsI18n } from '../../hooks'
import { SpaceOperation, useCreateOrUpdateSpaceMutation, CreateOrUpdateSpaceInput, Space } from '@/BrickdocGraphQL'
import { useDomainAvailableValidator } from '@/common/hooks'

const Wrapper = styled(Popover, {
  display: 'inline-flex',
  marginBottom: '1.5rem',
  cursor: 'pointer',
  position: 'relative'
})

interface ProfileModalProps {
  space: Space
  visible: boolean
  title: string
  type: SpaceOperation
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const IMPORT_SOURCES: ImportSourceOption[] = [
  {
    type: 'upload',
    typeLabel: 'Local File',
    buttonText: 'Upload a photo...',
    acceptType: 'image/*'
  }
]

export const ProfileModal: React.FC<ProfileModalProps> = ({ space, visible, title, type, setVisible }) => {
  const { t } = useDocsI18n()
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const [avatarAttrs, setAvatarAttrs] = React.useState<UploadResultData>()
  const prepareFileUpload = usePrepareFileUpload()
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

  const onUploaded = async (attrs: UploadResultData): Promise<void> => {
    if (!attrs?.viewUrl) {
      toast.error(t('general.avatar_uploaded_error'))
    } else {
      setAvatarAttrs(attrs)
      toast.success(t('general.avatar_uploaded_success'))
    }
  }

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    const input: CreateOrUpdateSpaceInput = {
      type,
      domain: values.domain,
      name: values.name,
      bio: values.bio,
      avatarSignedId: avatarAttrs?.signedId
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
          <Avatar role="button" src={avatarAttrs?.viewUrl ?? ''} size={100} />
          <Button
            icon={<Edit />}
            circle={true}
            size="lg"
            css={{
              position: 'absolute',
              bottom: '0',
              right: '0'
            }}
          />
        </Wrapper>

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
