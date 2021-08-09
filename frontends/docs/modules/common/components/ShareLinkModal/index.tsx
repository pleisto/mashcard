import React, { useState } from 'react'
import { Modal, Form, Input, Skeleton, message, FormInstance, Select } from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import { BlockCreateShareLinkInput, Policytype, ShareLink, Sharetype, useBlockCreateShareLinkMutation } from '@/BrickdocGraphQL'

interface ShareLinkModalProps {
  visible: boolean
  title: string
  blockId: string | undefined
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ visible, title, blockId, setVisible }) => {
  const { t } = useDocsI18n()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [blockCreateShareLink, { loading }] = useBlockCreateShareLinkMutation()
  const formRef = React.createRef<FormInstance>()

  const handleCancel = (): void => {
    setVisible(false)
    setConfirmLoading(false)
    formRef.current!.resetFields()
  }

  if (loading) {
    return <Skeleton />
  }

  const handleOk = (): void => {
    setConfirmLoading(true)

    form
      .validateFields()
      .then(async values => {
        form.resetFields()
        if (values.emails) {
          values.emails = values.emails.split(',')
        }
        if (values.webids) {
          values.webids = values.webids.split(',')
        }
        const input: BlockCreateShareLinkInput = {
          id: blockId as string,
          policy: Policytype.Show,
          ...values
        }
        const { data } = await blockCreateShareLink({ variables: { input } })
        const result = data?.blockCreateShareLink
        if (result?.errors.length) {
          void message.error(t(result.errors[0]))
        } else if (result?.shareLink) {
          const shareLink = result.shareLink as ShareLink
          setVisible(false)
          void message.success(`${t('share_links.create.success')} ${shareLink.key}`)
        } else {
          setVisible(false)
          void message.success(t('share_links.create.success'))
        }
        setConfirmLoading(false)
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  const initialValues = { shareType: Sharetype.Anonymous }

  const formData = (
    <Form form={form} name="shareLink" ref={formRef} layout="vertical" initialValues={initialValues}>
      {/* <Form.Item name="policy" label="Policy TODO" rules={[{ required: true }]}> */}
      {/* </Form.Item> */}
      <Form.Item name="shareType" label={t('share_links.share_type')} rules={[{ required: true }]}>
        <Select placeholder={t('share_links.create.placeholder')} allowClear>
          <Select.Option value={Sharetype.Anonymous}>{t('share_links.anonymous')}</Select.Option>
          <Select.Option value={Sharetype.Pod}>{t('share_links.pod')}</Select.Option>
          <Select.Option value={Sharetype.User}>{t('share_links.user')}</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item noStyle shouldUpdate={() => true}>
        {({ getFieldValue }) =>
          getFieldValue('shareType') === Sharetype.Pod ? (
            <Form.Item name="webids" label={t('share_links.webid')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item noStyle shouldUpdate={() => true}>
        {({ getFieldValue }) =>
          getFieldValue('shareType') === Sharetype.User ? (
            <Form.Item name="emails" label={t('share_links.email')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null
        }
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
