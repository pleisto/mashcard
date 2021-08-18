import React, { useRef, useState } from 'react'
import { Modal, Form, Input, message, FormInstance } from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import { BlockCreateSubBlockInput, useBlockCreateSubBlockMutation } from '@/BrickdocGraphQL'
import { queryPageBlocks } from '../../graphql'

interface SubBlockModalProps {
  visible: boolean
  title: string
  blockId: string | undefined
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const SubBlockModal: React.FC<SubBlockModalProps> = ({ visible, title, blockId, setVisible }) => {
  const { t } = useDocsI18n()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [blockCreateSubBlock] = useBlockCreateSubBlockMutation({
    refetchQueries: [queryPageBlocks]
  })
  const formRef = useRef<FormInstance>(null)

  const handleCancel = (): void => {
    setVisible(false)
    setConfirmLoading(false)
    formRef.current?.resetFields()
  }

  const handleOk = (): void => {
    setConfirmLoading(true)

    form
      .validateFields()
      .then(async values => {
        form.resetFields()
        const input: BlockCreateSubBlockInput = {
          id: blockId as string,
          ...values
        }
        const { data } = await blockCreateSubBlock({ variables: { input } })
        const result = data?.blockCreateSubBlock
        if (result?.errors.length) {
          void message.error(t(result.errors[0]))
        } else {
          void message.success(t('sub_blocks.create.success'))
          setConfirmLoading(false)
          setVisible(false)
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  const initialValues = {}

  const formData = (
    <Form form={form} name="subBlock" ref={formRef} layout="vertical" initialValues={initialValues}>
      <Form.Item name="title" label={t('sub_blocks.title')} rules={[{ required: true }]}>
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
